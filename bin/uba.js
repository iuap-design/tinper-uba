#!/usr/bin/env node

'use strict';

const fs = require('fs');
const path = require('path');
const chalk = require('chalk');
const semver = require('semver');
const argv = require('minimist')(process.argv.slice(2));
const pathExists = require('path-exists');
const commands = argv._;
const help = require('../lib/help');
const init = require('../lib/init');
const server = require('../lib/server');
const build = require('../lib/build');
const publish = require('../lib/publish');


if(commands.length === 0) {
	if(argv.version || argv.v) {
		help.version();
	}
	if(argv.help || argv.h) {
		help.help();
	}
	help.help();
}

switch(commands[0]) {
	case 'init':
		var name = null;
		if(commands[1]) {
			name = commands[1];
		} else {
			help.help();
		}
		init(name);
		break;
	case 'server':
		var port = 3000;
		if(argv.p !== undefined && !isNaN(argv.p) && argv.p !== true) {
			port = argv.p;
		}
		server(port);
		break;
	case 'build':
		build();
		break;
	case 'publish':
		publish();
		break;
	default:
		help.red('命令不正确!');
		break;
}