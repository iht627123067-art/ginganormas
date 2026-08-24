import { randomUUID } from "node:crypto";
import type { PoolClient } from "pg";
import { query } from "./db";
import type { EstadoMesa, EstadoMesaValor, ResultadoSorteio } from "./tipos";

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
          }>(
            `select s.id as sorteio_id, s.jogador_id, j.nome as jogador_nome,
                    b.id as carta_id, b.dimensao, b.cor_hex, b.carta, b.definicao, b.pergunta
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
      }>(
        `select b.id as carta_id, b.dimensao, b.cor_hex, b.carta,
                j.nome as jogador_nome, s.resultado, s.resolvido_em
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
    cartaAtiva: ativa
      ? {
          sorteioId: ativa.sorteio_id,
          jogadorId: ativa.jogador_id,
          jogadorNome: ativa.jogador_nome,
          cartaId: ativa.carta_id,
          dimensao: ativa.dimensao,
          corHex: ativa.cor_hex,
          carta: ativa.carta,
          definicao: ativa.definicao,
          pergunta: ativa.pergunta,
        }
      : null,
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
