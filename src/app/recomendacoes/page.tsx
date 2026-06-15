export default function RecomendacoesPage() {
  return (
    <div className="animate-in fade-in slide-in-from-bottom-2 duration-500 py-16 text-center">
      <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-slate-50 mb-4">
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-slate-400">
          <path d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
        </svg>
      </div>
      <h2 className="text-xl font-display font-bold text-slate-800 mb-2">Ginga Recomenda</h2>
      <p className="text-slate-500 max-w-md mx-auto">
        Em breve, disponibilizaremos recomendações curadas, guias de leitura e materiais de referência em destaque.
      </p>
    </div>
  );
}
