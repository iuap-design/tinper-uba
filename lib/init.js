/**
 * Module : uba init module
 * Author : Kvkens(yueming@yonyou.com)
 * Date	  : 2016-12-29 08:54:51
 * Update : 2016-12-30 10:51:44
 */


const request = require('request');
const chalk = require('chalk');
const help = require('./help');
const inquirer = require('inquirer');
const path = require('path');
const pathExists = require('path-exists');
const fs = require('fs');
const download = require('download-git-repo');
const spawn = require('cross-spawn');


module.exports = () => {
    help.info("正在加载请稍后...");
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
            requestBody.forEach(function(repo, index) {
                // console.log(
                //     (index + 1) + ')' + '  ' + chalk.yellow('★') +
                //     '  ' + chalk.blue(repo.name) +
                //     ' - ' + repo.description);
                repoNameData.push(`${repo.name} - ${repo.description}`);
            });
            //TODO 人机交互
            inquirer.prompt([{
                type: 'list',
                name: 'selectRepo',
                message: '选择在线最佳实践：',
                choices: repoNameData
            }]).then(function(answers) {
                var selectName = answers.selectRepo.split(' - ')[0];
                //console.log(chalk.green(`已选择[${selectName}]`));
                var questions = [{
                    type: 'input',
                    name: 'selectName',
                    message: '最佳实践目录名称：',
                    default: function() {
                        return 'uba-boilerplate';
                    }
                }];
                inquirer.prompt(questions).then(function(answers) {
                    var name = answers.selectName,
                        template = selectName;
                    var root = path.resolve(name);
                    if (!pathExists.sync(name)) {
                        fs.mkdirSync(root);
                    } else {
                        help.error(`当前工程 ${name}  已存在，当前操作终止.`);
                        process.exit(0);
                    }
                    help.info(`开始下载 ${template} 最佳实践模板请稍等...`);
                    //TODO 开始下载
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
                            console.error(requestBody.message);
                        }
                    });
                });
            });



        }
    });
}
