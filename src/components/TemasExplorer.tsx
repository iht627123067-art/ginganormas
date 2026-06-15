"use client";
import { useState } from "react";
import type { Citacao, TemaStats } from "@/lib/types";
import { ChevronRight, ChevronDown, LayoutGrid, List } from "lucide-react";
import { Treemap, ResponsiveContainer } from "recharts";
import { scoreColor } from "@/lib/utils";
import clsx from "clsx";
import CitacaoModal from "./CitacaoModal";

interface SubtemaNode {
  name: string;
  size: number;
  avgScore: number;
  color: string;
}

interface TemaNode {
  name: string;
  color: string;
  avgScore: number;
  children: SubtemaNode[];
}

interface Props {
  temaStats: TemaStats[];
  citacoes: Citacao[];
  colors: Record<string, string>;
  treemapHierarchy: TemaNode[];
}

function TreemapCell(props: {
  x?: number; y?: number; width?: number; height?: number;
  name?: string; depth?: number; size?: number; avgScore?: number; color?: string;
}) {
  const { x = 0, y = 0, width = 0, height = 0, name = "", depth = 0, size = 0, avgScore = 0, color = "#6366f1" } = props;
  if (width < 8 || height < 8) return null;

  const bg = depth === 1 ? color : color;
  const opacity = depth === 1 ? 0.22 : 0.9;
  const textColor = depth === 2 ? "white" : color;

  return (
    <g>
      <rect
        x={x + 1} y={y + 1}
        width={width - 2} height={height - 2}
        fill={bg} fillOpacity={opacity}
        stroke="white" strokeWidth={depth === 1 ? 2 : 0}
        rx={depth === 1 ? 8 : 3}
      />
      {depth === 1 && height > 24 && (
        <text x={x + 8} y={y + 16} fill={textColor} fontSize={11} fontWeight={700} fontFamily="Inter, sans-serif" fillOpacity={0.9}>
          {name.length > Math.floor(width / 7) ? name.slice(0, Math.floor(width / 7)) + "…" : name}
        </text>
      )}
      {depth === 2 && height > 30 && width > 40 && (
        <>
          <text x={x + 5} y={y + 14} fill="white" fontSize={9} fontWeight={600} fontFamily="Inter, sans-serif" fillOpacity={0.95}>
            {name.length > Math.floor(width / 6) ? name.slice(0, Math.floor(width / 6)) + "…" : name}
          </text>
          {height > 44 && (
            <text x={x + 5} y={y + 26} fill="white" fontSize={9} fontFamily="Inter, sans-serif" fillOpacity={0.75}>
              {size} cit. · {avgScore.toFixed(2)}
            </text>
          )}
        </>
      )}
    </g>
  );
}

export default function TemasExplorer({ temaStats, citacoes, colors, treemapHierarchy }: Props) {
  const [view, setView] = useState<"accordion" | "treemap">("accordion");
  const [openTema, setOpenTema] = useState<string | null>(null);
  const [openSubtema, setOpenSubtema] = useState<string | null>(null);
  const [modal, setModal] = useState<Citacao | null>(null);

  const citByTema = (tema: string) => citacoes.filter((c) => c.tema === tema);
  const citBySubtema = (tema: string, sub: string) =>
    citacoes.filter((c) => c.tema === tema && c.subtema === sub);

  return (
    <>
      {/* View toggle */}
      <div className="flex items-center gap-2 mb-5">
        <button
          onClick={() => setView("accordion")}
          className={clsx(
            "flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-sm transition-colors",
            view === "accordion" ? "bg-brand-600 text-white" : "bg-white border border-slate-200 text-slate-600 hover:bg-slate-50"
          )}
        >
          <List size={14} /> Accordion
        </button>
        <button
          onClick={() => setView("treemap")}
          className={clsx(
            "flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-sm transition-colors",
            view === "treemap" ? "bg-brand-600 text-white" : "bg-white border border-slate-200 text-slate-600 hover:bg-slate-50"
          )}
        >
          <LayoutGrid size={14} /> Treemap Hierárquico
        </button>
      </div>

      {/* ── Treemap view ── */}
      {view === "treemap" && (
        <div className="card p-5 space-y-4">
          <div>
            <h2 className="text-sm font-semibold text-slate-700">Treemap Tema → Subtema</h2>
            <p className="text-xs text-slate-400 mt-0.5">Tamanho = nº de citações · Área externa = tema · Área interna = subtema</p>
          </div>
          <ResponsiveContainer width="100%" height={560}>
            <Treemap
              data={treemapHierarchy}
              dataKey="size"
              aspectRatio={4 / 3}
              content={<TreemapCell />}
            />
          </ResponsiveContainer>

          {/* Legend */}
          <div className="flex flex-wrap gap-3 pt-2 border-t border-slate-100">
            {treemapHierarchy.map((t) => (
              <div key={t.name} className="flex items-center gap-1.5">
                <span className="w-2.5 h-2.5 rounded-sm" style={{ backgroundColor: t.color }} />
                <span className="text-xs text-slate-600">{t.name}</span>
                <span className="text-[10px] text-slate-400">({t.children.reduce((s, c) => s + c.size, 0)})</span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* ── Accordion view ── */}
      {view === "accordion" && (
        <div className="space-y-3">
          {temaStats.map((ts) => {
            const color = colors[ts.tema] ?? "#94a3b8";
            const isOpen = openTema === ts.tema;
            const temaItems = citByTema(ts.tema);

            return (
              <div key={ts.tema} className="card overflow-hidden">
                <button
                  onClick={() => setOpenTema(isOpen ? null : ts.tema)}
                  className="w-full flex items-center gap-4 px-5 py-4 hover:bg-slate-50 transition-colors text-left"
                >
                  <div className="w-3 h-8 rounded-full shrink-0" style={{ backgroundColor: color }} />
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-3">
                      <h3 className="font-semibold text-slate-900 text-sm">{ts.tema}</h3>
                      <span className="badge bg-slate-100 text-slate-600">{ts.count} citações</span>
                      <span className="badge bg-slate-50 text-slate-500">{ts.subtemas.length} subtemas</span>
                    </div>
                    <div className="flex items-center gap-3 mt-1.5">
                      <div className="score-bar w-32">
                        <div
                          className="score-bar-fill"
                          style={{ width: `${ts.avgScore * 100}%`, backgroundColor: scoreColor(ts.avgScore) }}
                        />
                      </div>
                      <span className="text-xs" style={{ color: scoreColor(ts.avgScore) }}>
                        {ts.avgScore.toFixed(2)}
                      </span>
                      <span className="text-xs text-slate-400">score médio</span>
                    </div>
                  </div>
                  {isOpen ? <ChevronDown size={16} className="text-slate-400 shrink-0" /> : <ChevronRight size={16} className="text-slate-400 shrink-0" />}
                </button>

                {isOpen && (
                  <div className="border-t border-slate-100">
                    <div className="px-5 py-3 bg-slate-50 grid grid-cols-3 gap-4">
                      <div className="text-center">
                        <p className="text-2xl font-bold text-slate-900">{temaItems.length}</p>
                        <p className="text-xs text-slate-500">citações</p>
                      </div>
                      <div className="text-center">
                        <p className="text-2xl font-bold text-slate-900">{ts.subtemas.length}</p>
                        <p className="text-xs text-slate-500">subtemas</p>
                      </div>
                      <div className="text-center">
                        <p className="text-2xl font-bold" style={{ color: scoreColor(ts.avgScore) }}>
                          {ts.avgScore.toFixed(2)}
                        </p>
                        <p className="text-xs text-slate-500">score médio</p>
                      </div>
                    </div>

                    <div className="divide-y divide-slate-50">
                      {ts.subtemas.map((sub) => {
                        const subItems = citBySubtema(ts.tema, sub);
                        const subKey = `${ts.tema}::${sub}`;
                        const isSubOpen = openSubtema === subKey;
                        const subAvg = subItems.length
                          ? +(subItems.reduce((s, c) => s + (c.scoreContextoFinal ?? 0), 0) / subItems.length).toFixed(2)
                          : 0;

                        return (
                          <div key={sub}>
                            <button
                              onClick={() => setOpenSubtema(isSubOpen ? null : subKey)}
                              className="w-full flex items-center gap-3 px-8 py-3 hover:bg-slate-50 transition-colors text-left"
                            >
                              <span className="w-1.5 h-1.5 rounded-full shrink-0" style={{ backgroundColor: color }} />
                              <span className="text-sm text-slate-700 flex-1">{sub}</span>
                              <span className="text-xs tabular-nums font-medium" style={{ color: scoreColor(subAvg) }}>
                                {subAvg.toFixed(2)}
                              </span>
                              <span className="text-xs text-slate-400 w-20 text-right">{subItems.length} citações</span>
                              {isSubOpen ? <ChevronDown size={14} className="text-slate-400 shrink-0" /> : <ChevronRight size={14} className="text-slate-400 shrink-0" />}
                            </button>

                            {isSubOpen && (
                              <div className="px-12 pb-3 space-y-2">
                                {subItems.map((c) => (
                                  <div
                                    key={c.id}
                                    onClick={() => setModal(c)}
                                    className="cursor-pointer bg-white rounded-lg border border-slate-100 p-3 hover:border-slate-300 transition-colors"
                                  >
                                    <p className="text-xs text-slate-700 italic line-clamp-3">"{c.citacaoDireta}"</p>
                                    <div className="flex items-center gap-3 mt-2">
                                      <span className="text-[10px] text-slate-500">{c.autores}</span>
                                      <div className="ml-auto flex items-center gap-2">
                                        <div className="score-bar w-16">
                                          <div
                                            className="score-bar-fill"
                                            style={{ width: `${(c.scoreContextoFinal ?? 0) * 100}%`, backgroundColor: scoreColor(c.scoreContextoFinal ?? 0) }}
                                          />
                                        </div>
                                        <span className="text-[10px] font-medium" style={{ color: scoreColor(c.scoreContextoFinal ?? 0) }}>
                                          {c.scoreContextoFinal?.toFixed(2) ?? "—"}
                                        </span>
                                      </div>
                                    </div>
                                  </div>
                                ))}
                              </div>
                            )}
                          </div>
                        );
                      })}
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      )}

      {modal && <CitacaoModal citacao={modal} onClose={() => setModal(null)} />}
    </>
  );
}
