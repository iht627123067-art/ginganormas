import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: "class",
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ["Host Grotesk", "Inter", "system-ui", "sans-serif"],
        display: ["Host Grotesk", "Inter", "system-ui", "sans-serif"],
        serif: ["Georgia", "serif"],
      },
      colors: {
        // GINGA Azul Profundo — identidade primária (#0e3e66 no logo)
        brand: {
          50:  "#EDF2FA",
          100: "#CFDCEA",
          200: "#A0BDD9",
          300: "#729DC8",
          400: "#4C7DB6",
          500: "#30578F",   // azul primário dos materiais GINGA
          600: "#264880",
          700: "#1C3870",
          800: "#132A60",
          900: "#0e3e66",   // azul profundo — cor do logo
          950: "#020D0F",   // cinza escuro oficial — fundo mais escuro do jogo
        },
        // GINGA Amarelo Tupi — acento dourado (paleta oficial, manual slide 6)
        gold: {
          50:  "#FEFBEA",
          100: "#FBF3C4",
          200: "#F7E792",
          300: "#F3DA5F",
          400: "#EFCE45",
          500: "#EBBE28",   // amarelo tupi — oficial
          600: "#C9A11D",
          700: "#A17F16",
          800: "#7A5F10",
          900: "#4D3B09",
        },
        // GINGA Verde Bandeira — acento verde (paleta oficial, manual slide 6)
        forest: {
          50:  "#E8F6EE",
          100: "#C7E9D6",
          500: "#12854E",
          600: "#0D7541",
          700: "#0A6637",   // verde bandeira — oficial
          800: "#084F2B",
        },
        // alias accent → ouro (compatibilidade com componentes existentes)
        accent: {
          50:  "#FFFBEB",
          100: "#FEF3C7",
          500: "#F1C232",
          600: "#D4A51A",
          700: "#B08010",
        },
        // Neutrals quentes — mais editorial que slate frio
        ink: {
          50:  "#F9F9F7",
          100: "#F2F2EE",
          200: "#E5E4DE",
          300: "#CECDC5",
          400: "#ACACA0",
          500: "#8B8A80",
          600: "#6D6C62",
          700: "#52514A",
          800: "#3A3931",
          900: "#24231E",
        },
        dark: {
          bg:     "#080C14",
          card:   "#0F141E",
          border: "#1A2030",
        },
      },
      boxShadow: {
        "ginga":      "0 2px 16px rgba(14, 62, 102, 0.10)",
        "ginga-md":   "0 6px 32px rgba(14, 62, 102, 0.16)",
        "card-hover": "0 8px 32px -4px rgba(48, 87, 143, 0.18)",
        "gold":       "0 4px 16px rgba(241, 194, 50, 0.30)",
        "glass":      "0 4px 24px rgba(0,0,0,0.06)",
        "glass-dark": "0 4px 24px rgba(0,0,0,0.24)",
      },
      backgroundImage: {
        "navy-gradient":  "linear-gradient(180deg, #0e3e66 0%, #020D0F 100%)",
        "gold-gradient":  "linear-gradient(135deg, #EBBE28 0%, #C9A11D 100%)",
        "brand-gradient": "linear-gradient(135deg, #30578F 0%, #0e3e66 100%)",
      },
    },
  },
  plugins: [],
};
export default config;
