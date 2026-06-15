"use client";
import { useState, useMemo } from "react";
import type { Citacao } from "@/lib/types";
import { TEMA_COLORS, getFonteType } from "@/lib/data";
import { Search } from "lucide-react";
import clsx from "clsx";

const FONTE_BADGE: Record<string, string> = {
  lei: "bg-blue-50 text-blue-700 border-blue-200",
  doutrina: "bg-purple-50 text-purple-700 border-purple-200",
  relatorio: "bg-amber-50 text-amber-700 border-amber-200",
  outro: "bg-slate-50 text-slate-600 border-slate-200",
};
const FONTE_LABEL: Record<string, string> = {
  lei: "Lei", doutrina: "Doutrina", relatorio: "Relatório", outro: "Outro",
};

const DIMS = [
  { key: "scoreCoerencia" as const, label: "D1 Coer." },
  { key: "scoreRaio" as const, label: "D2 Raio" },
  { key: "scoreAncoragem" as const, label: "D3 Anc." },
  { key: "scoreConsistencia" as const, label: "D4 Cons." },
];

export default function LeitorView({ citacoes, temas }: { citacoes: Citacao[]; temas: string[] }) {
  const [selected, setSelected] = useState<Citacao>(citacoes[0]);
  const [search, setSearch] = useState("");
  const [temaFilter, setTemaFilter] = useState("");

  const filtered = useMemo(() => {
    let res = citacoes;
    if (temaFilter) res = res.filter((c) => c.tema === temaFilter);
    if (search) {
      const q = search.toLowerCase();
      res = res.filter((c) => c.citacaoDireta.toLowerCase().includes(q) || c.subtema.toLowerCase().includes(q));
    }
    return res;
  }, [citacoes, temaFilter, search]);

  const color = TEMA_COLORS[selected?.tema ?? ""] ?? "#6366f1";
  const fonteType = selected ? getFonteType(selected.fonte) : "outro";

  return (
    <div className="flex h-full">
      {/* Left panel */}
      <div className="w-72 shrink-0 border-r border-slate-200 bg-white flex flex-col">
        <div className="p-3 space-y-2 border-b border-slate-100">
          <div className="relative">
            <Search size={12} className="absolute left-2.5 top-1/2 -translate-y-1/2 text-slate-400" />
            <input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Buscar…"
              className="w-full pl-7 pr-3 py-1.5 text-xs border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-500"
            />
          </div>
          <select
            value={temaFilter}
            onChange={(e) => setTemaFilter(e.target.value)}
            className="w-full px-2.5 py-1.5 text-xs border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-500 bg-white text-slate-700"
          >
            <option value="">Todos os temas</option>
            {temas.map((t) => <option key={t} value={t}>{t}</option>)}
          </select>
          <p className="text-[10px] text-slate-400">{filtered.length} citações</p>
        </div>

        <div className="flex-1 overflow-y-auto">
          {filtered.map((c) => {
            const cc = TEMA_COLORS[c.tema] ?? "#94a3b8";
            const isActive = selected?.id === c.id;
            return (
              <button
                key={c.id}
                onClick={() => setSelected(c)}
                className={clsx(
                  "w-full text-left px-3 py-3 border-b border-slate-50 transition-colors hover:bg-slate-50",
                  isActive && "bg-brand-50 border-l-2 border-l-brand-500"
                )}
              >
                <div className="flex items-center gap-2 mb-1">
                  <span className="w-2 h-2 rounded-full shrink-0" style={{ backgroundColor: cc }} />
                  <span className="text-[10px] text-slate-500 line-clamp-1">{c.tema}</span>
                </div>
                <p className="text-xs text-slate-700 line-clamp-2 italic">"{c.citacaoDireta}"</p>
                <p className="text-[10px] text-slate-400 mt-1">{c.autores}</p>
              </button>
            );
          })}
        </div>
      </div>

      {/* Right panel – reader */}
      {selected && (
        <div className="flex-1 overflow-y-auto p-8 bg-slate-50">
          <div className="max-w-2xl mx-auto space-y-6">
            <div className="flex items-center gap-3">
              <span
                className="badge text-white"
                style={{ backgroundColor: color }}
              >
                {selected.tema}
              </span>
              <span className={clsx("badge border", FONTE_BADGE[fonteType])}>
                {FONTE_LABEL[fonteType]}
              </span>
              {selected.flagOutlier && (
                <span className="badge bg-amber-50 text-amber-700 border border-amber-200">⚠ Outlier</span>
              )}
            </div>

            <div>
              <h2 className="text-lg font-semibold text-slate-900 leading-snug">{selected.subtema}</h2>
            </div>

            <div
              className="rounded-xl p-6 bg-white border border-slate-200 shadow-sm border-l-4"
              style={{ borderLeftColor: color }}
            >
              <blockquote className="font-serif text-base text-slate-800 leading-relaxed">
                <span className="text-3xl leading-none text-slate-300 font-serif">"</span>
                {selected.citacaoExtensa}
                <span className="text-3xl leading-none text-slate-300 font-serif">"</span>
              </blockquote>
              <footer className="mt-4 text-xs text-slate-500 font-medium">{selected.autores}</footer>
            </div>

            <div className="card p-4">
              <p className="text-xs font-semibold text-slate-500 uppercase tracking-wide mb-2">Referência</p>
              <p className="text-xs text-slate-700 leading-relaxed">{selected.fonte}</p>
            </div>

            {selected.notaRapida && (
              <div className="bg-amber-50 border border-amber-200 rounded-xl p-4">
                <p className="text-xs font-semibold text-amber-700 uppercase tracking-wide mb-1">Nota Analítica</p>
                <p className="text-xs text-amber-900 leading-relaxed">{selected.notaRapida}</p>
              </div>
            )}

            <div className="card p-4">
              <div className="flex items-center justify-between mb-3">
                <p className="text-xs font-semibold text-slate-500 uppercase tracking-wide">Scores</p>
                <div className="flex items-center gap-1">
                  <span className="text-xs text-slate-500">Score Final:</span>
                  <span className="text-sm font-bold" style={{ color }}>
                    {selected.scoreContextoFinal?.toFixed(2) ?? "—"}
                  </span>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-3">
                {DIMS.map(({ key, label }) => {
                  const val = selected[key];
                  return (
                    <div key={key}>
                      <div className="flex justify-between mb-1">
                        <span className="text-[10px] text-slate-500">{label}</span>
                        <span className="text-[10px] font-medium text-slate-700">{val?.toFixed(2) ?? "—"}</span>
                      </div>
                      <div className="score-bar">
                        <div
                          className="score-bar-fill"
                          style={{ width: `${(val ?? 0) * 100}%`, backgroundColor: color }}
                        />
                      </div>
                    </div>
                  );
                })}
              </div>
              {selected.delta != null && (
                <p className="text-[10px] text-slate-400 mt-3">
                  Score Alinhamento: <span className="font-medium">{selected.scoreAlinhamento?.toFixed(2)}</span>
                  {" · "}
                  Δ: <span className={selected.delta >= 0 ? "text-green-600 font-medium" : "text-red-500 font-medium"}>
                    {selected.delta > 0 ? "+" : ""}{selected.delta.toFixed(2)}
                  </span>
                </p>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
