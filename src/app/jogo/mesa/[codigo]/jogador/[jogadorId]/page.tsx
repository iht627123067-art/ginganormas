"use client";

import { useEffect, useMemo, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { motion } from "framer-motion";
import {
  ArrowLeft,
  CheckCircle2,
  Hand,
  Loader2,
  RotateCcw,
  Sparkles,
  Trophy,
  Undo2,
} from "lucide-react";
import Link from "next/link";
import GingaSymbol from "@/components/GingaSymbol";
import {
  lerSessaoJogador,
  useAcao,
  useEstadoMesa,
  type SessaoJogador,
} from "@/lib/jogo/cliente";
import { textoContraste } from "@/lib/jogo/ui";

export default function JogadorPage() {
  const params = useParams<{ codigo: string; jogadorId: string }>();
  const { codigo, jogadorId } = params;
  const router = useRouter();
  const { estado, erro, carregando } = useEstadoMesa(codigo);
  const { executar, processando, erroAcao, setErroAcao } = useAcao(codigo);
  const [sessao, setSessao] = useState<SessaoJogador | null>(null);
  const [verificado, setVerificado] = useState(false);

  useEffect(() => {
    const s = lerSessaoJogador(codigo);
    if (!s || s.jogadorId !== jogadorId) {
      router.replace(`/jogo/entrar?codigo=${encodeURIComponent(codigo)}`);
      return;
    }
    setSessao(s);
    setVerificado(true);
  }, [codigo, jogadorId, router]);

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

  const eu = estado.jogadores.find((j) => j.id === jogadorId);
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
    <div className="min-h-screen flex flex-col px-4 py-5 pb-10 max-w-lg mx-auto w-full">
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
            onRoda={() => executar("roda", { jogadorId, deviceToken: sessao.deviceToken })}
          />
        )}
      </main>
    </div>
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
    <div className="flex items-center gap-2">
      {progresso.map((d) => {
        const fechou = conquistas.includes(d.dimensao);
        return (
          <span
            key={d.dimensao}
            title={d.dimensao}
            className="h-2.5 flex-1 rounded-full transition-colors"
            style={{ backgroundColor: fechou ? d.corHex : "rgba(255,255,255,0.12)" }}
          />
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
  onRoda,
}: {
  estado: NonNullable<ReturnType<typeof useEstadoMesa>["estado"]>;
  meuId: string;
  processando: boolean;
  onPuxar: () => void;
  onDecidir: (decisao: "gingou" | "voltou") => void;
  onRoda: () => void;
}) {
  const carta = estado.cartaAtiva;
  const ehMinhaCarta = carta?.jogadorId === meuId;
  const ehMinhaVez = estado.turnoJogadorId === meuId;
  const jogadorDaVez = estado.jogadores.find((j) => j.id === estado.turnoJogadorId);
  const eu = estado.jogadores.find((j) => j.id === meuId);
  const dimensaoDaCarta = carta
    ? estado.progresso.find((d) => d.dimensao === carta.dimensao)
    : null;
  const possoEntrarNaRoda =
    !!carta &&
    !ehMinhaCarta &&
    (eu?.fichas ?? 0) > 0 &&
    !eu?.conquistas.includes(carta.dimensao) &&
    (dimensaoDaCarta ? dimensaoDaCarta.jogadas < dimensaoDaCarta.total : true);

  if (carta && ehMinhaCarta) {
    return (
      <CartaDecisao
        carta={carta}
        processando={processando}
        onDecidir={onDecidir}
      />
    );
  }

  if (carta && !ehMinhaCarta) {
    return (
      <div className="flex-1 flex flex-col">
        <CartaVisivel carta={carta} />
        <div className="mt-5">
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
          ) : (
            <p className="text-center text-sm text-white/40">
              {(eu?.fichas ?? 0) === 0
                ? "Você está sem fichas para entrar na roda."
                : eu?.conquistas.includes(carta.dimensao)
                  ? "Você já fechou esta dimensão."
                  : "Sem cartas disponíveis nesta dimensão."}
            </p>
          )}
          <p className="mt-3 text-center text-sm text-white/50">
            Aguardando a decisão de <strong>{carta.jogadorNome}</strong>…
          </p>
        </div>
      </div>
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

interface Carta {
  carta: string;
  dimensao: string;
  corHex: string;
  definicao: string;
  pergunta: string;
  jogadorNome: string;
}

function CartaVisivel({ carta }: { carta: Carta }) {
  const corTexto = textoContraste(carta.corHex);
  return (
    <motion.div
      initial={{ rotateY: 90, opacity: 0 }}
      animate={{ rotateY: 0, opacity: 1 }}
      transition={{ duration: 0.4, ease: "easeOut" }}
      className="rounded-3xl p-6 shadow-glass-dark"
      style={{ backgroundColor: carta.corHex, color: corTexto }}
    >
      <p className="text-xs font-semibold uppercase tracking-widest opacity-80">
        {carta.dimensao}
      </p>
      <h2 className="font-display text-4xl font-bold mt-3 leading-none">
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

function CartaDecisao({
  carta,
  processando,
  onDecidir,
}: {
  carta: Carta;
  processando: boolean;
  onDecidir: (decisao: "gingou" | "voltou") => void;
}) {
  const corTexto = textoContraste(carta.corHex);
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
          <Undo2 className="w-5 h-5" />
          Voltar à mesa — descartar
        </button>
      </div>
      <p className="mt-3 text-center text-xs text-white/40">
        Se a roda conversar bem sobre a pergunta, a dimensão é sua.
      </p>
    </div>
  );
}

function FimDeJogoJogador({
  estado,
  meuId,
}: {
  estado: NonNullable<ReturnType<typeof useEstadoMesa>["estado"]>;
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
            .map((j, i) => (
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
