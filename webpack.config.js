const path = require("path");
const webpack = require("webpack");
const TerserPlugin = require("terser-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const CssMinimizerPlugin = require("css-minimizer-webpack-plugin");
const BundleAnalyzerPlugin =
  require("webpack-bundle-analyzer").BundleAnalyzerPlugin;
const ReactRefreshWebpackPlugin = require("@pmmmwh/react-refresh-webpack-plugin");
const HtmlWebPackPlugin = require("html-webpack-plugin");
const packageFolder = path.resolve(__dirname, ".webpack");
const isDevelopment = process.env.NODE_ENV !== "production";
const rules = require("./webpack.rules.js");

module.exports = {
  mode: isDevelopment ? "development" : "production",
  devtool: isDevelopment ? "source-map" : false,

  watchOptions: {
    poll: 1000,
    aggregateTimeout: 1000,
    ignored: ["**/node_modules"],
  },

  entry: path.resolve(__dirname, "src", "renderer.tsx"),

  output: {
    path: packageFolder,
    sourceMapFilename: "[file].map",
    filename: `assets/js/[name].min.js`,
  },

  resolve: {
    extensions: [".tsx", ".ts", ".jsx", ".js", ".scss", ".css"],
    modules: ["node_modules"],
  },

  module: {
    rules: rules,
  },

  plugins: [
    new webpack.ProvidePlugin({
      React: "react",
    }),
    new HtmlWebPackPlugin({
      template: "./src/index.ejs",
      filename: "./index.html",
    }),
    isDevelopment && new ReactRefreshWebpackPlugin(),
    new MiniCssExtractPlugin({
      filename: `assets/css/[name].min.css`,
    }),
    process.env.ANALYZE && new BundleAnalyzerPlugin(),
  ].filter(Boolean),

  optimization: {
    minimize: !isDevelopment,
    minimizer: [
      new TerserPlugin({
        terserOptions: {
          parse: {
            ecma: 8,
          },
          compress: {
            ecma: 5,
            inline: 2,
          },
          mangle: {
            safari10: true,
          },
          output: {
            ecma: 5,
            comments: false,
          },
        },
        parallel: true,
        extractComments: false,
      }),

      new CssMinimizerPlugin({
        exclude: /style\.css$/,
        parallel: true,
        minimizerOptions: {
          preset: ["default", { discardComments: { removeAll: true } }],
          // plugins: ['autoprefixer'],
        },
      }),
    ],
  },

  devServer: {
    port: 3000,
    compress: true,
    allowedHosts: "all",
    hot: true,
    open: true,
  },
};
