/**
 * Module : uba init
 * Author : Kvkens(yueming@yonyou.com)
 * Date	  : 2016-10-14 13:56:11
 * Update : 2016-10-18 11:07:27
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
        help.error('uba init 参数不正确！\n语法:uba init iuap name\n提示:uba list 查询更多最佳实践.');
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
    console.log(chalk.yellow(`提示:开始下载 ${template} 最佳实践模板请稍等.`));
    download(help.getInitGithubRepo(template), `${name}`, function(err) {
        if (!err) {
            console.log(chalk.cyan(`最佳实践 ${name} 创建完毕.请执行 'cd ${name} && npm install' 进行安装.`));
        } else {
            help.error(`最佳实践下载失败，请检查最佳实践名字是否正确或网络错误.\n提示:执行 uba list 查看最新官方最佳实践.`);
        }
    });

}
