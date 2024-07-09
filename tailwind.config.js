/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'navbarBg': '#181818',
        'Txt': '#FFFFFF',
        'linkHover': '#ff002f',
        'bodyBg': '#121212',
        'borderClr': '#404040',
        'btnBg':'#CF6679',
        'btnTxt':'#121212'
      },
      boxShadow: {
        'cardShadow': '0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)'
      }
    },
  },
  plugins: [],
}