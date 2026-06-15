"use client";
import { useState } from "react";
import type { HeatmapRow } from "@/lib/types";
import { scoreColor, scoreColorBg, scoreLabel } from "@/lib/utils";
import { TEMA_COLORS } from "@/lib/data";
import clsx from "clsx";

const DIMS: { key: keyof HeatmapRow; label: string }[] = [
  { key: "alinhamento", label: "Alinhamento" },
  { key: "coerencia", label: "Coerência" },
  { key: "raio", label: "Raio" },
  { key: "ancoragem", label: "Ancoragem" },
  { key: "consistencia", label: "Consistência" },
  { key: "final", label: "Score Final" },
];

interface Props {
  data: HeatmapRow[];
  selectedTema: string | null;
  onTemaClick: (tema: string) => void;
}

interface TooltipState {
  tema: string;
  dim: string;
  value: number;
  count: number;
  x: number;
  y: number;
}

export default function HeatmapGrid({ data, selectedTema, onTemaClick }: Props) {
  const [tooltip, setTooltip] = useState<TooltipState | null>(null);

  return (
    <div className="relative overflow-x-auto">
      <table className="w-full text-xs border-separate" style={{ borderSpacing: "2px" }}>
        <thead>
          <tr>
            <th className="text-left px-2 py-1.5 text-slate-500 font-medium w-40">Tema</th>
            {DIMS.map((d) => (
              <th
                key={d.key}
                className="text-center px-1 py-1.5 text-slate-500 font-medium min-w-[72px]"
              >
                {d.label}
              </th>
            ))}
            <th className="text-center px-1 py-1.5 text-slate-500 font-medium w-12">Cit.</th>
          </tr>
        </thead>
        <tbody>
          {data.map((row) => {
            const isSelected = selectedTema === row.tema;
            const isDimmed = !!selectedTema && !isSelected;
            const temaColor = TEMA_COLORS[row.tema] ?? "#94a3b8";

            return (
              <tr
                key={row.tema}
                className="cursor-pointer"
                onClick={() => onTemaClick(row.tema)}
              >
                <td
                  className={clsx(
                    "px-2 py-1 rounded-l transition-opacity",
                    isDimmed && "opacity-30",
                    isSelected && "font-semibold"
                  )}
                >
                  <div className="flex items-center gap-1.5">
                    <span
                      className="w-1.5 h-4 rounded-sm shrink-0"
                      style={{ backgroundColor: temaColor }}
                    />
                    <span
                      className="leading-tight"
                      style={{ color: isSelected ? temaColor : "#475569" }}
                    >
                      {row.tema.length > 22 ? row.tema.slice(0, 22) + "…" : row.tema}
                    </span>
                  </div>
                </td>

                {DIMS.map((d) => {
                  const val = row[d.key] as number;
                  return (
                    <td
                      key={d.key}
                      className={clsx("px-1 py-0.5 text-center rounded transition-opacity", isDimmed && "opacity-20")}
                      onMouseEnter={(e) => {
                        const rect = (e.target as HTMLElement).getBoundingClientRect();
                        setTooltip({ tema: row.tema, dim: d.label, value: val, count: row.count, x: rect.left, y: rect.top });
                      }}
                      onMouseLeave={() => setTooltip(null)}
                    >
                      <div
                        className="rounded py-1 px-1 text-center text-[10px] font-semibold transition-all"
                        style={{
                          backgroundColor: scoreColorBg(val),
                          color: scoreColor(val),
                          outline: isSelected && d.key === "final" ? `2px solid ${temaColor}` : "none",
                        }}
                      >
                        {val.toFixed(2)}
                      </div>
                    </td>
                  );
                })}

                <td
                  className={clsx(
                    "px-1 py-1 text-center text-slate-400 rounded-r transition-opacity",
                    isDimmed && "opacity-30"
                  )}
                >
                  {row.count}
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>

      {/* Tooltip */}
      {tooltip && (
        <div
          className="fixed z-50 bg-white border border-slate-200 shadow-lg rounded-lg p-3 text-xs pointer-events-none"
          style={{ left: tooltip.x + 12, top: tooltip.y - 60 }}
        >
          <p className="font-semibold text-slate-800 mb-1">{tooltip.tema}</p>
          <p className="text-slate-600">{tooltip.dim}: <span className="font-medium" style={{ color: scoreColor(tooltip.value) }}>{tooltip.value.toFixed(2)}</span></p>
          <p className="text-slate-500 mt-0.5">{scoreLabel(tooltip.value)} · {tooltip.count} citações</p>
        </div>
      )}
    </div>
  );
}
