const path = require('path')
const webpack = require('webpack')

const banner =
`
Mathboard
http://github.com/ianlucas/mathboard

by Ian Lucas
Released under the MIT license.
`

module.exports = {
  entry: './src/index',

  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'Mathboard.js',
    library: 'Mathboard',
    libraryTarget: 'umd',
    libraryExport: 'default'
  },

  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader'
        }
      }
    ]
  },

  devServer: {
    contentBase: path.resolve(__dirname, 'test'),
    compress: false,
    disableHostCheck: true
  },

  plugins: [new webpack.BannerPlugin(banner)]
}