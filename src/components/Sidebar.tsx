"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  Scale,
  BookMarked,
  Star,
  Settings,
} from "lucide-react";
import clsx from "clsx";
import { motion } from "framer-motion";

const nav = [
  { href: "/marco-conceitual", icon: LayoutDashboard, label: "Marco Conceitual" },
  { href: "/legislacao",       icon: Scale,           label: "Legislação" },
  { href: "/indice",           icon: BookMarked,      label: "Índice" },
  { href: "/recomendacoes",    icon: Star,            label: "Ginga Recomenda" },
  { href: "/settings",         icon: Settings,        label: "Ajustes", bottom: true },
];

// Símbolo borboleta GINGA — paths do arquivo oficial simbolo_ginga.svg (#0e3e66)
function GingaSymbol({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 242.86 203.93"
      fill="currentColor"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-hidden
    >
      <path d="M200.23,28.15c19.41,6.39,47.4,24.85,41.94,48.11-5.86,15.93-28.31,14.63-40.57,6.97-14.94-9.43-21.64-28.49-39.97-32.91-13.88-4.48-33.67.28-14.84,16.54,36.59,26.44,53.77,66.44,34.27,109.64-4.34,9.21-10.19,18.52-18.91,23.96-12.83,8.21-30.2,1.1-34.08-13.28-3.63-13.48.44-29.26,2.8-42.61,2.56-14.51,5.85-30.12,2.59-44.78-.83-3.72-3.21-12.87-7.16-14.44-6.04-2.4-7.32,14.05-8.26,17.45-2.64,15.91-7.71,31.17-16.07,43.94-11.21,17.88-26.55,31.34-47.7,39.1-14.82,5.22-36.44,10.46-48.46-2.15-9.11-10.45-5.5-27.27,1.99-37.85,8.76-12.66,23.07-18.84,37.89-22.18,21-3.17,44.41-14.52,52.86-35.91,8.24-19.56-12.57-10.05-22.36-6.38-8.55,3.09-17.56,5.12-26.72,4.67-17.75-.7-38.9-10.53-46.76-24.5C-2.69,52.53.07,40.46,10.13,36.09c10.63-5.38,23.88-2.13,33.85,3.9,11.83,6.84,23.05,21.49,37.53,15.82,4.56-1.78,9.07-4.64,11.29-9.19,1.57-3.22.85-6.11-.13-9.39-3.12-10.45,11.2-12.28,18.25-9.03,13.9,6.4,28.64.77,42.75-2.08,15.62-2.81,31.51-2.57,45.76,1.79l.8.25Z" />
      <path d="M97.79,19.42c3.31-5.22.89-13.17-5.14-17.07-6.03-3.91-14.19-2.82-17.5,2.41-3.31,5.22-.94,13.26,5.09,17.17,6.03,3.91,14.24,2.72,17.55-2.5Z" />
    </svg>
  );
}

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
            <span
              className="block text-[9px] font-display font-bold tracking-[0.18em] uppercase mt-[3px]"
              style={{ color: "#F1C232" }}
            >
              Legal Intelligence
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
