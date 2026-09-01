import { NextRequest, NextResponse } from "next/server";
import { withTransaction } from "@/lib/jogo/db";
import {
  autenticarHost,
  buscarMesaPorCodigo,
  carregarEstadoPorCodigo,
  proximoTurno,
  resolverSorteioAtivo,
  travarMesa,
} from "@/lib/jogo/estado";
import { rateLimit } from "@/lib/jogo/ratelimit";
import { SEGUNDOS_VOTACAO } from "@/lib/jogo/votacao";

type AcaoFacilitador = "encerrar_escuta" | "pausar" | "retomar" | "pular_vez";

const ACOES_VALIDAS: AcaoFacilitador[] = ["encerrar_escuta", "pausar", "retomar", "pular_vez"];

// Poderes do facilitador sobre a carta ativa e a vez do jogador:
// encerrar o tempo de fala, pausar/retomar o cronômetro, ou pular a vez
// de quem não quer responder.
export async function POST(
  req: NextRequest,
  { params }: { params: { codigo: string } }
) {
  if (!rateLimit(req, "facilitador")) {
    return NextResponse.json({ error: "Muitas requisições. Tente novamente em instantes." }, { status: 429 });
  }

  let body: { hostToken?: string; acao?: string };
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "JSON inválido" }, { status: 400 });
  }
  const { hostToken, acao } = body;

  if (!acao || !ACOES_VALIDAS.includes(acao as AcaoFacilitador)) {
    return NextResponse.json({ error: "Ação inválida" }, { status: 400 });
  }

  try {
    const mesa = await buscarMesaPorCodigo(params.codigo);
    if (!mesa) {
      return NextResponse.json({ error: "Mesa não encontrada" }, { status: 404 });
    }
    if (!hostToken || !(await autenticarHost(mesa.id, hostToken))) {
      return NextResponse.json({ error: "Apenas o facilitador pode fazer isso" }, { status: 403 });
    }

    await withTransaction(async (client) => {
      const mesaTravada = await travarMesa(client, mesa.id);
      if (!mesaTravada) throw new ErroNegocio("Mesa não encontrada", 404);
      if (mesaTravada.estado !== "em_jogo") {
        throw new ErroNegocio("O jogo não está em andamento", 409);
      }

      await resolverSorteioAtivo(client, mesaTravada);

      if (acao === "pular_vez") {
        if (mesaTravada.carta_ativa_id) {
          throw new ErroNegocio("Já há uma carta ativa — não é possível pular a vez agora", 409);
        }
        if (!mesaTravada.turno_jogador_id) {
          throw new ErroNegocio("Não há um jogador na vez para pular", 409);
        }
        const proximo = await proximoTurno(client, mesa.id, mesaTravada.turno_jogador_id);
        await client.query(
          "update mesas_ginga set turno_jogador_id = $1 where id = $2",
          [proximo, mesa.id]
        );
        return;
      }

      if (!mesaTravada.carta_ativa_id) {
        throw new ErroNegocio("Não há carta ativa", 409);
      }

      const sorteioRes = await client.query(
        `select id, resultado, escuta_termina_em, votacao_termina_em, pausado_em
         from sorteios_ginga where id = $1 for update`,
        [mesaTravada.carta_ativa_id]
      );
      const sorteio = sorteioRes.rows[0];
      if (!sorteio || sorteio.resultado !== "ativa") {
        throw new ErroNegocio("Esta carta já foi decidida", 409);
      }

      if (acao === "encerrar_escuta") {
        if (sorteio.pausado_em) {
          throw new ErroNegocio("Retome o tempo antes de encerrar a escuta", 409);
        }
        const agora = new Date();
        if (sorteio.escuta_termina_em && agora >= new Date(sorteio.escuta_termina_em)) {
          throw new ErroNegocio("O tempo de escuta já terminou", 409);
        }
        await client.query(
          `update sorteios_ginga
           set escuta_termina_em = now(), escuta_pulada_em = now(),
               votacao_termina_em = now() + make_interval(secs => $2)
           where id = $1`,
          [sorteio.id, SEGUNDOS_VOTACAO]
        );
        return;
      }

      if (acao === "pausar") {
        if (sorteio.pausado_em) {
          throw new ErroNegocio("O tempo já está pausado", 409);
        }
        await client.query(
          "update sorteios_ginga set pausado_em = now() where id = $1",
          [sorteio.id]
        );
        return;
      }

      if (acao === "retomar") {
        if (!sorteio.pausado_em) {
          throw new ErroNegocio("O tempo não está pausado", 409);
        }
        await client.query(
          `update sorteios_ginga
           set escuta_termina_em = escuta_termina_em + (now() - pausado_em),
               votacao_termina_em = votacao_termina_em + (now() - pausado_em),
               pausado_em = null
           where id = $1`,
          [sorteio.id]
        );
        return;
      }
    });

    const resultado = await carregarEstadoPorCodigo(mesa.codigo);
    return NextResponse.json(resultado?.estado);
  } catch (err) {
    if (err instanceof ErroNegocio) {
      return NextResponse.json({ error: err.message }, { status: err.status });
    }
    console.error("[jogo/facilitador] erro:", err);
    return NextResponse.json({ error: "Erro ao aplicar ação do facilitador" }, { status: 500 });
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
