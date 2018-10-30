const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require("extract-text-webpack-plugin");
const FriendlyErrorsPlugin = require('friendly-errors-webpack-plugin');

const extractStyle = new ExtractTextPlugin({
  filename: '[name].css',
  disable: false,
  allChunks: true
});

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
        loader: 'babel-loader'
      },
      {
        test: /\.(scss)$/,
        exclude: /node_modules/,
        use: extractStyle.extract({
          fallback: 'style-loader',
          use: [
            'css-loader',
            'sass-loader'
          ]
        })
      },
      {
        test: /\.(less)$/,
        include: /node_modules/,
        use: extractStyle.extract({
          fallback: 'style-loader',
          use: [
            'css-loader',
            {
              loader: 'less-loader',
              options: {
                javascriptEnabled: true
              }
            }
          ]
        })
      },
      {
        test: /\.(jpg|gif|png)$/,
        loader: 'url-loader'
      }
    ]
  },

  plugins: [
    new HtmlWebpackPlugin({
      template: 'admin/src/index.html'
    }),
    extractStyle,
    new FriendlyErrorsPlugin()
  ],

  devServer: {
    inline: true,
    historyApiFallback: true,
    contentBase: './admin/src',
    progress: true,
    overlay: {
      warnings: true,
      errors: true
    },
    proxy: {
      '/api': {
        target: 'http://localhost:3000'
      }
    }
  }
};
