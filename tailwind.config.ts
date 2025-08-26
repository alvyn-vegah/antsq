/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './app/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',
    './src/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        roboto: ['var(--font-roboto)'],
        poppins: ['var(--font-poppins)'],
        noto: ['var(--font-noto)'],
        montserrat: ['var(--font-montserrat)'],
        rubik: ['var(--font-rubik)'],
        cursive: ['var(--font-pacifico)'],
      },
      colors:{
        'darkorange':"#d64d0c"
      },
      scrollbar: ['rounded'],
    },
  },
  plugins: [
    require('tailwind-scrollbar'),
  ],
}

