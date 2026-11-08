/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      fontFamily: {
        sans: ['Plus Jakarta Sans', 'Inter', 'sans-serif'],
        mono: ['JetBrains Mono', 'monospace'],
        serif: ['Cinzel', 'Playfair Display', 'serif'],
      },
      colors: {
        brand: {
          50: '#f0fdfa',
          100: '#ccfbf1',
          200: '#99f6e4',
          300: '#5eead4',
          400: '#2dd4bf',
          500: '#14b8a6',
          600: '#0d9488',
          700: '#0f766e',
          800: '#115e59',
          900: '#134e4a',
          950: '#042f2e',
        },
        gold: {
          50: '#fbf9f0',
          100: '#f6f1de',
          200: '#ece0bd',
          300: '#dec993',
          400: '#cfb06c',
          500: '#be9648',
          600: '#a77c3a',
          700: '#865f31',
          800: '#6f4e2c',
          900: '#5c4127',
          950: '#332214',
        },
      },
      animation: {
        'shimmer': 'shimmer 2.5s infinite linear',
        'pulse-subtle': 'pulseSubtle 3s infinite ease-in-out',
        'float': 'float 6s ease-in-out infinite',
      },
      keyframes: {
        shimmer: {
          '0%': { transform: 'translateX(-100%)' },
          '100%': { transform: 'translateX(200%)' },
        },
        pulseSubtle: {
          '0%, 100%': { opacity: '1' },
          '50%': { opacity: '0.75' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-6px)' },
        },
      },
    },
  },
  plugins: [],
}

