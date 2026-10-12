/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        terracotta: {
          50: '#FDF7F4',
          100: '#F9ECE6',
          200: '#F3D6C9',
          300: '#EABCA8',
          400: '#DD906F',
          500: '#C85A32', // Primary Artisan Terracotta
          600: '#B04924',
          700: '#913B1C',
          800: '#752F17',
          900: '#5F2714',
        },
        brass: {
          50: '#FDFBF5',
          100: '#FAF6E7',
          200: '#F4ECCB',
          300: '#EBDDA7',
          400: '#DFC872',
          500: '#D4AF37', // Antique Brass / Craft Gold
          600: '#B89320',
          700: '#947217',
          800: '#755916',
          900: '#5E4714',
        },
        ivory: {
          50: '#FDFCFA',
          100: '#FAF8F5', // Primary Background
          200: '#F5EFEB', // Secondary Surfaces
          300: '#EBE2D7',
          400: '#DDD2C3',
          500: '#C4B5A2',
        },
        charcoal: {
          50: '#F7F7F7',
          100: '#EAE9E8',
          200: '#D0CECC',
          300: '#A9A6A3',
          400: '#7C7874',
          500: '#55514E',
          600: '#3D3A37',
          700: '#2D2B28',
          800: '#1F1E1D', // Deep Charcoal text
          900: '#151413',
        },
        clay: '#8B4513',
        indigoCraft: '#2E3A59',
      },
      fontFamily: {
        serif: ['"DM Serif Display"', '"Playfair Display"', 'Georgia', 'serif'],
        sans: ['"Plus Jakarta Sans"', 'system-ui', '-apple-system', 'sans-serif'],
      },
      boxShadow: {
        'subtle': '0 2px 10px rgba(31, 30, 29, 0.04)',
        'craft': '0 4px 20px -2px rgba(200, 90, 50, 0.08), 0 2px 6px -1px rgba(0, 0, 0, 0.04)',
        'craft-lg': '0 12px 30px -4px rgba(200, 90, 50, 0.12), 0 4px 12px -2px rgba(0, 0, 0, 0.06)',
      },
      animation: {
        'pulse-subtle': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'wave': 'wave 1.5s ease-in-out infinite',
      },
      keyframes: {
        wave: {
          '0%, 100%': { transform: 'scaleY(0.4)' },
          '50%': { transform: 'scaleY(1)' },
        }
      }
    },
  },
  plugins: [],
}
