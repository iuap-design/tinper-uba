/**
 * Module : uba webpack build
 * Author : Kvkens(yueming@yonyou.com)
 * Date	  : 2016-10-13 19:51:37
 * Update : 2016-10-18 14:41:34
 */

'use strict';
const path = require("path");
const webpack = require("webpack");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const ExtractTextPlugin = require("extract-text-webpack-plugin");
const fs = require('fs');
const help = require('../lib/help');

module.exports = () => {
    var ubaConfig = help.getUbaConfig();
    var config = {
            bail: true,
            entry: {
                index: [ubaConfig.index]
            },
            output: {
                path: "build",
                filename: "static/js/[name].[chunkhash:8].js",
                chunkFilename: "static/js/[name].[chunkhash:8].chunk.js",
                publicPath: './'
            },
            resolve: {
                extensions: [".js", ".json", ""],
                alias: {}
            },
            module: {
                loaders: [{
                    test: /\.(js|jsx)$/,
                    loader: 'babel',
                    query: {
                        presets: ['es2015', 'react']
                    },
                    exclude: /node_modules/
                }, {
                    test: /\.css$/,
                    loader: ExtractTextPlugin.extract("style", "css")
                }, {
                    test: /\.json$/,
                    loader: "json"
                }, {
                    test: /\.(htm|html)$/i,
                    loader: 'html-withimg-loader'
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
                //"jquery": true
            },
            plugins: [
              new HtmlWebpackPlugin({
                    inject: true,
                    template: path.resolve('src/index.html'),
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
                }),
                new webpack.optimize.OccurrenceOrderPlugin(),
                new webpack.optimize.DedupePlugin(),
                new webpack.optimize.UglifyJsPlugin({
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
                }),
                new ExtractTextPlugin("static/css/[name].[contenthash:8].css"),
                new HtmlWebpackPlugin({
                    template: 'html-withimg-loader!' + path.resolve('./src/', 'index.html'),
                    filename: 'index.html'
                }),
                new webpack.optimize.CommonsChunkPlugin({
                    names: ['vendor']
                }),
                new webpack.ProvidePlugin(ubaConfig.ProvidePlugin)
            ]
        }
        // config.resolve.alias = help.merge(config.resolve.alias, ubaConfig.alias);
        // config.module.loaders = config.module.loaders.concat(ubaConfig.loaders);

    config.output = help.merge(config.output, ubaConfig.buildOutput);
    config.entry = help.merge(config.entry, ubaConfig.entry);
    config.externals = help.merge(config.externals, ubaConfig.externals);
    config.resolve.alias = help.merge(config.resolve.alias, ubaConfig.alias);
    config.module.loaders = config.module.loaders.concat(ubaConfig.loaders);
    return config;
}
