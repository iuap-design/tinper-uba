#!/usr/bin/env node

'use strict';

const fs = require('fs-extra');
const path = require('path');
const chalk = require('chalk');
const spawn = require('cross-spawn');
const argv = require('minimist')(process.argv.slice(2));
const pathExists = require('path-exists');
const commands = argv._;

if (commands.length === 0) {
    if (argv.version || argv.v) {
        console.log(require('./package.json').version);
        process.exit(0);
    }
    if (argv.help || argv.h) {
        help();
    }
    help();
}

switch (commands[0]) {
    case 'init':
        var name = null;
        if (commands[1]) {
            name = commands[1];
        } else {
            help();
        }
        var pkg = {
            "name": name,
            "private": true,
            "version": "0.0.1",
            "dependencies": {},
            "devDependencies": {}
        };
        var root = path.resolve(name);
        if (!pathExists.sync(name)) {
            fs.mkdirSync(root);
        } else {
            console.log(chalk.red(`当前文件夹 ${name}  已经存在了，当前操作终止.`));
            process.exit(1);
        }
        fs.writeFile(path.resolve('.', `./${name}/package.json`), JSON.stringify(pkg, null, 4), (err) => {
            if (err) throw err;
        });
        process.chdir(path.resolve('.', `./${name}`));
        console.log('正在执行操作，请等待.');
        var args = [
            'install',
            '--save',
            'uba-init'
        ].filter(function(e) {
            return e;
        });
        var proc = spawn('npm', args, {
            stdio: 'inherit'
        });
        proc.on('close', function(code) {
            if (code !== 0) {
                console.error('`npm ' + args.join(' ') + '` failed');
                return;
            }
            var scriptsPath = path.resolve(
                process.cwd(),
                'node_modules',
                'uba-init',
                'lib',
                'init.js'
            );
            var init = require(scriptsPath);
            init(name);
        });

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
        require('../lib/page')(name);
        break;
    default:
        help.error('命令不正确!');
        break;
}


function help() {
    console.log();
    console.log(chalk.green('1. uba init <project name>   		初始化创建web工程'));
    console.log(chalk.green('2. uba server -p 3000   		运行当前web工程并调试'));
    console.log(chalk.green('3. uba page <myPage>   			添加页面'));
    console.log(chalk.green('4. uba build				产出全部静态资源'));
    console.log(chalk.green('5. uba publish				发布war包到maven'));
    console.log(chalk.green('6. uba --version			显示当前uba工具版本'));
    console.log(chalk.green('7. uba --help				查看帮助'));
    console.log();
    process.exit(1);
}
