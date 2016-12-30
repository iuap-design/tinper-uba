# tinper-uba
![image](http://tinper.org/assets/images/about-us-uba.jpg)

[![npm version](https://img.shields.io/npm/v/uba.svg)](https://www.npmjs.com/package/uba)
[![Build Status](https://img.shields.io/travis/iuap-design/tinper-uba/master.svg)](https://travis-ci.org/iuap-design/tinper-uba)
[![devDependency Status](https://img.shields.io/david/dev/iuap-design/tinper-uba.svg)](https://david-dm.org/iuap-design/tinper-uba#info=devDependencies)
[![NPM downloads](http://img.shields.io/npm/dm/uba.svg?style=flat)](https://npmjs.org/package/uba)

## 介绍
uba 是一款前端开发工具，它可以为您提供多种最佳实践，通过[uba-templates](https://github.com/uba-templates)仓库来进行更新维护，提供多种多样风格技术功能点来选择所需要的最佳实践模板。

## 功能
uba可以远程获取到uba-templates官方仓库内的最佳实践，通过人机交互的方式来选择所需要的最佳实践，步骤化的去引导用户来初始化使用，包括一些需要手工来完成的命令uba已经做到了自动化去处理。

## 快速上手

### 安装
- 安装[node.js](http://nodejs.org/)开发环境.(node > 4.x && npm > 2.x)
- `npm install uba -g` 进行全局命令行安装(需注意权限问题是否需要`sudo`)
- 安装完成后输入`uba -v`如果出现版本号说明安装成功


### 使用
打开命令终端，直接输入`uba`即可.

uba会显示目前在线可使用的最佳实践名字与介绍.

远程信息加载完毕后，可以看到目前在线的最佳实践模板，通过操作小箭头上、下来选择我们想要的项目，，输入工程名以及是否要自动安装项目npm依赖包等便捷操作.


## 文档
### 创建最佳实践
```sh
uba
```

### 当前版本
```sh
uba -v
```

### 当前帮助
```sh
uba -h
```

## 如何参与贡献
fork我们的工程到您的repo里面，通过git来提交给我们pr，我们真诚希望您的参与,使我们变得更好

## Licence
