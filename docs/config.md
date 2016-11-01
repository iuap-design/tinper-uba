## 配置文件说明

```
{
    // webpack入口
    "index": "./src/index.js",
    "devOutput": {
        path: "/",
        pathinfo: true,
        filename: "js/[name].bundle.js",
        publicPath: '/',
        chunkFilename: "js/vendor/[id].js"
    },
    "buildOutput": {
        path: "build",
        filename: "static/js/[name].[chunkhash:8].js",
        chunkFilename: "static/js/[name].[chunkhash:8].chunk.js",
        publicPath: './'
    },
    "alias": {
        //test: "../../src"
    },
    //调试webpack loader添加.
    //如果自定义添加在这里，还需要npm install来安装依赖的Loader. npm install less less-loader --save
    "loaders": [{
        test: /\.less$/,
        loader: 'style!css!less'
    }, {
        test: path.resolve(path.join(__dirname), './vendor/jquery/jquery.js'),
        loader: "expose?$!expose?jQuery"
    }, {
        test: path.resolve(path.join(__dirname), './vendor/director/director.min.js'),
        loader: "expose?director"
    }, {
        test: path.resolve(path.join(__dirname), './vendor/knockout/knockout-latest.js'),
        loader: "expose?ko"
    }],
    // , {
    //     test: path.resolve(path.join(__dirname), './vendor/ui/uui/u-grid.min.js'),
    //     loader: "expose?grid"
    // }
    //引用第三方单独打包加载配置
    "entry": {
        "vendor": [
            './vendor/jquery/jquery.js',
            './vendor/director/director.min.js',
            './vendor/knockout/knockout-latest.js',
            './vendor/ui/uui/u.js',
            './vendor/ui/uui/u-grid.js'
        ]
    },
    "ProvidePlugin": {

    },
    //key:内部变量，如：require("jquery")，value:外部变量，如window.jQuery
    "externals": {
        jquery: 'jQuery',
        director: 'director',
        ko: 'ko'
    },
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
```
