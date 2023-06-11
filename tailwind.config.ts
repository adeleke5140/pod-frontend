import { type Config } from "tailwindcss";
import { blackA, violet, mauve } from "@radix-ui/colors";

export default {
  content: ["./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        bespoke: ["var(--font-bespoke)"],
        supreme: ["var(--font-supreme)"],
      },
      colors: {
        ...blackA,
        ...violet,
        ...mauve
      }
    },
  },
  plugins: [],
} satisfies Config;
