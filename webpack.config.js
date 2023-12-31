// JavaScript Document

const path = require('path');

module.exports = {
  entry: "./src/meteo.js",
  mode: "development",
  output: {
    path: path.resolve(__dirname, "dist"),
    filename: "meteo.js"
  },
  devtool: "sourcemap",
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/
      }
    ]
  }
};