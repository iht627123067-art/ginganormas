import type { Metadata } from "next";
import Link from "next/link";
import RegistroDecisao from "@/components/guia/RegistroDecisao";

export const metadata: Metadata = {
  title: "Registro de decisão | Guia de Normativos GINGA",
  description: "Monte a motivação de uma decisão inovadora na estrutura pedida pela LINDB e pelo Decreto nº 9.830/2019.",
};

export default function RegistroPage() {
  return (
    <main className="mx-auto max-w-6xl px-4 sm:px-8">
      <section className="border-b-2 border-[#1b1a17] pb-10 pt-12 print:hidden">
        <Link href="/guia/quero/decidir-com-seguranca" className="font-sans text-[12px] text-black/55 hover:text-[#0e3e66]">
          ← Decidir com mais segurança jurídica
        </Link>
        <h1 className="mt-4 max-w-4xl font-lei text-[clamp(2rem,5.5vw,4rem)] font-semibold leading-[1.02] tracking-tight">
          Registro de decisão
        </h1>
        <p className="mt-6 max-w-3xl text-[18px] leading-relaxed">
          A boa motivação é a principal proteção de quem decide de boa-fé. Responda às oito perguntas que a LINDB e o
          Decreto nº 9.830/2019 pedem e leve o texto para o processo, para a nota técnica ou para a conversa com a
          consultoria jurídica.
        </p>
      </section>
      <section className="pt-10">
        <RegistroDecisao />
      </section>
    </main>
  );
}
