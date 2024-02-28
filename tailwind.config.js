/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{html,ts}",
  ],
  theme: {
    extend: {
      colors: {
        'primary': '#413aa3'
      },
      // fontFamily: {
      //   'outfit': ['Outfit', 'sans-serif']
      // }
    },
  },
  plugins: [],
}

