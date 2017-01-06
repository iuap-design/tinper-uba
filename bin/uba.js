#!/usr/bin/env node

const path = require('path');
const chalk = require('chalk');
const argv = require('minimist')(process.argv.slice(2));
const commands = argv._;
const help = require('../lib/help');
const init = require('../lib/init');

if (commands.length === 0) {
    if (argv.version || argv.v) {
        help.version();
    } else if (argv.help || argv.h) {
        help.help();
    } else {
        help.help();
    }
} else {
    switch (commands[0]) {
        case 'init':
            init();
            break;
        default:
            break;
    }
}
