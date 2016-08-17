var fs = require('fs');
var gulp = require('gulp');
var cleanDistDir = require('../cleanDistDir');
var getWebpackConfig = require('../getWebpackConfig');
var gulpConfig = require( '../../config/gulp.config' );

/**
 * 前端资源构建
 * @param  {[type]} mode [description]
 * @return {[type]}      [description]
 */
module.exports = function( mode ){

	mode = mode || 'development';

	var webpackConfig = getWebpackConfig(mode);

	gulpConfig(gulp, webpackConfig);
	gulp.start('default');
};
