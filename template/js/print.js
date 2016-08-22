var Print = {
	init:function(){
		$('head').append('<style type="text/css">'+this.template.noPrint+'</style>');
	},
	/**
	 * 直接调用浏览器函数打印
	 */
	directDocument : function() {
		window.print();
	},
	/**
	 * 打印Id所代表元素内所有内容
	 * 
	 * @param 需要打印元素的Id
	 */
	printByElementId : function(e_id) {
		$("*", $(document.body)).addClass("noprint");
		this.renderElement($("#" + e_id));
		window.print();
	},
	/**
	 * 打印Id所代表元素内所有内容
	 * 
	 * @param 需要打印元素的Id数组
	 */
	printByElementIds : function(e_ids) {
		$("*", $(document.body)).addClass("noprint");
		if (e_ids.constructor == Array) {

//			for ( var i in e_ids) {
//				this.renderElement($("#" + e_ids[i]));
//			}
		    for(var i = 0; i < e_ids.length; i++){
                this.renderElement($("#" + e_ids[i]));
            }
		} else {
			this.renderElement($("#" + e_ids));
		}
		window.print();
	},

	/**
	 * 
	 * @param e_css
	 *            含有e_css元素的样式
	 */
	printByElementCss : function(e_css) {
		$("*", $(document.body)).addClass("noprint");
		this.renderElement($("." + e_css));
		window.print();
	},
	/**
	 * 
	 * @param e_css
	 *            含有e_css元素的样式数组
	 */
	printByElementCsses : function(e_csses) {
		$("*", $(document.body)).addClass("noprint");
		if (e_csses.constructor == Array) {
			for ( var i in e_csses) {
				this.renderElement($("." + e_csses[i]));
			}
		} else {
			this.renderElement($("." + e_csses));
		}
		window.print();
	},
	/**
	 * 控制元素的样式，是打印失效
	 * 
	 * @param obj
	 *            jquery对象
	 */
	renderElement : function(obj) {
		if (obj == undefined) {
			$("*", $(document.body)).removeClass("noprint");
			return;
		}

		obj.removeClass("noprint");
		$("*", obj).removeClass("noprint");
		var parent = obj.parent();

		while (parent != undefined && parent.hasClass('noprint')) {
			parent.removeClass("noprint");
			parent = parent.parent();
		}
	},
	printByTemplate : function() {
		var html = '<!DOCTYPE html>';
		html += '<html><head>'+this.template.defaultTitle;
		html += this.template.defaultMeta;
		html += '<style type="text/css">' + this.template.style()+ this.template.noPrint+'</style></head>';

		window.printdata = this.template.data();
		var tpl = this.template.template();
		var body = _.template(tpl)();
		html += '<body>' +this.template.printBtn+ body + '</body></html>';
		var id = parseInt(Math.random()*1000000);
		var win = window.open('','win'+id ,'width=900, resizable=yes,location = no');
		win.document.write(html);
		win.focus();  
		win.document.close();  

	},
	template : {
		style :function(){
			try{
				return getStyle();
			}catch(e){
				return '';
			}
		},
		noPrint:'@media print {.noprint {display: none;}}',
		printBtn:'<div class="noprint" align="center"><button onclick="javascript:window.print();">打印</button></div>',
		data : function(){
			try{
				return getJsonData();
			}catch(e){
				alert('function "getJsonData" not found !');
				throw e;
			}
		},
		template :function(){
			try{
				return getTemplate();
			}catch(e){
				alert('function "getTemplate" not found !');
				throw e;
			}
		},
		defaultMeta:'<meta http-equiv="content-type" content="text/html;charset=utf-8">',
		defaultTitle:'<title>订单打印</title>'
	}
};

Print.init();
