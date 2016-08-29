/**
 * 初始化模板
 */
'use strict';

const fs = require('fs-extra');
const path = require('path');
const pathExists = require('path-exists');
const chalk = require('chalk');
const help = require('./help');

module.exports = (name) => {
	var appPackage = {
		name: name,
		version: '0.0.1',
		private: true
	};
	var root = path.resolve(name);
	if(!pathExists.sync(name)) {
		fs.mkdirSync(root);
	} else {
		help.error('当前文件夹`' + name + '` 已经存在了，当前操作终止.');
		process.exit(1);
	}
	fs.copySync(path.join(__dirname, '/../boilerplate'), root);
	fs.renameSync(path.join(root,'/gitignore'),path.join(root,'.gitignore'));
	help.info(name + " 创建成功，位于 " + root + " 目录下.");
	
}