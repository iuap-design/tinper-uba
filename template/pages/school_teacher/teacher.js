//define([ 'text!pages/school_teacher/teacher.html',  'print', 'share', 'qrcode','ajaxfileupload','ossupload','jquery_cookie','interface_file','interface_file_impl'], function(  template) {
$.get("./pages/school_teacher/teacher.html",function(template){
	var ctrlBathPath = '/school_teacher';
	var app, viewModel, datas;
	var viewModel = {
		md: document.querySelector('#demo-mdlayout'),
		editoradd: '',
		searchText: ko.observable(''),
		searchFileds: ['teach_code','teach_name'],
		//----
		
		comboData:[{name:'男',value:'男'},{name:'女',value:'女'}],
		//----
		mainDataTable: new u.DataTable({
			meta: {
				'teach_id':{
					type:'string'
				},
				'teach_code':{
					type:'string'
				},
				'teach_name': {
					type: 'string'
				},
				'teach_email': {
					type: 'string'
				},
				'teach_tele': {
					type: 'string'
				},
				'teach_contact': {
					type: 'string'
				}, //联系方式

				'teach_sex': {
					type: 'string'
				},//性别
				'teach_enroll': {   //xzn
					type: 'date'
				}//参加工作日期
			},
			pageSize: 10
		}),
		infodata: new u.DataTable({
			meta: {
				'teach_id':{
					type:'string'
				},
				
				'teach_code':{
					type:'string'
				},
				'teach_name': {
					type: 'string'
				},
				'teach_email': {
					type: 'string'
				},
				'teach_tele': {
					type: 'string'
				},
				'teach_contact': {
					///联系方式
					type: 'string'
				},

				'teach_sex': {
					//性别
					type: 'string'
				}, 
				
				'teach_enroll': {       //xzn
					type: 'date'
				} //入学日期
			}
		}),
		filedata: new u.DataTable({
		}),
		fileVisible:false,
		events: {
			//查询主数据
			queryMain: function(){
				var queryData = {};
				var searchValue = viewModel.searchText();
				
				for (var i = 0; i < viewModel.searchFileds.length; i++) {
					var key = 'search_LIKE__' + viewModel.searchFileds[i];      //xzn  这个地方因数据库字段的命名如果包含下划线或者特殊符号，需要修改
					queryData[key] = searchValue;
				}
		        
		        queryData["pageIndex"] = viewModel.mainDataTable.pageIndex();
		        queryData["pageSize"] = viewModel.mainDataTable.pageSize();
				$.ajax({
					type : 'GET',
					url : ctrlBathPath+'/teacher',
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
			/*刘月凯 修改过这个function,请替换所有页面     -------开始*/
			searchKeyUp: function(model,event){
				if (event.keyCode == '13'){
					if(u.isIE){
						event.target.blur();
						this.events.queryMain();
						event.target.focus();
					}else{
						this.events.queryMain();
					}
				}
				return true;
			},
			/*刘月凯 修改过这个function,请替换所有页面     ------结束*/
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
				$("#filelist").addClass("hide");
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
			
			beforeEdit: function(id,teachId) {
				viewModel.mainDataTable.setRowSelect(id);
				viewModel.infodata.setSimpleData(viewModel.mainDataTable.getSimpleData({
					type: 'select'
				}));
				viewModel.editoradd = 'edit';
				viewModel.events.queryAllAttach(teachId);
				$("#filelist").removeClass("hide")
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
		                	url:ctx+'/school_teacher/del',
		                	type:'post',
		                	data:{data:JSON.stringify(viewModel.mainDataTable.getSimpleData({type:'select',fields:['teach_id','teach_code']}))},
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
			attachListVisible:function(value){
				return value;
			},
			addAttachRow: function() {
				var teach_code = this.infodata.getValue("teach_id");
				var par = {
						    fileElementId: "uploadbatch_id",  //【必填】文件上传空间的id属性  <input type="file" id="id_file" name="file" />,可以修改，主要看你使用的 id是什么
						    filepath: teach_code,   //【必填】单据相关的唯一标示，一般包含单据ID，如果有多个附件的时候由业务自己制定规则
						    groupname: "single",//【必填】分組名称,未来会提供树节点
						    permission: "read", //【选填】 read是可读=公有     private=私有     当这个参数不传的时候会默认private
						    url: true,          //【选填】是否返回附件的连接地址，并且会存储到数据库
						    thumbnail :  "500w",//【选填】缩略图--可调节大小，和url参数配合使用，不会存储到数据库
						    cross_url : "/filesystem/" ,//【选填】跨iuap-saas-fileservice-base 时候必填
						    isreplace : false,
						  }
			    var f = new interface_file();
		        f.filesystem_upload(par,function(data){
		        	   if(!data){
						 u.showMessage("上传附件失败");
					}
			        	if(-1 == data.status){
			        		u.showMessage(data.message);
			        	}else if(1 == data.status){
			        		viewModel.filedata.addSimpleData(data.data);
			        	}else if(0 == data.status){
			        		u.showMessage(data.message);
			        	}
		        });
			},
			queryAllAttach: function(teachId){
				var par = { 
					     //建议一定要有条件否则会返回所有值
						 filepath: teachId, //【选填】单据相关的唯一标示，一般包含单据ID，如果有多个附件的时候由业务自己制定规则
						 groupname: "single",//【选填】[分組名称,未来会提供树节点]
						 cross_url : "/filesystem/" ////【选填】跨iuap-saas-fileservice-base 时候必填
					 }
				 var f = new interface_file();
				 f.filesystem_query(par,function(result){
					 viewModel.filedata.clear();
					 if(!result){
						 u.showMessage("查询附件列表失败");
					 }
					 if(result.status == 1){
						 viewModel.filedata.setSimpleData(result.data);
					 }else if(result.status == -1){
						 u.showMessage(result.message);
					 }else if(result.status == 0){
						 result.message;
					 }
				 });	
			},
			deleteAttach:function(id,index){
				u.confirmDialog({
		            msg: "是否确认删除该附件？",
		            title: "删除附件",
		            onOk: function () {
		            	var par = {
					        	 id:id,//【必填】表的id
					        	 cross_url : "/filesystem/" ////【选填】跨iuap-saas-fileservice-base 时候必填
							  }
						 var f = new interface_file();
						 f.filesystem_delete(par,function(result){
							 if(!result){
								 u.showMessageDialog("删除附件失败！");
								 return;
							 }
							 if(result.status == 0 || result.status == -1){
								 u.showMessageDialog(result.message);
							 }else if(result.status == 1){
								 u.showMessageDialog(result.message);
								 viewModel.filedata.removeRow(index);
							 }
						 });
		            },
		            onCancel: function () {
		                
		            }
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
				});	
			 },	
			 
				viewRow: function(id) {
//			 viewRow: function(id,teachId) {
				//如果样式列表不含有checkbox说明不是第一列
//				if (event.target.classList.toString().indexOf('checkbox') < 0) { 
//					viewModel.mainDataTable.setRowFocus(id);
//					viewModel.events.queryAllAttach(teachId);
//					viewModel.md['u.MDLayout'].dGo('showPage');
					
					// 2016-07-28 liuyk 要求修改,谢正南修改的
					if(typeof event == 'undefined')
						event = arguments.callee.caller.arguments[0]
					//如果样式列表不含有checkbox说明不是第一列
	                var tar = event.target || event.srcElement;
	                if (!u.hasClass(tar,'checkbox')) { 
	                    viewModel.mainDataTable.setRowFocus(id);
	                //    viewModel.events.queryAllAttach(teachId);
	                    viewModel.md['u.MDLayout'].dGo('showPage');

					
				}
			},
			pageChangeFunc: function(index){
				viewModel.mainDataTable.pageIndex(index);
				viewModel.events.queryMain();		
			},
			sizeChangeFunc: function(size){
				viewModel.mainDataTable.pageSize(size);
				viewModel.mainDataTable.pageIndex(0);
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