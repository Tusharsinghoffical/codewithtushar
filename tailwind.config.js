/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./App.tsx",
    "./index.tsx",
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      fontFamily: {
        inter: ['Inter', 'system-ui', '-apple-system', 'sans-serif'],
      },
      animation: {
        'fade-in-up': 'fadeInUp 0.8s ease-out forwards',
        'marquee': 'marquee 20s linear infinite',
        'float': 'float 6s ease-in-out infinite',
        'drift': 'drift 15s ease-in-out infinite',
        'gradient-flow': 'gradient-flow 8s ease infinite',
        'bounce-subtle': 'bounce-subtle 0.6s cubic-bezier(0.34, 1.56, 0.64, 1)',
        'reveal-scale': 'revealScale 0.8s cubic-bezier(0.34, 1.56, 0.64, 1) forwards',
      },
      keyframes: {
        fadeInUp: {
          '0%': { opacity: '0', transform: 'translateY(20px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        marquee: {
          '0%': { transform: 'translateX(0)' },
          '100%': { transform: 'translateX(-50%)' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-20px)' },
        },
        drift: {
          '0%, 100%': { transform: 'translate(0, 0)' },
          '50%': { transform: 'translate(30px, 20px)' },
        },
        'gradient-flow': {
          '0%, 100%': { 'background-position': '0% 50%' },
          '50%': { 'background-position': '100% 50%' },
        },
        'bounce-subtle': {
          '0%, 100%': { transform: 'scale(1) translateY(0)' },
          '30%': { transform: 'scale(1.1) translateY(-3px)' },
          '50%': { transform: 'scale(0.98) translateY(0)' },
          '70%': { transform: 'scale(1.02) translateY(-1px)' },
        },
        revealScale: {
          '0%': { opacity: '0', transform: 'scale(0.9)' },
          '100%': { opacity: '1', transform: 'scale(1)' },
        },
      },
    },
  },
  plugins: [],
};
