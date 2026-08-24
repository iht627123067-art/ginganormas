"use client";

import { useEffect, useMemo, useState } from "react";
import { useParams } from "next/navigation";
import { AnimatePresence, motion } from "framer-motion";
import { QRCodeSVG } from "qrcode.react";
import {
  Loader2,
  Play,
  RotateCcw,
  Trophy,
  Users,
  Layers,
  Hand,
} from "lucide-react";
import GingaSymbol from "@/components/GingaSymbol";
import { lerHostToken, useAcao, useEstadoMesa } from "@/lib/jogo/cliente";
import { textoContraste, etiquetaResultado } from "@/lib/jogo/ui";
import type { EstadoMesa } from "@/lib/jogo/tipos";

export default function MesaPage() {
  const params = useParams<{ codigo: string }>();
  const codigo = params.codigo;
  const { estado, erro, carregando } = useEstadoMesa(codigo);
  const { executar, processando, erroAcao, setErroAcao } = useAcao(codigo);
  const [hostToken, setHostToken] = useState<string | null>(null);
  const [origem, setOrigem] = useState("");

  useEffect(() => {
    setHostToken(lerHostToken(codigo));
    setOrigem(window.location.origin);
  }, [codigo]);

  const ehHost = hostToken !== null;

  const linkEntrada = origem
    ? `${origem}/jogo/entrar?codigo=${encodeURIComponent(codigo)}`
    : `/jogo/entrar?codigo=${encodeURIComponent(codigo)}`;

  if (carregando && !estado) {
    return (
      <TelaCentro>
        <Loader2 className="w-10 h-10 text-gold-400 animate-spin" />
      </TelaCentro>
    );
  }

  if (erro && !estado) {
    return (
      <TelaCentro>
        <p className="text-white/80 text-lg">{erro}</p>
        <p className="mt-2 text-white/40 text-sm">Confira o código com o facilitador.</p>
      </TelaCentro>
    );
  }

  if (!estado) return null;

  return (
    <div className="min-h-screen px-4 py-6 sm:px-8 sm:py-8 max-w-7xl mx-auto">
      <header className="flex flex-wrap items-center justify-between gap-4 mb-8">
        <div className="flex items-center gap-3">
          <GingaSymbol className="w-9 h-9" />
          <div>
            <h1 className="font-display text-2xl font-bold text-white leading-tight">
              {estado.nome}
            </h1>
            <p className="text-sm text-white/50">
              Mesa <span className="font-mono text-gold-400">{estado.codigo}</span>
              {" · "}
              <Layers className="inline w-3.5 h-3.5 -mt-0.5" />{" "}
              {estado.cartasRestantes} cartas restantes
            </p>
          </div>
        </div>
        {estado.estado !== "encerrada" && (
          <div className="bg-white/10 rounded-xl p-2.5 flex gap-2.5 items-center">
            <QRCodeSVG value={linkEntrada} size={64} bgColor="#ffffff" fgColor="#0e3e66" />
            <div className="pr-1">
              <p className="text-[11px] uppercase tracking-wider text-white/50">
                Entre na roda
              </p>
              <p className="text-sm text-white/70 leading-snug">
                Aponte a câmera ou digite o código
              </p>
            </div>
          </div>
        )}
      </header>

      {erroAcao && (
        <p className="mb-4 rounded-xl bg-red-500/15 border border-red-500/30 px-4 py-3 text-sm text-red-300">
          {erroAcao}{" "}
          <button onClick={() => setErroAcao(null)} className="underline underline-offset-2">
            fechar
          </button>
        </p>
      )}

      {estado.estado === "lobby" && (
        <Lobby estado={estado} ehHost={ehHost} processando={processando} onIniciar={() =>
          executar("iniciar", { hostToken })
        } />
      )}

      {estado.estado === "em_jogo" && <MesaEmJogo estado={estado} />}

      {estado.estado === "encerrada" && (
        <FimDeJogo
          estado={estado}
          ehHost={ehHost}
          processando={processando}
          onReiniciar={() => executar("reiniciar", { hostToken })}
        />
      )}
    </div>
  );
}

function TelaCentro({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="text-center">{children}</div>
    </div>
  );
}

function Lobby({
  estado,
  ehHost,
  processando,
  onIniciar,
}: {
  estado: EstadoMesa;
  ehHost: boolean;
  processando: boolean;
  onIniciar: () => void;
}) {
  return (
    <div className="grid lg:grid-cols-[1fr_auto] gap-8 items-start">
      <div>
        <div className="rounded-3xl border border-white/10 bg-dark-card/80 backdrop-blur p-8">
          <p className="text-sm uppercase tracking-widest text-white/40 mb-3">
            Código da mesa
          </p>
          <p className="font-mono text-6xl sm:text-8xl font-bold text-gold-400 tracking-widest">
            {estado.codigo}
          </p>
          <p className="mt-4 text-white/60">
            No celular: <span className="text-white">ginganormas.vercel.app/jogo/entrar</span>{" "}
            → digite o código e seu apelido.
          </p>
        </div>

        <div className="mt-6 rounded-3xl border border-white/10 bg-dark-card/80 backdrop-blur p-8">
          <h2 className="flex items-center gap-2 font-display text-xl font-bold text-white mb-5">
            <Users className="w-5 h-5 text-gold-400" />
            Jogadores na roda ({estado.jogadores.length})
          </h2>
          {estado.jogadores.length === 0 ? (
            <p className="text-white/50">
              Aguardando a primeira pessoa entrar pelo código…
            </p>
          ) : (
            <ul className="flex flex-wrap gap-3">
              <AnimatePresence>
                {estado.jogadores.map((j) => (
                  <motion.li
                    key={j.id}
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0 }}
                    className="rounded-full bg-white/10 border border-white/15 px-5 py-2.5 text-white font-medium"
                  >
                    {j.nome}
                  </motion.li>
                ))}
              </AnimatePresence>
            </ul>
          )}
        </div>
      </div>

      <div className="rounded-3xl bg-white p-6 flex flex-col items-center gap-4 lg:sticky lg:top-8">
        <QRCodeSVG
          value={
            typeof window !== "undefined"
              ? `${window.location.origin}/jogo/entrar?codigo=${estado.codigo}`
              : ""
          }
          size={220}
          bgColor="#ffffff"
          fgColor="#0e3e66"
        />
        <p className="text-sm text-brand-900 font-medium text-center">
          Aponte a câmera para entrar
        </p>
      </div>

      {ehHost && (
        <div className="lg:col-span-2">
          <button
            onClick={onIniciar}
            disabled={processando || estado.jogadores.length === 0}
            className="w-full sm:w-auto rounded-xl bg-gold-gradient px-10 py-4 font-display text-lg font-bold text-brand-950 shadow-gold hover:brightness-105 transition disabled:opacity-40 disabled:cursor-not-allowed flex items-center justify-center gap-2"
          >
            {processando ? (
              <Loader2 className="w-5 h-5 animate-spin" />
            ) : (
              <Play className="w-5 h-5" />
            )}
            Iniciar jogo
          </button>
          {estado.jogadores.length === 0 && (
            <p className="mt-2 text-sm text-white/40">
              É preciso ter pelo menos 1 jogador para iniciar.
            </p>
          )}
        </div>
      )}
    </div>
  );
}

function MesaEmJogo({ estado }: { estado: EstadoMesa }) {
  const jogadorDaVez = useMemo(
    () => estado.jogadores.find((j) => j.id === estado.turnoJogadorId) ?? null,
    [estado]
  );

  return (
    <div className="space-y-8">
      <div>
        <p className="text-sm uppercase tracking-widest text-white/40 mb-2">
          Vez de
        </p>
        <AnimatePresence mode="wait">
          <motion.p
            key={jogadorDaVez?.id ?? "aguardando"}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            className="font-display text-4xl sm:text-5xl font-bold text-gold-400"
          >
            {jogadorDaVez ? jogadorDaVez.nome : "…"}
          </motion.p>
        </AnimatePresence>
      </div>

      <PainelDimensoes estado={estado} />

      <div className="grid lg:grid-cols-[1.4fr_1fr] gap-8 items-start">
        <CartaAtiva estado={estado} />
        <div className="space-y-8">
          <Placar estado={estado} />
          <UltimasCartas estado={estado} />
        </div>
      </div>
    </div>
  );
}

function PainelDimensoes({ estado }: { estado: EstadoMesa }) {
  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4">
      {estado.progresso.map((d) => {
        const corTexto = textoContraste(d.corHex);
        return (
          <div
            key={d.dimensao}
            className="rounded-2xl p-5 shadow-glass-dark"
            style={{ backgroundColor: d.corHex, color: corTexto }}
          >
            <p className="text-sm font-semibold leading-tight">{d.dimensao}</p>
            <p className="font-display text-3xl font-bold mt-2">
              {d.jogadas}
              <span className="text-lg opacity-70"> / {d.total}</span>
            </p>
            <p className="text-xs opacity-70 mt-1">cartas jogadas</p>
          </div>
        );
      })}
    </div>
  );
}

function CartaAtiva({ estado }: { estado: EstadoMesa }) {
  const carta = estado.cartaAtiva;
  const corTexto = carta ? textoContraste(carta.corHex) : "#ffffff";

  return (
    <div className="min-h-[420px]">
      <AnimatePresence mode="wait">
        {carta ? (
          <motion.div
            key={carta.sorteioId}
            initial={{ rotateY: 90, opacity: 0 }}
            animate={{ rotateY: 0, opacity: 1 }}
            exit={{ rotateY: -90, opacity: 0 }}
            transition={{ duration: 0.45, ease: "easeOut" }}
            className="rounded-3xl p-8 sm:p-12 shadow-glass-dark flex flex-col"
            style={{ backgroundColor: carta.corHex, color: corTexto }}
          >
            <div className="flex items-center justify-between gap-4 flex-wrap">
              <p className="text-sm font-semibold uppercase tracking-widest opacity-80">
                {carta.dimensao}
              </p>
              <p className="text-sm opacity-80">
                Puxada por <strong>{carta.jogadorNome}</strong>
              </p>
            </div>
            <h3 className="font-display text-5xl sm:text-7xl font-bold mt-6 leading-none">
              {carta.carta}
            </h3>
            <p className="mt-6 text-lg sm:text-xl leading-relaxed opacity-90 max-w-2xl">
              {carta.definicao}
            </p>
            <p className="mt-8 text-base sm:text-lg leading-relaxed font-medium border-t border-current/20 pt-6 max-w-2xl">
              {carta.pergunta}
            </p>
          </motion.div>
        ) : (
          <motion.div
            key="verso"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="min-h-[420px] rounded-3xl border-2 border-dashed border-white/20 bg-dark-card/60 flex flex-col items-center justify-center p-10 text-center"
          >
            <GingaSymbol className="w-16 h-16 opacity-40 mb-4" />
            <p className="text-white/60 text-lg">
              Aguardando a jogada no celular…
            </p>
            <p className="text-white/40 text-sm mt-1">
              O jogador da vez puxa a carta no próprio aparelho.
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

function Placar({ estado }: { estado: EstadoMesa }) {
  return (
    <div className="rounded-3xl border border-white/10 bg-dark-card/80 backdrop-blur p-6">
      <h2 className="font-display text-lg font-bold text-white mb-4">
        Placar — dimensões fechadas
      </h2>
      <ul className="space-y-3">
        <AnimatePresence>
          {estado.jogadores.map((j) => {
            return (
              <motion.li
                key={j.id}
                layout
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className={`flex items-center justify-between gap-3 rounded-xl px-4 py-3 ${
                  j.id === estado.turnoJogadorId
                    ? "bg-gold-500/15 border border-gold-500/40"
                    : "bg-white/5 border border-white/10"
                }`}
              >
                <span className="font-medium text-white truncate">{j.nome}</span>
                <span className="flex items-center gap-2 shrink-0">
                  <span className="flex gap-1">
                    {estado.progresso.map((d) => {
                      const fechou = j.conquistas.includes(d.dimensao);
                      return (
                        <span
                          key={d.dimensao}
                          title={d.dimensao}
                          className="w-4 h-4 rounded-full border"
                          style={{
                            backgroundColor: fechou ? d.corHex : "transparent",
                            borderColor: d.corHex,
                          }}
                        />
                      );
                    })}
                  </span>
                  <span className="text-xs text-white/50">
                    {j.conquistas.length}/5
                  </span>
                  <span className="text-xs text-gold-300 ml-1" title="fichas">
                    🎫 {j.fichas}
                  </span>
                </span>
              </motion.li>
            );
          })}
        </AnimatePresence>
      </ul>
    </div>
  );
}

function UltimasCartas({ estado }: { estado: EstadoMesa }) {
  return (
    <div className="rounded-3xl border border-white/10 bg-dark-card/80 backdrop-blur p-6">
      <h2 className="font-display text-lg font-bold text-white mb-4">
        Últimas cartas jogadas
      </h2>
      {estado.ultimasCartas.length === 0 ? (
        <p className="text-white/40 text-sm">Nenhuma carta jogada ainda.</p>
      ) : (
        <ul className="space-y-2.5">
          <AnimatePresence>
            {estado.ultimasCartas.map((c) => (
              <motion.li
                key={`${c.cartaId}-${c.jogadorNome}`}
                layout
                initial={{ opacity: 0, x: -12 }}
                animate={{ opacity: 1, x: 0 }}
                className="flex items-center gap-3 rounded-xl bg-white/5 px-4 py-2.5"
              >
                <span
                  className="w-3 h-8 rounded-full shrink-0"
                  style={{ backgroundColor: c.corHex }}
                />
                <span className="min-w-0">
                  <span className="block text-sm text-white truncate">
                    <strong>{c.carta}</strong>{" "}
                    <span className="text-white/40">· {c.dimensao}</span>
                  </span>
                  <span className="block text-xs text-white/40">
                    {c.jogadorNome} — {etiquetaResultado(c.resultado)}
                  </span>
                </span>
                {c.resultado === "entrei_na_roda" && (
                  <Hand className="w-4 h-4 text-gold-400 ml-auto shrink-0" />
                )}
              </motion.li>
            ))}
          </AnimatePresence>
        </ul>
      )}
    </div>
  );
}

function FimDeJogo({
  estado,
  ehHost,
  processando,
  onReiniciar,
}: {
  estado: EstadoMesa;
  ehHost: boolean;
  processando: boolean;
  onReiniciar: () => void;
}) {
  const vencedor = estado.jogadores.find(
    (j) => j.id === estado.vencedorJogadorId
  );

  return (
    <div className="space-y-8">
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        className="rounded-3xl bg-gold-gradient p-10 sm:p-14 text-center shadow-gold"
      >
        <Trophy className="w-16 h-16 text-brand-950 mx-auto mb-4" />
        <p className="text-sm uppercase tracking-widest text-brand-950/70 font-semibold">
          Fechou as cinco dimensões
        </p>
        <h2 className="font-display text-5xl sm:text-6xl font-bold text-brand-950 mt-2">
          {vencedor ? vencedor.nome : "Fim de jogo"} gingou!
        </h2>
      </motion.div>

      <div className="rounded-3xl border border-white/10 bg-dark-card/80 backdrop-blur p-6">
        <h3 className="font-display text-lg font-bold text-white mb-4">
          Placar final
        </h3>
        <ul className="space-y-3">
          {[...estado.jogadores]
            .sort((a, b) => b.conquistas.length - a.conquistas.length)
            .map((j, i) => (
              <li
                key={j.id}
                className="flex items-center justify-between gap-3 rounded-xl bg-white/5 border border-white/10 px-4 py-3"
              >
                <span className="font-medium text-white">
                  <span className="text-white/40 mr-2">{i + 1}º</span>
                  {j.nome}
                </span>
                <span className="text-sm text-gold-300">
                  {j.conquistas.length}/5 dimensões
                </span>
              </li>
            ))}
        </ul>
      </div>

      {ehHost && (
        <button
          onClick={onReiniciar}
          disabled={processando}
          className="rounded-xl bg-gold-gradient px-8 py-4 font-display font-bold text-brand-950 shadow-gold hover:brightness-105 transition disabled:opacity-40 flex items-center gap-2"
        >
          {processando ? (
            <Loader2 className="w-5 h-5 animate-spin" />
          ) : (
            <RotateCcw className="w-5 h-5" />
          )}
          Reiniciar baralho (mesma mesa)
        </button>
      )}
    </div>
  );
}
