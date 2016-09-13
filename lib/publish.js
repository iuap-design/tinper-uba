'use strict';
const help = require('./help');
const gulp = require('gulp');
const zip = require('gulp-zip');
const path = require('path');
const ubaConfig = path.resolve('.', './uba.config.js');
const publishConfig = require(ubaConfig).publish;
var targetPath = path.resolve('.', './publish/dist.war');

module.exports = () => {
    var installCommandStr = publishConfig.command + " install:install-file -Dfile=" + targetPath + "   -DgroupId=" + publishConfig.groupId + " -DartifactId=" + publishConfig.artifactId + "  -Dversion=" + publishConfig.version + " -Dpackaging=war";
    gulp.src('build/**')
        .pipe(zip('dist.war'))
        .pipe(gulp.dest('publish'));
    var process = require('child_process');
    var installWarProcess = process.exec(installCommandStr, function(err, stdout, stderr) {
        if (err) {
            console.log('install war error:' + stderr);
        }
    });
    installWarProcess.stdout.on('data', function(data) {
        console.info(data);
    });
    installWarProcess.on('exit', function(data) {
        console.info('install  war success');

        var publishCommandStr = publishConfig.command + " deploy:deploy-file  -Dfile=" + targetPath + "/dist.war   -DgroupId=" + publishConfig.groupId + " -DartifactId=" + publishConfig.artifactId + "  -Dversion=" + publishConfig.version + " -Dpackaging=war  -DrepositoryId=" + publishConfig.repositoryId + " -Durl=" + publishConfig.repositoryURL;

        var publishWarProcess = process.exec(publishCommandStr, function(err, stdout, stderr) {
            if (err) {
                console.log('publish war error:' + stderr);
            }
        });

        publishWarProcess.stdout.on('data', function(data) {
            console.info(data);
        });
        publishWarProcess.on('exit', function(data) {
            console.info('publish  war success');
        });

    });

    help.info('打包.war成功，并且成功发布到Maven.');
}
