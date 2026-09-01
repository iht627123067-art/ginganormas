"use client";

import { Suspense, useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, DoorOpen, Loader2, LogIn, Users } from "lucide-react";
import GingaSymbol from "@/components/GingaSymbol";
import { lerSessaoJogador, salvarSessaoJogador } from "@/lib/jogo/cliente";
import type { EstadoMesaValor } from "@/lib/jogo/tipos";

interface MesaAberta {
  codigo: string;
  nome: string;
  estado: EstadoMesaValor;
  jogadores: number;
  criadaEm: string;
}

const ETIQUETA_ESTADO: Record<EstadoMesaValor, string> = {
  lobby: "Aguardando início",
  em_jogo: "Em andamento",
  encerrada: "Encerrada",
};

function EntrarForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [codigo, setCodigo] = useState(searchParams.get("codigo")?.toUpperCase() ?? "");
  const [apelido, setApelido] = useState("");
  const [entrando, setEntrando] = useState(false);
  const [erro, setErro] = useState<string | null>(null);
  const [sessaoAnterior, setSessaoAnterior] = useState<{ nome: string; jogadorId: string } | null>(null);
  const [mesasAbertas, setMesasAbertas] = useState<MesaAberta[] | null>(null);

  useEffect(() => {
    let vivo = true;
    fetch("/api/jogo/mesas", { cache: "no-store" })
      .then((res) => (res.ok ? res.json() : { mesas: [] }))
      .then((data) => {
        if (vivo) setMesasAbertas(data.mesas ?? []);
      })
      .catch(() => {
        if (vivo) setMesasAbertas([]);
      });
    return () => {
      vivo = false;
    };
  }, []);

  useEffect(() => {
    if (codigo.length >= 7) {
      const sessao = lerSessaoJogador(codigo);
      if (sessao) {
        setSessaoAnterior({ nome: sessao.nome, jogadorId: sessao.jogadorId });
      } else {
        setSessaoAnterior(null);
      }
    } else {
      setSessaoAnterior(null);
    }
  }, [codigo]);

  const entrar = async (e: React.FormEvent) => {
    e.preventDefault();
    if (entrando) return;
    setEntrando(true);
    setErro(null);
    try {
      const res = await fetch(
        `/api/jogo/mesas/${encodeURIComponent(codigo)}/entrar`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ nome: apelido.trim() }),
        }
      );
      const data = await res.json();
      if (!res.ok) {
        setErro(data.error ?? "Erro ao entrar na mesa");
        setEntrando(false);
        return;
      }
      salvarSessaoJogador(codigo, {
        jogadorId: data.jogadorId,
        deviceToken: data.deviceToken,
        nome: apelido.trim(),
      });
      router.push(`/jogo/mesa/${codigo}/jogador/${data.jogadorId}`);
    } catch {
      setErro("Falha de conexão. Tente novamente.");
      setEntrando(false);
    }
  };

  const entrarComSessao = () => {
    if (!sessaoAnterior) return;
    router.push(`/jogo/mesa/${codigo}/jogador/${sessaoAnterior.jogadorId}`);
  };

  const selecionarMesaAberta = (codigoMesa: string) => {
    setCodigo(codigoMesa);
    document.getElementById("apelido")?.focus();
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-4 py-10">
      <div className="w-full max-w-md">
        <Link
          href="/jogo"
          className="inline-flex items-center gap-1.5 text-sm text-white/60 hover:text-white mb-6"
        >
          <ArrowLeft className="w-4 h-4" /> Voltar
        </Link>

        <div className="rounded-3xl border border-white/10 bg-dark-card/80 backdrop-blur p-8 shadow-glass-dark">
          <div className="flex items-center gap-3 mb-6">
            <GingaSymbol className="w-8 h-8" />
            <h1 className="font-display text-2xl font-bold text-white">
              Entrar na mesa
            </h1>
          </div>

          {sessaoAnterior && (
            <button
              onClick={entrarComSessao}
              className="mb-6 w-full rounded-xl border border-gold-500/40 bg-gold-500/10 px-4 py-3.5 text-left hover:bg-gold-500/20 transition"
            >
              <span className="block font-semibold text-gold-300">
                Continuar como {sessaoAnterior.nome}
              </span>
              <span className="block text-xs text-white/50 mt-0.5">
                Você já jogou nesta mesa neste aparelho — toque para retomar.
              </span>
            </button>
          )}

          {mesasAbertas && mesasAbertas.length > 0 && (
            <div className="mb-6">
              <p className="flex items-center gap-1.5 text-sm font-medium text-white/70 mb-2">
                <DoorOpen className="w-4 h-4" /> Salas abertas agora
              </p>
              <ul className="space-y-2 max-h-48 overflow-y-auto pr-1">
                {mesasAbertas.map((m) => (
                  <li key={m.codigo}>
                    <button
                      type="button"
                      onClick={() => selecionarMesaAberta(m.codigo)}
                      className={`w-full flex items-center justify-between gap-3 rounded-xl border px-4 py-2.5 text-left transition ${
                        codigo === m.codigo
                          ? "border-gold-500/60 bg-gold-500/10"
                          : "border-white/10 bg-white/5 hover:bg-white/10"
                      }`}
                    >
                      <span className="min-w-0">
                        <span className="block text-sm font-medium text-white truncate">
                          {m.nome}
                        </span>
                        <span className="block text-xs text-white/40 font-mono">
                          {m.codigo} · {ETIQUETA_ESTADO[m.estado]}
                        </span>
                      </span>
                      <span className="shrink-0 flex items-center gap-1 text-xs text-white/50">
                        <Users className="w-3.5 h-3.5" /> {m.jogadores}
                      </span>
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          )}

          <form onSubmit={entrar}>
            <label
              htmlFor="codigo"
              className="block text-sm font-medium text-white/70 mb-2"
            >
              Código da mesa
            </label>
            <input
              id="codigo"
              value={codigo}
              onChange={(e) => setCodigo(e.target.value.toUpperCase())}
              placeholder="GNG-000"
              maxLength={10}
              className="w-full rounded-xl bg-white/5 border border-white/15 px-4 py-3 font-mono text-lg tracking-widest text-white placeholder:text-white/30 focus:outline-none focus:ring-2 focus:ring-gold-500/60"
            />

            <label
              htmlFor="apelido"
              className="mt-5 block text-sm font-medium text-white/70 mb-2"
            >
              Seu apelido
            </label>
            <input
              id="apelido"
              value={apelido}
              onChange={(e) => setApelido(e.target.value)}
              placeholder="Como a roda vai te chamar"
              maxLength={24}
              className="w-full rounded-xl bg-white/5 border border-white/15 px-4 py-3 text-white placeholder:text-white/30 focus:outline-none focus:ring-2 focus:ring-gold-500/60"
            />

            {erro && (
              <p className="mt-3 text-sm text-red-400" role="alert">
                {erro}
              </p>
            )}

            <button
              type="submit"
              disabled={
                entrando ||
                codigo.trim().length < 7 ||
                apelido.trim().length < 2
              }
              className="mt-6 w-full rounded-xl bg-gold-gradient py-3.5 font-display font-bold text-brand-950 shadow-gold hover:brightness-105 transition disabled:opacity-40 disabled:cursor-not-allowed flex items-center justify-center gap-2"
            >
              {entrando ? (
                <Loader2 className="w-5 h-5 animate-spin" />
              ) : (
                <LogIn className="w-5 h-5" />
              )}
              {entrando ? "Entrando..." : "Entrar na roda"}
            </button>
          </form>

          <p className="mt-5 text-xs text-white/40 leading-relaxed">
            O código aparece na tela projetada da mesa (ex.: GNG-482). Sem
            cadastro: seu acesso fica salvo neste aparelho.
          </p>
        </div>
      </div>
    </div>
  );
}

export default function EntrarPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen flex items-center justify-center">
          <Loader2 className="w-8 h-8 text-gold-400 animate-spin" />
        </div>
      }
    >
      <EntrarForm />
    </Suspense>
  );
}
