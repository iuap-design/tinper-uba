require('./index.css');
require('./index.less');
var pageHtml = require('./index.html');
module.exports = function () {
    document.querySelector('.content').innerHTML = pageHtml;
}