require('./index.css');

module.exports = function() {
    require(['./index.html', 'jquery'], function(html, K) {
        console.log(K.fn.jquery);
        document.querySelector('.content').innerHTML = html;
    });
}
