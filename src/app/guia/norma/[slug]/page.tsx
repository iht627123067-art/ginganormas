import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ExternalLink } from "lucide-react";
import TrechoLegal from "@/components/guia/TrechoLegal";
import OQueOTcuTemDito from "@/components/guia/OQueOTcuTemDito";
import {
  CAMINHOS,
  COR,
  NORMAS,
  artigosDisponiveis,
  normaPorSlug,
  urlFonte,
} from "@/lib/guia/conteudo";
import { textoContraste } from "@/lib/jogo/ui";

export function generateStaticParams() {
  return NORMAS.map((n) => ({ slug: n.slug }));
}

export function generateMetadata({ params }: { params: { slug: string } }): Metadata {
  const n = normaPorSlug(params.slug);
  return { title: n ? `${n.apelido} | Guia de Normativos GINGA` : "Guia de Normativos GINGA" };
}

// As quatro perguntas da ficha do livreto (figura C), nas cores dela
const PERGUNTAS = [
  { chave: "oQueE", rotulo: "O que é?", cor: COR.amarelo },
  { chave: "paraQueServe", rotulo: "Para que serve?", cor: COR.rosa },
  { chave: "quemPode", rotulo: "Quem pode usar?", cor: COR.verde },
  { chave: "comoAplicar", rotulo: "Como aplicar?", cor: COR.laranja },
] as const;

export default function NormaPage({ params }: { params: { slug: string } }) {
  const n = normaPorSlug(params.slug);
  if (!n) notFound();

  const caminhos = CAMINHOS.filter((c) => c.trechos.some((t) => t.fonte === n.fonte));
  // Para o texto integral, cada artigo leva os ids que algum destaque marca
  const marcadosPorArt = new Map<string, string[]>();
  for (const d of n.destaques) {
    marcadosPorArt.set(d.art, [...(marcadosPorArt.get(d.art) ?? []), ...d.ids]);
  }

  return (
    <main>
      {/* ── Faixa da lombada ── */}
      <section className="border-b border-[#1b1a17]" style={{ background: n.cor, color: textoContraste(n.cor) }}>
        <div className="mx-auto max-w-6xl px-4 pb-10 pt-10 sm:px-8">
          <Link href="/guia#estante" className="font-sans text-[12px] opacity-75 hover:opacity-100">← A estante</Link>
          <p className="mt-6 font-sans text-[12px] font-bold uppercase tracking-[0.18em] opacity-80">{n.numero}</p>
          <h1 className="mt-2 font-lei text-[clamp(2.2rem,6vw,4.5rem)] font-semibold leading-none tracking-tight">{n.apelido}</h1>
          <a
            href={urlFonte(n.fonte)}
            target="_blank"
            rel="noreferrer"
            className="mt-6 inline-flex items-center gap-1.5 font-sans text-[13px] font-semibold underline underline-offset-4"
          >
            Texto compilado no Planalto <ExternalLink size={13} aria-hidden />
            <span className="sr-only">(abre em nova aba)</span>
          </a>
        </div>
      </section>

      <div className="mx-auto max-w-6xl px-4 sm:px-8">
        {/* ── Em resumo ── */}
        <section className="py-12">
          <h2 className="mb-6 font-sans text-[11px] font-bold uppercase tracking-[0.18em] text-black/50">Em resumo</h2>
          <ol className="grid gap-px border border-[#1b1a17] bg-[#1b1a17] sm:grid-cols-2 lg:grid-cols-4">
            {PERGUNTAS.map((p, i) => (
              <li key={p.chave} className="bg-[#f5f1e8] p-5">
                <p className="flex items-baseline gap-2">
                  <span className="font-sans text-[22px] font-bold" style={{ color: p.cor === COR.amarelo ? "#a17f16" : p.cor }}>
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <span className="font-sans text-[15px] font-bold">{p.rotulo}</span>
                </p>
                <p className="mt-3 text-[15px] leading-relaxed text-black/75">{n.emResumo[p.chave]}</p>
              </li>
            ))}
          </ol>
        </section>

        {/* ── Trechos que importam ── */}
        <section className="border-t-2 border-[#1b1a17] pt-12">
          <h2 className="mb-2 font-lei text-[clamp(1.6rem,3.5vw,2.4rem)] leading-none">Os trechos que importam</h2>
          {n.destaques.map((d, i) => (
            <TrechoLegal key={i} destaque={d} />
          ))}
        </section>

        {(n.slug === "lindb" || n.slug === "regulamento-lindb") && <OQueOTcuTemDito />}

        {/* ── Leve em conta ── */}
        {n.leveEmConta.length > 0 && (
          <section className="mt-6 border-t-2 border-[#1b1a17] pt-10">
            <h2 className="mb-4 font-lei text-[26px] italic">Leve em conta!</h2>
            <ul className="max-w-3xl space-y-3 text-[15px] leading-relaxed">
              {n.leveEmConta.map((x) => (
                <li key={x} className="border-l-[3px] border-[#ebbe28] pl-4">{x}</li>
              ))}
            </ul>
          </section>
        )}

        {/* ── Caminhos que usam esta norma ── */}
        {caminhos.length > 0 && (
          <section className="mt-12">
            <h2 className="mb-3 font-sans text-[11px] font-bold uppercase tracking-[0.18em] text-black/50">Esta norma aparece quando você quer…</h2>
            <ul className="flex flex-wrap gap-2">
              {caminhos.map((c) => (
                <li key={c.slug}>
                  <Link href={`/guia/quero/${c.slug}`} className="inline-block border border-[#1b1a17] px-3 py-1.5 font-lei text-[16px] hover:bg-[#1b1a17] hover:text-[#f5f1e8]">
                    {c.quero}
                  </Link>
                </li>
              ))}
            </ul>
          </section>
        )}

        {/* ── Texto integral dos artigos do guia ── */}
        <section className="mt-16 border-t-2 border-[#1b1a17] pt-12">
          <h2 className="font-lei text-[clamp(1.6rem,3.5vw,2.4rem)] leading-none">Os artigos na íntegra</h2>
          <p className="mt-3 max-w-2xl font-sans text-[13px] text-black/55">
            Todos os artigos desta norma selecionados para o guia, com o texto vigente e o histórico de alterações de cada
            dispositivo.
          </p>
          {artigosDisponiveis(n.fonte).map((art) => (
            <TrechoLegal
              key={art}
              ancora={`art-${art}`}
              integral
              destaque={{
                fonte: n.fonte,
                art,
                ids: marcadosPorArt.get(art) ?? [],
                porque: n.destaques.find((d) => d.art === art)?.porque ?? "Artigo de contexto, sem destaque específico neste guia.",
              }}
            />
          ))}
        </section>
      </div>
    </main>
  );
}
