import type { Config } from "tailwindcss";
import defaultTheme from "tailwindcss/defaultTheme";

const config: Config = {
  darkMode: "class",
  content: ["./src/**/*.{js,ts,jsx,tsx,mdx}"],
  theme: {
    extend: {
      fontFamily: {
        sans: ["var(--font-main)", ...defaultTheme.fontFamily.sans],
        mono: ["var(--font-mono)", ...defaultTheme.fontFamily.mono],
      },
      colors: {
        bg: "var(--bg)",
        surface: "var(--surface)",
        card: "var(--card)",
        line: "var(--line)",
        ink: "var(--ink)",
        muted: "var(--muted)",
        accent: {
          DEFAULT: "var(--accent)",
          soft: "var(--accent-soft)",
        },
        accent2: {
          DEFAULT: "var(--accent-2)",
          soft: "var(--accent-2-soft)",
        },
      },
      boxShadow: {
        glow: "0 0 45px -12px var(--accent-glow)",
        "glow-accent2": "0 0 45px -12px var(--accent-2-glow)",
        card: "0 20px 60px -30px rgb(0 0 0 / 0.45)",
      },
      animation: {
        "spin-slow": "spin 18s linear infinite",
        "spin-slower": "spin 55s linear infinite",
        "spin-reverse": "spin-reverse 55s linear infinite",
        float: "float 7s ease-in-out infinite",
        "float-delayed": "float 8.5s ease-in-out 1.4s infinite",
        "float-slow": "float 10s ease-in-out 0.6s infinite",
        marquee: "marquee var(--marquee-duration, 48s) linear infinite",
        "marquee-reverse":
          "marquee-reverse var(--marquee-duration, 48s) linear infinite",
        shimmer: "shimmer 2.8s linear infinite",
        "pulse-dot": "pulse-dot 2s ease-in-out infinite",
      },
      keyframes: {
        "spin-reverse": {
          from: { transform: "rotate(360deg)" },
          to: { transform: "rotate(0deg)" },
        },
        float: {
          "0%, 100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-14px)" },
        },
        marquee: {
          to: { transform: "translateX(-50%)" },
        },
        "marquee-reverse": {
          from: { transform: "translateX(-50%)" },
          to: { transform: "translateX(0)" },
        },
        shimmer: {
          from: { backgroundPosition: "200% 0" },
          to: { backgroundPosition: "-200% 0" },
        },
        "pulse-dot": {
          "0%, 100%": { boxShadow: "0 0 0 0 var(--accent-glow)" },
          "50%": { boxShadow: "0 0 0 6px transparent" },
        },
      },
      backgroundImage: {
        "brand-gradient":
          "linear-gradient(120deg, var(--accent) 0%, #fb923c 48%, var(--accent-2) 100%)",
      },
    },
  },
  plugins: [],
};
export default config;
