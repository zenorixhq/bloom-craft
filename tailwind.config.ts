import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  darkMode: ["class"],
  theme: {
    container: {
      center: true,
      padding: "1.5rem",
      screens: {
        "2xl": "1400px",
      },
    },
    extend: {
      colors: {
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
          hover: "hsl(var(--primary-hover))",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      fontFamily: {
        logo: ["'Playfair Display'", "'Cinzel'", "Georgia", "serif"],
        heading: ["'Playfair Display'", "'Cinzel'", "var(--font-heading)", "Georgia", "serif"],
        serif: ["'Playfair Display'", "'Cinzel'", "Georgia", "serif"],
        editorial: ["'Cormorant Garamond'", "'Playfair Display'", "Georgia", "serif"],
        sans: ["'Plus Jakarta Sans'", "'Glacial Indifference'", "var(--font-sans)", "system-ui", "sans-serif"],
        subtext: ["'Plus Jakarta Sans'", "'Glacial Indifference'", "system-ui", "sans-serif"],
        glacial: ["'Glacial Indifference'", "'Plus Jakarta Sans'", "system-ui", "sans-serif"],
        script: ["'Alex Brush'", "cursive"],
      },
    },
  },
  plugins: [],
};

export default config;
