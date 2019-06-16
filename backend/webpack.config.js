const path = require("path")
const FlowBabelWebpackPlugin = require("flow-babel-webpack-plugin")

module.exports = {
  target: "node",
  mode: "development",
  entry: "./src/index.js",
  output: {
    path: path.resolve(__dirname, "dist"),
    filename: "bundle.js"
  },
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
          options: {
            presets: ["@babel/preset-env", "@babel/preset-react", "@babel/preset-flow"],
            plugins: [new FlowBabelWebpackPlugin()]
          }
        }
      },
      {
        test: /\.(sa|sc|c)ss$/,
        exclude: /\/node_modules/,
        use: [
          {
            loader: "css-loader" // translates CSS into CommonJS
          },
          {
            loader: "sass-loader" // compiles Sass to CSS
          },
          {
            loader: "ignore-loader"
          }
        ]
      },
      {
        test: /\.(png|jpe?g|gif)$/,
        use: [
          {
            loader: "file-loader"
          },
          {
            loader: "url-loader"
          }
        ]
      }
    ]
  }
}
