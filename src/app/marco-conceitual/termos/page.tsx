import { citacoes, getTemaStats, TEMA_COLORS } from "@/lib/data";
import TemasExplorer from "@/components/TemasExplorer";
import { avgField } from "@/lib/utils";

export default function TermosPage() {
  const temaStats = getTemaStats();

  const treemapHierarchy = temaStats.map((ts) => ({
    name: ts.tema,
    color: TEMA_COLORS[ts.tema] ?? "#94a3b8",
    avgScore: ts.avgScore,
    children: ts.subtemas.map((sub) => {
      const items = citacoes.filter((c) => c.tema === ts.tema && c.subtema === sub);
      return {
        name: sub,
        size: items.length,
        avgScore: avgField(items, "scoreContextoFinal"),
        color: TEMA_COLORS[ts.tema] ?? "#94a3b8",
      };
    }),
  }));

  return (
    <div className="p-8 max-w-7xl mx-auto min-h-screen">
      <div className="mb-7 flex items-start gap-3">
        <div className="w-[3px] self-stretch rounded-full mt-0.5 shrink-0" style={{ background: "#F1C232" }} />
        <div>
          <h1 className="text-2xl font-display font-black text-brand-900 leading-tight">Temas & Termos</h1>
          <p className="text-sm text-slate-500 mt-0.5">Explore os temas centrais, subtemas e suas citações associadas</p>
        </div>
      </div>
      <div className="card-glass p-6">
        <TemasExplorer
          temaStats={temaStats}
          citacoes={citacoes}
          colors={TEMA_COLORS}
          treemapHierarchy={treemapHierarchy}
        />
      </div>
    </div>
  );
}
