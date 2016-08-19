#!/usr/bin/env node

var spawn = require('cross-spawn');
var script = process.argv[2];
var args = process.argv.slice(3);
var chalk = require('chalk');

switch(script) {
	case 'build':
	case 'start':
	case 'test':
		var result = spawn.sync(
			'node', [require.resolve('../scripts/' + script)].concat(args), {
				stdio: 'inherit'
			}
		);
		process.exit(result.status);
		break;
	default:
		console.log(chalk.cyan('Error script "' + script + '".'));
		console.log(chalk.cyan('Please you need to update uba $npm install uba-cli -g'));
		break;
}