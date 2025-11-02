/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'class',
  content: ['./index.html', './src/**/*.{ts,tsx,js,jsx}'],
  theme: {
    extend: {
      colors: {
        brand: {
          green: '#10b981',
          blue: '#0ea5e9',
          navy: '#0b3b4f',
        },
      },
      boxShadow: {
        soft: '0 10px 30px rgba(2,6,23,.08)',
      },
      borderRadius: {
        xl: '14px',
      },
      fontFamily: {
        sans: [
          'Inter',
          'system-ui',
          '-apple-system',
          'BlinkMacSystemFont',
          'Segoe UI',
          'Roboto',
          'Helvetica Neue',
          'Arial',
          'sans-serif',
        ],
        heading: ['Oswald', 'Impact', 'sans-serif'],
      },
    },
    container: {
      center: true,
      padding: '4%',
      screens: { lg: '1120px' },
    },
  },
  plugins: [],
};
