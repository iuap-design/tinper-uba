'use strict';
const chalk = require('chalk');
const help = require('./help');
const webpack = require('webpack');
const webpackDevServer = require("webpack-dev-server");
var config = require("../config/webpack.config.dev");


module.exports = (port) => {
	var compiler = webpack(config({port : port}));
	var server = new webpackDevServer(compiler, {
		historyApiFallback: true,
		hot: true,
		inline: true,
		progress: true
	});
	server.listen(port, () => {
		help.info(`服务开启成功! http://localhost:${port}`);
	});
}