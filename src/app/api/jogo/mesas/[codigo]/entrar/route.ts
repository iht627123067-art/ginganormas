import { NextRequest, NextResponse } from "next/server";
import { withTransaction } from "@/lib/jogo/db";
import { gerarToken, buscarMesaPorCodigo, carregarEstadoPorCodigo } from "@/lib/jogo/estado";
import { rateLimit } from "@/lib/jogo/ratelimit";

const MAX_JOGADORES = 12;

export async function POST(
  req: NextRequest,
  { params }: { params: { codigo: string } }
) {
  if (!rateLimit(req, "entrar")) {
    return NextResponse.json({ error: "Muitas requisições. Tente novamente em instantes." }, { status: 429 });
  }

  let body: { nome?: string };
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "JSON inválido" }, { status: 400 });
  }

  const nome = (body.nome ?? "").trim();
  if (nome.length < 2 || nome.length > 24) {
    return NextResponse.json({ error: "Apelido deve ter entre 2 e 24 caracteres" }, { status: 400 });
  }

  try {
    const mesa = await buscarMesaPorCodigo(params.codigo);
    if (!mesa) {
      return NextResponse.json({ error: "Mesa não encontrada" }, { status: 404 });
    }
    if (mesa.estado === "encerrada") {
      return NextResponse.json({ error: "Esta mesa já foi encerrada" }, { status: 409 });
    }

    const { jogadorId, deviceToken } = await withTransaction(async (client) => {
      const contagem = await client.query(
        "select count(*) as total from jogadores_ginga where mesa_id = $1",
        [mesa.id]
      );
      if (Number(contagem.rows[0].total) >= MAX_JOGADORES) {
        throw new ErroNegocio("Mesa cheia (máximo de 12 jogadores)", 409);
      }

      const duplicado = await client.query(
        "select 1 from jogadores_ginga where mesa_id = $1 and lower(nome) = lower($2)",
        [mesa.id, nome]
      );
      if (duplicado.rowCount && duplicado.rowCount > 0) {
        throw new ErroNegocio("Já existe um jogador com este apelido na mesa", 409);
      }

      const deviceToken = gerarToken();
      const insert = await client.query(
        "insert into jogadores_ginga (mesa_id, nome, device_token) values ($1, $2, $3) returning id",
        [mesa.id, nome, deviceToken]
      );
      return { jogadorId: insert.rows[0].id as string, deviceToken };
    });

    const resultado = await carregarEstadoPorCodigo(mesa.codigo);
    return NextResponse.json(
      { jogadorId, deviceToken, estado: resultado?.estado },
      { status: 201 }
    );
  } catch (err) {
    if (err instanceof ErroNegocio) {
      return NextResponse.json({ error: err.message }, { status: err.status });
    }
    console.error("[jogo/entrar] erro:", err);
    return NextResponse.json({ error: "Erro ao entrar na mesa" }, { status: 500 });
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
