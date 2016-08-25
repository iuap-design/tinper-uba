//define([ 'text!pages/test_task/test_task.html', 'uui' ], function(template) {
$.get("./src/pages/test_task/test_task.html",function(template){
	var app = null, viewModel = {
		TestTaskJdbc : new u.DataTable({
			meta : {
				'testtaskid' : {

				},
				'testtaskcode' : {

				},
				'testtaskname' : {

				},
				'dotaskuserid' : {

				},
				'orderid' : {

				},
				'organigerid' : {

				},
				'orderbid' : {

				},
				'taskfee' : {

				},
				'issettle' : {

				},
				'isfinished' : {

				},
				'dr' : {

				},
				'ts' : {

				}
			},
			pageSize : 10
		})
	};
	//初始化方法,页面加载后被 调用
	var init = function(argument) {
		app = u.createApp({
			el : 'test_task',
			model : viewModel
		});
	};
	init(document.getElementById('content'));
},"html");