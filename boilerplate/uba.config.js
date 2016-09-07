/**
 * uba config
 */
module.exports = {
	//开发调试模式入口
	"devEntry": "./src/index.js",
	//调试webpack loader添加.
	//如果自定义添加在这里，还需要npm install来安装依赖的Loader. npm install less less-loader --save
	"devLoader": [{
		test: /\.less$/,
		loader: 'style!css!less'
	}],
	//执行构建的入口
	"buildEntry": "./src/index.js",
	//设置代理
	"devProxy": {
		'/api/**': {
			target: 'http://127.0.0.1:9000',
			secure: false
		}
	},
	//模拟数据服务器配置.按照下面配置将会在本机创建web服务进行模拟远程服务器测试.
	"mockServer": {
		//协议建议http.
		"protocol": "http",
		//本机地址
		"host": "127.0.0.1",
		//本地端口，不要和webpack-dev-server的端口相同.
		"port": 9000
	}
}