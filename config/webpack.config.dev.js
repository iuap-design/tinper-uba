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
        devtool: "source-map",
        entry: {
            index: [require.resolve("webpack-dev-server/client") + "?/", require.resolve("webpack/hot/dev-server"), ubaConfig.entry],
            vendor: ubaConfig.vendor
        },
        output: {
            path: "/",
            pathinfo: true,
            filename: "js/[name].bundle.js",
            publicPath: '/',
            chunkFilename: "vendor/[id].js"
        },
        externals: {

        },
        resolve: {
            extensions: [".js", ".json", ""],
            alias: {

            }
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
                inject: true,
                hash: false
            }),
            new webpack.HotModuleReplacementPlugin(),
            new ExtractTextPlugin("static/css/[name].[contenthash:8].css"),
            new OpenBrowserPlugin({
                url: `http://127.0.0.1:${param.port}`
            }),
            new webpack.optimize.CommonsChunkPlugin({
                names: ['vendor']
            })
            //new webpack.ProvidePlugin(ubaConfig.devProvidePlugin)
        ]
    }
    config.output = help.merge(config.output, ubaConfig.devOutput);
    config.externals = help.merge(config.externals, ubaConfig.externals);
    config.resolve.alias = help.merge(config.resolve.alias, ubaConfig.alias);
    config.module.loaders = config.module.loaders.concat(ubaConfig.loaders);
    return config;
}
