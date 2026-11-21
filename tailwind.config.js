/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        navy: {
          50: '#eef3f9',
          100: '#d6e1ee',
          200: '#aec4dc',
          300: '#7fa0c6',
          400: '#4f7bab',
          500: '#2f5e92',
          600: '#1f4a7a',
          700: '#13315c',
          800: '#0b2545',
          900: '#061a33',
        },
        teal: {
          50: '#effbf8',
          100: '#d4f3ec',
          200: '#a9e7d9',
          300: '#78d8c4',
          400: '#5ec5b8',
          500: '#3fa89a',
          600: '#2e8a7e',
          700: '#266e65',
          800: '#205651',
          900: '#1c4743',
        },
        sand: {
          50: '#fdfbf6',
          100: '#f7f1e6',
        },
        gold: {
          400: '#f5b700',
          500: '#e0a800',
        },
      },
      fontFamily: {
        sans: ['Plus Jakarta Sans', 'system-ui', 'sans-serif'],
        display: ['Fraunces', 'Georgia', 'serif'],
      },
      boxShadow: {
        soft: '0 10px 40px -12px rgba(11, 37, 69, 0.12)',
        card: '0 20px 50px -20px rgba(11, 37, 69, 0.25)',
        glow: '0 0 0 1px rgba(94, 197, 184, 0.25), 0 20px 40px -16px rgba(94, 197, 184, 0.45)',
      },
      keyframes: {
        'fade-up': {
          '0%': { opacity: '0', transform: 'translateY(24px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        'fade-in': {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-14px)' },
        },
        'pulse-ring': {
          '0%': { transform: 'scale(0.9)', opacity: '0.7' },
          '100%': { transform: 'scale(1.8)', opacity: '0' },
        },
        marquee: {
          '0%': { transform: 'translateX(0)' },
          '100%': { transform: 'translateX(-50%)' },
        },
      },
      animation: {
        'fade-up': 'fade-up 0.7s cubic-bezier(0.22, 1, 0.36, 1) forwards',
        'fade-in': 'fade-in 0.8s ease forwards',
        float: 'float 6s ease-in-out infinite',
        'pulse-ring': 'pulse-ring 2.4s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        marquee: 'marquee 28s linear infinite',
      },
    },
  },
  plugins: [],
};
