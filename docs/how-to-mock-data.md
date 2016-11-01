## 如何模拟数据进行调试

config配置文件中的配置信息。

```
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
```

### 本地mock数据

在项目的mock目录下新增json文件。

### 和后端开发服务器联调

在uba.config.js中

### 拉取线上真实数据进行DEBUG
