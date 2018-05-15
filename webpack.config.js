const path = require('path');
const webpack = require('webpack');
const FlowBabelWebpackPlugin = require('flow-babel-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin')
const fs = require('fs');

module.exports = {
  entry: './src/ison.js',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'ison.js',
    library: 'ison-js',
    libraryTarget: "umd",
    auxiliaryComment: {
      root: "Root Comment",
      commonjs: "CommonJS Comment",
      commonjs2: "CommonJS2 Comment",
      amd: "AMD Comment"
    }
  },
  // optimization: {
  //   minimize: true,
  //   minimizer: [
  //     new UglifyJsPlugin({
  //       uglifyOptions: {
  //         // sourceMap: true,
  //         ecma: 6
  //       }
  //     })
  //   ]
  // },
  module: {
    rules: [{
      test: /\.(js)$/,
      exclude: /node_modules/,
      use: {
        loader: "babel-loader"
      }
    }, ]
  },
  plugins: [
    new FlowBabelWebpackPlugin(),
    // new UglifyJsPlugin({
    //   sourceMap: true,
    //   uglifyOptions: {
    //     ecma: 6,
    //   }
    // })
  ],
}