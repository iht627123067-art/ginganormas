import MarcoConceitualTabs from "@/components/MarcoConceitualTabs";

export default function MarcoConceitualLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="p-8 max-w-7xl mx-auto min-h-screen">
      <div className="mb-7 flex items-start gap-3">
        <div className="w-[3px] self-stretch rounded-full mt-0.5 shrink-0" style={{ background: "#F1C232" }} />
        <div>
          <h1 className="text-2xl font-display font-black text-brand-900 leading-tight">Marco Conceitual</h1>
          <p className="text-sm text-slate-500 mt-0.5">Explore as principais visualizações analíticas</p>
        </div>
      </div>
      
      <div className="card-glass p-6">
        <MarcoConceitualTabs />
        <div>
          {children}
        </div>
      </div>
    </div>
  );
}
