export default {
  theme: {
    colors: {
      yellow: "#EFDD67",
      "white-cream": "#FFFBE6",
      orange: "#F96539",
      "dark-green": "#84A96F",
      "light-green": "#BFD8AF",
      white: "#FFFFFF",
      black: "#000000",
    },
    extend: {
      fontFamily: {
        dela: "DelaGothic",
        arimo: "Arimo",
      },
    },
  },
  plugins: [],
  content: [
    `~/components/**/*.{vue,js,ts}`,
    `~/layouts/**/*.vue`,
    `~/pages/**/*.vue`,
    `~/composables/**/*.{js,ts}`,
    `~/plugins/**/*.{js,ts}`,
    `~/utils/**/*.{js,ts}`,
    `~/App.{js,ts,vue}`,
    `~/app.{js,ts,vue}`,
    `~/Error.{js,ts,vue}`,
    `~/error.{js,ts,vue}`,
    `~/app.config.{js,ts}`,
  ],
};
