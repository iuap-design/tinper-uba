require('./index.css');
var pageHtml = require('./index.html');
module.exports = () => {
    document.querySelector('.content').innerHTML = pageHtml;
}