require('./index.css');
module.exports = {
    init: function () {
        require(['./index.html'], function (html) {
            document.querySelector('.content').innerHTML = html;
        });
    }
};