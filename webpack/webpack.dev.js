const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const commonPaths = require('./paths');

module.exports = {
  mode: 'development',
  output: {
    filename: '[name].js',
    path: commonPaths.outputPath,
    chunkFilename: '[name].js',
    publicPath: '/',
  },
  module: {
    rules: [
      {
        // css module
        test: /\.module\.(css|scss)$/,
        use: [
          {
            loader: MiniCssExtractPlugin.loader,
            options: {
              hmr: true,
            },
          },
          {
            loader: 'css-loader',
            options: {
              sourceMap: true,
              modules: true,
              camelCase: true,
              localIdentName: '[local]___[hash:base64:5]',
            },
          },
          {
            loader: 'sass-loader',
            options: {
              includePaths: [commonPaths.styleSheetPath],
            },
          },
        ],
      },
      {
        // regular stylesheet
        test: /\.(css|scss)$/,
        exclude: /\.module\.(css|scss)$/,
        use: [
          {
            loader: MiniCssExtractPlugin.loader,
            options: {
              hmr: true,
            },
          },
          'css-loader',
          'postcss-loader',
          {
            loader: 'sass-loader',
            options: {
              includePaths: [commonPaths.styleSheetPath],
            },
          },
        ],
      },
    ],
  },
  devServer: {
    contentBase: commonPaths.outputPath,
    historyApiFallback: true,
    compress: true,
    hot: true,
    disableHostCheck: true,
    proxy: {
      '/api': {
        target: 'http://localhost:8000',
        changeOrigin: true,
        secure: false,
      },
    },
  },
  devtool: '#source-map',
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new HtmlWebpackPlugin({
      template: commonPaths.templatePath,
    }),
    new MiniCssExtractPlugin({
      filename: '[name].css',
      chunkFilename: '[id].css',
    }),
  ],
};
