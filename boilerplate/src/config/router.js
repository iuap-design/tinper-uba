require(['../../vendor/director/director'], function(director) {
    var router = new director.Router();

    router.on('/page1', function() {
        require('../containers/page1/index')();
    });
    router.on('/page2', function() {
        require('../containers/page2/index')();
    });
    router.on('/page3', function() {
        require('../containers/page3/index')();
    });
    router.on('/page4', function() {
        require('../containers/page4/index')();
    });
    router.on('/page5', function() {
        require('../containers/page5/index')();
    });
    router.on('/page6', function() {
        require('../containers/page6/index')();
    });

    router.init();
});
