#!/usr/bin/env node

'use strict';

var fs = require('fs');
var path = require('path');
var spawn = require('cross-spawn');
var chalk = require('chalk');
var semver = require('semver');
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
		console.log(chalk.green('1. $ uba <project name>   		init iuap design project'));
		console.log(chalk.green('2. $ cd project && npm run build    	build iuap design project'));
		console.log(chalk.green('3. $ cd project && npm start		startup a web develop server'));
		console.log(chalk.green('4. $ uba --version'));
		console.log(chalk.green('5. $ uba --help'));
		console.log(chalk.magenta('******************************************************************'));
		process.exit();
	}

	console.log(chalk.red('Usage: uba <project-directory>'));
	console.log(chalk.magenta('******************************************************************'));
	console.log(chalk.magenta('uba tips:	 $uba --help'));
	console.log(chalk.magenta('******************************************************************'));

	process.exit(1);
}
switch (commands[0]){
	case 'init':
		if(commands[1]===undefined){
			console.log(chalk.red('command error! tips : uba init example'));
			break;
		}
		createApp(commands[0], argv.verbose, argv['scripts-version']);
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
			
		});
		break;
	default:
		console.log(chalk.red('command error! tips : uba --help'));
		break;
}
return;


function createApp(name, verbose, version) {
	var root = path.resolve(name);
	if(!pathExists.sync(name)) {
		fs.mkdirSync(root);
	} else if(!isGitHubBoilerplate(root)) {
		console.log('The directory `' + name + '` contains file(s) that could conflict. Aborting.');
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
	var originalDirectory = process.cwd();
	process.chdir(root);

	console.log('Installing packages. This might take a couple minutes.');
	console.log('Installing uba-scripts from npm...');
	console.log();

	run(root, appName, version, verbose, originalDirectory);
}

function run(root, appName, version, verbose, originalDirectory) {
	var args = [
		'install',
		verbose && '--verbose',
		'--save-dev',
		'--save-exact',
		getInstallPackage(version),
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

		checkNodeVersion();

		var scriptsPath = path.resolve(
			process.cwd(),
			'node_modules',
			'uba-scripts',
			'scripts',
			'init.js'
		);
		var init = require(scriptsPath);
		init(root, appName, verbose, originalDirectory);
	});
}

function getInstallPackage(version) {
	var packageToInstall = 'uba-scripts';
	var validSemver = semver.valid(version);
	if(validSemver) {
		packageToInstall += '@' + validSemver;
	} else if(version) {
		// for tar.gz or alternative paths
		packageToInstall = version;
	}
	return packageToInstall;
}

function checkNodeVersion() {
	var packageJsonPath = path.resolve(
		process.cwd(),
		'node_modules',
		'uba-scripts',
		'package.json'
	);
	var packageJson = require(packageJsonPath);
	if(!packageJson.engines || !packageJson.engines.node) {
		return;
	}

	if(!semver.satisfies(process.version, packageJson.engines.node)) {
		console.error(
			chalk.red(
				'You are currently running Node %s but uba requires %s.' +
				' Please use a supported version of Node.\n'
			),
			process.version,
			packageJson.engines.node
		);
		process.exit(1);
	}
}

function isGitHubBoilerplate(root) {
	var validFiles = [
		'.DS_Store', 'Thumbs.db', '.git', '.gitignore', 'README.md', 'LICENSE'
	];
	return fs.readdirSync(root)
		.every(function(file) {
			return validFiles.indexOf(file) >= 0;
		});
}