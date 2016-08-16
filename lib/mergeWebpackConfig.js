var HtmlWebpackPlugin = require('html-webpack-plugin');
/**
 * 合并项目中的配置
 * @param  {[type]} webpackConfig [description]
 * @param  {[type]} iwebConfig    [description]
 * @param  {[type]} rootPath      [description]
 * @param  {[type]} moduleName    [description]
 * @param  {[type]} compName      [description]
 * @return {[type]}               [description]
 */
module.exports = function(webpackConfig,
  iwebConfig, rootPath, moduleName, compName ) {

	var template, filename;

	if (iwebConfig.entry){
		for (var key in iwebConfig.entry){
			var _path = iwebConfig.entry[key];
			if (_path.indexOf('./') === 0){
				_path = _path.substring(2,_path.length);
			}
			if (!moduleName && !compName)
				webpackConfig.entry[key] =rootPath + "/" +_path;
			else
				webpackConfig.resolve.alias[moduleName + '.' + compName + '.' + key] = rootPath + '/'+ moduleName + '/' + compName + '/'+ _path;
		}
	}
	if (iwebConfig.entryHtmlFiles){
		var htmlPlugins = [];
		iwebConfig.entryHtmlFiles.forEach(function(entryHtmlFile){
			var template = entryHtmlFile.template;
			var filename = entryHtmlFile.filename;
			if (template.indexOf('./') === 0){
				template = template.substring(2,_path.length);
			}

			if (!moduleName && !compName){
				template = rootPath + '/'+ template;
				filename =   filename;
			}else{
				template = rootPath + '/'+ moduleName + '/' + compName + '/'+ template;
				filename = "../" +  moduleName + '/' + compName + '/'+ filename;
			}

			var plugin = new HtmlWebpackPlugin({
				template: template,
				filename: filename,
				webContext:'/' + iwebConfig['webContext']
			});


			htmlPlugins.push(plugin);
		});
		webpackConfig.plugins = webpackConfig.plugins.concat(htmlPlugins);
	}
};
