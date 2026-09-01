import { randomUUID } from "node:crypto";
import type { PoolClient } from "pg";
import { query, withTransaction } from "./db";
import type { EstadoMesa, EstadoMesaValor, ResultadoSorteio } from "./tipos";
import { calcularFase, SEGUNDOS_ESCUTA_RODA, SEGUNDOS_LIBERA_RODA, SEGUNDOS_VOTACAO } from "./votacao";

const CODIGO_PREFIXO = "GNG";

export function gerarCodigo(): string {
  return `${CODIGO_PREFIXO}-${Math.floor(100 + Math.random() * 900)}`;
}

export function gerarToken(): string {
  return `${randomUUID()}${randomUUID()}`.replace(/-/g, "");
}

interface MesaRow {
  id: string;
  codigo: string;
  nome: string;
  estado: EstadoMesaValor;
  turno_jogador_id: string | null;
  carta_ativa_id: string | null;
  vencedor_jogador_id: string | null;
  criada_em: Date;
}

export async function buscarMesaPorCodigo(codigo: string): Promise<MesaRow | null> {
  const rows = await query<MesaRow>(
    "select * from mesas_ginga where codigo = $1",
    [codigo.toUpperCase()]
  );
  return rows[0] ?? null;
}

export async function carregarEstadoMesa(mesa: MesaRow): Promise<EstadoMesa> {
  const [jogadoresRows, ativaRows, ultimasRows, conquistasRows, progressoRows, restantesRows, jogadasRows] =
    await Promise.all([
      query<{ id: string; nome: string; fichas: number; entrou_em: Date }>(
        "select id, nome, fichas, entrou_em from jogadores_ginga where mesa_id = $1 order by entrou_em",
        [mesa.id]
      ),
      mesa.carta_ativa_id
        ? query<{
            sorteio_id: string;
            jogador_id: string;
            jogador_nome: string;
            carta_id: string;
            dimensao: string;
            cor_hex: string;
            carta: string;
            definicao: string;
            pergunta: string;
            escuta_termina_em: Date | null;
            votacao_termina_em: Date | null;
            pausado_em: Date | null;
            criado_em: Date;
            roda_solicitante_id: string | null;
            eh_entrada_roda: boolean;
          }>(
            `select s.id as sorteio_id, s.jogador_id, j.nome as jogador_nome,
                    b.id as carta_id, b.dimensao, b.cor_hex, b.carta, b.definicao, b.pergunta,
                    s.escuta_termina_em, s.votacao_termina_em, s.pausado_em, s.criado_em,
                    s.roda_solicitante_id, s.eh_entrada_roda
             from sorteios_ginga s
             join baralho_ginga b on b.id = s.carta_id
             join jogadores_ginga j on j.id = s.jogador_id
             where s.id = $1`,
            [mesa.carta_ativa_id]
          )
        : Promise.resolve([]),
      query<{
        carta_id: string;
        dimensao: string;
        cor_hex: string;
        carta: string;
        jogador_nome: string;
        resultado: ResultadoSorteio;
        resolvido_em: Date | null;
        eh_entrada_roda: boolean;
      }>(
        `select b.id as carta_id, b.dimensao, b.cor_hex, b.carta,
                j.nome as jogador_nome, s.resultado, s.resolvido_em, s.eh_entrada_roda
         from (
           select s2.*, row_number() over (order by s2.resolvido_em desc nulls last, s2.criado_em desc) as rn
           from sorteios_ginga s2
           where s2.mesa_id = $1 and s2.resultado <> 'ativa'
         ) s
         join baralho_ginga b on b.id = s.carta_id
         join jogadores_ginga j on j.id = s.jogador_id
         where s.rn <= 8
         order by s.rn`,
        [mesa.id]
      ),
      query<{ jogador_id: string; dimensao: string }>(
        "select jogador_id, dimensao from conquistas_ginga where mesa_id = $1",
        [mesa.id]
      ),
      query<{ dimensao: string; cor_hex: string; total: string }>(
        "select dimensao, min(cor_hex) as cor_hex, count(*) as total from baralho_ginga group by dimensao",
        []
      ),
      query<{ total: string }>(
        `select count(*) as total from baralho_ginga b
         where not exists (
           select 1 from sorteios_ginga s where s.mesa_id = $1 and s.carta_id = b.id
         )`,
        [mesa.id]
      ),
      query<{ dimensao: string; jogadas: string }>(
        `select b.dimensao, count(*) as jogadas
         from sorteios_ginga s join baralho_ginga b on b.id = s.carta_id
         where s.mesa_id = $1
         group by b.dimensao`,
        [mesa.id]
      ),
    ]);

  const conquistasPorJogador = new Map<string, string[]>();
  for (const c of conquistasRows) {
    const list = conquistasPorJogador.get(c.jogador_id) ?? [];
    list.push(c.dimensao);
    conquistasPorJogador.set(c.jogador_id, list);
  }

  const ativa = ativaRows[0];

  let cartaAtiva: EstadoMesa["cartaAtiva"] = null;
  if (ativa) {
    const votosRows = await query<{ jogador_id: string; voto: ResultadoSorteio | "gingou" | "voltou" }>(
      "select jogador_id, voto from votos_ginga where sorteio_id = $1",
      [ativa.sorteio_id]
    );
    const totalVotantes = Math.max(0, jogadoresRows.length - 1);
    const necessarios = Math.floor(totalVotantes / 2) + 1;
    const votosGingou = votosRows.filter((v) => v.voto === "gingou").length;
    const votosVoltou = votosRows.filter((v) => v.voto === "voltou").length;
    const escutaTerminaEm = ativa.escuta_termina_em ?? new Date();
    const votacaoTerminaEm = ativa.votacao_termina_em ?? new Date();
    // Enquanto pausada, a fase congela no instante da pausa em vez de
    // avançar com o relógio real — evita que o tempo "vença" durante a pausa.
    const agoraEfetivo = ativa.pausado_em ?? new Date();

    cartaAtiva = {
      sorteioId: ativa.sorteio_id,
      jogadorId: ativa.jogador_id,
      jogadorNome: ativa.jogador_nome,
      cartaId: ativa.carta_id,
      dimensao: ativa.dimensao,
      corHex: ativa.cor_hex,
      carta: ativa.carta,
      definicao: ativa.definicao,
      pergunta: ativa.pergunta,
      fase: calcularFase(agoraEfetivo, escutaTerminaEm, votacaoTerminaEm),
      escutaTerminaEm: escutaTerminaEm.toISOString(),
      votacaoTerminaEm: votacaoTerminaEm.toISOString(),
      pausadoEm: ativa.pausado_em ? ativa.pausado_em.toISOString() : null,
      ehEntradaRoda: ativa.eh_entrada_roda,
      rodaSolicitanteId: ativa.roda_solicitante_id,
      rodaLiberaEm: new Date(ativa.criado_em.getTime() + SEGUNDOS_LIBERA_RODA * 1000).toISOString(),
      votos: {
        gingou: votosGingou,
        voltou: votosVoltou,
        necessarios,
        totalVotantes,
        jaVotaram: votosRows.map((v) => v.jogador_id),
      },
    };
  }

  return {
    codigo: mesa.codigo,
    nome: mesa.nome,
    estado: mesa.estado,
    criadaEm: mesa.criada_em.toISOString(),
    turnoJogadorId: mesa.turno_jogador_id,
    vencedorJogadorId: mesa.vencedor_jogador_id,
    jogadores: jogadoresRows.map((j) => ({
      id: j.id,
      nome: j.nome,
      fichas: j.fichas,
      conquistas: conquistasPorJogador.get(j.id) ?? [],
    })),
    cartaAtiva,
    ultimasCartas: ultimasRows.map((u) => ({
      cartaId: u.carta_id,
      dimensao: u.dimensao,
      corHex: u.cor_hex,
      carta: u.carta,
      definicao: "",
      pergunta: "",
      jogadorNome: u.jogador_nome,
      resultado: u.resultado,
      resolvidoEm: u.resolvido_em ? u.resolvido_em.toISOString() : null,
      ehEntradaRoda: u.eh_entrada_roda,
    })),
    progresso: progressoRows.map((p) => ({
      dimensao: p.dimensao,
      corHex: p.cor_hex,
      jogadas: Number(jogadasRows.find((jr) => jr.dimensao === p.dimensao)?.jogadas ?? 0),
      total: Number(p.total),
    })),
    cartasRestantes: Number(restantesRows[0]?.total ?? 0),
  };
}

export async function carregarEstadoPorCodigo(
  codigo: string
): Promise<{ mesa: MesaRow; estado: EstadoMesa } | null> {
  const mesa = await buscarMesaPorCodigo(codigo);
  if (!mesa) return null;

  if (mesa.estado === "em_jogo" && mesa.carta_ativa_id) {
    await withTransaction(async (client) => {
      const mesaTravada = await travarMesa(client, mesa.id);
      if (!mesaTravada) return;
      const resolvida = await resolverSorteioAtivo(client, mesaTravada);
      if (resolvida) {
        mesa.carta_ativa_id = mesaTravada.carta_ativa_id;
        mesa.turno_jogador_id = mesaTravada.turno_jogador_id;
        mesa.estado = mesaTravada.estado;
        mesa.vencedor_jogador_id = mesaTravada.vencedor_jogador_id;
      }
    });
  }

  return { mesa, estado: await carregarEstadoMesa(mesa) };
}

export type MesaRowType = MesaRow;

export interface JogadorAutenticado {
  id: string;
  mesa_id: string;
  nome: string;
  fichas: number;
  device_token: string;
}

export async function autenticarJogador(
  mesaId: string,
  jogadorId: string,
  deviceToken: string
): Promise<JogadorAutenticado | null> {
  const rows = await query<JogadorAutenticado>(
    "select id, mesa_id, nome, fichas, device_token from jogadores_ginga where id = $1 and mesa_id = $2",
    [jogadorId, mesaId]
  );
  const jogador = rows[0];
  if (!jogador || jogador.device_token !== deviceToken) return null;
  return jogador;
}

export async function autenticarHost(
  mesaId: string,
  hostToken: string
): Promise<boolean> {
  const rows = await query<{ ok: boolean }>(
    "select count(*) > 0 as ok from mesas_ginga where id = $1 and host_token = $2",
    [mesaId, hostToken]
  );
  return rows[0]?.ok === true;
}

export async function travarMesa(
  client: PoolClient,
  mesaId: string
): Promise<MesaRow | null> {
  const res = await client.query("select * from mesas_ginga where id = $1 for update", [
    mesaId,
  ]);
  return (res.rows[0] as MesaRow) ?? null;
}

export async function proximoTurno(
  client: PoolClient,
  mesaId: string,
  jogadorAtualId: string | null
): Promise<string | null> {
  const res = await client.query(
    "select id from jogadores_ginga where mesa_id = $1 order by entrou_em",
    [mesaId]
  );
  const ids = res.rows.map((r) => r.id as string);
  if (ids.length === 0) return null;
  if (!jogadorAtualId) return ids[0];
  const idx = ids.indexOf(jogadorAtualId);
  if (idx === -1) return ids[0];
  return ids[(idx + 1) % ids.length];
}

export async function contarConquistas(
  client: PoolClient,
  jogadorId: string
): Promise<number> {
  const res = await client.query(
    "select count(distinct dimensao) as total from conquistas_ginga where jogador_id = $1",
    [jogadorId]
  );
  return Number(res.rows[0]?.total ?? 0);
}

interface SorteioAtivoRow {
  id: string;
  carta_id: string;
  jogador_id: string;
  resultado: ResultadoSorteio;
  escuta_termina_em: Date | null;
  votacao_termina_em: Date | null;
  pausado_em: Date | null;
  roda_solicitante_id: string | null;
  eh_entrada_roda: boolean;
}

// Resolve a carta ativa da mesa (bloqueada em `mesa`) se a maioria simples da
// roda já aprovou/reprovou, ou se o tempo de votação expirou. Muta `mesa` in
// place para refletir turno/carta/estado novos. Mesas com 0 outros jogadores
// (teste solo) não são resolvidas aqui — seguem pela rota /decidir manual.
export async function resolverSorteioAtivo(
  client: PoolClient,
  mesa: MesaRow
): Promise<boolean> {
  if (!mesa.carta_ativa_id) return false;

  const sorteioRes = await client.query<SorteioAtivoRow>(
    `select id, carta_id, jogador_id, resultado, escuta_termina_em, votacao_termina_em, pausado_em,
            roda_solicitante_id, eh_entrada_roda
     from sorteios_ginga where id = $1 for update`,
    [mesa.carta_ativa_id]
  );
  const sorteio = sorteioRes.rows[0];
  if (!sorteio || sorteio.resultado !== "ativa") return false;
  if (sorteio.pausado_em) return false; // congelada: facilitador pausou o tempo

  const jogadoresRes = await client.query<{ total: string }>(
    "select count(*) as total from jogadores_ginga where mesa_id = $1",
    [mesa.id]
  );
  const totalOutros = Number(jogadoresRes.rows[0]?.total ?? 0) - 1;
  if (totalOutros <= 0) return false;

  const votosRes = await client.query<{ voto: string; n: string }>(
    "select voto, count(*)::int as n from votos_ginga where sorteio_id = $1 group by voto",
    [sorteio.id]
  );
  let votosGingou = 0;
  let votosVoltou = 0;
  for (const r of votosRes.rows) {
    if (r.voto === "gingou") votosGingou = Number(r.n);
    else if (r.voto === "voltou") votosVoltou = Number(r.n);
  }
  const agora = new Date();
  const votacaoExpirada = !!sorteio.votacao_termina_em && agora >= new Date(sorteio.votacao_termina_em);
  // A votação fica aberta pelos 30s inteiros mesmo se a maioria já tiver se
  // formado — só resolve antes do tempo se literalmente todo mundo já votou
  // (não há mais ninguém que possa mudar o resultado).
  const todosVotaram = votosGingou + votosVoltou >= totalOutros;

  let decisao: "gingou" | "voltou" | null = null;
  if (votacaoExpirada || todosVotaram) {
    decisao = votosGingou > votosVoltou ? "gingou" : "voltou";
  }

  if (!decisao) return false;

  await aplicarDecisao(client, mesa, sorteio, decisao);
  return true;
}

async function aplicarDecisao(
  client: PoolClient,
  mesa: MesaRow,
  sorteio: SorteioAtivoRow,
  decisao: "gingou" | "voltou"
): Promise<void> {
  await client.query(
    "update sorteios_ginga set resultado = $1, resolvido_em = now() where id = $2",
    [decisao, sorteio.id]
  );

  const cartaRes = await client.query<{ dimensao: string }>(
    "select dimensao from baralho_ginga where id = $1",
    [sorteio.carta_id]
  );
  const dimensao = cartaRes.rows[0]?.dimensao ?? null;

  if (decisao === "gingou" && dimensao) {
    await client.query(
      `insert into conquistas_ginga (mesa_id, jogador_id, dimensao, carta_id)
       values ($1, $2, $3, $4) on conflict (jogador_id, dimensao) do nothing`,
      [mesa.id, sorteio.jogador_id, dimensao, sorteio.carta_id]
    );
  }

  const totalConquistas = await contarConquistas(client, sorteio.jogador_id);
  if (totalConquistas >= 5) {
    await client.query(
      `update mesas_ginga set carta_ativa_id = null, estado = 'encerrada',
       vencedor_jogador_id = $1, turno_jogador_id = null where id = $2`,
      [sorteio.jogador_id, mesa.id]
    );
    mesa.carta_ativa_id = null;
    mesa.estado = "encerrada";
    mesa.vencedor_jogador_id = sorteio.jogador_id;
    mesa.turno_jogador_id = null;
    return;
  }

  // Se alguém reservou "entro na roda" nesta carta (e esta carta não é ela
  // mesma uma entrada na roda), a vez não avança ainda: puxa uma carta da
  // mesma dimensão para quem reservou e dá a ela o palco (2 min de fala).
  if (!sorteio.eh_entrada_roda && sorteio.roda_solicitante_id && dimensao) {
    const cartaExtraRes = await client.query<{ id: string }>(
      `select b.id from baralho_ginga b
       where b.dimensao = $1 and not exists (
         select 1 from sorteios_ginga s where s.mesa_id = $2 and s.carta_id = b.id
       )
       order by random() limit 1`,
      [dimensao, mesa.id]
    );
    const cartaExtra = cartaExtraRes.rows[0];
    if (cartaExtra) {
      const novoSorteio = await client.query<{ id: string }>(
        `insert into sorteios_ginga
           (mesa_id, carta_id, jogador_id, resultado, eh_entrada_roda,
            escuta_termina_em, votacao_termina_em)
         values ($1, $2, $3, 'ativa', true,
           now() + make_interval(secs => $4), now() + make_interval(secs => $5))
         returning id`,
        [
          mesa.id,
          cartaExtra.id,
          sorteio.roda_solicitante_id,
          SEGUNDOS_ESCUTA_RODA,
          SEGUNDOS_ESCUTA_RODA + SEGUNDOS_VOTACAO,
        ]
      );
      await client.query(
        "update mesas_ginga set carta_ativa_id = $1 where id = $2",
        [novoSorteio.rows[0].id, mesa.id]
      );
      mesa.carta_ativa_id = novoSorteio.rows[0].id;
      return;
    }
    // Sem carta disponível nesta dimensão (não deveria acontecer, já que a
    // reserva só é aceita com carta disponível) — segue o fluxo normal.
  }

  const proximo = await proximoTurno(client, mesa.id, mesa.turno_jogador_id);
  await client.query(
    "update mesas_ginga set carta_ativa_id = null, turno_jogador_id = $1 where id = $2",
    [proximo, mesa.id]
  );
  mesa.carta_ativa_id = null;
  mesa.turno_jogador_id = proximo;
}
