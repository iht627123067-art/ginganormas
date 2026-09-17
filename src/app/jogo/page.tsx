import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, Cast, MessageCircle } from "lucide-react";
import GingaSymbol from "@/components/GingaSymbol";
import DimensaoIcone from "@/components/DimensaoIcone";
import { DIMENSOES } from "@/lib/jogo/tipos";
import { textoContraste } from "@/lib/jogo/ui";

export const metadata: Metadata = {
  title: "Entre na Roda GINGA | GingaNormas",
  description:
    "Jogo de cartas sobre inovação no setor público: crie uma mesa, compartilhe o código e jogue pelo celular.",
};

// Primeira frase de cada dimensão, conforme o manual GINGA (ver skill ginga-identidade)
const TEXTO_DIMENSAO: Record<string, string> = {
  Governança: "O centro irradiador, a origem do movimento.",
  Incentivos: "Sementes que ativam o movimento.",
  Normas: "A base que sustenta o funcionamento, não a barreira.",
  "Gestão de capacidades": "O ato de sustentar, ampliar e habilitar.",
  Ambiência: "O cenário onde tudo acontece.",
};

const EXPLICACOES = [
  {
    titulo: "Como funciona",
    texto:
      "O jogador da vez puxa uma carta, a dimensão é revelada pela cor e a roda conversa a partir da pergunta.",
  },
  {
    titulo: "Entro na roda!",
    texto:
      "30s após a carta ser puxada, você pode reservar sua vez de falar. Quando a votação atual termina, você ganha 2 minutos para contar sua própria experiência — e a roda decide se você gingou.",
  },
  {
    titulo: "Objetivo",
    texto: "Seja a primeira pessoa a fechar as cinco dimensões da Roda GINGA.",
  },
];

export default function JogoLandingPage() {
  return (
    <div className="min-h-screen" style={{ backgroundColor: "#030f0e" }}>
      <div className="max-w-5xl mx-auto px-4 sm:px-6 pt-10 sm:pt-16 pb-6">
        {/* Capa: título e símbolo como um único bloco compacto e coeso —
            símbolo logo ao lado do texto (centralizado na altura das duas
            linhas do título), tamanho coerente com o corpo do texto. No
            celular empilham: símbolo em cima, título com a largura toda
            embaixo */}
        <div className="flex flex-col-reverse sm:flex-row items-center sm:items-center gap-3 sm:gap-6">
          <h1 className="font-display text-3xl sm:text-5xl font-bold text-white leading-[1.05] max-w-xl text-center sm:text-left">
            A roda de conversa sobre{" "}
            <span className="text-gold-500">inovação pública</span>
          </h1>
          <GingaSymbol className="w-20 h-20 sm:w-36 sm:h-36 shrink-0 text-gold-500" />
        </div>

        <p className="mt-6 max-w-md text-base text-white/70 leading-relaxed">
          Uma tela compartilhada projeta a mesa. Cada pessoa joga do próprio
          celular, sem instalar nada: puxa cartas, responde perguntas e
          disputa as cinco dimensões da inovação no setor público.
        </p>
      </div>

      {/* 5 dimensões: cards contidos no mesmo container da página — cada
          dimensão é um quadro próprio com canto arredondado e respiro entre
          eles. Fundo geral escuro (#030f0e) faz o Azul Profundo de Normas
          destacar em vez de sumir. No celular, empilha em 1 coluna (evita a
          5ª carta órfã sozinha num grid 2×3). */}
      <div className="max-w-5xl mx-auto px-4 sm:px-6 mt-10">
        <div className="grid grid-cols-1 sm:grid-cols-5 gap-3 sm:gap-4">
          {DIMENSOES.map((d) => {
            const cor = textoContraste(d.cor);
            return (
              <div
                key={d.nome}
                className="flex flex-col items-center text-center gap-3 px-3 py-6 rounded-2xl"
                style={{ backgroundColor: d.cor, color: cor }}
              >
                {/* text-xl: garante "texto grande" (≥18,66px em negrito) do
                    WCAG, cujo limiar de contraste é 3:1 em vez de 4.5:1 —
                    importante pro Laranja Argila, onde nem branco nem
                    #030f0e passam de folga em texto pequeno */}
                <span className="font-display font-bold text-xl leading-tight">
                  {d.nome}
                </span>
                <DimensaoIcone dimensao={d.nome} className="w-12 h-12" />
                <span className="text-sm leading-snug">
                  {TEXTO_DIMENSAO[d.nome]}
                </span>
              </div>
            );
          })}
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-4 sm:px-6 pt-12 pb-16">
        {/* CTAs no formato real da carta do baralho GINGA: retângulo vertical
            (razão 61,5×88mm ≈ 5:7, igual a `ferramentas/templates/jogoginga.css`),
            conteúdo centralizado naipe → título → texto → rodapé, em cores
            de apoio (Azul Céu, Cinza Escuro) — não as cores das dimensões,
            pra não parecer a carta de uma dimensão específica */}
        <div className="flex flex-col sm:flex-row justify-center items-center gap-5 sm:gap-6">
          <Link
            href="/jogo/entrar"
            className="group w-full max-w-[240px] sm:w-56 aspect-[5/7] rounded-2xl p-5 flex flex-col text-center border-2 hover:-translate-y-1 active:translate-y-0 motion-safe:transition motion-safe:transform-gpu focus:outline-none focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-gold-500"
            style={{ backgroundColor: "#ffffff", borderColor: "#83c1e9", color: "#030f0e" }}
          >
            <div className="flex items-center justify-center gap-1.5 text-xs font-bold uppercase tracking-widest opacity-60">
              <MessageCircle className="w-4 h-4" style={{ color: "#83c1e9" }} aria-hidden="true" />
              Jogador
            </div>
            <h2 className="mt-3 font-display text-2xl font-bold leading-tight">
              Bora gingar!
            </h2>
            {/* "prompt" no estilo da carta física: texto de apoio em destaque,
                caixa levemente tingida + barra lateral na cor do cartão */}
            <p
              className="mt-3 px-3 py-2.5 rounded-lg text-left text-xs font-semibold leading-snug border-l-[3px]"
              style={{ backgroundColor: "rgba(131,193,233,0.14)", borderColor: "#83c1e9" }}
            >
              Já tem o código de uma mesa? Entre e junte-se à roda.
            </p>
            <div className="flex-1" />
            <div
              className="w-full rounded-xl py-2.5 text-sm font-bold flex items-center justify-center gap-1.5 motion-safe:transition group-hover:brightness-95"
              style={{ backgroundColor: "#83c1e9", color: "#030f0e" }}
            >
              Entrar na roda
              <ArrowRight
                className="w-4 h-4 motion-safe:transition-transform motion-safe:group-hover:translate-x-0.5"
                aria-hidden="true"
              />
            </div>
          </Link>
          <Link
            href="/jogo/criar"
            className="group w-full max-w-[240px] sm:w-56 aspect-[5/7] rounded-2xl p-5 flex flex-col text-center border-2 hover:-translate-y-1 active:translate-y-0 motion-safe:transition motion-safe:transform-gpu focus:outline-none focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-gold-500"
            style={{ backgroundColor: "#ffffff", borderColor: "#8f9928", color: "#030f0e" }}
          >
            <div className="flex items-center justify-center gap-1.5 text-xs font-bold uppercase tracking-widest opacity-60">
              <Cast className="w-4 h-4" style={{ color: "#8f9928" }} aria-hidden="true" />
              Facilitador
            </div>
            <h2 className="mt-3 font-display text-2xl font-bold leading-tight">
              Sou facilitador
            </h2>
            <p
              className="mt-3 px-3 py-2.5 rounded-lg text-left text-xs font-semibold leading-snug border-l-[3px]"
              style={{ backgroundColor: "rgba(143,153,40,0.14)", borderColor: "#8f9928" }}
            >
              Crie uma mesa, receba o código e o QR code para projetar.
            </p>
            <div className="flex-1" />
            <div
              className="w-full rounded-xl py-2.5 text-sm font-bold flex items-center justify-center gap-1.5 motion-safe:transition group-hover:brightness-95"
              style={{ backgroundColor: "#8f9928", color: "#030f0e" }}
            >
              Criar mesa
              <ArrowRight
                className="w-4 h-4 motion-safe:transition-transform motion-safe:group-hover:translate-x-0.5"
                aria-hidden="true"
              />
            </div>
          </Link>
        </div>

        {/* Texto de apoio: três colunas editoriais com fio superior e
            numeração — sem ícones genéricos; a hierarquia vem da tipografia */}
        <div className="mt-12 grid grid-cols-1 sm:grid-cols-3 gap-8 sm:gap-10 max-w-4xl mx-auto">
          {EXPLICACOES.map(({ titulo, texto }, i) => (
            <div key={titulo} className="border-t border-white/20 pt-5">
              <span className="font-display text-sm font-bold tracking-[0.25em] text-gold-500">
                {String(i + 1).padStart(2, "0")}
              </span>
              <h3 className="mt-2 font-display text-lg font-semibold text-white">
                {titulo}
              </h3>
              <p className="mt-2 text-sm text-white/70 leading-relaxed">
                {texto}
              </p>
            </div>
          ))}
        </div>

        <p className="mt-10 max-w-xl mx-auto text-center text-sm text-white/70">
          3 a 12 jogadores por mesa · 50 cartas · 1 pessoa por vez entra na
          roda
        </p>

        {/* Rodapé fixo */}
        <footer className="mt-10 flex justify-between text-xs text-white/70">
          <span>GingaNormas</span>
          <span>GINGA</span>
        </footer>
      </div>
    </div>
  );
}
