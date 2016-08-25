//define([  'text!pages/docs/doc.html'  ], function( template) {
$.get("./src/pages/docs/doc.html",function(template){
	var ctrlBathPath = '/docsjpa';
	var app, viewModel, datas;
	var viewModel = {
		md : document.querySelector('#demo-mdlayout'),
		editoradd : '',
		searchText : ko.observable(''),
		searchFileds : [ 'filename', 'note' ],
		canSave : ko.observable(true),
		mainDataTable : new u.DataTable({
			meta : {
				'doc_id' : {
					type : 'string'
				},
				'filename' : {
					type : 'string'
				},
				'note' : {
					type : 'string'
				}
			},
			pageSize : 10
		}),
		infodata : new u.DataTable({
			meta : {
				'doc_id' : {
					type : 'string'
				},
				'filename' : {
					type : 'string'
				},
				'note' : {
					type : 'string'
				}
			}
		}),
		searchDataTable : new u.DataTable({
			meta : {
				'doc_id' : {
					type : 'string'
				},
				'filename' : {
					type : 'string'
				},
				'note' : {
					type : 'string'
				}
			},
			pageSize : 10
		}),

		events : {
			searchMain : function() {
				var queryData = {};
				var searchValue = $("#search-value-input")[0].value;
				queryData["searchValue"] = searchValue;
				queryData["pageIndex"] = viewModel.searchDataTable.pageIndex();
				queryData["pageSize"] = viewModel.searchDataTable.pageSize();

				$.ajax({
					type : 'GET',
					url : ctrlBathPath + '/search',
					data : queryData,
					dataType : 'json',
					success : function(result) {
						var data = result.data;
						if (data != null) {
							viewModel.searchDataTable
									.setSimpleData(data.content);
							viewModel.searchDataTable
									.totalPages(data.totalPages);
						} else {

						}
					}
				});
			},
			// 查询主数据
			queryMain : function() {
				var queryData = {};
				var searchValue = viewModel.searchText();

				for (var i = 0; i < viewModel.searchFileds.length; i++) {
					var key = 'search_LIKE_' + viewModel.searchFileds[i];
					queryData[key] = searchValue;
				}

				queryData["pageIndex"] = viewModel.mainDataTable.pageIndex();
				queryData["pageSize"] = viewModel.mainDataTable.pageSize();
				$
						.ajax({
							type : 'GET',
							url : ctrlBathPath + '/page',
							data : queryData,
							dataType : 'json',
							success : function(result) {
								var data = result.data;
								if (data != null) {
									viewModel.mainDataTable
											.setSimpleData(data.content);
									viewModel.mainDataTable
											.totalPages(data.totalPages);
								} else {

								}
							}
						});
			},
			// 搜索
			search : function() {
				viewModel.events.queryMain();
			},
			searchKeyUp : function(model, event) {
				if (event.keyCode == '13') {
					$("#search-show").hide();
					this.events.queryMain();
				} else if (event.keyCode == '27') {
					$("#search-show").hide();
				} else {
					var searchValue = $("#search-value-input")[0].value;
					if (searchValue == "") {
						$("#search-show").hide();
					} else {
						viewModel.events.searchMain();
						$("#search-show").show();
					}
				}
				return true;
			},
			searchBlur : function() {
				$("#search-show").hide();
			},
			afterAdd : function(element, index, data) {
				if (element.nodeType === 1) {
					u.compMgr.updateComp(element);
				}
			},
			goBack : function() {
				viewModel.md['u.MDLayout'].dBack();
			},
			goPage : function(pathStr) {
				viewModel.md['u.MDLayout'].dGo(pathStr);
			},
			fileChange : function(event) {
				var size = event.currentTarget.files[0].size;
				if (size > maxUploadSize) {
					u.messageDialog({
						msg : "上传文件大小超过 " + maxUploadSize + " byte, 请重新选择!",
						title : "提示",
						btnText : "OK"
					});
					viewModel.events.resetFileSelect();
				}
			},
			resetFileSelect : function() {
				$("#file")[0].outerHTML = $("#file")[0].outerHTML;
				$("#file").change(viewModel.events.fileChange);
			},
			beforeAdd : function() {
				viewModel.events.resetFileSelect();
				viewModel.editoradd = 'add';
				viewModel.infodata.clear();
				viewModel.infodata.createEmptyRow();
				viewModel.infodata.setRowSelect(0);
				viewModel.md['u.MDLayout'].dGo('addPage');
			},
			addOrEditRow : function() {
				var self = this;
				var url = '';
				var postData = new FormData();
				var file = $("#file")[0].files[0];
				if (this.editoradd === 'add') {
					if (!file) {
						u.messageDialog({
							msg : "新增需要选择上传文件",
							title : "提示",
							btnText : "OK"
						});
						return;
					}
					url = ctrlBathPath + '/save';
				} else {
					var curRow = viewModel.mainDataTable.getCurrentRow();
					var doc_id = curRow.getValue("doc_id");
					postData.append('doc_id', doc_id);
					url = ctrlBathPath + '/update';
				}
				postData.append('note', $("#note")[0].value);
				postData.append('file', file);
				viewModel.canSave(false);
				$.ajax({
					url : url,
					type : 'POST',
					contentType : false,
					processData : false,
					data : postData,
					success : function(res) {
						if (res.flag == 'success') {
							if (self.editoradd === 'add') {
								self.mainDataTable.addSimpleData(res.data);
							} else {
								var data = viewModel.infodata.getCurrentRow()
										.getSimpleData();
								if (file) {
									data.filename = file.name;
								}
								curRow.setSimpleData(data, 'upd');
							}
							viewModel.md['u.MDLayout'].dBack();
							u.showMessage('保存成功！');
						} else {
							u.showMessageDialog(res.msg);
						}
						viewModel.canSave(true);
					},
					error : function() {
						// 待显示错误信息
					}
				});
			},

			beforeEdit : function(id) {
				viewModel.events.resetFileSelect();
				viewModel.mainDataTable.setRowSelect(id);
				viewModel.infodata.setSimpleData(viewModel.mainDataTable
						.getSimpleData({
							type : 'select'
						}));
				viewModel.editoradd = 'edit';
				viewModel.md['u.MDLayout'].dGo('addPage');
			},

			download : function(id) {
				viewModel.mainDataTable.setRowSelect(id);
				var doc_id = viewModel.mainDataTable.getCurrentRow().getValue(
						'doc_id');

				$("#download_form_doc_id").val(doc_id);
				$("#download_form").submit();
			},

			delRow : function() {
				var selectArray = viewModel.mainDataTable.selectedIndices();
				if (selectArray.length < 1) {
					u.messageDialog({
						msg : "请选择要删除的行!",
						title : "提示",
						btnText : "OK"
					});
					return;
				}
				u.confirmDialog({
					msg : "是否确认删除？",
					title : "测试确认",
					onOk : function() {
						$.ajax({
							url : ctx + '/docsjpa/del',
							type : 'post',
							data : {
								data : JSON.stringify(viewModel.mainDataTable
										.getSimpleData({
											type : 'select',
											fields : [ 'doc_id' ]
										}))
							},
							success : function() {
								u.showMessage('删除成功！');
								viewModel.events.queryMain();
							}
						});
					},
					onCancel : function() {

					}
				});
			},
			viewRow : function(id) {
				// 如果样式列表不含有checkbox说明不是第一列
				if (event.target.classList.toString().indexOf('checkbox') < 0) {
					viewModel.mainDataTable.setRowFocus(id);
					viewModel.md['u.MDLayout'].dGo('showPage');
				}
			},
			pageChangeFunc : function(index) {
				viewModel.mainDataTable.pageIndex(index);
				viewModel.events.queryMain();
			},
			sizeChangeFunc : function(size) {
				viewModel.mainDataTable.pageSize(size);
				viewModel.events.queryMain();
			}
		}
	};

	var init = function(panel) {
		panel.innerHTML = template;
		var app = u.createApp({
			el : '#content',
			model : viewModel
		});
		viewModel.md = document.querySelector('#demo-mdlayout');
		viewModel.events.queryMain();
	};

	init(document.getElementById('content'));

},"html");