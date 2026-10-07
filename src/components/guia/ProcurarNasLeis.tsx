"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { Search } from "lucide-react";
import { NORMAS, artigo, artigosDisponiveis, numeroArt, rotuloDispositivo } from "@/lib/guia/conteudo";

const semAcento = (s: string) => s.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase();

const INDICE = NORMAS.flatMap((n) =>
  artigosDisponiveis(n.fonte).flatMap((art) =>
    artigo(n.fonte, art).map((d) => ({ norma: n, art, d, busca: semAcento(d.texto) }))
  )
);

const SUGESTOES = ["erro grosseiro", "risco tecnológico", "startups", "matriz de riscos", "laboratórios", "consequências práticas"];

// Marca o termo procurado no texto original, comparando sem acentos
function realcar(texto: string, q: string) {
  const i = semAcento(texto).indexOf(q);
  if (i < 0) return texto;
  return (
    <>
      {texto.slice(0, i)}
      <mark className="marca-texto bg-transparent text-inherit">{texto.slice(i, i + q.length)}</mark>
      {texto.slice(i + q.length)}
    </>
  );
}

export default function ProcurarNasLeis() {
  const [q, setQ] = useState("");
  const termo = semAcento(q.trim());
  const resultados = useMemo(
    () => (termo.length < 3 ? [] : INDICE.filter((x) => x.busca.includes(termo))),
    [termo]
  );

  return (
    <section id="procurar" className="scroll-mt-20">
      <label htmlFor="procurar-leis" className="mb-3 block font-sans text-[11px] font-bold uppercase tracking-[0.18em]">
        Procurar dentro do texto das leis
      </label>
      <div className="flex items-center gap-3 border-b-2 border-[#1b1a17] pb-2">
        <Search size={22} aria-hidden className="shrink-0" />
        <input
          id="procurar-leis"
          type="search"
          value={q}
          onChange={(e) => setQ(e.target.value)}
          placeholder="ex.: erro grosseiro"
          className="w-full bg-transparent font-lei text-[clamp(1.25rem,3vw,1.75rem)] placeholder:text-black/30 focus:outline-none"
        />
      </div>
      <div className="mt-3 flex flex-wrap gap-2 font-sans text-[12px]">
        {SUGESTOES.map((s) => (
          <button key={s} type="button" onClick={() => setQ(s)} className="text-black/55 underline underline-offset-2 hover:text-[#0e3e66]">
            {s}
          </button>
        ))}
      </div>

      {termo.length >= 3 && (
        <div className="mt-6" aria-live="polite">
          <p className="mb-3 font-sans text-[12px] text-black/55">
            {resultados.length === 0
              ? "Nenhum dispositivo entre os artigos selecionados para o guia contém esse termo."
              : `${resultados.length} ${resultados.length === 1 ? "dispositivo" : "dispositivos"}`}
          </p>
          <ul className="max-h-[28rem] divide-y divide-[#1b1a17]/15 overflow-y-auto border-y border-[#1b1a17]/15">
            {resultados.slice(0, 60).map(({ norma, art, d }) => (
              <li key={norma.slug + art + d.id}>
                <Link href={`/guia/norma/${norma.slug}#art-${art}`} className="block py-3 hover:bg-white/60">
                  <span className="block font-sans text-[11px] font-semibold text-black/55">
                    {norma.apelido} · {art === "anexo" ? "Anexo" : `art. ${numeroArt(art)}`}, {rotuloDispositivo(d.id)}
                  </span>
                  <span className="mt-0.5 block font-lei text-[16px] leading-snug">{realcar(d.texto, termo)}</span>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      )}
    </section>
  );
}
