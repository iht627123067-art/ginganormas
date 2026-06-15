"use client";

import React, { useState, useMemo } from "react";
import { ExternalLink, Search, Newspaper, X } from "lucide-react";
import { noticias, CategoriaNoticia } from "@/data/noticias";

const CAT_LABELS: Record<string, string> = {
  Todos: "Todos",
  Hubs: "Hubs",
  IA: "IA / Digital",
  Legal: "Marco Legal",
  Fomento: "Fomento",
  Eventos: "Eventos",
};

const CAT_COUNTS: Record<string, number> = {
  Todos: noticias.length,
  Hubs: noticias.filter((n) => n.c === "Hubs").length,
  IA: noticias.filter((n) => n.c === "IA").length,
  Legal: noticias.filter((n) => n.c === "Legal").length,
  Fomento: noticias.filter((n) => n.c === "Fomento").length,
  Eventos: noticias.filter((n) => n.c === "Eventos").length,
};

const CAT_STYLE: Record<CategoriaNoticia, { bg: string; text: string }> = {
  Hubs:    { bg: "bg-violet-50",  text: "text-violet-700" },
  IA:      { bg: "bg-brand-50",   text: "text-brand-700" },
  Legal:   { bg: "bg-forest-50",  text: "text-forest-700" },
  Fomento: { bg: "bg-amber-50",   text: "text-amber-700" },
  Eventos: { bg: "bg-pink-50",    text: "text-pink-700" },
};

const PAGE_SIZE = 24;

export default function NoticiasPage() {
  const [query, setQuery] = useState("");
  const [catAtiva, setCatAtiva] = useState<string>("Todos");
  const [pagina, setPagina] = useState(1);

  const filtradas = useMemo(() => {
    const q = query.toLowerCase();
    return noticias.filter((n) => {
      const matchCat = catAtiva === "Todos" || n.c === catAtiva;
      const matchQ =
        !q ||
        n.t.toLowerCase().includes(q) ||
        n.p.toLowerCase().includes(q) ||
        n.d.toLowerCase().includes(q);
      return matchCat && matchQ;
    });
  }, [query, catAtiva]);

  const visiveis = filtradas.slice(0, pagina * PAGE_SIZE);
  const temMais = visiveis.length < filtradas.length;

  function handleCat(cat: string) {
    setCatAtiva(cat);
    setPagina(1);
  }

  function handleSearch(v: string) {
    setQuery(v);
    setPagina(1);
  }

  return (
    <div className="p-8 max-w-7xl mx-auto min-h-screen animate-in fade-in slide-in-from-bottom-2 duration-500">

      {/* ── Cabeçalho ── */}
      <div className="mb-8 flex items-start gap-3">
        <div
          className="w-[3px] self-stretch rounded-full mt-0.5 shrink-0"
          style={{ background: "#F1C232" }}
        />
        <div>
          <h1 className="text-2xl font-display font-black text-brand-900 leading-tight">
            Notícias
          </h1>
          <p className="text-sm text-slate-500 mt-0.5">
            {noticias.length} registros curados de inovação pública · março 2026
          </p>
        </div>
      </div>

      {/* ── KPIs ── */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-8">
        {[
          { label: "Total", value: "275", sub: "notícias curadas" },
          { label: "IA / Digital", value: "112", sub: "iniciativas gov." },
          { label: "Hubs", value: "92", sub: "ecossistemas" },
          { label: "Fomento", value: "R$ 1,8B+", sub: "editais mapeados" },
        ].map((kpi) => (
          <div
            key={kpi.label}
            className="bg-white border border-slate-200 rounded-2xl p-4 shadow-ginga"
          >
            <p className="text-[10px] font-display font-bold tracking-[0.12em] uppercase text-slate-400 mb-1">
              {kpi.label}
            </p>
            <p className="text-2xl font-display font-black text-brand-900 leading-none mb-1">
              {kpi.value}
            </p>
            <p className="text-[11px] text-slate-400">{kpi.sub}</p>
          </div>
        ))}
      </div>

      {/* ── Painel de filtros ── */}
      <div className="bg-white border border-slate-200 rounded-2xl shadow-ginga p-5 mb-6">
        {/* Busca */}
        <div className="relative mb-4">
          <Search
            size={15}
            className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none"
          />
          <input
            type="search"
            value={query}
            onChange={(e) => handleSearch(e.target.value)}
            placeholder="Pesquisar por título, veículo ou tema..."
            className="w-full pl-9 pr-10 py-2.5 rounded-xl border border-slate-200 bg-slate-50 text-sm text-slate-800 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-brand-300 focus:border-brand-400 transition"
          />
          {query && (
            <button
              onClick={() => handleSearch("")}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
            >
              <X size={14} />
            </button>
          )}
        </div>

        {/* Chips de categoria */}
        <div className="flex flex-wrap gap-2">
          {Object.entries(CAT_LABELS).map(([key, label]) => {
            const active = catAtiva === key;
            return (
              <button
                key={key}
                onClick={() => handleCat(key)}
                className={[
                  "inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-display font-semibold transition-colors",
                  active
                    ? "bg-brand-900 text-white border border-brand-900"
                    : "bg-white border border-slate-200 text-slate-600 hover:border-brand-300 hover:text-brand-700",
                ].join(" ")}
              >
                {label}
                <span
                  className={[
                    "px-1.5 py-0.5 rounded-md text-[10px] font-bold",
                    active ? "bg-white/20 text-white" : "bg-slate-100 text-slate-500",
                  ].join(" ")}
                >
                  {CAT_COUNTS[key]}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* ── Contador de resultados ── */}
      <p className="text-xs text-slate-400 mb-4 font-medium">
        Mostrando{" "}
        <span className="text-slate-700 font-bold">{visiveis.length}</span> de{" "}
        <span className="text-slate-700 font-bold">{filtradas.length}</span>{" "}
        notícias
        {catAtiva !== "Todos" && (
          <> em <span className="text-brand-700 font-bold">{CAT_LABELS[catAtiva]}</span></>
        )}
        {query && (
          <> para <span className="text-brand-700 font-bold">"{query}"</span></>
        )}
      </p>

      {/* ── Grid de cards ── */}
      {filtradas.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-20 text-center">
          <Newspaper size={40} className="text-slate-300 mb-4" />
          <p className="text-slate-500 font-display font-semibold">Nenhuma notícia encontrada</p>
          <p className="text-xs text-slate-400 mt-1">Tente outro termo ou remova os filtros</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
          {visiveis.map((n, i) => {
            const cs = CAT_STYLE[n.c] ?? { bg: "bg-slate-50", text: "text-slate-500" };
            return (
              <div
                key={i}
                className="group bg-white border border-slate-200 rounded-2xl p-4 flex flex-col gap-2.5 shadow-ginga hover:shadow-card-hover hover:-translate-y-[2px] transition-all duration-150"
              >
                {/* Topo: categoria + data */}
                <div className="flex items-center justify-between gap-2">
                  <span
                    className={[
                      "text-[10px] font-display font-bold tracking-[0.1em] uppercase px-2 py-0.5 rounded-md",
                      cs.bg,
                      cs.text,
                    ].join(" ")}
                  >
                    {n.c === "IA" ? "IA / Digital" : n.c}
                  </span>
                  <span className="text-[11px] text-slate-400 shrink-0">{n.dt}</span>
                </div>

                {/* Título */}
                <h3 className="text-[13px] font-display font-bold text-slate-800 leading-snug line-clamp-2 group-hover:text-brand-900 transition-colors">
                  {n.t}
                </h3>

                {/* Descrição */}
                <p className="text-[12px] text-slate-500 leading-relaxed line-clamp-3 flex-1">
                  {n.d}
                </p>

                {/* Rodapé: publisher + link */}
                <div className="flex items-center justify-between gap-2 mt-auto pt-2 border-t border-slate-100">
                  <span className="text-[11px] text-slate-400 font-medium truncate max-w-[65%]">
                    {n.p}
                  </span>
                  <a
                    href={n.u}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1 text-[11px] font-display font-bold text-brand-600 hover:text-brand-900 transition-colors shrink-0"
                  >
                    Ver fonte
                    <ExternalLink size={11} />
                  </a>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* ── Carregar mais ── */}
      {temMais && (
        <div className="flex justify-center mt-8">
          <button
            onClick={() => setPagina((p) => p + 1)}
            className="px-6 py-2.5 rounded-xl bg-brand-900 hover:bg-brand-800 text-white text-sm font-display font-bold tracking-wide shadow-ginga transition-colors"
          >
            Carregar mais notícias
          </button>
        </div>
      )}
    </div>
  );
}
