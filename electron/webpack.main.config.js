module.exports = {
  entry: "./src/mainWindow.ts",
  module: {
    rules: require("../webpack.rules"),
  },
  resolve: {
    extensions: [".js", ".ts", ".jsx", ".tsx", ".css", ".json"],
  },
};
