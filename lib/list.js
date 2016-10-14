/**
 * Module : uba list
 * Author : Kvkens(yueming@yonyou.com)
 * Date	  : 2016-10-14 15:13:39
 * Update : 2016-10-14 15:13:43
 */

const request = require('request');
const chalk = require('chalk');

module.exports = () => {
    request({
        url: 'https://api.github.com/users/uba-templates/repos',
        headers: {
            'User-Agent': 'uba'
        }
    }, function(err, res, body) {
        if (err) console.log(err);
        var requestBody = JSON.parse(body);
        if (Array.isArray(requestBody)) {
            console.log('uba官方在线最佳实践模板如下：');
            console.log();
            requestBody.forEach(function(repo) {
                console.log(
                    '  ' + chalk.yellow('★') +
                    '  ' + chalk.blue(repo.name) +
                    ' - ' + repo.description)
            });
            console.log();
        } else {
            console.error(requestBody.message);
        }
    });
}
