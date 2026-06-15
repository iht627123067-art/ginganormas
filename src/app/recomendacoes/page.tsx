"use client";

import React from "react";
import { Star, ExternalLink, FileText, Globe } from "lucide-react";

export default function RecomendacoesPage() {
  const materiais = [
    {
      title: "Sandbox Regulatório - IA",
      desc: "Versão em português do guia sobre sandbox regulatório aplicado à inteligência artificial.",
    },
    {
      title: "Regulatory Sandbox - AI",
      desc: "Versão em inglês do mesmo guia sobre sandbox regulatório para IA.",
    },
    {
      title: "Guia Referencial de Sandbox Regulatório",
      desc: "Versão em português do guia de referência institucional.",
    },
    {
      title: "Regulatory Sandbox Reference Guide",
      desc: "Versão em inglês do guia de referência sobre sandbox regulatório.",
    },
    {
      title: "Guía de Referencia del Sandbox Regulatorio",
      desc: "Versão em espanhol do guia de referência sobre sandbox regulatório.",
    },
    {
      title: "Descomplica L.I.A. LABORI",
      desc: "Material explicativo sobre a Lei de Inteligência Artificial e o Labori.",
    },
    {
      title: "Descomplica L.I.A Transformação Digital",
      desc: "Material sobre inteligência artificial e transformação digital na advocacia pública.",
    },
    {
      title: "Manual do Contrato Público Solução Inovadora",
      desc: "Manual do contrato público para contratação de soluções inovadoras.",
    },
  ];

  return (
    <div className="p-8 max-w-7xl mx-auto min-h-screen animate-in fade-in slide-in-from-bottom-2 duration-500">
      {/* ── Cabeçalho da Seção ── */}
      <div className="mb-8 flex items-start gap-3">
        <div className="w-[3px] self-stretch rounded-full mt-0.5 shrink-0" style={{ background: "#F1C232" }} />
        <div>
          <h1 className="text-2xl font-display font-black text-brand-900 leading-tight">Ginga Recomenda</h1>
          <p className="text-sm text-slate-500 mt-0.5">Iniciativas, guias e materiais de referência recomendados para inovação pública</p>
        </div>
      </div>

      {/* ── Grid Principal ── */}
      <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
        
        {/* ── Card do Projeto LABORI ── */}
        <div className="xl:col-span-1 bg-white border border-slate-200 rounded-2xl p-6 shadow-sm flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-5">
              <span className="text-[10px] font-display font-bold tracking-[0.15em] uppercase px-3 py-1 rounded-full bg-gold-100 text-gold-800">
                Destaque
              </span>
              <Globe size={16} className="text-slate-400" />
            </div>

            <h2 className="text-2xl font-display font-black text-brand-900 mb-1 leading-snug">
              LABORI - AGU
            </h2>
            <p className="text-xs text-brand-600 font-bold uppercase tracking-wider mb-5">
              Laboratório de Inovação da AGU
            </p>

            <p className="text-xs text-slate-600 leading-relaxed mb-6 text-justify">
              O Laboratório de Inovação da Advocacia-Geral da União (Labori) é um espaço colaborativo e multidisciplinar que visa fomentar soluções inovadoras em produtos, serviços e processos para o aprimoramento da segurança jurídica, da gestão e das políticas públicas, em benefício da sociedade. Na prática, o Laboratório busca construir pontes entre ideias, tecnologias e conhecimentos. A iniciativa tem importância não só para a AGU, mas também para toda a Administração Pública e para o ecossistema de inovação brasileira. No âmbito do Laboratório, a partir de eixos prioritários, são desenvolvidos projetos e ações junto ao público interno e externo. Parcerias estratégicas com órgãos públicos e entidades privadas são firmadas com o objetivo de promover o compartilhamento de recursos humanos especializados e de infraestrutura para o desenvolvimento de projetos de pesquisa, desenvolvimento científico e tecnológico e inovação.
            </p>
          </div>

          <a
            href="https://www.gov.br/agu/pt-br/assuntos-1/labori"
            target="_blank"
            rel="noopener noreferrer"
            className="w-full py-3 px-4 rounded-xl bg-brand-900 hover:bg-brand-800 text-white font-display font-bold text-xs tracking-wider uppercase flex items-center justify-center gap-2 shadow-sm transition-colors duration-150"
          >
            <span>Visitar site do LABORI</span>
            <ExternalLink size={14} className="opacity-80" />
          </a>
        </div>

        {/* ── Listagem de Materiais ── */}
        <div className="xl:col-span-2 bg-white border border-slate-200 rounded-2xl p-6 shadow-sm flex flex-col">
          <div className="mb-5 flex items-center gap-2">
            <Star size={18} className="text-gold-500 fill-gold-500" />
            <h3 className="text-lg font-display font-bold text-slate-800">
              Materiais para Consulta
            </h3>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {materiais.map((item, index) => (
              <div
                key={index}
                className="group p-4 rounded-xl border border-slate-100 bg-slate-50 hover:bg-white hover:border-gold-300 hover:shadow-card-hover transition-all duration-150 flex items-start gap-3.5"
              >
                <div className="w-8 h-8 rounded-lg bg-brand-50 text-brand-500 flex items-center justify-center shrink-0 group-hover:bg-gold-50 group-hover:text-gold-600 transition-colors duration-150">
                  <FileText size={16} />
                </div>
                <div className="space-y-0.5">
                  <h4 className="text-sm font-display font-bold text-slate-800 leading-snug group-hover:text-brand-900 transition-colors duration-150">
                    {item.title}
                  </h4>
                  <p className="text-xs text-slate-500 leading-normal">
                    {item.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
}
