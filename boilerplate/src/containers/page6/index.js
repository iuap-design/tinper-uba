require('./index.less');
module.exports = {
	init: function() {
		this.getServerJson();
	},
	getServerJson: function() {
		$.get("./api/demo/demo.json",{"action":"admin","join":"jace"}, function(msg) {
			$("#page6").html("来自mock Server数据：" + JSON.stringify(msg));
		}, "json");
	}
}