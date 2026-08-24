export type EstadoMesaValor = "lobby" | "em_jogo" | "encerrada";
export type ResultadoSorteio = "ativa" | "gingou" | "voltou" | "entrei_na_roda";

export interface CartaInfo {
  cartaId: string;
  dimensao: string;
  corHex: string;
  carta: string;
  definicao: string;
  pergunta: string;
}

export interface JogadorEstado {
  id: string;
  nome: string;
  fichas: number;
  conquistas: string[]; // dimensões fechadas
}

export type FaseCarta = "escuta" | "votacao" | "expirada";

export interface VotosResumo {
  gingou: number;
  voltou: number;
  necessarios: number;
  totalVotantes: number;
  jaVotaram: string[]; // ids dos jogadores que já registraram voto nesta carta
}

export interface CartaAtiva extends CartaInfo {
  sorteioId: string;
  jogadorId: string;
  jogadorNome: string;
  fase: FaseCarta;
  escutaTerminaEm: string;
  votacaoTerminaEm: string;
  votos: VotosResumo;
}

export interface UltimaCarta extends CartaInfo {
  jogadorNome: string;
  resultado: ResultadoSorteio;
  resolvidoEm: string | null;
}

export interface ProgressoDimensao {
  dimensao: string;
  corHex: string;
  jogadas: number;
  total: number;
}

export interface EstadoMesa {
  codigo: string;
  nome: string;
  estado: EstadoMesaValor;
  criadaEm: string;
  turnoJogadorId: string | null;
  vencedorJogadorId: string | null;
  jogadores: JogadorEstado[];
  cartaAtiva: CartaAtiva | null;
  ultimasCartas: UltimaCarta[];
  progresso: ProgressoDimensao[];
  cartasRestantes: number;
}

// Dimensões e cores fixas do baralho (referência: baralho_ginga_online.csv)
export const DIMENSOES: { nome: string; cor: string }[] = [
  { nome: "Normas", cor: "#0e3e66" },
  { nome: "Governança", cor: "#cc76a7" },
  { nome: "Incentivos", cor: "#ebbe28" },
  { nome: "Gestão de capacidades", cor: "#0a6637" },
  { nome: "Ambiência", cor: "#d14b2a" },
];
