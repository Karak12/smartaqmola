import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./lib/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        page: "#EDF1F7",
        card: "#FFFFFF",
        ink: {
          DEFAULT: "#182238",
          soft: "#5B657B",
          faint: "#98A1B5",
        },
        primary: {
          DEFAULT: "#2563EB",
          deep: "#1D4FD8",
          soft: "#EAF1FE",
        },
        line: "#E6EBF3",
        // акцентные цвета иконок
        rose: "#EF5B45",
        orange: "#F5943B",
        green: "#2FAE77",
        purple: "#8B5CF6",
        sky: "#3B82F6",
        teal: "#38A2C9",
      },
      fontFamily: {
        sans: ["var(--font-manrope)", "system-ui", "sans-serif"],
      },
      maxWidth: {
        content: "1320px",
      },
      borderRadius: {
        xl2: "1.25rem",
        "2xl2": "1.5rem",
      },
      boxShadow: {
        card: "0 1px 2px rgba(24,34,56,0.04), 0 10px 30px -14px rgba(24,34,56,0.14)",
        soft: "0 1px 2px rgba(24,34,56,0.05)",
        btn: "0 8px 20px -8px rgba(37,99,235,0.55)",
      },
      keyframes: {
        "fade-up": {
          "0%": { opacity: "0", transform: "translateY(14px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        pulse2: {
          "0%,100%": { opacity: "0.35", transform: "scale(0.85)" },
          "50%": { opacity: "1", transform: "scale(1.1)" },
        },
        float: {
          "0%,100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-6px)" },
        },
        flow: {
          "0%": { backgroundPosition: "0 0" },
          "100%": { backgroundPosition: "22px 0" },
        },
      },
      animation: {
        "fade-up": "fade-up 0.6s cubic-bezier(0.22,1,0.36,1) both",
        pulse2: "pulse2 3s ease-in-out infinite",
        float: "float 5s ease-in-out infinite",
        flow: "flow 0.9s linear infinite",
      },
    },
  },
  plugins: [],
};

export default config;
