import type { Config } from "tailwindcss";

export default {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        'montserrat': ['var(--font-montserrat)', 'system-ui', 'sans-serif'],
      },
      fontWeight: {
        'normal': '400',
        'medium': '500',
        'semibold': '600',
        'bold': '700',
        'extrabold': '800',
      },
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
        gold: {
          50: '#faf6eb',
          100: '#f5ecd3',
          200: '#efd9a0',
          300: '#e3be6a', // bright — modalidades
          400: '#c8a353', // principal — modalidades.png
          500: '#a87820', // deep — modalidades
          600: '#8a6418',
          700: '#6b4d12',
          800: '#4d370d',
          900: '#2e2108',
        },
        'black-primary': '#121212', // Fondo principal
        'black-section': '#2A2626', // Fondo de secciones internas
      },
    },
  },
  plugins: [],
} satisfies Config;
