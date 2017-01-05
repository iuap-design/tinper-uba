<img src="http://tinper.org/assets/images/uba.png" width="120" />

# tinper-uba



[![npm version](https://img.shields.io/npm/v/uba.svg)](https://www.npmjs.com/package/uba)
[![Build Status](https://img.shields.io/travis/iuap-design/tinper-uba/master.svg)](https://travis-ci.org/iuap-design/tinper-uba)
[![devDependency Status](https://img.shields.io/david/dev/iuap-design/tinper-uba.svg)](https://david-dm.org/iuap-design/tinper-uba#info=devDependencies)
[![NPM downloads](http://img.shields.io/npm/dm/uba.svg?style=flat)](https://npmjs.org/package/uba)

[English Document](https://github.com/iuap-design/tinper-uba)

## 介绍
`uba`是一款前端开发工具，通过几条简单的命令很直观的查看到目前仓库最新的工程，它可以为您提供不同技术栈、多种维度的最佳实践工程。最佳实践是通过[uba-templates](https://github.com/uba-templates)仓库来进行更新维护。

## 功能
`uba`可以远程获取到[uba-templates](https://github.com/uba-templates)官方仓库内的最佳实践，通过人机交互的方式来选择所需要的最佳实践，步骤化的去引导用户来使用uba，包括一些需要手工来完成的命令`uba`已经做到了自动化去处理。

## 快速上手

### 安装
1. 安装[node.js](http://nodejs.org/)开发环境.(node > 4.x && npm > 2.x)
2. `npm install uba -g` 进行全局命令行安装(需注意权限问题是否需要`sudo`)
3. 安装完成后输入`uba -v` 出现版本号说明安装成功


### 使用


```sh
$ uba
```
1. 打开命令终端，输入`uba`命令等待加载结果.
2. `uba`会显示目前在线可使用的最佳实践名字与介绍.
3. 通过操作小键盘的箭头`↑`、`↓`来选择我们想要的项目，下一步输入工程名后，`uba`会按步骤提示是否自动安装项目`npm`依赖包等便捷操作.


## 文档
### 创建最佳实践

```sh
# 只需一个命令
$ uba
```

通过简单的`uba`全局命令即可打开可视化面板使用键盘`↑`、`↓`来选择最佳实践，每一个名字后面都有大致的介绍,按照提示选择即可。


### 当前版本
```sh
$ uba -v
```

### 帮助
```sh
$ uba -h
```
## 技术文档

- [x] [介绍](./docs/introduction.md)
- [x] [如何安装](./docs/install.md)
- [x] [快速上手](./docs/getting-started.md)
- [x] [uba 命令行说明](./docs/how-to-use-cli.md)
- [x] [最佳实践项目工程](./docs/uba-templates-intro.md)
- [x] [如何参与最佳实践开发](./docs/how-to-boilerplate-in-development.md)


## 如何参与贡献
fork我们的项目到您的repo里面，通过git来提交给我们pr，我们真诚希望您的参与,使我们变得更好。

## Licence
[LICENSE](https://github.com/iuap-design/tinper-uba/blob/master/LICENSE)
