#!/usr/bin/env node

var os = require('os');
var fs = require('fs');
var log4js = require('log4js');
var logger = log4js.getLogger();
var chalk = require('chalk');
var argv = require('minimist')(process.argv.slice(2));
var commands = argv._;

var currentNodeVersion = process.versions.node;
if (currentNodeVersion.split('.')[0] < 6) {
  console.error(
    chalk.red(
      'You are running Node ' +
      currentNodeVersion +
      '.\n' +
      'Create Uba App requires Node 6 or higher. \n' +
      'Please update your version of Node.'
    )
  );
  process.exit(1);
}



var installDir = os.homedir() + "/.uba";
var ubaVersionPath = installDir + "/uba-plugin.json";
var ubaVersion = {
  version: {

  }
}

function updateConfig() {
  var version = require("../node_modules/uba-install/package.json").version;
  var configObj = {};
  fs.readFile(ubaVersionPath, "utf8", (err, data) => {
    configObj = JSON.parse(data);
    configObj["version"]["install"] = version;
    fs.writeFile(ubaVersionPath, JSON.stringify(configObj), (err) => {
      if (err) throw err;
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
              if (err) throw err;
              uba();
              updateConfig();
            });
          }
        });

      });
    } else {
      uba();
      updateConfig();
    }
  });
}

function uba() {
  fs.readFile(ubaVersionPath, "utf8", (err, data) => {
    if (err) throw err;

    var configObj = JSON.parse(data);
    console.log();
    console.log(chalk.blue("  Usage: uba <command> [options]"));
    console.log();
    console.log();
    console.log(chalk.blue(`  Command:`));
    console.log();
    for (var item in configObj.version) {
      console.log(chalk.blue(`    ${item}\t\tv${configObj.version[item]}`));
      // console.log(chalk.blue(`    \t\t\t`));
    }
    console.log();
    console.log(chalk.blue("  Options:"));
    console.log();
    console.log(chalk.blue("    -h, --help     output usage information"));
    console.log(chalk.blue("    -v, --version  output the version number"));
    console.log();


  });
}


//检查命令
if (commands.length === 0) {
  if (argv.version || argv.v) {
    console.log(chalk.blue(require("../package.json").version));
    process.exit(0);
  }
  checkConfig();
} else {
  try {
    var opts = {
      cmd : commands,
      name : require("../package.json").name
    };
    require(`uba-${commands[0]}`).plugin(opts);
  } catch (e) {
    console.log(chalk.red(`  Error: \'${commands[0]}\' command is not installed ! \n
  You can try to install it by uba install ${commands[0]} .`));

    process.exit(0);
  } finally {

  }

}
