"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import clsx from "clsx";
import { CAMINHOS, PERFIS, type Perfil } from "@/lib/guia/conteudo";

// Entrada pela necessidade, e não pelo nome da lei (à maneira dos "smart
// answers" do GOV.UK). O perfil só reordena e esmaece; nada some da lista.
export default function EuQuero() {
  const [perfil, setPerfil] = useState<Perfil | null>(null);
  const ordenados = perfil
    ? [...CAMINHOS].sort((a, b) => Number(b.perfis.includes(perfil)) - Number(a.perfis.includes(perfil)))
    : CAMINHOS;

  return (
    <section id="quero" className="scroll-mt-20">
      <div className="mb-8 flex flex-wrap items-center gap-2 font-sans text-[13px]">
        <span className="mr-1 text-black/55">Sou servidor(a) e</span>
        {(Object.keys(PERFIS) as Perfil[]).map((p) => (
          <button
            key={p}
            type="button"
            aria-pressed={perfil === p}
            onClick={() => setPerfil(perfil === p ? null : p)}
            className={clsx(
              "rounded-full border px-3 py-1.5 transition-colors",
              perfil === p
                ? "border-[#1b1a17] bg-[#1b1a17] text-[#f5f1e8]"
                : "border-[#1b1a17]/30 hover:border-[#1b1a17]"
            )}
          >
            {PERFIS[p]}
          </button>
        ))}
      </div>

      <ol className="border-t-2 border-[#1b1a17]">
        {ordenados.map((c) => {
          const apagado = perfil !== null && !c.perfis.includes(perfil);
          return (
            <li key={c.slug} className="border-b border-[#1b1a17]/20">
              <Link
                href={`/guia/quero/${c.slug}`}
                className={clsx(
                  "group grid items-baseline gap-x-6 gap-y-1 py-5 transition-opacity sm:grid-cols-[1fr_auto]",
                  apagado && "opacity-35 hover:opacity-100"
                )}
              >
                <span className="font-lei text-[clamp(1.35rem,3.2vw,2.1rem)] leading-tight">
                  <span className="mr-3 inline-block h-3 w-3 -translate-y-1 rounded-full align-middle" style={{ background: c.cor }} aria-hidden />
                  <span className="group-hover:underline group-hover:decoration-2 group-hover:underline-offset-[6px]">{c.quero}</span>
                </span>
                <span className="flex items-center gap-2 pl-6 font-sans text-[12px] text-black/55 sm:pl-0">
                  {c.instrumento}
                  <ArrowRight size={16} className="transition-transform group-hover:translate-x-1" aria-hidden />
                </span>
              </Link>
            </li>
          );
        })}
      </ol>
    </section>
  );
}
