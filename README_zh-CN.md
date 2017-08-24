<img src="http://tinper.org/assets/images/uba.png" width="120" />

# 前端集成开发工具 - uba

[![npm version](https://img.shields.io/npm/v/uba.svg)](https://www.npmjs.com/package/uba)
[![Build Status](https://img.shields.io/travis/iuap-design/tinper-uba/master.svg)](https://travis-ci.org/iuap-design/tinper-uba)
[![devDependency Status](https://img.shields.io/david/dev/iuap-design/tinper-uba.svg)](https://david-dm.org/iuap-design/tinper-uba#info=devDependencies)
[![NPM downloads](http://img.shields.io/npm/dm/uba.svg?style=flat)](https://npmjs.org/package/uba)

## 介绍

`uba`采用微内核、多插件开发，它基于 `webpack` 封装的 `cli` 命令行工具，为了解决目前前端快速开发不足而打造，提供一站式项目脚手架、最佳实践初始化、本地服务调试、数据模拟、远程代理、资源编译、静态产出、性能优化等功能。 `uba`是一个前端开发工具，可以提供多种开发场景。 核心开发人员会在远端最佳实践仓库 [uba-templates](https://github.com/uba-templates) 进行更新和维护，当然也可以根据所需的样式和功能提供不同的模板。可以给使用开发者提供轻量、简单、便捷的开发体验，让开发者从复杂的配置中脱离出来，这些复杂而又不易初学者学习的内容，就交给我`uba`来解决吧！

## 安装

安装 [node.js](https://nodejs.org) 开发环境.(node > 6.x && npm > 2.x)。

> 基于国内开源的囧境，可以使用淘宝的CNPM

#### cnpm

你可以使用淘宝定制的 cnpm (gzip 压缩支持) 命令行工具代替默认的 npm:
```bash
$ npm install -g cnpm --registry=https://registry.npm.taobao.org

$ cnpm install uba -g
```
或者你直接通过添加 npm 参数 alias 一个新命令:
```bash
alias cnpm="npm --registry=https://registry.npm.taobao.org \
--cache=$HOME/.npm/.cache/cnpm \
--disturl=https://npm.taobao.org/dist \
--userconfig=$HOME/.cnpmrc"

# Or alias it in .bashrc or .zshrc
$ echo '\n#alias for cnpm\nalias cnpm="npm --registry=https://registry.npm.taobao.org \
  --cache=$HOME/.npm/.cache/cnpm \
  --disturl=https://npm.taobao.org/dist \
  --userconfig=$HOME/.cnpmrc"' >> ~/.zshrc && source ~/.zshrc
```

#### npm

首先进行工具命令的安装，需要安装到全局环境上使用，后面项目开发中，`uba`是可以依赖包形式NodeAPI开发使用。
```bash
$ npm install uba -g
```
稍等片刻安装结束后，输入下面命令来确定是否安装成功：
```bash
$ uba
```
然后会出现当然命令使用帮助，以及官方依赖的插件版本。看到如下界面就是安装初始化完毕！
```bash
Usage: uba <command> [options]


Command:

  install		v0.0.17
  init		v0.0.51
  plugin		v0.0.4
  server		v0.0.20
  build		v0.0.4

Options:

  -h, --help     output usage information
  -v, --version  output the version number
```

## 使用

1. 如何使用前端集成工具`uba`来快速创建一个基本脚手架：

```bash
$ uba init
```
2. 使用`uba`插件`uba-init`来加载远端[uba-templates](https://github.com/uba-templates)最佳实践仓库下的可用的列表：
```bash
Available official templates:
? Please select : (Use arrow keys)
❯ template-react-multiple-pages - React多页应用脚手架
  template-react-single-pages - React单页应用脚手架
```
可以通过小键盘的上箭头(↑)、下箭头(↓)来选择你需要的脚手架或基于业务的最佳实践项目，回车即可。

3. 输入你的工程项目名称，默认不输入的名字为“uba-boilerplate”，我们输入“uba-webpack”

```bash
? Please select : template-react-single-pages - React单页应用脚手架
? boilerplate name : uba-webpack
Downloading template-react-single-pages please wait.
Boilerplate uba-webpack done.
? Automatically install NPM dependent packages? (Y/n)
Install NPM dependent packages,please wait.
```

下载完远端的脚手架或最佳实践后，`uba`会提示是否全自动安装依赖包，我们选择默认`Y`来继续。

如果不选择的话后面也可以手动使用`npm install`或`cnpm install`去安装使用。

4. 进入安装好的工程目录，并开启uba调试服务：

```bash
$ cd uba-webpack && uba server
```

开始调试服务是`uba`的插件`uba-server`的扩展能力。

稍等片刻待`uba`就会自动打开你的默认浏览器显示页面的。并会打印一些工具日志，比如 数据模拟 代理访问等。

```bash
/******************** Start loading mock server ********************/

[mock]:[/User/Get] to ./mock/api/user/get.json
[mock]:[/User/Post] to ./mock/api/user/post.json
[mock]:[/User/Put] to ./mock/api/user/put.json

/******************** Mock server loaded completed *****************/


/******************** Start dev server *****************/

[uba] : Listening on port http://127.0.0.1:3000

/******************** O(∩_∩)O *****************/
```

5. 需要构建静态资源发布的，需要执行下面命令即可：

```bash
$ uba build
```
稍等片刻后，就会在项目目录内产出`dist`文件夹，里面就是我们需要的构建完的资源，是不是很简单：）

以上就是基本使用的说明。

## 命令

```bash
1. $ uba init                   # 拉取远端可用的脚手架和最佳实践
2. $ uba server                 # 开启调试、代理服务、数据模拟服务
3. $ uba build                  # 构建静态资源产出
4. $ uba install <plugin name>  # 安装uba的插件
5. $ uba plugin                 # 创建uba插件
6. $ uba -v                     # 查看当前版本
7. $ uba -h                     # 查看帮助
```


## 插件

`uba`所包含的插件在[tinper-uba](https://github.com/tinper-uba)下维护、开发。

`uba`的强大开发体验是离不开丰富多彩的插件的，之前拉取远端仓库是使用了`uba-init`插件所完成的，下面介绍一下`uba`家族的核心兄弟都有谁~

- [uba-init](https://github.com/tinper-uba/uba-init) - 一款可以帮助`uba`执行远程代码访问的能力，它基于`request`http请求方法去获得github的API数据，解析后把远端的数据展示给uba来操作，然后根据选择来最终下载到本地，然后安装使用。

- [uba-server](https://github.com/tinper-uba/uba-server) - 帮助`uba`来加载本地配置文件，包括数据模拟、代理访问、`webpack`配置 等一系列需要集成开发使用的功能，最终通过`webpack-dev-middleware`来运行整个调试项目。

- [uba-build](https://github.com/tinper-uba/uba-build) - 开发完毕后需要产出打包静态资源，该插件结合`webpack`核心打包功能，读取`uba`的配置文件最终产出我们需要上线的资源。

- [uba-plugin](https://github.com/tinper-uba/uba-plugin) - 当开发者的需求现有的插件无法满足实现等，我们需要自行开发插件来供`uba`来加载使用，本身开发插件是复杂的，需要有一系列规范才可以，该插件就是为了创造插件而生。

- [uba-install](https://github.com/tinper-uba/uba-install) - 自身插件不满足需求，那么需要来为`uba`安装一款插件，赋予它安装插件的能力，通过`uba install mock`这样来安装，`uba-install`插件就会去[npm](https://www.npmjs.com/search?q=uba)上去下载`uba-mock`去安装使用的。

## to be continued
