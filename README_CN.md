# uba

[![npm version](https://img.shields.io/npm/v/uba.svg)](https://www.npmjs.com/package/uba)
[![Build Status](https://img.shields.io/travis/iuap-design/uba/master.svg)](https://travis-ci.org/iuap-design/uba)
[![devDependency Status](https://img.shields.io/david/dev/iuap-design/uba.svg)](https://david-dm.org/iuap-design/uba#info=devDependencies)



`uba` 是一个集项目初始化、本地服务、数据模拟、资源编译、发布部署于一体的前端集成开发工具。为您提供多种项目最佳实践，使用五条命令即可打通开发全过程。轻量小巧，上手简单


## 如何安装
uba是需要安装到全局npm环境使用.
```sh
$ npm install uba -g
```

## 如何使用
1、首先初始化一个最佳实践工程
- `$ npm init uba-project`
- uba会在我们当前运行的目录下创建一个`uba-project`文件夹.

2、 进入我们创建的工程文件夹，来运行调试并自动开启服务
- `$ npm server -p 9000`

> 这里配置了具体端口使用 `-p` 

- 这时候uba开启了本地`http://localhost:9000`的服务.

3、 开发调试完成后，我们可以构建出最优化的工程.
- `$ npm build`
- 这样在当前文件夹下会生成`build`的文件夹，里面有我们需要的优化过的资源项目.

4、 需要产出`.war`资源发布文件，需要做一个简单的操作.
- `$ npm publish`
- `uba` 会把我们当前构建出的静态资源进行一个打包操作
- 打开你的`publish`文件夹看看，是不是有一个`publish.war`在那里?

## API

---
##### 查看帮助

```sh
$ uba --help or -h
```

```sh
1. uba init <project name>     		初始化创建web工程
2. uba server -p 3000          		运行当前web工程并调试
3. uba build   						产出全部静态资源
4. uba publish 						发布war包到maven
5. uba --version       				显示当前uba工具版本
6. uba --help  						查看帮助
```
##### 查看当前版本
```sh
$ uba --help or -h
```

##### 初始化最佳实践web工程
```sh
$ uba init demo
```

##### 运行一个调试服务
```sh
$ uba server
```

##### 产出静态资源
```sh
$ uba build
```

##### 发布
```sh
$ uba publish
```

