import type { Citacao } from "./types";

export function scoreColor(score: number): string {
  const s = Math.max(0, Math.min(1, score));
  const hue = Math.round(s * 120); // 0=red, 60=yellow, 120=green
  return `hsl(${hue}, 65%, 46%)`;
}

export function scoreColorBg(score: number): string {
  const s = Math.max(0, Math.min(1, score));
  const hue = Math.round(s * 120);
  return `hsl(${hue}, 55%, 93%)`;
}

type NumericKeysOf<T> = {
  [K in keyof T]: T[K] extends number | null ? K : never;
}[keyof T];

export function avgField(items: Citacao[], key: NumericKeysOf<Citacao>): number {
  const vals = items
    .map((c) => c[key] as number | null)
    .filter((v): v is number => v != null);
  return vals.length
    ? +(vals.reduce((a, b) => a + b, 0) / vals.length).toFixed(3)
    : 0;
}

export function scoreLabel(score: number): string {
  if (score >= 0.9) return "Muito alto";
  if (score >= 0.75) return "Alto";
  if (score >= 0.6) return "Moderado";
  if (score >= 0.45) return "Baixo";
  return "Muito baixo";
}
