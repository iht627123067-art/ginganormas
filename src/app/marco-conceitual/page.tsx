"use client";
import { citacoes, getTemaStats, TEMA_COLORS } from "@/lib/data";
import { avgField } from "@/lib/utils";
import DashboardCharts from "@/components/DashboardCharts";
import WordCloud from "@/components/WordCloud";
import { BookOpen, Tag, AlignLeft, TrendingUp, X, ChevronDown } from "lucide-react";
import type { BarEntry, HeatmapRow, ScatterPoint, HistBin } from "@/lib/types";
import { useState } from "react";

export default function Dashboard() {
  const temaStats = getTemaStats();
  const temas = Array.from(new Set(citacoes.map((c) => c.tema)));
  const subtemas = Array.from(new Set(citacoes.map((c) => c.subtema)));
  const avgScore = citacoes.length > 0 ? +(
    citacoes.reduce((s, c) => s + (c.scoreContextoFinal ?? 0), 0) / citacoes.length
  ).toFixed(2) : 0;

  const [activeFilters, setActiveFilters] = useState<{
    tema: string | null;
    subtema: string | null;
    scoreRange: [number, number];
  }>({ tema: null, subtema: null, scoreRange: [0, 1] });

  const stats = [
    { icon: BookOpen,   label: "Citações",    value: citacoes.length, sub: "Total no corpus"     },
    { icon: Tag,        label: "Temas",       value: temas.length,    sub: "Áreas analisadas"    },
    { icon: AlignLeft,  label: "Subtemas",    value: subtemas.length, sub: "Tópicos específicos" },
    { icon: TrendingUp, label: "Score Médio", value: avgScore,        sub: "Contexto Final"      },
  ];

  const heatmapData: HeatmapRow[] = temaStats.map((ts) => {
    const items = citacoes.filter((c) => c.tema === ts.tema);
    return {
      tema: ts.tema,
      alinhamento:  avgField(items, "scoreAlinhamento"),
      coerencia:    avgField(items, "scoreCoerencia"),
      raio:         avgField(items, "scoreRaio"),
      ancoragem:    avgField(items, "scoreAncoragem"),
      consistencia: avgField(items, "scoreConsistencia"),
      final:        avgField(items, "scoreContextoFinal"),
      count: items.length,
    };
  });

  const scatterData: ScatterPoint[] = temaStats.map((ts) => ({
    name: ts.tema,
    shortName: ts.tema.length > 20 ? ts.tema.slice(0, 20) + "…" : ts.tema,
    x: ts.count,
    y: ts.avgScore,
    z: ts.subtemas.length,
    color: TEMA_COLORS[ts.tema] ?? "#30578F",
  }));

  const BINS: [number, number][] = [
    [0, 0.5], [0.5, 0.6], [0.6, 0.7], [0.7, 0.8], [0.8, 0.9], [0.9, 1.01],
  ];
  const histogramData: HistBin[] = BINS.map(([low, high]) => ({
    range: low === 0 ? "< 0.50" : `${low.toFixed(2)}–${Math.min(high, 1.0).toFixed(2)}`,
    count: citacoes.filter((c) => {
      const s = c.scoreContextoFinal;
      return s != null && s >= low && s < high;
    }).length,
    low,
  }));

  const barData: BarEntry[] = temaStats.map((ts) => {
    const hrow = heatmapData.find((h) => h.tema === ts.tema);
    return {
      name: ts.tema.length > 24 ? ts.tema.slice(0, 24) + "…" : ts.tema,
      fullName: ts.tema,
      count: ts.count,
      avgScore: ts.avgScore,
      color: TEMA_COLORS[ts.tema] ?? "#30578F",
      subtemaCount: ts.subtemas.length,
      coerencia:    hrow?.coerencia    ?? 0,
      raio:         hrow?.raio         ?? 0,
      ancoragem:    hrow?.ancoragem    ?? 0,
      consistencia: hrow?.consistencia ?? 0,
    };
  });

  const clearFilters = () => setActiveFilters({ tema: null, subtema: null, scoreRange: [0, 1] });
  const hasFilters = activeFilters.tema || activeFilters.subtema;

  return (
    <div className="p-8 space-y-6 max-w-[1600px] mx-auto min-h-screen">

      {/* ── Cabeçalho da página ── */}
      <div className="flex items-start justify-between pb-5 border-b border-slate-200">
        <div className="flex items-start gap-3">
          <div
            className="w-[3px] self-stretch rounded-full mt-0.5 shrink-0"
            style={{ background: "#F1C232" }}
          />
          <div>
            <h1 className="text-2xl font-display font-black text-brand-900 leading-tight">
              Análise do Corpus
            </h1>
            <p className="text-sm text-slate-500 mt-0.5">
              Inovação Pública no Brasil · {citacoes.length} citações · {temas.length} temas
            </p>
          </div>
        </div>

        {/* Filtros rápidos */}
        <div className="flex items-center gap-2 flex-wrap justify-end">
          <div className="relative">
            <select
              value={activeFilters.tema ?? ""}
              onChange={(e) => setActiveFilters(f => ({ ...f, tema: e.target.value || null }))}
              className="appearance-none bg-white border border-slate-200 rounded-lg px-3 py-1.5 pr-8 text-sm font-medium text-slate-700 focus:outline-none focus:ring-2 focus:ring-brand-400 cursor-pointer shadow-sm"
            >
              <option value="">Todos os Temas</option>
              {temas.map(t => <option key={t} value={t}>{t}</option>)}
            </select>
            <ChevronDown size={12} className="absolute right-2.5 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" />
          </div>

          <div className="relative">
            <select
              value={activeFilters.subtema ?? ""}
              onChange={(e) => setActiveFilters(f => ({ ...f, subtema: e.target.value || null }))}
              className="appearance-none bg-white border border-slate-200 rounded-lg px-3 py-1.5 pr-8 text-sm font-medium text-slate-700 focus:outline-none focus:ring-2 focus:ring-brand-400 cursor-pointer shadow-sm"
            >
              <option value="">Todos os Subtemas</option>
              {subtemas.map(s => <option key={s} value={s}>{s}</option>)}
            </select>
            <ChevronDown size={12} className="absolute right-2.5 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" />
          </div>

          {hasFilters && (
            <button
              onClick={clearFilters}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold text-brand-700 bg-brand-50 border border-brand-100 hover:bg-brand-100 transition-colors"
            >
              <X size={11} />
              Limpar
            </button>
          )}
        </div>
      </div>

      {/* ── KPIs ── */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map(({ icon: Icon, label, value, sub }) => (
          <div key={label} className="card p-5 overflow-hidden relative group">
            {/* Faixa solar GINGA no topo */}
            <div
              className="absolute top-0 left-0 right-0 h-[3px] transition-all duration-300 group-hover:h-[4px]"
              style={{ background: "linear-gradient(90deg, #F1C232 0%, #D4A51A 100%)" }}
            />
            <div className="flex items-start justify-between mb-3 mt-1">
              <span className="label-ginga">{label}</span>
              <div className="w-7 h-7 rounded-lg bg-brand-50 flex items-center justify-center group-hover:bg-brand-100 transition-colors">
                <Icon size={13} className="text-brand-600" />
              </div>
            </div>
            <p className="text-4xl font-display font-black text-brand-900 leading-none">{value}</p>
            <p className="text-[11px] text-slate-400 mt-2 font-medium tracking-wide uppercase">{sub}</p>
          </div>
        ))}
      </div>

      {/* ── Nuvem de termos ── */}
      <WordCloud citacoes={citacoes} selectedTema={activeFilters.tema} />

      {/* ── Gráficos e análise ── */}
      <DashboardCharts
        barData={barData}
        scatterData={scatterData}
        heatmapData={heatmapData}
        histogramData={histogramData}
        citacoes={citacoes}
        temaStats={temaStats}
        activeFilters={activeFilters}
      />
    </div>
  );
}
