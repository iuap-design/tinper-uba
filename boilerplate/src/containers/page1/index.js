module.exports = {
    init: function () {
        require(['./index.css', './index.html'], function (css, html) {
            document.querySelector('.content').innerHTML = html;
        });
    }
};