import type { NextRequest } from "next/server";

// Rate limit best-effort em memória (por instância serverless).
// Rotas públicas do jogo não ficam atrás do login, então limitamos
// requisições por IP para dificultar abuso.
const JANELA_MS = 60_000;
const LIMITE = 60;

const acessos = new Map<string, number[]>();

export function rateLimit(req: NextRequest, chave: string): boolean {
  const ip =
    req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ??
    req.headers.get("x-real-ip") ??
    "desconhecido";
  const key = `${chave}:${ip}`;
  const agora = Date.now();
  const timestamps = (acessos.get(key) ?? []).filter((t) => agora - t < JANELA_MS);
  if (timestamps.length >= LIMITE) {
    acessos.set(key, timestamps);
    return false;
  }
  timestamps.push(agora);
  acessos.set(key, timestamps);
  if (acessos.size > 5000) {
    for (const [k, v] of acessos) {
      if (v.every((t) => agora - t >= JANELA_MS)) acessos.delete(k);
    }
  }
  return true;
}
