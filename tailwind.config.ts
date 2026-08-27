// tailwind.config.ts
import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        industrial: {
          bg: "#0B0D10",       // Глубокий антрацит
          surface: "#14171D",  // Графитовые карточки
          border: "#232833",   // Тонкие технологичные границы
          accent: "#FF4D00",   // Фирменный индустриальный оранжевый
          accentHover: "#E04400",
          cyan: "#00E5FF",     // Неоновый акцент
          lightBg: "#F7F8FA",  // Светлый фоновый матовый
          lightCard: "#FFFFFF",
          muted: "#8A94A6",
          darkText: "#0F141C",
        },
      },
      boxShadow: {
        industrial: "0 10px 30px -10px rgba(255, 77, 0, 0.25)",
        glass: "0 8px 32px 0 rgba(0, 0, 0, 0.37)",
      },
      animation: {
        'pulse-subtle': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'ping-slow': 'ping 2.5s cubic-bezier(0, 0, 0.2, 1) infinite',
      }
    },
  },
  plugins: [],
};
export default config;