
## 如何使用

### 查看都有哪些适合自己的脚手架项目

```
$ uba list
```

### 初始化一个最佳实践工程

```
$ uba init iuap uba-project
```

这样，uba会在我们当前运行的目录下创建一个`uba-project`文件夹，来自iuap模板.

### 创建一个web01页面

```
$ uba page web01
```

这样就会在`src/containers/`下面看到输出的web01文件夹.

### 启动调试

```
$ uba server -p 5000`
```

这时候uba开启了本地`http://localhost:5000`的服务，其中，加上参数`-p`是用来指定某个服务端口。
