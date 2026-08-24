import { NextRequest, NextResponse } from "next/server";
import { withTransaction } from "@/lib/jogo/db";
import {
  buscarMesaPorCodigo,
  carregarEstadoPorCodigo,
  resolverSorteioAtivo,
  travarMesa,
} from "@/lib/jogo/estado";
import { rateLimit } from "@/lib/jogo/ratelimit";
import { SEGUNDOS_VOTACAO } from "@/lib/jogo/votacao";

// Só quem puxou a carta pode encerrar o tempo de escuta antes da hora,
// liberando a votação da roda na mesma janela de sempre (30s).
export async function POST(
  req: NextRequest,
  { params }: { params: { codigo: string } }
) {
  if (!rateLimit(req, "pular")) {
    return NextResponse.json({ error: "Muitas requisições. Tente novamente em instantes." }, { status: 429 });
  }

  let body: { jogadorId?: string; deviceToken?: string };
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "JSON inválido" }, { status: 400 });
  }
  const { jogadorId, deviceToken } = body;

  if (!jogadorId || !deviceToken) {
    return NextResponse.json({ error: "jogadorId e deviceToken são obrigatórios" }, { status: 400 });
  }

  try {
    const mesa = await buscarMesaPorCodigo(params.codigo);
    if (!mesa) {
      return NextResponse.json({ error: "Mesa não encontrada" }, { status: 404 });
    }

    await withTransaction(async (client) => {
      const mesaTravada = await travarMesa(client, mesa.id);
      if (!mesaTravada) throw new ErroNegocio("Mesa não encontrada", 404);

      await resolverSorteioAtivo(client, mesaTravada);

      if (mesaTravada.estado !== "em_jogo") {
        throw new ErroNegocio("O jogo não está em andamento", 409);
      }
      if (!mesaTravada.carta_ativa_id) {
        throw new ErroNegocio("Não há carta ativa", 409);
      }

      const jogadorRes = await client.query(
        "select id, device_token from jogadores_ginga where id = $1 and mesa_id = $2",
        [jogadorId, mesa.id]
      );
      const jogador = jogadorRes.rows[0];
      if (!jogador || jogador.device_token !== deviceToken) {
        throw new ErroNegocio("Jogador não autenticado nesta mesa", 401);
      }

      const sorteioRes = await client.query(
        `select id, jogador_id, resultado, escuta_termina_em
         from sorteios_ginga where id = $1 for update`,
        [mesaTravada.carta_ativa_id]
      );
      const sorteio = sorteioRes.rows[0];
      if (!sorteio || sorteio.resultado !== "ativa") {
        throw new ErroNegocio("Esta carta já foi decidida", 409);
      }
      if (sorteio.jogador_id !== jogadorId) {
        throw new ErroNegocio("Só quem puxou a carta pode encerrar a escuta", 403);
      }

      const agora = new Date();
      if (sorteio.escuta_termina_em && agora >= new Date(sorteio.escuta_termina_em)) {
        throw new ErroNegocio("O tempo de escuta já terminou", 409);
      }

      await client.query(
        `update sorteios_ginga
         set escuta_termina_em = now(), escuta_pulada_em = now(),
             votacao_termina_em = now() + make_interval(secs => $2)
         where id = $1`,
        [sorteio.id, SEGUNDOS_VOTACAO]
      );
    });

    const resultado = await carregarEstadoPorCodigo(mesa.codigo);
    return NextResponse.json(resultado?.estado);
  } catch (err) {
    if (err instanceof ErroNegocio) {
      return NextResponse.json({ error: err.message }, { status: err.status });
    }
    console.error("[jogo/pular] erro:", err);
    return NextResponse.json({ error: "Erro ao encerrar tempo de escuta" }, { status: 500 });
  }
}

class ErroNegocio extends Error {
  status: number;
  constructor(message: string, status: number) {
    super(message);
    this.status = status;
  }
}

export const dynamic = "force-dynamic";
