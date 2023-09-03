/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        inter: ["Inter", "sans-serif"],
        jomhuria: ['Jomhuria', 'cursive']
      },
      boxShadow: {
        around: 'rgba(0, 0, 0, 0.35) 0px 3px 6px'
      },
      colors: {
        white: {
          100: "#F1F1F1", // background color
        },
        black: {
          100: "#101010", //black color
          200: "#595959", // paragraph color
        },
        blue: {
          100: '#096DD9', // blue color
          200: '#BAE7FF' // light blue
        }
      },
    },
  },
  plugins: [],
  corePlugins: {},
};
