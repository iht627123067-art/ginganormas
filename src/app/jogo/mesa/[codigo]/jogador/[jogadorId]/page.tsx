"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { AnimatePresence, motion } from "framer-motion";
import {
  ArrowLeft,
  CheckCircle2,
  Ear,
  Hand,
  Loader2,
  PartyPopper,
  RotateCcw,
  Sparkles,
  ThumbsDown,
  ThumbsUp,
  Trophy,
  Users,
  Vote,
} from "lucide-react";
import Link from "next/link";
import GingaSymbol from "@/components/GingaSymbol";
import DimensaoIcone from "@/components/DimensaoIcone";
import {
  lerSessaoJogador,
  useAcao,
  useContagemRegressiva,
  useEstadoMesa,
  type SessaoJogador,
} from "@/lib/jogo/cliente";
import { textoContraste } from "@/lib/jogo/ui";
import { formatarContagem, SEGUNDOS_ESCUTA, SEGUNDOS_VOTACAO } from "@/lib/jogo/votacao";
import type { CartaAtiva, EstadoMesa, JogadorEstado } from "@/lib/jogo/tipos";

export default function JogadorPage() {
  const params = useParams<{ codigo: string; jogadorId: string }>();
  const { codigo, jogadorId } = params;
  const router = useRouter();
  const { estado, erro, carregando } = useEstadoMesa(codigo);
  const { executar, processando, erroAcao, setErroAcao } = useAcao(codigo);
  const [sessao, setSessao] = useState<SessaoJogador | null>(null);
  const [verificado, setVerificado] = useState(false);

  const eu = estado?.jogadores.find((j) => j.id === jogadorId);
  const conquistasAnteriorRef = useRef<number | null>(null);
  const [celebracaoGingou, setCelebracaoGingou] = useState(false);

  useEffect(() => {
    const s = lerSessaoJogador(codigo);
    if (!s || s.jogadorId !== jogadorId) {
      router.replace(`/jogo/entrar?codigo=${encodeURIComponent(codigo)}`);
      return;
    }
    setSessao(s);
    setVerificado(true);
  }, [codigo, jogadorId, router]);

  useEffect(() => {
    const atual = eu?.conquistas.length;
    if (atual === undefined) return;
    const anterior = conquistasAnteriorRef.current;
    if (anterior !== null && atual > anterior) {
      setCelebracaoGingou(true);
      const t = setTimeout(() => setCelebracaoGingou(false), 1800);
      conquistasAnteriorRef.current = atual;
      return () => clearTimeout(t);
    }
    conquistasAnteriorRef.current = atual;
  }, [eu?.conquistas.length]);

  const [efeitoRoda, setEfeitoRoda] = useState(false);

  if (!verificado) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 className="w-8 h-8 text-gold-400 animate-spin" />
      </div>
    );
  }

  if (carregando && !estado) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 className="w-8 h-8 text-gold-400 animate-spin" />
      </div>
    );
  }

  if (erro && !estado) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center gap-3 px-6 text-center">
        <p className="text-white/80 text-lg">{erro}</p>
        <Link href="/jogo/entrar" className="text-gold-400 underline underline-offset-4">
          Voltar para entrar em outra mesa
        </Link>
      </div>
    );
  }

  if (!estado || !sessao) return null;

  if (!eu) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center gap-3 px-6 text-center">
        <p className="text-white/80">
          Seu acesso a esta mesa não é mais válido.
        </p>
        <Link
          href={`/jogo/entrar?codigo=${encodeURIComponent(codigo)}`}
          className="text-gold-400 underline underline-offset-4"
        >
          Entrar novamente
        </Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col px-4 py-5 pb-10 max-w-lg mx-auto w-full relative">
      <EfeitoCelebracao ativo={celebracaoGingou} texto="Você gingou! +1 dimensão" />
      <EfeitoCelebracao ativo={efeitoRoda} texto="Você entrou na roda! +1 dimensão" tom="gold" />

      <header className="flex items-center justify-between gap-3 mb-6">
        <Link
          href="/jogo"
          className="text-white/40 hover:text-white/80 transition"
          aria-label="Início"
        >
          <ArrowLeft className="w-5 h-5" />
        </Link>
        <div className="flex items-center gap-2 min-w-0">
          <GingaSymbol className="w-6 h-6 shrink-0" />
          <p className="text-sm text-white/60 truncate">
            {estado.nome} · <span className="font-mono text-gold-400">{estado.codigo}</span>
          </p>
        </div>
        <span className="shrink-0 rounded-full bg-white/10 border border-white/15 px-3 py-1 text-sm text-gold-300 font-semibold">
          🎫 {eu.fichas}
        </span>
      </header>

      <MinhasDimensoes
        conquistas={eu.conquistas}
        progresso={estado.progresso}
      />

      {erroAcao && (
        <button
          onClick={() => setErroAcao(null)}
          className="mt-4 rounded-xl bg-red-500/15 border border-red-500/30 px-4 py-3 text-sm text-red-300 text-left"
        >
          {erroAcao} <span className="underline underline-offset-2">tocar para fechar</span>
        </button>
      )}

      <main className="flex-1 flex flex-col mt-6">
        {estado.estado === "lobby" && <AguardandoInicio nomes={estado.jogadores.map((j) => j.nome)} />}

        {estado.estado === "encerrada" && (
          <FimDeJogoJogador estado={estado} meuId={jogadorId} />
        )}

        {estado.estado === "em_jogo" && (
          <JogoEmAndamento
            estado={estado}
            meuId={jogadorId}
            processando={processando}
            onPuxar={() => executar("puxar", { jogadorId, deviceToken: sessao.deviceToken })}
            onDecidir={(decisao) =>
              executar("decidir", {
                jogadorId,
                deviceToken: sessao.deviceToken,
                decisao,
              })
            }
            onVotar={(voto) =>
              executar("votar", { jogadorId, deviceToken: sessao.deviceToken, voto })
            }
            onPular={() => executar("pular", { jogadorId, deviceToken: sessao.deviceToken })}
            onRoda={async () => {
              const ok = await executar("roda", { jogadorId, deviceToken: sessao.deviceToken });
              if (ok) {
                setEfeitoRoda(true);
                setTimeout(() => setEfeitoRoda(false), 1600);
              }
            }}
          />
        )}
      </main>
    </div>
  );
}

function EfeitoCelebracao({
  ativo,
  texto,
  tom = "forest",
}: {
  ativo: boolean;
  texto: string;
  tom?: "forest" | "gold";
}) {
  return (
    <AnimatePresence>
      {ativo && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 flex items-center justify-center pointer-events-none px-6"
        >
          <motion.div
            initial={{ scale: 0.6, opacity: 0, y: 10 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.8, opacity: 0 }}
            transition={{ type: "spring", stiffness: 260, damping: 18 }}
            className={`flex items-center gap-3 rounded-2xl px-6 py-4 shadow-gold ${
              tom === "gold" ? "bg-gold-gradient text-brand-950" : "bg-forest-700 text-white"
            }`}
          >
            <PartyPopper className="w-7 h-7" />
            <span className="font-display text-lg font-bold">{texto}</span>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

function MinhasDimensoes({
  conquistas,
  progresso,
}: {
  conquistas: string[];
  progresso: { dimensao: string; corHex: string }[];
}) {
  return (
    <div className="flex items-center gap-1.5">
      {progresso.map((d) => {
        const fechou = conquistas.includes(d.dimensao);
        return (
          <span
            key={d.dimensao}
            title={d.dimensao}
            className="relative flex-1 aspect-square rounded-xl flex items-center justify-center transition-all"
            style={{
              backgroundColor: fechou ? d.corHex : "rgba(255,255,255,0.06)",
              boxShadow: fechou ? "0 2px 10px -2px rgba(0,0,0,0.4)" : undefined,
            }}
          >
            <DimensaoIcone
              dimensao={d.dimensao}
              className={`w-1/2 h-1/2 transition-opacity ${fechou ? "opacity-100" : "opacity-25"}`}
            />
            {fechou && (
              <CheckCircle2 className="absolute -top-1.5 -right-1.5 w-4 h-4 text-white bg-forest-700 rounded-full" />
            )}
          </span>
        );
      })}
      <span className="text-xs text-white/50 shrink-0 ml-1">
        {conquistas.length}/5
      </span>
    </div>
  );
}

function AguardandoInicio({ nomes }: { nomes: string[] }) {
  return (
    <div className="flex-1 flex flex-col items-center justify-center text-center gap-4">
      <Loader2 className="w-8 h-8 text-gold-400 animate-spin" />
      <p className="text-white/80 text-lg font-medium">
        Aguardando o facilitador iniciar…
      </p>
      <p className="text-white/50 text-sm">
        {nomes.length} {nomes.length === 1 ? "pessoa na roda" : "pessoas na roda"}
        {nomes.length > 0 && `: ${nomes.join(", ")}`}
      </p>
    </div>
  );
}

function JogoEmAndamento({
  estado,
  meuId,
  processando,
  onPuxar,
  onDecidir,
  onVotar,
  onPular,
  onRoda,
}: {
  estado: EstadoMesa;
  meuId: string;
  processando: boolean;
  onPuxar: () => void;
  onDecidir: (decisao: "gingou" | "voltou") => void;
  onVotar: (voto: "gingou" | "voltou") => void;
  onPular: () => void;
  onRoda: () => void;
}) {
  const carta = estado.cartaAtiva;
  const ehMinhaCarta = carta?.jogadorId === meuId;
  const ehMinhaVez = estado.turnoJogadorId === meuId;
  const jogadorDaVez = estado.jogadores.find((j) => j.id === estado.turnoJogadorId);
  const eu = estado.jogadores.find((j) => j.id === meuId);
  const haRoda = estado.jogadores.length > 1;
  const dimensaoDaCarta = carta
    ? estado.progresso.find((d) => d.dimensao === carta.dimensao)
    : null;
  const possoEntrarNaRoda =
    !!carta &&
    !ehMinhaCarta &&
    carta.fase !== "escuta" &&
    (eu?.fichas ?? 0) > 0 &&
    !eu?.conquistas.includes(carta.dimensao) &&
    (dimensaoDaCarta ? dimensaoDaCarta.jogadas < dimensaoDaCarta.total : true);

  if (carta && ehMinhaCarta) {
    if (!haRoda) {
      return (
        <CartaDecisaoSolo
          key={carta.sorteioId}
          carta={carta}
          processando={processando}
          onDecidir={onDecidir}
        />
      );
    }
    return (
      <CartaMinhaVez
        key={carta.sorteioId}
        carta={carta}
        processando={processando}
        onPular={onPular}
      />
    );
  }

  if (carta && !ehMinhaCarta) {
    return (
      <CartaDaRoda
        key={carta.sorteioId}
        carta={carta}
        meuId={meuId}
        processando={processando}
        possoEntrarNaRoda={possoEntrarNaRoda}
        motivoBloqueio={
          (eu?.fichas ?? 0) === 0
            ? "Você está sem fichas para entrar na roda."
            : eu?.conquistas.includes(carta.dimensao)
              ? "Você já fechou esta dimensão."
              : dimensaoDaCarta && dimensaoDaCarta.jogadas >= dimensaoDaCarta.total
                ? "Sem cartas disponíveis nesta dimensão."
                : null
        }
        onVotar={onVotar}
        onRoda={onRoda}
      />
    );
  }

  if (ehMinhaVez) {
    return (
      <div className="flex-1 flex flex-col items-center justify-center gap-6 text-center">
        <p className="text-white/70">É a sua vez!</p>
        <button
          onClick={onPuxar}
          disabled={processando || estado.cartasRestantes === 0}
          className="w-full max-w-xs rounded-3xl bg-brand-900 border border-gold-500/40 py-14 font-display text-2xl font-bold text-white shadow-glass-dark hover:bg-brand-800 active:scale-[0.98] transition disabled:opacity-40 flex flex-col items-center gap-3"
        >
          {processando ? (
            <Loader2 className="w-10 h-10 animate-spin text-gold-400" />
          ) : (
            <Sparkles className="w-10 h-10 text-gold-400" />
          )}
          Puxar carta
        </button>
        {estado.cartasRestantes === 0 && (
          <p className="text-sm text-white/50">
            O baralho acabou — peça ao facilitador para reiniciar.
          </p>
        )}
      </div>
    );
  }

  return (
    <div className="flex-1 flex flex-col items-center justify-center gap-3 text-center">
      <div className="w-14 h-14 rounded-full bg-white/10 flex items-center justify-center">
        <span className="font-display font-bold text-xl text-gold-400">
          {jogadorDaVez?.nome?.charAt(0).toUpperCase() ?? "?"}
        </span>
      </div>
      <p className="text-white/80 text-lg font-medium">
        Vez de {jogadorDaVez?.nome ?? "…"}
      </p>
      <p className="text-white/40 text-sm">
        A carta aparece aqui quando for puxada.
      </p>
    </div>
  );
}

function CartaVisivel({ carta }: { carta: CartaAtiva }) {
  const corTexto = textoContraste(carta.corHex);
  return (
    <motion.div
      initial={{ rotateY: 90, opacity: 0 }}
      animate={{ rotateY: 0, opacity: 1 }}
      transition={{ duration: 0.4, ease: "easeOut" }}
      className="rounded-3xl p-6 shadow-glass-dark relative overflow-hidden"
      style={{ backgroundColor: carta.corHex, color: corTexto }}
    >
      <div className="flex items-center gap-3">
        <span
          className="shrink-0 w-11 h-11 rounded-full flex items-center justify-center p-2"
          style={{ backgroundColor: "rgba(255,255,255,0.35)" }}
        >
          <DimensaoIcone dimensao={carta.dimensao} className="w-full h-full" />
        </span>
        <p className="text-xs font-semibold uppercase tracking-widest opacity-80">
          {carta.dimensao}
        </p>
      </div>
      <h2 className="font-display text-4xl font-bold mt-4 leading-none">
        {carta.carta}
      </h2>
      <p className="mt-4 text-sm leading-relaxed opacity-90">{carta.definicao}</p>
      <p className="mt-4 text-sm leading-relaxed font-medium border-t border-current/20 pt-4">
        {carta.pergunta}
      </p>
      <p className="mt-4 text-xs opacity-70">
        Puxada por {carta.jogadorNome}
      </p>
    </motion.div>
  );
}

function BarraContagem({
  segundosRestantes,
  segundosTotal,
  corBarra,
}: {
  segundosRestantes: number;
  segundosTotal: number;
  corBarra: string;
}) {
  const proporcao = segundosTotal > 0 ? Math.min(1, Math.max(0, segundosRestantes / segundosTotal)) : 0;
  return (
    <div className="h-1.5 w-full rounded-full bg-white/10 overflow-hidden">
      <motion.div
        className={`h-full rounded-full ${corBarra}`}
        animate={{ width: `${proporcao * 100}%` }}
        transition={{ ease: "linear", duration: 0.25 }}
      />
    </div>
  );
}

function CartaMinhaVez({
  carta,
  processando,
  onPular,
}: {
  carta: CartaAtiva;
  processando: boolean;
  onPular: () => void;
}) {
  const escutaRestante = useContagemRegressiva(carta.escutaTerminaEm);
  const votacaoRestante = useContagemRegressiva(carta.votacaoTerminaEm);
  const emEscuta = carta.fase === "escuta";

  return (
    <div className="flex-1 flex flex-col">
      <CartaVisivel carta={carta} />
      <div className="mt-5 rounded-2xl border border-white/10 bg-dark-card/80 p-5 text-center">
        {emEscuta ? (
          <>
            <div className="flex items-center justify-center gap-2 text-gold-300">
              <Ear className="w-5 h-5" />
              <p className="font-display text-2xl font-bold">
                {formatarContagem(escutaRestante)}
              </p>
            </div>
            <p className="mt-1 text-sm text-white/60">
              A roda está te escutando. Responda com calma!
            </p>
            <BarraContagem
              segundosRestantes={escutaRestante}
              segundosTotal={SEGUNDOS_ESCUTA}
              corBarra="bg-gold-gradient"
            />
            <button
              onClick={onPular}
              disabled={processando}
              className="mt-4 w-full rounded-2xl border border-gold-500/40 bg-gold-500/10 py-3.5 font-semibold text-gold-300 hover:bg-gold-500/20 active:scale-[0.99] transition disabled:opacity-50 flex items-center justify-center gap-2"
            >
              {processando ? <Loader2 className="w-5 h-5 animate-spin" /> : <CheckCircle2 className="w-5 h-5" />}
              Terminei de falar — abrir votação
            </button>
          </>
        ) : (
          <>
            <div className="flex items-center justify-center gap-2 text-white">
              <Vote className="w-5 h-5" />
              <p className="font-display text-2xl font-bold">
                {formatarContagem(votacaoRestante)}
              </p>
            </div>
            <p className="mt-1 text-sm text-white/60">
              A roda está votando se você gingou…
            </p>
            <BarraContagem
              segundosRestantes={votacaoRestante}
              segundosTotal={SEGUNDOS_VOTACAO}
              corBarra="bg-forest-700"
            />
            <PlacarVotos votos={carta.votos} />
          </>
        )}
      </div>
    </div>
  );
}

function PlacarVotos({ votos }: { votos: CartaAtiva["votos"] }) {
  if (votos.totalVotantes === 0) return null;
  return (
    <div className="mt-4 flex items-center justify-center gap-4 text-sm">
      <span className="flex items-center gap-1.5 text-forest-500">
        <ThumbsUp className="w-4 h-4" /> {votos.gingou}
      </span>
      <span className="flex items-center gap-1.5 text-white/40">
        <ThumbsDown className="w-4 h-4" /> {votos.voltou}
      </span>
      <span className="flex items-center gap-1.5 text-white/40">
        <Users className="w-4 h-4" /> {votos.jaVotaram.length}/{votos.totalVotantes}
      </span>
      <span className="text-white/30 text-xs">
        (precisa de {votos.necessarios})
      </span>
    </div>
  );
}

function CartaDaRoda({
  carta,
  meuId,
  processando,
  possoEntrarNaRoda,
  motivoBloqueio,
  onVotar,
  onRoda,
}: {
  carta: CartaAtiva;
  meuId: string;
  processando: boolean;
  possoEntrarNaRoda: boolean;
  motivoBloqueio: string | null;
  onVotar: (voto: "gingou" | "voltou") => void;
  onRoda: () => void;
}) {
  const escutaRestante = useContagemRegressiva(carta.escutaTerminaEm);
  const votacaoRestante = useContagemRegressiva(carta.votacaoTerminaEm);
  const emEscuta = carta.fase === "escuta";
  const jaVotei = carta.votos.jaVotaram.includes(meuId);

  const jaVoteiAnteriorRef = useRef(jaVotei);
  const [mostrarConfirmacao, setMostrarConfirmacao] = useState(false);
  useEffect(() => {
    if (jaVotei && !jaVoteiAnteriorRef.current) {
      setMostrarConfirmacao(true);
      const t = setTimeout(() => setMostrarConfirmacao(false), 1300);
      jaVoteiAnteriorRef.current = jaVotei;
      return () => clearTimeout(t);
    }
    jaVoteiAnteriorRef.current = jaVotei;
  }, [jaVotei]);

  return (
    <div className="flex-1 flex flex-col">
      <CartaVisivel carta={carta} />

      <div className="mt-5">
        {emEscuta ? (
          <div className="rounded-2xl border border-white/10 bg-dark-card/80 p-5 text-center">
            <div className="flex items-center justify-center gap-2 text-gold-300">
              <Ear className="w-5 h-5" />
              <p className="font-display text-2xl font-bold">
                {formatarContagem(escutaRestante)}
              </p>
            </div>
            <p className="mt-1 text-sm text-white/60">
              Escutando <strong>{carta.jogadorNome}</strong>… a votação abre em seguida.
            </p>
            <BarraContagem
              segundosRestantes={escutaRestante}
              segundosTotal={SEGUNDOS_ESCUTA}
              corBarra="bg-gold-gradient"
            />
          </div>
        ) : (
          <div className="rounded-2xl border border-white/10 bg-dark-card/80 p-5">
            <div className="flex items-center justify-center gap-2 text-white">
              <Vote className="w-5 h-5" />
              <p className="font-display text-xl font-bold">
                {formatarContagem(votacaoRestante)}
              </p>
            </div>
            <BarraContagem
              segundosRestantes={votacaoRestante}
              segundosTotal={SEGUNDOS_VOTACAO}
              corBarra="bg-forest-700"
            />
            <PlacarVotos votos={carta.votos} />

            <AnimatePresence mode="wait">
              {jaVotei ? (
                <motion.div
                  key="votou"
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="mt-4 flex items-center justify-center gap-2 rounded-xl bg-forest-700/20 border border-forest-700/40 py-3 text-forest-500 font-medium"
                >
                  <motion.span
                    animate={
                      mostrarConfirmacao
                        ? { scale: [1, 1.4, 1], rotate: [0, 8, -8, 0] }
                        : { scale: 1, rotate: 0 }
                    }
                    transition={{ duration: 0.5 }}
                  >
                    <CheckCircle2 className="w-5 h-5" />
                  </motion.span>
                  Voto registrado — aguardando a roda
                </motion.div>
              ) : (
                <motion.div
                  key="votar"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="mt-4 grid grid-cols-2 gap-3"
                >
                  <button
                    onClick={() => onVotar("gingou")}
                    disabled={processando}
                    className="rounded-2xl bg-forest-700 py-3.5 font-display font-bold text-white shadow-glass-dark hover:brightness-110 active:scale-[0.98] transition disabled:opacity-50 flex items-center justify-center gap-2"
                  >
                    <ThumbsUp className="w-5 h-5" />
                    Gingou!
                  </button>
                  <button
                    onClick={() => onVotar("voltou")}
                    disabled={processando}
                    className="rounded-2xl border border-white/25 bg-white/5 py-3.5 font-medium text-white/80 hover:bg-white/10 active:scale-[0.98] transition disabled:opacity-50 flex items-center justify-center gap-2"
                  >
                    <ThumbsDown className="w-5 h-5" />
                    Ainda não
                  </button>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        )}

        <div className="mt-4">
          {possoEntrarNaRoda ? (
            <button
              onClick={onRoda}
              disabled={processando}
              className="w-full rounded-2xl bg-gold-gradient py-5 font-display text-xl font-bold text-brand-950 shadow-gold hover:brightness-105 transition disabled:opacity-50 flex items-center justify-center gap-2"
            >
              {processando ? (
                <Loader2 className="w-6 h-6 animate-spin" />
              ) : (
                <Hand className="w-6 h-6" />
              )}
              Entro na roda! (gasta 1 ficha)
            </button>
          ) : emEscuta ? (
            <p className="text-center text-sm text-white/40 flex items-center justify-center gap-1.5">
              <Hand className="w-4 h-4" />
              Entrar na roda libera assim que a escuta terminar
            </p>
          ) : (
            motivoBloqueio && (
              <p className="text-center text-sm text-white/40">{motivoBloqueio}</p>
            )
          )}
        </div>
      </div>
    </div>
  );
}

function CartaDecisaoSolo({
  carta,
  processando,
  onDecidir,
}: {
  carta: CartaAtiva;
  processando: boolean;
  onDecidir: (decisao: "gingou" | "voltou") => void;
}) {
  return (
    <div className="flex-1 flex flex-col">
      <CartaVisivel carta={carta} />
      <div className="mt-5 grid gap-3">
        <button
          onClick={() => onDecidir("gingou")}
          disabled={processando}
          className="rounded-2xl bg-forest-700 py-4 font-display text-lg font-bold text-white shadow-glass-dark hover:brightness-110 active:scale-[0.99] transition disabled:opacity-50 flex items-center justify-center gap-2"
        >
          {processando ? (
            <Loader2 className="w-5 h-5 animate-spin" />
          ) : (
            <CheckCircle2 className="w-5 h-5" />
          )}
          Gingou! — conquistar dimensão
        </button>
        <button
          onClick={() => onDecidir("voltou")}
          disabled={processando}
          className="rounded-2xl border border-white/25 bg-white/5 py-4 font-medium text-white/80 hover:bg-white/10 active:scale-[0.99] transition disabled:opacity-50 flex items-center justify-center gap-2"
        >
          <ThumbsDown className="w-5 h-5" />
          Voltar à mesa — descartar
        </button>
      </div>
      <p className="mt-3 text-center text-xs text-white/40">
        Modo solo: sem outros jogadores na mesa, a decisão é sua.
      </p>
    </div>
  );
}

function FimDeJogoJogador({
  estado,
  meuId,
}: {
  estado: EstadoMesa;
  meuId: string;
}) {
  const venci = estado.vencedorJogadorId === meuId;
  const vencedor = estado.jogadores.find((j) => j.id === estado.vencedorJogadorId);
  const meuResultado = useMemo(
    () => estado.jogadores.find((j) => j.id === meuId),
    [estado, meuId]
  );

  return (
    <div className="flex-1 flex flex-col items-center justify-center gap-5 text-center">
      <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        className={`rounded-3xl p-8 ${venci ? "bg-gold-gradient" : "bg-white/5 border border-white/15"}`}
      >
        <Trophy
          className={`w-12 h-12 mx-auto mb-3 ${venci ? "text-brand-950" : "text-gold-400"}`}
        />
        <h2
          className={`font-display text-2xl font-bold ${venci ? "text-brand-950" : "text-white"}`}
        >
          {venci ? "Você gingou! 🎉" : `${vencedor?.nome ?? "Alguém"} fechou a roda!`}
        </h2>
        <p className={`mt-2 text-sm ${venci ? "text-brand-950/70" : "text-white/50"}`}>
          Você fechou {meuResultado?.conquistas.length ?? 0}/5 dimensões.
        </p>
      </motion.div>

      <div className="w-full rounded-2xl border border-white/10 bg-dark-card/80 p-5">
        <ul className="space-y-2 text-left">
          {[...estado.jogadores]
            .sort((a, b) => b.conquistas.length - a.conquistas.length)
            .map((j: JogadorEstado, i) => (
              <li
                key={j.id}
                className={`flex items-center justify-between rounded-xl px-3 py-2 text-sm ${
                  j.id === meuId
                    ? "bg-gold-500/15 border border-gold-500/40 text-white"
                    : "bg-white/5 text-white/70"
                }`}
              >
                <span>
                  <span className="text-white/40 mr-2">{i + 1}º</span>
                  {j.nome}
                </span>
                <span className="text-gold-300">{j.conquistas.length}/5</span>
              </li>
            ))}
        </ul>
      </div>

      <p className="flex items-center gap-2 text-sm text-white/40">
        <RotateCcw className="w-4 h-4" />
        Aguardando o facilitador reiniciar o baralho…
      </p>
    </div>
  );
}
