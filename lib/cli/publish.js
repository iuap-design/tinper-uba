var getWebpackConfig = require('../getWebpackConfig');
var gulp = require('gulp');

/**
 * 将代码发布到 `maven`
 * @return {[type]} [description]
 */
module.exports = function(){
	var targetPath = fs.realpathSync('.');
	var webpackConfig = getWebpackConfig('production');
	var gulpConfig = require(targetPath + '/config/gulp.config');

	gulpConfig(gulp, webpackConfig);
	gulp.start('war');

	var iwebConfig = require(targetPath + '/config/iweb.config');
	var publishConfig = iwebConfig.publish;

	var installCommandStr = publishConfig.command + " install:install-file -Dfile="+ targetPath+"/dist.war   -DgroupId="+ publishConfig.groupId +" -DartifactId="+ publishConfig.artifactId +"  -Dversion="+ publishConfig.version +" -Dpackaging=war";
	var process = require('child_process');
	var installWarProcess =	process.exec(installCommandStr, function(err,stdout,stderr){
		if(err) {
			console.log('install war error:'+stderr);
		}
	});
	installWarProcess.stdout.on('data',function(data){
		console.info(data);
	});
	installWarProcess.on('exit',function(data){
		console.info('intall  war success');

		var publishCommandStr =  publishConfig.command + " deploy:deploy-file  -Dfile="+ targetPath+"/dist.war   -DgroupId="+ publishConfig.groupId +" -DartifactId="+ publishConfig.artifactId +"  -Dversion="+ publishConfig.version +" -Dpackaging=war  -DrepositoryId="+ publishConfig.repositoryId +" -Durl=" +publishConfig.repositoryURL;
		console.info(publishCommandStr);
		var publishWarProcess =	process.exec(publishCommandStr, function(err,stdout,stderr){
			if(err) {
				console.log('publish war error:'+stderr);
			}
		});

		publishWarProcess.stdout.on('data',function(data){
			console.info(data);
		});
		publishWarProcess.on('exit',function(data){
			console.info('publish  war success');
		});

	});
};
