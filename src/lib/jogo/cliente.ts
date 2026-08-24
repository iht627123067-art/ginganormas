"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import type { EstadoMesa } from "./tipos";

export interface SessaoJogador {
  jogadorId: string;
  deviceToken: string;
  nome: string;
}

const chaveJogador = (codigo: string) => `ginga_jogo:${codigo.toUpperCase()}`;
const chaveHost = (codigo: string) => `ginga_jogo_host:${codigo.toUpperCase()}`;

export function salvarSessaoJogador(codigo: string, sessao: SessaoJogador): void {
  try {
    localStorage.setItem(chaveJogador(codigo), JSON.stringify(sessao));
  } catch {}
}

export function lerSessaoJogador(codigo: string): SessaoJogador | null {
  try {
    const raw = localStorage.getItem(chaveJogador(codigo));
    return raw ? (JSON.parse(raw) as SessaoJogador) : null;
  } catch {
    return null;
  }
}

export function salvarHostToken(codigo: string, token: string): void {
  try {
    localStorage.setItem(chaveHost(codigo), token);
  } catch {}
}

export function lerHostToken(codigo: string): string | null {
  try {
    return localStorage.getItem(chaveHost(codigo));
  } catch {
    return null;
  }
}

const INTERVALO_POLL_MS = 1500;

export function useEstadoMesa(codigo: string | null) {
  const [estado, setEstado] = useState<EstadoMesa | null>(null);
  const [erro, setErro] = useState<string | null>(null);
  const [carregando, setCarregando] = useState(true);
  const vivo = useRef(true);

  useEffect(() => {
    vivo.current = true;
    let timer: ReturnType<typeof setTimeout> | null = null;

    const carregar = async () => {
      if (!codigo) return;
      try {
        const res = await fetch(`/api/jogo/mesas/${encodeURIComponent(codigo)}`, {
          cache: "no-store",
        });
        if (res.status === 404) {
          if (vivo.current) {
            setErro("Mesa não encontrada. Confira o código.");
            setCarregando(false);
          }
          return;
        }
        const data = (await res.json()) as EstadoMesa & { error?: string };
        if (vivo.current) {
          if (data.error) {
            setErro(data.error);
          } else {
            setEstado(data);
            setErro(null);
          }
          setCarregando(false);
        }
      } catch {
        // falha de rede: mantém o último estado e tenta de novo
      } finally {
        if (vivo.current) {
          timer = setTimeout(carregar, INTERVALO_POLL_MS);
        }
      }
    };

    carregar();
    return () => {
      vivo.current = false;
      if (timer) clearTimeout(timer);
    };
  }, [codigo]);

  return { estado, setEstado, erro, carregando };
}

export interface RespostaAcao {
  ok: boolean;
  estado?: EstadoMesa;
  error?: string;
}

export async function acaoMesa(
  codigo: string,
  acao: string,
  corpo: Record<string, unknown>
): Promise<RespostaAcao> {
  try {
    const res = await fetch(
      `/api/jogo/mesas/${encodeURIComponent(codigo)}/${acao}`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(corpo),
      }
    );
    const data = await res.json();
    if (!res.ok) return { ok: false, error: data.error ?? "Erro inesperado" };
    return { ok: true, estado: data };
  } catch {
    return { ok: false, error: "Falha de conexão. Tente novamente." };
  }
}

function segundosAte(alvoIso: string | null | undefined): number {
  if (!alvoIso) return 0;
  return Math.max(0, (new Date(alvoIso).getTime() - Date.now()) / 1000);
}

// Contagem regressiva client-side até um horário ISO vindo do servidor.
// Interpola entre os polls (a cada 250ms) para o timer parecer fluido.
export function useContagemRegressiva(alvoIso: string | null | undefined): number {
  const [restante, setRestante] = useState(() => segundosAte(alvoIso));

  useEffect(() => {
    setRestante(segundosAte(alvoIso));
    if (!alvoIso) return;
    const id = setInterval(() => setRestante(segundosAte(alvoIso)), 250);
    return () => clearInterval(id);
  }, [alvoIso]);

  return restante;
}

export function useAcao(codigo: string) {
  const [processando, setProcessando] = useState(false);
  const [erroAcao, setErroAcao] = useState<string | null>(null);
  const [aviso, setAviso] = useState<string | null>(null);

  const executar = useCallback(
    async (
      acao: string,
      corpo: Record<string, unknown>,
      aoConcluir?: (estado: EstadoMesa) => void
    ): Promise<boolean> => {
      setProcessando(true);
      setErroAcao(null);
      setAviso(null);
      const resposta = await acaoMesa(codigo, acao, corpo);
      setProcessando(false);
      if (!resposta.ok) {
        setErroAcao(resposta.error ?? "Erro inesperado");
        return false;
      }
      if (resposta.estado) aoConcluir?.(resposta.estado);
      return true;
    },
    [codigo]
  );

  return { executar, processando, erroAcao, aviso, setAviso, setErroAcao };
}
