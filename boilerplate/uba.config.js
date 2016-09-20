/**
 * uba config
 */
module.exports = {
    //webpack入口
    "entry": "./src/index.js",
    //调试webpack loader添加.
    //如果自定义添加在这里，还需要npm install来安装依赖的Loader. npm install less less-loader --save
    "loaders": [{
        test: /\.less$/,
        loader: 'style!css!less'
    }],
    //引用第三方单独打包加载配置
    "vendor": ['./vendor/director/director','./vendor/jquery/jquery'],
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
    },
    "publish": {
        command: "mvn",
        repositoryId: "iWeb",
        repositoryURL: "http://maven.yonyou.com/nexus/content/repositories/iWeb/",
        artifactId: "demo",
        groupId: "iuap.web.test",
        version: "0.0.1-SNAPSHOT"
    }
}
