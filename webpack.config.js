const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  entry: './admin/src',

  output: {
    path: path.resolve(__dirname, 'admin/dist'),
    filename: 'bundle.js'
  },

  module: {
    rules: [
      {
        test: /\.(js)$/,
        loader: 'babel-loader',
        query: {
          presets: ['react']
        }
      }
    ]
  },

  plugins: [
    new HtmlWebpackPlugin({
      template: 'admin/src/index.html'
    })
  ],

  devServer: {
    progress: true,
    proxy: {
      '/api': {
        target: 'http://localhost:3000'
      }
    }
  }
};
