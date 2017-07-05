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
`uba`可以远程访问 [uba-templates](https://github.com/uba-templates) 以获取开发环境所需代码，并选择通过用户交互所需的样板。 它可以引导用户逐步使用uba。 更令人兴奋的是，uba可以自动进行手动命令。

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
