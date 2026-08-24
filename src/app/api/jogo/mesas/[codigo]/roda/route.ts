import { NextRequest, NextResponse } from "next/server";
import { withTransaction } from "@/lib/jogo/db";
import {
  buscarMesaPorCodigo,
  carregarEstadoPorCodigo,
  contarConquistas,
  resolverSorteioAtivo,
  travarMesa,
} from "@/lib/jogo/estado";
import { rateLimit } from "@/lib/jogo/ratelimit";

interface CartaRow {
  id: string;
  dimensao: string;
}

// "Entro na roda!": outro jogador paga 1 ficha própria, ganha carta extra
// da mesma dimensão da carta ativa e conquista aquela dimensão imediatamente.
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
        "select id, nome, fichas, device_token from jogadores_ginga where id = $1 and mesa_id = $2",
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
        `select s.id, s.jogador_id, s.resultado, s.escuta_termina_em, b.dimensao
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
      if (ativa.escuta_termina_em && new Date() < new Date(ativa.escuta_termina_em)) {
        throw new ErroNegocio("Aguarde o tempo de escuta terminar para entrar na roda", 409);
      }
      if (jogador.fichas <= 0) {
        throw new ErroNegocio("Você não tem fichas suficientes", 409);
      }

      const jaConquistou = await client.query(
        "select 1 from conquistas_ginga where jogador_id = $1 and dimensao = $2",
        [jogadorId, ativa.dimensao]
      );
      if (jaConquistou.rowCount && jaConquistou.rowCount > 0) {
        throw new ErroNegocio("Você já fechou esta dimensão", 409);
      }

      const cartaRes = await client.query<CartaRow>(
        `select b.id, b.dimensao from baralho_ginga b
         where b.dimensao = $1 and not exists (
           select 1 from sorteios_ginga s where s.mesa_id = $2 and s.carta_id = b.id
         )
         order by random() limit 1`,
        [ativa.dimensao, mesa.id]
      );
      const cartaExtra = cartaRes.rows[0];
      if (!cartaExtra) {
        throw new ErroNegocio("Não há mais cartas desta dimensão no baralho", 409);
      }

      await client.query(
        `insert into sorteios_ginga (mesa_id, carta_id, jogador_id, resultado, resolvido_em)
         values ($1, $2, $3, 'entrei_na_roda', now())`,
        [mesa.id, cartaExtra.id, jogadorId]
      );
      await client.query(
        "update jogadores_ginga set fichas = fichas - 1 where id = $1",
        [jogadorId]
      );
      await client.query(
        `insert into conquistas_ginga (mesa_id, jogador_id, dimensao, carta_id)
         values ($1, $2, $3, $4) on conflict (jogador_id, dimensao) do nothing`,
        [mesa.id, jogadorId, cartaExtra.dimensao, cartaExtra.id]
      );

      const totalConquistas = await contarConquistas(client, jogadorId);
      if (totalConquistas >= 5) {
        await client.query(
          `update mesas_ginga set estado = 'encerrada', vencedor_jogador_id = $1,
           turno_jogador_id = null where id = $2`,
          [jogadorId, mesa.id]
        );
      }
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
