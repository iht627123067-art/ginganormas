import { NextRequest, NextResponse } from "next/server";
import { withTransaction } from "@/lib/jogo/db";
import { buscarMesaPorCodigo, carregarEstadoPorCodigo, contarConquistas, proximoTurno } from "@/lib/jogo/estado";
import { rateLimit } from "@/lib/jogo/ratelimit";

export async function POST(
  req: NextRequest,
  { params }: { params: { codigo: string } }
) {
  if (!rateLimit(req, "decidir")) {
    return NextResponse.json({ error: "Muitas requisições. Tente novamente em instantes." }, { status: 429 });
  }

  let body: { jogadorId?: string; deviceToken?: string; decisao?: string };
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "JSON inválido" }, { status: 400 });
  }
  const { jogadorId, deviceToken, decisao } = body;

  if (decisao !== "gingou" && decisao !== "voltou") {
    return NextResponse.json({ error: "Decisão inválida (use 'gingou' ou 'voltou')" }, { status: 400 });
  }

  try {
    const mesa = await buscarMesaPorCodigo(params.codigo);
    if (!mesa) {
      return NextResponse.json({ error: "Mesa não encontrada" }, { status: 404 });
    }
    if (!jogadorId || !deviceToken) {
      return NextResponse.json({ error: "jogadorId e deviceToken são obrigatórios" }, { status: 400 });
    }

    await withTransaction(async (client) => {
      const mesaTravada = await client.query(
        "select * from mesas_ginga where id = $1 for update",
        [mesa.id]
      );
      const m = mesaTravada.rows[0];
      if (!m) throw new ErroNegocio("Mesa não encontrada", 404);

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
        throw new ErroNegocio("Não há carta ativa para decidir", 409);
      }

      const ativaRes = await client.query(
        `select s.id, s.jogador_id, b.dimensao, b.id as carta_id
         from sorteios_ginga s join baralho_ginga b on b.id = s.carta_id
         where s.id = $1`,
        [m.carta_ativa_id]
      );
      const ativa = ativaRes.rows[0];
      if (!ativa || ativa.jogador_id !== jogadorId) {
        throw new ErroNegocio("A carta ativa não é sua", 403);
      }

      await client.query(
        "update sorteios_ginga set resultado = $1, resolvido_em = now() where id = $2",
        [decisao, ativa.id]
      );

      if (decisao === "gingou") {
        await client.query(
          `insert into conquistas_ginga (mesa_id, jogador_id, dimensao, carta_id)
           values ($1, $2, $3, $4) on conflict (jogador_id, dimensao) do nothing`,
          [mesa.id, jogadorId, ativa.dimensao, ativa.carta_id]
        );
      }

      const totalConquistas = await contarConquistas(client, jogadorId);
      if (totalConquistas >= 5) {
        await client.query(
          `update mesas_ginga set carta_ativa_id = null, estado = 'encerrada',
           vencedor_jogador_id = $1, turno_jogador_id = null where id = $2`,
          [jogadorId, mesa.id]
        );
      } else {
        const proximo = await proximoTurno(client, mesa.id, m.turno_jogador_id);
        await client.query(
          "update mesas_ginga set carta_ativa_id = null, turno_jogador_id = $1 where id = $2",
          [proximo, mesa.id]
        );
      }
    });

    const resultado = await carregarEstadoPorCodigo(mesa.codigo);
    return NextResponse.json(resultado?.estado);
  } catch (err) {
    if (err instanceof ErroNegocio) {
      return NextResponse.json({ error: err.message }, { status: err.status });
    }
    console.error("[jogo/decidir] erro:", err);
    return NextResponse.json({ error: "Erro ao registrar decisão" }, { status: 500 });
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
