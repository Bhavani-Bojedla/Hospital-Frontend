/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'bg1': '#30486E',
        'bg-2':"#4BABF8",
        'nav':'#0067FF'

      },
      backgroundImage: {
        'login': "url('./src/assets/login.svg')",
        'addrecord':"url(./src/assets/addrecord.svg)"
      },
      spacing:{
        22:'5.5rem',
        73:'18rem',
        75:'19rem',
        85:'22rem',
        90:'25.5rem',
        98:'29rem',
        100:'36rem',
        110:'40rem',
        120:'44rem'

      },
    },
  },
  plugins: [],
}

