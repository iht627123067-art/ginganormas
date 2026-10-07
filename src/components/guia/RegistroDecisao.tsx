"use client";

import { useEffect, useState } from "react";
import { Check, Copy, Printer, RotateCcw } from "lucide-react";
import clsx from "clsx";
import { CAMINHOS, artigo, normaPorFonte, numeroArt, rotuloDispositivo, type Fonte } from "@/lib/guia/conteudo";

// Cada campo pede uma parte da motivação e mostra, literalmente, o
// dispositivo que a exige. O texto final é um rascunho para o processo, e
// não um parecer.
const CAMPOS: {
  chave: string;
  titulo: string;
  pergunta: string;
  dica: string;
  base: { fonte: Fonte; art: string; id: string };
}[] = [
  {
    chave: "contexto",
    titulo: "Contexto",
    pergunta: "Qual é o problema, quem é afetado e por que agir agora?",
    dica: "Descreva os fatos com dados, se houver. Evite adjetivos: o controle vai ler isto anos depois.",
    base: { fonte: "d9830", art: "2", id: "caput" },
  },
  {
    chave: "decisao",
    titulo: "Decisão proposta",
    pergunta: "O que exatamente você decide fazer?",
    dica: "Uma ou duas frases, com prazo e responsável.",
    base: { fonte: "d9830", art: "2", id: "p1" },
  },
  {
    chave: "alternativas",
    titulo: "Alternativas consideradas",
    pergunta: "Que outros caminhos existiam, inclusive não fazer nada, e por que este é o mais adequado?",
    dica: "Liste ao menos duas alternativas, com custos, riscos e benefícios de cada uma.",
    base: { fonte: "lindb", art: "20", id: "pu" },
  },
  {
    chave: "consequencias",
    titulo: "Consequências práticas esperadas",
    pergunta: "Que resultados você espera e como vai saber se deu certo?",
    dica: "Indicadores, metas e o momento em que a decisão será reavaliada.",
    base: { fonte: "lindb", art: "20", id: "caput" },
  },
  {
    chave: "dificuldades",
    titulo: "Dificuldades reais",
    pergunta: "Que obstáculos concretos limitam a decisão?",
    dica: "Prazo, orçamento, equipe, dados disponíveis, limites técnicos e exigências da política pública.",
    base: { fonte: "lindb", art: "22", id: "caput" },
  },
  {
    chave: "orientacoes",
    titulo: "Orientações vigentes",
    pergunta: "Que pareceres, acórdãos, manuais ou práticas do órgão orientam esta decisão hoje?",
    dica: "Cite números e datas. Se a orientação mudar depois, ela protege o que foi feito agora.",
    base: { fonte: "lindb", art: "24", id: "caput" },
  },
  {
    chave: "manifestacoes",
    titulo: "Manifestações que embasam",
    pergunta: "Que notas técnicas ou pareceres jurídicos fundamentam a decisão?",
    dica: "A motivação pode remeter a eles, desde que constem do processo.",
    base: { fonte: "d9830", art: "2", id: "p3" },
  },
  {
    chave: "riscos",
    titulo: "Riscos e salvaguardas",
    pergunta: "O que pode dar errado e como você vai perceber e reagir?",
    dica: "Riscos principais, pontos de controle e critérios para interromper ou ajustar.",
    base: { fonte: "lindb", art: "28", id: "caput" },
  },
];

// "LC nº 182/2021, arts. 13, 14 e 15": artigos agrupados por norma
const BASES_INSTRUMENTO: Record<string, string> = Object.fromEntries(
  CAMINHOS.map((c) => {
    const porNorma = new Map<string, string[]>();
    for (const t of c.trechos) {
      const numero = normaPorFonte(t.fonte)?.numero.split(",")[0] ?? t.fonte;
      const arts = porNorma.get(numero) ?? [];
      if (!arts.includes(t.art)) arts.push(t.art);
      porNorma.set(numero, arts);
    }
    const cit = Array.from(porNorma, ([numero, arts]) =>
      arts.length === 1
        ? `${numero}, art. ${numeroArt(arts[0])}`
        : `${numero}, arts. ${arts.slice(0, -1).map(numeroArt).join(", ")} e ${numeroArt(arts[arts.length - 1])}`
    ).join("; ");
    return [c.slug, `${c.instrumento}: ${cit}`];
  })
);

const CHAVE_RASCUNHO = "ginga-guia-registro-v1";

type Rascunho = { titulo: string; instrumentos: string[]; campos: Record<string, string> };
const VAZIO: Rascunho = { titulo: "", instrumentos: [], campos: {} };

function textoBase(b: (typeof CAMPOS)[number]["base"]) {
  return artigo(b.fonte, b.art).find((d) => d.id === b.id)?.texto ?? "";
}

export default function RegistroDecisao() {
  const [r, setR] = useState<Rascunho>(VAZIO);
  const [carregado, setCarregado] = useState(false);
  const [copiado, setCopiado] = useState(false);

  // Rascunho só no navegador de quem escreve: nada é enviado ao servidor
  useEffect(() => {
    try {
      const salvo = localStorage.getItem(CHAVE_RASCUNHO);
      if (salvo) setR({ ...VAZIO, ...JSON.parse(salvo) });
    } catch {}
    setCarregado(true);
  }, []);
  useEffect(() => {
    if (!carregado) return;
    try {
      localStorage.setItem(CHAVE_RASCUNHO, JSON.stringify(r));
    } catch {}
  }, [r, carregado]);

  const preenchidos = CAMPOS.filter((c) => (r.campos[c.chave] ?? "").trim().length > 0).length;

  const fundamentos = r.instrumentos.map((s) => BASES_INSTRUMENTO[s]).filter(Boolean);
  const documento = [
    `REGISTRO DE MOTIVAÇÃO${r.titulo.trim() ? ` — ${r.titulo.trim()}` : ""}`,
    "",
    ...CAMPOS.flatMap((c, i) => {
      const v = (r.campos[c.chave] ?? "").trim();
      const bloco = [`${i + 1}. ${c.titulo.toUpperCase()}`, v || "[a preencher]"];
      if (c.chave === "decisao" && fundamentos.length) {
        bloco.push("", "Fundamento legal:", ...fundamentos.map((f) => `• ${f}`));
      }
      return [...bloco, ""];
    }),
    "Elaborado com apoio do Guia sobre Normativos para Servidores que Querem Inovar (GINGA), com base nos arts. 20, 22, 24 e 28 da LINDB e no Decreto nº 9.830/2019. Este registro não substitui a manifestação da consultoria jurídica do órgão.",
  ].join("\n");

  const copiar = async () => {
    try {
      await navigator.clipboard.writeText(documento);
      setCopiado(true);
      setTimeout(() => setCopiado(false), 2000);
    } catch {}
  };

  const atualizar = (chave: string, valor: string) =>
    setR((x) => ({ ...x, campos: { ...x.campos, [chave]: valor } }));

  return (
    <div className="grid gap-12 lg:grid-cols-[minmax(0,1fr)_minmax(0,1fr)]">
      {/* ── Formulário ── */}
      <form className="print:hidden" onSubmit={(e) => e.preventDefault()}>
        <label className="block">
          <span className="font-sans text-[11px] font-bold uppercase tracking-[0.18em]">Assunto</span>
          <input
            value={r.titulo}
            onChange={(e) => setR((x) => ({ ...x, titulo: e.target.value }))}
            placeholder="ex.: Contratação de teste de solução para triagem de pedidos"
            className="mt-2 w-full border-b-2 border-[#1b1a17] bg-transparent pb-2 font-lei text-[20px] placeholder:text-black/30 focus:outline-none"
          />
        </label>

        <fieldset className="mt-10">
          <legend className="font-sans text-[11px] font-bold uppercase tracking-[0.18em]">Instrumentos que você vai usar</legend>
          <p className="mt-1 text-[13px] text-black/55">A base legal de cada um entra automaticamente no registro.</p>
          <div className="mt-3 flex flex-wrap gap-2">
            {CAMINHOS.map((c) => {
              const ativo = r.instrumentos.includes(c.slug);
              return (
                <button
                  key={c.slug}
                  type="button"
                  aria-pressed={ativo}
                  onClick={() =>
                    setR((x) => ({
                      ...x,
                      instrumentos: ativo ? x.instrumentos.filter((s) => s !== c.slug) : [...x.instrumentos, c.slug],
                    }))
                  }
                  className={clsx(
                    "rounded-full border px-3 py-1.5 font-sans text-[12px] transition-colors",
                    ativo ? "border-[#1b1a17] bg-[#1b1a17] text-[#f5f1e8]" : "border-[#1b1a17]/30 hover:border-[#1b1a17]"
                  )}
                >
                  {c.instrumento}
                </button>
              );
            })}
          </div>
        </fieldset>

        <ol className="mt-10 space-y-10">
          {CAMPOS.map((c, i) => {
            const norma = normaPorFonte(c.base.fonte);
            return (
              <li key={c.chave}>
                <label htmlFor={`campo-${c.chave}`} className="flex items-baseline gap-3">
                  <span className="font-sans text-[13px] font-bold text-black/40">{String(i + 1).padStart(2, "0")}</span>
                  <span className="font-lei text-[22px] leading-tight">{c.pergunta}</span>
                </label>
                <p className="ml-8 mt-1 text-[13px] text-black/55">{c.dica}</p>
                <textarea
                  id={`campo-${c.chave}`}
                  value={r.campos[c.chave] ?? ""}
                  onChange={(e) => atualizar(c.chave, e.target.value)}
                  rows={4}
                  className="ml-8 mt-3 block w-[calc(100%-2rem)] resize-y border border-[#1b1a17]/40 bg-white/70 p-3 text-[15px] leading-relaxed focus:border-[#1b1a17] focus:outline-none focus:ring-2 focus:ring-[#ebbe28]"
                />
                <details className="ml-8 mt-2">
                  <summary className="cursor-pointer font-sans text-[12px] font-semibold text-[#0e3e66]">
                    Por que pedimos isso? {norma?.apelido.split(":")[0]}, art. {numeroArt(c.base.art)}, {rotuloDispositivo(c.base.id)}
                  </summary>
                  <p className="mt-2 border-l-[3px] border-[#ebbe28] pl-3 font-lei text-[15px] leading-relaxed text-black/75">
                    {textoBase(c.base)}
                  </p>
                </details>
              </li>
            );
          })}
        </ol>
      </form>

      {/* ── Documento ── */}
      <div className="lg:sticky lg:top-20 lg:max-h-[calc(100vh-6rem)] lg:self-start lg:overflow-y-auto print:static print:max-h-none print:overflow-visible">
        <div className="mb-3 flex flex-wrap items-center gap-3 font-sans text-[12px] print:hidden">
          <span className="text-black/55">
            {preenchidos} de {CAMPOS.length} partes preenchidas
          </span>
          <span className="ml-auto flex gap-2">
            <button type="button" onClick={copiar} className="inline-flex items-center gap-1.5 border border-[#1b1a17] px-3 py-1.5 font-semibold hover:bg-[#1b1a17] hover:text-[#f5f1e8]">
              {copiado ? <Check size={14} aria-hidden /> : <Copy size={14} aria-hidden />}
              {copiado ? "Copiado" : "Copiar texto"}
            </button>
            <button type="button" onClick={() => window.print()} className="inline-flex items-center gap-1.5 border border-[#1b1a17] px-3 py-1.5 font-semibold hover:bg-[#1b1a17] hover:text-[#f5f1e8]">
              <Printer size={14} aria-hidden /> Imprimir
            </button>
            <button
              type="button"
              onClick={() => setR(VAZIO)}
              className="inline-flex items-center gap-1.5 px-2 py-1.5 text-black/50 hover:text-[#d14b2a]"
              aria-label="Apagar rascunho"
            >
              <RotateCcw size={14} aria-hidden />
            </button>
          </span>
        </div>
        <div className="h-1 w-full bg-[#1b1a17]/10 print:hidden" aria-hidden>
          <div className="h-full bg-[#0a6637] transition-all" style={{ width: `${(preenchidos / CAMPOS.length) * 100}%` }} />
        </div>
        <article className="mt-4 border border-[#1b1a17] bg-white p-6 shadow-[8px_8px_0_#1b1a17] print:border-0 print:p-0 print:shadow-none">
          <pre className="whitespace-pre-wrap font-lei text-[15px] leading-relaxed text-[#1b1a17]">{documento}</pre>
        </article>
        <p className="mt-3 font-sans text-[11px] text-black/45 print:hidden">
          O rascunho fica salvo apenas neste navegador. Nada é enviado para a plataforma.
        </p>
      </div>
    </div>
  );
}
