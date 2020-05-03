const HtmlWebpackPlugin = require('html-webpack-plugin');

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
      {
        test: /\.css$/,
        exclude: /node_modules/,
        use: [
          'style-loader',
          'css-loader',
        ],
      },
      {
        test: /\.(woff(2)?|ttf|eot|svg)(\?v=\d+\.\d+\.\d+)?$/,
        exclude: /node_modules/,
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
      {
        test: /\.(png|jpe?g|gif)$/i,
        exclude: /node_modules/,
        use: [
          {
            loader: 'file-loader',
          },
        ],
      },
    ],
  },
  resolve: {
    extensions: ['.png', '.js', '.css', '.woff'],
  },
  // 2
  output: {
    path: `${__dirname}/src/client/dist`,
    publicPath: '/',
    filename: 'bundle.js',
  },
  plugins: [
    new HtmlWebpackPlugin({
      filename: './src/client/dist/index.html',
      favicon: './src/client/favicon.ico',
    }),
  ],
  // 3
  devServer: {
    contentBase: './src/client/dist',
    disableHostCheck: true,
    hot: true,
  },
};
