/**
 * Module : helper
 * Author : Kvkens(yueming@yonyou.com)
 * Date	  : 2016-10-13 19:58:42
 * Update : 2016-12-29 08:44:13
 */

'use strict';

const chalk = require('chalk');
const path = require('path');
const fs = require('fs');

module.exports = {
    help: () => {
        console.log(chalk.green('1. uba init                  Generate best practices'));
        console.log(chalk.green('2. uba --help or -h	     Help'));
    },
    version: () => {
        console.log();
        console.log(chalk.green('当前版本:v' + require('../package.json').version));
        console.log();
        process.exit();
    },
    info: (msg) => {
        console.log();
        console.log(chalk.cyan("信息:" + msg));
        console.log();
    },
    error: (msg) => {
        // console.log();
        console.log(chalk.red("错误:" + msg));
        // console.log();
    },
    merge: (destination, source) => {
        for (let property in source) {
            destination[property] = source[property];
        }
        return destination;
    },
    getInitGithubRepo: (repo) => {
        var _ut = 'uba-templates/',
            _repo;
        if (repo.indexOf('/') !== -1) {
            _repo = repo;
        } else {
            _repo = _ut + repo;
        }
        return _repo;
    },
    getUbaConfig: () => {
        var configUrl = path.resolve('.', 'uba.config.js'),
            configJson = null;
        if (fs.existsSync(configUrl)) {
            configJson = require(configUrl);
            return configJson;
        } else {
            console.log(chalk.red('找不到uba.config.js文件.'));
            process.exit(0);
        }
    }
}
