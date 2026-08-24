import { NextRequest, NextResponse } from "next/server";
import { withTransaction } from "@/lib/jogo/db";
import { buscarMesaPorCodigo, carregarEstadoPorCodigo } from "@/lib/jogo/estado";
import { rateLimit } from "@/lib/jogo/ratelimit";
import { SEGUNDOS_ESCUTA, SEGUNDOS_VOTACAO } from "@/lib/jogo/votacao";

interface CartaRow {
  id: string;
  dimensao: string;
}

export async function POST(
  req: NextRequest,
  { params }: { params: { codigo: string } }
) {
  if (!rateLimit(req, "puxar")) {
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
      if (m.turno_jogador_id !== jogadorId) {
        throw new ErroNegocio("Não é a sua vez de puxar carta", 409);
      }
      if (m.carta_ativa_id) {
        throw new ErroNegocio("Já existe uma carta ativa na mesa", 409);
      }

      const cartaRes = await client.query<CartaRow>(
        `select b.id, b.dimensao from baralho_ginga b
         where not exists (
           select 1 from sorteios_ginga s where s.mesa_id = $1 and s.carta_id = b.id
         )
         order by random() limit 1`,
        [mesa.id]
      );
      const carta = cartaRes.rows[0];
      if (!carta) {
        throw new ErroNegocio("O baralho acabou — peça ao facilitador para reiniciar", 409);
      }

      const sorteioRes = await client.query(
        `insert into sorteios_ginga
           (mesa_id, carta_id, jogador_id, resultado, escuta_termina_em, votacao_termina_em)
         values ($1, $2, $3, 'ativa',
           now() + make_interval(secs => $4), now() + make_interval(secs => $5))
         returning id`,
        [mesa.id, carta.id, jogadorId, SEGUNDOS_ESCUTA, SEGUNDOS_ESCUTA + SEGUNDOS_VOTACAO]
      );
      await client.query(
        "update mesas_ginga set carta_ativa_id = $1 where id = $2",
        [sorteioRes.rows[0].id, mesa.id]
      );
    });

    const resultado = await carregarEstadoPorCodigo(mesa.codigo);
    return NextResponse.json(resultado?.estado);
  } catch (err) {
    if (err instanceof ErroNegocio) {
      return NextResponse.json({ error: err.message }, { status: err.status });
    }
    console.error("[jogo/puxar] erro:", err);
    return NextResponse.json({ error: "Erro ao puxar carta" }, { status: 500 });
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
