import { NextRequest, NextResponse } from "next/server";
import { withTransaction } from "@/lib/jogo/db";
import { autenticarHost, buscarMesaPorCodigo, carregarEstadoPorCodigo } from "@/lib/jogo/estado";
import { rateLimit } from "@/lib/jogo/ratelimit";

export async function POST(
  req: NextRequest,
  { params }: { params: { codigo: string } }
) {
  if (!rateLimit(req, "iniciar")) {
    return NextResponse.json({ error: "Muitas requisições. Tente novamente em instantes." }, { status: 429 });
  }

  let body: { hostToken?: string };
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "JSON inválido" }, { status: 400 });
  }

  try {
    const mesa = await buscarMesaPorCodigo(params.codigo);
    if (!mesa) {
      return NextResponse.json({ error: "Mesa não encontrada" }, { status: 404 });
    }
    if (!body.hostToken || !(await autenticarHost(mesa.id, body.hostToken))) {
      return NextResponse.json({ error: "Apenas quem criou a mesa pode iniciar o jogo" }, { status: 403 });
    }
    if (mesa.estado === "em_jogo") {
      return NextResponse.json({ error: "O jogo já está em andamento" }, { status: 409 });
    }

    await withTransaction(async (client) => {
      const contagem = await client.query(
        "select count(*) as total from jogadores_ginga where mesa_id = $1",
        [mesa.id]
      );
      if (Number(contagem.rows[0].total) === 0) {
        throw new ErroNegocio("É preciso ter pelo menos 1 jogador para iniciar", 409);
      }
      const primeiro = await client.query(
        "select id from jogadores_ginga where mesa_id = $1 order by entrou_em limit 1",
        [mesa.id]
      );
      await client.query(
        "update mesas_ginga set estado = 'em_jogo', turno_jogador_id = $1, vencedor_jogador_id = null, carta_ativa_id = null where id = $2",
        [primeiro.rows[0].id, mesa.id]
      );
    });

    const resultado = await carregarEstadoPorCodigo(mesa.codigo);
    return NextResponse.json(resultado?.estado);
  } catch (err) {
    if (err instanceof ErroNegocio) {
      return NextResponse.json({ error: err.message }, { status: err.status });
    }
    console.error("[jogo/iniciar] erro:", err);
    return NextResponse.json({ error: "Erro ao iniciar o jogo" }, { status: 500 });
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
