/**
 * Module : uba boots
 * Author : Kvkens(yueming@yonyou.com)
 * Date	  : 2016-10-13 19:51:37
 * Update : 2016-10-13 19:51:43
 */

const http = require('http');
const url = require('url');
const fs = require('fs');
const mine = require('./mine').types;
const path = require('path');
const help = require('./help');
const chalk = require('chalk');
module.exports = () => {
    var ubaConfig = help.getUbaConfig();
    var server = http.createServer(function(request, response) {
        var method = request.method;
        var params = null;
        if (method.toLowerCase() == "get") {
            params = url.parse(request.url).query;
        }
        request.on("data", function(data) {
            params = (decodeURIComponent(data));
        });
        request.on("end", function(data) {
            console.log(chalk.green(`[mockServer] 当前请求:${method}方式,数据为:${params}`));
        });

        var pathname = url.parse(request.url).pathname;
        var realPath = path.join("mock", pathname);
        var ext = path.extname(realPath);
        ext = ext ? ext.slice(1) : 'unknown';
        fs.exists(realPath, function(exists) {
            if (!exists) {
                response.writeHead(404, {
                    'Content-Type': 'text/plain'
                });
                response.write(`This request URL ${pathname} was not found on this server.`);
                response.end();
            } else {

                if (realPath.indexOf('.') !== -1) {
                    fs.readFile(realPath, "binary", function(err, file) {
                        if (err) {
                            response.writeHead(500, {
                                'Content-Type': 'text/plain'
                            });
                            response.end(err);
                        } else {
                            var contentType = mine[ext] || "text/plain";
                            response.writeHead(200, {
                                'Content-Type': contentType
                            });
                            response.write(file, "binary");
                            response.end();
                        }
                    });
                } else {
                    response.write(`This request URL ${pathname} was not found on this server.`);
                    response.end();
                }
            }
        });
    });
    server.listen(ubaConfig.mockServer.port, ubaConfig.mockServer.host, function() {
        help.info(`mockServer 已经开启 本地端口: ${ubaConfig.mockServer.port}.`);
    });
}
