require('./index.less');
require('./index.css');

module.exports = function() {
    require(['./index.html', 'jquery'], function(html, $) {
        console.log($("html").niceScroll());
        document.querySelector('.content').innerHTML = html;
        $.get('./api/demo/demo.json', {
            "action": "get"
        }, function(msg) {
            $("#page6").html(msg.data);
        }, 'json');
    });
}
