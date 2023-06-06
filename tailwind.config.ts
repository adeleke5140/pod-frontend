import { type Config } from "tailwindcss";

export default {
  content: ["./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily:{
        bespoke: ['var(--font-bespoke)'],
        supreme: ['var(--font-supreme)'],
      }
    },
  },
  plugins: [],
} satisfies Config;
