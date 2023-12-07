import typographyPlugin from "@tailwindcss/typography";
import { type Config } from "tailwindcss";

import typographyStyles from "./typography";

export default {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  darkMode: "class",
  plugins: [typographyPlugin],
  theme: {
    extend: {
      colors: {
        teal: {
          "50": "#eef7ff",
          "100": "#d9ecff",
          "200": "#bbdfff",
          "300": "#8bcdff",
          "400": "#55afff",
          "500": "#2e8dff",
          "600": "#166cf9",
          "700": "#1056e5",
          "800": "#1446b9",
          "900": "#163e92",
          "950": "#132858",
        },
      },
    },
    fontSize: {
      xs: ["0.8125rem", { lineHeight: "1.5rem" }],
      sm: ["0.875rem", { lineHeight: "1.5rem" }],
      base: ["1rem", { lineHeight: "1.75rem" }],
      lg: ["1.125rem", { lineHeight: "1.75rem" }],
      xl: ["1.25rem", { lineHeight: "2rem" }],
      "2xl": ["1.5rem", { lineHeight: "2rem" }],
      "3xl": ["1.875rem", { lineHeight: "2.25rem" }],
      "4xl": ["2rem", { lineHeight: "2.5rem" }],
      "5xl": ["3rem", { lineHeight: "3.5rem" }],
      "6xl": ["3.75rem", { lineHeight: "1" }],
      "7xl": ["4.5rem", { lineHeight: "1" }],
      "8xl": ["6rem", { lineHeight: "1" }],
      "9xl": ["8rem", { lineHeight: "1" }],
    },
    typography: typographyStyles,
  },
} satisfies Config;
