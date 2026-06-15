"use client";

import { useState, useMemo } from "react";
import data from "../../../../data/legislacao.json";

type Instrumento = {
  id: string;
  camada: string;
  uf: string;
  ente: string;
  tipo: string;
  numero: string;
  data: string;
  tematica: string;
  ementa: string;
  trecho: string;
  url: string;
  status: string;
  tags: string;
};

const instrumentos = data.instrumentos as Instrumento[];

const CAMADAS = [
  "Marco Legal Federal",
  "ICT / Órgão Indireto",
  "Poder Judiciário (CNJ)",
  "Governo Digital / InovaGov",
  "Estado",
  "Município",
];

const CAMADA_CONFIG: Record<string, { color: string; dot: string; badge: string; label: string }> = {
  "Marco Legal Federal":       { color: "border-l-brand-500",  dot: "bg-brand-500",  badge: "bg-brand-50 text-brand-700 border-brand-200",    label: "Federal" },
  "ICT / Órgão Indireto":      { color: "border-l-violet-500", dot: "bg-violet-500", badge: "bg-violet-50 text-violet-700 border-violet-200",  label: "ICT" },
  "Poder Judiciário (CNJ)":    { color: "border-l-amber-500",  dot: "bg-amber-500",  badge: "bg-amber-50 text-amber-700 border-amber-200",     label: "Judiciário" },
  "Governo Digital / InovaGov":{ color: "border-l-teal-500",   dot: "bg-teal-500",   badge: "bg-teal-50 text-teal-700 border-teal-200",        label: "Gov. Digital" },
  "Estado":                    { color: "border-l-forest-600", dot: "bg-forest-600", badge: "bg-forest-50 text-forest-700 border-forest-100",  label: "Estadual" },
  "Município":                 { color: "border-l-rose-500",   dot: "bg-rose-500",   badge: "bg-rose-50 text-rose-700 border-rose-200",        label: "Municipal" },
};

const STATUS_BADGE: Record<string, string> = {
  "Vigente":                     "bg-green-50 text-green-700 border-green-200",
  "Vigente (com alterações)":    "bg-blue-50 text-blue-700 border-blue-200",
  "Em elaboração":               "bg-yellow-50 text-yellow-700 border-yellow-200",
  "Em tramitação":               "bg-orange-50 text-orange-700 border-orange-200",
  "Revogada (consolidada na Res. 395/2021)": "bg-slate-100 text-slate-500 border-slate-200",
};

function statusBadgeClass(status: string) {
  for (const key of Object.keys(STATUS_BADGE)) {
    if (status.startsWith(key)) return STATUS_BADGE[key];
  }
  return "bg-slate-100 text-slate-500 border-slate-200";
}

function statusLabel(status: string) {
  if (status.startsWith("Vigente (com alterações)")) return "Vigente*";
  if (status.startsWith("Vigente (referência)")) return "Referência";
  if (status.startsWith("Vigente (programa")) return "Vigente";
  if (status.startsWith("Vigente (como Lab")) return "Vigente";
  if (status.startsWith("Vigente")) return "Vigente";
  if (status.startsWith("Em elaboração")) return "Em elaboração";
  if (status.startsWith("Em tramitação")) return "Em tramitação";
  if (status.startsWith("Revogada")) return "Revogada";
  return status.split("—")[0].trim();
}

function InstrumentoCard({ item }: { item: Instrumento }) {
  const [expanded, setExpanded] = useState(false);
  const cfg = CAMADA_CONFIG[item.camada] ?? CAMADA_CONFIG["Marco Legal Federal"];
  const tags = item.tags.split(" ").filter(Boolean);

  return (
    <div className={`card border-l-[3px] ${cfg.color} p-4 hover:shadow-md transition-shadow`}>
      <div className="flex items-start justify-between gap-3">
        <div className="flex items-start gap-2 min-w-0">
          <span className="font-mono text-xs text-slate-400 mt-0.5 shrink-0">{item.id}</span>
          <div className="min-w-0">
            <div className="flex flex-wrap items-center gap-1.5 mb-1">
              <span className="text-sm font-semibold text-slate-800 leading-snug">{item.numero}</span>
              {item.data && (
                <span className="text-xs text-slate-400">· {item.data}</span>
              )}
            </div>
            {item.ente && (
              <p className="text-xs text-slate-500 mb-1.5 truncate">{item.ente}{item.uf && item.uf !== "BR" ? ` · ${item.uf}` : ""}</p>
            )}
            {item.tematica && (
              <p className="text-xs font-medium text-slate-600 mb-1">{item.tematica}</p>
            )}
            <p className="text-xs text-slate-500 leading-relaxed line-clamp-2">{item.ementa}</p>
          </div>
        </div>
        <div className="flex items-start gap-1.5 shrink-0">
          <span className={`inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium border ${statusBadgeClass(item.status)}`}>
            {statusLabel(item.status)}
          </span>
        </div>
      </div>

      {item.trecho && (
        <div className="mt-3">
          <button
            onClick={() => setExpanded(!expanded)}
            className="text-xs text-brand-600 hover:text-brand-800 font-medium flex items-center gap-1 transition-colors"
          >
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" className={`transition-transform ${expanded ? "rotate-90" : ""}`}><path d="M9 18l6-6-6-6"/></svg>
            {expanded ? "Ocultar trecho" : "Ver trecho relevante"}
          </button>
          {expanded && (
            <blockquote className="mt-2 pl-3 border-l-2 border-slate-200 text-xs text-slate-600 italic leading-relaxed">
              {item.trecho}
            </blockquote>
          )}
        </div>
      )}

      <div className="mt-3 flex flex-wrap items-center gap-1.5 justify-between">
        <div className="flex flex-wrap gap-1">
          {tags.map((t) => (
            <span key={t} className="text-[10px] px-1.5 py-0.5 rounded bg-slate-100 text-slate-500 font-mono">{t}</span>
          ))}
        </div>
        {item.url && (
          <a
            href={item.url}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1 text-xs text-brand-500 hover:text-brand-700 transition-colors"
            title="Abrir fonte primária"
          >
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/><polyline points="15 3 21 3 21 9"/><line x1="10" y1="14" x2="21" y2="3"/></svg>
            Fonte
          </a>
        )}
      </div>
    </div>
  );
}

function CamadaSection({ camada, items }: { camada: string; items: Instrumento[] }) {
  const [open, setOpen] = useState(true);
  const cfg = CAMADA_CONFIG[camada] ?? CAMADA_CONFIG["Marco Legal Federal"];

  return (
    <div className="mb-6">
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex items-center justify-between gap-3 mb-3 group"
      >
        <div className="flex items-center gap-2">
          <span className={`w-2.5 h-2.5 rounded-full ${cfg.dot} shrink-0`} />
          <h3 className="text-sm font-display font-bold text-slate-700 group-hover:text-slate-900 transition-colors">{camada}</h3>
          <span className="inline-flex items-center justify-center w-5 h-5 rounded-full bg-slate-100 text-slate-500 text-[10px] font-bold">{items.length}</span>
        </div>
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" className={`text-slate-400 transition-transform ${open ? "rotate-90" : ""}`}><path d="M9 18l6-6-6-6"/></svg>
      </button>
      {open && (
        <div className="grid gap-3 sm:grid-cols-1 lg:grid-cols-2">
          {items.map((item) => (
            <InstrumentoCard key={item.id} item={item} />
          ))}
        </div>
      )}
    </div>
  );
}



export default function LegislacaoPage() {
  const [search, setSearch] = useState("");
  const [camadaFilter, setCamadaFilter] = useState<string>("todas");
  const [statusFilter, setStatusFilter] = useState<string>("todos");

  const filtered = useMemo(() => {
    return instrumentos.filter((item) => {
      if (camadaFilter !== "todas" && item.camada !== camadaFilter) return false;
      if (statusFilter === "vigente" && !item.status.toLowerCase().startsWith("vigente")) return false;
      if (statusFilter === "outros" && item.status.toLowerCase().startsWith("vigente")) return false;
      if (search) {
        const q = search.toLowerCase();
        return (
          item.numero.toLowerCase().includes(q) ||
          item.ementa.toLowerCase().includes(q) ||
          item.tematica.toLowerCase().includes(q) ||
          item.ente.toLowerCase().includes(q) ||
          item.tags.toLowerCase().includes(q)
        );
      }
      return true;
    });
  }, [search, camadaFilter, statusFilter]);

  const byCamada = useMemo(() => {
    return CAMADAS.map((c) => ({ camada: c, items: filtered.filter((i) => i.camada === c) })).filter((g) => g.items.length > 0);
  }, [filtered]);

  const vigentes = instrumentos.filter((i) => i.status.toLowerCase().startsWith("vigente")).length;

  return (
    <div className="animate-in fade-in slide-in-from-bottom-2 duration-500">
      {/* Stats */}
      <div className="flex flex-wrap gap-4 mb-6 pb-5 border-b border-slate-100">
        <div className="text-center">
          <p className="text-2xl font-display font-black text-brand-900">{instrumentos.length}</p>
          <p className="text-xs text-slate-500 mt-0.5">Instrumentos</p>
        </div>
        <div className="w-px bg-slate-200 self-stretch" />
        <div className="text-center">
          <p className="text-2xl font-display font-black text-brand-900">{CAMADAS.length}</p>
          <p className="text-xs text-slate-500 mt-0.5">Camadas normativas</p>
        </div>
        <div className="w-px bg-slate-200 self-stretch" />
        <div className="text-center">
          <p className="text-2xl font-display font-black text-green-700">{vigentes}</p>
          <p className="text-xs text-slate-500 mt-0.5">Vigentes</p>
        </div>
        <div className="w-px bg-slate-200 self-stretch" />
        <div className="text-center">
          <p className="text-2xl font-display font-black text-slate-700">2004–2026</p>
          <p className="text-xs text-slate-500 mt-0.5">Cobertura temporal</p>
        </div>

        {/* Future action buttons */}
        <div className="ml-auto flex items-center gap-2">
          <button
            disabled
            title="Em desenvolvimento"
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium border border-slate-200 text-slate-400 bg-white cursor-not-allowed opacity-60"
          >
            <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="17 8 12 3 7 8"/><line x1="12" y1="3" x2="12" y2="15"/></svg>
            Importar
          </button>
          <button
            disabled
            title="Em desenvolvimento"
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium border border-slate-200 text-slate-400 bg-white cursor-not-allowed opacity-60"
          >
            <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/></svg>
            Exportar
          </button>
          <button
            disabled
            title="Em desenvolvimento"
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium border border-brand-200 text-brand-400 bg-brand-50 cursor-not-allowed opacity-60"
          >
            <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M12 2a10 10 0 1 0 10 10"/><path d="M12 6v6l4 2"/><circle cx="18" cy="6" r="3"/></svg>
            Análise IA
          </button>
        </div>
      </div>

      {/* Filters */}
      <div className="flex flex-wrap gap-2 mb-6">
        <div className="relative flex-1 min-w-48">
          <svg className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>
          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Buscar instrumento, ementa, ente…"
            className="w-full pl-9 pr-4 py-2 text-sm border border-slate-200 rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-brand-300"
          />
        </div>

        <select
          value={camadaFilter}
          onChange={(e) => setCamadaFilter(e.target.value)}
          className="text-sm border border-slate-200 rounded-lg px-3 py-2 bg-white focus:outline-none focus:ring-2 focus:ring-brand-300 text-slate-700"
        >
          <option value="todas">Todas as camadas</option>
          {CAMADAS.map((c) => (
            <option key={c} value={c}>{CAMADA_CONFIG[c]?.label ?? c}</option>
          ))}
        </select>

        <select
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
          className="text-sm border border-slate-200 rounded-lg px-3 py-2 bg-white focus:outline-none focus:ring-2 focus:ring-brand-300 text-slate-700"
        >
          <option value="todos">Todos os status</option>
          <option value="vigente">Vigentes</option>
          <option value="outros">Em tramitação / Outros</option>
        </select>

        {(search || camadaFilter !== "todas" || statusFilter !== "todos") && (
          <button
            onClick={() => { setSearch(""); setCamadaFilter("todas"); setStatusFilter("todos"); }}
            className="text-xs text-slate-500 hover:text-slate-700 px-2 py-2 transition-colors"
          >
            Limpar filtros
          </button>
        )}
      </div>

      {/* Camada legend */}
      <div className="flex flex-wrap gap-2 mb-6">
        {CAMADAS.map((c) => {
          const cfg = CAMADA_CONFIG[c];
          const count = instrumentos.filter((i) => i.camada === c).length;
          return (
            <button
              key={c}
              onClick={() => setCamadaFilter(camadaFilter === c ? "todas" : c)}
              className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium border transition-all ${
                camadaFilter === c ? cfg.badge + " ring-2 ring-offset-1 ring-current opacity-100" : "bg-white border-slate-200 text-slate-500 hover:border-slate-300"
              }`}
            >
              <span className={`w-1.5 h-1.5 rounded-full ${cfg.dot}`} />
              {cfg.label}
              <span className="opacity-60">{count}</span>
            </button>
          );
        })}
      </div>

      {/* Results */}
      {filtered.length === 0 ? (
        <div className="py-12 text-center text-slate-400 text-sm">Nenhum instrumento encontrado para os filtros selecionados.</div>
      ) : (
        byCamada.map(({ camada, items }) => (
          <CamadaSection key={camada} camada={camada} items={items} />
        ))
      )}


    </div>
  );
}
