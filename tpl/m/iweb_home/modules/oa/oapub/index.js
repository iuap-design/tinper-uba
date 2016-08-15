require('bootstrap.css');
require('font-awesome.css');
require('beyond.css');
require('animate.css');
require('./css/index.css');

window.jQuery = window.$ =  require('./assets/jquery/jquery-1.11.2');
require('./assets/slimscroll/jquery.slimscroll.min');
require('./assets/bootstrap/js/bootstrap');
require('./assets/beyond/beyond');

var director = require('./assets/director/director');
var router = new director.Router();


var imgYunc = $('#yunc');
imgYunc.src= require('./images/yunc.png');
var imgJansen = $('#jansen');
imgJansen.src= require('./images/adam-jansen.jpg');

var comp1 = require('./component/comp1/comp1');
var comp2 = require('./component/comp1/comp1');



//$ = jQuery;
//
//$(function(){
//    comp1.comp1Test();
//})

/* 有两种功能打开方式：
 *   1.所有功能点打包在一起
 *   2.通过ensure不同的功能点分开打包，异步加载功能点
 *
 */
router.on('/page1', function(){
    //异步加载
    require.ensure([], function(require){
        var page1 = require('./pages/page1/page1');
        var _html = require('html!./pages/page1/page1.html');
        $('.content').empty();
        $('.content').html(_html)
        page1.init();
    });
});

router.on('/page2', function(){
    //同步加载
    var page2 = require('./pages/page2/page2');
    var _html = require('html!./pages/page2/page2.html');
    $('.content').empty();
    $('.content').html(_html)
    page2.init();
});

router.on('/page3', function(){
    //异步加载
    require.ensure([], function(require){
        var page1 = require('./pages/page3/page3');
        var _html = require('html!./pages/page3/page3.html');
        $('.content').empty();
        $('.content').html(_html)
        page3.init();
    });
});

router.init();


