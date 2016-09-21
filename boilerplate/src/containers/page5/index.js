require('./index.css');

module.exports = function() {
    require(['./index.html'], function(html) {
        document.querySelector('.content').innerHTML = html;
    });
}
