const colors = require("tailwindcss/colors");

module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    colors: {
      transparent: "transparent",
      current: "currentColor",
      black: colors.black,
      white: colors.white,
      gray: colors.slate,
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
    container: {
      center: true,
      padding: {
        DEFAULT: "0.5rem",
        md: "1rem",
      },
    },
    extend: {
      transitionProperty: {
        width: "width",
        padding: "padding",
      },
      height: {
        inner: "var(--inner-height, 100vh)",
      },
      minHeight: {
        inner: "var(--inner-height, 100vh)",
        16: "4rem",
        infint: "99999",
      },
      backgroundImage: (theme) => ({
        "icons-light": "url('/images/wanas-icons-light.png')",
        "icons-dark": "url('/images/wanas-icons-dark.png')",
        logo: "url('/images/wanas-logo.svg')",
        "my-location": "url('/images/my-location.svg')",
      }),
      backgroundSize: {
        auto: "auto",
        cover: "cover",
        contain: "contain",
        "50%": "120px",
      },
    },
  },
  // variants: {
  //   extend: {
  //     height: ["hover", "focus"],
  //     width: ["hover", "focus", "focus-within"],
  //     padding: ["hover"],
  //     transitionProperty: ["hover", "focus"],
  //     textColor: ["disabled"],
  //     margin: ["first", "last"],
  //   },
  // },
  plugins: [],
};
