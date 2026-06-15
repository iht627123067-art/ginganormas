export interface Citacao {
  id: number;
  idTermo: string;
  tema: string;
  subtema: string;
  citacaoDireta: string;
  citacaoExtensa: string;
  secaoSubsecao: string | null;
  autores: string;
  fonte: string;
  notaRapida: string | null;
  scoreAlinhamento: number | null;
  scoreCoerencia: number | null;
  scoreRaio: number | null;
  scoreAncoragem: number | null;
  scoreConsistencia: number | null;
  scoreNotaRapida: number | null;
  scoreContextoFinal: number | null;
  delta: number | null;
  flagOutlier: string | null;
}

export interface TemaStats {
  tema: string;
  count: number;
  avgScore: number;
  subtemas: string[];
}

export interface HeatmapRow {
  tema: string;
  alinhamento: number;
  coerencia: number;
  raio: number;
  ancoragem: number;
  consistencia: number;
  final: number;
  count: number;
}

export interface ScatterPoint {
  name: string;
  shortName: string;
  x: number;
  y: number;
  z: number;
  color: string;
}

export interface HistBin {
  range: string;
  count: number;
  low: number;
}

export interface BarEntry {
  name: string;
  fullName: string;
  count: number;
  avgScore: number;
  color: string;
  subtemaCount: number;
  coerencia: number;
  raio: number;
  ancoragem: number;
  consistencia: number;
}
