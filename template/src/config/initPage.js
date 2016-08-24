/**
 * module : initPage
 * Kvkens(yueming@yonyou.com)
 * update : 2016-08-24 09:37:14
 */


function initPage(p, id) {
    //console.log("p=%s , id=%s",p,id);
    var module = p;
    var content = document.getElementById("content");
    // require([module], function (module) {
    //     ko.cleanNode(content);
    //     content.innerHTML = "";
    //     module.init(content);
    // });
    $.get(module+".js",function(module){
        ko.cleanNode(content);
        content.innerHTML = "";
        //module.init(content);
    });
}

export {initPage};