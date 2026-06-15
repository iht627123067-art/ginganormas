"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion } from "framer-motion";
import clsx from "clsx";

const TABS = [
  { label: "Painel Analítico", href: "/legislacao" },
  { label: "Explorador Normativo", href: "/legislacao/explorador" },
  { label: "Glossário Técnico", href: "/legislacao/glossario" },
];

export default function LegislacaoTabs() {
  const pathname = usePathname();

  return (
    <div className="mb-6 border-b border-slate-200">
      <nav className="flex items-center gap-6 overflow-x-auto no-scrollbar">
        {TABS.map((tab) => {
          const isActive = tab.href === "/legislacao" 
            ? pathname === "/legislacao" 
            : pathname.startsWith(tab.href);

          return (
            <Link
              key={tab.href}
              href={tab.href}
              className={clsx(
                "relative pb-3 text-sm font-medium transition-colors whitespace-nowrap",
                isActive ? "text-brand-700" : "text-slate-500 hover:text-slate-800"
              )}
            >
              {tab.label}
              {isActive && (
                <motion.div
                  layoutId="legislacao-tab-indicator"
                  className="absolute bottom-0 left-0 right-0 h-[3px] bg-[#F1C232] rounded-t-full"
                  initial={false}
                  transition={{ type: "spring", stiffness: 400, damping: 30 }}
                />
              )}
            </Link>
          );
        })}
      </nav>
    </div>
  );
}
