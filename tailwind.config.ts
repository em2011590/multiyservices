import type { Config } from "tailwindcss";

/**
 * tailwind.config.ts — Tailwind v4 is mostly configured via CSS @theme.
 * This file stays minimal; custom color tokens live in globals.css @theme block.
 */
const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
};

export default config;
