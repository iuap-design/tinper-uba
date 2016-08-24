
$.get("./pages/school_student/student.html",function(template){
	var ctrlBathPath = '/school_student';
	var app, viewModel, datas;
	var viewModel = {
		md: document.querySelector('#demo-mdlayout'),
		editoradd: '',
		searchText: ko.observable(''),
		searchFileds: ['stu_code','stu_name'],
		mainDataTable: new u.DataTable({
			meta: {
				'stu_id':{
					type:'string'
				},
				'stu_code':{
					type:'string'
				},
				'stu_name': {
					type: 'string'
				},
				'stu_email': {
					type: 'string'
				},
				'stu_tele': {
					type: 'string'
				},
				'stu_contact': {
					type: 'string'
				}, //联系方式
				'class_depart': {
					type: 'string'
				}, //所在院系
				'class_section': {
					type: 'string'
				},//所选专业
				'class_name': {
					type: 'string'
				},//所在班级
				'class_id': {
					type: 'string'
				},//班级id
				'stu_sex': {
					type: 'string'
				},//性别
				'stu_enroll': {   //xzn
					type: 'date'
				} //入学日期

			},
			pageSize: 10
		}),
		infodata: new u.DataTable({
			meta: {

				'stu_id':{
					type:'string'
				},
				
				'stu_code':{
					type:'string'
				},
				'stu_name': {
					type: 'string'
				},
				'stu_email': {
					type: 'string'
				},
				'stu_tele': {
					type: 'string'
				},
				'stu_contact': {
					///联系方式
					type: 'string'
				},
				'class_depart': {
					//所在院系
					type: 'string'
				}, 
				'class_name': {
					//所在班级
					type: 'string'
				}, 
				'class_id': {
					//班级id
					type: 'string'
				}, 
				'stu_sex': {
					//性别
					type: 'string'
				}, 
				'class_section': {
					//所选专业
					type: 'string'									
				}, 				
				'stu_enroll': {       //xzn
					type: 'date'
				} //入学日期
			}
		}),
		
		events: {
			//查询主数据
			queryMain: function(){
				var queryData = {};
				var searchValue = viewModel.searchText();
				
				for (var i = 0; i < viewModel.searchFileds.length; i++) {
					var key = 'search_LIKE__' + viewModel.searchFileds[i];
					queryData[key] = searchValue;
				}
		        
		        queryData["pageIndex"] = viewModel.mainDataTable.pageIndex();
		        queryData["pageSize"] = viewModel.mainDataTable.pageSize();
				$.ajax({
					type : 'GET',
					url : ctrlBathPath+'/student',
					data : queryData,
					dataType : 'json',
					success : function(result) {
						var data = result.data;
						if(data!=null){
							viewModel.mainDataTable.setSimpleData(data.content);
							viewModel.mainDataTable.totalRow(data.totalElements);
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
		                	url:ctx+'/school_student/del',
		                	type:'post',
		                	data:{data:JSON.stringify(viewModel.mainDataTable.getSimpleData({type:'select',fields:['stu_id','stu_code']}))},
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
			},
			
			ecadapter: function() {
				$.ajax({
					url:ctx+'/ecadapter',
					type:'post',
					success: function(data){
						u.messageDialog({
							msg: data,
							title: "电商连接器---组件---测试！",
							btnText: "OK"
					    });	
					}					
				})					
			 },	
			
			viewRow: function(id) {
				//如果样式列表不含有checkbox说明不是第一列
//				if (event.target.classList.toString().indexOf('checkbox') < 0) { 
//					viewModel.mainDataTable.setRowFocus(id);
//					viewModel.md['u.MDLayout'].dGo('showPage');
				// 2016-07-28 liuyk 要求修改,谢正南修改的
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

	var init = function(panel) {
		panel.innerHTML = template;		var app = u.createApp({
			el: '#content',
			model: viewModel
		});
		viewModel.md = document.querySelector('#demo-mdlayout');
	    viewModel.events.queryMain();
	};

	init(document.getElementById('content'));

},"html");