var fs = require('fs');
var fse = require('fs-extra');

/**
 * copy 项目模板到当前工程目录
 * @param  {[type]} params [description]
 * @return {[type]}        [description]
 */
module.exports = function(params){
	var tragetPath  = fs.realpathSync('.');
	var sorcePath = __dirname;

	if (params.type == 's')
		sorcePath = sorcePath + '/../tpl/s' ;
	else
		sorcePath = sorcePath + '/../tpl/m' ;

	fse.copySync(sorcePath, tragetPath);
	var _package  = require(tragetPath + '/package.json');
	_package.name = params.name;
	_package.description = params.desc;

	fs.writeFileSync(tragetPath + '/package.json',
    JSON.stringify(_package, null,2),
    'utf8'
  );

	console.log('init success!');
};
