const webpack = require('webpack');
const path = require('path');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  entry: {
    app: './src/client/index.js',
  },
  module: {
    rules: [
      {
        test: /\.(js)$/,
        use: ['babel-loader'],
      },
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader'],
      },
      {
        test: /\.s[ac]ss$/i,
        use: [
          'style-loader',
          'css-loader',
          'sass-loader',
        ],
      },
      {
        test: /\.(png|jpe?g|gif)$/,
        use: [{ loader: 'file-loader' }],
      },
      {
        test: /\.(woff)?$/,
        use: [
          {
            loader: 'file-loader',
            options: {
              name: '[name].[ext]',
              outputPath: 'fonts/',
            },
          },
        ],
      },
    ],
  },
  resolve: {
    extensions: ['.png', '.js', '.css', '.scss'],
  },
  plugins: [
    new CleanWebpackPlugin(),
    new HtmlWebpackPlugin({
      template: './src/client/index.html',
      title: 'Red Tetris',
      favicon: './src/client/favicon.ico',
      meta: { charset: 'UTF-8' },
      filename: './index.html',
    }),
    new webpack.EnvironmentPlugin({
      NODE_ENV: 'development', // use 'development' unless process.env.NODE_ENV is defined
      DEBUG: false,
    }),
  ],
  output: {
    path: path.resolve(__dirname, 'src/client/dist'),
    filename: 'bundle.js',
  },
};
