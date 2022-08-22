const path = require("path");

module.exports = {
  mode: "jit",
  content: [path.join(__dirname, "./src/**/*.{js,jsx,ts,tsx,html}")],
  theme: {
    fontFamily: {
      sora: "'Sora', sans-serif",
    },
    backgroundPosition: {
      "top-4": "center top -10rem",
    },
    extends: {
      colors: {
        "fire-engine-red": {
          DEFAULT: "#9F2A2A",
          50: "#F8EBE4",
          100: "#F2D7CC",
          200: "#E5AC9C",
          300: "#D87B6C",
          400: "#CB463B",
          500: "#9F2A2A",
          600: "#83232A",
          700: "#661B26",
          800: "#4A1420",
          900: "#2E0C16",
        },
      },
      gridTemplateColumns: {
        "1/5": "1fr 5fr",
      },
    },
  },
  plugins: [],
};
