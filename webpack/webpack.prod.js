const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const commonPaths = require('./paths');

module.exports = {
  mode: 'production',
  output: {
    filename: '[name].[hash].js',
    path: commonPaths.outputPath,
    chunkFilename: '[name].[chunkhash].js',
    publicPath: '/',
  },
  module: {
    rules: [
      {
        // css module
        test: /\.module\.(css|scss)$/,
        use: [
          MiniCssExtractPlugin.loader,
          {
            loader: 'css-loader',
            options: {
              sourceMap: false,
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
          MiniCssExtractPlugin.loader,
          'css-loader',
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
  plugins: [
    new HtmlWebpackPlugin({
      template: commonPaths.templatePath,
    }),
    new CleanWebpackPlugin([commonPaths.outputPath.split('/').pop()], {
      root: commonPaths.root,
    }),
    new MiniCssExtractPlugin({
      filename: `${commonPaths.cssFolder}/[name].[chunkhash].css`,
      chunkFilename: '[name].[chunkhash].css',
    }),
  ],
  devtool: 'source-map',
};
