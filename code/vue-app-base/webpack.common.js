const webpack = require('webpack')
const path = require('path')

const { CleanWebpackPlugin } = require('clean-webpack-plugin')
const { VueLoaderPlugin } = require('vue-loader')
const HtmlWebpackPlugin = require('html-webpack-plugin')
// const MiniCssExtractPlugin = require('mini-css-extract-plugin')

const resolve = dir => path.resolve(__dirname, dir)

module.exports = {
  entry: './src/main.js',
  output: {
    filename: 'js/[name].[hash:8].js',
    path: resolve('dist'),
  },
  optimization: {
    splitChunks: {
      cacheGroups: {
        vendors: {
          name: 'chunk-vendors',
          test: /[\\/]node_modules[\\/]/,
          priority: -10,
          chunks: 'initial',
        }
      },
    }
  },
  module: {
    rules: [
      // vue
      { test: /\.vue$/, use: 'vue-loader' },
      // js
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env'],
          },
        },
      },
      {
        enforce: 'pre',
        test: /\.(vue|js)$/,
        exclude: /node_modules/,
        use: 'eslint-loader'
      },
      // less
      {
        test: /\.less$/,
        use: [
          'vue-style-loader',
          'css-loader',
          'less-loader',
        ],
      },
      // css
      {
        test: /\.css$/,
        use: ['vue-style-loader', 'css-loader'],
      },
      // images
      {
        test: /\.(png|jpe?g|gif)$/,
        use: [
          {
            loader: 'url-loader',
            options: {
              esModule: false,
              limit: 4096,
              name: 'img/[name].[hash:8].[ext]',
            },
          },
        ],
      },
    ],
  },
  plugins: [
    new CleanWebpackPlugin(),
    new VueLoaderPlugin(),
    new HtmlWebpackPlugin({
      template: resolve('public/index.html'),
      inject: 'body',
      title: 'vue app base',
    }),
    new webpack.DefinePlugin({
      BASE_URL: '"./"',
    }),
    // new MiniCssExtractPlugin({
    //   filename: 'css/[name].[contenthash:8].css',
    //   chunkFilename: 'css/[name].[contenthash:8].css',
    // }),
  ],
}
