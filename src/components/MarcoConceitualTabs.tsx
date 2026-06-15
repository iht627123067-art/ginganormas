"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion } from "framer-motion";
import clsx from "clsx";

const TABS = [
  { label: "Visão Geral", href: "/marco-conceitual" },
  { label: "Corpus Explorer", href: "/marco-conceitual/corpus" },
  { label: "Leitor", href: "/marco-conceitual/leitor" },
  { label: "Termos", href: "/marco-conceitual/termos" },
  { label: "Glossário", href: "/marco-conceitual/glossario" },
];

export default function MarcoConceitualTabs() {
  const pathname = usePathname();

  return (
    <div className="mb-6 border-b border-slate-200">
      <nav className="flex items-center gap-6 overflow-x-auto no-scrollbar">
        {TABS.map((tab) => {
          // A aba base "/marco-conceitual" deve ser ativa apenas se o pathname for exatamente igual
          const isActive = tab.href === "/marco-conceitual" 
            ? pathname === "/marco-conceitual" 
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
                  layoutId="corpus-tab-indicator"
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
