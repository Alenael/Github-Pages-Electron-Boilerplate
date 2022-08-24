const path = require("path");
const webpack = require("webpack");
const TerserPlugin = require("terser-webpack-plugin");
const ReactRefreshWebpackPlugin = require("@pmmmwh/react-refresh-webpack-plugin");
const HtmlWebPackPlugin = require("html-webpack-plugin");

module.exports = () => {
  const isDevelopment = process.env.NODE_ENV !== "production";

  const htmlConfig = {
    title: "TestSite",
    template: "src/index.ejs",
    filename: "./index.html",
    //favicon: "favicon.ico",
    // googleAnalytics: {
    //   trackingId: "",
    // },
    meta: {},
    minify: isDevelopment
      ? false
      : {
          collapseBooleanAttributes: true,
          collapseInlineTagWhitespace: false,
          collapseWhitespace: false,
          conservativeCollapse: false,
          html5: true,
          includeAutoGeneratedTags: false,
          keepClosingSlash: true,
          minifyCSS: false,
          minifyJS: false,
          minifyURLs: false,
          preserveLineBreaks: false,
          preventAttributesEscaping: false,
          processConditionalComments: false,
          quoteCharacter: '"',
          removeAttributeQuotes: false,
          removeComments: false,
          removeEmptyAttributes: false,
          removeEmptyElements: false,
          removeOptionalTags: false,
          removeScriptTypeAttributes: false,
          removeStyleLinkTypeAttributes: false,
          removeTagWhitespace: false,
          sortAttributes: false,
          sortClassName: false,
          useShortDoctype: false,
        },
  };

  return {
    mode: isDevelopment ? "development" : "production",
    devtool: isDevelopment ? "inline-source-map" : false,
    entry: path.resolve(__dirname, "src/app", "renderer.tsx"),

    watchOptions: {
      poll: 1000,
      aggregateTimeout: 1000,
      ignored: ["**/node_modules"],
    },

    output: {
      clean: {
        keep: /.nojekyll/, // Keep these assets under 'ignored/dir'.
      },
      path: path.resolve(__dirname, "public"),
      filename: "bundle.[contenthash].js",
      // assetModuleFilename: "assets/images/[name][ext]",
    },

    resolve: {
      extensions: [".tsx", ".ts", ".jsx", ".js", ".scss", ".css"],
      modules: ["node_modules"],
    },

    module: {
      rules: require("./webpack.rules.js"),
    },

    plugins: [
      new webpack.ProvidePlugin({
        React: "react",
      }),
      new HtmlWebPackPlugin(htmlConfig),
      isDevelopment &&
        new webpack.EvalSourceMapDevToolPlugin({
          exclude: ["vendor"],
          columns: true,
          module: true,
        }),
      !isDevelopment &&
        new webpack.SourceMapDevToolPlugin({
          filename: "[file].map",
          columns: true,
          module: true,
        }),
      isDevelopment && new ReactRefreshWebpackPlugin(),
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
      ],
    },

    performance: {
      hints: false,
      maxEntrypointSize: 512000,
      maxAssetSize: 512000,
    },

    devServer: {
      port: 3000,
      compress: true,
      hot: true,
      open: true,
    },
  };
};
