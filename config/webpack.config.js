var path = require('path');
var fs = require('fs');
var webpack = require("webpack");
var htmlWebpackPlugin = require('html-webpack-plugin');
var ExtractTextPlugin = require("extract-text-webpack-plugin");
var temPath  = fs.realpathSync('.');

module.exports = {
  entry: path.join(temPath, 'src/index.js'),
  output: {
    path: path.join(temPath, 'dist'),
    filename: '[name].js'
  },
  module: {
    loaders: [
      {
        test: /\.js[x]?$/,
        loader: 'babel-loader'
      },
      {
          test: /\.css$/,
          loader: ExtractTextPlugin.extract("style-loader", "css-loader?sourceMap!cssnext-loader")
      },
      {
          test: /\.(jpg|png|gif)$/,
          loader: "file-loader?name=images/[name].[hash].[ext]"
      },
      {
          test: /\.woff(\?v=\d+\.\d+\.\d+)?$/,
          loader: "url?limit=10000&mimetype=application/font-woff"
      },
      {
          test: /\.woff2(\?v=\d+\.\d+\.\d+)?$/,
          loader: "url?limit=10000&mimetype=application/font-woff"
      },
      {
          test: /\.ttf(\?v=\d+\.\d+\.\d+)?$/,
          loader: "url?limit=10000&mimetype=application/octet-stream"
      },
      {
          test: /\.eot(\?v=\d+\.\d+\.\d+)?$/,
          loader: "file"
      },
      {
          test: /\.svg(\?v=\d+\.\d+\.\d+)?$/,
          loader: "url?limit=10000&mimetype=image/svg+xml"
      },
      {
          test: /\.json$/,
          loader: 'json'
      }
    ]
  },
  plugin: [
    new htmlWebpackPlugin({
      template: path.resolve(temPath, 'src/index.html'),
      path: 'index.html',
      inject: 'body'
    })
  ]
}
