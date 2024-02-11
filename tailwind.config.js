/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,js}"],
  darkMode: 'class',
  theme: {
    extend: {
      backgroundColor: {
        bubble: "rgb(17, 63, 55)",
        new: "rgb(20, 184, 166)",
        card: "rgb(68, 138, 252)",
      },
      textColor: {
        "bubble-text": "rgb(5, 179, 150)",
      },
    },
  },
  plugins: [],
};
