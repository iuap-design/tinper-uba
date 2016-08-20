#!/usr/bin/env node

'use strict';

var fs = require('fs');
var path = require('path');
var spawn = require('cross-spawn');
var chalk = require('chalk');
var argv = require('minimist')(process.argv.slice(2));
var pathExists = require('path-exists');
var commands = argv._;

if(commands.length === 0) {
	if(argv.version) {
		console.log(chalk.magenta('*****************************************'));
		console.log(chalk.magenta('	uba version: ' + require('./package.json').version));
		console.log(chalk.magenta('*****************************************'));
		process.exit();
	}
	if(argv.help) {
		console.log(chalk.cyan('Welcome to uba help!'));
		console.log(chalk.magenta('******************************************************************'));
		console.log(chalk.green('1. $ uba init <Project name>   		init iuap design project'));
		console.log(chalk.green('2. $ uba build    			build iuap design project'));
		console.log(chalk.green('3. $ uba start				startup a web develop server'));
		console.log(chalk.green('4. $ uba test				run test'));
		console.log(chalk.green('5. $ uba --version			view current version'));
		console.log(chalk.green('6. $ uba --help				view help'));
		console.log(chalk.magenta('******************************************************************'));
		process.exit();
	}

	console.log(chalk.red('Usage: uba init <project-directory>'));
	console.log(chalk.magenta('********************************************************'));
	console.log(chalk.cyan('uba tips:	 $uba --help'));
	console.log(chalk.magenta('********************************************************'));

	process.exit(1);
}

switch (commands[0]){
	case 'init':
		if(commands[1]===undefined){
			console.log(chalk.magenta('********************************************************'));
			console.log(chalk.cyan('command error! tips : uba init uba-demo'));
			console.log(chalk.magenta('********************************************************'));
			break;
		}
		createApp(commands[1]);
		break;
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
				console.log(chalk.magenta('********************************************************'));
				console.log(chalk.red('run build error ! Please run in the uba Project folder'));
				console.log(chalk.magenta('********************************************************'));
			}
		});
		break;
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
				console.log(chalk.magenta('********************************************************'));
				console.log(chalk.red('run server error ! Please run in the uba Project folder'));
				console.log(chalk.magenta('********************************************************'));
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
				console.log(chalk.magenta('********************************************************'));
				console.log(chalk.red('run test error ! Please run in the uba Project folder'));
				console.log(chalk.magenta('********************************************************'));
			}
		});
		break;
	default:
		console.log(chalk.magenta('********************************************************'));
		console.log(chalk.cyan('command error! tips : uba --help'));
		console.log(chalk.magenta('********************************************************'));
		break;
}



function createApp(name) {
	var root = path.resolve(name);
	if(!pathExists.sync(name)) {
		fs.mkdirSync(root);
	} else {
		console.log(chalk.red('The directory `' + name + '` contains file(s) that could conflict. Aborting.'));
		process.exit(1);
	}

	var appName = path.basename(root);
	console.log(
		'Creating a new uba template in ' + root + '.'
	);
	console.log();

	var packageJson = {
		name: appName,
		version: '0.0.1',
		private: true
	};
	fs.writeFileSync(
		path.join(root, 'package.json'),
		JSON.stringify(packageJson, null, 2)
	);
	process.chdir(root);

	console.log(chalk.cyan('Installing packages. This might take a couple minutes.'));
	console.log(chalk.cyan('Installing uba-scripts from npm...'));
	console.log();

	run(root, appName);
}

function run(root, appName) {
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
		var scriptsPath = path.resolve(
			process.cwd(),
			'node_modules',
			'uba-scripts',
			'scripts',
			'init.js'
		);
		var init = require(scriptsPath);
		init(root, appName);
	});
}