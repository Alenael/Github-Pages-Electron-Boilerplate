const MiniCssExtractPlugin = require("mini-css-extract-plugin");
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
        plugins: [
          isDevelopment &&
            isFastRefresh &&
            require.resolve("react-refresh/babel"),
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
];
