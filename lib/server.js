'use strict';
const chalk = require('chalk');
const help = require('./help');
const webpack = require('webpack');
const webpackDevServer = require("webpack-dev-server");
var config = require("../config/webpack.config.dev");
const mockServer = require('./mockServer');

module.exports = (port) => {
	var ubaConfig = help.getUbaConfig();
	mockServer();
	var compiler = webpack(config({
		port: port
	}));
	var server = new webpackDevServer(compiler, {
		historyApiFallback: true,
		hot: true,
		inline: true,
		progress: true,
		proxy: ubaConfig.devProxy
	});
	server.listen(port, () => {
		help.info(`服务开启成功! http://127.0.0.1:${port}`);
	});
}