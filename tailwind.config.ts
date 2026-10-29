/** @type {import('tailwindcss').Config} */
export default {
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './lib/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          50: '#f3f7ff',
          100: '#e6eeff',
          200: '#cddcff',
          300: '#a8beff',
          400: '#7d9aff',
          500: '#4c69f0',
          600: '#3149d4',
          700: '#283aa2',
          800: '#212d7d',
          900: '#1d285e',
        },
        accent: {
          50: '#eefdf7',
          500: '#14b87d',
          700: '#0d8d61',
        },
      },
      boxShadow: {
        soft: '0 20px 45px rgba(31, 41, 55, 0.12)',
      },
      backgroundImage: {
        'radial-soft': 'radial-gradient(circle at top, rgba(76,105,240,0.14), transparent 45%)',
      },
    },
  },
  plugins: [],
};
