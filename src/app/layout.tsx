import type { Metadata } from "next";
import "./globals.css";
import Sidebar from "@/components/Sidebar";

export const metadata: Metadata = {
  title: "GingaNormas | Legal Intelligence",
  description: "Plataforma de análise textual para pesquisa jurídica e acadêmica sobre inovação pública",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="pt-BR">
      <body
        className="flex h-screen overflow-hidden font-sans text-slate-800 selection:bg-brand-100 selection:text-brand-900"
        style={{ background: "#ECEAE6" }}
      >
        <Sidebar />
        <main className="flex-1 overflow-y-auto relative">
          {children}
        </main>
      </body>
    </html>
  );
}
