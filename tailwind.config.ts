// /** @type {import('tailwindcss').Config} */
import type { Config } from "tailwindcss";
const { fontFamily } = require("tailwindcss/defaultTheme");

const config: Config = {
  corePlugins: {
    preflight: false,
  },
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        green: "#00ff00",
        gray: "#E8E8E8",
        red: "#ff0000",
        white: "#ffffff",
      },
      screens: {
        "-2xl": { max: "1535px" },
        // => @media (max-width: 1600px) { ... }
        "-xl": { max: "1279px" },
        // => @media (max-width: 1400px) { ... }
        "-lg": { max: "1023px" },
        // => @media (max-width: 1023px) { ... }
        "-md": { max: "767px" },
        // => @media (max-width: 767px) { ... }
        "-sm": { max: "639px" },
        // => @media (max-width: 639px) { ... }
        "-xs": { max: "370px" },
        // => @media (max-width: 420px) { ... }
        "-xxs": { max: "329px" },
        // => @media (max-width: 330px) { ... }
      },
      fontFamily: {
        inter: "var(--font-inter)",
      },
      fontSize: {
        h1: "4rem",
        h2: "3.5rem",
        h3: "3rem",
        h4: "2.5rem",
        h5: "2rem",
        h6: "1.5rem",
      },
    },
  },
  important: true,
  plugins: [require("tailwindcss-animate")],
};
export default config;
