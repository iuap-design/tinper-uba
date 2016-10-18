/**
 * Module : helper
 * Author : Kvkens(yueming@yonyou.com)
 * Date	  : 2016-10-13 19:58:42
 * Update : 2016-10-13 19:58:48
 */

'use strict';

const chalk = require('chalk');
const path = require('path');
const fs = require('fs');

module.exports = {
    help: () => {
        // console.log();
        console.log(chalk.green('1. uba init <template-name> <project-name>   Generate best practices'));
        console.log(chalk.green('2. uba list   		                     List available official templates'));
        console.log(chalk.green('3. uba server   		             Start develop server'));
        console.log(chalk.green('4. uba page <my-page>   		     Add Page'));
        console.log(chalk.green('5. uba build				     Build static resource'));
        console.log(chalk.green('6. uba publish				     Publish war to Maven'));
        console.log(chalk.green('7. uba --version or -v		   	     Version'));
        console.log(chalk.green('8. uba --help or -h			     Help'));
        // console.log();
        process.exit(1);
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
