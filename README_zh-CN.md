<img src="http://tinper.org/assets/images/uba.png" width="120" />

# 前端集成开发工具 - uba

[![npm version](https://img.shields.io/npm/v/uba.svg)](https://www.npmjs.com/package/uba)
[![Build Status](https://img.shields.io/travis/iuap-design/tinper-uba/master.svg)](https://travis-ci.org/iuap-design/tinper-uba)
[![devDependency Status](https://img.shields.io/david/dev/iuap-design/tinper-uba.svg)](https://david-dm.org/iuap-design/tinper-uba#info=devDependencies)
[![NPM downloads](http://img.shields.io/npm/dm/uba.svg?style=flat)](https://npmjs.org/package/uba)

## 介绍

`uba`采用微内核、多插件开发，它基于 `webpack` 封装的 `cli` 命令行工具，为了解决目前前端快速开发不足而打造，提供一站式项目脚手架、最佳实践初始化、本地服务调试、数据模拟、远程代理、资源编译、静态产出、性能优化等功能。 `uba`是一个前端开发工具，可以提供多种开发场景。 核心开发人员会在远端最佳实践仓库 [uba-templates](https://github.com/uba-templates) 进行更新和维护，当然也可以根据所需的样式和功能提供不同的模板。可以给使用开发者提供轻量、简单、便捷的开发体验，让开发者从复杂的配置中脱离出来，这些复杂而又不易初学者学习的内容，就交给我`uba`来解决吧！

## 安装

> uba有两种使用方式：全局安装方式，用于拉取远端脚手架。另一种是脚手架内依赖开发包的形式使用

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
2.x.x
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
  template-iuap-react-solution - Iuap React整体解决方案脚手架
  template-moli - template-moli
  template-nc-multiple-pages - NC定制化需求多页面脚手架
  template-react-multiple-pages - React多页应用脚手架
❯ template-react-single-pages - 一款带组件库、状态管理并包含示例、参照的开发框架
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


## 说明

- uba@2版本是基于`webpack2`稳定版本封装，使用的插件和加载器都是最稳定的
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
  opts: {//如果设置该参数，代表使用http-proxy-middleware的原始参数，参考http-proxy-middleware的options
      target: "http://www.example.org",//指定多个路由代理
      changeOrigin: true,
      pathRewrite: {
        '^/api/old-path': '/api/new-path', // rewrite path
        '^/api/remove/path': '/path' // remove base path
      },
      router: {
        'dev.localhost:3000': 'http://localhost:8000'
      }
  },
  enable: true
}];
```
上面是项目里默认的一些设置，一般来说这个配置足够使用了，无非是我们按照后端给的接口去登录拿到Cookies，然后授权请求代理数据接口。我们需要代理到指定的路由就要去设置指定的路由地址即可


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

## 说明

1. 关于启动服务方面的使用请访问：[uba-server](https://github.com/tinper-uba/uba-server/blob/webpack2/README.md) 插件
2. 关于构建服务方面的使用请访问：[uba-build](https://github.com/tinper-uba/uba-build/blob/webpack2/README.md) 插件