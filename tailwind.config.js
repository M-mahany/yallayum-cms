const { nextui } = require("@nextui-org/react");

module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
    "./node_modules/@nextui-org/theme/dist/**/*.{js,ts,jsx,tsx}",
  ],

  theme: {
    extend: {
      colors: {
        themePrimary: ["#164A8C"],
        themeSecondry: ["#F9F1F8"],
        themeBtn: ["#FC4242"],
        themeGray: ["#000000"],
      },
    },
  },
  plugins: [nextui()],
};
