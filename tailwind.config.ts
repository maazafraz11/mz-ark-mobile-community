import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: ["class"],
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./lib/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "#070b09",
        foreground: "#f2f8f5",
        card: "#0f1713",
        muted: "#15231d",
        border: "rgba(153, 255, 120, 0.12)",
        accent: "#b7ff52",
        accentDark: "#7abf2d",
        sea: "#52d8c1",
        danger: "#ff6b6b",
        amber: "#f7b955",
      },
      boxShadow: {
        glow: "0 0 0 1px rgba(183,255,82,.22), 0 10px 30px rgba(74,255,162,.12)",
      },
      backgroundImage: {
        grid: "radial-gradient(circle at 1px 1px, rgba(183,255,82,0.12) 1px, transparent 0)",
      },
      borderRadius: {
        xl: "1.25rem",
      },
    },
  },
  plugins: [],
};

export default config;
