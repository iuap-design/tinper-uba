# uba 使用说明

<img src="http://tinper.org/assets/images/uba.png" width="120" />

[![npm version](https://img.shields.io/npm/v/uba.svg)](https://www.npmjs.com/package/uba)
[![Build Status](https://img.shields.io/travis/iuap-design/tinper-uba/master.svg)](https://travis-ci.org/iuap-design/tinper-uba)
[![devDependency Status](https://img.shields.io/david/dev/iuap-design/tinper-uba.svg)](https://david-dm.org/iuap-design/tinper-uba#info=devDependencies)
[![NPM downloads](http://img.shields.io/npm/dm/uba.svg?style=flat)](https://npmjs.org/package/uba)

[英文文档](https://github.com/iuap-design/tinper-uba/blob/master/README.md)

## 介绍
`uba` 是一款基于 webpack 封装的 CLI 命令行工具，提供一站式工程初始化、本地服务调试、数据模拟、资源编译和打包、性能优化等功能。
`uba`是一个前端开发工具，可以提供多种开发场景。 开发人员可以使用 [uba-templates](https://github.com/uba-templates) 进行更新和维护，当然也可以根据所需的样式和功能提供不同的模板。

## 特点
`uba`可以远程访问 [uba-templates](https://github.com/uba-templates) 来初始化你需要的最佳实践模板，它可以引导你来一步步来安装、调试、构建等。

`uba`是一种微内核、多插件的机制来设计的，当自身插件无法满足你的需求的时候，可以为`uba`来创造插件来增强使用功能。

## 插件
目前`uba`官方自带插件有以下几种：

> 启动命令为：uba <init>、uba <server> 这种形式

1. [uba-init](https://www.npmjs.com/package/uba-init) 使用`uba`初始化一个最佳实践。它可以在线访问远端的[uba-templates](https://github.com/uba-templates)仓库，列举可以使用的最佳实践模板。它会根据已选择自动下载到本地，友好的提示是否自动安装依赖包等。
2. [uba-server](https://www.npmjs.com/package/uba-server) 初始化最佳实践完毕后，可以使用该插件来启动web服务，该插件目前集成了代理服务、数据模拟、webpack开发调试。代理与模拟数据做到了无缝切换，开发时无需等候后端开发接口，前端可自行模拟开发，待后端接口完毕后无缝切入。数据模拟上面做到了初、中、高级玩法，初级直接加载静态json数据，中级是可以配置路由访问，高级是可以直接编程实现动态模拟数据。
3. [uba-build](https://www.npmjs.com/package/uba-build) 开发完毕后就可以构建我们的最佳实践了，通过该插件可以构建静态资源打包出去。
4. [uba-install](https://www.npmjs.com/package/uba-install) 如果要安装额外的`uba`插件，可以使用它来安装其他的插件，只针对为`uba`而开发的插件哦~
5. [uba-plugin](https://www.npmjs.com/package/uba-plugin) 要施展你的才华和技艺？没问题，`uba`支持第三方插件开发，赋予它更强的能力！使用该插件来生成基本的插件规范目录，可以开发属于你的最强插件，这也是`uba`微内核、多插件的原则。


### 安装

1. 安装 [node.js](http://nodejs.org/) 开发环境.(node > 6.x && npm > 2.x)。
2. `npm install uba -g` 全局安装。
3. 安装完成之后输入 `uba -v` ，如果输出了相应的版本号则表明安装成功。
4.  `uba -h`查看帮助。


### 使用


```sh
$ uba init
```
1. 打开命令行工具，输入 `uba` 查看。
2. `uba init` 会显示各个开发环境的名字和描述。
3. 通过小键盘的上下键来选择你想要的开发环境( `↑` , `↓` )
4. 按照提示一步一步的进行

## 快速上手

1. `npm install uba -g`.

2. `uba init` 选择 `template-react-multiple-pages` ，然后输入你的文件夹目录名称 `uba-react`.

3. 稍等片刻，就会提示你是否安装项目相关依赖包，推荐输入： `y`.

4.  `cd uba-react` && `uba server` or `npm run dev`,启动服务，uba随后就会自动打开调试页面.

5. 输入命令 `uba build`去打包和构建工程

## 演示效果

### uba or uba -h
<img width="476" alt="uba" src="https://user-images.githubusercontent.com/12147318/27854369-27241b56-6199-11e7-9176-95609a7069a8.png">

### uba init
![uba_init](https://cloud.githubusercontent.com/assets/12147318/23543379/e74ec512-002c-11e7-9e39-74b3b5975638.gif)

### uba server
![uba_server](https://user-images.githubusercontent.com/12147318/27854525-b1196122-6199-11e7-9bcd-b6f14b886615.gif)

### uba build
![uba_build](https://user-images.githubusercontent.com/12147318/27854191-5d87f5ce-6198-11e7-861d-879a8e40e726.gif)

## API

### 查看版本
```sh
$ uba -v
```

### 帮助
```sh
$ uba -h
```

### 初始化
```sh
$ uba init
```

### 启动服务
```sh
$ uba server
```

### 构建项目
```sh
$ uba build
```

### 创建插件
```sh
$ uba plugin <name>
```
### 安装插件
```sh
$ uba install init
```


## ToDo

to be continued...

## 贡献
Please make sure to read the Contributing Guide before making a pull request.

## 版权
[MIT](https://github.com/iuap-design/tinper-uba/blob/master/LICENSE)
