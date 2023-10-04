/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [],
  purge: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        background: '#131314',
        text: '#EBE9FC',
        primary: '#2B1B31',
        secondary: '#151338',
        outline: '#41294B',
        accent: '#4455DC',
      }
    }
  },
  plugins: []
}
