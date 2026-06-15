"use client";
import { useState } from "react";
import type { Citacao } from "@/lib/types";
import { TEMA_COLORS } from "@/lib/data";
import { scoreColor } from "@/lib/utils";
import CitacaoModal from "./CitacaoModal";
import clsx from "clsx";

const MINI_DIMS: { key: keyof Citacao; label: string }[] = [
  { key: "scoreCoerencia", label: "D1" },
  { key: "scoreRaio", label: "D2" },
  { key: "scoreAncoragem", label: "D3" },
  { key: "scoreConsistencia", label: "D4" },
];

interface Props {
  citacoes: Citacao[];
  selectedTema: string | null;
}

export default function CitacoesInlineTable({ citacoes, selectedTema }: Props) {
  const [modal, setModal] = useState<Citacao | null>(null);
  const [showAll, setShowAll] = useState(false);
  const [sortBy, setSortBy] = useState<"score" | "id">("score");

  const filtered = selectedTema ? citacoes.filter((c) => c.tema === selectedTema) : citacoes;
  const sorted = [...filtered].sort((a, b) => {
    if (sortBy === "score") return (b.scoreContextoFinal ?? 0) - (a.scoreContextoFinal ?? 0);
    return a.id - b.id;
  });
  const visible = showAll ? sorted : sorted.slice(0, 8);

  return (
    <>
      <div>
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-3">
            <h3 className="text-sm font-semibold text-slate-700">
              {selectedTema ? `Citações — ${selectedTema}` : "Top citações"}
            </h3>
            <span className="text-xs text-slate-400">{filtered.length} resultados</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-xs text-slate-500">Ordenar:</span>
            <button
              onClick={() => setSortBy("score")}
              className={clsx("text-xs px-2 py-1 rounded", sortBy === "score" ? "bg-brand-100 text-brand-700 font-medium" : "text-slate-500 hover:text-slate-700")}
            >
              Score
            </button>
            <button
              onClick={() => setSortBy("id")}
              className={clsx("text-xs px-2 py-1 rounded", sortBy === "id" ? "bg-brand-100 text-brand-700 font-medium" : "text-slate-500 hover:text-slate-700")}
            >
              ID
            </button>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-xs">
            <thead>
              <tr className="border-b border-slate-100">
                <th className="pb-2 text-left text-slate-400 font-medium w-8">#</th>
                <th className="pb-2 text-left text-slate-400 font-medium w-36">Tema</th>
                <th className="pb-2 text-left text-slate-400 font-medium">Citação</th>
                {MINI_DIMS.map((d) => (
                  <th key={d.key} className="pb-2 text-center text-slate-400 font-medium w-10">{d.label}</th>
                ))}
                <th className="pb-2 text-right text-slate-400 font-medium w-14">Final</th>
              </tr>
            </thead>
            <tbody>
              {visible.map((c) => {
                const color = TEMA_COLORS[c.tema] ?? "#94a3b8";
                return (
                  <tr
                    key={c.id}
                    className="border-b border-slate-50 hover:bg-slate-50 cursor-pointer"
                    onClick={() => setModal(c)}
                  >
                    <td className="py-2 text-slate-400 font-mono">{c.id}</td>
                    <td className="py-2 pr-2">
                      <span
                        className="inline-block px-1.5 py-0.5 rounded-full text-[10px] font-medium text-white leading-tight"
                        style={{ backgroundColor: color }}
                      >
                        {c.tema.length > 16 ? c.tema.slice(0, 16) + "…" : c.tema}
                      </span>
                    </td>
                    <td className="py-2 pr-4 max-w-[280px]">
                      <p className="text-slate-700 italic line-clamp-1">"{c.citacaoDireta}"</p>
                      <p className="text-slate-400 mt-0.5 line-clamp-1">{c.autores}</p>
                    </td>
                    {MINI_DIMS.map((d) => {
                      const val = c[d.key] as number | null;
                      return (
                        <td key={d.key} className="py-2 px-1">
                          <div className="flex flex-col items-center gap-0.5">
                            <div className="w-8 score-bar">
                              <div
                                className="score-bar-fill"
                                style={{ width: `${(val ?? 0) * 100}%`, backgroundColor: scoreColor(val ?? 0) }}
                              />
                            </div>
                            <span style={{ color: scoreColor(val ?? 0) }} className="font-mono tabular-nums">
                              {val?.toFixed(1) ?? "—"}
                            </span>
                          </div>
                        </td>
                      );
                    })}
                    <td className="py-2 text-right">
                      <span
                        className="text-xs font-bold tabular-nums"
                        style={{ color: scoreColor(c.scoreContextoFinal ?? 0) }}
                      >
                        {c.scoreContextoFinal?.toFixed(2) ?? "—"}
                      </span>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>

        {sorted.length > 8 && (
          <button
            onClick={() => setShowAll((s) => !s)}
            className="mt-3 text-xs text-brand-600 hover:underline"
          >
            {showAll ? "Ver menos" : `Ver todas as ${sorted.length} citações`}
          </button>
        )}
      </div>

      {modal && <CitacaoModal citacao={modal} onClose={() => setModal(null)} />}
    </>
  );
}
