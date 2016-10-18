#1.4.0

+ uba新的架构调整,本地端->远程端的模式来加载.
+ 增加在线最佳实践浏览命令 `uba list`.
+ 创建单独[uba-templates](https://github.com/uba-templates)仓库用于存放最佳实践模板.
* 修改初始化命令参数 `uba init iuap name` (iuap最佳实践名称是通过uba list所查询得到).
* 修改uba核心全局命令，整合libs脚本库.
- 去除最佳实践内置采用远端下载方式.
- 去除`uba-init`npm仓库避免开发带来浑浊.
---

#1.3.0

+ uba架构拆分，全局命令缩减，采用npm来安装核心模块.
+ 增加快捷页面创建命令`uba page`.
* 优化最佳实践.
---

#1.2.0

+ 弃掉1.1版本架构重新开发.
+ 完成基本功能增加一系列命令.
+ 初始化最佳实践`uba init`.
+ 运行测试服务`uba server`,支持端口切换`uba server -p 5000`.
+ 构建优化静态资源`uba build`.
+ 发布到Maven`uba publish`.
---

#1.1.0

+ 原始版本分支`old_master`.
