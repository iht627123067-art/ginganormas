import Link from "next/link";
import EuQuero from "@/components/guia/EuQuero";
import ProcurarNasLeis from "@/components/guia/ProcurarNasLeis";
import { ExternalLink } from "lucide-react";
import { NORMAS, REDE } from "@/lib/guia/conteudo";
import { textoContraste } from "@/lib/jogo/ui";

export default function GuiaInicio() {
  const estante = [...NORMAS].sort((a, b) => a.ano - b.ano);

  return (
    <main>
      {/* ── Abertura ── */}
      <section className="mx-auto max-w-6xl px-4 pb-14 pt-14 sm:px-8 sm:pt-20">
        <p className="mb-6 font-sans text-[11px] font-bold uppercase tracking-[0.2em] text-[#0e3e66]">
          GINGA · Guia sobre Normativos para Servidores que Querem Inovar
        </p>
        <h1 className="max-w-4xl font-lei text-[clamp(2.4rem,6.5vw,5.2rem)] font-semibold leading-[0.98] tracking-tight">
          A lei já permite.
          <br />
          <span className="italic text-[#0e3e66]">Aqui está o trecho.</span>
        </h1>
        <p className="mt-8 max-w-2xl text-[17px] leading-relaxed text-black/70">
          Ninguém que respondeu ao Diagnóstico GINGA descreveu o próprio problema citando um artigo de lei. Falaram em
          medo, punição e em &ldquo;copiar o texto da lei&rdquo; como caminho seguro. Este guia faz o caminho inverso:
          parte do que você quer fazer e mostra, no texto oficial, os dispositivos que autorizam e protegem a sua decisão.
        </p>
      </section>

      {/* ── Eu quero… ── */}
      <section className="mx-auto max-w-6xl px-4 sm:px-8">
        <h2 className="mb-6 font-lei text-[clamp(2rem,4.5vw,3.25rem)] italic leading-none">Eu quero…</h2>
        <EuQuero />
      </section>

      {/* ── Procurar ── */}
      <section className="mx-auto mt-24 max-w-3xl px-4 sm:px-8">
        <ProcurarNasLeis />
      </section>

      {/* ── Estante ── */}
      <section id="estante" className="mt-24 scroll-mt-20 border-y border-[#1b1a17] bg-[#ebe5d6]">
        <div className="mx-auto max-w-6xl px-4 py-14 sm:px-8">
          <div className="mb-8 flex flex-wrap items-end justify-between gap-4">
            <h2 className="font-lei text-[clamp(1.8rem,4vw,2.75rem)] leading-none">A estante</h2>
            <p className="max-w-md text-[14px] text-black/60">
              As normas do guia em ordem cronológica. Cada lombada abre o resumo e os artigos que importam.
            </p>
          </div>
          <div className="-mx-4 overflow-x-auto px-4 pb-2">
            <ol className="flex min-w-max items-end gap-2">
              {estante.map((n, i) => (
                <li key={n.slug}>
                  <Link
                    href={`/guia/norma/${n.slug}`}
                    className="group relative flex w-[4.25rem] flex-col items-center justify-between border border-[#1b1a17] px-2 py-4 transition-transform hover:-translate-y-2 focus-visible:-translate-y-2"
                    style={{ background: n.cor, color: textoContraste(n.cor), height: `${15 + (i % 3) * 1.6}rem` }}
                  >
                    <span className="font-lei text-[15px] font-semibold leading-tight [text-orientation:mixed] [writing-mode:vertical-rl] rotate-180">
                      {n.apelido}
                    </span>
                    <span className="font-sans text-[12px] font-bold">{n.ano}</span>
                  </Link>
                </li>
              ))}
            </ol>
          </div>
        </div>
      </section>

      {/* ── Quem já faz ── */}
      <section className="mx-auto mt-24 max-w-6xl px-4 sm:px-8">
        <h2 className="font-lei text-[clamp(1.8rem,4vw,2.75rem)] leading-none">Você não começa do zero</h2>
        <p className="mt-3 max-w-xl text-[15px] text-black/65">Laboratórios e redes do governo federal que já apoiam quem quer inovar.</p>
        <ul className="mt-8 grid border-l border-t border-[#1b1a17] sm:grid-cols-2 lg:grid-cols-3">
          {REDE.map((r) => (
            <li key={r.nome} className="border-b border-r border-[#1b1a17] bg-[#f5f1e8] p-5">
              <p className="font-lei text-[20px] font-semibold">{r.nome}</p>
              {r.org && <p className="font-sans text-[11px] font-bold uppercase tracking-[0.16em] text-black/45">{r.org}</p>}
              <p className="mt-2 text-[14px] leading-snug text-black/70">{r.texto}</p>
              <p className="mt-4 font-sans text-[10px] font-bold uppercase tracking-[0.16em] text-black/45">
                {r.atos.length > 1 ? "Instrumentos" : "Instrumento"}
              </p>
              <ul className="mt-1 space-y-1">
                {r.atos.map((a) => (
                  <li key={a.url}>
                    <a
                      href={a.url}
                      target="_blank"
                      rel="noreferrer"
                      className="inline-flex items-baseline gap-1 font-sans text-[13px] font-semibold text-[#0e3e66] underline underline-offset-2 hover:decoration-2"
                    >
                      {a.rotulo}
                      <ExternalLink size={11} aria-hidden className="shrink-0" />
                      <span className="sr-only">(abre em nova aba)</span>
                    </a>
                  </li>
                ))}
              </ul>
              {r.nota && <p className="mt-2 text-[12px] leading-snug text-black/55">{r.nota}</p>}
            </li>
          ))}
        </ul>
      </section>
    </main>
  );
}
