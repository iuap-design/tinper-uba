'use strict';
const help = require('./help');
const gulp = require('gulp');
const zip = require('gulp-zip');

module.exports = () => {
	gulp.src('build/**')
			.pipe(zip('publish.war'))
			.pipe(gulp.dest('publish'));
	help.info('执行发布成功！publish.war发布在publish文件夹内.');
}