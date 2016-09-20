require('./index.less');
require('./index.css');

module.exports = {
    init: function () {
        require(['./index.html'], function (html) {
            document.querySelector('.content').innerHTML = html;
			$.get('page6.js');
        });
    }
};

// require(['./index.html'], function (html) {
// 	document.querySelector('.content').innerHTML = html;
// 	console.log(jQuery);
// });