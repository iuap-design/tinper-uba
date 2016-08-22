#!/usr/bin/env node

/**
 * module : Uba-cli
 * author : Kvkens(yueming@yonyou.com)
 * update : 2016-08-22 10:43:21
 */

'use strict';

var fs = require('fs');
var path = require('path');
var spawn = require('cross-spawn');
var chalk = require('chalk');
var argv = require('minimist')(process.argv.slice(2));
var pathExists = require('path-exists');
var commands = argv._;

/*
 * 检测输入命令参数
 * uba --version
 * uba --help
 */
if(commands.length === 0) {
	if(argv.version || argv.v) {
		console.log(chalk.yellow('uba version: ' + require('./package.json').version));
		process.exit();
	}
	if(argv.help || argv.h) {
		console.log();
		console.log(chalk.green('1. $ uba init <Project name>   		init iuap design project'));
		console.log(chalk.green('2. $ uba build    			build iuap design project'));
		console.log(chalk.green('3. $ uba start				startup a web develop server'));
		console.log(chalk.green('4. $ uba test				run test'));
		console.log(chalk.green('5. $ uba --version or -v		view current version'));
		console.log(chalk.green('6. $ uba --help or -h			view help'));
		console.log();
		process.exit();
	}
	console.log(chalk.yellow('uba tips : uba --help'));
	process.exit(1);
}

/*
 * 接收命令参数
 * uba init demo
 * uba start
 * uba build
 * uba test
 * uba publish
 */
switch (commands[0]){
	/*
	 * 创建工程
	 */
	case 'init':
		if(commands[1] === undefined){
			console.log(chalk.red('command error! tips : uba init uba-demo'));
			break;
		}
		createApp(commands[1]);
		break;
	/*
	 * 产出静态资源
	 */
	case 'build':
		var args = [
			'run',
			'build'
		].filter(function(e) {
			return e;
		});
		var proc = spawn('npm', args, {
			stdio: 'inherit'
		});
		proc.on('close', function(code) {
			if(code!==0){
				console.log(chalk.red('run build error ! Please run in the uba Project folder'));
			}
		});
		break;
	/*
	 * 开始运行调试服务器
	 */	
	case 'start':
		var args = [
			'start'
		].filter(function(e) {
			return e;
		});
		var proc = spawn('npm', args, {
			stdio: 'inherit'
		});
		proc.on('close', function(code) {
			if(code!==0){
				console.log(chalk.red('run server error ! Please run in the uba Project folder'));
			}
		});
		break;
	case 'test' :
		var args = [
			'run',
			'test'
		].filter(function(e) {
			return e;
		});
		var proc = spawn('npm', args, {
			stdio: 'inherit'
		});
		proc.on('close', function(code) {
			if(code!==0){
				console.log(chalk.red('run test error ! Please run in the uba Project folder'));
			}
		});
		break;
	case 'publish':
		var args = [
			'run',
			'publish'
		].filter(function(e) {
			return e;
		});
		var proc = spawn('npm', args, {
			stdio: 'inherit'
		});
		proc.on('close', function(code) {
			if(code!==0){
				console.log(chalk.red('run publish error ! Please run in the uba Project folder'));
			}
		});
		break;
	default:
		console.log(chalk.red('command error! tips : uba --help'));
		break;
}
/**
 * 根据名字来创建web工程
 * @param {Object} name
 */
function createApp(name) {
	var root = path.resolve(name);//判断当前名字的项目是否存在
	if(!pathExists.sync(name)) {
		fs.mkdirSync(root);
	} else {
		console.log(chalk.red('The directory `' + name + '` contains file(s) that could conflict. Aborting.'));
		process.exit(1);
	}
	//开始创建工程
	var appName = path.basename(root);
	console.log();
	console.log(chalk.yellow('Creating a new uba template in ' + root + '.'));
	console.log();
	//产出临时package.json用于项目初始化占位
	var packageJson = {
		name: appName,
		version: '0.0.1',
		private: true
	};
	//写入文件
	fs.writeFileSync(
		path.join(root, 'package.json'),
		JSON.stringify(packageJson, null, 2)
	);
	//切换项目根目录
	process.chdir(root);
	console.log(chalk.cyan('Installing packages. This might take a couple minutes.'));
	console.log(chalk.cyan('Installing uba-scripts from npm...'));
	console.log();
	//生成基本的空项目后进行init构建初始化工作
	run(root, appName);
}
/**
 * 初始化web工程
 * @param {Object} root
 * @param {Object} appName
 */
function run(root, appName) {
	//需要执行的命令`npm install uba-scripts --save-dev`
	var args = [
		'install',
		'uba-scripts',
		'--save-dev'
	].filter(function(e) {
		return e;
	});
	var proc = spawn('npm', args, {
		stdio: 'inherit'
	});
	proc.on('close', function(code) {
		if(code !== 0) {
			console.error('`npm ' + args.join(' ') + '` failed');
			return;
		}
		//拿到要init的路径
		var scriptsPath = path.resolve(
			process.cwd(),
			'node_modules',
			'uba-scripts',
			'scripts',
			'init.js'
		);
		//找到创建后的node_modules下uba-scripts/script/init.js
		var init = require(scriptsPath);
		init(root, appName);
	});
}