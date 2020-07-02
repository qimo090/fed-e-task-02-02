const merge = require('webpack-merge')
const CopyWebpackPlugin = require('copy-webpack-plugin')

const common = require('./webpack.common')

module.exports = merge(common, {
  mode: 'production',
  plugins: [
    new CopyWebpackPlugin({
      patterns: [ { from: 'public' }]
    })
  ]
})