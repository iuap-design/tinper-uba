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

## 使用uba来开发一个完整的最佳实践

#### 初始化我们第一个最佳实践

1. 使用命令`uba init firstweb`来在当前目录下创建一个最佳实践文件夹`firstweb`.
2. 然后`cd firstweb`进入我们的最佳实践项目里面后，安装必要的中间件依赖`npm install`或`cnpm install`.**(推荐cnpm)**
3. 安装完后，可以先看一下服务和安装是否正确，输入`uba server -p 5000`，这里我自定义了一下调试服务默认端口，稍等片刻后，浏览器会自动打开，可以访问：`http://127.0.0.1:5000`来访问到了默认的最佳实践.
4. OK已经跑起来了，先关掉服务，我想添加一个页面的话，可以通过`uba page pagename`来添加一个新页面，里面包含基本的`css`、`js`、`html`，具体路径是`src/containers`下面，这里就是我们一些页面放置的位置.
5. 可以打开我们的页面文件夹，可以修改`css`，`js`.然后想加载该页面的话，找到我们的路由配置，`src/config/router.js`，按照默认的配置可以添加一下我们最新的路由.对应的修改一下`src/index.html`的路由引用就可以了.
6. 保存运行调试服务，我们就会看到最新的路由以及我们创建的页面了.

#### 调试完进行静态构建

这个非常简单，执行`uba build`后，在当前目录下创建一个`build`的文件夹，里面就是打包好的静态资源.

#### 最后的发布

当我们的项目功能开发完整后，就需要打包发布到Maven，执行`uba publish`就会按照uba.config里面的发布路径命令进行发布的.



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

**3、我按照上面的去做达到了内部使用这个插件的需求，但是我发现从`console`里面没有了`$`和`jQuery`全局对象了为什么？**

Webpack弥补了requireJS在模块化方面的缺陷，同时兼容AMD与CMD的模块加载规范，具有更强大的JS模块化的功能，所以就采用这种优雅的内部使用依赖的方式去加载.

如果需要对外暴露这些对象的话，需要使用一个loader来解决：
安装Loader `npm install expose-loader --save`
找到loaders对象进行添加一项.
```js
{
    test: require.resolve('jquery'),
    loader: "expose?$!expose?jQuery"
}
```
记得同时把插件加到`vendor`里面作为多入口打包才可以：
```js
"vendor": ['jquery']
```
这样`expose-loader`就会帮我们把内部jquery对象按照`$`和`jQuery`到处到外面去使用.
uba在这里非常不提倡这种打破内部工作机制去实现非常不优雅的代码.

**4、我用了一款很老的插件，它没有发布到npm这要怎么使用？**

通常来说，能通过npm install加载的插件是极好的，但是总有一些是不那么正规的插件，这样就需要手动来做一些库的存放等.uba对于这样的烂尾的作者表示不厚道~

首先把插件放到`vendor/插件名字/插件名字.js`这里，然后打开我们的`uba.config.js`找到entry.vendor配置项:
```js
"entry": {
        "vendor": ['./vendor/backbone/backbone-min.js']
}
```
然后重新启动服务打开浏览器看看，如果插件有向外暴露对象就会访问的到.

**5、我使用了自定义的插件通过全局也能访问的到，内部入口文件里面也可以直接`console.log(Backbone)`来使用，但是require(['backbone'])却无法找到模块...**

这种采用了第三方单独打包的方式，一般符合规范的都会寻找当前适合自己的生存环境，要想优雅的采用amd方式开发引用，那么做一下如下配置：

```js
"entry": {
    "externals": {
        backbone: "Backbone"
    }
}
```
externals对象内的key代表的是通过`require('backbone')`方式所使用的名字，value对应的就是我们外部暴露的全局名字.做一下这样的外部到内部的关联后，就可以使用了.
