/** @type {import('tailwindcss').Config} */
const config = {
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './lib/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          50: '#fff6f1',
          100: '#ffe8dc',
          200: '#ffd0b6',
          300: '#ffb082',
          400: '#f58b57',
          500: '#df6e3c',
          600: '#c64f2c',
          700: '#a63e20',
          800: '#80331e',
          900: '#5e281d',
        },
        accent: {
          50: '#eefdf7',
          500: '#14b87d',
          700: '#0d8d61',
        },
      },
      boxShadow: {
        soft: '0 14px 32px rgba(23, 48, 44, 0.12)',
      },
      backgroundImage: {
        'radial-soft': 'radial-gradient(circle at top, rgba(198,79,44,0.12), transparent 45%)',
      },
    },
  },
  plugins: [],
};

export default config;
