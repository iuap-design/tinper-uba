'use strict';

var path = require('path');
var fs = require('fs');
var webpack = require('webpack');
var HtmlwebpackPlugin = require('html-webpack-plugin');
var ExtractTextPlugin = require("extract-text-webpack-plugin");
var OpenBrowserPlugin = require('open-browser-webpack-plugin');
var help = require('../lib/help');

module.exports = (param) => {
    var ubaConfig = help.getUbaConfig();
    var config = {
        devtool: "eval",
        entry: [require.resolve("webpack-dev-server/client") + "?/", require.resolve("webpack/hot/dev-server"), ubaConfig.devEntry],
        output: {
            path: "/",
            pathinfo: true,
            filename: "static/js/bundle.js",
            publicPath: '/'
        },
        externals: {
            //"jquery": true,
            // require("jquery") 是引用自外部模块的
            // 对应全局变量 jQuery
            //"jQuery": true
        },
        resolve: {
            extensions: [".js", ".json", ""]
        },
        module: {
            loaders: [{
                test: /\.css$/,
                loader: ExtractTextPlugin.extract("style", "css")
            }, {
                test: /\.js$/,
                loader: "babel-loader?presets[]=es2015",
                exclude: /node_modules/
            }, {
                test: /\.json$/,
                loader: "json"
            }, {
                test: /\.(htm|html)$/i,
                loader: 'html-withimg-loader'
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
                    warnings: false
                }
            }),
            new HtmlwebpackPlugin({
                template: path.resolve('src/index.html'),
                inject: true
            }),
            new webpack.HotModuleReplacementPlugin(),
            new ExtractTextPlugin("static/css/[name].[contenthash:8].css"),
            new OpenBrowserPlugin({
                url: `http://127.0.0.1:${param.port}`
            }),
            new webpack.ProvidePlugin(ubaConfig.devProvidePlugin)
        ]
    }
    config.module.loaders = config.module.loaders.concat(ubaConfig.devLoader);
    return config;
}
