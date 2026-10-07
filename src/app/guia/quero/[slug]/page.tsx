import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowRight, ExternalLink } from "lucide-react";
import TrechoLegal from "@/components/guia/TrechoLegal";
import OQueOTcuTemDito from "@/components/guia/OQueOTcuTemDito";
import { CAMINHOS, caminhoPorSlug, normaPorFonte } from "@/lib/guia/conteudo";

export function generateStaticParams() {
  return CAMINHOS.map((c) => ({ slug: c.slug }));
}

export function generateMetadata({ params }: { params: { slug: string } }): Metadata {
  const c = caminhoPorSlug(params.slug);
  return { title: c ? `Quero ${c.quero} | Guia de Normativos GINGA` : "Guia de Normativos GINGA" };
}

export default function CaminhoPage({ params }: { params: { slug: string } }) {
  const c = caminhoPorSlug(params.slug);
  if (!c) notFound();

  const bases = Array.from(new Set(c.trechos.map((t) => t.fonte))).map((f) => normaPorFonte(f)!);

  return (
    <main className="mx-auto max-w-6xl px-4 sm:px-8">
      {/* ── Título ── */}
      <section className="border-b-2 border-[#1b1a17] pb-10 pt-12">
        <Link href="/guia#quero" className="font-sans text-[12px] text-black/55 hover:text-[#0e3e66]">
          ← Eu quero…
        </Link>
        <h1 className="mt-4 max-w-4xl font-lei text-[clamp(2rem,5.5vw,4rem)] font-semibold leading-[1.02] tracking-tight">
          <span className="italic font-normal text-black/50">Eu quero </span>
          {c.quero}
        </h1>
        <div className="mt-8 flex flex-wrap items-center gap-x-4 gap-y-2">
          <span className="font-sans text-[11px] font-bold uppercase tracking-[0.18em] text-black/50">Você pode usar</span>
          <span className="px-3 py-1.5 font-sans text-[15px] font-bold text-white" style={{ background: c.cor === "#ebbe28" || c.cor === "#83c1e9" ? "#1b1a17" : c.cor }}>
            {c.instrumento}
          </span>
        </div>
        <p className="mt-6 max-w-3xl text-[18px] leading-relaxed">{c.resumo}</p>
        <p className="mt-4 font-sans text-[13px] text-black/60">
          <strong className="text-[#1b1a17]">Quem pode usar:</strong> {c.quemPode}
        </p>
      </section>

      {/* ── Serve / não serve ── */}
      <section className="grid gap-px border-b border-[#1b1a17] bg-[#1b1a17]/20 md:grid-cols-2">
        <div className="bg-[#f5f1e8] py-8 md:pr-8">
          <h2 className="mb-3 font-sans text-[11px] font-bold uppercase tracking-[0.18em] text-[#0a6637]">Serve se…</h2>
          <ul className="space-y-2 text-[16px] leading-snug">
            {c.sim.map((s) => (
              <li key={s} className="flex gap-3"><span aria-hidden className="text-[#0a6637]">✓</span>{s}</li>
            ))}
          </ul>
        </div>
        {c.nao.length > 0 && (
          <div className="bg-[#f5f1e8] py-8 md:pl-8">
            <h2 className="mb-3 font-sans text-[11px] font-bold uppercase tracking-[0.18em] text-[#d14b2a]">Não serve se…</h2>
            <ul className="space-y-2 text-[16px] leading-snug">
              {c.nao.map((s) => (
                <li key={s} className="flex gap-3"><span aria-hidden className="text-[#d14b2a]">✕</span>{s}</li>
              ))}
            </ul>
          </div>
        )}
      </section>

      {/* ── Passo a passo (step by step) ── */}
      <section className="py-14">
        <h2 className="mb-8 font-lei text-[clamp(1.6rem,3.5vw,2.4rem)] leading-none">Passo a passo</h2>
        <ol className="relative ml-4 border-l-2 border-[#1b1a17]">
          {c.passos.map((p, i) => (
            <li key={p.titulo} className="relative pb-7 pl-8 last:pb-0">
              <span className="absolute -left-[15px] top-0 flex h-7 w-7 items-center justify-center rounded-full border-2 border-[#1b1a17] bg-[#f5f1e8] font-sans text-[12px] font-bold">
                {i + 1}
              </span>
              <h3 className="font-sans text-[16px] font-bold leading-7">{p.titulo}</h3>
              <p className="mt-0.5 max-w-2xl text-[15px] leading-relaxed text-black/70">{p.texto}</p>
            </li>
          ))}
        </ol>
      </section>

      {c.slug === "decidir-com-seguranca" && (
        <Link
          href="/guia/registro"
          className="group mb-14 flex items-center justify-between gap-6 border-2 border-[#1b1a17] bg-[#ebbe28] px-6 py-5 shadow-[6px_6px_0_#1b1a17] transition-transform hover:-translate-y-0.5"
        >
          <span>
            <span className="block font-lei text-[24px] font-semibold leading-tight">Monte o seu registro de decisão</span>
            <span className="mt-1 block text-[14px]">Oito perguntas, com o texto da LINDB ao lado. O resultado sai pronto para copiar ou imprimir.</span>
          </span>
          <ArrowRight size={24} aria-hidden className="shrink-0 transition-transform group-hover:translate-x-1" />
        </Link>
      )}

      {/* ── Os trechos que importam ── */}
      <section className="border-t-2 border-[#1b1a17] pt-12">
        <div className="mb-4 flex flex-wrap items-end justify-between gap-4">
          <h2 className="font-lei text-[clamp(1.6rem,3.5vw,2.4rem)] leading-none">Os trechos que importam</h2>
          <p className="max-w-sm font-sans text-[12px] leading-snug text-black/55">
            Texto oficial. O <span className="marca-texto">marca-texto</span> indica o que importa para este caso.
            Termos <span className="underline decoration-dotted underline-offset-[3px]">sublinhados</span> abrem a
            definição legal.
          </p>
        </div>
        {c.trechos.map((t, i) => (
          <TrechoLegal key={i} destaque={t} />
        ))}
      </section>

      {c.slug === "decidir-com-seguranca" && <OQueOTcuTemDito />}

      {/* ── Cuidados e base ── */}
      <section className="mt-6 grid gap-10 border-t-2 border-[#1b1a17] pt-12 md:grid-cols-2">
        {c.cuidados.length > 0 && (
          <div>
            <h2 className="mb-4 font-lei text-[26px] italic">Leve em conta!</h2>
            <ul className="space-y-3 text-[15px] leading-relaxed">
              {c.cuidados.map((x) => (
                <li key={x} className="border-l-[3px] border-[#ebbe28] pl-4">{x}</li>
              ))}
            </ul>
          </div>
        )}
        <div>
          <h2 className="mb-4 font-lei text-[26px] italic">Normas deste caminho</h2>
          <ul className="space-y-2">
            {bases.map((n) => (
              <li key={n.slug}>
                <Link href={`/guia/norma/${n.slug}`} className="group flex items-baseline gap-3 font-sans text-[14px]">
                  <span className="h-2.5 w-2.5 shrink-0 rounded-full" style={{ background: n.cor }} aria-hidden />
                  <span className="font-semibold group-hover:underline">{n.apelido}</span>
                  <span className="text-black/50">{n.numero}</span>
                </Link>
              </li>
            ))}
          </ul>
          {c.complementares && c.complementares.length > 0 && (
            <>
              <h3 className="mb-3 mt-8 font-sans text-[11px] font-bold uppercase tracking-[0.18em] text-black/50">Atos complementares</h3>
              <ul className="space-y-3">
                {c.complementares.map((a) => (
                  <li key={a.url}>
                    <a href={a.url} target="_blank" rel="noreferrer" className="inline-flex items-baseline gap-1 font-sans text-[14px] font-semibold text-[#0e3e66] underline underline-offset-2 hover:decoration-2">
                      {a.rotulo}
                      <ExternalLink size={11} aria-hidden className="shrink-0" />
                      <span className="sr-only">(abre em nova aba)</span>
                    </a>
                    {a.nota && <p className="text-[13px] text-black/60">{a.nota}</p>}
                  </li>
                ))}
              </ul>
            </>
          )}
        </div>
      </section>

      {/* ── Veja também ── */}
      {c.relacionados.length > 0 && (
        <section className="mt-16">
          <h2 className="mb-4 font-sans text-[11px] font-bold uppercase tracking-[0.18em] text-black/50">Talvez você queira</h2>
          <ul className="border-t border-[#1b1a17]">
            {c.relacionados.map((s) => {
              const r = CAMINHOS.find((x) => x.slug === s)!;
              return (
                <li key={s} className="border-b border-[#1b1a17]/20">
                  <Link href={`/guia/quero/${s}`} className="group flex items-center justify-between gap-4 py-4">
                    <span className="font-lei text-[20px]">
                      <span className="italic text-black/45">Eu quero </span>
                      <span className="group-hover:underline">{r.quero}</span>
                    </span>
                    <ArrowRight size={18} aria-hidden className="shrink-0 transition-transform group-hover:translate-x-1" />
                  </Link>
                </li>
              );
            })}
          </ul>
        </section>
      )}
    </main>
  );
}
