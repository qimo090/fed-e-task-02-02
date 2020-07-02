const webpack = require('webpack')
const path = require('path')
const merge = require('webpack-merge')
// 引入公共配置
const common = require('./webpack.common')

const resolve = dir => path.resolve(__dirname, dir)

module.exports = merge(common, {
  mode: 'development',
  devtool: 'cheap-module-source-map',
  devServer: {
    hot: true,
    contentBase: './public',
    port: 8080,
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin()
  ]
})
