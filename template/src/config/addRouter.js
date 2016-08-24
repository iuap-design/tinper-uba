/**
 * module : route
 * Kvkens(yueming@yonyou.com)
 * update : 2016-08-24 09:37:14
 */
import {initPage} from './initPage';
import {nodeNames} from './nodeNames';


const addRouter = function (path, func) {
    var pos = path.indexOf('/:');
    var truePath = path;
    if (pos != -1)
        truePath = path.substring(0, pos);
    func = func || function () {
        document.getElementById("navTag").innerText = nodeNames["#" + path];
        var params = arguments;
        initPage('./pages/' + truePath, params);
    }
    var tmparray = truePath.split("/");
    if (tmparray[1] in router.routes && tmparray[2] in router.routes[tmparray[1]] && tmparray[3] in router.routes[tmparray[1]][tmparray[2]]) {
        return;
    } else {
        router.on(path, func);
    }
}

export { addRouter };