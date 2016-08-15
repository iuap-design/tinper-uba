var fs = require('fs');
var fse = require('fs-extra');

/**
 * 清空dist目录
 * @return {[type]} [description]
 */
module.exports = function(){
	var tragetPath = fs.realpathSync('.');
	if (!fs.existsSync(tragetPath + "/dist")){
		fs.mkdirSync(tragetPath + "/dist");
	}
	var distList = fs.readdirSync(tragetPath + "/dist");
	distList.forEach(function(item){
		fse.removeSync(tragetPath + "/dist/" + item);
	});
};
