"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";
import { ExternalLink } from "lucide-react";
import clsx from "clsx";
import {
  TERMOS,
  artigo,
  definicao,
  normaPorFonte,
  numeroArt,
  rotuloDispositivo,
  urlFonte,
  type Destaque,
  type Dispositivo,
} from "@/lib/guia/conteudo";

// Recuo pela hierarquia: incisos um nível, alíneas dois
function nivel(id: string): number {
  // Questões do Anexo: a profundidade vem da numeração (q1, q1.1, q2.3.1)
  if (id.startsWith("q")) return Math.min(id.split(".").length - 1, 2);
  const ultima = id.split(".").pop() ?? "";
  if (/^[a-z]$/.test(ultima)) return 2;
  if (/^[IVXLC]+(-[A-Z])?$/.test(ultima)) return 1;
  return 0;
}

// ── termo definido em lei: abre a definição literal (à maneira do Cornell LII)
function Termo({ texto, termo }: { texto: string; termo: (typeof TERMOS)[number] }) {
  const [aberto, setAberto] = useState(false);
  const ref = useRef<HTMLSpanElement>(null);
  const norma = normaPorFonte(termo.fonte);

  useEffect(() => {
    if (!aberto) return;
    const fechar = (e: MouseEvent | KeyboardEvent) => {
      if (e instanceof KeyboardEvent ? e.key === "Escape" : !ref.current?.contains(e.target as Node)) {
        setAberto(false);
      }
    };
    document.addEventListener("mousedown", fechar);
    document.addEventListener("keydown", fechar);
    return () => {
      document.removeEventListener("mousedown", fechar);
      document.removeEventListener("keydown", fechar);
    };
  }, [aberto]);

  return (
    <span ref={ref} className="relative">
      <button
        type="button"
        aria-expanded={aberto}
        onClick={() => setAberto((v) => !v)}
        className="underline decoration-dotted decoration-[#0e3e66]/60 underline-offset-[3px] hover:decoration-solid focus-visible:outline focus-visible:outline-2 focus-visible:outline-[#0e3e66]"
      >
        {texto}
      </button>
      {aberto && (
        <span
          role="note"
          className="absolute left-0 top-full z-30 mt-2 block w-[min(22rem,80vw)] border border-[#1b1a17] bg-white p-4 text-left font-sans text-[13px] not-italic leading-relaxed text-[#1b1a17] shadow-[6px_6px_0_#1b1a17]"
        >
          <span className="mb-1 block text-[10px] font-bold uppercase tracking-[0.16em] text-[#0e3e66]">
            Definição legal · {termo.termo}
          </span>
          <span className="block font-lei text-[15px]">{definicao(termo)}</span>
          <span className="mt-2 block text-[11px] text-black/55">
            {norma?.numero}, art. {numeroArt(termo.art)}, {rotuloDispositivo(termo.id)}
          </span>
        </span>
      )}
    </span>
  );
}

// Marca a primeira ocorrência de cada termo definido; `usados` é
// compartilhado entre os dispositivos de um mesmo trecho
function comTermos(texto: string, usados: Set<string>, proprio?: string): ReactNode[] {
  const partes: ReactNode[] = [];
  let resto = texto;
  let chave = 0;
  while (resto) {
    let melhor: { i: number; len: number; t: (typeof TERMOS)[number] } | null = null;
    for (const t of TERMOS) {
      if (usados.has(t.termo) || t.termo === proprio) continue;
      const m = t.padrao.exec(resto);
      if (m && (!melhor || m.index < melhor.i)) melhor = { i: m.index, len: m[0].length, t };
    }
    if (!melhor) {
      partes.push(resto);
      break;
    }
    usados.add(melhor.t.termo);
    partes.push(resto.slice(0, melhor.i));
    partes.push(<Termo key={chave++} texto={resto.slice(melhor.i, melhor.i + melhor.len)} termo={melhor.t} />);
    resto = resto.slice(melhor.i + melhor.len);
  }
  return partes;
}

function LinhaDispositivo({ d, marcado, conteudo }: { d: Dispositivo; marcado: boolean; conteudo: ReactNode[] }) {
  return (
    <li
      className={clsx("py-1", nivel(d.id) === 1 && "pl-6", nivel(d.id) === 2 && "pl-12")}
      data-dispositivo={d.id}
    >
      <span className={clsx(marcado ? "marca-texto text-[#1b1a17]" : "text-black/55")}>
        {conteudo}
      </span>
      {d.notas.length > 0 && (
        <span className="ml-1.5 whitespace-nowrap font-sans text-[10.5px] uppercase tracking-wide text-black/40">
          {d.notas.filter((n) => n !== "Regulamento" && n !== "Vigência").join(" · ")}
        </span>
      )}
    </li>
  );
}

// Um trecho do texto oficial com os dispositivos úteis marcados. Os demais
// dispositivos do artigo ficam recolhidos, mas a um clique: o guia destaca,
// não esconde.
export default function TrechoLegal({
  destaque,
  integral = false,
  ancora,
}: {
  destaque: Destaque;
  integral?: boolean;
  ancora?: string;
}) {
  const [inteiro, setInteiro] = useState(integral);
  const dispositivos = artigo(destaque.fonte, destaque.art);
  const marcados = new Set(destaque.ids);
  const norma = normaPorFonte(destaque.fonte);
  const termoProprio = TERMOS.find((t) => t.fonte === destaque.fonte && t.art === destaque.art && marcados.has(t.id))?.termo;

  // Agrupa dispositivos não marcados consecutivos em "lacunas". Os termos
  // definidos são resolvidos aqui, numa única passada pura, para que a
  // renderização do servidor e a do cliente marquem as mesmas ocorrências
  const usados = new Set<string>();
  const blocos: ({ tipo: "d"; d: Dispositivo; conteudo: ReactNode[] } | { tipo: "lacuna"; n: number })[] = [];
  for (const d of dispositivos) {
    if (inteiro || marcados.has(d.id)) blocos.push({ tipo: "d", d, conteudo: comTermos(d.texto, usados, termoProprio) });
    else {
      const ult = blocos[blocos.length - 1];
      if (ult?.tipo === "lacuna") ult.n++;
      else blocos.push({ tipo: "lacuna", n: 1 });
    }
  }

  return (
    <figure id={ancora} className="grid scroll-mt-24 gap-x-10 gap-y-3 border-t border-[#1b1a17]/15 py-7 md:grid-cols-[minmax(0,1fr)_15rem]">
      <div className="min-w-0">
        <figcaption className="mb-3 flex flex-wrap items-baseline gap-x-3 gap-y-1 font-sans">
          <span className="text-[11px] font-bold uppercase tracking-[0.16em]" style={{ color: norma?.cor === "#ebbe28" ? "#7a5f10" : norma?.cor }}>
            {norma?.apelido}
          </span>
          <span className="text-[13px] font-semibold text-[#1b1a17]">
            {norma?.numero.split(",")[0]} · {destaque.art === "anexo" ? "Anexo" : `Art. ${numeroArt(destaque.art)}`}
          </span>
          <a
            href={urlFonte(destaque.fonte, destaque.art)}
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-1 text-[11px] text-black/50 underline-offset-2 hover:text-[#0e3e66] hover:underline"
          >
            Planalto <ExternalLink size={11} aria-hidden />
            <span className="sr-only">(abre em nova aba)</span>
          </a>
        </figcaption>
        <ol className="font-lei text-[17px] leading-[1.65]">
          {blocos.map((b, i) =>
            b.tipo === "d" ? (
              <LinhaDispositivo key={b.d.id + i} d={b.d} marcado={marcados.has(b.d.id)} conteudo={b.conteudo} />
            ) : (
              <li key={"l" + i} className="py-0.5">
                <button
                  type="button"
                  onClick={() => setInteiro(true)}
                  className="font-sans text-[11px] tracking-wide text-black/40 hover:text-[#0e3e66]"
                >
                  ⋯ {b.n} {destaque.art === "anexo" ? (b.n === 1 ? "questão" : "questões") : b.n === 1 ? "dispositivo" : "dispositivos"} sem destaque
                </button>
              </li>
            )
          )}
        </ol>
        {!integral && (
          <button
            type="button"
            onClick={() => setInteiro((v) => !v)}
            className="mt-3 font-sans text-[12px] font-semibold text-[#0e3e66] underline underline-offset-4"
          >
            {inteiro ? "Mostrar só os trechos marcados" : "Ler o artigo inteiro"}
          </button>
        )}
      </div>
      <aside className="border-l-[3px] pl-4 font-sans md:mt-8 md:self-start" style={{ borderColor: norma?.cor }}>
        <p className="mb-1 text-[10px] font-bold uppercase tracking-[0.16em] text-black/45">Por que importa</p>
        <p className="text-[14px] leading-snug text-[#1b1a17]">{destaque.porque}</p>
      </aside>
    </figure>
  );
}
