const path = require("path");

const isDevelopment = process.env.NODE_ENV !== "production";
const isFastRefresh = process.env.FAST_REFRESH === "true";

module.exports = [
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
        sourceMap: isDevelopment,
        plugins: [isDevelopment && isFastRefresh && require.resolve("react-refresh/babel")].filter(Boolean),
      },
    },
  },
  {
    test: /\.s?[ac]ss$/i,
    use: [
      "style-loader",
      "css-loader",
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
      sourceMap: isDevelopment,
    },
  },
  {
    test: /\.(png|svg|jpe?g|gif|jp2|webp)$/,
    type: "asset/resource",
    generator: {
      filename: "assets/images/[name][ext]",
    },
  },
  {
    test: /\.(ttf|eot|otf|woff)$/,
    type: "asset/resource",
    generator: {
      filename: "assets/fonts/[name][ext]",
    },
  },
  {
    test: /\.(ico)$/,
    type: "asset/resource",
    generator: {
      filename: "assets/[name][ext]",
    },
  },
];
