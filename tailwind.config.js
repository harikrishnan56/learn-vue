/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{vue,js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'brand-white': '#FFFFFF',
        'brand-black': '#000000',
        'brand-teal': '#4AC1BD',
        'brand-teal-dark': '#25A49F',
        'brand-gray-border': '#E4E4E4',
        'brand-gray-light': '#F4F4F4',
        'brand-gray-text': '#AAAAAA',
        'brand-icon-dark': '#000D26',
      },
      fontFamily: {
        'gabarito': ['Gabarito', 'system-ui', '-apple-system', 'sans-serif'],
      },
      boxShadow: {
        'button-gray': '0px 3px 0px 0px rgba(228, 228, 228, 1)',
        'button-teal': '0px 3px 0px 0px rgba(37, 164, 159, 1)',
      }
    },
  },
  plugins: [],
}

