const ICONES: Record<string, string> = {
  Normas: "/jogo/dimensoes/normas.svg",
  Governança: "/jogo/dimensoes/governanca.svg",
  Incentivos: "/jogo/dimensoes/incentivos.svg",
  "Gestão de capacidades": "/jogo/dimensoes/gestao_de_capacidades.svg",
  Ambiência: "/jogo/dimensoes/ambiencia.svg",
};

interface DimensaoIconeProps {
  dimensao: string;
  className?: string;
}

export default function DimensaoIcone({ dimensao, className }: DimensaoIconeProps) {
  const src = ICONES[dimensao];
  if (!src) return null;
  // eslint-disable-next-line @next/next/no-img-element
  return <img src={src} alt="" className={className} draggable={false} />;
}
