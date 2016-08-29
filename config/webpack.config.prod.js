'use strict';
const path = require("path");
const webpack = require("webpack");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const ExtractTextPlugin = require("extract-text-webpack-plugin");
const fs = require('fs');

module.exports = () => {
	var ubaConfig = JSON.parse(fs.readFileSync(path.resolve('.', 'uba.config.js')));
	var config = {
		bail: true,
		devtool: "source-map",
		entry: [ubaConfig.buildEntry],
		output: {
			path: ubaConfig.buildOutPath,
			filename: "static/js/[name].[chunkhash:8].js",
			chunkFilename: "static/js/[name].[chunkhash:8].chunk.js",
			publicPath: '/'
		},
		resolve: {
			extensions: [".js", ".json", ""]
		},
		module: {
			loaders: [{
				test: /\.js$/,
				loader: "babel-loader?presets[]=es2015",
				exclude: /node_modules/
			}, {
				test: /\.css$/,
				//include: [paths.appSrc],
				loader: ExtractTextPlugin.extract("style", "css")
			}, {
				test: /\.json$/,
				loader: "json"
			}, {
				test: /\.(ico|jpg|png|gif|eot|svg|ttf|woff|woff2)(\?.*)?$/,
				exclude: /\/favicon.ico$/,
				loader: "file",
				query: {
					name: "static/media/[name].[hash:8].[ext]"
				}
			}]
		},
		externals: {
			// require("jquery") 是引用自外部模块的
			// 对应全局变量 jQuery
			//"jquery": true,
			//"knockout" : "knockout",
			//"director":"director",
			//"polyfill":"polyfill",
			//"bdtpl" : "bdtpl",
			//"text":"text",
			//"text!js/menumgr/menulist.html" : "text!js/menumgr/menulist.html"
		},
		plugins: [new HtmlWebpackPlugin({
			inject: true,
			template: path.resolve('src/entries/index.html'),
			minify: {
				removeComments: true,
				collapseWhitespace: true,
				removeRedundantAttributes: true,
				useShortDoctype: true,
				removeEmptyAttributes: true,
				removeStyleLinkTypeAttributes: true,
				keepClosingSlash: true,
				minifyJS: true,
				minifyCSS: true,
				minifyURLs: true
			}
		}), new webpack.optimize.OccurrenceOrderPlugin(), new webpack.optimize.DedupePlugin(), new webpack.optimize.UglifyJsPlugin({
			compress: {
				screw_ie8: true,
				warnings: false
			},
			mangle: {
				screw_ie8: true
			},
			output: {
				comments: false,
				screw_ie8: true
			}
		}), new ExtractTextPlugin("static/css/[name].[contenthash:8].css")]
	}
	return config;
}