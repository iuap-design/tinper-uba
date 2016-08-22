require.config({
	baseUrl: ".",
	paths: {
	   'bdtpl': "js/baiduTemplate/baiduTemplate",
		text: "vendor/requirejs/text",
		css: "vendor/requirejs/css",
		jquery: "vendor/jquery/jquery-1.11.2",
		bootstrap: 'vendor/bootstrap/js/bootstrap',
		knockout: "vendor/knockout/knockout-3.2.0.debug",
		uui: "vendor/uui/js/u",
		'u-grid':"vendor/uui/js/u-grid",
		'polyfill': "vendor/uui/js/u-polyfill",
		director:"vendor/director/director",
		my:'js/huyue',
		pages:"pages",
		print:"js/print",
		share:"js/share",
		qrcode:"js/qrcode",
		ajaxfileupload:"js/filesystem/ajaxfileupload",
		interface_file_impl:"js/filesystem/interface.file.impl",
		interface_file:"js/filesystem/interface.file",
		jquery_cookie:"js/filesystem/jquery.cookie",
		ossupload:"js/filesystem/ossupload"
	},
	shim: {
		'bdtpl': {
			exports: 'baidu'
		},
		'uui':{
			deps:["knockout"]
		},
		'u-grid':{
			deps:["uui","css!vendor/uui/css/grid.css"]
		},
		'bootstrap': {
			deps: ["jquery"]
		}
	}
});
