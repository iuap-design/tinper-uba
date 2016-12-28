[中文版本](https://github.com/iuap-design/tinper-uba/blob/master/docs/README.md)
# tinper-uba

[![npm version](https://img.shields.io/npm/v/uba.svg)](https://www.npmjs.com/package/uba)
[![Build Status](https://img.shields.io/travis/iuap-design/tinper-uba/master.svg)](https://travis-ci.org/iuap-design/tinper-uba)
[![devDependency Status](https://img.shields.io/david/dev/iuap-design/tinper-uba.svg)](https://david-dm.org/iuap-design/tinper-uba#info=devDependencies)
[![NPM downloads](http://img.shields.io/npm/dm/uba.svg?style=flat)](https://npmjs.org/package/uba)


`uba` is a front-end develop tool which consist of initialize,local service,mock server,deploy. Just 5 command then the development can be done. lite and simple.

## Installation

```sh
$ npm install uba -g
```

## How to use
1、first initialize the uba project.

**Before the first use need to see what UBA official best practice template**
- `$ uba list`
- [uba-templates](https://github.com/uba-templates) Warehouse for best practice template.
- `uba list` view online project.
- `$ uba init iuap my-project`
- `uba` will create the project.

> If you want to use third party best practices`uba init username/project my-project`To use GitHub's own warehouse as best practice.


2、create a web page template
- `uba page web01`
- look the `src/containers/`

2、 Enter the project to create the project run server.
- `$ uba server -p 5000`

> If you want to modify the port `-p 5000` default:port 3000

- Now open the local service `http://localhost:5000`.

3、 After the development is completed to build an optimized version.
- `$ uba build`
- Build projects in our current directory.

4、 publising `.war` to maven.
- `$ uba publish`
- `uba` will be generated in the current folder publish.
- Open your `publish`folder to see if there is a.

## API Documentation

---
##### help

```sh
$ uba --help or -h
```

```sh
1. uba init <template-name> <project-name>   Generate best practices
2. uba list   		                     List available official templates
3. uba server   		             Start develop server
4. uba page <my-page>   		     Add Page
5. uba build				     Build static resource
6. uba publish				     Publish war to Maven
7. uba --version or -v		   	     Version
8. uba --help or -h			     Help
```
##### version
```sh
$ uba --help or -h
```

##### View online
```sh
$ uba list
```


##### Initialize
```sh
$ uba init iuap my-page
```

##### Add page
```sh
$ uba page myPage
```

##### Develop
```sh
$ uba server
```

##### Build
```sh
$ uba build
```

##### Publishing Maven
```sh
$ uba publish
```
