const path = require("path");

module.exports = {
  plugins: {
    tailwindcss: {
      config: path.join(__dirname, "tailwind.config.js"),
    },
    "postcss-preset-env": {
      stage: 1,
      features: { "nesting-rules": false },
    },
  },
};
