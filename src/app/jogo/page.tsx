import type { Metadata } from "next";
import Link from "next/link";
import { Dices, LogIn, Play, Users, Sparkles, Trophy } from "lucide-react";
import GingaSymbol from "@/components/GingaSymbol";
import DimensaoIcone from "@/components/DimensaoIcone";
import { DIMENSOES } from "@/lib/jogo/tipos";

export const metadata: Metadata = {
  title: "Entre na Roda GINGA | GingaNormas",
  description:
    "Jogo de cartas sobre inovação no setor público: crie uma mesa, compartilhe o código e jogue pelo celular.",
};

export default function JogoLandingPage() {
  return (
    <div className="min-h-screen flex flex-col items-center px-4 py-10 sm:py-16">
      <div className="flex items-center gap-3 mb-4">
        <GingaSymbol className="w-10 h-10" />
        <span className="font-display text-lg font-semibold text-white/90">
          Entre na Roda GINGA
        </span>
      </div>

      <div className="max-w-3xl w-full text-center">
        <h1 className="font-display text-4xl sm:text-5xl font-bold text-white leading-tight">
          A roda de conversa sobre{" "}
          <span className="text-gold-400">inovação pública</span> em formato de
          jogo
        </h1>
        <p className="mt-5 text-lg text-white/70 leading-relaxed">
          Uma tela compartilhada projeta a mesa. Cada pessoa joga do próprio
          celular, sem instalar nada: puxa cartas, responde perguntas e disputa
          as cinco dimensões da inovação no setor público.
        </p>

        <div className="mt-8 flex flex-wrap justify-center gap-4 sm:gap-6">
          {DIMENSOES.map((d) => (
            <div key={d.nome} className="flex flex-col items-center gap-2">
              <DimensaoIcone dimensao={d.nome} className="w-10 h-10 sm:w-12 sm:h-12" />
              <span
                className="px-3 py-1.5 rounded-full text-sm font-medium text-white"
                style={{ backgroundColor: d.cor }}
              >
                {d.nome}
              </span>
            </div>
          ))}
        </div>

        <div className="mt-10 grid sm:grid-cols-2 gap-4 text-left">
          <Link
            href="/jogo/entrar"
            className="group rounded-2xl bg-gold-gradient p-6 shadow-gold hover:brightness-105 transition"
          >
            <LogIn className="w-7 h-7 text-brand-950 mb-3" />
            <h2 className="font-display text-xl font-bold text-brand-950">
              Tenho um código
            </h2>
            <p className="mt-1 text-brand-950/80 text-sm">
              Entre na mesa de um facilitador com o código ou QR code.
            </p>
          </Link>
          <Link
            href="/jogo/criar"
            className="group rounded-2xl border border-white/20 bg-white/5 backdrop-blur p-6 hover:bg-white/10 transition"
          >
            <Dices className="w-7 h-7 text-gold-400 mb-3" />
            <h2 className="font-display text-xl font-bold text-white">
              Sou facilitador
            </h2>
            <p className="mt-1 text-white/70 text-sm">
              Crie uma mesa, receba o código e o QR code para projetar.
            </p>
          </Link>
        </div>

        <div className="mt-12 grid sm:grid-cols-3 gap-4 text-left">
          {[
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
              texto:
                "Seja a primeira pessoa a fechar as cinco dimensões da Roda GINGA.",
            },
          ].map(({ icone: Icone, titulo, texto }) => (
            <div
              key={titulo}
              className="rounded-2xl border border-white/10 bg-dark-card/60 p-5"
            >
              <Icone className="w-5 h-5 text-gold-400 mb-2" />
              <h3 className="font-semibold text-white">{titulo}</h3>
              <p className="mt-1 text-sm text-white/60 leading-relaxed">{texto}</p>
            </div>
          ))}
        </div>

        <p className="mt-10 text-sm text-white/40 flex items-center justify-center gap-2">
          <Users className="w-4 h-4" /> 3 a 12 jogadores por mesa · 50 cartas ·
          1 pessoa por vez entra na roda
        </p>
      </div>
    </div>
  );
}
