/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
    "./utils/**/*.js",
  ],
  theme: {
    extend: {
      fontFamily: {
        heading: ["Aboreto", "cursive"],
        body: ["Poppins", "sans-serif"],
      },
      colors:{
        beige:{
          400: '#F5F5DC',
          600: '#E7E4DC',
          700: '#EBEBB8'
        },
        green:{
          400: '#E7F8E3',
          700: '#AAAA92'
        }
      },
      screens:{
        sm: '375px', // mobile
        md: '600px', // Tablet
        lg: '1024px', // laptop
        xl: '1280px', // desktop
        xxl: '1400px' // large screen
      }
    },
  },
  plugins: [],
};

