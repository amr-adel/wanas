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
      gray: colors.warmGray,
      red: {
        50: "#fae8e9",
        100: "#f0bfc0",
        200: "#e69698",
        DEFAULT: "#dc6d6f",
        300: "#dc6d6f",
        400: "#d24446",
        500: "#b72c2e",
        600: "#8e2224",
        700: "#65181a",
        800: "#3c0e0f",
        900: "#130505",
      },
      brown: {
        50: "#f2f0f0",
        100: "#dbd5d5",
        200: "#c3baba",
        300: "#ac9f9e",
        400: "#948483",
        500: "#7a6b6a",
        DEFAULT: "#5f5352",
        600: "#5f5352",
        700: "#443b3a",
        800: "#282323",
        900: "#0d0b0b",
      },
    },
    extend: {},
  },
  variants: {
    extend: {},
  },
  plugins: [],
};
