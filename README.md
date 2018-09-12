<img src="http://tinper.org/assets/images/uba.png" width="120" />

# 前端集成开发工具 - uba

[![npm version](https://img.shields.io/npm/v/uba.svg)](https://www.npmjs.com/package/uba)
[![Build Status](https://img.shields.io/travis/iuap-design/tinper-uba/master.svg)](https://travis-ci.org/iuap-design/tinper-uba)
[![devDependency Status](https://img.shields.io/david/dev/iuap-design/tinper-uba.svg)](https://david-dm.org/iuap-design/tinper-uba#info=devDependencies)
[![NPM downloads](http://img.shields.io/npm/dm/uba.svg?style=flat)](https://npmjs.org/package/uba)

## 介绍

`uba`采用微内核、多插件开发，它基于 `webpack` 封装的 `cli` 命令行工具，为了解决目前前端快速开发不足而打造，提供一站式项目脚手架、最佳实践初始化、本地服务调试、数据模拟、远程代理、资源编译、静态产出、性能优化等功能。 `uba`是一个前端开发工具，可以提供多种开发场景。 核心开发人员会在远端最佳实践仓库 [uba-templates](https://github.com/uba-templates) 进行更新和维护，当然也可以根据所需的样式和功能提供不同的模板。可以给使用开发者提供轻量、简单、便捷的开发体验，让开发者从复杂的配置中脱离出来，这些复杂而又不易初学者学习的内容，就交给我`uba`来解决吧！

## 安装

安装 [node.js](https://nodejs.org) 开发环境.(node > 8.x && npm > 3.x)

> 网络不好的可以使用淘宝的CNPM镜像源

进行工具命令的安装，需要安装到全局环境上使用，后面项目开发中，`uba`是可以依赖包形式`NodeAPI`开发使用。
```bash
$ npm install uba@2 -g      #全局安装使用，也可以在项目packages.json依赖使用
```
安装结束后，输入下面命令来确定是否安装成功：
```bash
$ uba -v      #查看版本
```

```bash
2.3.11
```

## 使用

1. 如何使用前端集成工具`uba`来快速初始化一个前端工程：

```bash
$ uba init
```
2. 使用上下箭头按键来选择你要的前端工程

```bash
Available official templates:
? Please select : (Use arrow keys)
❯ template-iuap-react-solution - Iuap React整体解决方案脚手架
  template-moli - template-moli
  template-nc-multiple-pages - NC定制化需求多页面脚手架
  template-react-multiple-pages - React多页应用脚手架
  template-react-single-pages - 一款带组件库、状态管理并包含示例、参照的开发框架
  template-tinper-bee-admin - 采用tinper-bee组件库所构建的管理系统
```


3. 输入你的工程项目名称，默认不输入的名字为`uba-boilerplate`

```bash
? boilerplate name : uba-boilerplate
Downloading template-react-single-pages please wait.
Boilerplate uba-boilerplate done.
? Automatically install NPM dependent packages? Yes
Install NPM dependent packages,please wait.
```

下载完远端的脚手架或最佳实践后，`uba`会提示是否全自动安装依赖包，我们选择默认`Y`来继续。

如果不选择的话后面也可以手动使用`npm install`或`cnpm install`去安装使用。

4. 进入安装好的工程根目录下，并执行启动服务命令：

```bash
$ cd uba-boilerplate && npm run dev
```

稍等`uba`就会自动打开你的默认浏览器显示页面的。并会打印一些工具日志，比如 数据模拟 代理访问等。

```bash
[HPM] Proxy created: /  ->  http://cnodejs.org
[HPM] Proxy rewrite rule created: "^/mes" ~> ""
[HPM] Subscribed to http-proxy events:  [ 'proxyRes', 'error', 'close' ]
[proxy] : /api/ to http://cnodejs.org
[HPM] Proxy created: /  ->  https://api.github.com
[HPM] Subscribed to http-proxy events:  [ 'proxyRes', 'error', 'close' ]
[proxy] : /users/,/orgs/ to https://api.github.com
[mock]:[/local/user/get] to ./mock/user/get.json
[mock]:[/local/user/post] to ./mock/user/post.json
********************************************
 ❤️  uba-develop-server
 [core] : v1.2.0
 [http] : http://127.0.0.1:3000
 [http] : http://10.6.245.141:3000
********************************************
```
![image](https://user-images.githubusercontent.com/3817644/44698087-1e5aca80-aab1-11e8-864d-53e4d587caad.png)

5. 构建静态资源，执行下面命令即可：

```bash
$ npm run build
```
稍等片刻后，就会在项目目录内产出`dist`文件夹，里面就是我们需要的构建完的资源，是不是很简单：）
![image](https://user-images.githubusercontent.com/3817644/44701090-77c9f600-aabf-11e8-8d7a-98e3edc508e4.png)

以上就是基本使用的说明。


## 参数

> uba server --port 4000 --noInfo --logLevel debug --chunks --noOpen

- `--noProcess` 不显示进度百分比
- `--logLevel` 日志级别，默认：info 其他为：trace,debug,info,warn,error,silent
- `--chunks` 不显示详细的chunks信息
- `--port` 服务器端口设置，默认：3000，如冲突改为随机端口
- `--noOpen` 不自动打开浏览器

## 说明

- uba@2版本是基于`webpack2`稳定版本封装，使用的插件和加载器都是最稳定的，常用的稳定版本才能让项目开发走的更好

- 一般开发不需要每个人都安装全局uba去初始化使用，团队内的核心开发人员初始化构建好项目后，参与开发者只需要安装`npm install`后，通过`npm run dev`开启调试服务、`npm run build`来构建项目即可。

## 配置

### uba.config.js (包含：代理、静态托管、webpack配置等)

1. 代理设置
```js
//远程代理访问，可以配置多个代理服务
//更多配置参考 https://www.npmjs.com/package/http-proxy-middleware#options
const proxyConfig = [{
  enable: true,                 //启动开关
  router: "/api/",              //代理路由
  headers: { "X-XSS": "X-XSS" },//设置响应请求头
  pathRewrite: { '^/mes': '' }, //URL指定重写
  url: "http://cnodejs.org"     //代理地址
}, {
  enable: true,
  router: ["/users/", "/orgs/"],//指定多个路由代理
  url: "https://api.github.com"
}];
```
上面是项目里默认的一些设置，一般来说这个配置足够使用了，无非是我们按照后端给的接口去登录拿到Cookies，然后授权请求代理数据接口。我们需要代理到指定的路由就要去设置指定的路由地址即可

下面的配置一个开发阶段的工程配置，可以按照不同的路由去请求不同的URL地址：
```js
const proxyConfig = [
  {
    enable: true,
    headers: {
      // 这是之前网页的地址，从中可以看到当前请求页面的链接。
      "Referer": "http://10.10.24.43:8080/"
    },
    // context，如果不配置，默认就是代理全部。
    router: [
      '/iuap-example','/eiap-plus/','/newref/'
    ],
    url: 'http://10.10.24.43:8080'
  },
  // 应用平台
  {
    enable: true,
    headers: {
      // 这是之前网页的地址，从中可以看到当前请求页面的链接。
      "Referer": "http://159.138.20.189:8080"
    },
    // context，如果不配置，默认就是代理全部。
    router: [
      '/wbalone'
    ],
    url: 'http://159.138.20.189:8080'
  },
  // 后台开发服务
  {
    enable: true,
    headers: {
      // 这是之前网页的地址，从中可以看到当前请求页面的链接。
      "Referer": "http://159.138.20.189:8180"
    },
    // context，如果不配置，默认就是代理全部。
    router: [
      '/iuap_pap_quickstart'
    ],
    url: 'http://159.138.20.189:8180'
  }
];
```

2. historyApiFallback 设置

需要使用该功能，直接设置为true就好
```js
const svrConfig = {
    historyApiFallback: true
}
```

3. 静态资源托管

顾名思义，`uba`开启一个静态的`http`服务来把我们工程下的指定资源提供`http`访问

```js
const staticConfig = {
  folder: 'src/static'
}
```
设置该项后，重启服务我们可以通过`http://127.0.0.1;3000/${src/static目录内的资源访问}`

4. webpack2 配置

其他的配置就是我们普通的`webpack`配置，包含入口、出口、加载器、插件等。

可以根据官网的配置去个性化我们的工程配置，也可以使用uba默认集成好的无需设置。

配置参考：https://webpack.docschina.org/concepts/

5. Mock 配置

### uba.mock.js 包含各种HTTP请求方法

> 如果`mock`和`proxy`混用，路由完全一致，那么`uba`的优先级是 webpack assets > mock > proxy

模拟方法体可以是:`GET`,`POST`,`DELETE`,`PUT`,`HEAD`,`OPTIONS`等

整体来说就是一个标准的`JSON`,`key`代表我们模拟的本地路由地址，`value`代表我们本地路径的模拟JSON文件

```js
module.exports = {
  "GET": [
    { "/local/user/get": "./mock/user/get.json" }, 
    { "/order/delivery/list": "./mock/order/delivery/list.json" }, 
    { "/order/manage/orderType": "./mock/order/manage/orderType.json" },
    { "/route/data": "./mock/sidebar.json" }
  ],
  "POST": [
    { "/system/role/list": "./mock/sys-manage/role-manage/list.json" }, 
    { "/order/manage/list": "./mock/order/manage/list.json" }, 
    { "/order/delivery/removelist": "./mock/order/delivery/removeList.json" },
    // 销货通知单
    { "/customer_credit/getAssoVo": "./mock/sales/customer-search.json" },
    { "/sales/customer/create": "./mock/sales/customer-create.json" }
  ]
}
```