module.exports = {
	init: function() {
		this.getServerJson();
	},
	getServerJson: function() {
		$.post("./api/demo/demo.json", function(msg) {
			$("#page6").html("来自mock Server数据：" + JSON.stringify(msg));
		}, "json");
	}
}