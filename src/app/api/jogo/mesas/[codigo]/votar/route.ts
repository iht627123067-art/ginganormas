import { NextRequest, NextResponse } from "next/server";
import { withTransaction } from "@/lib/jogo/db";
import {
  buscarMesaPorCodigo,
  carregarEstadoPorCodigo,
  resolverSorteioAtivo,
  travarMesa,
} from "@/lib/jogo/estado";
import { rateLimit } from "@/lib/jogo/ratelimit";

// Voto da roda sobre a carta ativa: só libera depois do tempo de escuta e
// nunca para quem puxou a própria carta. Maioria simples decide na hora.
export async function POST(
  req: NextRequest,
  { params }: { params: { codigo: string } }
) {
  if (!rateLimit(req, "votar")) {
    return NextResponse.json({ error: "Muitas requisições. Tente novamente em instantes." }, { status: 429 });
  }

  let body: { jogadorId?: string; deviceToken?: string; voto?: string };
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "JSON inválido" }, { status: 400 });
  }
  const { jogadorId, deviceToken, voto } = body;

  if (voto !== "gingou" && voto !== "voltou") {
    return NextResponse.json({ error: "Voto inválido (use 'gingou' ou 'voltou')" }, { status: 400 });
  }
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
        throw new ErroNegocio("Não há carta ativa para votar", 409);
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
        `select id, jogador_id, resultado, escuta_termina_em, votacao_termina_em
         from sorteios_ginga where id = $1 for update`,
        [mesaTravada.carta_ativa_id]
      );
      const sorteio = sorteioRes.rows[0];
      if (!sorteio || sorteio.resultado !== "ativa") {
        throw new ErroNegocio("Esta carta já foi decidida", 409);
      }
      if (sorteio.jogador_id === jogadorId) {
        throw new ErroNegocio("Você não pode votar na própria carta", 403);
      }

      const agora = new Date();
      if (sorteio.escuta_termina_em && agora < new Date(sorteio.escuta_termina_em)) {
        throw new ErroNegocio("Ainda é tempo de escutar — aguarde a votação abrir", 409);
      }
      if (sorteio.votacao_termina_em && agora >= new Date(sorteio.votacao_termina_em)) {
        throw new ErroNegocio("O tempo de votação já encerrou", 409);
      }

      await client.query(
        `insert into votos_ginga (sorteio_id, jogador_id, voto) values ($1, $2, $3)
         on conflict (sorteio_id, jogador_id) do update set voto = excluded.voto, criado_em = now()`,
        [sorteio.id, jogadorId, voto]
      );

      await resolverSorteioAtivo(client, mesaTravada);
    });

    const resultado = await carregarEstadoPorCodigo(mesa.codigo);
    return NextResponse.json(resultado?.estado);
  } catch (err) {
    if (err instanceof ErroNegocio) {
      return NextResponse.json({ error: err.message }, { status: err.status });
    }
    console.error("[jogo/votar] erro:", err);
    return NextResponse.json({ error: "Erro ao registrar voto" }, { status: 500 });
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
