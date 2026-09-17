// Luminância relativa WCAG (sRGB linearizado) — base real do cálculo de
// contraste, ao contrário da média ponderada "de brilho percebido" usada
// antes aqui, que não corresponde à fórmula do WCAG e podia escolher a cor
// errada em tons intermediários (ex.: branco sobre Rosa Modernista dava só
// 3.13:1, abaixo do mínimo 4.5:1 do WCAG AA).
function luminanciaRelativa(hex: string): number {
  const cor = hex.replace("#", "");
  const canal = (v: number) => {
    const c = v / 255;
    return c <= 0.03928 ? c / 12.92 : Math.pow((c + 0.055) / 1.055, 2.4);
  };
  const r = canal(parseInt(cor.substring(0, 2), 16));
  const g = canal(parseInt(cor.substring(2, 4), 16));
  const b = canal(parseInt(cor.substring(4, 6), 16));
  return 0.2126 * r + 0.7152 * g + 0.0722 * b;
}

function razaoContraste(l1: number, l2: number): number {
  const claro = Math.max(l1, l2);
  const escuro = Math.min(l1, l2);
  return (claro + 0.05) / (escuro + 0.05);
}

// Escolhe branco ou Cinza Escuro (#030f0e, cor oficial GINGA) — o que der
// mais contraste WCAG contra o fundo — em vez de decidir por uma
// aproximação de "cor clara/escura".
export function textoContraste(hex: string): string {
  const lFundo = luminanciaRelativa(hex);
  const contrasteBranco = razaoContraste(lFundo, 1);
  const contrasteEscuro = razaoContraste(lFundo, luminanciaRelativa("#030f0e"));
  return contrasteBranco >= contrasteEscuro ? "#ffffff" : "#030f0e";
}

export function etiquetaResultado(resultado: string): string {
  switch (resultado) {
    case "gingou":
      return "Gingou!";
    case "voltou":
      return "Voltou à mesa";
    case "entrei_na_roda":
      return "Entrou na roda!";
    default:
      return resultado;
  }
}
