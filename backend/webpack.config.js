const { ContextReplacementPlugin } = require("webpack")
const NodemonPlugin = require("nodemon-webpack-plugin")
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
        use: [
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
  },
  plugins: [
    new NodemonPlugin(),
    new ContextReplacementPlugin(/.*/)
    //For fixing warning https://github.com/Automattic/mongoose/issues/7476
  ]
}
