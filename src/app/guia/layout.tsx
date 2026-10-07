import type { Metadata } from "next";
import Link from "next/link";
import { Source_Serif_4 } from "next/font/google";
import { ArrowLeft, Lock } from "lucide-react";
import GingaSymbol from "@/components/GingaSymbol";
import { TEXTO_OBTIDO_EM, dataPorExtenso } from "@/lib/guia/conteudo";

const serif = Source_Serif_4({
  subsets: ["latin"],
  style: ["normal", "italic"],
  variable: "--font-lei",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Guia sobre Normativos para Servidores que Querem Inovar | GINGA",
  description:
    "Os trechos de lei que importam para quem quer inovar no serviço público federal, com o texto oficial e notas em linguagem simples.",
};

export default function GuiaLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className={`${serif.variable} relative min-h-full bg-[#f5f1e8] text-[#1b1a17] print:bg-white`}>
      <header className="sticky top-0 z-40 print:hidden border-b border-[#1b1a17] bg-[#f5f1e8]/95 backdrop-blur">
        <div className="mx-auto flex max-w-6xl flex-wrap items-center gap-x-4 gap-y-2 px-4 py-3 sm:flex-nowrap sm:px-8">
          {/* A plataforma GingaNormas exige login; o guia é aberto */}
          <Link
            href="/marco-conceitual"
            title="Plataforma GingaNormas (acesso restrito à equipe)"
            className="inline-flex items-center gap-1.5 text-[12px] text-black/55 hover:text-[#0e3e66]"
          >
            <ArrowLeft size={14} aria-hidden /> GingaNormas
            <Lock size={11} aria-hidden className="opacity-60" />
            <span className="sr-only">(acesso restrito)</span>
          </Link>
          <Link href="/guia" className="mx-auto flex items-center gap-2" aria-label="Início do guia">
            <span className="h-5 w-5 text-[#0e3e66]">
              <GingaSymbol className="h-auto w-full" />
            </span>
            <span className="text-[11px] font-bold uppercase tracking-[0.2em]">Guia de Normativos</span>
          </Link>
          <nav className="order-last -mx-4 flex w-[calc(100%+2rem)] items-center gap-5 overflow-x-auto whitespace-nowrap border-t border-[#1b1a17]/15 px-4 pt-2 text-[12px] font-semibold sm:order-none sm:mx-0 sm:w-auto sm:border-0 sm:px-0 sm:pt-0">
            <Link href="/guia#quero" className="hover:text-[#0e3e66]">Eu quero…</Link>
            <Link href="/guia#procurar" className="hover:text-[#0e3e66]">Procurar</Link>
            <Link href="/guia#estante" className="hover:text-[#0e3e66]">Estante</Link>
            <Link href="/guia/registro" className="hover:text-[#0e3e66]">Registro de decisão</Link>
          </nav>
        </div>
      </header>

      {children}

      <footer className="mt-24 print:hidden border-t border-[#1b1a17] bg-[#1b1a17] text-[#f5f1e8]">
        <div className="mx-auto grid max-w-6xl gap-8 px-4 py-12 sm:px-8 md:grid-cols-[2fr_1fr]">
          <div>
            <p className="font-lei text-2xl leading-snug">
              Este guia é um primeiro mapa. Ele não substitui a assessoria jurídica do seu órgão.
            </p>
            <p className="mt-4 max-w-xl text-[13px] leading-relaxed text-white/60">
              O texto legal é reproduzido literalmente da compilação do Planalto. Normas mudam: antes de decidir,
              confira a redação vigente no link de cada trecho e converse com a consultoria jurídica.
            </p>
          </div>
          <dl className="space-y-3 text-[12px] text-white/60">
            <div>
              <dt className="font-bold uppercase tracking-[0.16em] text-white/40">Texto verificado em</dt>
              <dd className="mt-0.5 text-[14px] text-white">{dataPorExtenso(TEXTO_OBTIDO_EM)}</dd>
            </div>
            <div>
              <dt className="font-bold uppercase tracking-[0.16em] text-white/40">Público</dt>
              <dd className="mt-0.5 text-[14px] text-white">Servidores públicos federais</dd>
            </div>
            <div>
              <dt className="font-bold uppercase tracking-[0.16em] text-white/40">Elaboração</dt>
              <dd className="mt-0.5 text-[14px] text-white">GINGA, dimensão Normas</dd>
            </div>
          </dl>
        </div>
      </footer>
    </div>
  );
}
