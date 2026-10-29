/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        canvas: "#090B09",
        surface: {
          DEFAULT: "#0F1210",
          elevated: "#141815",
          high: "#1A1F1B",
        },
        brand: {
          emerald: "#10B981",
          mint: "#34D399",
          cyan: "#06B6D4",
        },
      },
      fontFamily: {
        display: [
          '"Plus Jakarta Sans"',
          "Inter",
          "ui-sans-serif",
          "system-ui",
          "-apple-system",
          "sans-serif",
        ],
        sans: [
          "Inter",
          '"Plus Jakarta Sans"',
          "ui-sans-serif",
          "system-ui",
          "-apple-system",
          "sans-serif",
        ],
        mono: [
          '"JetBrains Mono"',
          "ui-monospace",
          "SFMono-Regular",
          "Menlo",
          "monospace",
        ],
      },
      boxShadow: {
        phone:
          "0 40px 90px -20px rgba(0, 0, 0, 0.85), 0 0 0 1px rgba(255, 255, 255, 0.09), inset 0 1px 0 0 rgba(255, 255, 255, 0.14)",
        card:
          "0 24px 48px -12px rgba(0, 0, 0, 0.65), 0 0 0 1px rgba(255, 255, 255, 0.07)",
        glow: "0 0 80px -16px rgba(16, 185, 129, 0.25)",
      },
    },
  },
  plugins: [],
};
