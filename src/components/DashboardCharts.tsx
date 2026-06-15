"use client";
import { useState, useMemo } from "react";
import {
  BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Cell,
  RadarChart, PolarGrid, PolarAngleAxis, Radar,
} from "recharts";
import type { Citacao, TemaStats, BarEntry, HeatmapRow, ScatterPoint, HistBin } from "@/lib/types";
import { getScoreDimensions } from "@/lib/data";
import { scoreColor, avgField } from "@/lib/utils";
import FreqScatterPlot from "./charts/FreqScatterPlot";
import HeatmapGrid from "./charts/HeatmapGrid";
import ScoreHistogram from "./charts/ScoreHistogram";
import CitacoesInlineTable from "./CitacoesInlineTable";
import { X } from "lucide-react";
import clsx from "clsx";
import { motion, AnimatePresence } from "framer-motion";

interface Props {
  barData: BarEntry[];
  scatterData: ScatterPoint[];
  heatmapData: HeatmapRow[];
  histogramData: HistBin[];
  citacoes: Citacao[];
  temaStats: TemaStats[];
  activeFilters?: {
    tema: string | null;
    subtema: string | null;
    scoreRange: [number, number];
  };
}

type Tab = "overview" | "themes" | "distribution";

const TABS: { key: Tab; label: string }[] = [
  { key: "overview", label: "Visão Geral" },
  { key: "themes", label: "Temas & Dimensões" },
  { key: "distribution", label: "Distribuição" },
];

const BarTooltip = ({
  active, payload,
}: {
  active?: boolean;
  payload?: Array<{ payload: BarEntry }>;
}) => {
  if (!active || !payload?.length) return null;
  const d = payload[0].payload;
  return (
    <div className="card-glass shadow-2xl p-4 text-xs max-w-[240px] z-50">
      <p className="font-display font-semibold text-slate-900 dark:text-white mb-3 text-sm">{d.fullName}</p>
      <div className="grid grid-cols-2 gap-2 mb-3">
        <div>
          <p className="text-[10px] text-slate-400 uppercase">Citações</p>
          <p className="text-slate-800 dark:text-slate-200 font-semibold">{d.count}</p>
        </div>
        <div>
          <p className="text-[10px] text-slate-400 uppercase">Subtemas</p>
          <p className="text-slate-800 dark:text-slate-200 font-semibold">{d.subtemaCount}</p>
        </div>
      </div>
      <p className="text-slate-600 dark:text-slate-400 border-t border-slate-100 dark:border-slate-800 pt-3">
        Score médio: <span className="font-bold text-sm" style={{ color: scoreColor(d.avgScore) }}>{d.avgScore.toFixed(2)}</span>
      </p>
    </div>
  );
};

export default function DashboardCharts({ barData, scatterData, heatmapData, histogramData, citacoes, temaStats, activeFilters }: Props) {
  const [selectedTema, setSelectedTema] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<Tab>("overview");

  // Apply filters to data
  const filteredCitacoes = useMemo(() => {
    let result = citacoes;
    if (activeFilters?.tema) {
      result = result.filter(c => c.tema === activeFilters.tema);
    }
    if (activeFilters?.subtema) {
      result = result.filter(c => c.subtema === activeFilters.subtema);
    }
    return result;
  }, [citacoes, activeFilters]);

  function handleTemaClick(tema: string) {
    setSelectedTema((prev) => (prev === tema ? null : tema));
  }

  const avgX = temaStats.length > 0 ? +(temaStats.reduce((s, t) => s + t.count, 0) / temaStats.length).toFixed(1) : 0;
  const avgY = temaStats.length > 0 ? +(temaStats.reduce((s, t) => s + t.avgScore, 0) / temaStats.length).toFixed(3) : 0;

  const derivedKPIs = useMemo(() => {
    if (!selectedTema) return null;
    const items = filteredCitacoes.filter((c) => c.tema === selectedTema);
    return {
      count: items.length,
      avgFinal: avgField(items, "scoreContextoFinal"),
      coerencia: avgField(items, "scoreCoerencia"),
      raio: avgField(items, "scoreRaio"),
      ancoragem: avgField(items, "scoreAncoragem"),
      consistencia: avgField(items, "scoreConsistencia"),
    };
  }, [filteredCitacoes, selectedTema]);

  const radarData = useMemo(
    () => getScoreDimensions(selectedTema ? filteredCitacoes.filter((c) => c.tema === selectedTema) : filteredCitacoes),
    [filteredCitacoes, selectedTema]
  );

  const topOutliers = filteredCitacoes.filter((c) => c.flagOutlier);

  return (
    <div className="space-y-6">
      {/* Tab bar — editorial underline, sem glass pill */}
      <div className="flex items-center gap-0 border-b-2 border-slate-100">
        {TABS.map(({ key, label }) => (
          <button
            key={key}
            onClick={() => setActiveTab(key)}
            className={clsx(
              "relative px-6 py-3 text-sm font-display font-semibold transition-all duration-150",
              activeTab === key
                ? "text-brand-900"
                : "text-slate-400 hover:text-slate-600"
            )}
          >
            <span>{label}</span>
            {activeTab === key && (
              <motion.div
                layoutId="tab-line"
                className="absolute bottom-[-2px] left-0 right-0 h-[3px] rounded-t-sm"
                style={{ background: "#F1C232" }}
                transition={{ type: "spring", stiffness: 380, damping: 36 }}
              />
            )}
          </button>
        ))}
      </div>

      {selectedTema && (
        <motion.div 
          initial={{ opacity: 0, y: -10 }} 
          animate={{ opacity: 1, y: 0 }} 
          className="flex items-center gap-3 p-3 bg-brand-50/80 dark:bg-brand-900/20 backdrop-blur rounded-xl border border-brand-100 dark:border-brand-800 w-max"
        >
          <span className="text-xs text-brand-600/70 font-medium">Filtro ativo:</span>
          <span className="text-sm text-brand-800 dark:text-brand-200 font-semibold">
            {selectedTema.length > 30 ? selectedTema.slice(0, 30) + "…" : selectedTema}
          </span>
          <button
            onClick={() => setSelectedTema(null)}
            className="p-1 rounded-full hover:bg-brand-100 dark:hover:bg-brand-800 transition-colors ml-2 text-brand-600"
          >
            <X size={14} />
          </button>
        </motion.div>
      )}

      {/* Derived KPI row (appears when tema is selected) */}
      <AnimatePresence>
        {derivedKPIs && (
          <motion.div 
            initial={{ opacity: 0, height: 0 }} 
            animate={{ opacity: 1, height: "auto" }} 
            exit={{ opacity: 0, height: 0 }}
            className="overflow-hidden"
          >
            <div className="grid grid-cols-6 gap-4 p-5 bg-gradient-to-r from-brand-50/80 to-accent-50/80 dark:from-brand-900/30 dark:to-accent-900/30 backdrop-blur rounded-2xl border border-white/50 dark:border-slate-800 shadow-sm">
              <div className="col-span-1 border-r border-brand-100 dark:border-brand-800/50 pr-4">
                <p className="text-[10px] text-brand-600 font-bold uppercase tracking-widest mb-1">Citações</p>
                <p className="text-3xl font-display font-bold text-slate-900 dark:text-white">{derivedKPIs.count}</p>
              </div>
              <div className="col-span-1 border-r border-brand-100 dark:border-brand-800/50 px-4">
                <p className="text-[10px] text-brand-600 font-bold uppercase tracking-widest mb-1">Score Final</p>
                <p className="text-3xl font-display font-bold" style={{ color: scoreColor(derivedKPIs.avgFinal) }}>
                  {derivedKPIs.avgFinal.toFixed(2)}
                </p>
              </div>
              <div className="col-span-4 grid grid-cols-4 gap-4 pl-4 items-center">
                {[
                  ["Coerência", derivedKPIs.coerencia],
                  ["Raio", derivedKPIs.raio],
                  ["Ancoragem", derivedKPIs.ancoragem],
                  ["Consistência", derivedKPIs.consistencia],
                ].map(([label, val]) => (
                  <div key={label as string}>
                    <p className="text-[10px] text-brand-600/80 font-bold uppercase tracking-widest mb-2">{label}</p>
                    <div className="flex items-center gap-2">
                      <div className="score-bar flex-1 h-2">
                        <div className="score-bar-fill" style={{ width: `${(val as number) * 100}%`, backgroundColor: scoreColor(val as number) }} />
                      </div>
                      <span className="text-xs font-bold tabular-nums" style={{ color: scoreColor(val as number) }}>
                        {(val as number).toFixed(2)}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence mode="wait">
        <motion.div
          key={activeTab}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          transition={{ duration: 0.2 }}
        >
          {/* ── TAB 1: Visão Geral ── */}
          {activeTab === "overview" && (
            <div className="space-y-6">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Bar chart: citações por tema, colorido por score */}
                <div className="card-glass p-6">
                  <div className="flex items-center justify-between mb-4">
                    <h2 className="text-base font-display font-bold text-slate-800 dark:text-slate-100">Citações por Tema</h2>
                  </div>
                  <ResponsiveContainer width="100%" height={380}>
                    <BarChart
                      data={barData}
                      layout="vertical"
                      margin={{ left: 4, right: 32, top: 0, bottom: 0 }}
                      onClick={(d) => {
                        if (d?.activePayload?.[0]?.payload?.fullName) {
                          handleTemaClick(d.activePayload[0].payload.fullName);
                        }
                      }}
                      style={{ cursor: "pointer" }}
                    >
                      <XAxis type="number" tick={{ fontSize: 11, fill: "#94a3b8", fontFamily: "Inter" }} axisLine={false} tickLine={false} />
                      <YAxis
                        dataKey="name" type="category" width={148}
                        tick={{ fontSize: 11, fill: "#64748b", fontFamily: "Inter", fontWeight: 500 }} axisLine={false} tickLine={false}
                      />
                      <Tooltip cursor={{fill: 'rgba(0,0,0,0.02)'}} content={<BarTooltip />} />
                      <Bar dataKey="count" radius={[0, 4, 4, 0]} maxBarSize={16}>
                        {barData.map((entry, i) => (
                          <Cell
                            key={i}
                            fill={scoreColor(entry.avgScore)}
                            fillOpacity={selectedTema && selectedTema !== entry.fullName ? 0.2 : 1}
                            className="transition-all duration-300 hover:brightness-110"
                          />
                        ))}
                      </Bar>
                    </BarChart>
                  </ResponsiveContainer>
                </div>

                {/* Scatter: frequência × score */}
                <div className="card-glass p-6">
                  <div className="flex items-center justify-between mb-4">
                    <h2 className="text-base font-display font-bold text-slate-800 dark:text-slate-100">Frequência × Score Médio</h2>
                  </div>
                  <FreqScatterPlot
                    data={scatterData}
                    selectedTema={selectedTema}
                    onTemaClick={handleTemaClick}
                    avgX={avgX}
                    avgY={avgY}
                  />
                </div>
              </div>

              {/* Bottom: table of citations */}
              <div className="card-glass p-6">
                <CitacoesInlineTable citacoes={filteredCitacoes} selectedTema={selectedTema} />
              </div>
            </div>
          )}

          {/* ── TAB 2: Temas & Dimensões ── */}
          {activeTab === "themes" && (
            <div className="space-y-6">
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Heatmap: tema × dimensão */}
                <div className="lg:col-span-2 card-glass p-6">
                  <div className="flex items-center justify-between mb-4">
                    <h2 className="text-base font-display font-bold text-slate-800 dark:text-slate-100">Heatmap — Tema × Dimensão</h2>
                  </div>
                  <HeatmapGrid
                    data={heatmapData}
                    selectedTema={selectedTema}
                    onTemaClick={handleTemaClick}
                  />
                </div>

                {/* Radar: score por dimensão */}
                <div className="card-glass p-6 flex flex-col">
                  <h2 className="text-base font-display font-bold text-slate-800 dark:text-slate-100 mb-2">Score por Dimensão</h2>
                  <p className="text-xs text-slate-500 mb-4 font-medium">
                    {selectedTema ? selectedTema : "Corpus completo"}
                  </p>
                  <div className="flex-1 min-h-[260px]">
                    <ResponsiveContainer width="100%" height="100%">
                      <RadarChart data={radarData}>
                        <PolarGrid stroke="#e2e8f0" strokeDasharray="3 3" />
                        <PolarAngleAxis dataKey="dimension" tick={{ fontSize: 10, fill: "#64748b", fontFamily: "Inter", fontWeight: 600 }} />
                        <Radar
                          name="Score"
                          dataKey="value"
                          stroke="#0d9488"
                          fill="#14b8a6"
                          fillOpacity={0.3}
                          strokeWidth={2}
                        />
                      </RadarChart>
                    </ResponsiveContainer>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* ── TAB 3: Distribuição ── */}
          {activeTab === "distribution" && (
            <div className="space-y-6">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Histogram */}
                <div className="card-glass p-6">
                  <h2 className="text-base font-display font-bold text-slate-800 dark:text-slate-100 mb-4">Distribuição de Scores</h2>
                  <ScoreHistogram
                    data={histogramData}
                    selectedTema={selectedTema}
                    citacoes={filteredCitacoes}
                  />
                </div>

                {/* Outliers */}
                <div className="card-glass p-6">
                  <h2 className="text-base font-display font-bold text-slate-800 dark:text-slate-100 mb-4">
                    Outliers Identificados ({topOutliers.length})
                  </h2>
                  {topOutliers.length === 0 ? (
                    <p className="text-sm text-slate-400">Nenhum outlier identificado no corpus.</p>
                  ) : (
                    <div className="space-y-3 max-h-64 overflow-y-auto pr-2">
                      {topOutliers.map((c) => (
                        <div key={c.id} className="flex items-start gap-3 bg-red-50/50 dark:bg-red-900/10 rounded-xl p-3 border border-red-100 dark:border-red-900/30">
                          <span className="flex-shrink-0 w-6 h-6 rounded-full bg-red-100 text-red-600 flex items-center justify-center text-xs font-bold mt-0.5">!</span>
                          <div className="min-w-0">
                            <p className="text-sm font-semibold text-slate-800 dark:text-slate-200">{c.subtema}</p>
                            <p className="text-xs text-slate-500 mt-1">
                              {c.tema} • Δ{c.delta != null ? (c.delta > 0 ? "+" : "") + c.delta.toFixed(2) : "?"}
                            </p>
                            <p className="text-xs text-slate-500 mt-2 italic leading-relaxed line-clamp-2">"{c.citacaoDireta}"</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>

              {/* Full citation table */}
              <div className="card-glass p-6">
                <CitacoesInlineTable citacoes={filteredCitacoes} selectedTema={selectedTema} />
              </div>
            </div>
          )}
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
