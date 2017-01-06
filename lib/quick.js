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
        help.error(' uba init bad');
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
        help.error(`directory ${name} already exists.`);
        process.exit(0);
    }
    help.info(`Downloading ${template} please wait.`);
    download(help.getInitGithubRepo(template), `${name}`, function(err) {
        if (!err) {
            help.info(`Boilerplate ${name} done.`);
            inquirer.prompt([{
                type: 'confirm',
                message: 'Automatically install NPM dependent packages?',
                name: 'ok'
            }]).then(function(res) {
                var npmInstallChdir = path.resolve('.', name);
                if (res.ok) {
                    help.info(`Install NPM dependent packages,please wait.`);
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
                        help.info(`NPM package installed.`);
                    });

                } else {
                    help.error(`Cancel the installation of NPM dependent package,please run npm install.`);
                }

            });
        } else {
            console.error(requestBody.message);
        }
    });

}
