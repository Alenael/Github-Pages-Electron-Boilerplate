const path = require("path");

module.exports = {
  mode: "jit",
  content: [path.join(__dirname, "./src/**/*.{js,jsx,ts,tsx}")],
  theme: {
    extends: {},
  },
  plugins: [],
};
