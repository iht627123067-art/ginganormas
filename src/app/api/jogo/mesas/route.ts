import { NextRequest, NextResponse } from "next/server";
import { query, withTransaction } from "@/lib/jogo/db";
import { gerarCodigo, gerarToken, carregarEstadoPorCodigo } from "@/lib/jogo/estado";
import { rateLimit } from "@/lib/jogo/ratelimit";

export async function POST(req: NextRequest) {
  if (!rateLimit(req, "mesas")) {
    return NextResponse.json({ error: "Muitas requisições. Tente novamente em instantes." }, { status: 429 });
  }

  let body: { nome?: string };
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "JSON inválido" }, { status: 400 });
  }

  const nome = (body.nome ?? "").trim();
  if (nome.length < 2 || nome.length > 60) {
    return NextResponse.json({ error: "Nome da mesa deve ter entre 2 e 60 caracteres" }, { status: 400 });
  }

  const hostToken = gerarToken();

  try {
    const codigo = await withTransaction(async (client) => {
      for (let tentativa = 0; tentativa < 8; tentativa++) {
        const codigo = gerarCodigo();
        const existente = await client.query(
          "select 1 from mesas_ginga where codigo = $1",
          [codigo]
        );
        if (existente.rowCount === 0) {
          await client.query(
            "insert into mesas_ginga (codigo, nome, host_token) values ($1, $2, $3)",
            [codigo, nome, hostToken]
          );
          return codigo;
        }
      }
      throw new Error("Não foi possível gerar um código único");
    });

    const resultado = await carregarEstadoPorCodigo(codigo);
    return NextResponse.json({ ...resultado?.estado, hostToken }, { status: 201 });
  } catch (err) {
    console.error("[jogo/mesas] erro ao criar mesa:", err);
    return NextResponse.json({ error: "Erro ao criar mesa" }, { status: 500 });
  }
}

export async function GET() {
  return NextResponse.json({ error: "Método não suportado" }, { status: 405 });
}

export const dynamic = "force-dynamic";
