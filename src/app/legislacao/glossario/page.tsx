"use client";

import { useState, useMemo } from "react";
import data from "../../../../data/legislacao.json";

type GlossarioItem = {
  sigla: string;
  definicao: string;
  instrumento: string;
  camada: string;
};

const glossario = data.glossario as GlossarioItem[];

export default function GlossarioPage() {
  const [search, setSearch] = useState("");
  
  const filtered = useMemo(
    () => glossario.filter((g) => search === "" || g.sigla.toLowerCase().includes(search.toLowerCase()) || g.definicao.toLowerCase().includes(search.toLowerCase())),
    [search]
  );

  return (
    <div className="animate-in fade-in slide-in-from-bottom-2 duration-500">
      <div className="mb-6 flex flex-wrap gap-4 items-center justify-between border-b border-slate-100 pb-5">
        <div>
          <h2 className="text-xl font-display font-bold text-slate-800">Glossário Técnico</h2>
          <p className="text-sm text-slate-500 mt-1">Definições e conceitos-chave da inovação no setor público</p>
        </div>
        <div className="text-center px-4">
          <p className="text-2xl font-display font-black text-brand-900">{glossario.length}</p>
          <p className="text-xs text-slate-500 mt-0.5">Termos listados</p>
        </div>
      </div>

      <div className="p-1 mb-4">
        <div className="relative">
          <svg className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>
          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Buscar sigla ou conceito…"
            className="w-full pl-9 pr-4 py-2 text-sm border border-slate-200 rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-brand-300"
          />
        </div>
      </div>

      <div className="border border-slate-200 rounded-xl overflow-hidden bg-white">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="bg-slate-50">
              <tr className="border-b border-slate-200">
                <th className="text-left py-3 px-4 text-slate-600 font-semibold w-40">Sigla / Termo</th>
                <th className="text-left py-3 px-4 text-slate-600 font-semibold">Definição Técnica</th>
                <th className="text-left py-3 px-4 text-slate-600 font-semibold hidden md:table-cell">Instrumento Legal</th>
                <th className="text-left py-3 px-4 text-slate-600 font-semibold hidden lg:table-cell w-32">Camada</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((g, i) => (
                <tr key={i} className="border-b border-slate-100 last:border-0 hover:bg-slate-50 transition-colors">
                  <td className="py-3 px-4 font-mono font-bold text-brand-700 align-top whitespace-nowrap">{g.sigla}</td>
                  <td className="py-3 px-4 text-slate-600 leading-relaxed align-top">{g.definicao}</td>
                  <td className="py-3 px-4 text-slate-500 text-xs align-top hidden md:table-cell">{g.instrumento}</td>
                  <td className="py-3 px-4 text-slate-400 text-xs align-top hidden lg:table-cell">{g.camada}</td>
                </tr>
              ))}
            </tbody>
          </table>
          {filtered.length === 0 && (
            <div className="p-8 text-center text-slate-400">Nenhum termo encontrado.</div>
          )}
        </div>
      </div>
    </div>
  );
}
