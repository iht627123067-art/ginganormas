import citacoesRaw from "../../data/citacoes.json";
import type { Citacao, TemaStats } from "./types";

export const citacoes: Citacao[] = citacoesRaw as Citacao[];

export const TEMA_COLORS: Record<string, string> = {
  "Transparência e Prestação de Contas": "#6366f1",
  "Experimentação": "#0ea5e9",
  "Aprendizagem Institucional": "#10b981",
  "Redes / Ecossistemas de Inovação": "#f59e0b",
  "Futuros e Antecipação": "#8b5cf6",
  "Metodologias Ágeis e Iterativas": "#ef4444",
  "Escalabilidade": "#06b6d4",
  "Sustentabilidade": "#84cc16",
  "Inovar com Identidade Brasileira": "#f97316",
  "Inovação Pública": "#ec4899",
  "Cultura de Inovação": "#14b8a6",
  "Segurança Psicológica": "#a855f7",
  "Capacidades e Condições para Inovar": "#3b82f6",
  "Incentivos à Inovação": "#eab308",
  "Ambiente Favorável à Inovação": "#22c55e",
  "Governança da Inovação": "#f43f5e",
  "Inovação Orientada à Equidade e Contexto": "#0891b2",
  "Valor Público": "#7c3aed",
  "Confiança Pública": "#d97706",
  "Segurança Jurídica": "#059669",
  "Gestão de Riscos": "#dc2626",
  "Ambiência para Inovação": "#65a30d",
};

export function getTemaStats(): TemaStats[] {
  const map = new Map<string, { count: number; scores: number[]; subtemas: Set<string> }>();

  for (const c of citacoes) {
    if (!map.has(c.tema)) map.set(c.tema, { count: 0, scores: [], subtemas: new Set() });
    const entry = map.get(c.tema)!;
    entry.count++;
    if (c.scoreContextoFinal != null) entry.scores.push(c.scoreContextoFinal);
    entry.subtemas.add(c.subtema);
  }

  return Array.from(map.entries())
    .map(([tema, { count, scores, subtemas }]) => ({
      tema,
      count,
      avgScore: scores.length ? +(scores.reduce((a, b) => a + b, 0) / scores.length).toFixed(3) : 0,
      subtemas: Array.from(subtemas),
    }))
    .sort((a, b) => b.count - a.count);
}

export function getScoreDimensions(items: Citacao[]) {
  const dims = [
    { key: "scoreAlinhamento", label: "Alinhamento" },
    { key: "scoreCoerencia", label: "Coerência" },
    { key: "scoreRaio", label: "Raio" },
    { key: "scoreAncoragem", label: "Ancoragem" },
    { key: "scoreConsistencia", label: "Consistência" },
    { key: "scoreContextoFinal", label: "Score Final" },
  ] as const;

  return dims.map(({ key, label }) => {
    const vals = items.map((c) => c[key]).filter((v): v is number => v != null);
    return {
      dimension: label,
      value: vals.length ? +(vals.reduce((a, b) => a + b, 0) / vals.length).toFixed(3) : 0,
      fullMark: 1,
    };
  });
}

export function getFonteType(fonte: string): "lei" | "doutrina" | "relatorio" | "outro" {
  const f = fonte.toLowerCase();
  if (f.includes("pl ") || f.includes("brasil") || f.includes("lei") || f.includes("art.")) return "lei";
  if (f.includes("guia") || f.includes("produto") || f.includes("tr_b") || f.includes("apresentação")) return "relatorio";
  if (f.includes("harvard") || f.match(/\b(press|university|wiley|elsevier|doubleday|oxford)\b/)) return "doutrina";
  if (f.match(/[A-Z]{2,}\./)) return "doutrina";
  return "outro";
}
