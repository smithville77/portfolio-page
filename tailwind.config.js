/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,js}"],
  theme: {
    extend: {
      backgroundColor: {
        bubble: "rgb(17, 63, 55)",
      },
      textColor: {
        'bubble-text': 'rgb(5, 179, 150)',
      },
    },
  },
  plugins: [],
};
