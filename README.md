[中文版本](https://github.com/iuap-design/tinper-uba/blob/master/README_CN.md)
# tinper-uba

[![npm version](https://img.shields.io/npm/v/tinper-uba.svg)](https://www.npmjs.com/package/uba)
[![Build Status](https://img.shields.io/travis/iuap-design/tinper-uba/master.svg)](https://travis-ci.org/iuap-design/tinper-uba)
[![devDependency Status](https://img.shields.io/david/dev/iuap-design/tinper-uba.svg)](https://david-dm.org/iuap-design/tinper-uba#info=devDependencies)



`uba` is a front-end develop tool which consist of initialize,local service,mock server,deploy. Just 5 command then the development can be done. lite and simple.

## Installation

```sh
$ npm install uba -g
```

## How to use
1、first initialize the uba project.
- `$ uba init uba-project`
- `uba` will create the project.

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
1. uba init <project name>     		Initialization best practices
2. uba page <myPage>                Add Page
3. uba server -p 3000          		Start develop server
4. uba build   						Constructing optimization static resources
5. uba publish 						Publish war to Maven
6. uba --version       				Version
7. uba --help  						Help
```
##### version
```sh
$ uba --help or -h
```

##### Initialize
```sh
$ uba init demo
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
