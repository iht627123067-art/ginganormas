import { NextRequest, NextResponse } from "next/server";
import { query, withTransaction } from "@/lib/jogo/db";
import { gerarCodigo, gerarToken, carregarEstadoPorCodigo } from "@/lib/jogo/estado";
import { rateLimit } from "@/lib/jogo/ratelimit";
import type { EstadoMesaValor } from "@/lib/jogo/tipos";

const MAX_JOGADORES = 12;

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

export interface MesaAberta {
  codigo: string;
  nome: string;
  estado: EstadoMesaValor;
  jogadores: number;
  criadaEm: string;
}

export async function GET(req: NextRequest) {
  if (!rateLimit(req, "mesas-listar")) {
    return NextResponse.json({ error: "Muitas requisições. Tente novamente em instantes." }, { status: 429 });
  }

  try {
    const rows = await query<{
      codigo: string;
      nome: string;
      estado: EstadoMesaValor;
      criada_em: Date;
      jogadores: string;
    }>(
      `select m.codigo, m.nome, m.estado, m.criada_em,
              count(j.id) as jogadores
       from mesas_ginga m
       left join jogadores_ginga j on j.mesa_id = m.id
       where m.estado <> 'encerrada'
       group by m.id
       having count(j.id) < $1
       order by m.criada_em desc
       limit 20`,
      [MAX_JOGADORES]
    );

    const mesas: MesaAberta[] = rows.map((r) => ({
      codigo: r.codigo,
      nome: r.nome,
      estado: r.estado,
      jogadores: Number(r.jogadores),
      criadaEm: r.criada_em.toISOString(),
    }));

    return NextResponse.json({ mesas });
  } catch (err) {
    console.error("[jogo/mesas] erro ao listar mesas:", err);
    return NextResponse.json({ error: "Erro ao listar mesas" }, { status: 500 });
  }
}

export const dynamic = "force-dynamic";
