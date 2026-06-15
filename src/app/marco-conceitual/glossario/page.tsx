import { citacoes } from "@/lib/data";
import GlossarioBuilder from "@/components/GlossarioBuilder";

export default function GlossarioPage() {
  const temas = Array.from(new Set(citacoes.map((c) => c.tema))).sort();
  return (
    <div className="p-8 max-w-6xl mx-auto min-h-screen">
      <div className="mb-7 flex items-start gap-3">
        <div className="w-[3px] self-stretch rounded-full mt-0.5 shrink-0" style={{ background: "#F1C232" }} />
        <div>
          <h1 className="text-2xl font-display font-black text-brand-900 leading-tight">Construtor de Glossário</h1>
          <p className="text-sm text-slate-500 mt-0.5">
            Selecione termos, escolha definições e gere um glossário acadêmico com apoio de IA
          </p>
        </div>
      </div>
      <div className="card-glass p-6">
        <GlossarioBuilder citacoes={citacoes} temas={temas} />
      </div>
    </div>
  );
}
