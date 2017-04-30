const path = require('path')

const HtmlWebpackPlugin = require('html-webpack-plugin')
const UglifyJSPlugin = require('uglifyjs-webpack-plugin')
const HtmlWebpackPluginConfig = new HtmlWebpackPlugin({
  template: './app/index.html',
  filename: 'index.html',
  inject: 'body'
})

module.exports = {
  entry: './app/index.js',
  output: {
    path: path.resolve('./src/public/assets'),
    filename: 'index_bundle.js',
  },
  module: {
    loaders: [
      { 
        test: /\.js$/, 
        loader: 'babel-loader', 
        exclude: /node_modules/ 
      },
      {
        test: /\.css$/,
        use: ['css-loader' ],
      },
    ],
  },
  plugins: [
    HtmlWebpackPluginConfig,
    new UglifyJSPlugin(),
  ],
}