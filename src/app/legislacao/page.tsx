"use client";

import { useMemo } from "react";
import data from "../../../data/legislacao.json";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
} from "recharts";

const instrumentos = data.instrumentos;

const CAMADA_COLORS: Record<string, string> = {
  "Marco Legal Federal": "#3b82f6", // blue-500
  "ICT / Órgão Indireto": "#8b5cf6", // violet-500
  "Poder Judiciário (CNJ)": "#f59e0b", // amber-500
  "Governo Digital / InovaGov": "#14b8a6", // teal-500
  "Estado": "#059669", // emerald-600
  "Município": "#f43f5e", // rose-500
};

export default function LegislacaoDashboard() {
  const stats = useMemo(() => {
    const total = instrumentos.length;
    const vigentes = instrumentos.filter(i => i.status.toLowerCase().startsWith("vigente")).length;
    const federal = instrumentos.filter(i => i.camada === "Marco Legal Federal").length;
    const govDigital = instrumentos.filter(i => i.camada === "Governo Digital / InovaGov").length;
    return { total, vigentes, federal, govDigital };
  }, []);

  const timelineData = useMemo(() => {
    const years: Record<string, number> = {};
    instrumentos.forEach(i => {
      if (!i.data) return;
      const match = i.data.match(/\d{4}$/); // Find 4 digits at the end
      if (match) {
        const year = match[0];
        years[year] = (years[year] || 0) + 1;
      }
    });
    
    return Object.keys(years)
      .sort()
      .map(year => ({ name: year, total: years[year] }));
  }, []);

  const camadaData = useMemo(() => {
    const counts: Record<string, number> = {};
    instrumentos.forEach(i => {
      counts[i.camada] = (counts[i.camada] || 0) + 1;
    });
    return Object.keys(counts).map(c => ({
      name: c,
      value: counts[c],
      color: CAMADA_COLORS[c] || "#cbd5e1"
    })).sort((a, b) => b.value - a.value);
  }, []);

  return (
    <div className="animate-in fade-in slide-in-from-bottom-2 duration-500">
      
      {/* KPIs */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
        <div className="bg-slate-50 border border-slate-200 rounded-xl p-4">
          <p className="text-xs text-slate-500 font-medium mb-1 uppercase tracking-wider">Total Mapeado</p>
          <div className="flex items-baseline gap-2">
            <span className="text-3xl font-display font-black text-brand-900">{stats.total}</span>
            <span className="text-xs font-medium text-brand-600 bg-brand-100 px-1.5 py-0.5 rounded">Instrumentos</span>
          </div>
        </div>
        <div className="bg-slate-50 border border-slate-200 rounded-xl p-4">
          <p className="text-xs text-slate-500 font-medium mb-1 uppercase tracking-wider">Vigentes</p>
          <div className="flex items-baseline gap-2">
            <span className="text-3xl font-display font-black text-green-700">{stats.vigentes}</span>
            <span className="text-xs font-medium text-green-700 bg-green-100 px-1.5 py-0.5 rounded">Ativos</span>
          </div>
        </div>
        <div className="bg-slate-50 border border-slate-200 rounded-xl p-4">
          <p className="text-xs text-slate-500 font-medium mb-1 uppercase tracking-wider">Marco Federal</p>
          <div className="flex items-baseline gap-2">
            <span className="text-3xl font-display font-black text-blue-600">{stats.federal}</span>
            <span className="text-xs font-medium text-blue-700 bg-blue-100 px-1.5 py-0.5 rounded">Normas</span>
          </div>
        </div>
        <div className="bg-slate-50 border border-slate-200 rounded-xl p-4">
          <p className="text-xs text-slate-500 font-medium mb-1 uppercase tracking-wider">Gov. Digital</p>
          <div className="flex items-baseline gap-2">
            <span className="text-3xl font-display font-black text-teal-600">{stats.govDigital}</span>
            <span className="text-xs font-medium text-teal-700 bg-teal-100 px-1.5 py-0.5 rounded">Iniciativas</span>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        
        {/* Gráfico 1: Evolução Temporal */}
        <div className="border border-slate-200 rounded-xl p-6 bg-white shadow-sm">
          <h3 className="text-base font-display font-bold text-slate-800 mb-6">Evolução Temporal da Legislação</h3>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={timelineData} margin={{ top: 0, right: 0, left: -20, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" />
                <XAxis 
                  dataKey="name" 
                  axisLine={false} 
                  tickLine={false} 
                  tick={{ fontSize: 12, fill: '#64748b' }} 
                  dy={10}
                />
                <YAxis 
                  axisLine={false} 
                  tickLine={false} 
                  tick={{ fontSize: 12, fill: '#64748b' }}
                />
                <Tooltip
                  cursor={{ fill: '#f1f5f9' }}
                  contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)', fontSize: '12px' }}
                />
                <Bar 
                  dataKey="total" 
                  fill="#F1C232" 
                  radius={[4, 4, 0, 0]} 
                  barSize={24}
                />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Gráfico 2: Distribuição por Camada */}
        <div className="border border-slate-200 rounded-xl p-6 bg-white shadow-sm flex flex-col">
          <h3 className="text-base font-display font-bold text-slate-800 mb-2">Distribuição por Camada Normativa</h3>
          <div className="flex-1 flex items-center justify-center relative min-h-[250px]">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={camadaData}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={100}
                  paddingAngle={2}
                  dataKey="value"
                  stroke="none"
                >
                  {camadaData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip 
                  contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)', fontSize: '12px' }}
                />
              </PieChart>
            </ResponsiveContainer>
            <div className="absolute inset-0 pointer-events-none flex items-center justify-center flex-col">
              <span className="text-3xl font-display font-black text-slate-800">{stats.total}</span>
              <span className="text-[10px] uppercase font-bold text-slate-400 tracking-widest">Total</span>
            </div>
          </div>
          
          {/* Legenda Customizada */}
          <div className="mt-4 grid grid-cols-2 gap-2">
            {camadaData.map(c => (
              <div key={c.name} className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full shrink-0" style={{ backgroundColor: c.color }} />
                <span className="text-[11px] font-medium text-slate-600 truncate" title={c.name}>{c.name}</span>
                <span className="text-[11px] text-slate-400 ml-auto font-mono">{c.value}</span>
              </div>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
}
