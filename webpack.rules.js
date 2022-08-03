const isDevelopment = process.env.NODE_ENV !== "production";
const isFastRefresh = process.env.FAST_REFRESH === "true";
const outputDirectory = "public";

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
    },
  },
  {
    test: /\.(png|svg|jpe?g|gif|jp2|webp)$/,
    loader: "file-loader",
    options: {
      name: "[name]-[contenthash].[ext]",
      esModule: false,
      publicPath: `${outputDirectory}/images`,
    },
  },
  {
    test: /\.(ttf|eot|otf|woff)$/,
    loader: "file-loader",
    options: {
      name: "assets/fonts/[name]-[contenthash].[ext]",
      esModule: false,
    },
  },
  {
    test: /\.(ico)$/,
    loader: "file-loader",
    options: {
      name: "[name]-[contenthash].[ext]",
      esModule: false,
    },
  },
];
