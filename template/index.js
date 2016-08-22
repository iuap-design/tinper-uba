require([
         'jquery',
         'knockout',
         'director',
         'polyfill',
         'bdtpl',
         'text!js/menumgr/menulist.html'
         ], function($, ko) {
    var layoutDom = require('text!js/menumgr/menulist.html');
    var MenuList = baidu.template(layoutDom);
    var nodeNames = {};
    window.addRouter = function(path, func) {
        var pos = path.indexOf('/:');
        var truePath = path;
        if (pos != -1)
            truePath = path.substring(0, pos);
        func = func || function() {
            document.getElementById("navTag").innerText = nodeNames["#" + path];
            var params = arguments;
            initPage('pages/' + truePath, params);
        }
        var tmparray = truePath.split("/");
        if (tmparray[1] in router.routes && tmparray[2] in router.routes[tmparray[1]] && tmparray[3] in router.routes[tmparray[1]][tmparray[2]]) {
            return;
        } else {
            router.on(path, func);
        }
    }

    window.router = Router();
    window.ko=ko;
    window.$ = $;
    ctx="/iuap_product_boot";
    fdfsread_server="172.16.50.238";
    maxUploadSize=102400;
    $(function() {
        initMenu();
    })

    //初始化页面
    function initPage(p, id) {
        var module = p;
      //  requirejs.undef(module);
        var content = document.getElementById("content");
        require([module], function(module) {
            ko.cleanNode(content);
            content.innerHTML = "";
            module.init(content);
        })
    }

    //初始化菜单
    function initMenu(){
    	var menuTreeList  = ctx+"/menumgr/menuList";
    	$.ajax({
            url: menuTreeList,
            type: 'GET',
            dataType: 'json',
            contentType: 'application/json',
            success: function (result) {
                if (result.status) {
                    for (var i = 0; i < result.data.length; i++) {
                		    node = result.data[i];
                		    nodeNames[node.funcId] = node.name;
                	  }
                    //渲染菜单的列表
                    $('#menuarea').empty().append(MenuList({data: result.data}));
                    //菜单点击事件
                    $('#menu').find("a").each(function() {
                        var path = this.hash.replace('#', '');
                        addRouter(path);
                    });
            		    window.router.init();
                } else {
                    result.msg ? alert(result.msg) : '';
                }
            },
            error: function (e) {
                alert(e.message || "网络请求失败");
            }
        });
    }
})
