var path = require("path");
var autoprefixer = require("autoprefixer");
var webpack = require("webpack");
var HtmlWebpackPlugin = require("html-webpack-plugin");
var CaseSensitivePathsPlugin = require("case-sensitive-paths-webpack-plugin");
var WatchMissingNodeModulesPlugin = require("../scripts/utils/WatchMissingNodeModulesPlugin");
var paths = require("./paths");
var env = require("./env");
module.exports = {
	devtool: "eval",
	entry: [require.resolve("webpack-dev-server/client") + "?/", require.resolve("webpack/hot/dev-server"), /* require.resolve("./polyfills"), */ path.join(paths.appSrc, "index")],
	output: {
		path: paths.appBuild,
		pathinfo: true,
		filename: "static/js/bundle.js",
		publicPath: "/"
	},
	resolve: {
		extensions: [".js", ".json", ""],
		alias: {}
	},
	resolveLoader: {
		root: paths.ownNodeModules,
		moduleTemplates: ["*-loader"]
	},
	module: {
		preLoaders: [],
		loaders: []
	},
	plugins: [new HtmlWebpackPlugin({
		inject: true,
		template: paths.appHtml,
	}), new webpack.DefinePlugin(env), new webpack.HotModuleReplacementPlugin(), new CaseSensitivePathsPlugin(), new WatchMissingNodeModulesPlugin(paths.appNodeModules)]
};