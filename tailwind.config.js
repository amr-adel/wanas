const colors = require("tailwindcss/colors");

module.exports = {
  purge: ["./pages/**/*.js", "./components/**/*.js"],
  darkMode: false, // or 'media' or 'class'
  theme: {
    colors: {
      transparent: "transparent",
      current: "currentColor",
      black: colors.black,
      white: colors.white,
      gray: colors.blueGray,
      red: colors.red,
      yellow: {
        50: "#fff4e5",
        100: "#ffdeb2",
        200: "#ffc87f",
        DEFAULT: "#ffb24c",
        300: "#ffb24c",
        400: "#ff9c19",
        500: "#e58300",
        600: "#b26600",
        700: "#7f4800",
        800: "#4c2b00",
        900: "#190e00",
      },
    },
    extend: {
      transitionProperty: {
        width: "width",
      },
    },
  },
  variants: {
    extend: {
      width: ["hover", "focus", "focus-within"],
      transitionProperty: ["hover", "focus"],
    },
  },
  plugins: [],
};
