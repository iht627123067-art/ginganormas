"use client";

import React from "react";
import { usePathname } from "next/navigation";
import Sidebar from "@/components/Sidebar";

interface ClientLayoutWrapperProps {
  children: React.ReactNode;
}

export default function ClientLayoutWrapper({ children }: ClientLayoutWrapperProps) {
  const pathname = usePathname();

  // Rotas públicas do jogo (/jogo/**) renderizam em tela cheia, sem Sidebar:
  // jogadores entram pelo código da mesa, sem login na plataforma
  if (pathname === "/login" || pathname.startsWith("/jogo")) {
    return (
      <div className="w-screen h-screen overflow-y-auto bg-navy-gradient">
        {children}
      </div>
    );
  }

  // Layout padrão do dashboard (com Sidebar, container flexível e fundo acinzentado)
  return (
    <div className="flex h-screen w-screen overflow-hidden" style={{ background: "#ECEAE6" }}>
      <Sidebar />
      <main className="flex-1 overflow-y-auto relative">
        {children}
      </main>
    </div>
  );
}
