const path = require("path");

module.exports = {
  //presets: [require("../postcss.config.js")],
  plugins: {
    tailwindcss: {
      config: path.join(__dirname, "tailwind.config.js"),
    },
    autoprefixer: {},
  },
};
