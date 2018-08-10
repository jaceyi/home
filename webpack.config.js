const path = require('path');

module.exports = {
  mode: 'production',
  devtool: 'inline-source-map',
  resolve: {
    extensions: ['.ts', '.js', '.json']
  },
  entry: './ts/index.ts',
  module: {
    rules: [{
      test: /\.ts$/,
      use: 'ts-loader',
      exclude: /node_modules/
    }]
  },
  output: {
    filename: 'home_app.js',
    path: path.resolve(__dirname)
  }
};
