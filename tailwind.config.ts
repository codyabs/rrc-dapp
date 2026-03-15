import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        roach: {
          50: "#f9f7f4",
          100: "#f0ebe4",
          200: "#ddd5c8",
          300: "#c9b8a6",
          400: "#b59b84",
          500: "#9d8672",
          600: "#7d6d5c",
          700: "#5f5449",
          800: "#473f37",
          900: "#2f2923",
        },
      },
    },
  },
  plugins: [],
};

export default config;
