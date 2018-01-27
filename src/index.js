/* uba
 * @Author: Kvkens(yueming@yonyou.com)
 * @Date:   2017-5-15 00:00:00
 * @Last Modified by:   Kvkens
 * @Last Modified time: 2018-01-27 22:54:24
 */
var os = require("os");
var fs = require("fs");
var chalk = require("chalk");
var argv = require("minimist")(process.argv.slice(2));
var commands = argv._;
var util = require("./util");

//强制第一时间检查node版本，低版本不兼容
util.checkNodeVersion(6);

//检测输入命令集合参数
if (commands.length === 0) {
  //无参数传递 eg. uba
  if (argv.version || argv.v) {
    util.getVersion();
  }
  //显示帮助
  util.getHelp();
} else {
  //当有参数传递 eg. uba server
  //获得uba运行时的一些参数用于传递给插件使用
  let opts = {
    cmd: commands,
    argv: argv,
    name: require("../package.json").name
  };

  //检测调用的插件是否存在？不存在给出警告
  let pluginPath = util.findPluginPath(commands[0]);
  if (pluginPath) {
    if (require(`uba-${commands[0]}`).plugin) {
      require(`uba-${commands[0]}`).plugin(opts);
    } else {
      console.log(chalk.red("  Error : Plugin internal error."));
    }
  }
}
