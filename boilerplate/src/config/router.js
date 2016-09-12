import {
    Router
} from '../../vendor/director/director';

var router = new Router();
router.on('/page1', function () {
    require('../containers/page1/index.js')();
});
router.on('/page2', function () {
    require('../containers/page2/index.js')();
});
router.on('/page3', function () {
    require('../containers/page3/index.js')();
});
router.on('/page4', function () {
    require('../containers/page4/index.js')();
});
router.on('/page5', function () {
    require('../containers/page5/index.js')();
});
router.on('/page6', function () {
    require('../containers/page6/index.js')();
});
router.init();
