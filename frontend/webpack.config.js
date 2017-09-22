var debug = process.env.NODE_ENV !== "production";
var webpack = require('webpack');
var path = require('path');


const settings = {
context: path.join(__dirname, "src"),
  devtool: debug ? "inline-sourcemap" : null,
  entry: {
    bundle: [
     "react-hot-loader/patch",
      "./js/index.js"
    ]
  },
  output: {
    path: __dirname + "/src/",
    filename: "client.min.js"
  },
  resolve: {
    extensions: [".js", ".json", ".css"]
  },

  module: {
    rules: [
      {
        test: /\.js?$/,
        exclude: /(node_modules|bower_components)/,
        loader: 'babel-loader',
        options: {
          presets: [
            ["es2015", { modules: false }],
            "stage-2",
            "react"
          ],
          plugins: [
            "transform-node-env-inline"
          ],
          env: {
            development: {
              plugins: ['react-html-attrs', 'transform-class-properties', 'transform-decorators-legacy'],
            }
          }
        }
      },
      {
        test: /\.css$/,
        use: [
          "style-loader",
          {
            loader: "css-loader",
            options: {
              modules: true,
              sourceMap: true,
              importLoaders: 1,
              localIdentName: "[name]--[local]--[hash:base64:8]"
            }
          },
          "postcss-loader" // has separate config, see postcss.config.js nearby
        ]
      },
    ]
  },
  devServer: {
      headers: {
          "Access-Control-Allow-Origin": "*",
          "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, PATCH, OPTIONS",
          "Access-Control-Allow-Headers": "X-Requested-With, content-type, Authorization"
      },
      compress: true,
      inline:true,
      port: 9000
},
  plugins: debug ? [] : [
    new webpack.optimize.DedupePlugin(),
    new webpack.optimize.OccurenceOrderPlugin(),
    new webpack.optimize.UglifyJsPlugin({ mangle: false, sourcemap: false }),
  ],
};

module.exports = settings;