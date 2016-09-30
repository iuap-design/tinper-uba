[English](https://github.com/iuap-design/tinper-uba/blob/master/README_CN.md)
# tinper-uba

[![npm version](https://img.shields.io/npm/v/uba.svg)](https://www.npmjs.com/package/uba)
[![Build Status](https://img.shields.io/travis/iuap-design/tinper-uba/master.svg)](https://travis-ci.org/iuap-design/tinper-uba)
[![devDependency Status](https://img.shields.io/david/dev/iuap-design/tinper-uba.svg)](https://david-dm.org/iuap-design/tinper-uba#info=devDependencies)
[![NPM downloads](http://img.shields.io/npm/dm/uba.svg?style=flat)](https://npmjs.org/package/uba)


`uba` 是一个集项目初始化、本地服务、数据模拟、资源编译、发布部署于一体的前端集成开发工具。为您提供多种项目最佳实践，使用五条命令即可打通开发全过程。轻量小巧，上手简单


## 如何安装
uba是需要安装到全局npm环境使用.
```sh
$ npm install uba -g
```

## 如何使用
1、首先初始化一个最佳实践工程
- `$ uba init uba-project`
- uba会在我们当前运行的目录下创建一个`uba-project`文件夹.

2、使用`uba page web01`来创建基本的页面结构组织.

> 这样就会在`src/containers/`下面看到输出的文件夹.

3、 进入我们创建的工程文件夹，来运行调试并自动开启服务
如果想不使用默认端口3000的话，可以参数`-p`指定自定义的端口.
- `$ uba server -p 5000`

> 这里配置了具体端口使用 `-p`

- 这时候uba开启了本地`http://localhost:5000`的服务.

4、 开发调试完成后，我们可以构建出最优化的工程.
- `$ uba build`
- 这样在当前文件夹下会生成`build`的文件夹，里面有我们需要的优化过的资源项目.

5、 需要产出`.war`资源发布文件，需要做一个简单的操作.
- `$ uba publish`
- `uba` 会把我们当前构建出的静态资源进行一个打包操作并且会执行mvn命令发布到指定配置的Maven.
- 打开你的`publish`文件夹看看，是不是有一个`dist.war`在那里?

## 最佳实践文件结构

```sh
├── mock
│   └── api
│       ├── demo
│       └── page1
├── src
│   ├── components
│   │   └── home
│   │       └── images
│   ├── config
│   ├── containers
│   │   ├── page1
│   │   ├── page2
│   │   ├── page3
│   │   ├── page4
│   │   ├── page5
│   │   ├── page6
│   │   └── temp
│   └── static
│       ├── images
│       └── js
└── vendor
    ├── director
    ├── jquery
    ├── knockout
    └── ui
        ├── font-awesome
        │   ├── css
        │   └── fonts
        ├── fonts
        │   └── font-awesome
        │       ├── css
        │       └── fonts
        ├── images
        │   └── diy
        └── uui
```


## API

---
##### 查看帮助

```sh
$ uba --help or -h
```

```sh
1. uba init <project name>     		初始化创建web工程
2. uba page <myPage>                添加页面
3. uba server -p 3000          		运行当前web工程并调试
4. uba build   						产出全部静态资源
5. uba publish 						发布war包到maven
6. uba --version       				显示当前uba工具版本
7. uba --help  						查看帮助
```
##### 查看当前版本
```sh
$ uba --help or -h
```

##### 初始化最佳实践web工程
```sh
$ uba init demo
```

##### 添加页面
```sh
$ uba page myPage
```

##### 运行一个调试服务
```sh
$ uba server
```

##### 产出静态资源
```sh
$ uba build
```

##### 发布Maven
```sh
$ uba publish
```

## [使用uba来开发一个完整的最佳实践](https://github.com/iuap-design/tinper-uba/wiki/%E4%BD%BF%E7%94%A8uba%E6%9D%A5%E5%BC%80%E5%8F%91%E4%B8%80%E4%B8%AA%E5%AE%8C%E6%95%B4%E7%9A%84%E6%9C%80%E4%BD%B3%E5%AE%9E%E8%B7%B5)

## [uba开发中遇到的一些问题解答](https://github.com/iuap-design/tinper-uba/wiki/uba%E5%BC%80%E5%8F%91%E4%B8%AD%E9%81%87%E5%88%B0%E7%9A%84%E4%B8%80%E4%BA%9B%E9%97%AE%E9%A2%98%E8%A7%A3%E7%AD%94)

