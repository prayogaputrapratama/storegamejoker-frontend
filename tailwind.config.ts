import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  darkMode: ['class', '[data-theme="dark"]'],
  theme: {
    extend: {
      colors: {
        orange: {
          DEFAULT: '#f5a623',
          2: '#ffbe00',
        },
        blue: {
          accent: '#4f8eff',
        },
        green: {
          accent: '#22c77a',
        },
        red: {
          accent: '#ef4444',
        },
      },
      fontFamily: {
        'bebas': ['Bebas Neue', 'sans-serif'],
        'jakarta': ['Plus Jakarta Sans', 'sans-serif'],
        'rajdhani': ['Rajdhani', 'sans-serif'],
      },
    },
  },
  plugins: [],
}

export default config
