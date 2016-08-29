const webpack = require('webpack');
var config = require('../config/webpack.config.prod');
const help = require('../lib/help');


module.exports = () => {
	console.log('Creating an optimized production build...');
	webpack(config()).run((err, stats) => {
		if(err) {
			help.error('构建静态资源失败');
			console.error(err.message || err);
			process.exit(1);
		}
		help.info('构建静态资源成功！位于当前目录build下.');
	});
}