// Regras de tempo da roda: escuta silenciosa antes de votar, depois janela de votação.
export const SEGUNDOS_ESCUTA = 180;
export const SEGUNDOS_VOTACAO = 30;

export type FaseCarta = "escuta" | "votacao" | "expirada";

export function calcularFase(
  agora: Date,
  escutaTerminaEm: Date | null,
  votacaoTerminaEm: Date | null
): FaseCarta {
  if (escutaTerminaEm && agora < escutaTerminaEm) return "escuta";
  if (votacaoTerminaEm && agora < votacaoTerminaEm) return "votacao";
  return "expirada";
}

export function formatarContagem(segundos: number): string {
  const s = Math.max(0, Math.ceil(segundos));
  const min = Math.floor(s / 60);
  const seg = s % 60;
  return `${min}:${seg.toString().padStart(2, "0")}`;
}
