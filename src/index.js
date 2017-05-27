/*
 * @Author: Kvkens
 * @Date:   2017-5-15 00:00:00
 * @Last Modified by:   Kvkens
 * @Last Modified time: 2017-5-27 21:26:20
 */

var os = require('os');
var fs = require('fs');
var chalk = require('chalk');
var argv = require('minimist')(process.argv.slice(2));
var commands = argv._;
var resolve = require('resolve');
var path = require('path');

var currentNodeVersion = process.versions.node;
if (currentNodeVersion.split('.')[0] < 6) {
  console.error(chalk.red('You are running Node ' + currentNodeVersion + '.\n' + 'Create Uba App requires Node 6 or higher. \n' + 'Please update your version of Node.'));
  process.exit(1);
}

var installDir = os.homedir() + "/.uba";
var ubaVersionPath = installDir + "/uba-plugin.json";
var ubaVersion = {
  version: {}
}

function updateConfig() {
  var configObj = {};
  var pluginLists = ["install", "init", "plugin", "server"];

  fs.readFile(ubaVersionPath, "utf8", (err, data) => {
    configObj = JSON.parse(data);
    pluginLists.forEach(function(_plugin){
      var version = require(`../node_modules/uba-${_plugin}/package.json`).version;
      configObj["version"][_plugin] = version;
    });
    fs.writeFile(ubaVersionPath, JSON.stringify(configObj), (err) => {
      if (err)
        throw err;
      getHelp();
    });
  });
}

function checkConfig() {
  fs.access(installDir, function(err) { //判断uba配置文件夹是否存在
    if (err) {
      fs.mkdir(installDir, function() { //创建配置文件夹
        fs.access(ubaVersionPath, function(err) {
          if (err) { //不存在配置文件
            fs.writeFile(ubaVersionPath, JSON.stringify(ubaVersion), (err) => { //创建配置文件
              if (err)
                throw err;
              updateConfig();
            });
          }
        });
      });
    } else {
      updateConfig();
    }
  });
}

function getHelp() {
  fs.readFile(ubaVersionPath, "utf8", (err, data) => {
    if (err)
      throw err;

    var configObj = JSON.parse(data);
    console.log();
    console.log(chalk.green("  Usage: uba <command> [options]"));
    console.log();
    console.log();
    console.log(chalk.green(`  Command:`));
    console.log();
    for (var item in configObj.version) {
      console.log(chalk.green(`    ${item}\t\tv${configObj.version[item]}`));
    }
    console.log();
    console.log(chalk.green("  Options:"));
    console.log();
    console.log(chalk.green("    -h, --help     output usage information"));
    console.log(chalk.green("    -v, --version  output the version number"));
    console.log();
  });
}

function findPluginPath(command) {
  if (command && /^\w+$/.test(command)) {
    try {
      return resolve.sync('uba-' + command, {
        paths: [path.join(__dirname, '..', 'node_modules')]
      });
    } catch (e) {
      console.log('');
      console.log('  ' + chalk.green(command) + ' command is not installed.');
      console.log('  You can try to install it by ' + chalk.blue.bold('uba install ' + command) + '.');
      console.log('');
    }
  }
}

//检查命令
if (commands.length === 0) {
  if (argv.version || argv.v) {
    console.log(chalk.green(require("../package.json").version));
    process.exit(0);
  }
  checkConfig();
} else {
  var opts = {
    cmd: commands,
    argv: argv,
    name: require("../package.json").name
  };
  var pluginPath = findPluginPath(commands[0]);
  if (pluginPath) {
    if (require(`uba-${commands[0]}`).plugin) {
      require(`uba-${commands[0]}`).plugin(opts);
    } else {
      console.log(chalk.red("  Error : Plugin internal error."));
    }
  }
}
