const path = require('path')
const webpack = require('webpack')

const banner =
`
MathJax Editor Keyboard
http://github.com/ianlucas/mathjax-editor-keyboard

by Ian Lucas
Released under the MIT license.
`

module.exports = {
  entry: './src/index',

  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'MathJaxEditorKeyboard.js',
    library: 'MathJaxEditorKeyboard',
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