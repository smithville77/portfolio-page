/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,js}"],
  theme: {
    extend: {
      backgroundColor: {
        bubble: "rgb(17, 63, 55)",
        card: "rgb(50, 50, 121)",
      },
      textColor: {
        "bubble-text": "rgb(5, 179, 150)",
      },
    },
  },
  plugins: [],
};
