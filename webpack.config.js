const webpack = require('webpack');

const banner =
`
MathJax Editor Keyboard
https://github.com/ianlucas/mathjax-editor-keyboard

(c) 2016, Ian Lucas.
Released under the MIT license
`;

module.exports = {
  entry: './src/MathJaxEditorKeyboard',

  output: {
    path: './dist',
    filename: 'MathJaxEditorKeyboard.js',
    library: 'MathJaxEditorKeyboard',
    libraryTarget: 'umd'
  },

  module: {
    loaders: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: 'babel-loader'
      }
    ]
  },

  plugins: [
    new webpack.BannerPlugin(banner)
  ]
};