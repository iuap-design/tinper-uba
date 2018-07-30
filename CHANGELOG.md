# 4.0.3

1. 修复css内图片路径错误的问题

# 4.0.2

1. 去除有问题的css

# 4.0.1

1. 调整webpack4.7参数

# 4.0.0

1. 全新架构升级，基于最新webpack4.6，包括ES7语法、多插件、简化配置、内置常用插件如babel、css、jsx、less，无需脚手架依赖过多

# 2.3.10

1. `uba-build`增加取消查看进度条参数`--noProcess`。

# 2.3.9

1. 增加代理参数headers用于设置Proxy Server请求头参数

# 2.3.8

1. 增加指定mock文件夹去访问静态资源

# 2.3.7

1. 解决之前静态服务`staticConfig`冲突导致的问题现已修复

# 2.3.6

1. 端口冲突检测中间件在个别windows7系统上会出错的问题


# 2.3.5

1. 集成`open-browser-webpack-plugin`插件，自动判断域名和端口打开。
2. 解决指定IP和端口设置不灵活导致启动服务绑定IP问题，如：`localhost`、`127.0.0.1`、`10.6.242.173`均可访问。
3. 优化代码逻辑。

# 2.2.3

+ 端口冲突的话`uba-server`会自动更换端口。
+ 同时支持`mock server`和`proxy server`加载，优先级`Page` > `Mock` > `Proxy`。
+ 更新核心中间件版本`webpack-dev-middleware`。

# 2.2.2

+ 更换`webpack 2.7.0`解决`webpack3`调试服务与构建慢的问题。

# 2.2.1

* 修复插件`uba-plugin`释放模板`.gitignore`丢失的问题


# 2.2.0

+ 解决`webpack3`调试、构建慢的问题

# 2.1.0
+ 调试`uba`核心采用微内核多插件的方式
+ 增加插件机制，可以为`uba`扩展更多的功能了
+ 默认自带插件`uba-init`、`uba-install`、`uba-plugin`、`uba-server`、`uba-build`


# 2.0.0

+ `uba`架构调整拆分过多依赖模块如：`webpack`
+ `uba`初始化最佳实践模式优化，采用人机交互方式选择.
+ `uba`核心模块拆分.
+ [uba-templates](https://github.com/uba-templates) 新的开发规范.
+ `uba`原有命令拆分.剖离出`uba init`,`uba server`,`uba list`直接输入`uba`命令来体验.

---

# 1.4.0

+ uba新的架构调整,本地端->远程端的模式来加载.
+ 增加在线最佳实践浏览命令 `uba list`.
+ 创建单独[uba-templates](https://github.com/uba-templates)仓库用于存放最佳实践模板.
* 修改初始化命令参数 `uba init iuap name` (iuap最佳实践名称是通过uba list所查询得到).
* 修改uba核心全局命令，整合libs脚本库.
- 去除最佳实践内置采用远端下载方式.
- 去除`uba-init`npm仓库避免开发带来浑浊.

---

# 1.3.0

+ uba架构拆分，全局命令缩减，采用npm来安装核心模块.
+ 增加快捷页面创建命令`uba page`.
* 优化最佳实践.

---

# 1.2.0

+ 弃掉1.1版本架构重新开发.
+ 完成基本功能增加一系列命令.
+ 初始化最佳实践`uba init`.
+ 运行测试服务`uba server`,支持端口切换`uba server -p 5000`.
+ 构建优化静态资源`uba build`.
+ 发布到Maven`uba publish`.

---

# 1.1.0

+ 原始版本分支`old_master`.
