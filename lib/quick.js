/**
 * Module : uba quick
 * Author : Kvkens(yueming@yonyou.com)
 * Date	  : 2017-01-03 13:44:29
 * Update : 2017-01-03 13:44:35
 */

const path = require('path');
const pathExists = require('path-exists');
const fs = require('fs-extra');
const chalk = require('chalk');
const download = require('download-git-repo');
const request = require('request');
const help = require('./help');
const inquirer = require('inquirer');
const spawn = require('cross-spawn');

module.exports = (commands) => {
    if (commands.length !== 3) {
        help.error(' uba init 命令不正确.');
        process.exit(0);
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
        help.error(`当前文件夹 ${name}  已经存在了，当前操作终止.`);
        process.exit(0);
    }
    help.info(`开始下载 ${template} 最佳实践模板请稍等.`);
    download(help.getInitGithubRepo(template), `${name}`, function(err) {
        if (!err) {
            help.info(`最佳实践 ${name} 创建完毕.`);
            inquirer.prompt([{
                type: 'confirm',
                message: '是否自动安装npm依赖包',
                name: 'ok'
            }]).then(function(res) {
                var npmInstallChdir = path.resolve('.', name);
                if (res.ok) {
                    help.info(`开始安装npm依赖包请稍等...`);
                    //TODO 选择自动安装
                    process.chdir(npmInstallChdir);
                    var args = ['install'].filter(function(e) {
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
                        help.info(`自动安装完毕.`);
                    });

                } else {
                    help.error(`取消自动安装npm依赖包，请手动执行npm install.`);
                }

            });

        } else {
            help.error(`最佳实践下载失败，请检查最佳实践名字是否正确或网络错误.`);
        }
    });

}
