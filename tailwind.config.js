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
        'brand-blue': '#6BADD7',
        'brand-yellow': '#FFD966',
        'brand-orange': '#FF9A3D',
        'brand-green-light': '#83CA54', // Figma: #83CA54 (stroke_F11ENF, effect_Z3SLXL)
        'brand-green-dark': '#4CAF50',
        'brand-green-strip': '#4FAB4C',
        'brand-green-answer': '#77BA40',
        'brand-light-yellow': '#FFF2CC',
        'giraffe-fill': '#BAEA93', 
        'giraffe-stroke': '#3A8737',
      },
      fontFamily: {
        'gabarito': ['Gabarito', 'system-ui', '-apple-system', 'sans-serif'],
      },
      boxShadow: {
        'button-gray': '0px 3px 0px 0px rgba(228, 228, 228, 1)',
        'button-teal': '0px 3px 0px 0px rgba(37, 164, 159, 1)',
        'button-giraffe': '0px 3px 0px 0px rgba(58, 135, 55, 1)',
        'button-circle': '0px 0px 0px 4px rgba(58, 135, 55, 0.1)',
        'answer-option': '0px 4px 0px 0px #83CA54',
      }
    },
  },
  plugins: [],
}

