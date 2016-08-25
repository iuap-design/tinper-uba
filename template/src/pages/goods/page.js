//define([ 'text!pages/goods/page.html', 'print', 'share', 'qrcode'], function(  template) {
$.get("./src/pages/goods/page.html",function(template){
	var ctrlBathPath = '/goods';
	var app, viewModel, datas;
	var viewModel = {
		md: document.querySelector('#demo-mdlayout'),
		editoradd: '',
		searchText: ko.observable(''),
		searchFileds: ['productName','supplier'],
		mainDataTable: new u.DataTable({
			meta: {
				'productid':{
					type:'string'
				},
				'productName': {
					type: 'string'
				},
				'productNum': {
					type: 'integer'
				},
				'price': {
					type: 'float'
				},
				'supplier': {
					type: 'string'
				}, //供应商
				'proDate': {
					type: 'date'
				}, //生成日期
				'orgin': {
					type: 'string'
				} //原产地
			},
			pageSize: 10
		}),
		infodata: new u.DataTable({
			meta: {
				'productid':{
					type:'string'
				},
				'productName': {
					type: 'string'
				},
				'productNum': {
					type: 'integer',
					precision: 0,
					min: 0
				},
				'price': {
					type: 'float',
					precision: 2,
					min: 0
				},
				'supplier': {
					//供应商
					type: 'string'
				},
				'proDate': {
					//生成日期
					type: 'date'
				}, 
				'orgin': {
					//原产地
					type: 'string'
				} 
			}
		}),
		
		events: {
			//查询主数据
			queryMain: function(){
				var queryData = {};
				var searchValue = viewModel.searchText();
				
				for (var i = 0; i < viewModel.searchFileds.length; i++) {
					var key = 'search_LIKE_' + viewModel.searchFileds[i];
					queryData[key] = searchValue;
				}
		        
		        queryData["pageIndex"] = viewModel.mainDataTable.pageIndex();
		        queryData["pageSize"] = viewModel.mainDataTable.pageSize();
				$.ajax({
					type : 'GET',
					url : ctrlBathPath+'/page',
					data : queryData,
					dataType : 'json',
					success : function(result) {
						var data = result.data;
						if(data!=null){
							viewModel.mainDataTable.setSimpleData(data.content);
							viewModel.mainDataTable.totalPages(data.totalPages);
						} else {
							
						}
					}
				});
			},
			//搜索
			search: function(){
				this.events.queryMain();
			},
			searchKeyUp: function(model,event){
				if (event.keyCode == '13'){
					this.events.queryMain();
				}
				return true;
			},
			afterAdd:function(element, index, data){
	            if (element.nodeType === 1) {
	                u.compMgr.updateComp(element);
	            }
	        },
			goBack: function() {
				viewModel.md['u.MDLayout'].dBack();
			},
			goPage: function(pathStr) {
				viewModel.md['u.MDLayout'].dGo(pathStr);
			},
			beforeAdd: function() {
				viewModel.editoradd = 'add';
				viewModel.infodata.clear();
				viewModel.infodata.createEmptyRow();
				viewModel.infodata.setRowSelect(0);
				viewModel.md['u.MDLayout'].dGo('addPage');
			},
			addOrEditRow: function() {
				var self = this;
				var _meta = this.mainDataTable.meta;
				var addInfo = this.infodata.getAllRows();
				var url = '';
				var postData = {};
				if (this.editoradd === 'add') {
					url = ctrlBathPath+'/save';
					postData = JSON.stringify(this.infodata.getSimpleData()[0]);
				} else {
					url = ctrlBathPath+'/update';
					postData = JSON.stringify(self.infodata.getSimpleData({type:'select'})[0]);
				}
				$.ajax({
					url:url,
					type:'POST',
					contentType: 'application/json',
					data:postData,
					success:function(res){
						if (res.flag == 'success'){
							if (self.editoradd === 'add'){
								self.mainDataTable.addSimpleData(res.data);
							}else{
								var curRow = viewModel.mainDataTable.getCurrentRow();
								curRow.setSimpleData(viewModel.infodata.getCurrentRow().getSimpleData(), 'upd');

							}
							viewModel.md['u.MDLayout'].dBack();
							u.showMessage('保存成功！');								
						}else{
							u.showMessageDialog(res.msg);
						}
					},
					error:function(){
						//待显示错误信息
					}
				});
				
			},
			
			beforeEdit: function(id) {
				viewModel.mainDataTable.setRowSelect(id);
				viewModel.infodata.setSimpleData(viewModel.mainDataTable.getSimpleData({
					type: 'select'
				}));
				viewModel.editoradd = 'edit';
				viewModel.md['u.MDLayout'].dGo('addPage');
			},
			
			delRow: function() {
				var selectArray = viewModel.mainDataTable.selectedIndices();
				if (selectArray.length < 1) {
					u.messageDialog({
						msg: "请选择要删除的行!",
						title: "提示",
						btnText: "OK"
					});
					return;
				}
		        u.confirmDialog({
		            msg: "是否确认删除？",
		            title: "测试确认",
		            onOk: function () {
		                $.ajax({
		                	url:ctx+'/goods/del',
		                	type:'post',
		                	data:{data:JSON.stringify(viewModel.mainDataTable.getSimpleData({type:'select',fields:['productid']}))},
		                	success: function(){
		                		u.showMessage('删除成功！');
		                		viewModel.events.queryMain();
		                	}
		                });
		            },
		            onCancel: function () {
		                
		            }
		        });
			},
			
			print: function() {
				Print.printByElementIds([ "table-list" ]);							
			},	
			
			print2: function() {
				$.ajax({
					url:ctx+'/PrintController',
					type:'post',
					success: function(){						
					}					
				})					
			},	
			
			share: function() {
				document.getElementById('light').style.display='block';			
			},
			
			addAttachRow: function() {
				u.messageDialog({
						msg: "应用组件---附件---测试!",
						title: "提示",
						btnText: "OK"
				});
				return;				
			},
						
			viewRow: function(id) {
				//如果样式列表不含有checkbox说明不是第一列
//				if (event.target.classList.toString().indexOf('checkbox') < 0) { 
//					viewModel.mainDataTable.setRowFocus(id);
//					viewModel.md['u.MDLayout'].dGo('showPage');
				
				if(typeof event == 'undefined')
					event = arguments.callee.caller.arguments[0]
				//如果样式列表不含有checkbox说明不是第一列
                var tar = event.target || event.srcElement;
                if (!u.hasClass(tar,'checkbox')) { 
                    viewModel.mainDataTable.setRowFocus(id);
                    viewModel.md['u.MDLayout'].dGo('showPage');

				
				
				}
			},
			pageChangeFunc: function(index){
				viewModel.mainDataTable.pageIndex(index);
				viewModel.events.queryMain();		
			},
			sizeChangeFunc: function(size){
				viewModel.mainDataTable.pageSize(size);
				viewModel.mainDataTable.pageIndex(0); //添加此行代码  刘月凯修改  20160726  xzn复制 
				viewModel.events.queryMain();
			}
		}
	};

	var init = function(params) {
		params.innerHTML = template;
		var app = u.createApp({
			el: '#content',
			model: viewModel
		});
		viewModel.md = document.querySelector('#demo-mdlayout');
	    viewModel.events.queryMain();
	};

	init(document.getElementById('content'));

},"html");