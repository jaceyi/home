const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const CopyPlugin = require('copy-webpack-plugin');

module.exports = {
  entry: ['babel-polyfill', path.resolve(__dirname, '../src/')],

  resolve: {
    extensions: ['.js', '.jsx', '.ts', '.tsx'],
    alias: {
      '@': path.resolve(__dirname, '../src/')
    }
  },

  plugins: [
    new CleanWebpackPlugin(),
    new CopyPlugin([path.resolve(__dirname, '../static')]),
    new HtmlWebpackPlugin({
      template: './static/index.html'
    })
  ],

  output: {
    filename: 'static/js/[name].[hash:8].bundle.js',
    path: path.resolve(__dirname, '../dist'),
    publicPath: '/'
  },

  module: {
    rules: [
      {
        test: /\.tsx?$/,
        exclude: /node_modules/,
        loader: 'ts-loader'
      },
      {
        type: 'javascript/auto',
        test: /\.json$/,
        loader: 'json-loader'
      },
      {
        test: /\.(png|svg|jpg|jpeg|gif)$/,
        loader: 'url-loader',
        options: {
          limit: 1000,
          name: 'static/images/[name].[hash:8].[ext]'
        }
      }
    ]
  }
};
