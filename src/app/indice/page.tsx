export default function IndicePage() {
  return (
    <div className="animate-in fade-in slide-in-from-bottom-2 duration-500 py-16 text-center">
      <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-slate-50 mb-4">
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-slate-400">
          <line x1="8" y1="6" x2="21" y2="6"></line>
          <line x1="8" y1="12" x2="21" y2="12"></line>
          <line x1="8" y1="18" x2="21" y2="18"></line>
          <line x1="3" y1="6" x2="3.01" y2="6"></line>
          <line x1="3" y1="12" x2="3.01" y2="12"></line>
          <line x1="3" y1="18" x2="3.01" y2="18"></line>
        </svg>
      </div>
      <h2 className="text-xl font-display font-bold text-slate-800 mb-2">Índice Geral</h2>
      <p className="text-slate-500 max-w-md mx-auto">
        O índice temático e estruturado de todo o conteúdo estará disponível aqui em atualizações futuras.
      </p>
    </div>
  );
}
