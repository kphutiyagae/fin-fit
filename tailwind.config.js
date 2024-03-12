/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{html,ts}",
  ],
  theme: {
    extend: {
      colors: {
        'primary': '#413aa3',
        'disabled': '#7A7A7A'
      },
      // fontFamily: {
      //   'outfit': ['Outfit', 'sans-serif']
      // }
      boxShadow: {
        'card-summary': 'box-shadow: rgba(100, 100, 111, 0.2) 0px 7px 29px 0px'
      }
    },
  },
  plugins: [],
}

