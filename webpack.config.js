const path = require('path');  
const webpack = require('webpack');
const FlowBabelWebpackPlugin = require('flow-babel-webpack-plugin');

module.exports = {  
  entry: './src/ison.js',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'ison.js',
  },
  module: {
    rules: [
      {
        test: /\.(js)$/,
        use: 'babel-loader'
      }
    ]
  },
  plugins: [
    new FlowBabelWebpackPlugin(),
  ],
}