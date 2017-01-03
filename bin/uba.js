#!/usr/bin/env node

const path = require('path');
const chalk = require('chalk');
const argv = require('minimist')(process.argv.slice(2));
const commands = argv._;
const help = require('../lib/help');

if (commands.length === 0) {
    if (argv.version || argv.v) {
        console.log(chalk.green(require('../package.json').version));
    } else if (argv.help || argv.h) {
        help.help();
    } else {
        const init = require('../lib/init');
        init();
    }
} else {
    switch (commands[0]) {
        case 'init':
            require('../lib/quick')(commands);
            break;
        default:
            break;
    }
}
