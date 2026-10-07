import { ExternalLink } from "lucide-react";
import { AVISO_TCU, ERRO_GROSSEIRO_TCU } from "@/lib/guia/conteudo";

// Enunciados literais da Jurisprudência Selecionada do TCU sobre erro
// grosseiro, com o aviso do próprio Tribunal sobre o alcance deles
export default function OQueOTcuTemDito() {
  return (
    <section className="mt-6 border-t-2 border-[#1b1a17] pt-12">
      <h2 className="font-lei text-[clamp(1.6rem,3.5vw,2.4rem)] leading-none">O que o TCU tem dito sobre erro grosseiro</h2>
      <p className="mt-3 max-w-3xl text-[15px] leading-relaxed text-black/70">
        Enunciados da Jurisprudência Selecionada do TCU, reproduzidos literalmente. Eles não usam todos o mesmo
        parâmetro, e é útil conhecer as diferenças antes de decidir.
      </p>
      <p className="mt-3 max-w-3xl border-l-[3px] border-[#d14b2a] pl-3 font-sans text-[12px] leading-snug text-black/60">{AVISO_TCU}</p>
      <ol className="mt-6">
        {ERRO_GROSSEIRO_TCU.map((e) => (
          <li key={e.acordao} className="grid gap-x-10 gap-y-3 border-t border-[#1b1a17]/15 py-6 md:grid-cols-[minmax(0,1fr)_15rem]">
            <div className="min-w-0">
              <a
                href={e.url}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-1 font-sans text-[13px] font-semibold text-[#0e3e66] underline underline-offset-2 hover:decoration-2"
              >
                {e.acordao} <ExternalLink size={11} aria-hidden />
                <span className="sr-only">(abre em nova aba)</span>
              </a>
              <blockquote className="mt-2 font-lei text-[17px] leading-[1.6]">{e.enunciado}</blockquote>
            </div>
            <aside className="border-l-[3px] border-[#cc76a7] pl-4 font-sans md:mt-7 md:self-start">
              <p className="mb-1 text-[10px] font-bold uppercase tracking-[0.16em] text-black/45">Para notar</p>
              <p className="text-[14px] leading-snug">{e.leitura}</p>
            </aside>
          </li>
        ))}
      </ol>
    </section>
  );
}
