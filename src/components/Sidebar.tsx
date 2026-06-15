"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  Scale,
  BookMarked,
  Star,
  Newspaper,
  Settings,
} from "lucide-react";
import clsx from "clsx";
import { motion } from "framer-motion";
import GingaSymbol from "@/components/GingaSymbol";

const nav = [
  { href: "/marco-conceitual", icon: LayoutDashboard, label: "Marco Conceitual" },
  { href: "/legislacao",       icon: Scale,           label: "Legislação" },
  { href: "/indice",           icon: BookMarked,      label: "Índice" },
  { href: "/recomendacoes",    icon: Star,            label: "Ginga Recomenda" },
  { href: "/noticias",         icon: Newspaper,       label: "Notícias" },
  { href: "/settings",         icon: Settings,        label: "Ajustes", bottom: true },
];

export default function Sidebar() {
  const path = usePathname();

  return (
    <aside
      className="w-60 shrink-0 flex flex-col overflow-hidden"
      style={{ background: "linear-gradient(175deg, #0e3e66 0%, #060f22 100%)" }}
    >
      {/* ── Logotipo ── */}
      <div className="px-5 pt-7 pb-5">
        <div className="flex items-center gap-2.5">
          {/* Símbolo borboleta GINGA em branco */}
          <div className="w-8 h-8 shrink-0 text-white opacity-95">
            <GingaSymbol className="w-full h-auto" />
          </div>
          <div className="leading-none">
            <span className="block text-[15px] font-display font-bold text-white tracking-tight">
              GingaNormas
            </span>
          </div>
        </div>
      </div>

      {/* ── Divisor ── */}
      <div
        className="mx-5 mb-3 rounded-full"
        style={{ height: "1px", background: "rgba(255,255,255,0.07)" }}
      />

      {/* ── Navegação ── */}
      <nav className="flex-1 px-3 space-y-0.5 flex flex-col">
        {nav.map(({ href, icon: Icon, label, bottom }) => {
          const active = path.startsWith(href);
          return (
            <Link
              key={href}
              href={href}
              className={clsx(
                "relative flex items-center gap-2.5 px-3 py-[9px] rounded-lg text-[13px] font-display font-medium tracking-wide transition-colors duration-150",
                bottom && "mt-auto",
                active
                  ? "text-white"
                  : "text-white/45 hover:text-white/85 hover:bg-white/[0.04]"
              )}
            >
              {/* Fundo animado do item ativo */}
              {active && (
                <motion.div
                  layoutId="nav-bg"
                  className="absolute inset-0 rounded-lg"
                  style={{ background: "rgba(255,255,255,0.09)" }}
                  transition={{ type: "spring", stiffness: 380, damping: 36 }}
                />
              )}

              {/* Barra dourada lateral */}
              {active && (
                <motion.div
                  layoutId="nav-bar"
                  className="absolute left-0 top-[7px] bottom-[7px] w-[3px] rounded-r-full"
                  style={{ background: "#F1C232" }}
                  transition={{ type: "spring", stiffness: 380, damping: 36 }}
                />
              )}

              <Icon
                size={15}
                className="relative z-10 shrink-0 transition-colors"
                style={{ color: active ? "#F1C232" : "inherit" }}
              />
              <span className="relative z-10">{label}</span>
            </Link>
          );
        })}
      </nav>

      {/* ── Painel de status ── */}
      <div className="p-4 mt-1">
        <div
          className="rounded-xl p-3.5"
          style={{
            background: "rgba(255,255,255,0.04)",
            border: "1px solid rgba(255,255,255,0.07)",
          }}
        >
          <div className="flex items-baseline justify-between mb-[7px]">
            <span className="text-[11px] font-display font-semibold text-white/70">
              131 Citações
            </span>
            <span className="text-[10px] text-white/28 font-medium">21 Temas</span>
          </div>

          <div
            className="h-[3px] rounded-full mb-[9px] overflow-hidden"
            style={{ background: "rgba(255,255,255,0.06)" }}
          >
            <div
              className="h-full rounded-full"
              style={{
                width: "75%",
                background: "linear-gradient(90deg, #F1C232 0%, #D4A51A 100%)",
              }}
            />
          </div>

          <span
            className="text-[8px] font-display font-bold tracking-[0.18em] uppercase"
            style={{ color: "rgba(241,194,50,0.50)" }}
          >
            MVP v0.2
          </span>
        </div>
      </div>
    </aside>
  );
}
