"use client";
import { useMemo } from "react";
import type { Citacao } from "@/lib/types";
import { TEMA_COLORS } from "@/lib/data";

interface Props {
  citacoes: Citacao[];
  onTermClick?: (term: string) => void;
  selectedTema?: string | null;
}

const STOP_WORDS = new Set([
  "que", "para", "como", "mais", "este", "esta", "todos", "também", "pode",
  "sobre", "entre", "outros", "ainda", "mesmo", "sempre", "pelo", "pela",
  "depois", "antes", "foi", "são", "tem", "seu", "sua", "ser", "ter",
  "muito", "pouco", "cada", "todo", "toda",
  "isso", "deve", "seja", "seus", "suas", "pelos", "pelas", "esse", "essa",
  "esses", "essas", "quando", "qual", "quais", "sendo", "tendo", "fazer",
  "feito", "feita", "forma", "deste", "desta", "neste", "nesta", "desses",
  "dessas", "mediante", "conforme", "inclusive", "assim", "caso", "apenas",
  "tanto", "novo", "nova", "novos", "novas", "numa", "num",
  "that", "with", "from", "this", "they", "have", "been", "which", "their",
  "will", "would", "could", "should", "than", "more", "also", "into",
]);

export default function WordCloud({ citacoes, onTermClick, selectedTema }: Props) {
  const termFrequency = useMemo(() => {
    const freq: Record<string, { count: number; temaCounts: Record<string, number> }> = {};

    citacoes.forEach((c) => {
      if (selectedTema && c.tema !== selectedTema) return;
      if (!c.citacaoDireta) return;

      const terms = c.citacaoDireta
        .toLowerCase()
        .replace(/[.,;:?!()[\]{}"'\-–—]/g, " ")
        .split(/\s+/)
        .filter((t) => t.length > 3 && !STOP_WORDS.has(t));

      terms.forEach((term) => {
        if (!freq[term]) freq[term] = { count: 0, temaCounts: {} };
        freq[term].count += 1;
        freq[term].temaCounts[c.tema] = (freq[term].temaCounts[c.tema] ?? 0) + 1;
      });
    });

    return Object.entries(freq)
      .map(([term, data]) => {
        const dominantTema = Object.entries(data.temaCounts)
          .sort((a, b) => b[1] - a[1])[0][0];
        return {
          term,
          count: data.count,
          color: TEMA_COLORS[dominantTema] ?? "#14b8a6",
        };
      })
      .sort((a, b) => b.count - a.count)
      .slice(0, 100);
  }, [citacoes, selectedTema]);

  const maxCount = Math.max(...termFrequency.map(t => t.count), 1);

  return (
    <div className="card-glass p-6">
      <h2 className="text-base font-display font-bold text-slate-800 dark:text-slate-100 mb-4">Nuvem de Termos</h2>
      <div className="flex flex-wrap gap-2 justify-center items-center min-h-[200px] p-4">
        {termFrequency.map(({ term, count, color }) => {
          const fontSize = 12 + (count / maxCount) * 28;
          const opacity = 0.5 + (count / maxCount) * 0.5;
          
          return (
            <span
              key={term}
              onClick={() => onTermClick?.(term)}
              className="inline-block cursor-pointer transition-all duration-200 hover:opacity-100 hover:scale-110"
              style={{
                fontSize: `${fontSize}px`,
                color: color,
                opacity: opacity,
              }}
            >
              {term}
            </span>
          );
        })}
      </div>
    </div>
  );
}