const path = require('path');  
const webpack = require('webpack');
const FlowBabelWebpackPlugin = require('flow-babel-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const fs = require('fs');

module.exports = {  
  entry: './src/ison.js',
  output: {
    // path: path.resolve(__dirname, 'dist'),
    filename: 'ison.js',
  },
  module: {
    rules: [
      {
        test: /\.(js)$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader"
        }      
      },
      // {
      //   test: /\.html$/,
      //   use: [
      //     {
      //       loader: "html-loader",
      //       options: { minimize: true }
      //     }
      //   ]
      // }
    ]
  },
  plugins: [
    new FlowBabelWebpackPlugin(),
    // new HtmlWebpackPlugin({
    //   filename: `index.html`,
    //   template: './index.html',
    //   inject: 'head',
    //   showErrors: false
    // }),

  ],
}