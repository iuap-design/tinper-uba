import {Router} from '../vendor/director/director';
import {changePage} from '../static/js/changePage';

var router = new Router();

router.on('/page1', function () {
	var pageHtml = require('../containers/page1/index.html');
	var pageJs = require('../containers/page1/index.js');
	require('../containers/page1/index.css');
	changePage('.content', pageHtml);
	pageJs.init();
});
router.on('/page2', function () {
	var pageHtml = require('../containers/page2/index.html');
	var pageJs = require('../containers/page2/index.js');
	require('../containers/page2/index.css');
	changePage('.content', pageHtml);
	pageJs.init();
});
router.on('/page3', function () {
	var pageHtml = require('../containers/page3/index.html');
	var pageJs = require('../containers/page3/index.js');
	require('../containers/page3/index.css');
	changePage('.content', pageHtml);
	pageJs.init();
});
router.on('/page4', function () {
	var pageHtml = require('../containers/page4/index.html');
	var pageJs = require('../containers/page4/index.js');
	require('../containers/page4/index.css');
	changePage('.content', pageHtml);
	pageJs.init();
});
router.on('/page5', function () {
	var pageHtml = require('../containers/page5/index.html');
	var pageJs = require('../containers/page5/index.js');
	require('../containers/page5/index.css');
	changePage('.content', pageHtml);
	pageJs.init();
});
router.on('/page6', function () {
	var pageHtml = require('../containers/page6/index.html');
	var pageJs = require('../containers/page6/index.js');
	
	changePage('.content', pageHtml);
	pageJs.init();
});


router.init();