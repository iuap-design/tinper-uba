var fs = require('fs');
var fse = require('fs-extra');

/**
 * 同步工程到iweb_home中
 * @return {[type]} [description]
 */
module.exports = function(){
	var tragetPath = fs.realpathSync('.');
	var dirList = fs.readdirSync(tragetPath);

	dirList.forEach(function(project){
		if (fs.lstatSync(tragetPath + '/' + project).isFile()) return;
		if (project === 'dist' || project === 'iweb_home') return;

		//业务组件
		var projectPath = tragetPath + '/' + project;
    var compList = fs.readdirSync(projectPath);

		fse.removeSync(tragetPath + '/iweb_home/modules/' + project);
		compList.forEach(function(compName){
			var compPath = projectPath + "/" + compName;

			// 只有存在iweb.config.json文件，才会被做为组件
			if (fs.existsSync(compPath + '/iweb.config.js')){
				fse.copySync(compPath, tragetPath + '/iweb_home/modules/' + project + '/' + compName);
			}
		});
    
	});
};
