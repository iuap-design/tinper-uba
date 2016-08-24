/**
 * module : Uba-Scripts uba init
 * author : Kvkens(yueming@yonyou.com)
 * update : 2016-08-24 08:40:09
 */

var fs = require('fs-extra');
var path = require('path');
var spawn = require('cross-spawn');
var pathExists = require('path-exists');
var chalk = require('chalk');

module.exports = function(appPath, appName) {
	var ownPath = path.join(appPath, 'node_modules', 'uba-scripts');

	var appPackage = require(path.join(appPath, 'package.json'));
	var ownPackage = require(path.join(ownPath, 'package.json'));

	// Copy over some of the devDependencies
	appPackage.dependencies = appPackage.dependencies || {};
	appPackage.devDependencies = appPackage.devDependencies || {};
	[].forEach(function(key) {
		appPackage.dependencies[key] = ownPackage.devDependencies[key];
	});
	[].forEach(function(key) {
		appPackage.devDependencies[key] = ownPackage.devDependencies[key];
	});

	// Setup the script rules
	appPackage.scripts = {};
	['start', 'build', 'test','publish-maven'].forEach(function(command) {
		appPackage.scripts[command] = 'uba-scripts ' + command;
	});

	// explicitly specify ESLint config path for editor plugins
	appPackage.eslintConfig = {
		//extends: './node_modules/uba-scripts/config/eslint.js',
	};

	fs.writeFileSync(
		path.join(appPath, 'package.json'),
		JSON.stringify(appPackage, null, 2)
	);


	// Copy the files for the user
	fs.copySync(path.join(ownPath, 'template'), appPath);

	fs.move(path.join(appPath, 'gitignore'), path.join(appPath, '.gitignore'), [], function(err) {
		if(err) {
			if(err.code === 'EEXIST') {
				var data = fs.readFileSync(path.join(appPath, 'gitignore'));
				fs.appendFileSync(path.join(appPath, '.gitignore'), data);
				fs.unlinkSync(path.join(appPath, 'gitignore'));
			} else {
				throw err;
			}
		}
	});

	// Run another npm install for react and react-dom
	console.log(chalk.yellow('Installing package from npm...'));
	console.log();
	var args = [
		'install'
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

		console.log();
		console.log(chalk.green('Success! Created ' + appName + ' at ' + appPath + '.'));
		console.log('Inside that directory, you can run several commands:');
		console.log();
		console.log('  * uba start: Starts the development server.');
		console.log('  * uba build: Bundles the app into static files for production.');
		console.log();
		console.log('We suggest that you begin by typing:');
		console.log();
		console.log('  cd', appName + ' && uba start');
		console.log();
		console.log('uba say: Success  :) ');
	});
};