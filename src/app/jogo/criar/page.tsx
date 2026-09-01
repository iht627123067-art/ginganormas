"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { ArrowLeft, Loader2 } from "lucide-react";
import Link from "next/link";
import GingaSymbol from "@/components/GingaSymbol";
import { salvarHostToken, salvarSessaoJogador } from "@/lib/jogo/cliente";

export default function CriarMesaPage() {
  const router = useRouter();
  const [nome, setNome] = useState("");
  const [apelido, setApelido] = useState("");
  const [apenasFacilitar, setApenasFacilitar] = useState(false);
  const [criando, setCriando] = useState(false);
  const [erro, setErro] = useState<string | null>(null);

  const vouJogar = !apenasFacilitar;

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

      if (vouJogar && apelido.trim().length >= 2) {
        try {
          const resJogador = await fetch(
            `/api/jogo/mesas/${encodeURIComponent(data.codigo)}/entrar`,
            {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({ nome: apelido.trim() }),
            }
          );
          const dataJogador = await resJogador.json();
          if (resJogador.ok) {
            salvarSessaoJogador(data.codigo, {
              jogadorId: dataJogador.jogadorId,
              deviceToken: dataJogador.deviceToken,
              nome: apelido.trim(),
            });
          }
        } catch {
          // a mesa já foi criada; se a entrada como jogador falhar, o
          // facilitador ainda pode entrar manualmente depois pelo código
        }
      }

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

            <label className="mt-5 flex items-start gap-3 cursor-pointer select-none">
              <input
                type="checkbox"
                checked={apenasFacilitar}
                onChange={(e) => setApenasFacilitar(e.target.checked)}
                className="mt-0.5 w-4 h-4 rounded border-white/30 bg-white/5 accent-gold-500"
              />
              <span className="text-sm text-white/70">
                Só vou facilitar, não vou jogar
                <span className="block text-xs text-white/40 mt-0.5">
                  Por padrão, você também entra na roda como jogador. Marque
                  aqui se quiser só conduzir a mesa.
                </span>
              </span>
            </label>

            {vouJogar && (
              <>
                <label
                  htmlFor="apelido-host"
                  className="mt-5 block text-sm font-medium text-white/70 mb-2"
                >
                  Seu apelido (para jogar)
                </label>
                <input
                  id="apelido-host"
                  value={apelido}
                  onChange={(e) => setApelido(e.target.value)}
                  placeholder="Como a roda vai te chamar"
                  maxLength={24}
                  className="w-full rounded-xl bg-white/5 border border-white/15 px-4 py-3 text-white placeholder:text-white/30 focus:outline-none focus:ring-2 focus:ring-gold-500/60"
                />
              </>
            )}

            {erro && (
              <p className="mt-3 text-sm text-red-400" role="alert">
                {erro}
              </p>
            )}

            <button
              type="submit"
              disabled={
                criando ||
                nome.trim().length < 2 ||
                (vouJogar && apelido.trim().length < 2)
              }
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
            {vouJogar &&
              " Como você também vai jogar, use o botão \"Jogar também\" na tela da mesa para abrir sua jogada em outra aba/aparelho."}
          </p>
        </div>
      </div>
    </div>
  );
}
