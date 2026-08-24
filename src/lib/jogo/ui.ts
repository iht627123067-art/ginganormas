export function textoContraste(hex: string): string {
  const cor = hex.replace("#", "");
  const r = parseInt(cor.substring(0, 2), 16);
  const g = parseInt(cor.substring(2, 4), 16);
  const b = parseInt(cor.substring(4, 6), 16);
  const luminancia = (0.299 * r + 0.587 * g + 0.114 * b) / 255;
  return luminancia > 0.6 ? "#1a1a1a" : "#ffffff";
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
