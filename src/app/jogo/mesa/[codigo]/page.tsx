"use client";

import { useEffect, useMemo, useState } from "react";
import { useParams } from "next/navigation";
import { AnimatePresence, motion } from "framer-motion";
import { QRCodeSVG } from "qrcode.react";
import {
  Ear,
  Loader2,
  Pause,
  Play,
  RotateCcw,
  SkipForward,
  ThumbsDown,
  ThumbsUp,
  Trophy,
  Users,
  Layers,
  Hand,
  Vote,
} from "lucide-react";
import GingaSymbol from "@/components/GingaSymbol";
import DimensaoIcone from "@/components/DimensaoIcone";
import {
  lerHostToken,
  lerSessaoJogador,
  useAcao,
  useContagemRegressiva,
  useEstadoMesa,
} from "@/lib/jogo/cliente";
import { textoContraste, etiquetaResultado } from "@/lib/jogo/ui";
import {
  formatarContagem,
  SEGUNDOS_ESCUTA,
  SEGUNDOS_ESCUTA_RODA,
  SEGUNDOS_VOTACAO,
} from "@/lib/jogo/votacao";
import type { CartaAtiva as CartaAtivaTipo, EstadoMesa } from "@/lib/jogo/tipos";

export default function MesaPage() {
  const params = useParams<{ codigo: string }>();
  const codigo = params.codigo;
  const { estado, erro, carregando } = useEstadoMesa(codigo);
  const { executar, processando, erroAcao, setErroAcao } = useAcao(codigo);
  const [hostToken, setHostToken] = useState<string | null>(null);
  const [hostJogadorId, setHostJogadorId] = useState<string | null>(null);
  const [origem, setOrigem] = useState("");

  useEffect(() => {
    setHostToken(lerHostToken(codigo));
    setHostJogadorId(lerSessaoJogador(codigo)?.jogadorId ?? null);
    setOrigem(window.location.origin);
  }, [codigo]);

  const ehHost = hostToken !== null;
  const linkJogadorHost =
    hostJogadorId && estado?.jogadores.some((j) => j.id === hostJogadorId)
      ? `/jogo/mesa/${codigo}/jogador/${hostJogadorId}`
      : null;

  const linkEntrada = origem
    ? `${origem}/jogo/entrar?codigo=${encodeURIComponent(codigo)}`
    : `/jogo/entrar?codigo=${encodeURIComponent(codigo)}`;

  const acaoFacilitador = (acao: string) => {
    executar("facilitador", { hostToken, acao });
  };

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

      {linkJogadorHost && (
        <a
          href={linkJogadorHost}
          target="_blank"
          rel="noopener noreferrer"
          className="mb-6 inline-flex items-center gap-2 rounded-xl border border-gold-500/40 bg-gold-500/10 px-4 py-2.5 text-sm font-medium text-gold-300 hover:bg-gold-500/20 transition"
        >
          <Hand className="w-4 h-4" />
          Jogar também — abre sua jogada em outra aba
        </a>
      )}

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

      {estado.estado === "em_jogo" && (
        <MesaEmJogo
          estado={estado}
          ehHost={ehHost}
          processando={processando}
          acaoFacilitador={acaoFacilitador}
        />
      )}

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

function MesaEmJogo({
  estado,
  ehHost,
  processando,
  acaoFacilitador,
}: {
  estado: EstadoMesa;
  ehHost: boolean;
  processando: boolean;
  acaoFacilitador: (acao: string) => void;
}) {
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
        <CartaAtiva
          estado={estado}
          ehHost={ehHost}
          processando={processando}
          acaoFacilitador={acaoFacilitador}
        />
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
            className="rounded-2xl p-5 shadow-glass-dark flex items-center gap-4"
            style={{ backgroundColor: d.corHex, color: corTexto }}
          >
            <span
              className="shrink-0 w-11 h-11 rounded-full flex items-center justify-center p-2"
              style={{ backgroundColor: "rgba(255,255,255,0.35)" }}
            >
              <DimensaoIcone dimensao={d.dimensao} className="w-full h-full" />
            </span>
            <div>
              <p className="text-sm font-semibold leading-tight">{d.dimensao}</p>
              <p className="font-display text-3xl font-bold mt-1">
                {d.jogadas}
                <span className="text-lg opacity-70"> / {d.total}</span>
              </p>
            </div>
          </div>
        );
      })}
    </div>
  );
}

function CartaAtiva({
  estado,
  ehHost,
  processando,
  acaoFacilitador,
}: {
  estado: EstadoMesa;
  ehHost: boolean;
  processando: boolean;
  acaoFacilitador: (acao: string) => void;
}) {
  const carta = estado.cartaAtiva;
  const corTexto = carta ? textoContraste(carta.corHex) : "#ffffff";
  const haRoda = estado.jogadores.length > 1;
  const jogadorDaVez = estado.jogadores.find((j) => j.id === estado.turnoJogadorId);
  const rodaSolicitante = carta?.rodaSolicitanteId
    ? estado.jogadores.find((j) => j.id === carta.rodaSolicitanteId)
    : null;

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
              <div className="flex items-center gap-3">
                <span
                  className="shrink-0 w-14 h-14 rounded-full flex items-center justify-center p-2.5"
                  style={{ backgroundColor: "rgba(255,255,255,0.35)" }}
                >
                  <DimensaoIcone dimensao={carta.dimensao} className="w-full h-full" />
                </span>
                <p className="text-sm font-semibold uppercase tracking-widest opacity-80">
                  {carta.dimensao}
                </p>
                {carta.ehEntradaRoda && (
                  <span
                    className="flex items-center gap-1 text-xs font-bold uppercase tracking-wide px-2.5 py-1 rounded-full"
                    style={{ backgroundColor: "rgba(255,255,255,0.35)" }}
                  >
                    <Hand className="w-3.5 h-3.5" /> Entrou na roda
                  </span>
                )}
              </div>
              <p className="text-sm opacity-80">
                {carta.ehEntradaRoda ? "Fala de" : "Puxada por"} <strong>{carta.jogadorNome}</strong>
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

            {rodaSolicitante && (
              <p className="mt-4 text-sm opacity-80 flex items-center gap-1.5">
                <Hand className="w-4 h-4" />
                Em seguida: <strong>{rodaSolicitante.nome}</strong> entra na roda
              </p>
            )}

            {haRoda && (
              <div className="mt-8 border-t border-current/20 pt-6">
                <FaseCartaHost
                  carta={carta}
                  corTexto={corTexto}
                  ehHost={ehHost}
                  processando={processando}
                  acaoFacilitador={acaoFacilitador}
                />
              </div>
            )}
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
            {ehHost && jogadorDaVez && (
              <button
                onClick={() => acaoFacilitador("pular_vez")}
                disabled={processando}
                className="mt-5 inline-flex items-center gap-2 rounded-xl border border-white/15 bg-white/5 px-4 py-2.5 text-sm font-medium text-white/70 hover:bg-white/10 hover:text-white transition disabled:opacity-40"
              >
                <SkipForward className="w-4 h-4" />
                {jogadorDaVez.nome} não quer jogar — pular para o próximo
              </button>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

function FaseCartaHost({
  carta,
  corTexto,
  ehHost,
  processando,
  acaoFacilitador,
}: {
  carta: CartaAtivaTipo;
  corTexto: string;
  ehHost: boolean;
  processando: boolean;
  acaoFacilitador: (acao: string) => void;
}) {
  const escutaRestante = useContagemRegressiva(carta.escutaTerminaEm, carta.pausadoEm);
  const votacaoRestante = useContagemRegressiva(carta.votacaoTerminaEm, carta.pausadoEm);
  const segundosEscutaTotal = carta.ehEntradaRoda ? SEGUNDOS_ESCUTA_RODA : SEGUNDOS_ESCUTA;
  const emEscuta = carta.fase === "escuta";
  const pausado = !!carta.pausadoEm;

  return (
    <div className="flex flex-wrap items-center justify-between gap-4">
      <div className="flex items-center gap-2 font-display text-2xl font-bold">
        {emEscuta ? <Ear className="w-6 h-6" /> : <Vote className="w-6 h-6" />}
        {formatarContagem(emEscuta ? escutaRestante : votacaoRestante)}
        <span className="text-sm font-normal opacity-70">
          {emEscuta
            ? `de ${Math.floor(segundosEscutaTotal / 60)} min de escuta`
            : `de ${SEGUNDOS_VOTACAO}s de votação`}
        </span>
        {pausado && (
          <span
            className="text-xs font-bold uppercase tracking-widest px-2.5 py-1 rounded-full"
            style={{ backgroundColor: "rgba(255,255,255,0.35)" }}
          >
            Pausado
          </span>
        )}
      </div>
      {!emEscuta && (
        <div className="flex items-center gap-4 text-sm font-semibold">
          <span className="flex items-center gap-1.5">
            <ThumbsUp className="w-4 h-4" /> {carta.votos.gingou}
          </span>
          <span className="flex items-center gap-1.5">
            <ThumbsDown className="w-4 h-4" /> {carta.votos.voltou}
          </span>
          <span className="flex items-center gap-1.5 opacity-70">
            <Users className="w-4 h-4" /> {carta.votos.jaVotaram.length}/{carta.votos.totalVotantes}
            {" · precisa de "}
            {carta.votos.necessarios}
          </span>
        </div>
      )}
      <div
        className="h-1.5 w-full rounded-full overflow-hidden"
        style={{ backgroundColor: "rgba(255,255,255,0.25)" }}
      >
        <motion.div
          className="h-full rounded-full"
          style={{ backgroundColor: corTexto }}
          animate={{
            width: `${
              Math.min(
                1,
                Math.max(
                  0,
                  (emEscuta ? escutaRestante / segundosEscutaTotal : votacaoRestante / SEGUNDOS_VOTACAO)
                )
              ) * 100
            }%`,
          }}
          transition={{ ease: "linear", duration: 0.25 }}
        />
      </div>
      {ehHost && (
        <div className="w-full flex flex-wrap items-center gap-2">
          <button
            onClick={() => acaoFacilitador(pausado ? "retomar" : "pausar")}
            disabled={processando}
            className="inline-flex items-center gap-1.5 rounded-lg px-3 py-1.5 text-xs font-semibold uppercase tracking-wide disabled:opacity-40 hover:brightness-110 transition"
            style={{ backgroundColor: "rgba(255,255,255,0.25)", color: corTexto }}
          >
            {pausado ? <Play className="w-3.5 h-3.5" /> : <Pause className="w-3.5 h-3.5" />}
            {pausado ? "Retomar tempo" : "Pausar tempo"}
          </button>
          {emEscuta && !pausado && (
            <button
              onClick={() => acaoFacilitador("encerrar_escuta")}
              disabled={processando}
              className="inline-flex items-center gap-1.5 rounded-lg px-3 py-1.5 text-xs font-semibold uppercase tracking-wide disabled:opacity-40 hover:brightness-110 transition"
              style={{ backgroundColor: "rgba(255,255,255,0.25)", color: corTexto }}
            >
              <SkipForward className="w-3.5 h-3.5" />
              Encerrar fala — abrir votação
            </button>
          )}
        </div>
      )}
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
                  className="shrink-0 w-8 h-8 rounded-full flex items-center justify-center p-1.5"
                  style={{ backgroundColor: c.corHex }}
                >
                  <DimensaoIcone dimensao={c.dimensao} className="w-full h-full" />
                </span>
                <span className="min-w-0">
                  <span className="block text-sm text-white truncate">
                    <strong>{c.carta}</strong>{" "}
                    <span className="text-white/40">· {c.dimensao}</span>
                  </span>
                  <span className="block text-xs text-white/40">
                    {c.jogadorNome} — {etiquetaResultado(c.resultado)}
                  </span>
                </span>
                {(c.ehEntradaRoda || c.resultado === "entrei_na_roda") && (
                  <span title="Entrou na roda" className="ml-auto shrink-0">
                    <Hand className="w-4 h-4 text-gold-400" />
                  </span>
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
