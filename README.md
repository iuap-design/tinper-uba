[Chinese](https://github.com/iuap-design/uba/blob/master/README_CN.md)
# uba

[![npm version](https://img.shields.io/npm/v/uba.svg)](https://www.npmjs.com/package/uba)
[![Build Status](https://img.shields.io/travis/iuap-design/uba/master.svg)](https://travis-ci.org/iuap-design/uba)
[![devDependency Status](https://img.shields.io/david/dev/iuap-design/uba.svg)](https://david-dm.org/iuap-design/uba#info=devDependencies)



`uba` is a front-end develop tool which consist of initialize,local service,mock server,deploy. Just 5 command then the development can be done. lite and simple.

## Installation

```sh
$ npm install uba -g
```

## How to use
1、first initialize the uba project.
- `$ uba init uba-project`
- `uba` will create the project.

2、 Enter the project to create the project run server.
- `$ uba server -p 9000`

> If you want to modify the port `-p 5000`

- Now open the local service `http://localhost:9000`.

3、 After the development is completed to build an optimized version.
- `$ uba build`
- Build projects in our current directory.

4、 publising `.war`.
- `$ uba publish`
- `uba` will be generated in the current folder publish.
- Open your `publish`folder to see if there is a.

## API Documentation

---
##### help

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
##### version
```sh
$ uba --help or -h
```

##### Initialize
```sh
$ uba init demo
```

##### Add page
```sh
$ uba page myPage
```

##### Develop
```sh
$ uba server
```

##### Build
```sh
$ uba build
```

##### Publishing
```sh
$ uba publish
```
