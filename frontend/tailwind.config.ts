import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        // White Copper Theme (v7)
        'primary': '#B87333',           // Copper - Header, primary CTAs, links
        'secondary': '#E8B84B',         // Gold Light - Hover states, highlights
        'accent': '#5C3010',            // Logo Brown - Secondary CTAs, accents
        'background': '#F9F6F0',        // Paper - Main backgrounds
        'section-alt': '#FDFBF8',       // Warm White - Alternating sections
        'text': '#5C3010',              // Logo Brown - Primary text
        'text-secondary': '#7A6858',    // Ink Light - Secondary text, captions
      },
      fontFamily: {
        'serif': ['var(--font-lora)', 'Georgia', 'serif'],
        'sans': ['var(--font-inter)', 'system-ui', 'sans-serif'],
      },
      backgroundImage: {
        'gradient-copper': 'linear-gradient(135deg, #B87333 0%, #5C3010 100%)',
      },
      boxShadow: {
        'copper-sm': '0 4px 12px rgba(184, 115, 51, 0.40)',
        'copper-md': '0 8px 24px rgba(92, 48, 16, 0.10)',
        'copper-lg': '0 24px 60px rgba(92, 48, 16, 0.25)',
      },
    },
  },
  plugins: [],
}

export default config
