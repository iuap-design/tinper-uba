var path = require('path');
var webpack = require("webpack");
var ExtractTextPlugin = require("extract-text-webpack-plugin");


module.exports = {
    getConfig: function(mode){
        var plugins = [
            //提公用js到vendor.js文件中
            new webpack.optimize.CommonsChunkPlugin('vendor', 'vendor-[chunkhash:8].js'),

            ////使用 ProvidePlugin 加载使用率高的依赖库
            new webpack.ProvidePlugin({
               jQuery: 'jquery',
               $: 'jquery',
               'window.jQuery': 'jquery'
            })
        ];

        //var entry = {index: './src/index2', vendor: ['jquery', 'bootstrap']},
        var entry = {vendor: ['uui']},
            buildPath = "/../dist";

        var debug, outputFileName, outputChunkFileName, outputCssFileName,devtool;
        //开发态发产品态有差异的配置
        if (mode === 'development'){
            debug = true;
            outputFileName = '[name].js';
            outputChunkFileName = '[name].chunk.js';
            outputCssFileName = '[name].css';
            devtool= '#cheap-module-eval-source-map';  //'#source-map';
        }else{
            debug = false;
            outputFileName = '[name]-[chunkhash:8].js';
            outputChunkFileName = '[name].chunk.[chunkhash:8].js';
            outputCssFileName = '[name]-[chunkhash:8].css';
            plugins.push(
                //压缩资源文件
                new webpack.optimize.UglifyJsPlugin({
                    compress: {
                        //supresses warnings, usually from module minification
                        warnings: false
                    }
                })
            );
        }

        plugins.push(
            //将样式统一发布到style.css中
            new ExtractTextPlugin(outputCssFileName, {
                allChunks: true,
                disable: false
            })
        );

        return {
            debug: debug,
            profile:true,
            colors: true,
            'display-modules': true,
            entry: entry,
            output: {
                path: __dirname + buildPath,
                filename: outputFileName,
                //filename: '[name].js',
                publicPath: '',
                chunkFilename: outputChunkFileName //给require.ensure用
            },
            //externals:{
            //    'react':'window.React',
            //    'react-dom':'window.ReactDOM'
            //},
            module: {
                //noParse:[/trd/],
                loaders: [
                    //{ test: /\.js[x]?$/, exclude: /(node_modules|trd)/, loaders:['react-hot','babel-loader?presets[]=es2015&presets[]=react&cacheDirectory=true']},
                    { test: /\.js[x]?$/, exclude: /(node_modules|vendor)/, loaders:['babel-loader?presets[]=es2015&cacheDirectory=true']},
                    {
                        test: /\.css$/,
                        loader: ExtractTextPlugin.extract("style-loader", "css-loader?sourceMap!cssnext-loader")
                        //loader: ExtractTextPlugin.extract("style-loader", "css-loader")
                        //loader: "style!css?sourceMap"
                    },
                    {
                        test: /\.(jpg|png|gif)$/,
                        loader: "file-loader?name=images/[name].[hash].[ext]"
                    },
                    {
                        test: /\.woff(\?v=\d+\.\d+\.\d+)?$/,
                        loader: "url?limit=10000&mimetype=application/font-woff"
                    }, {
                        test: /\.woff2(\?v=\d+\.\d+\.\d+)?$/,
                        loader: "url?limit=10000&mimetype=application/font-woff"
                    }, {
                        test: /\.ttf(\?v=\d+\.\d+\.\d+)?$/,
                        loader: "url?limit=10000&mimetype=application/octet-stream"
                    }, {
                        test: /\.eot(\?v=\d+\.\d+\.\d+)?$/,
                        loader: "file"
                    }, {
                        test: /\.svg(\?v=\d+\.\d+\.\d+)?$/,
                        loader: "url?limit=10000&mimetype=image/svg+xml"
                    },

                    {
                        test: /\.json$/,
                        loader: 'json'
                    }],
                //preLoaders: [{
                //  test: /\.js$/,
                //  loader: "require-css-preloader"
                //}]
            },
            resolve: {
                //require时省略的扩展名，如：require('module') 不需要module.js
                extension: ['', '.js', '.css'],
                //别名
                alias: {
                    uui: path.join(__dirname, '../vendor/uui/js/u'),
                    jquery: path.join(__dirname, '../vendor/jquery/jquery-1.11.2.min'),
                    knockout: path.join(__dirname, '../vendor/knockout/knockout-3.1.0')
                }
            },
            plugins: plugins,
            devtool: devtool
        }

    }

};
