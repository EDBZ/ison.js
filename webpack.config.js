const path = require('path');
const webpack = require('webpack');
const FlowBabelWebpackPlugin = require('flow-babel-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin')
const fs = require('fs');

const config = {
  module:{
    rules: [{
      test: /\.(js)$/,
      exclude: /node_modules/,
      use: {
        loader: "babel-loader"
      }
    }, ]
  },
  plugins: [new FlowBabelWebpackPlugin()]
}

const prodConfig = Object.assign({}, config, {
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
  }
})

const exempleConfig = Object.assign({}, config, {
  entry: './src/ison.js',
  output: {
    path: path.resolve(__dirname, 'exemple'),
    filename: 'ison.js',
    library: 'ison-js',
    libraryTarget: "umd",
    auxiliaryComment: {
      root: "Root Comment",
      commonjs: "CommonJS Comment",
      commonjs2: "CommonJS2 Comment",
      amd: "AMD Comment"
    }
  }
})


module.exports = [prodConfig, exempleConfig]