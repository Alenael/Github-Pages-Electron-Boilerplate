const path = require("path");

module.exports = {
  mode: "jit",
  content: [path.join(__dirname, "./src/**/*.{js,jsx,ts,tsx,html}")],
  theme: {
    backgroundPosition: {
      "top-4": "center top -10rem",
    },
    extends: {
      gridTemplateColumns: {
        "1/5": "1fr 5fr",
      },
    },
  },
  plugins: [],
};
