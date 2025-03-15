/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        serif: ['"IBM Plex Serif"', 'serif'],
        oldstyle: ['"Old Standard TT"', 'serif'],
        logo: ['"Philosopher"', 'serif'], 

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
        gray: {
          50: '#EEEBE7',
          100: '#F3F4F6',
          200: '#E5E7EB',
          300: '#D1D5DB',
          400: '#9CA3AF',
          500: '#6B7280',
          600: '#4B5563',
          700: '#374151',
          800: '#1F2937',
          900: '#111827',
        },
      },
      animation: {
        fadeIn: "fadeIn 1s ease-in forwards",
        slideUp: "slideUp 1s ease-in forwards",
        slideDown: "slideDown 1s ease-in forwards",
      },
      keyframes: {
        fadeIn: {
          "0%": { opacity: 0 },
          "100%": { opacity: 1 },
        },
        slideUp: {
          "0%": { transform: "translateY(100px)", opacity: 0 },
          "100%": { transform: "translateY(0)", opacity: 1 },
        },
        slideDown: {
          "0%": { transform: "translateY(-100px)", opacity: 0 },
          "100%": { transform: "translateY(0)", opacity: 1 },
        },
      },
      fontSize: {
        '2xl': '2.1rem',
        '3xl': '3.5rem',
        '4xl': '4.5rem',
        '5xl': '5.5rem',  
      },
    },
  },
  plugins: [],
};

