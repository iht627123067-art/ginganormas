"use client";

import React, { useState } from "react";
import { Mail, ArrowRight, AlertCircle, Loader2 } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import GingaSymbol from "@/components/GingaSymbol";

const ALLOWED_EMAIL = "luana.s.faria@gestao.gov.br";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [shake, setShake] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setShake(false);

    const trimmedEmail = email.trim().toLowerCase();

    if (!trimmedEmail) {
      setError("Por favor, insira o seu e-mail.");
      setShake(true);
      return;
    }

    setIsLoading(true);

    // Pequena simulação de delay para uma experiência UX mais fluida
    setTimeout(() => {
      if (trimmedEmail === ALLOWED_EMAIL) {
        // Define o cookie de sessão para 30 dias
        document.cookie = `ginga_session=${trimmedEmail}; path=/; max-age=2592000; SameSite=Lax`;
        
        // Redireciona forçando recarregamento para inicializar o middleware de forma limpa
        window.location.href = "/marco-conceitual";
      } else {
        setIsLoading(false);
        setError("Acesso não autorizado para este e-mail.");
        setShake(true);
      }
    }, 800);
  };

  return (
    <div className="relative min-h-screen w-full flex items-center justify-center overflow-hidden bg-[#080C14] px-4 font-sans text-slate-200">
      {/* ── Background Glow Effects ── */}
      <div className="absolute top-1/4 left-1/4 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] rounded-full bg-brand-500/10 blur-[100px] pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 translate-x-1/2 translate-y-1/2 w-[350px] h-[350px] rounded-full bg-gold-500/5 blur-[90px] pointer-events-none" />

      {/* ── Conteúdo Centralizado ── */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="relative z-10 w-full max-w-[420px]"
      >
        {/* Logotipo da Marca */}
        <div className="flex flex-col items-center mb-8 text-center">
          <motion.div 
            initial={{ scale: 0.8 }}
            animate={{ scale: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="w-16 h-16 text-white mb-4 drop-shadow-[0_0_15px_rgba(255,255,255,0.2)]"
          >
            <GingaSymbol className="w-full h-auto" />
          </motion.div>
          <h1 className="text-3xl font-display font-black text-white tracking-tight leading-none">
            Ginga<span className="text-white/80 font-normal">Normas</span>
          </h1>
          <span className="block text-xs font-display font-bold tracking-[0.25em] uppercase text-gold-500 mt-2">
            Legal Intelligence
          </span>
        </div>

        {/* Card do Formulário (Glassmorphism) */}
        <motion.div
          animate={shake ? { x: [-10, 10, -10, 10, -5, 5, 0] } : {}}
          transition={{ duration: 0.4 }}
          className="bg-white/[0.03] backdrop-blur-md rounded-2xl p-8 shadow-glass-dark border border-white/[0.06] relative"
        >
          <div className="mb-6">
            <h2 className="text-lg font-display font-bold text-white mb-1">
              Acesso à plataforma
            </h2>
            <p className="text-xs text-slate-400">
              Digite o e-mail autorizado para liberar a visualização do painel.
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-5">
            {/* Input do E-mail */}
            <div className="space-y-1.5">
              <label htmlFor="email" className="block text-[11px] font-bold tracking-wider uppercase text-slate-400">
                Endereço de E-mail
              </label>
              <div className="relative">
                <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-500">
                  <Mail size={16} />
                </span>
                <input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="exemplo@gestao.gov.br"
                  disabled={isLoading}
                  className="w-full h-11 pl-10 pr-4 rounded-lg bg-white/[0.04] border border-white/[0.08] text-white text-sm placeholder-slate-500 focus:outline-none focus:border-gold-500 focus:bg-white/[0.06] transition-all duration-150"
                  autoComplete="email"
                  autoFocus
                />
              </div>
            </div>

            {/* Mensagem de Erro com Animação */}
            <AnimatePresence>
              {error && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  exit={{ opacity: 0, height: 0 }}
                  transition={{ duration: 0.2 }}
                  className="overflow-hidden"
                >
                  <div className="flex items-center gap-2 text-red-400 bg-red-950/20 border border-red-900/30 rounded-lg p-3 text-xs leading-relaxed">
                    <AlertCircle size={14} className="shrink-0" />
                    <span>{error}</span>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Botão de Enviar */}
            <motion.button
              type="submit"
              disabled={isLoading}
              whileHover={{ scale: 1.01 }}
              whileTap={{ scale: 0.99 }}
              className="w-full h-11 rounded-lg bg-gold-gradient hover:shadow-gold text-slate-950 font-display font-bold text-sm tracking-wide flex items-center justify-center gap-2 transition-shadow duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isLoading ? (
                <>
                  <Loader2 size={16} className="animate-spin" />
                  <span>Validando acesso...</span>
                </>
              ) : (
                <>
                  <span>Entrar</span>
                  <ArrowRight size={16} className="mt-px" />
                </>
              )}
            </motion.button>
          </form>
        </motion.div>

        {/* Rodapé institucional */}
        <div className="mt-8 text-center text-[10px] tracking-wide text-slate-500">
          <span>GingaNormas © {new Date().getFullYear()}</span>
        </div>
      </motion.div>
    </div>
  );
}
