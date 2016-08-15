var fs = require('fs');

/**
 * 获取webpack配置对象
 * @param  {[type]} mode       [description]
 * @param  {[type]} moduleName [description]
 * @return {[type]}            [description]
 */
module.exports = function(mode, moduleName){
	var tragetPath = fs.realpathSync('.');
	var iwebHome = tragetPath + "/iweb_home";
	var webpackConfigName = 'webpack.config';

  //build单一项目
	if (!fs.existsSync(iwebHome)){
		try {
			var webpackConfig = require(tragetPath + '/config/'+webpackConfigName).getConfig(mode);
		}catch (e){
			console.error(e)
		}
		var iwebConfigPath = tragetPath + "/config/iweb.config.js";
		//var _config = JSON.parse(fs.readFileSync(iwebConfigPath, 'utf8'));
		var _config =  require(iwebConfigPath); //JSON.parse(fs.readFileSync(iwebConfigPath, 'utf8'));
		mergeWebpackConfig(webpackConfig, _config, tragetPath);
	}
	//多模块项目
	else{
		var modulesPath = iwebHome + "/modules";
		var webpackConfigFunc = require(iwebHome + '/config/'+webpackConfigName);
		var modulePath = modulesPath + "/" + moduleName;
		var compList = fs.readdirSync(modulePath);
		//组织webpack配置文件
		var webpackConfig = webpackConfigFunc.getConfig(mode);
		//console.log(webpackConfig.entry);
		compList.forEach(function (compName) {
			var configPath = modulePath + "/" + compName + "/iweb.config.js";
			if (fs.existsSync(configPath)) {
				//var _config = JSON.parse(fs.readFileSync(configPath, 'utf8'));
				var _config =  require(configPath); //JSON.parse(fs.readFileSync(configPath, 'utf8'));
				mergeWebpackConfig(webpackConfig, _config, modulesPath, moduleName, compName);
			}
		});


	}

	return webpackConfig;
}
