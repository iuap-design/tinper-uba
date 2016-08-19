var REACT_APP = /^REACT_APP_/i;
var NODE_ENV = JSON.stringify(process.env.NODE_ENV || 'development');

module.exports = Object
	.keys(process.env)
	.filter(key => REACT_APP.test(key))
	.reduce((env, key) => {
		env['process.env.' + key] = JSON.stringify(process.env[key]);
		return env;
	}, {
		'process.env.NODE_ENV': NODE_ENV
	});