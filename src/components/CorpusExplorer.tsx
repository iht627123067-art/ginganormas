"use client";
import { useState, useMemo } from "react";
import type { Citacao } from "@/lib/types";
import { TEMA_COLORS, getFonteType } from "@/lib/data";
import { Search, Filter, ChevronDown, ChevronUp } from "lucide-react";
import clsx from "clsx";
import CitacaoModal from "./CitacaoModal";

const FONTE_LABELS: Record<string, string> = {
  lei: "Legislação",
  doutrina: "Doutrina",
  relatorio: "Relatório",
  outro: "Outro",
};
const FONTE_COLORS: Record<string, string> = {
  lei: "bg-blue-50 text-blue-700",
  doutrina: "bg-purple-50 text-purple-700",
  relatorio: "bg-amber-50 text-amber-700",
  outro: "bg-slate-50 text-slate-600",
};

interface Props {
  citacoes: Citacao[];
  temas: string[];
  subtemas: string[];
}

export default function CorpusExplorer({ citacoes, temas, subtemas }: Props) {
  const [search, setSearch] = useState("");
  const [temaFilter, setTemaFilter] = useState("");
  const [subtemaFilter, setSubtemaFilter] = useState("");
  const [fonteFilter, setFonteFilter] = useState("");
  const [scoreMin, setScoreMin] = useState(0);

  const [modal, setModal] = useState<Citacao | null>(null);
  const [sortKey, setSortKey] = useState<"scoreContextoFinal" | "tema" | "id">("id");
  const [sortDir, setSortDir] = useState<"asc" | "desc">("asc");

  // Filtra subtemas dinamicamente com base no tema escolhido
  const subtemasDisponiveis = useMemo(() => {
    if (!temaFilter) return subtemas;
    const subSet = new Set(citacoes.filter((c) => c.tema === temaFilter).map((c) => c.subtema));
    return subtemas.filter((s) => subSet.has(s));
  }, [subtemas, temaFilter, citacoes]);

  const filtered = useMemo(() => {
    let res = citacoes;
    if (search) {
      const q = search.toLowerCase();
      res = res.filter(
        (c) =>
          (c.citacaoDireta || "").toLowerCase().includes(q) ||
          (c.subtema || "").toLowerCase().includes(q) ||
          (c.autores || "").toLowerCase().includes(q) ||
          (c.notaRapida || "").toLowerCase().includes(q)
      );
    }
    if (temaFilter) res = res.filter((c) => c.tema === temaFilter);
    if (subtemaFilter) res = res.filter((c) => c.subtema === subtemaFilter);
    if (fonteFilter) res = res.filter((c) => getFonteType(c.fonte) === fonteFilter);
    if (scoreMin > 0) res = res.filter((c) => (c.scoreContextoFinal ?? 0) >= scoreMin);

    return [...res].sort((a, b) => {
      const va = sortKey === "id" ? a.id : sortKey === "tema" ? a.tema : (a.scoreContextoFinal ?? 0);
      const vb = sortKey === "id" ? b.id : sortKey === "tema" ? b.tema : (b.scoreContextoFinal ?? 0);
      if (typeof va === "string") return sortDir === "asc" ? va.localeCompare(vb as string) : (vb as string).localeCompare(va);
      return sortDir === "asc" ? (va as number) - (vb as number) : (vb as number) - (va as number);
    });
  }, [citacoes, search, temaFilter, subtemaFilter, fonteFilter, scoreMin, sortKey, sortDir]);

  function toggleSort(key: typeof sortKey) {
    if (sortKey === key) setSortDir((d) => (d === "asc" ? "desc" : "asc"));
    else { setSortKey(key); setSortDir("asc"); }
  }
  const SortIcon = ({ k }: { k: typeof sortKey }) =>
    sortKey === k
      ? sortDir === "asc" ? <ChevronUp size={12} /> : <ChevronDown size={12} />
      : <ChevronDown size={12} className="text-slate-300" />;

  return (
    <>
      <div className="card mb-4 p-4">
        <div className="flex flex-wrap gap-3">
          <div className="relative flex-1 min-w-[200px]">
            <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
            <input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Buscar citação, subtema, autor…"
              className="w-full pl-9 pr-3 py-2 text-sm border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-500 focus:border-transparent"
            />
          </div>

          <select
            value={temaFilter}
            onChange={(e) => {
              setTemaFilter(e.target.value);
              setSubtemaFilter(""); // Reseta o subtema ao alterar o tema
            }}
            className="px-3 py-2 text-sm border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-500 bg-white text-slate-700 max-w-[200px]"
          >
            <option value="">Todos os temas</option>
            {temas.map((t) => <option key={t} value={t}>{t}</option>)}
          </select>

          <select
            value={subtemaFilter}
            onChange={(e) => setSubtemaFilter(e.target.value)}
            className="px-3 py-2 text-sm border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-500 bg-white text-slate-700 max-w-[200px]"
          >
            <option value="">Todos os subtemas</option>
            {subtemasDisponiveis.map((s) => (
              <option key={s} value={s}>
                {s.length > 30 ? s.slice(0, 30) + "…" : s}
              </option>
            ))}
          </select>

          <select
            value={fonteFilter}
            onChange={(e) => setFonteFilter(e.target.value)}
            className="px-3 py-2 text-sm border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-500 bg-white text-slate-700"
          >
            <option value="">Tipo de fonte</option>
            {(["lei", "doutrina", "relatorio", "outro"] as const).map((f) => (
              <option key={f} value={f}>{FONTE_LABELS[f]}</option>
            ))}
          </select>

          <div className="flex items-center gap-2">
            <Filter size={14} className="text-slate-400" />
            <label className="text-xs text-slate-500">Score ≥</label>
            <input
              type="range" min={0} max={1} step={0.1}
              value={scoreMin}
              onChange={(e) => setScoreMin(+e.target.value)}
              className="w-20 accent-brand-600"
            />
            <span className="text-xs font-medium text-slate-700 w-8">{scoreMin.toFixed(1)}</span>
          </div>

          <span className="ml-auto text-xs text-slate-400 self-center">{filtered.length} resultados</span>
        </div>
      </div>

      <div className="card overflow-hidden">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b-2 border-slate-100" style={{ background: "linear-gradient(90deg, #0e3e6608 0%, transparent 100%)" }}>
              <th className="px-4 py-3 text-left">
                <button onClick={() => toggleSort("id")} className="flex items-center gap-1 label-ginga hover:text-brand-700">
                  # <SortIcon k="id" />
                </button>
              </th>
              <th className="px-4 py-3 text-left">
                <button onClick={() => toggleSort("tema")} className="flex items-center gap-1 label-ginga hover:text-brand-700">
                  Tema <SortIcon k="tema" />
                </button>
              </th>
              <th className="px-4 py-3 text-left label-ginga">Subtema</th>
              <th className="px-4 py-3 text-left label-ginga">Citação</th>
              <th className="px-4 py-3 text-left label-ginga">Fonte</th>
              <th className="px-4 py-3 text-left">
                <button onClick={() => toggleSort("scoreContextoFinal")} className="flex items-center gap-1 label-ginga hover:text-brand-700">
                  Score <SortIcon k="scoreContextoFinal" />
                </button>
              </th>
            </tr>
          </thead>
          <tbody>
            {filtered.map((c) => {
              const fonteType = getFonteType(c.fonte);
              const color = TEMA_COLORS[c.tema] ?? "#94a3b8";
              return (
                <tr
                  key={c.id}
                  className="border-b border-slate-50 hover:bg-slate-50 cursor-pointer transition-colors"
                  onClick={() => setModal(c)}
                >
                  <td className="px-4 py-3 text-slate-400 font-mono text-xs">{c.id}</td>
                  <td className="px-4 py-3">
                    <span
                      className="badge text-white text-[10px]"
                      style={{ backgroundColor: color }}
                    >
                      {c.tema.length > 20 ? c.tema.slice(0, 20) + "…" : c.tema}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-slate-600 text-xs max-w-[180px]">
                    <span className="line-clamp-2">{c.subtema}</span>
                  </td>
                  <td className="px-4 py-3 text-slate-800 max-w-[280px]">
                    <span className="text-xs italic line-clamp-2">
                      "{c.citacaoDireta}"
                    </span>
                  </td>
                  <td className="px-4 py-3">
                    <span className={clsx("badge text-[10px]", FONTE_COLORS[fonteType])}>
                      {FONTE_LABELS[fonteType]}
                    </span>
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-2">
                      <div className="score-bar w-16">
                        <div
                          className="score-bar-fill"
                          style={{
                            width: `${(c.scoreContextoFinal ?? 0) * 100}%`,
                            backgroundColor: color,
                          }}
                        />
                      </div>
                      <span className="text-xs font-medium text-slate-700 tabular-nums">
                        {c.scoreContextoFinal?.toFixed(2) ?? "—"}
                      </span>
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>

        {filtered.length === 0 && (
          <div className="text-center py-16 text-slate-400 text-sm">
            Nenhuma citação encontrada para os filtros selecionados.
          </div>
        )}
      </div>

      {modal && <CitacaoModal citacao={modal} onClose={() => setModal(null)} />}
    </>
  );
}
