#!/usr/bin/env node

/**
 * Module : uba boots
 * Author : Kvkens(yueming@yonyou.com)
 * Date	  : 2016-10-13 19:51:37
 * Update : 2016-10-13 19:51:43
 */

'use strict';

const path = require('path');
const chalk = require('chalk');
const spawn = require('cross-spawn');
const argv = require('minimist')(process.argv.slice(2));
const commands = argv._;
const currentPath = path.resolve('.');
const help = require('../lib/help');


if (commands.length === 0) {
    if (argv.version || argv.v) {
        console.log(require('../package.json').version);
    } else {
        help.help();
    }
    process.exit(0);
}

switch (commands[0]) {
    case 'init':
        const init = require('../lib/init');
        init(commands);
        break;
    case 'list':
        const list = require('../lib/list');
        list();
        break;
    case 'server':
        var port = 3000;
        if (argv.p !== undefined && !isNaN(argv.p) && argv.p !== true) {
            port = argv.p;
        }
        const server = require('../lib/server');
        server(port);
        break;
    case 'build':
        const build = require('../lib/build');
        build();
        break;
    case 'publish':
        const publish = require('../lib/publish');
        publish();
        break;
    case 'page':
        var name = null;
        if (commands[1]) {
            name = commands[1];
        } else {
            help.help();
        }
        const page = require('../lib/page');
        page(name);
        break;
    default:
        console.log(chalk.red('命令不正确!'));
        break;
}
