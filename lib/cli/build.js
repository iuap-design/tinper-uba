var fs = require('fs');
var gulp=require('gulp');
var syncModule = require('../syncModule');
var cleanDistDir = require('../cleanDistDir');
var getWebpackConfig = require('../getWebpackConfig');

/**
 * 前端资源构建
 * @param  {[type]} mode [description]
 * @return {[type]}      [description]
 */
module.exports = function( mode ){
	mode = mode || 'production';
	var tragetPath = fs.realpathSync('.');
	var iwebHome = tragetPath + "/iweb_home";

	cleanDistDir();

	//build单一项目
	if (!fs.existsSync(iwebHome)){
		var webpackConfig = getWebpackConfig(mode);
		var gulpConfig = require(tragetPath + '/config/gulp.config');
		gulpConfig(gulp, webpackConfig);
		gulp.start('default');
	}
	//多模块项目
	else{
		//同步当前模块工程到iwebhome中
		syncModule();
		var modulesPath = iwebHome + "/modules";

		var moduleList = fs.readdirSync(modulesPath);
		var gulpConfig = require(iwebHome + '/config/gulp.config');

		moduleList.forEach(function(moduleName){
			var webpackConfig = getWebpackConfig(mode);

			gulpConfig(gulp, webpackConfig);
			gulp.start('default');

		});
	}
};
