import {Router} from '../vendor/director/director.js';
import {changePage} from '../static/js/changePage.js';

var page1 = function() {
	changePage('.content','<h1>第一个演示页面</h1>');
};
var page2 = function() {
	changePage('.content','<h1>第二个演示页面</h1>');
};
var page3 = function() {
	changePage('.content','<h1>第三个演示页面</h1>');
};
var page4 = function() {
	changePage('.content','<h1>第四个演示页面</h1>');
};
var page5 = function() {
	changePage('.content','<h1>第五个演示页面</h1>');
};


var routes = {
	'/page1': page1,
	'/page2': page2,
	'/page3': page3,
	'/page4': page4,
	'/page5': page5
};

var router = Router(routes);

router.init();