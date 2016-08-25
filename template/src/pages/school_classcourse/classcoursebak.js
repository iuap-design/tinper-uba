define([ 'jquery', 'text!pages/school_classcourse/classcourse.html' ,'u-grid'], function($, template) {
$.get("./src/pages/school_classcourse/classcourse.html",function(template){
			//--------------------------------模型方法的定义  start----
			var app, viewModel, datas;
			var viewModel = {
				dataTable : new u.DataTable({
					meta : {
						"name" : "",
						// xzn
						"classnode" : "",
						"classmon" : "",
						"classtue" : "",
						"classwed" : "",
						"classthu" : "",
						"classfri" : "",
						"classsat" : "",
						"classsun" : "",
						//---------------xzn
						"time" : "",
						"distance" : "",
						"currency" : ""
					}
				}),
				comItems : [ {
					"value" : "001",
					"name" : "1122"
				}, {
					"value" : "002",
					"name" : "3344"
				}, {
					"value" : "003",
					"name" : "4455"
				}, {
					"value" : "004",
					"name" : "5566"
				}, {
					"value" : "005",
					"name" : "6677"
				}, {
					"value" : "006",
					"name" : "7788"
				}, {
					"value" : "007",
					"name" : "8899"
				} ],
				eidtTypeFun : function(obj) {
					var gridObj = obj.gridObj;
					var viewModel = gridObj.viewModel;
					var field = obj.field;
					var ele = obj.element;
					var dataTableId = gridObj.dataTable.id;
					var innerStr = '<div class=\'u-datepicker\' style="width:100%;padding:0px;" u-meta=\'{"id":"'
							+ field
							+ '","type":"u-datetime","data":"'
							+ dataTableId
							+ '","field":"'
							+ field
							+ '"}\'><input class="u-input" type="text"></div>';
					var innerDom = u.makeDOM(innerStr);
					ele.innerHTML = '';
					ele.appendChild(innerDom);
					var comp = app.createComp(innerDom, viewModel);
					comp.comp.on('select', function() {
						// gridObj.nextEditShow();
					});
					comp.modelValueChange(obj.value);
				},
			};
			
			//----------使用dataTable进行表单开发 js  start----------------------
			
//			//定义数据模型
//			var dataTable1 = new u.DataTable({
//			    meta: {
//			        field1: {type:'string'},
//			        field2: {type:'number'}
//			    }
//			});
//
//			//执行绑定
//			u.createApp({
//			    el: 'body',
//			    model: dataTable1
//			});
//
//			//获取表单数据
//			$.ajax({
//			   type: 'get',
//			   url: '/getdatas',
//			   data:'',
//			   async:false,
//			   dataType:'JSON',
//			   success: function(rs) {
//			       if(rs){
//			         datas=rs;
//			       }
//			    }
//			});
//
//			//添加表单数据用于显示
//			dataTable1.setSimpleData(datas);
//
//			//选中添加的数据进行显示
//			dataTable1.setRowSelect(0);
//			
			//----------使用dataTable进行表单开发 js end-------------------------
			
			
			
			
			//--------------------------------模型方法的定义  end----
			var init = function() {
				//			-----------------------------------页面加载后的初始化方法     start----
				app = u.createApp({
					model : viewModel,
					el : '#classcourse'
				});
				// console.log(viewModel)
				// app.init(viewModel);
				var data = {
					"pageIndex" : 1,
					"pageSize" : 10,
					"rows" : [ 
					
					 {
							"status" : "nrm",
							"data" : {
								"name" : "xzn",
								"classnode" : "第一节",
								"classmon" : "物理",
								"classtue" : "化学",
								"classwed" : "化学",
								"classthu" : "化学",
								"classfri" : "化学",
								"classsat" : "化学",
								"classsun" : "化学"
							}
						},
						 {
							"status" : "nrm",
							"data" : {
								"name" : "xzn",
								"classnode" : "第二节",
								"classmon" : "物理",
								"classtue" : "化学",
								"classwed" : "化学",
								"classthu" : "化学",
								"classfri" : "化学",
								"classsat" : "化学"
							}
						},					 {
							"status" : "nrm",
							"data" : {
								"name" : "xzn",
								"classnode" : "第三节",
								"classmon" : "物理",
								"classtue" : "化学",
								"classwed" : "化学",
								"classthu" : "化学",
								"classfri" : "化学",
								"classsat" : "化学",
								"classsun" : "化学"
							}
						},
						 {
							"status" : "nrm",
							"data" : {
								"name" : "xzn",
								"classnode" : "第四节",
								"classmon" : "物理",
								"classtue" : "化学",
								"classwed" : "化学",
								"classthu" : "化学",
								"classfri" : "化学",
								"classsat" : "化学",
								"classsun" : "化学"
							}
						},					 {
							"status" : "nrm",
							"data" : {
								"name" : "xzn",
								"classnode" : "第五节",
								"classmon" : "物理",
								"classtue" : "化学",
								"classwed" : "化学",
								"classthu" : "化学",
								"classfri" : "化学",
								"classsat" : "化学",
								"classsun" : "化学"
							}
						},
						 {
							"status" : "nrm",
							"data" : {
								"name" : "xzn",
								"classnode" : "第六节",
								"classmon" : "物理",
								"classtue" : "化学",
								"classwed" : "化学",
								"classthu" : "化学",
								"classfri" : "化学",
								"classsat" : "化学",
								"classsun" : "化学"
							}
						},
						 {
							"status" : "nrm",
							"data" : {
								"name" : "xzn",
								"classnode" : "第七节",
								"classmon" : "物理",
								"classtue" : "化学",
								"classwed" : "化学",
								"classthu" : "化学",
								"classfri" : "化学",
								"classsat" : "化学",
								"classsun" : "化学"
							}
						},
						 {
							"status" : "nrm",
							"data" : {
								"name" : "xzn",
								"classnode" : "第八节",
								"classmon" : "物理",
								"classtue" : "化学",
								"classwed" : "化学",
								"classthu" : "化学",
								"classfri" : "化学",
								"classsat" : "化学",
								"classsun" : "化学"
							}
						},					 {
							"status" : "nrm",
							"data" : {
								"name" : "xzn",
								"classnode" : "第九节",
								"classmon" : "物理",
								"classtue" : "化学",
								"classwed" : "化学",
								"classthu" : "化学",
								"classfri" : "化学",
								"classsat" : "化学",
								"classsun" : "化学"
							}
						},
						 {
							"status" : "nrm",
							"data" : {
								"name" : "xzn",
								"classnode" : "第十节",
								"classmon" : "物理",
								"classtue" : "iUAP",
								"classwed" : "化学",
								"classthu" : "化学",
								"classfri" : "化学",
								"classsat" : "军事训练",
								"classsun" : "化学"
							}
						}
					
					
					
					
					]
				}
				viewModel.dataTable.removeAllRows();
				viewModel.dataTable.setData(data);
				//			-----------------------------------页面加载后的初始化方法     end---------
			}
			
	init(document.getElementById('content'));

},"html");
