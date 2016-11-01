## 资源编译和发布到maven服务器

### 资源编译

```
$ uba build
```

这样在当前文件夹下会生成`build`的文件夹，里面有我们需要的优化过的资源项目.

### 资源发布

发布之前，需要配置uba.config.js的配置项，将一下信息修改为你的maven服务信息

```
"publish": {
    command: "mvn",
    repositoryId: "iWeb",
    repositoryURL: "http://maven.yonyou.com/nexus/content/repositories/iWeb/",
    artifactId: "demo",
    groupId: "iuap.web.test",
    version: "0.0.1-SNAPSHOT"
}
```

配置完成之后，还需要在本地安装maven环境。

```
$ uba publish
```

执行完后，会在本地项目中生成publishMul，并且会自动执行maven的命令将代码包上传到服务器。
