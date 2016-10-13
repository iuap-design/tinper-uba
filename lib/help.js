/**
 * 命令相关
 */

'use strict';

const chalk = require('chalk');
const path = require('path');
const fs = require('fs');

module.exports = {
    help: () => {
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
    },
    version: () => {
        console.log();
        console.log(chalk.green('当前版本:v' + require('../package.json').version));
        console.log();
        process.exit();
    },
    info: (msg) => {
        console.log();
        console.log(chalk.cyan("信息 : " + msg));
        console.log();
    },
    error: (msg) => {
        console.log();
        console.log(chalk.red("错误 : " + msg));
        console.log();
    },
    merge: (destination, source) => {
        for (let property in source) {
            destination[property] = source[property];
        }
        return destination;
    },
    getUbaConfig: () => {
        var configUrl = path.resolve('.', 'uba.config.js'),
            configJson = null;
        if (fs.existsSync(configUrl)) {
            configJson = require(configUrl);
            return configJson;
        } else {
            console.log('找不到uba.config.js文件.');
            process.exit(0);
        }
    }
}
