/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./**/*.{html,js}"], // Update the path to include all HTML and JS files in the top-level directory
  darkMode: 'class',
  theme: {
    extend: {
      backgroundColor: {
        bubble: "rgb(17, 63, 55)",
        new: "rgb(20, 184, 166)",
        card: "rgb(177, 207, 255)",
      },
      textColor: {
        "bubble-text": "rgb(5, 179, 150)",
      },
    },
  },
  plugins: [],
};
