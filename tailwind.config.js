/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        cosmic: {
          950: '#0a0e1a', // deep cosmic void canvas
          900: '#111827', // surface card level 1
          850: '#151d30', // intermediate card
          800: '#1e293b', // elevated HUD/modal level 2
          750: '#26334d', // border highlight
          700: '#334155', // muted border
          600: '#475569', // subtle text
        },
        neon: {
          purple: '#a855f7',
          pink: '#ff4b72',
          mint: '#10e598',
          gold: '#fbbf24',
          cyan: '#38bdf8',
        }
      },
      boxShadow: {
        'glow-purple': '0 0 25px rgba(168, 85, 247, 0.28)',
        'glow-pink': '0 0 25px rgba(255, 75, 114, 0.28)',
        'glow-cyan': '0 0 25px rgba(56, 189, 248, 0.28)',
        'glow-mint': '0 0 25px rgba(16, 229, 152, 0.28)',
        'glow-gold': '0 0 25px rgba(251, 191, 36, 0.28)',
      },
      fontFamily: {
        mono: ['Space Mono', 'Fira Code', 'JetBrains Mono', 'ui-monospace', 'monospace'],
        sans: ['Plus Jakarta Sans', 'Inter', 'system-ui', '-apple-system', 'sans-serif'],
        display: ['Space Grotesk', 'Inter', 'sans-serif'],
      }
    },
  },
  plugins: [],
}
