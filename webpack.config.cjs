const webpack = require('webpack');

module.exports = {
  // 1
  entry: './src/client/index.js',
  module: {
    rules: [
      {
        test: /\.(js)$/,
        exclude: /node_modules/,
        use: ['babel-loader'],
      },
    ],
  },
  resolve: {
    extensions: ['*', '.js'],
  },
  // 2
  output: {
    path: `${__dirname}/client/dist`,
    publicPath: '/',
    filename: 'bundle.js',
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
  ],
  // 3
  devServer: {
    contentBase: './src/client/dist',
    hot: true,
  },
};
