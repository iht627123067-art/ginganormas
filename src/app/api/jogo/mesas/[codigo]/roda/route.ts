import { NextRequest, NextResponse } from "next/server";
import { withTransaction } from "@/lib/jogo/db";
import {
  buscarMesaPorCodigo,
  carregarEstadoPorCodigo,
  resolverSorteioAtivo,
  travarMesa,
} from "@/lib/jogo/estado";
import { rateLimit } from "@/lib/jogo/ratelimit";
import { SEGUNDOS_LIBERA_RODA } from "@/lib/jogo/votacao";

// "Entro na roda!": reserva a vez de falar depois da carta atual. Libera
// SEGUNDOS_LIBERA_RODA após a carta ser puxada, só uma pessoa por vez pode
// reservar, e a fala de quem reservou só começa quando a carta atual for
// decidida (ver aplicarDecisao em lib/jogo/estado.ts).
export async function POST(
  req: NextRequest,
  { params }: { params: { codigo: string } }
) {
  if (!rateLimit(req, "roda")) {
    return NextResponse.json({ error: "Muitas requisições. Tente novamente em instantes." }, { status: 429 });
  }

  let body: { jogadorId?: string; deviceToken?: string };
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "JSON inválido" }, { status: 400 });
  }
  const { jogadorId, deviceToken } = body;

  try {
    const mesa = await buscarMesaPorCodigo(params.codigo);
    if (!mesa) {
      return NextResponse.json({ error: "Mesa não encontrada" }, { status: 404 });
    }
    if (!jogadorId || !deviceToken) {
      return NextResponse.json({ error: "jogadorId e deviceToken são obrigatórios" }, { status: 400 });
    }

    await withTransaction(async (client) => {
      const m = await travarMesa(client, mesa.id);
      if (!m) throw new ErroNegocio("Mesa não encontrada", 404);

      await resolverSorteioAtivo(client, m);

      const jogadorRes = await client.query(
        "select id, device_token from jogadores_ginga where id = $1 and mesa_id = $2",
        [jogadorId, mesa.id]
      );
      const jogador = jogadorRes.rows[0];
      if (!jogador || jogador.device_token !== deviceToken) {
        throw new ErroNegocio("Jogador não autenticado nesta mesa", 401);
      }

      if (m.estado !== "em_jogo") {
        throw new ErroNegocio("O jogo não está em andamento", 409);
      }
      if (!m.carta_ativa_id) {
        throw new ErroNegocio("Não há carta ativa para entrar na roda", 409);
      }

      const ativaRes = await client.query(
        `select s.id, s.jogador_id, s.resultado, s.pausado_em, s.criado_em,
                s.roda_solicitante_id, s.eh_entrada_roda, b.dimensao
         from sorteios_ginga s join baralho_ginga b on b.id = s.carta_id
         where s.id = $1 for update`,
        [m.carta_ativa_id]
      );
      const ativa = ativaRes.rows[0];
      if (!ativa || ativa.resultado !== "ativa") {
        throw new ErroNegocio("Esta carta já foi decidida", 409);
      }
      if (ativa.jogador_id === jogadorId) {
        throw new ErroNegocio("Você não pode entrar na roda na sua própria carta", 409);
      }
      if (ativa.eh_entrada_roda) {
        throw new ErroNegocio("Não é possível entrar na roda durante a fala de quem já entrou", 409);
      }
      if (ativa.roda_solicitante_id) {
        throw new ErroNegocio("Já há uma pessoa na fila para entrar na roda", 409);
      }
      if (ativa.pausado_em) {
        throw new ErroNegocio("O facilitador pausou o tempo — aguarde retomar", 409);
      }
      const liberaEm = new Date(ativa.criado_em).getTime() + SEGUNDOS_LIBERA_RODA * 1000;
      if (Date.now() < liberaEm) {
        throw new ErroNegocio("Aguarde alguns segundos para poder entrar na roda", 409);
      }

      const jaConquistou = await client.query(
        "select 1 from conquistas_ginga where jogador_id = $1 and dimensao = $2",
        [jogadorId, ativa.dimensao]
      );
      if (jaConquistou.rowCount && jaConquistou.rowCount > 0) {
        throw new ErroNegocio("Você já fechou esta dimensão", 409);
      }

      const temCarta = await client.query(
        `select 1 from baralho_ginga b
         where b.dimensao = $1 and not exists (
           select 1 from sorteios_ginga s where s.mesa_id = $2 and s.carta_id = b.id
         )
         limit 1`,
        [ativa.dimensao, mesa.id]
      );
      if (!temCarta.rowCount || temCarta.rowCount === 0) {
        throw new ErroNegocio("Não há mais cartas desta dimensão no baralho", 409);
      }

      await client.query(
        "update sorteios_ginga set roda_solicitante_id = $1 where id = $2",
        [jogadorId, ativa.id]
      );
    });

    const resultado = await carregarEstadoPorCodigo(mesa.codigo);
    return NextResponse.json(resultado?.estado);
  } catch (err) {
    if (err instanceof ErroNegocio) {
      return NextResponse.json({ error: err.message }, { status: err.status });
    }
    console.error("[jogo/roda] erro:", err);
    return NextResponse.json({ error: "Erro ao entrar na roda" }, { status: 500 });
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
