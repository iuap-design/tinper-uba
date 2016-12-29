/**
 * Module : uba init module
 * Author : Kvkens(yueming@yonyou.com)
 * Date	  : 2016-12-29 08:54:51
 * Update : 2016-12-29 08:54:55
 */

const request = require('request');
const chalk = require('chalk');
const help = require('./help');
const inquirer = require('inquirer');
const path = require('path');
const pathExists = require('path-exists');
const fs = require('fs');
const download = require('download-git-repo');


module.exports = () => {
    var repoNameData = [];
    request({
        url: 'https://api.github.com/users/uba-templates/repos',
        headers: {
            'User-Agent': 'uba'
        }
    }, function(err, res, body) {
        if (err) console.log(err);
        var requestBody = JSON.parse(body);
        if (Array.isArray(requestBody)) {
            console.log('uba 在线最佳实践如下：');
            console.log();
            requestBody.forEach(function(repo, index) {
                console.log(
                    (index + 1) + ')' + '  ' + chalk.yellow('★') +
                    '  ' + chalk.blue(repo.name) +
                    ' - ' + repo.description);
                repoNameData.push(repo.name);
            });
            console.log();

            var questions = [{
                type: 'input',
                name: 'selectNO',
                message: '请输入编号来选择最佳实践：',
                validate: function(value) {
                    var pass = value.match(/\d/);
                    if (pass) {
                        return true;
                    }

                    return '请输入正确数字编号来选择';
                }
            }, {
                type: 'input',
                name: 'selectName',
                message: '最佳实践目录名称：',
                default: function() {
                    return 'uba-boilerplate';
                }
            }];

            inquirer.prompt(questions).then(function(answers) {
                var name = answers.selectName,
                    template = repoNameData[answers.selectNO - 1];

                // console.log(repoNameData[answers.selectNO - 1]);
                var root = path.resolve(name);
                if (!pathExists.sync(name)) {
                    fs.mkdirSync(root);
                } else {
                    console.log(chalk.red(`当前文件夹 ${name}  已经存在了，当前操作终止.`));
                    process.exit(1);
                }
                console.log(chalk.yellow(`提示:开始下载 ${template} 最佳实践模板请稍等...`));
                download(help.getInitGithubRepo(template), `${name}`, function(err) {
                    if (!err) {
                        console.log(chalk.cyan(`最佳实践 ${name} 创建完毕.请执行 'cd ${name} && npm install' 进行安装.`));
                    } else {
                        help.error(`最佳实践下载失败，请检查最佳实践名字是否正确或网络错误.\n提示:执行 uba list 查看最新官方最佳实践.`);
                    }
                });
            });
        } else {
            console.error(requestBody.message);
        }
    });




}
