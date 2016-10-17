#1.4.0

+ uba新的架构调整.
+ 增加在线最佳实践浏览命令 `uba list`.
+ 创建单独[uba-templates](https://github.com/uba-templates)仓库用于存放最佳实践模板.
* 修改初始化命令参数 `uba init iuap name` (iuap最佳实践名称是通过uba list所查询得到).
* 修改uba核心全局命令，整合libs脚本库.
- 去除最佳实践内置采用远端下载方式.
- 去除`uba-init`npm仓库避免开发带来浑浊.
