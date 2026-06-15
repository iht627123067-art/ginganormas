"use client";
import { useEffect } from "react";
import type { Citacao } from "@/lib/types";
import { TEMA_COLORS } from "@/lib/data";
import { X } from "lucide-react";

const DIMS = [
  { key: "scoreAlinhamento", label: "Alinhamento" },
  { key: "scoreCoerencia", label: "Coerência (D1)" },
  { key: "scoreRaio", label: "Raio (D2)" },
  { key: "scoreAncoragem", label: "Ancoragem (D3)" },
  { key: "scoreConsistencia", label: "Consistência (D4)" },
  { key: "scoreNotaRapida", label: "Nota Rápida" },
  { key: "scoreContextoFinal", label: "Score Final" },
] as const;

export default function CitacaoModal({ citacao: c, onClose }: { citacao: Citacao; onClose: () => void }) {
  useEffect(() => {
    const handler = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [onClose]);

  const color = TEMA_COLORS[c.tema] ?? "#6366f1";

  return (
    <div
      className="fixed inset-0 bg-black/30 backdrop-blur-sm z-50 flex items-center justify-center p-6"
      onClick={(e) => e.target === e.currentTarget && onClose()}
    >
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto">
        <div className="sticky top-0 bg-white border-b border-slate-100 px-6 py-4 flex items-start justify-between rounded-t-2xl">
          <div>
            <span
              className="badge text-white text-[10px] mb-2"
              style={{ backgroundColor: color }}
            >
              {c.tema}
            </span>
            <h2 className="text-sm font-semibold text-slate-900 mt-1">{c.subtema}</h2>
          </div>
          <button onClick={onClose} className="p-1.5 hover:bg-slate-100 rounded-lg transition-colors">
            <X size={16} className="text-slate-400" />
          </button>
        </div>

        <div className="px-6 py-5 space-y-5">
          <div className="bg-slate-50 rounded-xl p-4 border-l-4" style={{ borderLeftColor: color }}>
            <p className="text-sm text-slate-800 italic leading-relaxed">"{c.citacaoExtensa}"</p>
            <p className="text-xs text-slate-500 mt-2 font-medium">{c.autores}</p>
          </div>

          <div>
            <p className="text-xs font-semibold text-slate-500 uppercase tracking-wide mb-1">Fonte</p>
            <p className="text-xs text-slate-700">{c.fonte}</p>
          </div>

          {c.notaRapida && (
            <div>
              <p className="text-xs font-semibold text-slate-500 uppercase tracking-wide mb-1">Nota Rápida</p>
              <p className="text-xs text-slate-600 leading-relaxed">{c.notaRapida}</p>
            </div>
          )}

          <div>
            <p className="text-xs font-semibold text-slate-500 uppercase tracking-wide mb-3">Scores</p>
            <div className="space-y-2">
              {DIMS.map(({ key, label }) => {
                const val = c[key];
                if (val == null) return null;
                return (
                  <div key={key} className="flex items-center gap-3">
                    <span className="text-xs text-slate-600 w-32 shrink-0">{label}</span>
                    <div className="score-bar flex-1">
                      <div
                        className="score-bar-fill"
                        style={{ width: `${val * 100}%`, backgroundColor: color }}
                      />
                    </div>
                    <span className="text-xs font-mono font-medium text-slate-700 w-10 text-right">{val.toFixed(2)}</span>
                  </div>
                );
              })}
            </div>
            {c.delta != null && (
              <p className="text-xs text-slate-400 mt-2">
                Δ vs Alinhamento: <span className={c.delta >= 0 ? "text-green-600" : "text-red-500"}>{c.delta > 0 ? "+" : ""}{c.delta.toFixed(2)}</span>
              </p>
            )}
            {c.flagOutlier && (
              <span className="badge bg-amber-50 text-amber-700 mt-2">⚠ Outlier</span>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
