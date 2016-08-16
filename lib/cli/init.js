var readline = require('readline');
var copyProject = require('../copyProject');

/**
 * 执行初始化项目
 * @return {[type]} [description]
 */
module.exports = function(){
	var _name = '';
	var _desc = '';

	process.stdout.write('project name:');
	process.stdin.resume();
	process.stdin.setEncoding('utf-8');
	process.stdin.once('data', function(name) {

		_name =  name.toString().trim();

		readline.clearLine();
		readline.cursorTo(0);
		process.stdout.write('description:');
		process.stdin.resume();

		process.stdin.once('data', function(desc) {
			_desc = desc.toString().trim();
			readline.clearLine();
			readline.cursorTo(0);

			copyProject({
				name: _name,
				desc: _desc,
				type: 's' //data
			});
			process.exit();
		});
	});
}
