require('./index.less');
require('./index.css');
var pageHtml = require('./index.html');
var getServerJson = function () {
	$.get("./api/demo/demo.json", { "action": "admin", "join": "jace" }, function (msg) {
		$("#page6").html("<h1>来自mock Server数据：" + JSON.stringify(msg) + "</h1>");
	}, "json");
}

module.exports = () => {
    document.querySelector('.content').innerHTML = pageHtml;
	getServerJson();
}