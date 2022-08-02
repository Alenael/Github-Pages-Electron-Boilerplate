/* eslint-disable @typescript-eslint/no-var-requires */
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
    rules: [
      {
        test: /\.(t|j)sx?$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
          options: {
            presets: [
              "@babel/preset-env",
              "@babel/preset-typescript",
              ["@babel/preset-react", { development: isDevelopment }],
            ],
            plugins: [
              isDevelopment && require.resolve("react-refresh/babel"),
            ].filter(Boolean),
          },
        },
      },
      {
        test: /\.s?[ac]ss$/i,
        use: [
          isDevelopment
            ? "style-loader"
            : {
                loader: MiniCssExtractPlugin.loader,
                options: {
                  esModule: false,
                },
              },
          {
            loader: "css-loader",
            options: {
              esModule: false,
              importLoaders: 2,
              sourceMap: isDevelopment,
            },
          },
          {
            loader: "postcss-loader",
            options: {
              sourceMap: isDevelopment,
              postcssOptions: {
                plugins: [require("tailwindcss")],
              },
            },
          },
          {
            loader: "sass-loader",
            options: {
              sourceMap: isDevelopment,
            },
          },
        ],
      },
      {
        test: /\.html$/i,
        loader: "html-loader",
        options: {
          esModule: false,
        },
      },
      {
        test: /\.(png|svg|jpg|gif)$/,
        loader: "file-loader",
        options: {
          name: "assets/img/[name]-[hash].[ext]",
          esModule: false,
        },
      },
      {
        test: /\.(ttf|eot|otf|woff)$/,
        loader: "file-loader",
        options: {
          name: "assets/fonts/[name]-[hash].[ext]",
          esModule: false,
        },
      },
      {
        test: /\.(ico)$/,
        loader: "file-loader",
        options: {
          name: "[name]-[hash].[ext]",
          esModule: false,
        },
      },
    ],
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
