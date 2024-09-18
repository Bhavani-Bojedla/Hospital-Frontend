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
        'login': "url('../Images/login.svg')",
        'home':"url('../Images/home.svg')",
        'addrecord':"url(../Images/addrecord.svg)",
        'logo':"url(.src/assets/logo.jpg)"
      },
      spacing:{
        22:'5.5rem',
        73:'18rem',
        75:'19rem',
        85:'22rem',
        90:'25.5rem',
        98:'31rem',
        100:'36rem',
        110:'39rem',
        120:'44rem'

      },
    },
  },
  plugins: [],
}

