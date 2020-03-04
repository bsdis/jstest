const path = require("path");
const webpack = require("webpack");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const i18nextWebpackPlugin = require("i18next-scanner-webpack");

const isDevelopment = true; //process.env.NODE_ENV === "development";

module.exports = {
  mode: "development",
  watch: true,
  entry: {
    //app: ["./src/app/App.tsx"],
    app: ["./src/index.tsx"],
    vendor: ["react", "react-dom"]
  },
  output: {
    publicPath: "/static",
    path: path.resolve(__dirname, "..", "static"),
    filename: "js/[name].[hash].bundle.js"
  },
  devtool: "source-map",
  resolve: {
    extensions: [".js", ".jsx", ".json", ".ts", ".tsx", ".scss"]
  },
  module: {
    rules: [
      {
        test: /\.scss$/,
        use: ["style-loader", "css-loader", "sass-loader"]
      },
      {
        test: /\.(ts|tsx)$/,
        loader: "ts-loader"
      },
      {
        enforce: "pre",
        test: /\.js$/,
        loader: "source-map-loader"
      }
    ]
  },
  plugins: [
    new CleanWebpackPlugin(),
    new HtmlWebpackPlugin({
      filename: path.resolve(__dirname, "..", "index.html"),
      template: path.resolve(__dirname, "src", "index.html")
    }),
    new webpack.HotModuleReplacementPlugin(),
    new MiniCssExtractPlugin({
      filename: path.resolve(__dirname, "..", "[name].[hash].css"),
      chunkFilename: "[id].[hash].css"
    }),
    new i18nextWebpackPlugin({
      options: {
        func: {
          // default ['i18next.t', 'i18n.t']
          list: ["t", "$t", "i18next.t", "i18n.t"],
          // default ['.js', '.jsx', '.vue']
          extensions: [".js", ".jsx", ".tsx"]
        },
        lngs: ["en", "de"],
        interpolation: { escapeValue: false },
        // both defaults to {{lng}}/{{ns}}.json
        resource: {
          loadPath: "{{lng}}/{{ns}}.json",
          savePath: "{{lng}}/{{ns}}.json"
        }
      }
    })
  ]
};
