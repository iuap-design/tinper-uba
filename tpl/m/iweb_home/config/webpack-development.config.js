var path = require('path');
var webpack = require("webpack");
var ExtractTextPlugin = require("extract-text-webpack-plugin");



var plugins = [
    //提公用js到common.js文件中
    //new webpack.optimize.CommonsChunkPlugin('vendor', 'vendor-[chunkhash:8].js'),
    //new webpack.optimize.CommonsChunkPlugin('common', 'common-[chunkhash:8].js'),


    //将样式统一发布到style.css中
    new ExtractTextPlugin("style.css", {
        allChunks: true,
        disable: false
    }),
    //压缩资源文件
    //new webpack.optimize.UglifyJsPlugin({
    //    compress: {
    //        //supresses warnings, usually from module minification
    //        warnings: false
    //    }
    //}),
    //代码热替换
    //new webpack.HotModuleReplacementPlugin()

    ////使用 ProvidePlugin 加载使用率高的依赖库
    //new webpack.ProvidePlugin({
    //    jQuery: 'jquery',
    //    $: 'jquery',
    //    'window.jQuery': 'jquery'
    //})
];

//var entry = {index: './src/index2', vendor: ['jquery', 'bootstrap']},
var entry = {},
    buildPath = "/../dist/res";
//编译输出路径
module.exports = {
    //debug: false,
    entry: entry,
    output: {
        path: __dirname + buildPath,
        filename: '[name].js',
        //filename: '[name].js',
        publicPath: '/ass/',
        chunkFilename: "[name].chunk.js" //给require.ensure用
    },

    //externals:{
    //    'react':'window.React',
    //    'react-dom':'window.ReactDOM'
    //},
    module: {
        loaders: [
            { test: /\.js[x]?$/, exclude: /(node_modules|assets)/, loaders:['react-hot','babel-loader?presets[]=es2015&presets[]=react&cacheDirectory=true']},
            {
                test: /\.css$/,
                loader: ExtractTextPlugin.extract("style-loader", "css-loader?sourceMap!cssnext-loader")
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
            jquery: path.join(__dirname, '../assets/jquery/jquery-1.11.2.min'),
            knockout: path.join(__dirname, '../assets/knockout/knockout-3.1.0')
        }
    },
    plugins: plugins,
    //devtool: '#source-map'
};