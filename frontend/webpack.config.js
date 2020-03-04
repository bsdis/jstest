const path = require("path");
const webpack = require("webpack");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const i18nextWebpackPlugin = require('i18next-scanner-webpack'); 
const fs = require('fs');
const chalk = require('chalk');
const isDevelopment = true; //process.env.NODE_ENV === "development";
const eol = require('eol');
const VirtualFile = require('vinyl');

function flush(done) {
  const { parser } = this;
  const { options } = parser;

  // Flush to resource store
  const resStore = parser.get({ sort: options.sort });
  const { jsonIndent } = options.resource;
  const lineEnding = String(options.resource.lineEnding).toLowerCase();

  Object.keys(resStore).forEach((lng) => {
    const namespaces = resStore[lng];

    Object.keys(namespaces).forEach((ns) => {
      const resPath = parser.formatResourceSavePath(lng, ns);
      let resContent;
      try {
        resContent = JSON.parse(
          fs.readFileSync(
            fs.realpathSync(path.join('locales', resPath))
          ).toString('utf-8')
        );
      } catch (e) {
        resContent = {};
      }
      const obj = { ...namespaces[ns], ...resContent };
      let text = JSON.stringify(obj, null, jsonIndent) + '\n';

      if (lineEnding === 'auto') {
        text = eol.auto(text);
      } else if (lineEnding === '\r\n' || lineEnding === 'crlf') {
        text = eol.crlf(text);
      } else if (lineEnding === '\n' || lineEnding === 'lf') {
        text = eol.lf(text);
      } else if (lineEnding === '\r' || lineEnding === 'cr') {
        text = eol.cr(text);
      } else { // Defaults to LF
        text = eol.lf(text);
      }

      let contents = null;

      try {
        // "Buffer.from(string[, encoding])" is added in Node.js v5.10.0
        contents = Buffer.from(text);
      } catch (e) {
        // Fallback to "new Buffer(string[, encoding])" which is deprecated since Node.js v6.0.0
        contents = new Buffer(text);
      }

      this.push(new VirtualFile({
        path: resPath,
        contents: contents
      }));
    });
  });

  done();
}


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
    // new HtmlWebpackPlugin({
    //   filename: path.resolve(__dirname, "..", "index.html"),
    //   template: path.resolve(__dirname, "src", "index.html")
    // }),
    new webpack.HotModuleReplacementPlugin(),
    new MiniCssExtractPlugin({
      filename: path.resolve(__dirname, "..", "[name].[hash].css"),
      chunkFilename: "[id].[hash].css"
    }),
    new i18nextWebpackPlugin({
      options: {
        func: {
          // default ['i18next.t', 'i18n.t']
          list: ['t', '$t', 'i18next.t', 'i18n.t'],
          // default ['.js', '.jsx', '.vue']
          extensions: ['.js', '.jsx', '.tsx']
        },
        // interpolation: { escapeValue: false },
        lngs: ['en', 'de'],
        saveMissing: false,
        keySeparator: false,
        // defaultValue: (lng, ns, key) => {
        //   if (lng === 'en') {
        //     return key;
        //   }
        //   return '';
        // },
        interpolation: {
          escapeValue: false,
          prefix: '{{',
          suffix: '}}',
          
      },
      react: {
        wait: true
      },
        // removeUnusedKeys: true,
        // both defaults to {{lng}}/{{ns}}.json
        resource: {
          loadPath: '{{lng}}/{{ns}}.json',
          savePath: '{{lng}}/{{ns}}.json'
        },

      },

      flush
    })
  ]
};
