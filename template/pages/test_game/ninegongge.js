define([ 'text!pages/test_game/ninegongge.html',  'print', 'share', 'qrcode'], function( template) {    //xzn

	var ctrlBathPath = ctx+'/test_game';     //xzn
	var app, viewModel, datas;
	var viewModel = {
		md: document.querySelector('#demo-mdlayout'),
		editoradd: '',
		searchText: ko.observable(''),
		searchFileds: ['nggcode','nggname'],    //xzn  搜索字段修改
		mainDataTable: new u.DataTable({
			meta: {
				'nggid':{
					type:'string'
				},
				'nggcode':{
					type:'string'
				},
				'nggname': {
					type: 'string'
				},
				'ngg11': {
					type: 'string'
				},
				'ngg12': {
					type: 'string'
				},
				'ngg13': {
					type: 'string'
				},
				'ngg14': {
					type: 'string'
				},
				'ngg15': {
					type: 'string'
				},
				'ngg16': {
					type: 'string'
				},
				'ngg17': {
					type: 'string'
				},
				'ngg18': {
					type: 'string'
				},
				'ngg19': {
					type: 'string'
				},
				'ngg21': {
					type: 'string'
				},
				'ngg22': {
					type: 'string'
				},
				'ngg23': {
					type: 'string'
				},
				'ngg24': {
					type: 'string'
				},
				'ngg25': {
					type: 'string'
				},
				'ngg26': {
					type: 'string'
				},
				'ngg27': {
					type: 'string'
				},
				'ngg28': {
					type: 'string'
				},
				'ngg29': {
					type: 'string'
				},
				'ngg31': {
					type: 'string'
				},
				'ngg32': {
					type: 'string'
				},
				'ngg33': {
					type: 'string'
				},
				'ngg34': {
					type: 'string'
				},
				'ngg35': {
					type: 'string'
				},
				'ngg36': {
					type: 'string'
				},
				'ngg37': {
					type: 'string'
				},
				'ngg38': {
					type: 'string'
				},
				'ngg39': {
					type: 'string'
				},
				'ngg41': {
					type: 'string'
				},
				'ngg42': {
					type: 'string'
				},
				'ngg43': {
					type: 'string'
				},
				'ngg44': {
					type: 'string'
				},
				'ngg45': {
					type: 'string'
				},
				'ngg46': {
					type: 'string'
				},
				'ngg47': {
					type: 'string'
				},
				'ngg48': {
					type: 'string'
				},
				'ngg49': {
					type: 'string'
				},
				'ngg51': {
					type: 'string'
				},
				'ngg52': {
					type: 'string'
				},
				'ngg53': {
					type: 'string'
				},
				'ngg54': {
					type: 'string'
				},
				'ngg55': {
					type: 'string'
				},
				'ngg56': {
					type: 'string'
				},
				'ngg57': {
					type: 'string'
				},
				'ngg58': {
					type: 'string'
				},
				'ngg59': {
					type: 'string'
				},
				'ngg61': {
					type: 'string'
				},
				'ngg62': {
					type: 'string'
				},
				'ngg63': {
					type: 'string'
				},
				'ngg64': {
					type: 'string'
				},
				'ngg65': {
					type: 'string'
				},
				'ngg66': {
					type: 'string'
				},
				'ngg67': {
					type: 'string'
				},
				'ngg68': {
					type: 'string'
				},
				'ngg69': {
					type: 'string'
				},
				'ngg71': {
					type: 'string'
				},
				'ngg72': {
					type: 'string'
				},
				'ngg73': {
					type: 'string'
				},
				'ngg74': {
					type: 'string'
				},
				'ngg75': {
					type: 'string'
				},
				'ngg76': {
					type: 'string'
				},
				'ngg77': {
					type: 'string'
				},
				'ngg78': {
					type: 'string'
				},
				'ngg79': {
					type: 'string'
				},
				'ngg81': {
					type: 'string'
				},
				'ngg82': {
					type: 'string'
				},
				'ngg83': {
					type: 'string'
				},
				'ngg84': {
					type: 'string'
				},
				'ngg85': {
					type: 'string'
				},
				'ngg86': {
					type: 'string'
				},
				'ngg87': {
					type: 'string'
				},
				'ngg88': {
					type: 'string'
				},
				'ngg89': {
					type: 'string'
				},
				'ngg91': {
					type: 'string'
				},
				'ngg92': {
					type: 'string'
				},
				'ngg93': {
					type: 'string'
				},
				'ngg94': {
					type: 'string'
				},
				'ngg95': {
					type: 'string'
				},
				'ngg96': {
					type: 'string'
				},
				'ngg97': {
					type: 'string'
				},
				'ngg98': {
					type: 'string'
				},
				'ngg99': {
					type: 'string'
				}
				
			},
			pageSize: 10
		}),
		infodata: new u.DataTable({
			meta: {
				'nggid':{
					type:'string'
				},
				'nggcode':{
					type:'string'
				},
				'nggname': {
					type: 'string'
				},
				'ngg11': {
					type: 'string'
				},
				'ngg12': {
					type: 'string'
				},
				'ngg13': {
					type: 'string'
				},
				'ngg14': {
					type: 'string'
				},
				'ngg15': {
					type: 'string'
				},
				'ngg16': {
					type: 'string'
				},
				'ngg17': {
					type: 'string'
				},
				'ngg18': {
					type: 'string'
				},
				'ngg19': {
					type: 'string'
				},
				'ngg21': {
					type: 'string'
				},
				'ngg22': {
					type: 'string'
				},
				'ngg23': {
					type: 'string'
				},
				'ngg24': {
					type: 'string'
				},
				'ngg25': {
					type: 'string'
				},
				'ngg26': {
					type: 'string'
				},
				'ngg27': {
					type: 'string'
				},
				'ngg28': {
					type: 'string'
				},
				'ngg29': {
					type: 'string'
				},
				'ngg31': {
					type: 'string'
				},
				'ngg32': {
					type: 'string'
				},
				'ngg33': {
					type: 'string'
				},
				'ngg34': {
					type: 'string'
				},
				'ngg35': {
					type: 'string'
				},
				'ngg36': {
					type: 'string'
				},
				'ngg37': {
					type: 'string'
				},
				'ngg38': {
					type: 'string'
				},
				'ngg39': {
					type: 'string'
				},
				'ngg41': {
					type: 'string'
				},
				'ngg42': {
					type: 'string'
				},
				'ngg43': {
					type: 'string'
				},
				'ngg44': {
					type: 'string'
				},
				'ngg45': {
					type: 'string'
				},
				'ngg46': {
					type: 'string'
				},
				'ngg47': {
					type: 'string'
				},
				'ngg48': {
					type: 'string'
				},
				'ngg49': {
					type: 'string'
				},
				'ngg51': {
					type: 'string'
				},
				'ngg52': {
					type: 'string'
				},
				'ngg53': {
					type: 'string'
				},
				'ngg54': {
					type: 'string'
				},
				'ngg55': {
					type: 'string'
				},
				'ngg56': {
					type: 'string'
				},
				'ngg57': {
					type: 'string'
				},
				'ngg58': {
					type: 'string'
				},
				'ngg59': {
					type: 'string'
				},
				'ngg61': {
					type: 'string'
				},
				'ngg62': {
					type: 'string'
				},
				'ngg63': {
					type: 'string'
				},
				'ngg64': {
					type: 'string'
				},
				'ngg65': {
					type: 'string'
				},
				'ngg66': {
					type: 'string'
				},
				'ngg67': {
					type: 'string'
				},
				'ngg68': {
					type: 'string'
				},
				'ngg69': {
					type: 'string'
				},
				'ngg71': {
					type: 'string'
				},
				'ngg72': {
					type: 'string'
				},
				'ngg73': {
					type: 'string'
				},
				'ngg74': {
					type: 'string'
				},
				'ngg75': {
					type: 'string'
				},
				'ngg76': {
					type: 'string'
				},
				'ngg77': {
					type: 'string'
				},
				'ngg78': {
					type: 'string'
				},
				'ngg79': {
					type: 'string'
				},
				'ngg81': {
					type: 'string'
				},
				'ngg82': {
					type: 'string'
				},
				'ngg83': {
					type: 'string'
				},
				'ngg84': {
					type: 'string'
				},
				'ngg85': {
					type: 'string'
				},
				'ngg86': {
					type: 'string'
				},
				'ngg87': {
					type: 'string'
				},
				'ngg88': {
					type: 'string'
				},
				'ngg89': {
					type: 'string'
				},
				'ngg91': {
					type: 'string'
				},
				'ngg92': {
					type: 'string'
				},
				'ngg93': {
					type: 'string'
				},
				'ngg94': {
					type: 'string'
				},
				'ngg95': {
					type: 'string'
				},
				'ngg96': {
					type: 'string'
				},
				'ngg97': {
					type: 'string'
				},
				'ngg98': {
					type: 'string'
				},
				'ngg99': {
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
					var key = 'search_LIKE__' + viewModel.searchFileds[i];      //xzn  这个地方因数据库字段的命名如果包含下划线或者特殊符号，需要修改
					queryData[key] = searchValue;
				}
		        
		        queryData["pageIndex"] = viewModel.mainDataTable.pageIndex();
		        queryData["pageSize"] = viewModel.mainDataTable.pageSize();
				$.ajax({
					type : 'GET',
					url : ctrlBathPath+'/ninegongge',      //xzn
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
			
			
			
			
//			searchKeyUp: function(model,event){
//				if (event.keyCode == '13'){
//					this.events.queryMain();
//				}
//				return true;
//			},
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
		                	url:ctx+'/test_game/del',      //xzn
		                	type:'post',
		                	data:{data:JSON.stringify(viewModel.mainDataTable.getSimpleData({type:'select',fields:['nggid','nggcode']}))},    //xzn
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
						//alert(data);
						u.messageDialog({
							msg: data,
							title: "电商连接器---组件---测试！",
							btnText: "OK"
					    });	
					}					
				});	
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

	var init = function(panel) {
		panel.innerHTML = template;
		var app = u.createApp({
			el: '#content',
			model: viewModel
		});
		viewModel.md = document.querySelector('#demo-mdlayout');
	    viewModel.events.queryMain();
	};

	return {
		'model': viewModel,
		'template': template,
		'init': init
	};
});