[English](https://github.com/iuap-design/uba/blob/master/README_CN.md)
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

## 文件说明

待补充...

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

## uba 开发指南
**1、我想用uba开发react应用，不支持jsx语法怎么办？**

首先在生成完的最佳实践内找到`uba.config.js`文件，找到`loaders`字段，添加如下配置：
```js
"loaders": [{
        test: /\.(js|jsx)$/,
        loader: 'babel',
        query: {
            presets: ['es2015', 'react']
        },
        exclude: /node_modules/
    }]
```
然后需要安装此解析jsx react的loader即可.

`npm install babel-preset-react --save`

**注:(修改uba.config文件必须重新启动服务`uba server`)**


**2、我想使用一个第三方的脚本库需要怎么去做？**

目前uba内置了几款Neoui最佳实践所必须的插件：`jQuery`、`director.js`、`knockout`、`u.js`.

如果需要使用别的第三方插件，需要知道该插件是否为正规npm + github开源方式，比如需要加载`lodash.js`它是有在npm发布的开源插件，可以按照如下：

`npm install lodash --save`

在入口的js里面这样去使用采用amd方式，uba推荐使用这种方式去开发.
```js
require(['lodash'],function(_){
    console.log(_.bind);
});
```
如果不想第三方插件和自己写的脚本混在一起打包，可以单独设置第三方统一打包在vendor里面：
```js
"entry": {
        "vendor": ['jquery', 'backbone']
    }
```
这样jQuery和Backbone就都会在单独的vendor里面存放，不会影响我们自己写的脚本.

通常来说，能通过npm install加载的插件是极好的，但是总有一些是不那么正规的插件，这样就需要手动来做一些库的存放等.


