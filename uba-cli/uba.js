#!/usr/bin/env node

'use strict';

const fs = require('fs-extra');
const path = require('path');
const chalk = require('chalk');
const spawn = require('cross-spawn');
const argv = require('minimist')(process.argv.slice(2));
const pathExists = require('path-exists');
const commands = argv._;
const currentPath = path.resolve('.');

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
            //释放最佳实践
            var boilerplatePath = path.resolve(
                process.cwd(),
                'node_modules',
                'uba-init',
                'boilerplate'
            );
            // process.exit(0);
            fs.copySync(boilerplatePath, path.resolve('.'));
            console.log(chalk.cyan(`初始化 ${name} 最佳实践生成完毕，请手动在项目内运行npm install来进行开发.`));
            //fs.renameSync(path.join(path.resolve('.'), '/gitignore'), path.join(path.resolve('.'), '.gitignore'));
            // let args = ['install'].filter(function(e) {
            //     return e;
            // });
            // let proc = spawn('npm', args, {
            //     stdio: 'inherit'
            // });
            // proc.on('close', function(code) {
            //     if (code !== 0) {
            //         console.error('`npm ' + args.join(' ') + '` failed');
            //         return;
            //     }
            //     console.log(`初始化 ${name} 成功并已经安装完相应依赖包. 执行 cd ${name} 进行开发操作`);
            // });
            // var scriptsPath = path.resolve(
            //     process.cwd(),
            //     'node_modules',
            //     'uba-init',
            //     'lib',
            //     'init.js'
            // );
            // var init = require(scriptsPath);
            // init(name);
        });

        break;
    case 'server':
        var port = 3000;
        if (argv.p !== undefined && !isNaN(argv.p) && argv.p !== true) {
            port = argv.p;
        }
        const server = require(path.resolve(process.cwd(), 'node_modules', 'uba-init', 'lib', 'server'));
        server(port);

        break;
    case 'build':
        const build = require(path.resolve(process.cwd(), 'node_modules', 'uba-init', 'lib', 'build'));
        build();
        break;
    case 'publish':
        const publish = require(path.resolve(process.cwd(), 'node_modules', 'uba-init', 'lib', 'publish'));
        publish();
        break;
    case 'page':
        var name = null;
        if (commands[1]) {
            name = commands[1];
        } else {
            help.help();
        }
        var page = require(path.resolve(process.cwd(), 'node_modules', 'uba-init', 'lib', 'page'));
        page(name);
        break;
    default:
        console.log(chalk.red('命令不正确!'));
        break;
}


function help() {
    console.log();
    console.log(chalk.green('1. uba init <project name>   		Initialization best practices'));
    console.log(chalk.green('2. uba server -p 3000   		Start develop server'));
    console.log(chalk.green('3. uba page <myPage>   			Add Page'));
    console.log(chalk.green('4. uba build				Start develop server'));
    console.log(chalk.green('5. uba publish				Publish war to Maven'));
    console.log(chalk.green('6. uba --version			Version'));
    console.log(chalk.green('7. uba --help				Help'));
    console.log();
    process.exit(1);
}
