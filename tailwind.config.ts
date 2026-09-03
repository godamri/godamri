import type { Config } from "tailwindcss";
import typography from "@tailwindcss/typography";

export default {
  content: ["./app/**/*.{js,jsx,ts,tsx}", "./content/**/*.md"],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        canvas: "#FAF9F5",
        surface: "#F8FAFC",
        "surface-card": "#FFFFFF",
        ink: "#0F172A",
        "ink-muted": "#475569",
        "ink-light": "#64748B",
        hairline: "#E2E8F0",
        "hairline-subtle": "#F1F5F9",
        cobalt: "#2563EB",
        "cobalt-hover": "#1D4ED8",
      },
      fontFamily: {
        sans: ["Inter", "-apple-system", "BlinkMacSystemFont", "Segoe UI", "sans-serif"],
        mono: ['"JetBrains Mono"', "ui-monospace", "SFMono-Regular", "monospace"],
      },
      letterSpacing: {
        tighter: "-0.04em",
        tightest: "-0.06em",
        widest: "0.15em",
      },
      maxWidth: {
        content: "1150px",
        wide: "1200px",
      },
    },
  },
  plugins: [typography],
} satisfies Config;
