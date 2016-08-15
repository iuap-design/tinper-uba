var argv = require('yargs');

var init = require('./init');
var build = require('./build');
var publish = require('./publish');
var server = require('./server');

/**
 * 执行 `uba` 命令
 * @return {[type]} [description]
 */
module.exports = function(){

	argv
		.command('init', 'init iuap design project', function(){
			init();
		})
		.command('build', 'build iuap design project', function () {
			build();
		})
		.command('publish', 'publish iuap design project', function () {
			publish();
		})
		.command('server', 'startup a web server', function(yargs){
			argv = yargs.option('p', {
						alias: 'port',
						description: 'server port'
					})
					.example('uba server -p 8080', 'start server on port 8080')
					.option('m', {
						alias: 'module',
						description: 'module name, only multi-project use'
					})
					.example('uba server -m hr', 'start server with module hr')
					.help('h')
					.alias('h', 'help')
					.argv;
			server(argv.p, argv.m);
		})
		.help('h')
		.alias('h', 'help')
		.version('1.0.1')
		.alias('v', 'version')
		.argv;
};
