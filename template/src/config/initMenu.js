/**
 * module : initMenu
 * Kvkens(yueming@yonyou.com)
 * update : 2016-08-24 09:37:14
 */

import {addRouter} from './addRouter';
import layoutDom from '../../js/menumgr/menulist.html';
import {nodeNames} from './nodeNames';

export default function initMenu() {
    var baidu = require('../../js/baiduTemplate/baiduTemplate.js');
    //var nodeNames = {};
    var MenuList = baidu.template(layoutDom);
    $.ajax({
        url: "./mockJSON/list.json",
        type: 'GET',
        dataType: 'json',
        contentType: 'application/json',
        success: function (result) {
            if (result.status) {
                for (var i = 0; i < result.data.length; i++) {
                    var node = result.data[i];
                    nodeNames[node.funcId] = node.name;
                }
                //渲染菜单的列表
                $('#menuarea').empty().append(MenuList({ data: result.data }));
                //菜单点击事件
                $('#menu').find("a").each(function () {
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


