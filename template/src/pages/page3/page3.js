//define(['text!pages/page2/page2.html'], function(template) {
$.get("./pages/page2/page2.html",function(template){
	var viewModel={};
	var init=function  (argument) {
		// body...
	}

	init(document.getElementById('content'));

},"html");