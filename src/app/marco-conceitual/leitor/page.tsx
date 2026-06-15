import { citacoes } from "@/lib/data";
import LeitorView from "@/components/LeitorView";

export default function LeitorPage() {
  const temas = Array.from(new Set(citacoes.map((c) => c.tema))).sort();
  return (
    <div className="h-screen flex flex-col">
      <div className="px-8 py-5 border-b border-slate-200 bg-white shrink-0">
        <div className="flex items-start gap-3">
          <div className="w-[3px] self-stretch rounded-full mt-0.5 shrink-0" style={{ background: "#F1C232" }} />
          <div>
            <h1 className="text-2xl font-display font-black text-brand-900 leading-tight">Leitor</h1>
            <p className="text-sm text-slate-500 mt-0.5">Navegue e leia as citações com filtros por tema</p>
          </div>
        </div>
      </div>
      <div className="flex-1 overflow-hidden">
        <LeitorView citacoes={citacoes} temas={temas} />
      </div>
    </div>
  );
}
