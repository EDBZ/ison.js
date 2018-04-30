const path = require('path');  
const webpack = require('webpack');
const FlowBabelWebpackPlugin = require('flow-babel-webpack-plugin');

module.exports = {  
  entry: './src/generic.js',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'generic.js',
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