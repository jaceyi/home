const path = require('path');

module.exports = {
  entry: './admin/index.js',
  output: {
    path: path.resolve(__diname, 'admin'),
    filename: 'dist.js'
  },
  module: {
    rules: [
      {
        test: /\.scss$/,
        use: [
          {
            loader: 'style-loader'
          },
          {
            loader: 'css-loader',
            options: {
              modules: true
            }
          },
          {
            loader: 'sass-loader'
          }
        ]
      }
    ]
  }
}
