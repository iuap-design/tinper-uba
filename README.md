<img src="http://tinper.org/assets/images/uba.png" width="120" />

# tinper-uba



[![npm version](https://img.shields.io/npm/v/uba.svg)](https://www.npmjs.com/package/uba)
[![Build Status](https://img.shields.io/travis/iuap-design/tinper-uba/master.svg)](https://travis-ci.org/iuap-design/tinper-uba)
[![devDependency Status](https://img.shields.io/david/dev/iuap-design/tinper-uba.svg)](https://david-dm.org/iuap-design/tinper-uba#info=devDependencies)
[![NPM downloads](http://img.shields.io/npm/dm/uba.svg?style=flat)](https://npmjs.org/package/uba)

[中文文档](https://github.com/iuap-design/tinper-uba/blob/master/README_zh-CN.md)

[可视化跨平台版本](https://github.com/tinper-uba/uba-gui)

## Introduction
`uba` is a front-end development tool which can provide multipul boilerplates. Developers can update and do maintenance with [uba-templates](https://github.com/uba-templates), and of course different templates are provided according to the styles and functions which are needed.

## Features
`uba` can remote access to [uba-templates](https://github.com/uba-templates) to get the boilerplates, and to choose the boilerplate that needed through HCI. It can guide the users to use uba step by step. And what is more exciting, uba can make the manual commands automatically.


### Installation
1. Install [node.js](http://nodejs.org/) development environment.(node > 6.x && npm > 2.x)
2. `npm install uba -g` Global installation.
3. Install complete input `uba -v` The output version number indicates that the installation is successful.
4. View help and Plugins `uba -h`or`uba -h`.


### Usage


```sh
$ uba init
```
1. Open terminal,input `uba` view.
2. `uba init` Displays the boilerplate names and descriptions available online.
3. Keyboard select what you need  boilerplate.( `↑` , `↓` )
4. Follow the steps next to the operation

## Quick start

1. `npm install uba -g`.

2. `uba init` select `template-react-multiple-pages` enter, input name `uba-react`.

3. Wait a moment.Indicates whether the npm package is installed automatically, `y`.

4. Enter `cd uba-react` && `uba server` or `npm run dev`,start a develop server, automatically opens the default browser.

5. Try to build a package for our project. enter `uba build`,Wait a minute is success.

6. 😆 It is convenient to enjoy uba for pleasure!

## show

### uba or uba -h
<img width="476" alt="uba" src="https://user-images.githubusercontent.com/12147318/27854369-27241b56-6199-11e7-9176-95609a7069a8.png">

### uba init
![uba_init](https://cloud.githubusercontent.com/assets/12147318/23543379/e74ec512-002c-11e7-9e39-74b3b5975638.gif)

### uba server
![uba_server](https://user-images.githubusercontent.com/12147318/27854525-b1196122-6199-11e7-9bcd-b6f14b886615.gif)

### uba build
![uba_build](https://user-images.githubusercontent.com/12147318/27854191-5d87f5ce-6198-11e7-861d-879a8e40e726.gif)


## API

### Version
```sh
$ uba -v
```

### Help
```sh
$ uba -h
```

### Template
```sh
$ uba init
```

### DevServer
```sh
$ uba server
```

### Build
```sh
$ uba build
```

### Make Plugin
```sh
$ uba plugin <name>
```
### Install Plugin
```sh
$ uba install init
```


## Advanced section

to be continued...

## Contribution
Please make sure to read the Contributing Guide before making a pull request.

## Licence
[MIT](https://github.com/iuap-design/tinper-uba/blob/master/LICENSE)
