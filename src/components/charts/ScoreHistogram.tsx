"use client";
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Cell } from "recharts";
import type { HistBin, Citacao } from "@/lib/types";
import { scoreColor } from "@/lib/utils";

interface Props {
  data: HistBin[];
  selectedTema: string | null;
  citacoes: Citacao[];
}

interface TooltipProps {
  active?: boolean;
  payload?: Array<{ payload: HistBin & { filteredCount: number } }>;
}

const HistTooltip = ({ active, payload }: TooltipProps) => {
  if (!active || !payload?.length) return null;
  const d = payload[0].payload;
  return (
    <div className="bg-white border border-slate-200 rounded-lg shadow-lg p-3 text-xs">
      <p className="font-semibold text-slate-800 mb-1">Score {d.range}</p>
      <p className="text-slate-600">{d.filteredCount} citações</p>
    </div>
  );
};

export default function ScoreHistogram({ data, selectedTema, citacoes }: Props) {
  const BINS: [number, number][] = [
    [0, 0.5], [0.5, 0.6], [0.6, 0.7], [0.7, 0.8], [0.8, 0.9], [0.9, 1.01],
  ];

  const filtered = selectedTema ? citacoes.filter((c) => c.tema === selectedTema) : citacoes;
  const enriched = data.map((bin, i) => {
    const [lo, hi] = BINS[i] ?? [bin.low, bin.low + 0.1] as [number, number];
    return {
      ...bin,
      filteredCount: filtered.filter((c) => {
        const s = c.scoreContextoFinal;
        return s != null && s >= lo && s < hi;
      }).length,
    };
  });

  const max = Math.max(...enriched.map((b) => b.filteredCount));

  return (
    <div>
      <ResponsiveContainer width="100%" height={200}>
        <BarChart data={enriched} margin={{ top: 8, right: 8, bottom: 20, left: 0 }}>
          <XAxis
            dataKey="range"
            tick={{ fontSize: 10, fill: "#94a3b8" }}
            axisLine={false} tickLine={false}
            label={{ value: "Score Final", position: "insideBottom", offset: -10, fontSize: 11, fill: "#94a3b8" }}
          />
          <YAxis
            tick={{ fontSize: 10, fill: "#94a3b8" }}
            axisLine={false} tickLine={false}
            allowDecimals={false}
          />
          <Tooltip content={<HistTooltip />} />
          <Bar dataKey="filteredCount" radius={[4, 4, 0, 0]} maxBarSize={40}>
            {enriched.map((entry, i) => (
              <Cell
                key={i}
                fill={scoreColor(entry.low === 0 ? 0.25 : entry.low + 0.05)}
                fillOpacity={entry.filteredCount === max ? 1 : 0.7}
              />
            ))}
          </Bar>
        </BarChart>
      </ResponsiveContainer>

      {selectedTema && (
        <p className="text-center text-xs text-slate-500 mt-1">
          Filtrado por: <span className="font-medium text-slate-700">{selectedTema}</span>
        </p>
      )}
    </div>
  );
}
