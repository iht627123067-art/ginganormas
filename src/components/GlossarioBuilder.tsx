"use client";

import { useState, useMemo, useCallback } from "react";
import type { Citacao } from "@/lib/types";
import { TEMA_COLORS } from "@/lib/data";
import {
  ChevronDown,
  Check,
  X,
  Sparkles,
  Loader2,
  FileDown,
  Copy,
  BookMarked,
  AlertCircle,
  Search,
  RefreshCw,
} from "lucide-react";
import clsx from "clsx";

interface Props {
  citacoes: Citacao[];
  temas: string[];
}

interface IAEntrada {
  termo: string;
  verbete?: string;
  verbete_en?: string;
  notas_rodape?: Array<{ posicao: string; texto_nota: string; tipo_nota: string }>;
}

interface IAResult {
  entradas: IAEntrada[];
}

interface GlossarioEntry {
  termo: string;
  color: string;
  citacoes: Citacao[];
}

const IA_STEPS = [
  {
    key: "consolidar" as const,
    label: "Consolidar Verbete",
    desc: "IA sintetiza todas as citações em uma definição acadêmica única por termo.",
  },
  {
    key: "correcao" as const,
    label: "Correção Ortográfica",
    desc: "Corrige português, gramática e pontuação do verbete.",
  },
  {
    key: "traducao" as const,
    label: "Tradução PT→EN",
    desc: "Tradução para inglês acadêmico, preservando termos técnicos.",
  },
  {
    key: "notas" as const,
    label: "Notas de Rodapé",
    desc: "Gera notas doutrinais, históricas e jurisprudenciais sugeridas.",
  },
] as const;

type IAStep = (typeof IA_STEPS)[number]["key"];

// --- Print / Export helpers ---

function buildPrintHTML(
  entries: GlossarioEntry[],
  iaResult: IAResult | null,
  steps: Set<IAStep>
): string {
  const date = new Date().toLocaleDateString("pt-BR", {
    day: "2-digit",
    month: "long",
    year: "numeric",
  });
  const totalCits = entries.reduce((s, e) => s + e.citacoes.length, 0);
  const hasIA = !!iaResult;

  const entriesHTML = entries
    .map((entry) => {
      const iaEntry = iaResult?.entradas.find((e) => e.termo === entry.termo);

      const verbeteHTML =
        iaEntry?.verbete
          ? `<div class="verbete">
          <div class="verbete-label">Definição consolidada (IA)</div>
          <p>${iaEntry.verbete}</p>
        </div>`
          : "";

      const verbeteEnHTML =
        iaEntry?.verbete_en && steps.has("traducao")
          ? `<div class="verbete verbete-en">
          <div class="verbete-label">Definition (EN)</div>
          <p><em>${iaEntry.verbete_en}</em></p>
        </div>`
          : "";

      const citacoesHTML = entry.citacoes
        .map(
          (c) => `<div class="citation">
          <div class="citation-text">&#8220;${c.citacaoDireta}&#8221;</div>
          <div class="citation-ref">${[c.autores, c.fonte].filter(Boolean).join(" — ")}</div>
        </div>`
        )
        .join("");

      const notasHTML =
        iaEntry?.notas_rodape?.length
          ? `<div class="notas">
          <div class="notas-label">Notas de rodapé sugeridas</div>
          ${iaEntry.notas_rodape
            .map(
              (n, i) =>
                `<div class="nota-item"><sup>${i + 1}</sup> <span class="nota-tipo">${n.tipo_nota}</span> ${n.texto_nota}</div>`
            )
            .join("")}
        </div>`
          : "";

      return `<div class="entry">
      <div class="term">${entry.termo.toUpperCase()}</div>
      ${verbeteHTML}
      <div class="citations-section">
        <div class="citations-label">${entry.citacoes.length === 1 ? "Citação selecionada" : "Citações selecionadas"}</div>
        ${citacoesHTML}
      </div>
      ${verbeteEnHTML}
      ${notasHTML}
    </div>`;
    })
    .join("");

  return `<!DOCTYPE html>
<html lang="pt-BR">
<head>
  <meta charset="UTF-8">
  <title>Glossário de Inovação Pública — GingaNormas</title>
  <style>
    * { margin: 0; padding: 0; box-sizing: border-box; }
    body { font-family: Georgia, 'Times New Roman', serif; font-size: 11.5pt; line-height: 1.75; color: #1a1a2e; background: white; }
    .page { max-width: 780px; margin: 0 auto; padding: 2cm 2.5cm; }
    .header { text-align: center; margin-bottom: 2.5em; padding-bottom: 1.5em; border-bottom: 2px solid #0d9488; }
    .header h1 { font-size: 20pt; font-weight: bold; color: #0f172a; letter-spacing: 0.02em; margin-bottom: 0.2em; }
    .header .subtitle { font-size: 10pt; color: #64748b; font-style: italic; }
    .header .meta { font-size: 9pt; color: #94a3b8; margin-top: 0.5em; }
    .entry { margin-bottom: 2.5em; padding-bottom: 2em; border-bottom: 1px solid #e2e8f0; page-break-inside: avoid; }
    .entry:last-child { border-bottom: none; }
    .term { font-size: 13.5pt; font-weight: bold; letter-spacing: 0.07em; color: #0f172a; padding: 0.1em 0 0.1em 0.75em; border-left: 4px solid #0d9488; margin-bottom: 1em; }
    .verbete { background: #f0fdfa; border: 1px solid #99f6e4; border-radius: 6px; padding: 0.8em 1em; margin-bottom: 1em; }
    .verbete-label { font-size: 8pt; font-weight: 700; color: #0d9488; text-transform: uppercase; letter-spacing: 0.07em; margin-bottom: 0.5em; }
    .verbete p { color: #1e293b; line-height: 1.7; }
    .verbete-en { background: #f0fdf4; border-color: #86efac; }
    .verbete-en .verbete-label { color: #15803d; }
    .verbete-en p { color: #14532d; }
    .citations-section { margin-bottom: 0.75em; }
    .citations-label { font-size: 8pt; font-weight: 700; color: #94a3b8; text-transform: uppercase; letter-spacing: 0.07em; margin-bottom: 0.5em; }
    .citation { padding: 0.5em 0.75em; border-left: 2px solid #cbd5e1; background: #f8fafc; margin-bottom: 0.6em; border-radius: 0 4px 4px 0; }
    .citation-text { font-style: italic; color: #334155; }
    .citation-ref { font-size: 9pt; color: #64748b; margin-top: 0.2em; }
    .notas { margin-top: 1em; padding-top: 0.75em; border-top: 1px dashed #cbd5e1; }
    .notas-label { font-size: 8pt; font-weight: 700; color: #94a3b8; text-transform: uppercase; letter-spacing: 0.07em; margin-bottom: 0.5em; }
    .nota-item { font-size: 9pt; color: #475569; margin-bottom: 0.4em; line-height: 1.5; }
    .nota-tipo { font-size: 7.5pt; background: #fef3c7; color: #92400e; padding: 0.1em 0.35em; border-radius: 3px; margin-right: 0.3em; font-weight: 600; text-transform: uppercase; }
    .footer { margin-top: 3em; text-align: center; font-size: 8.5pt; color: #94a3b8; border-top: 1px solid #e2e8f0; padding-top: 1em; }
    @page { margin: 2cm 2.5cm; size: A4; }
    @media print { .entry { page-break-inside: avoid; } }
  </style>
</head>
<body>
  <div class="page">
    <div class="header">
      <h1>Glossário de Inovação Pública</h1>
      <div class="subtitle">GingaNormas · Legal Intelligence Platform</div>
      <div class="meta">Gerado em ${date} &bull; ${entries.length} termo${entries.length !== 1 ? "s" : ""} &bull; ${totalCits} citaç${totalCits !== 1 ? "ões" : "ão"}${hasIA ? " &bull; Processado com IA" : ""}</div>
    </div>
    ${entriesHTML}
    <div class="footer">GingaNormas — Plataforma de Análise Textual Jurídica e Acadêmica &bull; thiagovilar@usal.es</div>
  </div>
  <script>window.addEventListener('load', function() { setTimeout(function() { window.print(); }, 400); });</script>
</body>
</html>`;
}

function buildPlainText(
  entries: GlossarioEntry[],
  iaResult: IAResult | null,
  steps: Set<IAStep>
): string {
  const lines: string[] = [
    "GLOSSÁRIO DE INOVAÇÃO PÚBLICA",
    "GingaNormas — Legal Intelligence Platform",
    new Date().toLocaleDateString("pt-BR"),
    "",
    "═".repeat(65),
    "",
  ];

  for (const entry of entries) {
    const iaEntry = iaResult?.entradas.find((e) => e.termo === entry.termo);
    lines.push(entry.termo.toUpperCase());
    lines.push("─".repeat(Math.min(entry.termo.length, 50)));

    if (iaEntry?.verbete) {
      lines.push("Definição:");
      lines.push(iaEntry.verbete);
      lines.push("");
    }

    lines.push("Citações selecionadas:");
    for (const c of entry.citacoes) {
      lines.push(`  • "${c.citacaoDireta}"`);
      if (c.autores || c.fonte) {
        lines.push(`    (${[c.autores, c.fonte].filter(Boolean).join(" — ")})`);
      }
    }

    if (iaEntry?.verbete_en && steps.has("traducao")) {
      lines.push("");
      lines.push("Definition (EN):");
      lines.push(iaEntry.verbete_en);
    }

    if (iaEntry?.notas_rodape?.length) {
      lines.push("");
      lines.push("Notas de rodapé:");
      iaEntry.notas_rodape.forEach((n, i) => {
        lines.push(`  ${i + 1}. [${n.tipo_nota}] ${n.texto_nota}`);
      });
    }

    lines.push("");
  }

  return lines.join("\n");
}

// --- Main component ---

export default function GlossarioBuilder({ citacoes, temas }: Props) {
  const [search, setSearch] = useState("");
  const [expanded, setExpanded] = useState<string | null>(null);
  const [selections, setSelections] = useState<Map<string, Set<number>>>(new Map());
  const [steps, setSteps] = useState<Set<IAStep>>(new Set(["consolidar"]));
  const [iaStatus, setIaStatus] = useState<"idle" | "running" | "done" | "error">("idle");
  const [iaResult, setIaResult] = useState<IAResult | null>(null);
  const [iaError, setIaError] = useState("");
  const [copied, setCopied] = useState(false);

  const temaGroups = useMemo(
    () =>
      temas.map((tema) => ({
        tema,
        color: TEMA_COLORS[tema] ?? "#94a3b8",
        citacoes: citacoes.filter((c) => c.tema === tema),
        selectedIds: selections.get(tema) ?? new Set<number>(),
      })),
    [temas, citacoes, selections]
  );

  const filteredGroups = useMemo(() => {
    if (!search) return temaGroups;
    const q = search.toLowerCase();
    return temaGroups.filter(
      (g) =>
        g.tema.toLowerCase().includes(q) ||
        g.citacoes.some(
          (c) =>
            c.citacaoDireta.toLowerCase().includes(q) ||
            c.subtema.toLowerCase().includes(q) ||
            c.autores.toLowerCase().includes(q)
        )
    );
  }, [temaGroups, search]);

  const glossarioEntries: GlossarioEntry[] = useMemo(
    () =>
      Array.from(selections.entries())
        .filter(([, ids]) => ids.size > 0)
        .map(([tema, ids]) => ({
          termo: tema,
          color: TEMA_COLORS[tema] ?? "#94a3b8",
          citacoes: citacoes.filter((c) => ids.has(c.id)),
        })),
    [selections, citacoes]
  );

  const totalSelected = useMemo(
    () => Array.from(selections.values()).reduce((s, set) => s + set.size, 0),
    [selections]
  );

  const toggleCitacao = useCallback((tema: string, id: number) => {
    setSelections((prev) => {
      const next = new Map(prev);
      const set = new Set(next.get(tema) ?? []);
      set.has(id) ? set.delete(id) : set.add(id);
      if (set.size === 0) next.delete(tema);
      else next.set(tema, set);
      return next;
    });
    setIaResult(null);
  }, []);

  const removeTermo = useCallback((tema: string) => {
    setSelections((prev) => {
      const next = new Map(prev);
      next.delete(tema);
      return next;
    });
    setIaResult(null);
  }, []);

  function toggleStep(key: IAStep) {
    setSteps((prev) => {
      const next = new Set(prev);
      next.has(key) ? next.delete(key) : next.add(key);
      return next;
    });
  }

  async function runIA() {
    if (glossarioEntries.length === 0 || steps.size === 0) return;
    setIaStatus("running");
    setIaError("");
    setIaResult(null);

    const payload = {
      entradas: glossarioEntries.map((e) => ({
        termo: e.termo,
        citacoes: e.citacoes.map((c) => ({
          id: c.id,
          citacaoDireta: c.citacaoDireta,
          citacaoExtensa: c.citacaoExtensa,
          autores: c.autores,
          fonte: c.fonte,
          notaRapida: c.notaRapida,
        })),
      })),
      steps: Array.from(steps),
    };

    try {
      const res = await fetch("/api/ia/glossario", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      if (!res.ok) {
        const err = await res.json().catch(() => ({ error: res.statusText }));
        throw new Error(err.error || res.statusText);
      }
      const data = await res.json();
      if (data.error) throw new Error(data.error);
      setIaResult(data.resultado as IAResult);
      setIaStatus("done");
    } catch (e) {
      setIaError(String(e).replace(/^Error:\s*/, ""));
      setIaStatus("error");
    }
  }

  function exportPDF() {
    const html = buildPrintHTML(glossarioEntries, iaResult, steps);
    const blob = new Blob([html], { type: "text/html;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const win = window.open(url, "_blank");
    if (!win) {
      alert("Permita popups neste site para gerar o PDF, ou use Ctrl+P para imprimir esta página.");
    }
  }

  async function copyText() {
    const text = buildPlainText(glossarioEntries, iaResult, steps);
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    } catch {
      /* silent */
    }
  }

  return (
    <div className="flex gap-5">
      {/* ===== LEFT: Seletor de Termos ===== */}
      <div className="w-[42%] flex flex-col gap-3 min-w-0">
        <div className="flex items-center justify-between min-h-[24px]">
          <div className="flex items-center gap-2">
            <span className="w-5 h-5 rounded-full bg-brand-100 text-brand-700 text-[10px] flex items-center justify-center font-bold shrink-0">
              1
            </span>
            <h2 className="text-sm font-semibold text-slate-700">Selecionar Termos e Definições</h2>
          </div>
          {totalSelected > 0 && (
            <span className="text-xs text-brand-600 font-semibold shrink-0">
              {totalSelected} selecionada{totalSelected !== 1 ? "s" : ""}
            </span>
          )}
        </div>

        {/* Search */}
        <div className="relative">
          <Search
            size={13}
            className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none"
          />
          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Buscar termos, citações, autores…"
            className="w-full pl-8 pr-8 py-2 text-sm border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-500 bg-white placeholder:text-slate-400"
          />
          {search && (
            <button
              onClick={() => setSearch("")}
              className="absolute right-2.5 top-1/2 -translate-y-1/2 text-slate-300 hover:text-slate-500"
            >
              <X size={13} />
            </button>
          )}
        </div>

        {/* Term accordion */}
        <div className="overflow-y-auto space-y-1.5 pr-0.5" style={{ maxHeight: "calc(100vh - 290px)" }}>
          {filteredGroups.length === 0 && (
            <div className="text-center py-10 text-sm text-slate-400">
              Nenhum termo encontrado para &ldquo;{search}&rdquo;
            </div>
          )}
          {filteredGroups.map((group) => {
            const isOpen = expanded === group.tema;
            const selCount = group.selectedIds.size;
            return (
              <div
                key={group.tema}
                className={clsx(
                  "rounded-xl border transition-colors overflow-hidden",
                  isOpen || selCount > 0
                    ? "border-brand-200 bg-brand-50/40"
                    : "border-slate-100 bg-white"
                )}
              >
                {/* Accordion header */}
                <button
                  onClick={() => setExpanded(isOpen ? null : group.tema)}
                  className="w-full flex items-center gap-2.5 px-3.5 py-2.5 text-left"
                >
                  <span
                    className="w-2.5 h-2.5 rounded-full shrink-0"
                    style={{ backgroundColor: group.color }}
                  />
                  <span className="flex-1 text-sm font-medium text-slate-800 truncate min-w-0">
                    {group.tema}
                  </span>
                  {selCount > 0 && (
                    <span className="shrink-0 min-w-[18px] h-[18px] px-1 rounded-full bg-brand-600 text-white text-[9px] font-bold flex items-center justify-center">
                      {selCount}
                    </span>
                  )}
                  <span className="text-[10px] text-slate-400 shrink-0 tabular-nums">
                    {group.citacoes.length}
                  </span>
                  <ChevronDown
                    size={13}
                    className={clsx(
                      "text-slate-400 shrink-0 transition-transform duration-200",
                      isOpen ? "rotate-0" : "-rotate-90"
                    )}
                  />
                </button>

                {/* Citations list */}
                {isOpen && (
                  <div className="px-3 pb-3 space-y-1.5 border-t border-brand-100 pt-2">
                    {group.citacoes.map((c) => {
                      const sel = group.selectedIds.has(c.id);
                      const score = c.scoreContextoFinal;
                      return (
                        <button
                          key={c.id}
                          onClick={() => toggleCitacao(group.tema, c.id)}
                          className={clsx(
                            "w-full text-left flex gap-2.5 p-2.5 rounded-lg border transition-colors",
                            sel
                              ? "border-brand-300 bg-white shadow-sm"
                              : "border-transparent hover:border-slate-200 hover:bg-white/70"
                          )}
                        >
                          <div
                            className={clsx(
                              "mt-0.5 w-4 h-4 rounded border flex items-center justify-center shrink-0 transition-colors",
                              sel
                                ? "bg-brand-600 border-brand-600"
                                : "border-slate-300 bg-white"
                            )}
                          >
                            {sel && <Check size={9} className="text-white" strokeWidth={3} />}
                          </div>
                          <div className="min-w-0 flex-1">
                            <p className="text-[10px] text-slate-500 mb-0.5 truncate">{c.subtema}</p>
                            <p className="text-xs text-slate-800 italic line-clamp-2 leading-relaxed">
                              &ldquo;{c.citacaoDireta}&rdquo;
                            </p>
                            <div className="flex items-center gap-2 mt-1">
                              <span className="text-[10px] text-slate-400 truncate">{c.autores}</span>
                              {score != null && (
                                <span
                                  className={clsx(
                                    "shrink-0 text-[9px] font-semibold px-1.5 py-0 rounded-full",
                                    score >= 0.7
                                      ? "bg-emerald-50 text-emerald-700"
                                      : score >= 0.5
                                      ? "bg-amber-50 text-amber-700"
                                      : "bg-red-50 text-red-700"
                                  )}
                                >
                                  {(score * 10).toFixed(1)}
                                </span>
                              )}
                            </div>
                          </div>
                        </button>
                      );
                    })}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* ===== RIGHT: Glossário + IA + Exportar ===== */}
      <div className="flex-1 flex flex-col gap-4 min-w-0">
        {/* Step 2 header */}
        <div className="flex items-center gap-2 min-h-[24px]">
          <span className="w-5 h-5 rounded-full bg-brand-100 text-brand-700 text-[10px] flex items-center justify-center font-bold shrink-0">
            2
          </span>
          <h2 className="text-sm font-semibold text-slate-700">Revisar Glossário</h2>
          {glossarioEntries.length > 0 && (
            <span className="ml-auto text-xs text-slate-400">
              {glossarioEntries.length} termo{glossarioEntries.length !== 1 ? "s" : ""} ·{" "}
              {totalSelected} citação{totalSelected !== 1 ? "ões" : ""}
            </span>
          )}
        </div>

        {/* Glossary entries */}
        <div
          className="overflow-y-auto space-y-3 pr-0.5"
          style={{ maxHeight: "calc(100vh - 490px)", minHeight: "140px" }}
        >
          {glossarioEntries.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-14 text-center">
              <BookMarked size={36} className="text-slate-200 mb-3" />
              <p className="text-sm text-slate-500 font-medium">Glossário vazio</p>
              <p className="text-xs text-slate-400 mt-1">
                Expanda um tema à esquerda e marque as citações que deseja incluir
              </p>
            </div>
          ) : (
            glossarioEntries.map((entry) => {
              const iaEntry = iaResult?.entradas.find((e) => e.termo === entry.termo);
              return (
                <div key={entry.termo} className="card p-4">
                  {/* Term header */}
                  <div className="flex items-center gap-2 mb-3">
                    <span
                      className="w-2.5 h-2.5 rounded-full shrink-0"
                      style={{ backgroundColor: entry.color }}
                    />
                    <span className="text-xs font-bold text-slate-800 uppercase tracking-widest flex-1 truncate">
                      {entry.termo}
                    </span>
                    <button
                      onClick={() => removeTermo(entry.termo)}
                      className="text-slate-300 hover:text-red-400 transition-colors shrink-0"
                      title="Remover este termo"
                    >
                      <X size={14} />
                    </button>
                  </div>

                  {/* AI consolidated definition */}
                  {iaEntry?.verbete && (
                    <div className="mb-3 p-3 rounded-lg bg-brand-50 border border-brand-100">
                      <div className="flex items-center gap-1.5 mb-1.5">
                        <Sparkles size={10} className="text-brand-600 shrink-0" />
                        <span className="text-[9px] font-bold text-brand-700 uppercase tracking-wider">
                          Verbete consolidado · IA
                        </span>
                      </div>
                      <p className="text-xs text-slate-700 leading-relaxed">{iaEntry.verbete}</p>
                    </div>
                  )}

                  {/* AI translation */}
                  {iaEntry?.verbete_en && steps.has("traducao") && (
                    <div className="mb-3 p-3 rounded-lg bg-emerald-50 border border-emerald-100">
                      <span className="text-[9px] font-bold text-emerald-700 uppercase tracking-wider block mb-1.5">
                        Definition · EN
                      </span>
                      <p className="text-xs text-emerald-900 italic leading-relaxed">
                        {iaEntry.verbete_en}
                      </p>
                    </div>
                  )}

                  {/* Citation list */}
                  <div className="space-y-1.5">
                    {entry.citacoes.map((c) => (
                      <div key={c.id} className="flex gap-2 p-2 rounded-lg bg-slate-50 group">
                        <div className="flex-1 min-w-0">
                          <p className="text-xs italic text-slate-700 line-clamp-2 leading-relaxed">
                            &ldquo;{c.citacaoDireta}&rdquo;
                          </p>
                          <p className="text-[10px] text-slate-400 mt-0.5 truncate">
                            {[c.autores, c.fonte].filter(Boolean).join(" — ")}
                          </p>
                        </div>
                        <button
                          onClick={() => toggleCitacao(entry.termo, c.id)}
                          className="opacity-0 group-hover:opacity-100 transition-opacity text-slate-300 hover:text-red-400 shrink-0 mt-0.5"
                          title="Remover citação"
                        >
                          <X size={12} />
                        </button>
                      </div>
                    ))}
                  </div>

                  {/* Footnotes */}
                  {iaEntry?.notas_rodape && iaEntry.notas_rodape.length > 0 && (
                    <div className="mt-3 pt-3 border-t border-dashed border-slate-200">
                      <p className="text-[9px] font-bold text-slate-400 uppercase tracking-wider mb-2">
                        Notas de Rodapé
                      </p>
                      <div className="space-y-1">
                        {iaEntry.notas_rodape.map((n, i) => (
                          <div key={i} className="flex gap-1.5 text-[10px] text-slate-600">
                            <sup className="text-brand-600 font-bold mt-0.5 shrink-0">{i + 1}</sup>
                            <span>
                              <span className="text-[8px] font-semibold text-amber-700 bg-amber-50 px-1 rounded mr-1">
                                {n.tipo_nota}
                              </span>
                              {n.texto_nota}
                            </span>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              );
            })
          )}
        </div>

        {/* Step 3: AI tools */}
        {glossarioEntries.length > 0 && (
          <div className="card p-4">
            <div className="flex items-center gap-2 mb-3">
              <span className="w-5 h-5 rounded-full bg-brand-100 text-brand-700 text-[10px] flex items-center justify-center font-bold shrink-0">
                3
              </span>
              <h2 className="text-sm font-semibold text-slate-700">Aprimorar com IA</h2>
              {iaStatus === "done" && (
                <span className="ml-auto text-[10px] font-medium text-emerald-600 flex items-center gap-1">
                  <Check size={10} strokeWidth={3} /> Processado
                </span>
              )}
            </div>

            <div className="grid grid-cols-2 gap-2 mb-3">
              {IA_STEPS.map(({ key, label, desc }) => (
                <button
                  key={key}
                  onClick={() => toggleStep(key)}
                  className={clsx(
                    "flex items-start gap-2 p-2.5 rounded-lg border text-left transition-colors",
                    steps.has(key)
                      ? "border-brand-300 bg-brand-50"
                      : "border-slate-100 hover:border-slate-200 bg-white"
                  )}
                >
                  <div
                    className={clsx(
                      "mt-0.5 w-4 h-4 rounded border flex items-center justify-center shrink-0 transition-colors",
                      steps.has(key) ? "bg-brand-600 border-brand-600" : "border-slate-300 bg-white"
                    )}
                  >
                    {steps.has(key) && <Check size={9} className="text-white" strokeWidth={3} />}
                  </div>
                  <div>
                    <p className="text-[11px] font-semibold text-slate-800">{label}</p>
                    <p className="text-[10px] text-slate-500 leading-relaxed mt-0.5">{desc}</p>
                  </div>
                </button>
              ))}
            </div>

            <button
              onClick={runIA}
              disabled={iaStatus === "running" || steps.size === 0}
              className={clsx(
                "w-full flex items-center justify-center gap-2 py-2.5 rounded-xl text-sm font-semibold transition-all",
                iaStatus !== "running" && steps.size > 0
                  ? "bg-brand-600 text-white hover:bg-brand-700 shadow-sm"
                  : "bg-slate-100 text-slate-400 cursor-not-allowed"
              )}
            >
              {iaStatus === "running" ? (
                <>
                  <Loader2 size={14} className="animate-spin" /> Processando…
                </>
              ) : iaStatus === "done" ? (
                <>
                  <RefreshCw size={14} /> Re-processar
                </>
              ) : (
                <>
                  <Sparkles size={14} /> Aprimorar com IA
                </>
              )}
            </button>

            {iaStatus === "error" && (
              <div className="mt-2.5 flex gap-2 p-2.5 rounded-lg bg-red-50 border border-red-100">
                <AlertCircle size={12} className="text-red-500 shrink-0 mt-0.5" />
                <p className="text-[10px] text-red-700">
                  {iaError || "Erro ao processar. Verifique se ANTHROPIC_API_KEY está configurada em .env.local."}
                </p>
              </div>
            )}
          </div>
        )}

        {/* Step 4: Export */}
        {glossarioEntries.length > 0 && (
          <div className="card p-4">
            <div className="flex items-center gap-2 mb-3">
              <span className="w-5 h-5 rounded-full bg-brand-100 text-brand-700 text-[10px] flex items-center justify-center font-bold shrink-0">
                4
              </span>
              <h2 className="text-sm font-semibold text-slate-700">Exportar</h2>
            </div>
            <div className="flex gap-2">
              <button
                onClick={exportPDF}
                className="flex-1 flex items-center justify-center gap-2 py-2.5 rounded-xl text-sm font-semibold bg-slate-800 text-white hover:bg-slate-900 transition-colors"
              >
                <FileDown size={14} />
                Gerar PDF
              </button>
              <button
                onClick={copyText}
                className={clsx(
                  "flex-1 flex items-center justify-center gap-2 py-2.5 rounded-xl text-sm font-semibold border transition-colors",
                  copied
                    ? "border-emerald-200 bg-emerald-50 text-emerald-700"
                    : "border-slate-200 text-slate-700 hover:bg-slate-50"
                )}
              >
                {copied ? (
                  <>
                    <Check size={14} /> Copiado!
                  </>
                ) : (
                  <>
                    <Copy size={14} /> Copiar Texto
                  </>
                )}
              </button>
            </div>
            {iaResult && (
              <p className="text-[10px] text-slate-400 text-center mt-2">
                O PDF incluirá os verbetes gerados pela IA
              </p>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
