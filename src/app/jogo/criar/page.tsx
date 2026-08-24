"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { ArrowLeft, Loader2 } from "lucide-react";
import Link from "next/link";
import GingaSymbol from "@/components/GingaSymbol";
import { salvarHostToken } from "@/lib/jogo/cliente";

export default function CriarMesaPage() {
  const router = useRouter();
  const [nome, setNome] = useState("");
  const [criando, setCriando] = useState(false);
  const [erro, setErro] = useState<string | null>(null);

  const criar = async (e: React.FormEvent) => {
    e.preventDefault();
    if (criando) return;
    setCriando(true);
    setErro(null);
    try {
      const res = await fetch("/api/jogo/mesas", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ nome: nome.trim() }),
      });
      const data = await res.json();
      if (!res.ok) {
        setErro(data.error ?? "Erro ao criar mesa");
        setCriando(false);
        return;
      }
      salvarHostToken(data.codigo, data.hostToken);
      router.push(`/jogo/mesa/${data.codigo}`);
    } catch {
      setErro("Falha de conexão. Tente novamente.");
      setCriando(false);
    }
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
              Criar uma mesa
            </h1>
          </div>

          <form onSubmit={criar}>
            <label
              htmlFor="nome-mesa"
              className="block text-sm font-medium text-white/70 mb-2"
            >
              Nome da mesa (aparece na tela projetada)
            </label>
            <input
              id="nome-mesa"
              value={nome}
              onChange={(e) => setNome(e.target.value)}
              placeholder="Ex.: Roda da DGPE — agosto"
              maxLength={60}
              className="w-full rounded-xl bg-white/5 border border-white/15 px-4 py-3 text-white placeholder:text-white/30 focus:outline-none focus:ring-2 focus:ring-gold-500/60"
              autoFocus
            />

            {erro && (
              <p className="mt-3 text-sm text-red-400" role="alert">
                {erro}
              </p>
            )}

            <button
              type="submit"
              disabled={criando || nome.trim().length < 2}
              className="mt-6 w-full rounded-xl bg-gold-gradient py-3.5 font-display font-bold text-brand-950 shadow-gold hover:brightness-105 transition disabled:opacity-40 disabled:cursor-not-allowed flex items-center justify-center gap-2"
            >
              {criando && <Loader2 className="w-5 h-5 animate-spin" />}
              {criando ? "Criando mesa..." : "Criar mesa e abrir tela de projeção"}
            </button>
          </form>

          <p className="mt-5 text-xs text-white/40 leading-relaxed">
            Ao criar a mesa você se torna o host: sua tela vira a mesa
            projetada, com código e QR code para os jogadores entrarem. Mantenha
            esta aba aberta no projetor/TV durante o jogo.
          </p>
        </div>
      </div>
    </div>
  );
}
