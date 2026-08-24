import { NextRequest, NextResponse } from "next/server";
import { carregarEstadoPorCodigo } from "@/lib/jogo/estado";

export async function GET(
  _req: NextRequest,
  { params }: { params: { codigo: string } }
) {
  try {
    const resultado = await carregarEstadoPorCodigo(params.codigo);
    if (!resultado) {
      return NextResponse.json({ error: "Mesa não encontrada" }, { status: 404 });
    }
    return NextResponse.json(resultado.estado, {
      headers: { "Cache-Control": "no-store" },
    });
  } catch (err) {
    if (err instanceof Error && err.message.includes("DATABASE_URL")) {
      return NextResponse.json({ error: "Banco de dados não configurado (DATABASE_URL)" }, { status: 500 });
    }
    console.error("[jogo/mesas/[codigo]] erro ao carregar estado:", err);
    return NextResponse.json({ error: "Erro ao carregar mesa" }, { status: 500 });
  }
}

export const dynamic = "force-dynamic";
