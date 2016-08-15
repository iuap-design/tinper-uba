//CSS
require('../vendor/font-awesome/css/font-awesome.min.css');
require('../vendor/uui/css/u.css');
require('./styles/style.css');

//JS
require('../vendor/uui/js/u');
//Router
var director  = require('../vendor/director/director');

var router = new director.Router();
window.router = router;

var userImg = document.getElementById('userImg');
userImg.src = require('./static/images/user.jpg');
//异步加载
router.on('home', function(){
    require.ensure([], function(require){
        var page1 = require('./pages/page1/page1');
        var _html = require('html!./pages/page1/page1.html');
        $('#content').empty();
        $('#content').html(_html);
        page1.init();
    });
});

router.on('inbox', function(){
        var page2 = require('./pages/page2/page2');
        var _html = require('html!./pages/page2/page2.html');
        $('#content').empty();
        $('#content').html(_html);
        page2.init();

});


router.init();
