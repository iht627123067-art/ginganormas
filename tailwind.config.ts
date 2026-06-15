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
        sans: ["Inter", "system-ui", "sans-serif"],
        display: ["Montserrat", "system-ui", "sans-serif"],
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
          950: "#091432",
        },
        // GINGA Ouro Solar — acento (#F1C232 dos cabeçalhos solares)
        gold: {
          50:  "#FFFBEB",
          100: "#FEF3C7",
          200: "#FDE68A",
          300: "#FCD34D",
          400: "#F5D63E",
          500: "#F1C232",   // ouro GINGA
          600: "#D4A51A",
          700: "#B08010",
          800: "#8C5E08",
          900: "#6B4305",
        },
        // GINGA Verde Floresta — acento secundário (#13701F nos materiais)
        forest: {
          50:  "#F0FDF4",
          100: "#DCFCE7",
          500: "#2E8B57",
          600: "#176D40",
          700: "#13701F",
          800: "#0D5515",
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
        "navy-gradient":  "linear-gradient(180deg, #0e3e66 0%, #091432 100%)",
        "gold-gradient":  "linear-gradient(135deg, #F1C232 0%, #D4A51A 100%)",
        "brand-gradient": "linear-gradient(135deg, #30578F 0%, #0e3e66 100%)",
      },
    },
  },
  plugins: [],
};
export default config;
