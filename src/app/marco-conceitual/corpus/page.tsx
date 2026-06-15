import { citacoes } from "@/lib/data";
import CorpusExplorer from "@/components/CorpusExplorer";

export default function MarcoConceitualPage() {
  const temas = Array.from(new Set(citacoes.map((c) => c.tema))).sort();
  const subtemas = Array.from(new Set(citacoes.map((c) => c.subtema))).sort();
  
  return (
    <div className="animate-in fade-in slide-in-from-bottom-2 duration-500">
      <CorpusExplorer citacoes={citacoes} temas={temas} subtemas={subtemas} />
    </div>
  );
}
