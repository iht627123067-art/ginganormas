import type { Metadata } from "next";
import "./globals.css";
import ClientLayoutWrapper from "@/components/ClientLayoutWrapper";

export const metadata: Metadata = {
  title: "GingaNormas | Legal Intelligence",
  description: "Plataforma de análise textual para pesquisa jurídica e acadêmica sobre inovação pública",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="pt-BR">
      <body className="font-sans text-slate-800 selection:bg-brand-100 selection:text-brand-900">
        <ClientLayoutWrapper>
          {children}
        </ClientLayoutWrapper>
      </body>
    </html>
  );
}
