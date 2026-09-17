import type { Metadata } from "next";
import Link from "next/link";
import { Dices, Footprints, Play, Sparkles, Trophy } from "lucide-react";
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
    icone: Play,
    titulo: "Como funciona",
    texto:
      "O jogador da vez puxa uma carta, a dimensão é revelada pela cor e a roda conversa a partir da pergunta.",
  },
  {
    icone: Sparkles,
    titulo: "Entro na roda!",
    texto:
      "30s após a carta ser puxada, você pode reservar sua vez de falar. Quando a votação atual termina, você ganha 2 minutos para contar sua própria experiência — e a roda decide se você gingou.",
  },
  {
    icone: Trophy,
    titulo: "Objetivo",
    texto: "Seja a primeira pessoa a fechar as cinco dimensões da Roda GINGA.",
  },
];

export default function JogoLandingPage() {
  return (
    <div className="min-h-screen" style={{ backgroundColor: "#0e3e66" }}>
      <div className="max-w-5xl mx-auto px-4 sm:px-6 pt-10 sm:pt-16 pb-6">
        {/* Capa: título grande à esquerda + símbolo grande na faixa média */}
        <div className="flex flex-col sm:flex-row sm:items-center gap-8 sm:gap-10">
          <h1 className="font-display text-4xl sm:text-6xl font-bold text-white leading-[1.05] max-w-xl">
            A roda de conversa sobre{" "}
            <span className="text-gold-500">inovação pública</span>
          </h1>
          <GingaSymbol className="w-28 h-28 sm:w-40 sm:h-40 shrink-0 text-gold-500 sm:ml-auto" />
        </div>

        <p className="mt-6 max-w-md text-base text-white/70 leading-relaxed">
          Uma tela compartilhada projeta a mesa. Cada pessoa joga do próprio
          celular, sem instalar nada: puxa cartas, responde perguntas e
          disputa as cinco dimensões da inovação no setor público.
        </p>
      </div>

      {/* 5 dimensões: página "catálogo" — fundo neutro para os quadros de cor
          chapada respirarem (Normas usa o mesmo Azul Profundo da capa, por
          isso a faixa não pode ser azul aqui). */}
      <div className="mt-10 py-px" style={{ backgroundColor: "#e6e6e6" }}>
        <div className="max-w-5xl mx-auto px-4 sm:px-6 grid grid-cols-2 sm:grid-cols-5 gap-px">
          {DIMENSOES.map((d) => {
            const cor = textoContraste(d.cor);
            return (
              <div
                key={d.nome}
                className="flex flex-col items-center text-center gap-3 px-3 py-6"
                style={{ backgroundColor: d.cor, color: cor }}
              >
                <span className="font-display font-bold text-sm leading-tight">
                  {d.nome}
                </span>
                <DimensaoIcone dimensao={d.nome} className="w-12 h-12" />
                <span className="text-xs leading-snug opacity-90">
                  {TEXTO_DIMENSAO[d.nome]}
                </span>
              </div>
            );
          })}
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-4 sm:px-6 pt-10 pb-16">
        {/* CTAs: quadros de cor chapada, sem raio/sombra/gradiente */}
        <div className="grid sm:grid-cols-2 gap-px">
          <Link
            href="/jogo/entrar"
            className="p-6 hover:brightness-105 transition"
            style={{ backgroundColor: "#ebbe28", color: "#030f0e" }}
          >
            <Footprints className="w-7 h-7 mb-3" />
            <h2 className="font-display text-xl font-bold">Bora gingar!</h2>
            <p className="mt-1 text-sm opacity-80">
              Já tem o código de uma mesa? Entre e junte-se à roda.
            </p>
          </Link>
          <Link
            href="/jogo/criar"
            className="p-6 hover:brightness-110 transition text-white"
            style={{ backgroundColor: "#0a6637" }}
          >
            <Dices className="w-7 h-7 mb-3" />
            <h2 className="font-display text-xl font-bold">Sou facilitador</h2>
            <p className="mt-1 text-sm text-white/80">
              Crie uma mesa, receba o código e o QR code para projetar.
            </p>
          </Link>
        </div>

        {/* Texto de apoio: coluna estreita, sem caixas */}
        <div className="mt-12 max-w-xl space-y-6">
          {EXPLICACOES.map(({ icone: Icone, titulo, texto }) => (
            <div key={titulo} className="flex gap-3">
              <Icone className="w-5 h-5 text-gold-500 shrink-0 mt-0.5" />
              <div>
                <h3 className="font-display font-semibold text-white">
                  {titulo}
                </h3>
                <p className="mt-1 text-sm text-white/60 leading-relaxed">
                  {texto}
                </p>
              </div>
            </div>
          ))}
        </div>

        <p className="mt-10 max-w-xl text-sm text-white/40">
          3 a 12 jogadores por mesa · 50 cartas · 1 pessoa por vez entra na
          roda
        </p>

        {/* Rodapé fixo */}
        <div className="mt-10 flex justify-between text-xs text-white/50">
          <span>GingaNormas</span>
          <span>GINGA</span>
        </div>
      </div>
    </div>
  );
}
