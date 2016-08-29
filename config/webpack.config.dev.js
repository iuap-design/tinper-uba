'use strict';

var path = require('path');
var fs = require('fs');
var webpack = require('webpack');
var HtmlwebpackPlugin = require('html-webpack-plugin');
var ExtractTextPlugin = require("extract-text-webpack-plugin");
var OpenBrowserPlugin = require('open-browser-webpack-plugin');

module.exports = (param) => {
	var ubaConfig = JSON.parse(fs.readFileSync(path.resolve('.', 'uba.config.js')));

	var config = {
		devtool: "eval",
		entry: [require.resolve("webpack-dev-server/client") + "?/", require.resolve("webpack/hot/dev-server"), ubaConfig.devEntry],
		output: {
			path: ubaConfig.devOutPath,
			pathinfo: true,
			filename: "static/js/bundle.js",
			publicPath: '/'
		},
		resolve: {
			extensions: [".js", ".json", ""]
		},
		module: {
			loaders: [{
				test: /\.css$/,
				//loader: "style-loader!css-loader",
				loader: ExtractTextPlugin.extract("style", "css")
			}, {
				test: /\.js$/,
				loader: "babel-loader?presets[]=es2015",
				exclude: /node_modules/
			}, {
				test: /\.json$/,
				loader: "json"
			}, {
				test: /\.(ico|jpg|png|gif|eot|svg|ttf|woff|woff2)(\?.*)?$/,
				loader: "file",
				query: {
					name: "static/media/[name].[hash:8].[ext]"
				}
			}]
		},
		plugins: [
			new webpack.optimize.UglifyJsPlugin({
				compress: {
					warnings: false,
				}
			}),
			new HtmlwebpackPlugin({
				template: path.resolve('src/entries/index.html'),
				inject: true
			}),
			new webpack.HotModuleReplacementPlugin(),
			new ExtractTextPlugin("static/css/[name].[contenthash:8].css"),
			new OpenBrowserPlugin({
				url: `http://localhost:${param.port}`
			})
		]
	}
	return config;
}