import { NextRequest, NextResponse } from "next/server";
import { withTransaction } from "@/lib/jogo/db";
import { autenticarHost, buscarMesaPorCodigo, carregarEstadoPorCodigo } from "@/lib/jogo/estado";
import { rateLimit } from "@/lib/jogo/ratelimit";

// Reinicia o baralho numa mesma mesa: limpa sorteios e conquistas e
// devolve 3 fichas a todos os jogadores (equivalente ao protótipo).
export async function POST(
  req: NextRequest,
  { params }: { params: { codigo: string } }
) {
  if (!rateLimit(req, "reiniciar")) {
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
      return NextResponse.json({ error: "Apenas quem criou a mesa pode reiniciar o baralho" }, { status: 403 });
    }

    await withTransaction(async (client) => {
      await client.query("delete from sorteios_ginga where mesa_id = $1", [mesa.id]);
      await client.query("delete from conquistas_ginga where mesa_id = $1", [mesa.id]);
      await client.query(
        "update jogadores_ginga set fichas = 3 where mesa_id = $1",
        [mesa.id]
      );
      await client.query(
        `update mesas_ginga set carta_ativa_id = null, vencedor_jogador_id = null,
         turno_jogador_id = (select id from jogadores_ginga where mesa_id = $1 order by entrou_em limit 1),
         estado = case when exists (select 1 from jogadores_ginga where mesa_id = $1) then 'em_jogo' else 'lobby' end
         where id = $1`,
        [mesa.id]
      );
    });

    const resultado = await carregarEstadoPorCodigo(mesa.codigo);
    return NextResponse.json(resultado?.estado);
  } catch (err) {
    console.error("[jogo/reiniciar] erro:", err);
    return NextResponse.json({ error: "Erro ao reiniciar baralho" }, { status: 500 });
  }
}

export const dynamic = "force-dynamic";
