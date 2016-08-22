/**
 * module : Uba-Scripts uba publish
 * author : Kvkens(yueming@yonyou.com)
 * update : 2016-08-22 13:20:05
 */
const gulp = require('gulp');
const zip = require('gulp-zip');
const chalk = require('chalk');

gulp.src('./build/**').pipe(zip('build.war')).pipe(gulp.dest('./'));
console.log(chalk.yellow('publish success! build.war'));