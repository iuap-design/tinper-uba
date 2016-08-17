var fs = require('fs');
var WebpackDevServer = require("webpack-dev-server");
var webpack = require("webpack");
var tragetPath = fs.realpathSync('.');
var webpackConfig;
var serverConfig = require.resolve( '../../config/webpack-dev-server.config');
var iwebConfig = require.resolve('../../config/iweb.config');
var getWebpackConfig = require('../getWebpackConfig');

/**
 * 本地server
 * @param  {[type]} port       [description]
 * @param  {[type]} moduleName [description]
 * @return {[type]}            [description]
 */
module.exports = function( port, moduleName ){

	var port = port || '8080';

	webpackConfig = getWebpackConfig('development');
	var compiler = webpack(webpackConfig);

	//处理proxy中的ctx
	if (serverConfig['proxy']){
		var proxy = serverConfig['proxy'];
		var webContext = iwebConfig['webContext'];
		for (var key in proxy){
			if (key.indexOf('_webContext_') != -1){
				var newKey = key.replace('_webContext_', webContext);
				proxy[newKey] = proxy[key]
				delete proxy[key];
			}
		}
	}

	var server = new WebpackDevServer(compiler, serverConfig);
	var server = new WebpackDevServer(compiler, serverConfig);
	var mockServerConf = iwebConfig['mockServer'];

	if (mockServerConf){
		var bodyParser = require('body-parser');
		server.app.use( bodyParser.json() );
		// to support JSON-encoded bodies
		server.app.use(bodyParser.urlencoded({
			// to support URL-encoded bodies
			extended: true
		}));
	}

	if (mockServerConf){
		if ( mockServerConf['dispatchUrl']){
			var dispatchUrl =mockServerConf['dispatchUrl'];
			server.app.post(dispatchUrl, function(req, res){
				var ctrl = req.body.ctrl;
				var method = req.body.method;
				ctrl = ctrl.replace(/\./g, '/');
				var mockFile = require(tragetPath + '/mock/' + ctrl + '/' + method + '.json');

				res.end(JSON.stringify(mockFile));
			});
		}
		if (mockServerConf['requestMapping']){
			mockServerConf['requestMapping'].forEach(function(reqConf){
				server.app[reqConf['type']](reqConf['url'], function(req,res){
					var mockFile = require(tragetPath + '/mockData/' + reqConf['json'])
					res.end(JSON.stringify(mockFile));
				})
			});
		}

	}

	server.listen(port, "localhost", function() { });

	console.log("server start success!")
}
