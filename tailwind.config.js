/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {},
  },
  plugins: [require("@tailwindcss/typography"),require("daisyui")],
  daisyui: {
    styled: true,
    themes: ['dark', 'light'],
    base: true,
    utils: true,
    logs: false,
    rtl: false,
  },
}
