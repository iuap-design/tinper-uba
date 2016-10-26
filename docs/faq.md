
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
