/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        serif: ['"IBM Plex Serif"', 'serif'],
        oldstyle: ['"Old Standard TT"', 'serif'],
      },
      colors: {
        beige: '#FDEEE0',
        red: '#BF2604',
        darkRed: '#A4231D',
        black: '#000000',
        lightBeige: '#F1EBE4',
        brown: '#91342F',
        darkBrown: '#AD4236',
        green: '#275537',
        white: '#FFFFFF',
      },
      animation: {
        fadeIn: "fadeIn 1s ease-in forwards", // Duración más larga
      },
      keyframes: {
        fadeIn: {
          "0%": { opacity: 0, transform: "translateY(20px)" }, // Desplazamiento desde abajo
          "100%": { opacity: 1, transform: "translateY(0)" }, // Final sin desplazamiento
        },
      },
      fontSize: {
        '3xl': '3.5rem',
        '4xl': '4.5rem',
        '5xl': '5.5rem',  
      },
    },
  },
  plugins: [],
};

