//define(['text!pages/page1/page1.html'], function(template) {
	$.get("./pages/page1/page1.html",function(template){
	var viewModel={};
	var init=function  (argument) {
		// body...
	}
	init(document.getElementById('content'));
},"html");