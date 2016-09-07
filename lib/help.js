/**
 * 命令相关
 */

'use strict';

const chalk = require('chalk');
const path = require('path');
const fs = require('fs');

module.exports = {
	help: () => {
		console.log();
		console.log(chalk.green('1. uba init <project name>   		初始化创建web工程'));
		console.log(chalk.green('2. uba server -p 3000   		运行当前web工程并调试'));
		console.log(chalk.green('3. uba build				产出全部静态资源'));
		console.log(chalk.green('4. uba publish				发布war包到maven'));
		console.log(chalk.green('5. uba --version			显示当前uba工具版本'));
		console.log(chalk.green('6. uba --help				查看帮助'));
		console.log();
		process.exit();
	},
	version: () => {
		console.log();
		console.log(chalk.green('当前版本:v' + require('../package.json').version));
		console.log();
		process.exit();
	},
	info: (msg) => {
		console.log();
		console.log(chalk.cyan("信息 : " + msg));
		console.log();
	},
	error: (msg) => {
		console.log();
		console.log(chalk.red("错误 : " + msg));
		console.log();
	},
	merge: (destination, source) => {
		for(property in source) {
			destination[property] = source[property];
		}
		return destination;
	},
	getUbaConfig: () => {
		var configUrl = path.resolve('.','uba.config.js'),
		configJson = null;
		if(fs.existsSync(configUrl)){
			configJson = require(configUrl);
			return configJson;
		}else{
			console.log('找不到uba.config.js文件.');
			process.exit(0);
		}
	}
}