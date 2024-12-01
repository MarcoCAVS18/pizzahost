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
        red: '#91342F',
        lightRed: '#AD4236',
        darkRed: '#91342F',
        black: '#000000',
        lightBeige: '#F1EBE4',
        brown: '#91342F',
        darkBrown: '#AD4236',
        green: '#275537',
        white: '#FFFFFF',
        gray: 'E0E5DB',
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
        '2xl': '1.5rem',
        '3xl': '3.5rem',
        '4xl': '4.5rem',
        '5xl': '5.5rem',  
      },
    },
  },
  plugins: [],
};

