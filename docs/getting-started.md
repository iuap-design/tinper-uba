
## 如何使用

**第一次使用之前需要查看uba官方提供哪些最佳实践模板**
- `$ uba list`
- [uba-templates](https://github.com/uba-templates)仓库用于存放最佳实践模板.

> 目前只有一个iuap最佳实践模板


1、首先初始化一个最佳实践工程
- `$ uba init iuap uba-project`
- uba会在我们当前运行的目录下创建一个`uba-project`文件夹来自iuap模板.

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
