require(['../../vendor/director/director'], function (director) {
    var router = new director.Router();
    router.on('/page1', function () {
        require('../containers/page1/index').init();
    });
    router.on('/page2', function () {
        require('../containers/page2/index').init();
    });
    router.on('/page3', function () {
        require('../containers/page3/index').init();
    });
    router.on('/page4', function () {
        require('../containers/page4/index').init();
    });
    router.on('/page5', function () {
        require('../containers/page5/index').init();
    });
    router.on('/page6', function () {
        require('../containers/page6/index').init();
    });

    router.init();
});