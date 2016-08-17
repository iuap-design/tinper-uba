var fs = require('fs');

/**
 * 获取webpack配置对象
 * @param  {[type]} mode       [description]
 * @param  {[type]} moduleName [description]
 * @return {[type]}            [description]
 */
module.exports = function( mode ){

	if( mode == 'development') {
		var webpackConfig = require( '../config/webpack.config' )
	} else {
		var webpackConfig = require( '../config/webpack.config' )
	}

	return webpackConfig;
}
