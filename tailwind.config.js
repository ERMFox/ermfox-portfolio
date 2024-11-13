/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: 'class',
  content: [
    "./views/**/*.ejs",   // Adjust to your templating engine files
    "./public/**/*.html",
  ],
  theme: {
    extend: {},
  },
  plugins: [],
};
