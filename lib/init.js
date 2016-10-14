/**
 * Module : uba init
 * Author : Kvkens(yueming@yonyou.com)
 * Date	  : 2016-10-14 13:56:11
 * Update : 2016-10-14 13:56:16
 */

const path = require('path');
const pathExists = require('path-exists');
const fs = require('fs-extra');
const chalk = require('chalk');
const download = require('download-git-repo');
const request = require('request');
const help = require('./help');

module.exports = (commands) => {
    if (commands.length !== 3) {
        console.log(chalk.red('uba init 参数不正确！\n例：uba init iuap name\nuba list 查询更多最佳实践.'));
        process.exit(1);
    }
    var name = null,
        template = null;
    if (commands[1]) {
        template = commands[1];
        name = commands[2];
    } else {
        help.help();
    }

    var root = path.resolve(name);
    if (!pathExists.sync(name)) {
        fs.mkdirSync(root);
    } else {
        console.log(chalk.red(`当前文件夹 ${name}  已经存在了，当前操作终止.`));
        process.exit(1);
    }
    console.log(chalk.yellow(`开始下载 ${template} 请稍等.`));
    download(help.getInitGithubRepo(template), `${name}`, function(err) {
        if (!err) {
            console.log(chalk.cyan(`最佳实践 ${name} 创建完毕.请执行 'cd ${name} && npm install' 进行安装.`));
        } else {
            console.log(chalk.red(`最佳实践下载失败，请检查最佳实践名字是否正确或网络错误.`));
        }
    });

}
