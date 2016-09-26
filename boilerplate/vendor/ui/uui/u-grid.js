/** 
 * neoui-grid v1.0.11
 * grid
 * author : yonyou FED
 * homepage : https://github.com/iuap-design/grid#readme
 * bugs : https://github.com/iuap-design/grid/issues
 **/ 
/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var _dataSource = __webpack_require__(1);

	var _column = __webpack_require__(6);

	var _gridComp = __webpack_require__(8);

	var old = $.fn.grid;
	// 方法扩展
	/*
	 * 对象所支持的属性及默认值
	 */

	$.fn.grid = function (options) {
		var grid = $(this).data('gridComp');
		if (!grid) $(this).data('gridComp', grid = new _gridComp.gridComp(this, options));
		return grid;
	};
	$.fn.grid.gridComp = _gridComp.gridComp;
	$.fn.grid.gridCompColumn = _column.column;
	$.fn.grid.dataSource = _dataSource.dataSource;

	$.fn.grid.noConflict = function () {
		$.fn.grid = old;
		return this;
	};

/***/ },
/* 1 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	exports.__esModule = true;
	exports.dataSource = undefined;

	var _dataSourceInit = __webpack_require__(2);

	var _re_gridCompSort = __webpack_require__(3);

	var _re_gridCompTree = __webpack_require__(5);

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	var dataSource = function dataSource(options, gridComp) {
	    _classCallCheck(this, dataSource);

	    this.init(options, gridComp);
	    this.sortRows();
	};

	;

	var dataSourceProto = dataSource.prototype;

	dataSourceProto.init = _dataSourceInit.init;
	dataSourceProto.sortRows = _dataSourceInit.sortRows;
	dataSourceProto.basicSortRows = _dataSourceInit.basicSortRows;
	dataSourceProto.treeSortRows = _dataSourceInit.treeSortRows;
	dataSourceProto.getSumValue = _dataSourceInit.getSumValue;

	dataSourceProto.basicSortRows = _re_gridCompSort.re_basicSortRows;

	/*
	 * tree
	 */


	dataSourceProto.treeSortRows = _re_gridCompTree.re_treeSortRows;
	dataSourceProto.pushChildRows = _re_gridCompTree.pushChildRows;

	exports.dataSource = dataSource;

/***/ },
/* 2 */
/***/ function(module, exports) {

	'use strict';

	exports.__esModule = true;
	/*
	 * 处理参数
	 */
	var init = function init(options, gridComp) {
	    this.defaults = {};
	    this.gridComp = gridComp;
	    this.options = $.extend({}, this.defaults, options);
	    this.rows = new Array(); // 存储数据行
	    this.hasParentRows = new Array(); // 存在父项
	    this.nothasParentRows = new Array(); // 不存在父项
	};
	/*
	 * 将values转化为rows并进行排序
	 */
	var sortRows = function sortRows(field, sortType) {
	    if (this.gridComp.options.showTree) {
	        this.treeSortRows(field, sortType);
	    } else {
	        this.basicSortRows(field, sortType);
	    }
	    this.gridComp.eidtRowIndex = -1;
	};
	/*
	 * 将values转化为rows并进行排序(标准)
	 */
	var basicSortRows = function basicSortRows(field, sortType) {
	    var oThis = this,
	        dataType = "";
	    if (field) {
	        dataType = this.gridComp.getColumnByField(field).options.dataType;
	    }
	    this.rows = new Array();
	    if (this.options.values) {
	        $.each(this.options.values, function (i) {
	            var rowObj = {};
	            rowObj.value = this;
	            rowObj.valueIndex = i;
	            oThis.rows.push(rowObj);
	        });
	    }
	};
	var treeSortRows = function treeSortRows(field, sortType) {
	    this.basicSortRows(field, sortType);
	};
	/*
	 * 获取合计值
	 */
	var getSumValue = function getSumValue(field, gridCompColumn, gridComp) {
	    var sumValue = null;
	    if (gridCompColumn.options.sumCol) {
	        $.each(this.rows, function (i) {
	            var v = $(this.value).attr(field);
	            if (gridCompColumn.options.dataType == 'Int') {
	                v = gridComp.getInt(v, 0);
	                sumValue += parseInt(v);
	            } else {
	                v = gridComp.getFloat(v, 0);
	                sumValue = gridComp.accAdd(sumValue, parseFloat(v));
	            }
	        });
	    }
	    // 处理精度
	    if (gridCompColumn.options.dataType == 'Float' && gridCompColumn.options.precision) {
	        var o = {};
	        o.value = sumValue;
	        o.precision = gridCompColumn.options.precision;
	        sumValue = gridComp.DicimalFormater(o);
	    }
	    if (sumValue != null && sumValue != undefined && sumValue != 'null' && sumValue != 'undefined') {
	        return sumValue + '';
	    } else {
	        return '';
	    }
	};
	exports.init = init;
	exports.sortRows = sortRows;
	exports.basicSortRows = basicSortRows;
	exports.treeSortRows = treeSortRows;
	exports.getSumValue = getSumValue;

/***/ },
/* 3 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	exports.__esModule = true;
	exports.re_basicSortRows = exports.sortRowsByPrio = exports.re_deleteOneRowTree = exports.canSortable = exports.sort_initGridEventFun = exports.sort_initEventFun = undefined;

	var _gridCompEvent = __webpack_require__(4);

	var sort_initEventFun = function sort_initEventFun() {
		// 扩展方法
		var oThis = this;
		$('#' + this.options.id).on('mouseup', function (e) {
			if ($(e.target).closest('#' + oThis.options.id + '_header').length > 0) {
				// 点击的是header区域
				oThis.mouseUpX = e.clientX;
				oThis.mouseUpY = e.clientY;
				//点击过程中鼠标没有移动
				if (oThis.mouseDownX == oThis.mouseUpX && oThis.mouseDownY == oThis.mouseUpY) {
					//或者移动距离小于5px(由于移动之后会显示屏幕div，暂时不做处理)
					oThis.columnClickX = e.clientX;
					oThis.columnClickY = e.clientY;
					var eleTh = $(e.target).closest('th')[0];
					if ($(e.target).hasClass('u-grid-header-columnmenu')) {} else {
						// 执行click操作,进行排序
						oThis.canSortable(e, eleTh);
					}
				}
			} else if ($(e.target).closest('#' + oThis.options.id + '_content').length > 0) {
				// 点击的是数据区域

			}
		});
	};
	var sort_initGridEventFun = function sort_initGridEventFun() {
		// 扩展方法
		var oThis = this;
	};
	/*
	 * 处理排序
	 */
	var canSortable = function canSortable(e, ele) {
		var oThis = this,
		    $ele = $(ele),
		    field = $ele.attr('field'),
		    sortable = this.getColumnAttr('sortable', field);
		if (sortable) {
			if (e.ctrlKey) {
				// 构建排序信息的数据结构
				var prioArray = [];
				$('.u-grid-header-sort-priority').each(function (index, domEle) {
					var $el = $(domEle);
					var p = parseInt($el.text());
					var f = $el.closest('th').attr('field');
					var st;
					if ($el.parent().hasClass("uf-caretarrowup")) {
						st = 'asc';
					} else if ($el.parent().hasClass("uf-caretdown")) {
						st = 'desc';
					}
					prioArray[p - 1] = { field: f, sortType: st };
				});
				// 页面调整
				/*修改ue将caret调整为caret*/
				var $caret;
				if (($caret = $ele.find('.uf-caretarrowup')).length > 0) {
					var p = parseInt($caret.find('.u-grid-header-sort-priority').text());
					prioArray[p - 1].sortType = 'desc';
					$caret.removeClass('uf-caretarrowup').addClass('uf-caretdown');
				} else if (($caret = $ele.find('.uf-caretdown')).length > 0) {
					var p = parseInt($caret.find('.u-grid-header-sort-priority').text());
					for (var i = p; i < prioArray.length; i++) {
						var $flag = $('[field=' + prioArray[i].field + ']').find('.u-grid-header-sort-priority');
						$flag.text(parseInt($flag.text()) - 1);
					}
					prioArray.splice(p - 1, 1);
					$caret.remove();
				} else {
					prioArray.push({ field: field, sortType: 'asc' });
					// $ele.first().append('<span class="uf uf-caretarrowup u-grid-header-sort-span" ><span class="u-grid-header-sort-priority">'+prioArray.length+'</span></span>')
					$ele.first().first().append('<span class="uf uf-caretarrowup u-grid-header-sort-span" ></span>');
				}
				// 执行排序逻辑
				this.dataSourceObj.sortRowsByPrio(prioArray);
			} else {
				if ($(".uf-caretarrowup").parent().parent().parent()[0] == ele) {
					//原来为升序，本次为降序
					$(".uf-caretarrowup").remove();
					//$(ele.firstChild)[0].insertAdjacentHTML('beforeEnd','<span class="uf uf-caretdown u-grid-header-sort-span" ><span class="u-grid-header-sort-priority">1</span></span>');
					$(ele.firstChild.firstChild)[0].insertAdjacentHTML('beforeEnd', '<span class="uf uf-caretdown u-grid-header-sort-span" ></span>');
					if (typeof this.options.onSortFun == 'function') {
						this.options.onSortFun(field, 'asc');
					} else {
						this.dataSourceObj.sortRows(field, "asc");
					}
				} else if ($(".uf-caretdown").parent().parent().parent()[0] == ele) {
					//原来为降序，本次为不排序
					$(".uf-caretdown").remove();
					if (typeof this.options.onSortFun == 'function') {
						this.options.onSortFun();
					} else {
						this.dataSourceObj.sortRows();
					}
				} else {
					//本次为升序
					$(".uf-caretarrowup").remove();
					$(".uf-caretdown").remove();
					// $(ele.firstChild)[0].insertAdjacentHTML('beforeEnd','<span class="uf uf-caretarrowup u-grid-header-sort-span"><span class="u-grid-header-sort-priority">1</span></span>');
					$(ele.firstChild.firstChild)[0].insertAdjacentHTML('beforeEnd', '<span class="uf uf-caretarrowup u-grid-header-sort-span"></span>');
					if (typeof this.options.onSortFun == 'function') {
						this.options.onSortFun(field, "desc");
					} else {
						this.dataSourceObj.sortRows(field, "desc");
					}
				}
			}

			oThis.repairContent();
			oThis.afterGridDivsCreate();
		}
	};
	var re_deleteOneRowTree = function re_deleteOneRowTree() {
		if (this.options.showTree) {
			this.dataSourceObj.sortRows();
		}
	};
	/*
	 * 根据排序的优先级的排序
	 * prioArray = [{field:'f2', sortType:'asc'}, {field:'f3', sortType:'desc'}, {field:'f1', sortType:'asc'}]
	 */
	var sortRowsByPrio = function sortRowsByPrio(prioArray, cancelSort) {
		var oThis = this;
		if (cancelSort) {
			this.rows = new Array();
			if (this.options.values) {
				$.each(this.options.values, function (i) {
					var rowObj = {};
					rowObj.value = this;
					rowObj.valueIndex = i;
					oThis.rows.push(rowObj);
				});
			}
		}

		var evalStr = function evalStr(i) {
			if (i == prioArray.length - 1) {
				return 'by(prioArray[' + i + '].field, prioArray[' + i + '].sortType)';
			} else {
				return 'by(prioArray[' + i + '].field, prioArray[' + i + '].sortType,' + evalStr(i + 1) + ')';
			}
		};

		var by = function by(field, sortType, eqCall) {
			var callee = arguments.callee;
			return function (a, b) {
				var v1 = $(a.value).attr(field);
				var v2 = $(b.value).attr(field);
				var dataType = oThis.gridComp.getColumnByField(field).options.dataType;
				if (dataType == 'Float') {
					v1 = parseFloat(v1);
					v2 = parseFloat(v2);
					if (isNaN(v1)) {
						return 1;
					}
					if (isNaN(v2)) {
						return -1;
					}
					if (v1 == v2 && eqCall) {
						return eqCall();
					}
					return sortType == 'asc' ? v1 - v2 : v2 - v1;
				} else if (dataType == 'Int') {
					v1 = parseInt(v1);
					v2 = parseInt(v2);
					if (isNaN(v1)) {
						return 1;
					}
					if (isNaN(v2)) {
						return -1;
					}
					if (v1 == v2 && eqCall) {
						return eqCall();
					}
					return sortType == 'asc' ? v1 - v2 : v2 - v1;
				} else {
					v1 = oThis.gridComp.getString(v1, '');
					v2 = oThis.gridComp.getString(v2, '');
					try {
						var rsl = v1.localeCompare(v2);
						if (rsl === 0 && eqCall) {
							return eqCall();
						}
						if (rsl === 0) {
							return 0;
						}
						return sortType == 'asc' ? rsl : -rsl;
					} catch (e) {
						return 0;
					}
				}
			};
		};

		this.rows.sort(eval(evalStr(0)));
	};
	/*
	 * 将values转化为rows并进行排序(标准)
	 */
	var re_basicSortRows = function re_basicSortRows(field, sortType) {
		var oThis = this;
		var dataType = "";
		if (field) {
			dataType = this.gridComp.getColumnByField(field).options.dataType;
		}
		if (sortType == "asc") {
			this.rows.sort(function (a, b) {
				var v1 = $(b.value).attr(field);
				var v2 = $(a.value).attr(field);
				if (dataType == 'Float') {
					v1 = parseFloat(v1);
					v2 = parseFloat(v2);
					if (isNaN(v1)) {
						return 1;
					}
					if (isNaN(v2)) {
						return -1;
					}
					return v1 - v2;
				} else if (dataType == 'Int') {
					v1 = parseInt(v1);
					v2 = parseInt(v2);
					if (isNaN(v1)) {
						return 1;
					}
					if (isNaN(v2)) {
						return -1;
					}
					return v1 - v2;
				} else {
					v1 = oThis.gridComp.getString(v1, '');
					v2 = oThis.gridComp.getString(v2, '');
					try {
						return v1.localeCompare(v2);
					} catch (e) {
						return 0;
					}
				}
			});
		} else if (sortType == "desc") {
			this.rows.sort(function (a, b) {
				var v1 = $(a.value).attr(field);
				var v2 = $(b.value).attr(field);
				if (dataType == 'Float') {
					v1 = parseFloat(v1);
					v2 = parseFloat(v2);
					if (isNaN(v1)) {
						return 1;
					}
					if (isNaN(v2)) {
						return -1;
					}
					return v1 - v2;
				} else if (dataType == 'Int') {
					v1 = parseInt(v1);
					v2 = parseInt(v2);
					if (isNaN(v1)) {
						return 1;
					}
					if (isNaN(v2)) {
						return -1;
					}
					return v1 - v2;
				} else {
					v1 = oThis.gridComp.getString(v1, '');
					v2 = oThis.gridComp.getString(v2, '');
					try {
						return v1.localeCompare(v2);
					} catch (e) {
						return 0;
					}
				}
			});
		} else {
			this.rows = new Array();
			if (this.options.values) {
				$.each(this.options.values, function (i) {
					var rowObj = {};
					rowObj.value = this;
					rowObj.valueIndex = i;
					oThis.rows.push(rowObj);
				});
			}
		}
	};
	exports.sort_initEventFun = sort_initEventFun;
	exports.sort_initGridEventFun = sort_initGridEventFun;
	exports.canSortable = canSortable;
	exports.re_deleteOneRowTree = re_deleteOneRowTree;
	exports.sortRowsByPrio = sortRowsByPrio;
	exports.re_basicSortRows = re_basicSortRows;

/***/ },
/* 4 */
/***/ function(module, exports) {

	'use strict';

	exports.__esModule = true;
	/*
	 * 创建完成之后顶层div添加监听
	 */
	var initEventFun = function initEventFun() {
	    var oThis = this;
	    $('#' + this.options.id).on('mousedown', function (e) {
	        if ($(e.target).closest('#' + oThis.options.id + '_header').length > 0) {
	            // 点击的是header区域
	            oThis.mouseDownX = e.clientX;
	            oThis.mouseDownY = e.clientY;
	        } else if ($(e.target).closest('#' + oThis.options.id + '_content').length > 0) {
	            // 点击的是数据区域
	        }
	    });
	};
	/*
	 * 创建完成之后grid层 div添加监听
	 */
	var initGridEventFun = function initGridEventFun() {
	    var oThis = this;
	    // 拖动
	    this.initContentDivEventFun();
	    // 全选
	    $('#' + this.options.id + '_header_multi_input').on('click', function (e) {
	        if (this.hasChecked) {
	            oThis.setAllRowUnSelect();
	            this.hasChecked = false;
	        } else {
	            oThis.setAllRowSelect();
	            this.hasChecked = true;
	        }
	    });
	};
	/*
	 * 内容区 div添加监听
	 */
	var initContentDivEventFun = function initContentDivEventFun() {
	    var oThis = this;
	    // 通过复选框设置选中行
	    $('#' + oThis.options.id + '_content .u-grid-content-left').on('click', function (e) {
	        var $input = $(e.target).closest('.u-grid-checkbox-outline');
	        if ($input.length > 0) {
	            var $div = $($input.parent());
	            var index = $('.u-grid-content-multiSelect', $div.parent()).index($div);
	            if ($input.hasClass('is-checked')) {
	                oThis.setRowUnselect(index);
	            } else {
	                oThis.setRowSelect(index);
	            }
	        }
	    });
	    // 同步滚动条
	    $('#' + this.options.id + '_content_div').on('scroll', function (e) {
	        oThis.scrollLeft = this.scrollLeft;
	        oThis.scrollTop = this.scrollTop;
	        $('#' + oThis.options.id + '_header_table').css('left', oThis.leftW - oThis.scrollLeft + oThis.fixedWidth + "px");
	        $('#' + oThis.options.id + '_noRowsShow').css('left', oThis.scrollLeft + "px");
	        $('#' + oThis.options.id + '_edit_form').css('left', oThis.scrollLeft + "px");
	        $('#' + oThis.options.id + '_content_multiSelect').css('top', -oThis.scrollTop + "px");
	        $('#' + oThis.options.id + '_content_numCol').css('top', -oThis.scrollTop + "px");
	        $('#' + oThis.options.id + '_content_fixed_div').css('top', -oThis.scrollTop + "px");
	    });
	    // 数据行相关事件
	    $('#' + this.options.id + '_content_tbody').on('click', function (e) {
	        // 双击处理
	        if (typeof oThis.options.onDblClickFun == 'function') {
	            oThis.isDblEvent('tbodyClick', oThis.dblClickFun, e, oThis.clickFun, e);
	        } else {
	            oThis.clickFun(e);
	        }
	    });
	    $('#' + this.options.id + '_content_fixed_tbody').on('click', function (e) {
	        // 双击处理
	        if (typeof oThis.options.onDblClickFun == 'function') {
	            oThis.isDblEvent('tbodyClick', oThis.dblClickFun, e, oThis.clickFun, e);
	        } else {
	            oThis.clickFun(e);
	        }
	    });
	    $('#' + this.options.id + '_content').on('mousemove', function (e) {
	        var $tr = $(e.target).closest('tr'),
	            $div = $(e.target).closest('div'),
	            mousemoveIndex = -1;
	        // 首先清除所有的背景
	        if ($tr.length > 0) {
	            mousemoveIndex = $('tr', $tr.parent()).index($tr);
	        } else if ($div.length > 0 && ($div.hasClass('u-grid-content-multiSelect') || $div.hasClass('u-grid-content-num'))) {
	            //左侧复选及数字列
	            mousemoveIndex = $('div', $div.parent()).index($div);
	        }

	        oThis.trHoverFun(mousemoveIndex);
	    });
	    $('#' + this.options.id + '_content').on('mouseout', function (e) {
	        $('#' + oThis.options.id + '_content_tbody').find('tr').removeClass('u-grid-move-bg');
	        $('#' + oThis.options.id + '_content_fixed_tbody').find('tr').removeClass('u-grid-move-bg');
	        if (oThis.options.multiSelect) $('#' + oThis.options.id + '_content_multiSelect').find('div').removeClass('u-grid-move-bg');
	        if (oThis.options.showNumCol) $('#' + oThis.options.id + '_content_numCol').find('div').removeClass('u-grid-move-bg');
	        if (typeof oThis.options.onContentOut == 'function') {
	            var obj = {};
	            obj.gridObj = oThis;
	            var $tr = $(e.target).closest('tr');
	            if ($tr.length > 0 && !$tr.is('.u-grid-content-sum-row')) {
	                var mouseoutIndex = $('tr[role="row"]', $tr.parent()).index($tr);
	                obj.rowObj = oThis.dataSourceObj.rows[mouseoutIndex];
	                obj.rowIndex = mouseoutIndex;
	            }
	            oThis.options.onContentOut(obj);
	        }
	    });
	};

	exports.initEventFun = initEventFun;
	exports.initGridEventFun = initGridEventFun;
	exports.initContentDivEventFun = initContentDivEventFun;

/***/ },
/* 5 */
/***/ function(module, exports) {

	'use strict';

	exports.__esModule = true;

	var re_initTree = function re_initTree(options, gridOptions) {
		if (gridOptions.showTree) {
			options.sortable = false;
		}
		return options;
	};
	var re_initOptionsTree = function re_initOptionsTree() {
		if (this.options.showTree) {
			this.options.showNumCol = false;
		}
	};
	var re_clickFunTree = function re_clickFunTree(e) {
		var oThis = this,
		    $target = $(e.target),
		    $td = $target.closest('td');

		if ($td.length > 0) {
			var $tr = $td.parent();
			var index = this.getTrIndex($tr);
			var row = oThis.dataSourceObj.rows[index];
			if (row) {
				var rowChildIndex = oThis.getChildRowIndex(row);
				if ($target.hasClass('uf-minusbutton') || $target.hasClass('uf-addsquarebutton2')) {
					var minus = $td.find('.uf-minusbutton');
					var plus = $td.find('.uf-addsquarebutton2');
					if (minus.length > 0) {
						// 合上 需要将所有的都合上
						minus.removeClass('uf-minusbutton').addClass('uf-addsquarebutton2');
						if (rowChildIndex.length > 0) {
							var allChildRowIndex = oThis.getAllChildRowIndex(row);
							$.each(allChildRowIndex, function () {
								var $tr1 = $('tr[role="row"]:eq(' + parseInt(this) + ')', $tr.parent());
								$tr1.css('display', 'none');
								// 左侧复选区隐藏
								$('#' + oThis.options.id + '_content_multiSelect >div:nth-child(' + (parseInt(this) + 1) + ')').css('display', 'none');
								$('.uf-minusbutton', $tr1).removeClass('uf-minusbutton').addClass('uf-addsquarebutton2');
							});
						}
						if (this.options.editType == 'form') {
							$('#' + this.options.id + '_multiSelect_edit').remove(null, true);
							$('#' + this.options.id + '_numCol_edit').remove(null, true);
							$('#' + this.options.id + '_edit_tr').remove(null, true);
							$('#' + this.options.id + '_edit_tr1').remove(null, true);
						}
						return;
					} else if (plus.length > 0) {
						// 展开
						plus.removeClass('uf-addsquarebutton2').addClass('uf-minusbutton');
						if (rowChildIndex.length > 0) {
							$.each(rowChildIndex, function () {
								var $tr1 = $('tr[role="row"]:eq(' + parseInt(this) + ')', $tr.parent());
								$tr1.css('display', '');
								var ss = $('#' + oThis.options.id + '_content_multiSelect >div:nth-child(' + (parseInt(this) + 1) + ')')[0];
								$('#' + oThis.options.id + '_content_multiSelect >div:nth-child(' + (parseInt(this) + 1) + ')').css('display', '');
							});
						}
						return;
					}
				}
			}
		}
	};
	var re_addOneRowTree = function re_addOneRowTree(row, index, rowObj) {
		var oThis = this,
		    l = this.dataSourceObj.rows.length,
		    displayFlag;
		// 存在树结构
		if (this.options.showTree) {
			this.hasParent = false;
			this.hasChildF = false;
			var keyField = this.options.keyField;
			var parentKeyField = this.options.parentKeyField;
			var keyValue = this.getString($(row).attr(keyField), '');
			rowObj.keyValue = keyValue;
			var parentKeyValue = this.getString($(row).attr(parentKeyField), '');
			rowObj.parentKeyValue = parentKeyValue;
			var parentChildLength;
			/* 判断是否存在父项/子项 */
			$.each(this.dataSourceObj.rows, function (i) {
				var value = this.value;
				var nowKeyValue = oThis.getString($(value).attr(keyField), '');
				var nowParentKeyValue = oThis.getString($(value).attr(parentKeyField), '');
				if (nowKeyValue == parentKeyValue) {
					/* 取父项的index和父项的子index*/
					oThis.hasParent = true;
					oThis.addRowParentIndex = i;
					parentChildLength = oThis.getAllChildRow(this).length;
					var parentLevel = this.level;
					rowObj.level = parentLevel + 1;
					// 由于不止需要计算最后一个子节点，同时需要计算子节点的子节点。所以现在添加到父节点的下面一个
					index = oThis.addRowParentIndex + parentChildLength + 1;
					if (!oThis.options.needTreeSort) return false;
				}
				if (nowParentKeyValue == keyValue) {
					oThis.hasChildF = true;
				}
				if (oThis.hasParent && oThis.hasChildF) return false;
			});
			if (!this.hasParent) {
				rowObj.level = 0;
				if (index != l) {
					// 如果没有父项则插入到最后，因为index有可能插入到其他节点的子节点之中，计算复杂
					index = l;
				}
			}
			if (this.hasParent) {
				var $pTr = $('#' + this.options.id + '_content_div').find('tbody').find('tr[role="row"]').eq(oThis.addRowParentIndex);
				if (parentChildLength > 0) {
					// 如果存在父项并且父项存在子项则需要判断父项是否展开
					var openDiv = $('.uf-addsquarebutton2', $pTr);
					if (!(openDiv.length > 0)) {
						displayFlag = 'block';
					}
				} else {
					// 如果存在父项并且父项原来没有子项则需要添加图标
					if (this.options.autoExpand) {
						displayFlag = 'block';
					}

					var d = $("div:eq(0)", $pTr);
					var openDiv = $('.uf-addsquarebutton2', $pTr);
					var closeDiv = $('.uf-minusbutton', $pTr);
					if (this.options.autoExpand) {
						var spanHtml = '<span class="uf u-grid-content-tree-span uf-minusbutton"></span>';
					} else {
						var spanHtml = '<span class="uf u-grid-content-tree-span uf-addsquarebutton2"></span>';
					}
					if (d.length > 0 && openDiv.length == 0 && closeDiv.length == 0) {
						d[0].insertAdjacentHTML('afterBegin', spanHtml);
						var oldLeft = parseInt(d[0].style.left);
						l = oldLeft - 16;
						if (l > 0 || l == 0) {
							d[0].style.left = l + "px";
						}
					}
					if (openDiv.length > 0) {
						openDiv.removeClass('uf-addsquarebutton2').addClass('uf-minusbutton');
					}
				}
			}
		}

		return {
			index: index,
			displayFlag: displayFlag
		};
	};
	var re_addOneRowTreeHasChildF = function re_addOneRowTreeHasChildF(rowObj) {
		if (this.hasChildF) {
			//如果存在子项则重新渲染整个区域
			this.dataSourceObj.sortRows();
			this.repairContent();
		} else {
			// 修改rowObj 和parent的变量
			if (this.hasParent) {
				var parentRowObj = this.dataSourceObj.rows[this.addRowParentIndex];
				parentRowObj.hasChild = true;
				parentRowObj.childRow.push(rowObj);
				parentRowObj.childRowIndex.push(rowObj.valueIndex);
				rowObj.parentRow = parentRowObj;
				rowObj.parentRowIndex = this.addRowParentIndex;
			}
			rowObj.hasChild = false;
			rowObj.childRow = new Array();
			rowObj.childRowIndex = new Array();
		}
	};
	var re_updateValueAtTree = function re_updateValueAtTree(rowIndex, field, value, force) {
		var oThis = this;
		var keyField = this.options.keyField;
		var parentKeyField = this.options.parentKeyField;
		if (this.options.showTree && (field == keyField || field == parentKeyField)) {
			// 目前已经不适用grid源生的编辑设置了，因为树表时关闭edit
			var hasParent = false;
			var hasChildF = false;

			$.each(this.dataSourceObj.rows, function (i) {
				var vv = this.value;
				var nowKeyValue = oThis.getString($(vv).attr(keyField), '');
				var nowParentKeyValue = oThis.getString($(vv).attr(parentKeyField), '');
				if (field == keyField && value == nowParentKeyValue) {
					//修改的是keyfield，判断是否存在子项
					hasChildF = true;
				}
				if (field == parentKeyField && value == nowKeyValue) {
					//修改的是parentKeyField，判断是否存在父项
					hasParent = true;
				}
			});
			if (hasChildF || hasParent) {
				//删除当前行之后重新插入当前行由addonerow来进行树结构处理
				var rowValue = $(this.dataSourceObj.rows[rowIndex].value);
				this.deleteOneRow(rowIndex);
				this.addOneRow(rowValue[0]);
			}
		}
		if (this.options.showTree && (field == keyField || field == parentKeyField) && (hasChildF || hasParent)) {
			rowIndex = this.getRowIndexByValue(field, value);
		}
		return rowIndex;
	};
	/*
	 * 获取数据行下所有子元素
	 */
	var getAllChildRow = function getAllChildRow(row) {
		// if(row.allChildRow && row.allChildRow.length > 0){
		// 	return row.allChildRow;
		// }
		row.allChildRow = new Array();
		this.getAllChildRowFun(row, row.allChildRow);
		return row.allChildRow;
	};
	var re_getChildRowIndex = function re_getChildRowIndex(row) {
		var result = [];
		if (row.childRow && row.childRow.length > 0) {
			$.each(row.childRow, function () {
				result.push(this.valueIndex);
			});
		}
		return result;
	};
	/*
	 * 获取数据行下所有子元素的index
	 */
	var getAllChildRowIndex = function getAllChildRowIndex(row) {
		// if(row.allChildRowIndex && row.allChildRowIndex.length > 0){
		// 	return row.allChildRowIndex;
		// }
		row.allChildRowIndex = new Array();
		this.getAllChildRowIndexFun(row, row.allChildRowIndex);
		return row.allChildRowIndex;
	};
	var getAllChildRowFun = function getAllChildRowFun(row, rowArry) {
		var oThis = this;
		if (row.childRow.length > 0) {
			Array.prototype.push.apply(rowArry, row.childRow);
			$.each(row.childRow, function () {
				oThis.getAllChildRowFun(this, rowArry);
			});
		}
	};
	var getAllChildRowIndexFun = function getAllChildRowIndexFun(row, rowArry) {
		var oThis = this;
		if (row.childRow.length > 0) {
			Array.prototype.push.apply(rowArry, this.getChildRowIndex(row));
			$.each(row.childRow, function () {
				oThis.getAllChildRowIndexFun(this, rowArry);
			});
		}
	};
	/* 展开某个节点 */
	var expandNode = function expandNode(keyValue) {
		var rowIndex = this.getRowIndexByValue(this.options.keyField, keyValue);
		this.expandNodeByIndex(rowIndex);
	};
	var expandNodeByIndex = function expandNodeByIndex(rowIndex) {
		var row = this.getRowByIndex(rowIndex);
		var parentExpand = false,
		    parentIndex,
		    needExpanedParent = new Array();
		var whileRow = row;
		while (!parentExpand) {
			if (whileRow.parentKeyValue == '') {
				parentExpand = true;
				break;
			} else {
				parentIndex = whileRow.parentRowIndex;
				whileRow = whileRow.parentRow;
				var $pTr = $('#' + this.options.id + '_content_div').find('tbody').find('tr[role="row"]').eq(parentIndex);
				var openDiv = $('.uf-addsquarebutton2', $pTr);
				if (openDiv.length > 0) {
					//合着
					needExpanedParent.push(parentIndex);
				} else {
					parentExpand = true;
					break;
				}
			}
		}
		if (needExpanedParent.length > 0) {
			for (var i = needExpanedParent.length - 1; i > -1; i--) {
				var index = needExpanedParent[i];
				var $pTr = $('#' + this.options.id + '_content_div').find('tbody').find('tr[role="row"]').eq(index);
				var openDiv = $('.uf-addsquarebutton2', $pTr);
				openDiv.click();
			}
		}

		var $Tr = $('#' + this.options.id + '_content_div').find('tbody').find('tr[role="row"]').eq(rowIndex);
		var openDiv = $('.uf-addsquarebutton2', $Tr);
		var firstDiv = $('.u-grid-content-td-div', $Tr);
		if (openDiv.length > 0) openDiv.click();else firstDiv.click();
	};
	/*
	 * 将values转化为rows并进行排序(数表)
	 */
	var re_treeSortRows = function re_treeSortRows(field, sortType) {
		var oThis = this;
		var spliceHasParentRows = new Array();
		this.rows = new Array();
		this.hasParentRows = new Array();
		this.nothasParentRows = new Array();
		if (this.options.values) {
			$.each(this.options.values, function (i) {
				var rowObj = {};
				var $this = $(this);
				var keyField = oThis.gridComp.options.keyField;
				var parentKeyField = oThis.gridComp.options.parentKeyField;
				var keyValue = oThis.gridComp.getString($this.attr(keyField), '');
				var parentKeyValue = oThis.gridComp.getString($this.attr(parentKeyField), '');
				rowObj.valueIndex = i;
				rowObj.value = this;
				rowObj.keyValue = keyValue;
				rowObj.parentKeyValue = parentKeyValue;
				if (parentKeyValue == '') {
					oThis.nothasParentRows.push(rowObj);
				} else {
					oThis.hasParentRows.push(rowObj);
				}
				oThis.rows.push(rowObj);
			});
			// 判断存在父项的数据的父项是否真正存在
			$.each(this.hasParentRows, function (i) {
				var parentKeyValue = this.parentKeyValue;
				var hasParent = false;
				$.each(oThis.rows, function () {
					if (this.keyValue == parentKeyValue) {
						hasParent = true;
					}
				});
				if (!hasParent) {
					spliceHasParentRows.push(this);
					oThis.nothasParentRows.push(this);
				}
			});
			$.each(spliceHasParentRows, function () {
				var index = oThis.hasParentRows.indexOf(this);
				oThis.hasParentRows.splice(index, 1);
			});
			oThis.rows = new Array();
			var level = 0;
			// 遍历nothasParentRows，将子项加入rows
			$.each(this.nothasParentRows, function (i) {
				this.level = level;
				oThis.rows.push(this);
				oThis.pushChildRows(this, level);
			});
		}
	};
	/*
	 * 将当前行子项插入rows数组
	 */
	var pushChildRows = function pushChildRows(row, level) {
		var keyValue = row.keyValue;
		var oThis = this;
		var nowLevel = parseInt(level) + 1;
		var hasChild = false;
		var childRowArray = new Array();
		var childRowIndexArray = new Array();
		var spliceHasParentRows = new Array();
		$.each(this.hasParentRows, function (i) {
			if (this && this.parentKeyValue == keyValue) {
				hasChild = true;
				this.level = nowLevel;
				oThis.rows.push(this);
				childRowArray.push(this);
				var index = parseInt(oThis.rows.length - 1);
				childRowIndexArray.push(index);
				spliceHasParentRows.push(this);
				oThis.pushChildRows(this, nowLevel);
			}
		});
		$.each(spliceHasParentRows, function () {
			var index = oThis.hasParentRows.indexOf(this);
			oThis.hasParentRows.splice(index, 1);
		});
		row.hasChild = hasChild;
		row.childRow = childRowArray;
		row.childRowIndex = childRowIndexArray;
	};
	exports.re_initTree = re_initTree;
	exports.re_initOptionsTree = re_initOptionsTree;
	exports.re_clickFunTree = re_clickFunTree;
	exports.re_addOneRowTree = re_addOneRowTree;
	exports.re_addOneRowTreeHasChildF = re_addOneRowTreeHasChildF;
	exports.re_updateValueAtTree = re_updateValueAtTree;
	exports.getAllChildRow = getAllChildRow;
	exports.re_getChildRowIndex = re_getChildRowIndex;
	exports.getAllChildRowIndex = getAllChildRowIndex;
	exports.getAllChildRowFun = getAllChildRowFun;
	exports.getAllChildRowIndexFun = getAllChildRowIndexFun;
	exports.expandNode = expandNode;
	exports.expandNodeByIndex = expandNodeByIndex;
	exports.re_treeSortRows = re_treeSortRows;
	exports.pushChildRows = pushChildRows;

/***/ },
/* 6 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	exports.__esModule = true;
	exports.column = undefined;

	var _columnInit = __webpack_require__(7);

	var _re_gridCompTree = __webpack_require__(5);

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	var column = function column(options, gridComp) {
	    _classCallCheck(this, column);

	    this.init(options, gridComp);
	};

	;

	var gridCompColumnProto = column.prototype;

	gridCompColumnProto.init = _columnInit.init;
	gridCompColumnProto.initTree = _columnInit.initTree;
	gridCompColumnProto.getBooleanOptions = _columnInit.getBooleanOptions;

	/*
	 * tree
	 */


	gridCompColumnProto.initTree = _re_gridCompTree.re_initTree;

	exports.column = column;

/***/ },
/* 7 */
/***/ function(module, exports) {

	'use strict';

	exports.__esModule = true;
	/*
	 * 处理参数
	 */
	var init = function init(options, gridComp) {
	    this.gridComp = gridComp;
	    var gridOptions = gridComp.options;
	    this.defaults = {
	        width: 200, // 默认宽度为200
	        sortable: true, // 是否可以排序
	        canDrag: true, // 是否可以拖动
	        fixed: false, // 是否固定列
	        visible: true, // 是否显示
	        canVisible: true, // 是否可以隐藏
	        sumCol: false, // 是否计算合计
	        editable: true, // 是否可修改
	        editFormShow: true, // 是否可修改
	        autoExpand: false, // 是否自动扩展列
	        editType: 'text', // 编辑类型，支持传入function扩展
	        dataType: 'String', // 数据类型,String, Date, Datetime, Int, Float
	        //precision:  //精度
	        format: 'YYYY-MM-DD hh:mm:ss',
	        //renderType:'', 渲染类型
	        //headerColor
	        headerLevel: 1, // header层级
	        hiddenLevel: 1 };
	    // 从grid继承的属性
	    var gridDefault = {
	        sortable: gridOptions.sortable,
	        canDrag: gridOptions.canDrag,
	        width: gridOptions.columnWidth
	    };
	    if (options.dataType == 'Date') {
	        this.defaults.format = 'YYYY-MM-DD';
	    }
	    // 树表暂时不支持排序
	    options = this.initTree(options, gridOptions);
	    this.options = $.extend({}, this.defaults, gridDefault, options);
	    this.getBooleanOptions();
	    try {
	        if (typeof this.options.renderType == 'string') this.options.renderType = eval(this.options.renderType);
	    } catch (e) {}
	    try {
	        if (typeof this.options.editType == 'string') this.options.editType = eval(this.options.editType);
	    } catch (e) {}

	    // 转成数字
	    this.options.width = parseInt(this.options.width);
	    this.firstColumn = false;
	};
	var initTree = function initTree(options) {
	    return options;
	};
	var getBooleanOptions = function getBooleanOptions() {
	    this.options.sortable = this.gridComp.getBoolean(this.options.sortable);
	    this.options.canDrag = this.gridComp.getBoolean(this.options.canDrag);
	    this.options.fixed = this.gridComp.getBoolean(this.options.fixed);
	    this.options.visible = this.gridComp.getBoolean(this.options.visible);
	    this.options.canVisible = this.gridComp.getBoolean(this.options.canVisible);
	    this.options.sumCol = this.gridComp.getBoolean(this.options.sumCol);
	    this.options.editable = this.gridComp.getBoolean(this.options.editable);
	    this.options.editFormShow = this.gridComp.getBoolean(this.options.editFormShow);
	    this.options.autoExpand = this.gridComp.getBoolean(this.options.autoExpand);
	};

	exports.init = init;
	exports.initTree = initTree;
	exports.getBooleanOptions = getBooleanOptions;

/***/ },
/* 8 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	exports.__esModule = true;
	exports.gridComp = undefined;

	var _gridCompCreate = __webpack_require__(9);

	var _gridCompCreateCal = __webpack_require__(11);

	var _gridCompEvent = __webpack_require__(4);

	var _gridCompGet = __webpack_require__(12);

	var _gridCompInit = __webpack_require__(13);

	var _gridCompOperateRow = __webpack_require__(14);

	var _gridCompRenderType = __webpack_require__(15);

	var _gridCompSet = __webpack_require__(16);

	var _gridCompWDChange = __webpack_require__(17);

	var _gridCompClick = __webpack_require__(18);

	var _gridCompOther = __webpack_require__(19);

	var _ut_utility = __webpack_require__(20);

	var _re_gridCompColMenu = __webpack_require__(21);

	var _re_gridCompDrag = __webpack_require__(22);

	var _re_gridCompEdit = __webpack_require__(23);

	var _re_gridCompEditForm = __webpack_require__(24);

	var _re_gridCompFixed = __webpack_require__(25);

	var _re_gridCompFormShow = __webpack_require__(26);

	var _re_gridCompHeaderLevel = __webpack_require__(27);

	var _re_gridCompLocalStorage = __webpack_require__(28);

	var _re_gridCompOverWidthHidden = __webpack_require__(29);

	var _re_gridCompSort = __webpack_require__(3);

	var _re_gridCompSumRow = __webpack_require__(30);

	var _re_gridCompSwap = __webpack_require__(31);

	var _re_gridCompTree = __webpack_require__(5);

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	var gridComp = function gridComp(ele, options) {
	  _classCallCheck(this, gridComp);

	  this.init(ele, options);
	  this.initGrid();
	};

	;
	gridComp.prototype.formatWidth = _ut_utility.formatWidth;
	gridComp.prototype.swapEle = _ut_utility.swapEle;
	gridComp.prototype.getString = _ut_utility.getString;
	gridComp.prototype.getInt = _ut_utility.getInt;
	gridComp.prototype.getFloat = _ut_utility.getFloat;
	gridComp.prototype.cloneObj = _ut_utility.cloneObj;
	gridComp.prototype.DicimalFormater = _ut_utility.DicimalFormater;
	gridComp.prototype.accAdd = _ut_utility.accAdd;
	gridComp.prototype.getTrIndex = _ut_utility.getTrIndex;

	gridComp.prototype.updateLastRowFlag = _gridCompOther.updateLastRowFlag;
	gridComp.prototype.updateNumColLastRowFlag = _gridCompOther.updateNumColLastRowFlag;
	gridComp.prototype.columnsVisibleFun = _gridCompOther.columnsVisibleFun;
	gridComp.prototype.resetThVariable = _gridCompOther.resetThVariable;
	gridComp.prototype.resetThVariableDrag = _gridCompOther.resetThVariableDrag;
	gridComp.prototype.resetThVariableHeaderLevel = _gridCompOther.resetThVariableHeaderLevel;
	gridComp.prototype.headerFirstClassFun = _gridCompOther.headerFirstClassFun;
	gridComp.prototype.setRenderType = _gridCompOther.setRenderType;
	gridComp.prototype.setShowHeader = _gridCompOther.setShowHeader;
	gridComp.prototype.setColumnPrecision = _gridCompOther.setColumnPrecision;
	gridComp.prototype.setMultiSelect = _gridCompOther.setMultiSelect;
	gridComp.prototype.setShowNumCol = _gridCompOther.setShowNumCol;
	gridComp.prototype.isGridShow = _gridCompOther.isGridShow;
	gridComp.prototype.getBoolean = _gridCompOther.getBoolean;

	gridComp.prototype.isDblEvent = _gridCompClick.isDblEvent;
	gridComp.prototype.dblClickFun = _gridCompClick.dblClickFun;
	gridComp.prototype.clickFun = _gridCompClick.clickFun;
	gridComp.prototype.clickFunTree = _gridCompClick.clickFunTree;
	gridComp.prototype.clickFunEdit = _gridCompClick.clickFunEdit;

	gridComp.prototype.createDivs = _gridCompCreate.createDivs;
	gridComp.prototype.repaintDivs = _gridCompCreate.repaintDivs;
	gridComp.prototype.createGridDivs = _gridCompCreate.createGridDivs;
	gridComp.prototype.repaintGridDivs = _gridCompCreate.repaintGridDivs;
	gridComp.prototype.createColumnMenu = _gridCompCreate.createColumnMenu;
	gridComp.prototype.createHeader = _gridCompCreate.createHeader;
	gridComp.prototype.createHeaderTable = _gridCompCreate.createHeaderTable;
	gridComp.prototype.createHeaderTableFixed = _gridCompCreate.createHeaderTableFixed;
	gridComp.prototype.createHeaderDrag = _gridCompCreate.createHeaderDrag;
	gridComp.prototype.createColgroup = _gridCompCreate.createColgroup;
	gridComp.prototype.createThead = _gridCompCreate.createThead;
	gridComp.prototype.createContent = _gridCompCreate.createContent;
	gridComp.prototype.createContentSumRow = _gridCompCreate.createContentSumRow;
	gridComp.prototype.createContentLeft = _gridCompCreate.createContentLeft;
	gridComp.prototype.createContentLeftMultiSelectRow = _gridCompCreate.createContentLeftMultiSelectRow;
	gridComp.prototype.createContentLeftNumColRow = _gridCompCreate.createContentLeftNumColRow;
	gridComp.prototype.createContentTable = _gridCompCreate.createContentTable;
	gridComp.prototype.createContentTableFixed = _gridCompCreate.createContentTableFixed;
	gridComp.prototype.createNoRowsDiv = _gridCompCreate.createNoRowsDiv;
	gridComp.prototype.createContentRows = _gridCompCreate.createContentRows;
	gridComp.prototype.createContentRowsSumRow = _gridCompCreate.createContentRowsSumRow;
	gridComp.prototype.createContentOneRow = _gridCompCreate.createContentOneRow;
	gridComp.prototype.createContentOneRowForIE = _gridCompCreate.createContentOneRowForIE;
	gridComp.prototype.repaintRow = _gridCompCreate.repaintRow;
	gridComp.prototype.createContentOneRowTd = _gridCompCreate.createContentOneRowTd;
	gridComp.prototype.createContentOneRowTdForIE = _gridCompCreate.createContentOneRowTdForIE;
	gridComp.prototype.repairContent = _gridCompCreate.repairContent;

	gridComp.prototype.trHoverFun = _gridCompCreateCal.trHoverFun;
	gridComp.prototype.setIntervalFun = _gridCompCreateCal.setIntervalFun;
	gridComp.prototype.editorRowChangeFun = _gridCompCreateCal.editorRowChangeFun;
	gridComp.prototype.afterGridDivsCreate = _gridCompCreateCal.afterGridDivsCreate;
	gridComp.prototype.countRowHeight = _gridCompCreateCal.countRowHeight;
	gridComp.prototype.noRowsShowFun = _gridCompCreateCal.noRowsShowFun;
	gridComp.prototype.afterRepaintGrid = _gridCompCreateCal.afterRepaintGrid;
	gridComp.prototype.resetScrollLeft = _gridCompCreateCal.resetScrollLeft;
	gridComp.prototype.hideEditMenu = _gridCompCreateCal.hideEditMenu;

	gridComp.prototype.initEventFun = _gridCompEvent.initEventFun;
	gridComp.prototype.initGridEventFun = _gridCompEvent.initGridEventFun;
	gridComp.prototype.initContentDivEventFun = _gridCompEvent.initContentDivEventFun;

	gridComp.prototype.getColumnAttr = _gridCompGet.getColumnAttr;
	gridComp.prototype.getColumnByField = _gridCompGet.getColumnByField;
	gridComp.prototype.getIndexOfColumn = _gridCompGet.getIndexOfColumn;
	gridComp.prototype.getVisibleIndexOfColumn = _gridCompGet.getVisibleIndexOfColumn;
	gridComp.prototype.getNextVisibleInidexOfColumn = _gridCompGet.getNextVisibleInidexOfColumn;
	gridComp.prototype.getSelectRows = _gridCompGet.getSelectRows;
	gridComp.prototype.getSelectRowsIndex = _gridCompGet.getSelectRowsIndex;
	gridComp.prototype.getFocusRow = _gridCompGet.getFocusRow;
	gridComp.prototype.getFocusRowIndex = _gridCompGet.getFocusRowIndex;
	gridComp.prototype.getAllRows = _gridCompGet.getAllRows;
	gridComp.prototype.getRowByIndex = _gridCompGet.getRowByIndex;
	gridComp.prototype.getRowIndexByValue = _gridCompGet.getRowIndexByValue;
	gridComp.prototype.getChildRowIndex = _gridCompGet.getChildRowIndex;

	gridComp.prototype.init = _gridCompInit.init;
	gridComp.prototype.getBooleanOptions = _gridCompInit.getBooleanOptions;
	gridComp.prototype.initDefault = _gridCompInit.initDefault;
	gridComp.prototype.initGrid = _gridCompInit.initGrid;
	gridComp.prototype.destroySelf = _gridCompInit.destroySelf;
	gridComp.prototype.initOptions = _gridCompInit.initOptions;
	gridComp.prototype.initOptionsTree = _gridCompInit.initOptionsTree;
	gridComp.prototype.initVariable = _gridCompInit.initVariable;
	gridComp.prototype.initDataSourceVariable = _gridCompInit.initDataSourceVariable;
	gridComp.prototype.initWidthVariable = _gridCompInit.initWidthVariable;
	gridComp.prototype.initGridCompColumn = _gridCompInit.initGridCompColumn;
	gridComp.prototype.initGridCompColumnVar = _gridCompInit.initGridCompColumnVar;
	gridComp.prototype.initGridCompColumnFun = _gridCompInit.initGridCompColumnFun;
	gridComp.prototype.initGridCompColumnColumnMenuFun = _gridCompInit.initGridCompColumnColumnMenuFun;
	gridComp.prototype.initGridCompColumnHeaderLevelFun = _gridCompInit.initGridCompColumnHeaderLevelFun;
	gridComp.prototype.initGridCompColumnLoacl = _gridCompInit.initGridCompColumnLoacl;
	gridComp.prototype.initGridHiddenLevelColumn = _gridCompInit.initGridHiddenLevelColumn;
	gridComp.prototype.initGridCompFixedColumn = _gridCompInit.initGridCompFixedColumn;
	gridComp.prototype.setRequired = _gridCompInit.setRequired;
	gridComp.prototype.initDataSource = _gridCompInit.initDataSource;

	gridComp.prototype.addOneRow = _gridCompOperateRow.addOneRow;
	gridComp.prototype.addOneRowTree = _gridCompOperateRow.addOneRowTree;
	gridComp.prototype.addOneRowTreeHasChildF = _gridCompOperateRow.addOneRowTreeHasChildF;
	gridComp.prototype.editClose = _gridCompOperateRow.editClose;
	gridComp.prototype.addRows = _gridCompOperateRow.addRows;
	gridComp.prototype.createContentOneRowFixed = _gridCompOperateRow.createContentOneRowFixed;
	gridComp.prototype.updateEditRowIndex = _gridCompOperateRow.updateEditRowIndex;
	gridComp.prototype.deleteOneRow = _gridCompOperateRow.deleteOneRow;
	gridComp.prototype.repairSumRow = _gridCompOperateRow.repairSumRow;
	gridComp.prototype.deleteOneRowTree = _gridCompOperateRow.deleteOneRowTree;
	gridComp.prototype.deleteRows = _gridCompOperateRow.deleteRows;
	gridComp.prototype.updateRow = _gridCompOperateRow.updateRow;
	gridComp.prototype.updateValueAt = _gridCompOperateRow.updateValueAt;
	gridComp.prototype.updateValueAtTree = _gridCompOperateRow.updateValueAtTree;
	gridComp.prototype.updateValueAtEdit = _gridCompOperateRow.updateValueAtEdit;
	gridComp.prototype.setRowSelect = _gridCompOperateRow.setRowSelect;
	gridComp.prototype.setRowUnselect = _gridCompOperateRow.setRowUnselect;
	gridComp.prototype.setAllRowSelect = _gridCompOperateRow.setAllRowSelect;
	gridComp.prototype.setAllRowUnSelect = _gridCompOperateRow.setAllRowUnSelect;
	gridComp.prototype.setRowFocus = _gridCompOperateRow.setRowFocus;
	gridComp.prototype.setRowUnFocus = _gridCompOperateRow.setRowUnFocus;
	gridComp.prototype.resetNumCol = _gridCompOperateRow.resetNumCol;

	gridComp.prototype.renderTypeFun = _gridCompRenderType.renderTypeFun;
	gridComp.prototype.renderTypeByColumn = _gridCompRenderType.renderTypeByColumn;
	gridComp.prototype.renderTypeSumRow = _gridCompRenderType.renderTypeSumRow;

	gridComp.prototype.setColumnVisibleByColumn = _gridCompSet.setColumnVisibleByColumn;
	gridComp.prototype.setColumnVisibleByIndex = _gridCompSet.setColumnVisibleByIndex;
	gridComp.prototype.setCoulmnWidthByField = _gridCompSet.setCoulmnWidthByField;
	gridComp.prototype.setColumnWidth = _gridCompSet.setColumnWidth;
	gridComp.prototype.setDataSource = _gridCompSet.setDataSource;
	gridComp.prototype.setDataSourceFun1 = _gridCompSet.setDataSourceFun1;

	gridComp.prototype.widthChangeFun = _gridCompWDChange.widthChangeFun;
	gridComp.prototype.widthChangeGridFun = _gridCompWDChange.widthChangeGridFun;
	gridComp.prototype.widthChangeGridFunFixed = _gridCompWDChange.widthChangeGridFunFixed;
	gridComp.prototype.widthChangeGridFunOverWidthHidden = _gridCompWDChange.widthChangeGridFunOverWidthHidden;
	gridComp.prototype.heightChangeFun = _gridCompWDChange.heightChangeFun;
	gridComp.prototype.contentWidthChange = _gridCompWDChange.contentWidthChange;

	var gridCompProto = gridComp.prototype;

	/*
	 * colmuenu
	 */
	var oldInitGridCompColumn = gridCompProto.initGridCompColumn,
	    oldInitEventFun = gridCompProto.initEventFun,
	    oldInitGridEventFun = gridCompProto.initGridEventFun;

	gridCompProto.initGridCompColumnColumnMenuFun = _re_gridCompColMenu.re_initGridCompColumnColumnMenuFun;
	gridCompProto.initGridCompColumn = function () {
	  // 执行原有方法
	  oldInitGridCompColumn.apply(this, arguments);
	  _re_gridCompColMenu.colMenu_initGridCompColumn.apply(this, arguments);
	};
	gridCompProto.createColumnMenu = _re_gridCompColMenu.re_createColumnMenu;
	gridCompProto.initEventFun = function () {
	  // 执行原有方法
	  oldInitEventFun.apply(this, arguments);
	  _re_gridCompColMenu.colMenu_initEventFun.apply(this, arguments);
	};
	gridCompProto.initGridEventFun = function () {
	  // 执行原有方法
	  oldInitGridEventFun.apply(this, arguments);
	  _re_gridCompColMenu.colMenu_initGridEventFun.apply(this, arguments);
	};

	if (typeof gridCompProto.saveGridCompColumnArrToLocal == 'undefined') {
	  gridCompProto.saveGridCompColumnArrToLocal = function () {};
	}
	if (typeof gridCompProto.clearLocalData == 'undefined') {
	  gridCompProto.clearLocalData = function () {};
	}

	/*
	 * grag
	 */
	var oldInitEventFun_grag = gridCompProto.initEventFun;
	var oldInitGridEventFun_grag = gridCompProto.initGridEventFun;


	gridCompProto.createHeaderDrag = _re_gridCompDrag.re_createHeaderDrag;
	gridCompProto.initEventFun = function () {
	  // 执行原有方法
	  oldInitEventFun_grag.apply(this, arguments);
	  _re_gridCompDrag.drag_initEventFun.apply(this, arguments);
	};
	gridCompProto.initGridEventFun = function () {
	  // 执行原有方法
	  oldInitGridEventFun_grag.apply(this, arguments);
	  _re_gridCompDrag.drag_initGridEventFun.apply(this, arguments);
	};
	gridCompProto.dragStart = _re_gridCompDrag.dragStart;
	gridCompProto.dragFun = _re_gridCompDrag.dragFun;
	gridCompProto.dragEnd = _re_gridCompDrag.dragEnd;
	if (typeof gridCompProto.saveGridCompColumnArrToLocal == 'undefined') {
	  gridCompProto.saveGridCompColumnArrToLocal = function () {};
	}
	gridCompProto.headerThDrag = _re_gridCompDrag.headerThDrag;
	gridCompProto.resetThVariableDrag = _re_gridCompDrag.re_resetThVariableDrag;

	/*
	 * edit
	 */
	var oldInitEventFun_edit = gridCompProto.initEventFun;


	gridCompProto.hideEditMenu = _re_gridCompEdit.re_hideEditMenu;
	gridCompProto.clickFunEdit = _re_gridCompEdit.re_clickFunEdit;
	gridCompProto.editRowFun = _re_gridCompEdit.editRowFun;
	gridCompProto.editRowIndexFun = _re_gridCompEdit.editRowIndexFun;
	gridCompProto.editRow = _re_gridCompEdit.editRow;
	gridCompProto.editClose = _re_gridCompEdit.re_editClose;
	gridCompProto.editCell = _re_gridCompEdit.editCell;
	gridCompProto.nextEditShow = _re_gridCompEdit.nextEditShow;
	gridCompProto.editValueChange = _re_gridCompEdit.editValueChange;
	if (typeof gridCompProto.formEditCell == 'undefined') {
	  gridCompProto.formEditCell = function () {};
	};
	gridCompProto.updateEditRowIndex = _re_gridCompEdit.re_updateEditRowIndex;
	gridCompProto.updateValueAtEdit = _re_gridCompEdit.re_updateValueAtEdit;
	gridCompProto.setEditType = _re_gridCompEdit.setEditType;
	gridCompProto.setEditable = _re_gridCompEdit.setEditable;
	gridCompProto.initEventFun = function () {
	  // 执行原有方法
	  oldInitEventFun_edit.apply(this, arguments);
	  _re_gridCompEdit.edit_initEventFun.apply(this, arguments);
	};
	gridCompProto.setGridEditType = _re_gridCompEdit.setGridEditType;
	gridCompProto.setGridEditTypeAndEditRow = _re_gridCompEdit.setGridEditTypeAndEditRow;

	/*
	 * editForm
	 */
	var oldInitDefault = gridCompProto.initDefault,
	    oldSetRequired = gridCompProto.setRequired;


	gridCompProto.initDefault = function () {
	  // 执行原有方法
	  oldInitDefault.apply(this, arguments);
	  _re_gridCompEditForm.editForm_initDefault.apply(this, arguments);
	};
	gridCompProto.setRequired = function () {
	  // 执行原有方法
	  oldSetRequired.apply(this, arguments);
	  _re_gridCompEditForm.editForm_setRequired.apply(this, arguments);
	};
	gridCompProto.editorRowChangeFun = _re_gridCompEditForm.re_editorRowChangeFun;
	gridCompProto.formEditCell = _re_gridCompEditForm.formEditCell;

	/*
	 * fixed
	 */
	var oldColumnsVisibleFun = gridCompProto.columnsVisibleFun;


	gridCompProto.initGridCompFixedColumn = _re_gridCompFixed.re_initGridCompFixedColumn;
	gridCompProto.columnsVisibleFun = function () {
	  // 执行原有方法
	  oldColumnsVisibleFun.apply(this, arguments);
	  _re_gridCompFixed.fixed_columnsVisibleFun.apply(this, arguments);
	};
	gridCompProto.createHeaderTableFixed = _re_gridCompFixed.re_createHeaderTableFixed;
	gridCompProto.createContentTableFixed = _re_gridCompFixed.re_createContentTableFixed;
	gridCompProto.createContentOneRowFixed = _re_gridCompFixed.re_createContentOneRowFixed;
	gridCompProto.widthChangeGridFunFixed = _re_gridCompFixed.re_widthChangeGridFunFixed;

	/*
	 * formShow
	 */


	gridCompProto.createFromDivs = _re_gridCompFormShow.createFromDivs;
	gridCompProto.createFromContent = _re_gridCompFormShow.createFromContent;
	gridCompProto.createFormContentRows = _re_gridCompFormShow.createFormContentRows;
	gridCompProto.widthChangeFormFun = gridCompProto;

	/*
	 * headerLevel
	 */


	gridCompProto.resetThVariableHeaderLevel = _re_gridCompHeaderLevel.re_resetThVariableHeaderLevel;
	gridCompProto.initGridCompColumnHeaderLevelFun = _re_gridCompHeaderLevel.re_initGridCompColumnHeaderLevelFun;
	// gridCompProto.initGridHiddenLevelColumn = initGridHiddenLevelColumn;
	gridCompProto.getLevelTitleByField = _re_gridCompHeaderLevel.getLevelTitleByField;

	/*
	 * localStorage
	 */


	gridCompProto.initGridCompColumnLoacl = _re_gridCompLocalStorage.re_initGridCompColumnLoacl;
	gridCompProto.getLocalData = _re_gridCompLocalStorage.getLocalData;
	gridCompProto.saveLocalData = _re_gridCompLocalStorage.saveLocalData;
	gridCompProto.clearLocalData = _re_gridCompLocalStorage.clearLocalData;
	gridCompProto.saveGridCompColumnArrToLocal = _re_gridCompLocalStorage.saveGridCompColumnArrToLocal;
	gridCompProto.getGridCompColumnArrFromLocal = _re_gridCompLocalStorage.getGridCompColumnArrFromLocal;

	/*
	 * overWidthColumn
	 */


	gridCompProto.initGridHiddenLevelColumn = _re_gridCompOverWidthHidden.re_initGridHiddenLevelColumn;
	gridCompProto.widthChangeGridFunOverWidthHidden = _re_gridCompOverWidthHidden.re_widthChangeGridFunOverWidthHidden;

	/*
	 * sort
	 */
	var oldInitEventFun_sort = gridCompProto.initEventFun;
	var oldInitGridEventFun_sort = gridCompProto.initGridEventFun;


	gridCompProto.initEventFun = function () {
	  // 执行原有方法
	  oldInitEventFun_sort.apply(this, arguments);
	  _re_gridCompSort.sort_initEventFun.apply(this, arguments);
	};
	gridCompProto.initGridEventFun = function () {
	  // 执行原有方法
	  oldInitGridEventFun_sort.apply(this, arguments);
	  _re_gridCompSort.sort_initGridEventFun.apply(this, arguments);
	};
	gridCompProto.canSortable = _re_gridCompSort.canSortable;
	gridCompProto.deleteOneRowTree = _re_gridCompSort.re_deleteOneRowTree;
	gridCompProto.sortRowsByPrio = _re_gridCompSort.sortRowsByPrio;

	/*
	 * sumRow
	 */


	gridCompProto.createContentRowsSumRow = _re_gridCompSumRow.re_createContentRowsSumRow;
	gridCompProto.createContentSumRow = _re_gridCompSumRow.re_createContentSumRow;
	gridCompProto.createSumRow = _re_gridCompSumRow.createSumRow;
	gridCompProto.createSumRowForIE = _re_gridCompSumRow.createSumRowForIE;
	gridCompProto.repairSumRow = _re_gridCompSumRow.re_repairSumRow;
	gridCompProto.renderSumRow = _re_gridCompSumRow.renderSumRow;
	gridCompProto.renderTypeSumRow = _re_gridCompSumRow.re_renderTypeSumRow;

	/*
	 * swap
	 */
	var oldInitEventFun_swap = gridCompProto.initEventFun;
	var oldInitGridEventFun_swap = gridCompProto.initGridEventFun;


	gridCompProto.initEventFun = function () {
	  // 执行原有方法
	  oldInitEventFun_swap.apply(this, arguments);
	  _re_gridCompSwap.swap_initEventFun.apply(this, arguments);
	};
	gridCompProto.initGridEventFun = function () {
	  // 执行原有方法
	  oldInitGridEventFun_swap.apply(this, arguments);
	  _re_gridCompSwap.swap_initGridEventFun.apply(this, arguments);
	};
	gridCompProto.swapColumnStart = _re_gridCompSwap.swapColumnStart;
	gridCompProto.swapColumnFun = _re_gridCompSwap.swapColumnFun;
	gridCompProto.swapColumnEnd = _re_gridCompSwap.swapColumnEnd;

	/*
	 * tree
	 */


	gridCompProto.initOptionsTree = _re_gridCompTree.re_initOptionsTree;
	gridCompProto.clickFunTree = _re_gridCompTree.re_clickFunTree;
	gridCompProto.addOneRowTree = _re_gridCompTree.re_addOneRowTree;
	gridCompProto.addOneRowTreeHasChildF = _re_gridCompTree.re_addOneRowTreeHasChildF;
	gridCompProto.updateValueAtTree = _re_gridCompTree.re_updateValueAtTree;
	gridCompProto.getAllChildRow = _re_gridCompTree.getAllChildRow;
	gridCompProto.getChildRowIndex = _re_gridCompTree.re_getChildRowIndex;
	gridCompProto.getAllChildRowIndex = _re_gridCompTree.getAllChildRowIndex;
	gridCompProto.getAllChildRowFun = _re_gridCompTree.getAllChildRowFun;
	gridCompProto.getAllChildRowIndexFun = _re_gridCompTree.getAllChildRowIndexFun;
	gridCompProto.expandNode = _re_gridCompTree.expandNode;
	gridCompProto.expandNodeByIndex = _re_gridCompTree.expandNodeByIndex;

	exports.gridComp = gridComp;

/***/ },
/* 9 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	exports.__esModule = true;
	exports.repairContent = exports.createContentOneRowTdForIE = exports.createContentOneRowTd = exports.repaintRow = exports.createContentOneRowForIE = exports.createContentOneRow = exports.createContentRowsSumRow = exports.createContentRows = exports.createNoRowsDiv = exports.createContentTableFixed = exports.createContentTable = exports.createContentLeftNumColRow = exports.createContentLeftMultiSelectRow = exports.createContentLeft = exports.createContentSumRow = exports.createContent = exports.createThead = exports.createColgroup = exports.createHeaderDrag = exports.createHeaderTableFixed = exports.createHeaderTable = exports.createHeader = exports.createColumnMenu = exports.repaintGridDivs = exports.createGridDivs = exports.repaintDivs = exports.createDivs = undefined;

	var _gridBrowser = __webpack_require__(10);

	/*
	 * 创建顶层div以及_top div层
	 * 添加顶层div相关监听
	 */
	var createDivs = function createDivs() {
	    var oThis = this,
	        styleStr = '',
	        str = '';
	    this.ele.innerHTML = '';
	    if (this.options.width) {
	        str += 'width:' + this.options.width + ';';
	    } else {
	        str += 'width:auto;';
	    }
	    if (this.options.height) {
	        str += 'max-height:' + this.options.height + ';';
	    } else {
	        str += 'height:auto;';
	    }
	    if (str != '') {
	        styleStr = 'style="' + str + '"';
	    }
	    var htmlStr = '<div id="' + this.options.id + '" data-role="grid" class="u-grid" ' + styleStr + '>';
	    htmlStr += '</div>';
	    this.ele.insertAdjacentHTML('afterBegin', htmlStr);
	    // 创建屏幕div,用于拖动等操作
	    var htmlStr = '<div id="' + this.options.id + '_top" class="u-grid-top"></div>';
	    // this.ele.insertAdjacentHTML('afterBegin', htmlStr);
	    document.body.appendChild($(htmlStr)[0]);
	    this.initEventFun(); //创建完成之后顶层div添加监听
	    this.widthChangeFun(); // 根据整体宽度创建grid或form展示区域
	};
	/*
	 * 创建div区域
	 */
	var repaintDivs = function repaintDivs() {
	    // 后期可以考虑form展示
	    this.repaintGridDivs();
	    this.realtimeTableRows = null;
	};
	/*
	 * 创建grid形式下div区域
	 */
	var createGridDivs = function createGridDivs() {
	    if (this.createGridFlag) {
	        return;
	    }
	    // 为避免重复渲染，在开始清空里面内容
	    if ($('#' + this.options.id)[0]) $('#' + this.options.id)[0].innerHTML = '';
	    var htmlStr = '<div id="' + this.options.id + '_grid" class="u-grid-grid">';
	    // htmlStr += this.createColumnMenu();
	    htmlStr += this.createHeader();
	    htmlStr += this.createContent();
	    htmlStr += '</div>';
	    if ($('#' + this.options.id)[0]) $('#' + this.options.id).html(htmlStr);
	    $(document.body).append(this.createColumnMenu());
	    this.initGridEventFun();
	    this.headerFirstClassFun();
	    this.showType = 'grid';
	    this.afterGridDivsCreate();
	    this.createGridFlag = true;
	    this.realtimeTableRows = null;
	};
	/*
	 * 重画grid
	 */
	var repaintGridDivs = function repaintGridDivs() {
	    $('#' + this.options.id + '_grid').remove(null, true);
	    this.showType = '';
	    this.wholeWidth = 0;
	    this.createGridFlag = false;
	    this.columnsVisibleFun();
	    this.widthChangeFun();
	    this.realtimeTableRows = null;
	};
	/*
	 * 创建columnMenu区域
	 */
	var createColumnMenu = function createColumnMenu() {
	    return '';
	};
	/*
	 * 创建header区域
	 */
	var createHeader = function createHeader() {
	    var wrapStr = '',
	        headerShowStr = '';
	    if (!this.options.showHeader) headerShowStr = 'style="display:none;"';
	    var htmlStr = '<div class="u-grid-header" id="' + this.options.id + '_header" ' + headerShowStr + '><div class="u-grid-header-wrap" id="' + this.options.id + '_header_wrap" data-role="resizable" ' + wrapStr + '>';
	    if (this.options.columnMenu) {
	        htmlStr += '<div class="u-grid-header-columnmenu uf uf-reorderoption"></div>';
	    }
	    if (this.options.multiSelect || this.options.showNumCol) {
	        htmlStr += '<div id="' + this.options.id + '_header_left" class="u-grid-header-left" style="width:' + this.leftW + 'px;">';
	        if (this.options.multiSelect) {
	            if (_gridBrowser.gridBrowser.isIE8) {
	                //htmlStr += '<div class="u-grid-header-multi-select" style="width:' + this.multiWidth + 'px;"><input class="u-grid-multi-input"   type="checkbox" id="' + this.options.id + '_header_multi_input"></div>'
	                htmlStr += '<div class="u-grid-header-multi-select" style="width:' + this.multiWidth + 'px;"><span class="u-grid-checkbox-outline" id="' + this.options.id + '_header_multi_input"><span class="u-grid-checkbox-tick-outline"></span></span></div>';
	            } else {
	                //htmlStr += '<div class="u-grid-header-multi-select  checkbox check-success" style="width:' + this.multiWidth + 'px;"><input  class="u-grid-multi-input"  type="checkbox" id="' + this.options.id + '_header_multi_input"><label for="' + this.options.id + '_header_multi_input"></label></div>'
	                htmlStr += '<div class="u-grid-header-multi-select  checkbox check-success" style="width:' + this.multiWidth + 'px;"><span class="u-grid-checkbox-outline" id="' + this.options.id + '_header_multi_input"><span class="u-grid-checkbox-tick-outline"></span></span></div>';
	            }
	        }
	        if (this.options.showNumCol) {
	            htmlStr += '<div class="u-grid-header-num" style="width:' + this.numWidth + 'px;"></div>';
	        }
	        htmlStr += '</div>';
	    }
	    htmlStr += this.createHeaderTableFixed();
	    htmlStr += this.createHeaderTable();
	    htmlStr += '</div>';
	    htmlStr += this.createHeaderDrag();;
	    htmlStr += '</div>';
	    return htmlStr;
	};
	/*
	 * 创建header区域table
	 */
	var createHeaderTable = function createHeaderTable(createFlag) {
	    var leftW, positionStr, idStr;
	    if (createFlag == 'fixed') {
	        leftW = parseInt(this.leftW);
	        positionStr = 'absolute;width:' + this.fixedWidth + 'px;z-index:11;background:#F9F9F9;';
	        idStr = 'fixed_';
	    } else {
	        leftW = parseInt(this.leftW) + parseInt(this.fixedWidth);
	        positionStr = 'relative;';
	        idStr = '';
	        if (this.contentMinWidth > 0) {
	            positionStr += 'width:' + this.contentMinWidth + 'px;';
	        }
	    }
	    var htmlStr = '<table role="grid" id="' + this.options.id + '_header_' + idStr + 'table" style="position:' + positionStr + ';left:' + leftW + 'px">';
	    htmlStr += this.createColgroup(createFlag);
	    htmlStr += '<thead role="rowgroup" id="' + this.options.id + '_header_' + idStr + 'thead">';
	    htmlStr += this.createThead(createFlag);
	    htmlStr += '</thead></table>';
	    return htmlStr;
	};
	var createHeaderTableFixed = function createHeaderTableFixed() {
	    return '';
	};
	var createHeaderDrag = function createHeaderDrag() {
	    return '';
	};
	/*
	 * 创建colgroup
	 */
	var createColgroup = function createColgroup(createFlag) {
	    var oThis = this,
	        htmlStr = '<colgroup>',
	        gridCompColumnArr;
	    if (createFlag == 'fixed') {
	        gridCompColumnArr = this.gridCompColumnFixedArr;
	    } else {
	        gridCompColumnArr = this.gridCompColumnArr;
	    }
	    $.each(gridCompColumnArr, function () {
	        if (this.options.visible) {
	            htmlStr += '<col';
	            htmlStr += ' style="width:' + oThis.formatWidth(this.options.width) + '"';
	            htmlStr += '>';
	        }
	    });
	    htmlStr += '</colgroup>';
	    return htmlStr;
	};
	/*
	 * 创建thead区域
	 */
	var createThead = function createThead(createFlag) {
	    var oThis = this,
	        visibleIndex = 0,
	        gridCompColumnArr,
	        trStyle = '';
	    if (this.options.maxHeaderLevel > 1) {
	        trStyle = 'style="height:' + (this.headerHeight - 1) + 'px;"';
	    }
	    var htmlStr = '<tr role="row" ' + trStyle + '>';
	    if (createFlag == 'fixed') {
	        gridCompColumnArr = this.gridCompColumnFixedArr;
	    } else {
	        gridCompColumnArr = this.gridCompColumnArr;
	    }
	    $.each(gridCompColumnArr, function (i) {
	        var vi = visibleIndex,
	            displayStyle = '';
	        if (this.options.visible == false) {
	            vi = -1;
	            displayStyle = 'style="display:none;"';
	        } else {
	            visibleIndex++;
	        }
	        // 低版本浏览器不支持th position为relative，因此加入空div
	        htmlStr += '<th role="columnheader" data-filed="' + this.options.field + '" rowspan="1" class="u-grid-header-th" ' + displayStyle + 'field="' + this.options.field + '" index="' + i + '" visibleIndex="' + vi + '"><div style="position:relative;">';
	        var colorStype = '';
	        if (this.options.headerColor) {
	            colorStype = 'style="color:' + this.options.headerColor + '"';
	        }
	        htmlStr += '<div class="u-grid-header-link" field="' + this.options.field + '" title="' + this.options.title + '" ' + colorStype + '>' + this.options.title + '</div>';
	        /*if(oThis.options.columnMenu && createFlag != 'fixed'){
	            // 创建右侧按钮图标
	            htmlStr += '<div class="u-grid-header-columnmenu uf uf-reorderoption " field="' + this.options.field + '" style="display:none;"></div>';
	        }*/
	        htmlStr += '</div></th>';
	    });

	    htmlStr += '</tr>';
	    return htmlStr;
	};
	/*
	 * 创建内容区域
	 */
	var createContent = function createContent() {
	    var h = '',
	        displayStr = '',
	        bottonStr = '';
	    if (this.countContentHeight) {
	        var wh = $('#' + this.options.id)[0].offsetHeight;
	        this.wholeHeight = wh;
	        if (wh > 0) {
	            this.contentHeight = parseInt(wh) - this.exceptContentHeight > 0 ? parseInt(wh) - this.exceptContentHeight : 0;
	            if (this.contentHeight > 0) {
	                h = 'style="height:' + this.contentHeight + 'px;"';
	            }
	        }
	    }
	    var htmlStr = '<div id="' + this.options.id + '_content" class="u-grid-content" ' + h + '>';
	    if (this.options.showNumCol || this.options.multiSelect) {
	        htmlStr += this.createContentLeft();
	        if (!(this.contentWidth > this.contentMinWidth)) {
	            displayStr = 'display:none;';
	            bottonStr = 'bottom:0px;';
	        }
	        htmlStr += this.createContentSumRow(bottonStr);
	        if (u.isIOS) {
	            displayStr += 'width:0px;';
	        }
	        htmlStr += '<div class="u-grid-content-left-bottom" id="' + this.options.id + '_content_left_bottom" style="width:' + (this.leftW + this.fixedWidth) + 'px;' + displayStr + '">';
	        htmlStr += '</div>';
	    }
	    htmlStr += this.createContentTableFixed();
	    htmlStr += this.createContentTable();
	    htmlStr += '</div>';
	    return htmlStr;
	};
	var createContentSumRow = function createContentSumRow() {
	    return '';
	};
	/*
	 * 创建内容区左侧区域
	 */
	var createContentLeft = function createContentLeft() {
	    var oThis = this,
	        htmlStr = "",
	        left = 0,
	        hStr;
	    // 高度可伸缩，暂时去掉内部的高度设置
	    // if(this.countContentHeight && parseInt(this.contentHeight) > 0){
	    // 	hStr = 'max-height:' + this.contentHeight + 'px;overflow:hidden;';
	    // }else{
	    // 	hStr = '';
	    // }
	    if (this.options.multiSelect) {
	        htmlStr += '<div class="u-grid-content-left" id="' + this.options.id + '_content_multiSelect" style="width:' + this.multiSelectWidth + 'px;' + hStr + '">';
	        // 遍历生成所有行
	        if (this.dataSourceObj.rows) {
	            $.each(this.dataSourceObj.rows, function (i) {
	                htmlStr += oThis.createContentLeftMultiSelectRow(this);
	            });
	        }
	        htmlStr += '</div>';
	        left += this.multiSelectWidth;
	    }
	    if (this.options.showNumCol) {
	        htmlStr += '<div class="u-grid-content-left" id="' + this.options.id + '_content_numCol" style="width:' + this.numWidth + 'px;left:' + left + 'px;' + hStr + '">';
	        // 遍历生成所有行
	        if (this.dataSourceObj.rows) {
	            $.each(this.dataSourceObj.rows, function (i, row) {
	                htmlStr += oThis.createContentLeftNumColRow(i, row.value);
	            });
	        }
	        htmlStr += '</div>';
	    }
	    return htmlStr;
	};
	/*
	 * 创建内容区左侧区域复选区（一行）
	 */
	var createContentLeftMultiSelectRow = function createContentLeftMultiSelectRow(row, displayFlag) {
	    var displayStr = '';
	    if (!this.options.autoExpand && row.level > 0 && displayFlag != 'block') {
	        displayStr = 'display:none;';
	    }
	    var tmpcheck = row.value["$_#_@_id"];
	    if (!tmpcheck) {
	        tmpcheck = setTimeout(function () {});
	    }
	    if (_gridBrowser.gridBrowser.isIE8) {
	        //var	htmlStr = '<div style="width:' + this.multiSelectWidth + 'px;' + displayStr + '" class="u-grid-content-multiSelect " ><input class="u-grid-multi-input" id="checkbox'+tmpcheck+'" type="checkbox" value="1" ></div>'
	        var htmlStr = '<div style="width:' + this.multiSelectWidth + 'px;' + displayStr + '" class="u-grid-content-multiSelect " ><span class="u-grid-checkbox-outline" id="checkbox' + tmpcheck + '" value="1"><span class="u-grid-checkbox-tick-outline"></span></span></div>';
	    } else {
	        //var htmlStr = '<div style="width:' + this.multiSelectWidth + 'px;' + displayStr + '" class="u-grid-content-multiSelect checkbox check-success" ><input class="u-grid-multi-input" id="checkbox'+tmpcheck+'" type="checkbox" value="1" ><label for="checkbox'+tmpcheck+'"></label></div>'
	        var htmlStr = '<div style="width:' + this.multiSelectWidth + 'px;' + displayStr + '" class="u-grid-content-multiSelect checkbox check-success" ><span class="u-grid-checkbox-outline" id="checkbox' + tmpcheck + '" value="1"><span class="u-grid-checkbox-tick-outline"></span></span></div>';
	    }
	    return htmlStr;
	};
	/*
	 * 创建内容区左侧区域数字列（一行）
	 */
	var createContentLeftNumColRow = function createContentLeftNumColRow(index) {
	    var htmlStr = '<div style="width:' + this.numWidth + 'px;" class="u-grid-content-num">' + (index + 1) + '</div>';
	    return htmlStr;
	};
	/*
	 * 创建内容区table
	 */
	var createContentTable = function createContentTable(createFlag) {
	    var leftW, idStr, styleStr, hStr, cssStr, tableStyleStr;
	    if (this.countContentHeight && parseInt(this.contentHeight) > 0) {
	        hStr = 'height:' + this.contentHeight + 'px;';
	    } else {
	        hStr = "";
	    }
	    if (createFlag == 'fixed') {
	        leftW = parseInt(this.leftW);
	        idStr = 'fixed_';
	        cssStr = 'fixed-';
	        styleStr = 'style="position:absolute;width:' + this.fixedWidth + 'px;left:' + leftW + 'px;' + hStr + '"';
	        tableStyleStr = 'style="width:' + this.fixedWidth + 'px;"';
	    } else {
	        leftW = parseInt(this.leftW) + parseInt(this.fixedWidth, 0);
	        idStr = '';
	        cssStr = '';
	        styleStr = 'style="position:relative;left:' + leftW + 'px;' + hStr;
	        if (this.contentMinWidth > 0) {
	            styleStr += 'width:' + this.contentMinWidth + 'px;';
	        }
	        styleStr += '"';
	        tableStyleStr = '';
	        if (this.contentMinWidth > 0) {
	            if (this.contentWidth > 0) {
	                tableStyleStr = 'style="min-width:' + this.contentMinWidth + 'px;width:' + this.contentWidth + 'px;"';
	            } else {
	                tableStyleStr = 'style="min-width:' + this.contentMinWidth + 'px;"';
	            }
	        }
	    }
	    var htmlStr = '<div id="' + this.options.id + '_content_' + idStr + 'div" class="u-grid-content-' + cssStr + 'div" ' + styleStr + '>';
	    htmlStr += '<div style="height:30px;position:absolute;top:-30px;width:100%;"></div><table role="grid" id="' + this.options.id + '_content_' + idStr + 'table" ' + tableStyleStr + '>';
	    htmlStr += this.createColgroup(createFlag);
	    htmlStr += '<thead role="rowgroup" id="' + this.options.id + '_content_' + idStr + 'thead" style="display:none">';
	    htmlStr += this.createThead(createFlag);
	    htmlStr += '</thead>';
	    htmlStr += this.createContentRows(createFlag);
	    htmlStr += '</table>';
	    if (createFlag != 'fixed') {
	        htmlStr += this.createNoRowsDiv();
	    }
	    htmlStr += '</div>';
	    return htmlStr;
	};
	var createContentTableFixed = function createContentTableFixed() {
	    return '';
	};
	/*
	 * 创建无数据区域
	 */
	var createNoRowsDiv = function createNoRowsDiv() {
	    var styleStr = '',
	        styleStr1 = '';
	    if (this.contentMinWidth > 0) {
	        styleStr += 'style="width:' + this.contentMinWidth + 'px;"';
	    }
	    if (this.contentWidth > 0) {
	        styleStr1 += 'style="width:' + this.contentWidth + 'px;"';
	    }
	    var htmlStr = '<div class="u-grid-noRowsDiv"' + styleStr1 + ' id="' + this.options.id + '_noRows"></div>';
	    htmlStr += '<div class="u-grid-noRowsShowDiv"' + styleStr + ' id="' + this.options.id + '_noRowsShow">' + this.transMap.ml_no_rows + '</div>';
	    return htmlStr;
	};
	/*
	 * 创建内容区域所有行
	 */
	var createContentRows = function createContentRows(createFlag) {
	    var oThis = this,
	        htmlStr = "",
	        idStr;
	    if (createFlag == 'fixed') {
	        idStr = 'fixed_';
	    } else {
	        idStr = '';
	    }
	    // 遍历生成所有行
	    if (this.dataSourceObj.rows) {
	        htmlStr += '<tbody role="rowgroup" id="' + this.options.id + '_content_' + idStr + 'tbody">';
	        $.each(this.dataSourceObj.rows, function (i) {
	            htmlStr += oThis.createContentOneRow(this, createFlag);
	        });
	        htmlStr += this.createContentRowsSumRow();
	        htmlStr += '</tbody>';
	    }
	    return htmlStr;
	};
	var createContentRowsSumRow = function createContentRowsSumRow() {
	    return '';
	};
	/*
	 * 创建内容区域数据行
	 */
	var createContentOneRow = function createContentOneRow(row, createFlag, displayFlag) {
	    var styleStr = '';
	    if (!this.options.autoExpand && row.level > 0 && displayFlag != 'block') {
	        styleStr = 'style="display:none"';
	    }
	    var htmlStr = '<tr role="row" ' + styleStr + '>';
	    htmlStr += this.createContentOneRowTd(row, createFlag);
	    htmlStr += '</tr>';
	    return htmlStr;
	};
	/*
	 * 创建内容区域数据行，针对IE
	 */
	var createContentOneRowForIE = function createContentOneRowForIE(table, index, rowObj, createFlag, displayFlag) {
	    var row = table.insertRow(index + 1);
	    row.setAttribute("role", "row");
	    if (!this.options.autoExpand && row.level > 0 && displayFlag != 'block') {
	        row.style.display = 'none';
	    }
	    this.createContentOneRowTdForIE(row, rowObj, createFlag);
	};

	/*
	 * 数据更新重画当前行
	 */
	var repaintRow = function repaintRow(rowIndex) {
	    var tr = $('#' + this.options.id + '_content_tbody').find('tr[role="row"]')[rowIndex],
	        fixedtr = $('#' + this.options.id + '_content_fixed_tbody').find('tr[role="row"]')[rowIndex],
	        row = this.dataSourceObj.rows[rowIndex],
	        $tr = $(tr),
	        index = this.getTrIndex($tr);
	    if (_gridBrowser.gridBrowser.isIE8 || _gridBrowser.gridBrowser.isIE9) {
	        var table = $('#' + this.options.id + '_content_table')[0],
	            fixedtable = $('#' + this.options.id + '_content_fixed_table')[0];
	        var className = tr.className;
	        var fixclassName = fixedtr.className;
	        table.deleteRow(rowIndex + 1);
	        fixedtable.deleteRow(rowIndex + 1);
	        var tr = table.insertRow(rowIndex + 1);
	        u.addClass(tr, className);
	        var fixedtr = fixedtable.insertRow(rowIndex + 1);
	        u.addClass(fixedtr, fixclassName);
	        this.createContentOneRowTdForIE(tr, row);
	        this.createContentOneRowTdForIE(fixedtr, row, 'fixed');
	    } else {
	        tr.innerHTML = this.createContentOneRowTd(row);
	        if (fixedtr) fixedtr.innerHTML = this.createContentOneRowTd(row, 'fixed');
	    }
	    var obj = {};
	    obj.begin = index;
	    obj.length = 1;
	    this.renderTypeFun(obj);
	};
	/*
	 * 创建行td对应的html
	 */
	var createContentOneRowTd = function createContentOneRowTd(row, createFlag) {
	    var oThis = this,
	        htmlStr = '',
	        gridCompColumnArr,
	        value = row.value;
	    if (createFlag == 'fixed') {
	        gridCompColumnArr = this.gridCompColumnFixedArr;
	    } else {
	        gridCompColumnArr = this.gridCompColumnArr;
	    }
	    $.each(gridCompColumnArr, function () {
	        var f = this.options.field,
	            v = $(value).attr(f);
	        v = oThis.getString(v, '');
	        if ($.type(v) == 'object') {
	            v = v.showValue;
	        }
	        var renderType = this.options.renderType;
	        var treeStyle = '';
	        var spanStr = '';
	        var iconStr = '';
	        var vStr = '';
	        var tdStyle = '';
	        if (oThis.options.showTree && this.firstColumn) {
	            var l = parseInt(oThis.treeLeft) * parseInt(row.level);
	            treeStyle = 'style="position:relative;';
	            if (row.hasChild) {
	                if (oThis.options.autoExpand) {
	                    spanStr = '<span class=" uf uf-minusbutton u-grid-content-tree-span"></span>';
	                } else {
	                    spanStr = '<span class=" uf uf-addsquarebutton2 u-grid-content-tree-span"></span>';
	                }
	            } else {
	                l += 16;
	            }
	            treeStyle += 'left:' + l + 'px;"';
	        }
	        if (!this.options.visible) {
	            tdStyle = 'style="display:none;"';
	        }
	        if (this.options.icon) {
	            iconStr = '<span class="' + this.options.icon + '"></span>';
	        }
	        // title="' + v + '" 创建td的时候不在设置title，在renderType中设置,处理现实xml的情况
	        htmlStr += '<td role="rowcell"  ' + tdStyle + ' title="' + v.replace(/\</g, '\<').replace(/\>/g, '\>') + '"><div class="u-grid-content-td-div" ' + treeStyle + '>' + spanStr + iconStr + '<span>' + v.replace(/\</g, '&lt;').replace(/\>/g, '&gt;') + '</span></div></td>';
	    });
	    return htmlStr;
	};
	/*
	 * 创建行td,针对IE
	 */
	var createContentOneRowTdForIE = function createContentOneRowTdForIE(row, rowObj, createFlag) {
	    var oThis = this,
	        gridCompColumnArr,
	        value = rowObj.value;
	    if (createFlag == 'fixed') {
	        gridCompColumnArr = this.gridCompColumnFixedArr;
	    } else {
	        gridCompColumnArr = this.gridCompColumnArr;
	    }
	    $.each(gridCompColumnArr, function () {
	        var f = this.options.field,
	            v = $(value).attr(f),
	            v = oThis.getString(v, '');
	        if ($.type(v) == 'object') {
	            v = v.showValue;
	        }
	        var renderType = this.options.renderType,
	            treeStyle = '',
	            spanStr = '',
	            iconStr = '',
	            vStr = '',
	            htmlStr = '',
	            newCell = row.insertCell();
	        newCell.setAttribute("role", "rowcell");
	        newCell.title = v.replace(/\</g, '\<').replace(/\>/g, '\>');
	        if (oThis.options.showTree && this.firstColumn) {
	            var l = parseInt(oThis.treeLeft) * parseInt(rowObj.level);
	            treeStyle = 'style="position:relative;';
	            if (rowObj.hasChild) {
	                if (oThis.options.autoExpand) {
	                    spanStr = '<span class=" uf uf-minusbutton u-grid-content-tree-span"></span>';
	                } else {
	                    spanStr = '<span class=" uf uf-addsquarebutton2 u-grid-content-tree-span"></span>';
	                }
	            } else {
	                l += 18;
	            }
	            treeStyle += 'left:' + l + 'px;"';
	        }
	        if (!this.options.visible) {
	            newCell.style.display = "none";
	        }
	        if (this.options.icon) {
	            iconStr = '<span class="' + this.options.icon + '"></span>';
	        }
	        htmlStr += '<div class="u-grid-content-td-div" ' + treeStyle + '>' + spanStr + iconStr + '<span>' + v.replace(/\</g, '&lt;').replace(/\>/g, '&gt;') + '</span></div>';
	        newCell.insertAdjacentHTML('afterBegin', htmlStr);
	    });
	};
	/*
	 * 重画内容区域
	 */
	var repairContent = function repairContent() {
	    var $pDiv = $('#' + this.options.id + '_content').parent();
	    $('#' + this.options.id + '_content').remove(null, true);
	    if ($pDiv[0]) {
	        var htmlStr = this.createContent();
	        $pDiv[0].insertAdjacentHTML('beforeEnd', htmlStr);
	        this.renderTypeFun();
	        this.initContentDivEventFun();
	        if ($('#' + this.options.id + '_content_div')[0]) {
	            $('#' + this.options.id + '_content_div')[0].scrollLeft = this.scrollLeft;
	        }
	        $('#' + this.options.id + '_content_edit_menu').css('display', 'none');
	    }
	    this.realtimeTableRows = null;
	};

	exports.createDivs = createDivs;
	exports.repaintDivs = repaintDivs;
	exports.createGridDivs = createGridDivs;
	exports.repaintGridDivs = repaintGridDivs;
	exports.createColumnMenu = createColumnMenu;
	exports.createHeader = createHeader;
	exports.createHeaderTable = createHeaderTable;
	exports.createHeaderTableFixed = createHeaderTableFixed;
	exports.createHeaderDrag = createHeaderDrag;
	exports.createColgroup = createColgroup;
	exports.createThead = createThead;
	exports.createContent = createContent;
	exports.createContentSumRow = createContentSumRow;
	exports.createContentLeft = createContentLeft;
	exports.createContentLeftMultiSelectRow = createContentLeftMultiSelectRow;
	exports.createContentLeftNumColRow = createContentLeftNumColRow;
	exports.createContentTable = createContentTable;
	exports.createContentTableFixed = createContentTableFixed;
	exports.createNoRowsDiv = createNoRowsDiv;
	exports.createContentRows = createContentRows;
	exports.createContentRowsSumRow = createContentRowsSumRow;
	exports.createContentOneRow = createContentOneRow;
	exports.createContentOneRowForIE = createContentOneRowForIE;
	exports.repaintRow = repaintRow;
	exports.createContentOneRowTd = createContentOneRowTd;
	exports.createContentOneRowTdForIE = createContentOneRowTdForIE;
	exports.repairContent = repairContent;

/***/ },
/* 10 */
/***/ function(module, exports) {

	"use strict";

	exports.__esModule = true;
	var gridBrowser = {},
	    userAgent = navigator.userAgent,
	    ua = userAgent.toLowerCase(),
	    s;
	if (s = ua.match(/msie ([\d.]+)/)) {
	    gridBrowser.isIE = true;
	}
	if (gridBrowser.isIE) {
	    var mode = document.documentMode;
	    if (mode == null) {} else {
	        if (mode == 8) {
	            gridBrowser.isIE8 = true;
	        } else if (mode == 9) {
	            gridBrowser.isIE9 = true;
	        }
	    }
	}
	exports.gridBrowser = gridBrowser;

/***/ },
/* 11 */
/***/ function(module, exports) {

	'use strict';

	exports.__esModule = true;
	var trHoverFun = function trHoverFun(index) {
	    var oThis = this;
	    $('#' + oThis.options.id + '_content_tbody').find('tr').removeClass('u-grid-move-bg');
	    $('#' + oThis.options.id + '_content_fixed_tbody').find('tr').removeClass('u-grid-move-bg');
	    if (oThis.options.multiSelect) $('#' + oThis.options.id + '_content_multiSelect').find('div').removeClass('u-grid-move-bg');
	    if (oThis.options.showNumCol) $('#' + oThis.options.id + '_content_numCol').find('div').removeClass('u-grid-move-bg');
	    if (index > -1) {
	        var $tr = $('#' + oThis.options.id + '_content_tbody').find('tr').eq(index);
	        if ($tr[0].id && $tr[0].id == oThis.options.id + '_edit_tr') {
	            return;
	        }
	        $('#' + oThis.options.id + '_content_tbody').find('tr').eq(index).addClass('u-grid-move-bg');
	        $('#' + oThis.options.id + '_content_fixed_tbody').find('tr').eq(index).addClass('u-grid-move-bg');
	        if (oThis.options.multiSelect) $('#' + oThis.options.id + '_content_multiSelect').find('div').eq(index).addClass('u-grid-move-bg');
	        if (oThis.options.showNumCol) $('#' + oThis.options.id + '_content_numCol').find('div').eq(index).addClass('u-grid-move-bg');
	        if (typeof oThis.options.onRowHover == 'function' && !$tr.is('.u-grid-content-sum-row')) {
	            var obj = {};
	            obj.gridObj = oThis;
	            obj.rowObj = oThis.dataSourceObj.rows[index];
	            obj.rowIndex = index;
	            oThis.options.onRowHover(obj);
	        }
	    }
	};
	/*
	 * 定时器处理
	 */
	var setIntervalFun = function setIntervalFun(e) {
	    this.widthChangeFun();
	    this.heightChangeFun();
	    this.editorRowChangeFun();
	};
	var editorRowChangeFun = function editorRowChangeFun() {};
	/*
	 * grid区域创建完成之后处理
	 * 1、数据列显示处理
	 * 2、取行高
	 */
	var afterGridDivsCreate = function afterGridDivsCreate() {
	    this.columnsVisibleFun();
	    this.resetThVariable();
	    this.countRowHeight();
	    this.noRowsShowFun();
	    this.renderTypeFun();
	    this.resetScrollLeft();
	    this.hideEditMenu();
	    if (typeof this.options.afterCreate == 'function') {
	        this.options.afterCreate.call(this);
	    }
	};
	/*
	 * 取行高
	 */
	var countRowHeight = function countRowHeight() {
	    if ($('#' + this.options.id + '_content_tbody tr')[0]) {
	        this.rowHeight = $('#' + this.options.id + '_content_tbody tr')[0].offsetHeight;
	    }
	};
	/*
	 * 处理是否显示无数据行
	 */
	var noRowsShowFun = function noRowsShowFun() {
	    if (this.dataSourceObj.rows && this.dataSourceObj.rows.length > 0) {
	        $('#' + this.options.id + '_noRowsShow').css('display', 'none');
	        $('#' + this.options.id + '_noRows').css('display', 'none');
	    } else {
	        $('#' + this.options.id + '_noRowsShow').css('display', 'block');
	        $('#' + this.options.id + '_noRows').css('display', 'block');
	    }
	};

	/*
	 * grid区域重画完成之后处理，已经执行过afterGridDivsCreate
	 * 1、设置横向滚动条
	 * 2、隐藏编辑按钮
	 */
	var afterRepaintGrid = function afterRepaintGrid() {
	    this.resetScrollLeft();
	    this.hideEditMenu();
	};
	/*
	 * 设置横向滚动条
	 */
	var resetScrollLeft = function resetScrollLeft() {
	    if ($('#' + this.options.id + '_content_div')[0]) {
	        try {
	            $('#' + this.options.id + '_content_div')[0].scrollLeft = this.scrollLeft;
	        } catch (e) {}
	    }
	};
	/*
	 * 隐藏编辑按钮
	 */
	var hideEditMenu = function hideEditMenu() {};

	exports.trHoverFun = trHoverFun;
	exports.setIntervalFun = setIntervalFun;
	exports.editorRowChangeFun = editorRowChangeFun;
	exports.afterGridDivsCreate = afterGridDivsCreate;
	exports.countRowHeight = countRowHeight;
	exports.noRowsShowFun = noRowsShowFun;
	exports.afterRepaintGrid = afterRepaintGrid;
	exports.resetScrollLeft = resetScrollLeft;
	exports.hideEditMenu = hideEditMenu;

/***/ },
/* 12 */
/***/ function(module, exports) {

	'use strict';

	exports.__esModule = true;
	/*
	 * 获取某列对应属性
	 */
	var getColumnAttr = function getColumnAttr(attr, field) {
	    for (var i = 0; i < this.gridCompColumnArr.length; i++) {
	        if (this.gridCompColumnArr[i].options.field == field) {
	            return $(this.gridCompColumnArr[i].options).attr(attr);
	        }
	    }
	    return "";
	};
	/*
	 * 根据field获取gridcompColumn对象
	 */
	var getColumnByField = function getColumnByField(field) {
	    for (var i = 0; i < this.gridCompColumnArr.length; i++) {
	        if (this.gridCompColumnArr[i].options.field == field) {
	            return this.gridCompColumnArr[i];
	        }
	    }
	    return null;
	};
	/*
	 * 获取column属于第几列
	 */
	var getIndexOfColumn = function getIndexOfColumn(column) {
	    var index = -1;
	    for (var i = 0; i < this.gridCompColumnArr.length; i++) {
	        if (this.gridCompColumnArr[i] == column) {
	            index = i;
	            break;
	        }
	    }
	    return index;
	};
	/*
	 * 获取column属于当前显示第几列
	 */
	var getVisibleIndexOfColumn = function getVisibleIndexOfColumn(column) {
	    var index = -1;
	    var j = 0;
	    for (var i = 0; i < this.gridCompColumnArr.length; i++) {
	        if (this.gridCompColumnArr[i] == column) {
	            if (!($('#' + this.options.id + '_header').find('th').eq(i).css('display') == 'none')) {
	                index = j;
	            }
	            break;
	        }
	        if (!($('#' + this.options.id + '_header').find('th').eq(i).css('display') == 'none')) {
	            j++;
	        }
	    }
	    return index;
	};
	/*
	 * 获取column后面第一个显示列所在第几列
	 */
	var getNextVisibleInidexOfColumn = function getNextVisibleInidexOfColumn(column) {
	    var index = -1,
	        flag = false,
	        j = 0;
	    for (var i = 0; i < this.gridCompColumnArr.length; i++) {
	        if (this.gridCompColumnArr[i] == column) {
	            flag = true;
	            continue;
	        }
	        if (flag == true && !($('#' + this.options.id + '_header').find('th').eq(i).css('display') == 'none')) {
	            index = j;
	            break;
	        }
	        if (!($('#' + this.options.id + '_header').find('th').eq(i).css('display') == 'none')) {

	            j++;
	        }
	    }
	    return index;
	};

	/*
	 * 获取选中行
	 */
	var getSelectRows = function getSelectRows() {
	    return this.selectRows;
	};
	/*
	 * 获取选中行对应行号
	 */
	var getSelectRowsIndex = function getSelectRowsIndex() {
	    return this.selectRowsIndex;
	};

	/*
	 * 获取focus行
	 */
	var getFocusRow = function getFocusRow() {
	    return this.focusRow;
	};
	/*
	 * 获取focus行对应行号
	 */
	var getFocusRowIndex = function getFocusRowIndex() {
	    return this.focusRowIndex;
	};
	/*
	 * 获取所有行
	 */
	var getAllRows = function getAllRows() {
	    var oThis = this;
	    this.allRows = new Array();
	    if (this.dataSourceObj.rows) {
	        $.each(this.dataSourceObj.rows, function () {
	            oThis.allRows.push(this.value);
	        });
	    }
	    return this.allRows;
	};
	/*
	 * 根据行号获取row
	 */
	var getRowByIndex = function getRowByIndex(index) {
	    return this.dataSourceObj.rows[index];
	};
	/*
	 * 根据某个字段值获取rowIndex
	 */
	var getRowIndexByValue = function getRowIndexByValue(field, value) {
	    var index = -1;
	    $.each(this.dataSourceObj.rows, function (i) {
	        var v = $(this.value).attr(field);
	        if (v == value) {
	            index = i;
	        }
	    });
	    return index;
	};

	var getChildRowIndex = function getChildRowIndex(row) {
	    var result = [];
	    $.each(row.childRow, function () {
	        result.push(this.valueIndex);
	    });
	    return result;
	};

	exports.getColumnAttr = getColumnAttr;
	exports.getColumnByField = getColumnByField;
	exports.getIndexOfColumn = getIndexOfColumn;
	exports.getVisibleIndexOfColumn = getVisibleIndexOfColumn;
	exports.getNextVisibleInidexOfColumn = getNextVisibleInidexOfColumn;
	exports.getSelectRows = getSelectRows;
	exports.getSelectRowsIndex = getSelectRowsIndex;
	exports.getFocusRow = getFocusRow;
	exports.getFocusRowIndex = getFocusRowIndex;
	exports.getAllRows = getAllRows;
	exports.getRowByIndex = getRowByIndex;
	exports.getRowIndexByValue = getRowIndexByValue;
	exports.getChildRowIndex = getChildRowIndex;

/***/ },
/* 13 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	exports.__esModule = true;
	exports.initDataSource = exports.setRequired = exports.initGridCompFixedColumn = exports.initGridHiddenLevelColumn = exports.initGridCompColumnLoacl = exports.initGridCompColumnHeaderLevelFun = exports.initGridCompColumnColumnMenuFun = exports.initGridCompColumnFun = exports.initGridCompColumnVar = exports.initGridCompColumn = exports.initWidthVariable = exports.initDataSourceVariable = exports.initVariable = exports.initOptionsTree = exports.initOptions = exports.destroySelf = exports.initGrid = exports.initDefault = exports.getBooleanOptions = exports.init = undefined;

	var _gridBrowser = __webpack_require__(10);

	var _dataSource = __webpack_require__(1);

	var _column = __webpack_require__(6);

	/*
	* 处理参数
	*/
	var init = function init(ele, options) {
	    this.dataSource = _dataSource.dataSource;
	    this.gridCompColumn = _column.column;
	    this.ele = ele[0];
	    this.$ele = ele;
	    this.initDefault();
	    this.options = $.extend({}, this.defaults, options);
	    this.getBooleanOptions();
	    this.transDefault = {
	        ml_show_column: '显示/隐藏列',
	        ml_clear_set: '清除设置',
	        ml_no_rows: '无数据',
	        ml_sum: '合计:',
	        ml_close: '关闭'
	    };
	    this.transMap = $.extend({}, this.transDefault, options.transMap);
	    this.gridCompColumnFixedArr = new Array();
	    this.gridCompColumnArr = new Array(); // 存储设置默认值之后的columns对象
	    // this.headerHeight = 45; // header区域高度
	    this.countContentHeight = true; // 是否计算内容区的高度（是否为流式）
	    this.minColumnWidth = 80; // 最小列宽
	    this.scrollBarHeight = 16; // 滚动条高度
	    this.numWidth = this.options.numWidth || 40; // 数字列宽度
	    this.multiSelectWidth = this.options.multiSelectWidth || 40; // 复选框列宽度
	    this.multiWidth = this.options.multiWidth || 40; // 复选框宽度

	    this.basicGridCompColumnArr = new Array(); // 存储基本的columns对象，用于清除设置
	    this.columnMenuWidth = 160; // column menu的宽度
	    this.columnMenuHeight = 33; // column menu的高度
	    this.gridCompColumnFixedArr = new Array(); // 存储设置默认值之后的固定列columns对象
	    this.gridCompLevelColumn = new Array(); // 存储多级表头时的多级
	    this.headerHeight = 44 * parseInt(this.options.maxHeaderLevel) + 1;
	    this.gridCompHiddenLevelColumnArr = new Array(); // 存储自动隐藏时隐藏优先级排序后的column
	    this.treeLeft = 10; // 树表时每一级之间的差值
	    this.overWidthVisibleColumnArr = new Array(); // 超出定义宽度的column集合
	};
	var getBooleanOptions = function getBooleanOptions() {
	    this.options.cancelFocus = this.getBoolean(this.options.cancelFocus);
	    this.options.showHeader = this.getBoolean(this.options.showHeader);
	    this.options.showNumCol = this.getBoolean(this.options.showNumCol);
	    this.options.multiSelect = this.getBoolean(this.options.multiSelect);
	    this.options.columnMenu = this.getBoolean(this.options.columnMenu);
	    this.options.canDrag = this.getBoolean(this.options.canDrag);
	    this.options.overWidthHiddenColumn = this.getBoolean(this.options.overWidthHiddenColumn);
	    this.options.sortable = this.getBoolean(this.options.sortable);
	    this.options.showSumRow = this.getBoolean(this.options.showSumRow);
	    this.options.canSwap = this.getBoolean(this.options.canSwap);
	    this.options.showTree = this.getBoolean(this.options.showTree);
	    this.options.autoExpand = this.getBoolean(this.options.autoExpand);
	    this.options.needTreeSort = this.getBoolean(this.options.needTreeSort);
	};
	/*
	 * 初始化默认参数
	 */
	var initDefault = function initDefault() {
	    this.defaults = {
	        id: 'grid',
	        editType: 'default',
	        cancelFocus: false, // 第二次点击是否取消focus
	        showHeader: true, // 是否显示表头
	        showNumCol: false, // 是否显示数字列
	        multiSelect: false, // 是否显示复选框
	        columnMenu: true, // 是否存在列头操作按钮
	        canDrag: true, // 是否可以拖动
	        formMaxWidth: 300, // 整体宽度小于某一值之后以form展示
	        // formMaxWidth:0,
	        maxHeaderLevel: 1, // header的最高层级，用于计算header区域的高度
	        overWidthHiddenColumn: false, // 宽度不足时是否自动隐藏column
	        sortable: true, // 是否可以排序
	        showSumRow: false, // 是否显示合计行
	        canSwap: true, // 是否可以交换列位置
	        showTree: false, // 是否显示树表
	        autoExpand: true, // 是否默认展开
	        needTreeSort: false };
	};
	/*
	 * 创建grid
	 */
	var initGrid = function initGrid() {
	    if (!this.options.columns || this.options.columns.length == 0) {
	        return;
	    }
	    var oThis = this;
	    this.initOptions();
	    this.initVariable();
	    this.initWidthVariable();
	    this.initGridCompColumn();
	    this.initDataSource();
	    this.createDivs();
	    // UAP-NC 轻量化项目：切换tab时添加form会消失问题
	    this.inte = setInterval(function () {
	        oThis.setIntervalFun.call(oThis);
	    }, 300);
	};
	/*
	 * 销毁自身
	 */
	var destroySelf = function destroySelf() {
	    clearInterval(this.inte);
	    this.$ele.data('gridComp', null);
	    this.ele.innerHTML = '';
	};
	/*
	 * 对传入参数进行格式化处理
	 * 宽度、高度处理
	 * 左侧区域宽度计算
	 * 除去内容区域的高度
	 */
	var initOptions = function initOptions() {
	    this.options.width = this.formatWidth(this.options.width);
	    this.options.height = this.formatWidth(this.options.height);
	    if (this.options.height == '100%' || !this.options.height) {
	        this.countContentHeight = false;
	    }
	    this.initOptionsTree();
	    this.leftW = 0; // 左侧区域宽度（数字列复选框等）
	    if (this.options.showNumCol) {
	        this.leftW += this.numWidth;
	    }
	    if (this.options.multiSelect) {
	        this.leftW += this.multiWidth;
	    }
	    this.exceptContentHeight = 0; // 内容区域之外的高度
	    if (this.options.showHeader) {
	        this.exceptContentHeight += this.headerHeight;
	    }
	    this.fixedWidth = 0;
	    if (this.options.maxHeaderLevel > 1) {
	        this.options.canSwap = false;
	    }
	    // 获取缓存id
	    var url = window.location.href;
	    var index = url.indexOf('?');
	    if (index > 0) {
	        url = url.substring(0, index);
	    }
	    this.localStorageId = this.options.id + url;
	};
	var initOptionsTree = function initOptionsTree() {};
	/*
	 * 初始化变量
	 */
	var initVariable = function initVariable() {
	    this.initDataSourceVariable();
	    // 鼠标点击移动时位置记录
	    this.mouseUpX = 'mouseUpX';
	    this.mouseUpY = 'mouseUpY';
	    this.mouseDownX = 'mouseDownX';
	    this.mouseDownY = 'mouseDownY';
	    this.mouseMoveX = 'mouseMoveX';
	    this.mouseMoveY = 'mouseMoveY';
	    this.scrollLeft = 0; // 记录横向滚动条
	    this.scrollTop = 0; // 记录纵向滚动条
	    this.showType = ''; // 记录grid显示方式，form和grid
	    this.createGridFlag = false; // 是否已经创建grid展示
	    this.columnClickX = 0; // 点击处的X坐标
	    this.columnClickY = 0; // 点击处的Y坐标
	    this.columnMenuMove = false; // 是否在column menu区域移动
	    this.firstColumn = true; // 用于记录是否已经存在第一列，true表示还没有，false表示已经存在
	    this.lastVisibleColumn = null;
	    this.lastVisibleColumnWidth = 0;
	    this.columnMenuMove = false; // 是否在column menu区域移动
	    this.createColumnMenuFlag = false; // 是否已经创建column menu 区域
	    this.menuColumnsHeight = 0;
	    this.createFormFlag = false; // 是否已经创建form展示
	    this.$sd_storageData = null; // 本地缓存内容为object
	};
	/*
	 * 初始化datasource相关变量
	 */
	var initDataSourceVariable = function initDataSourceVariable() {
	    this.selectRows = new Array();
	    this.selectRowsObj = new Array();
	    this.selectRowsIndex = new Array();
	    this.allRows = new Array();
	    this.eidtRowIndex = -1; // 当前修改行
	};

	// 初始化宽度相关变量
	var initWidthVariable = function initWidthVariable() {
	    // 计算用变量
	    this.wholeWidth = 0; // 整体宽度
	    this.wholeHeight = 0; // 整体高度
	    this.rowHeight = 0; // 数据行高度
	    this.contentRealWidth = 0; // 内容区真实宽度,严格按照设置的width计算的宽度
	    this.contentWidth = 0; // 内容区宽度，自动扩展之后的宽度
	    this.contentMinWidth = 0; // 内容区最小宽度,即可视宽度
	    this.contentHeight = 0; //内容区高度
	    this.fixedRealWidth = 0; // 固定区域真实宽度
	    this.fixedWidth = 0; // 固定区域宽度
	};
	/*
	 * 创建gridCompColumn对象方便后续处理
	 */
	var initGridCompColumn = function initGridCompColumn() {
	    var oThis = this;
	    this.initGridCompColumnVar();
	    if (this.options.columns) {
	        $.each(this.options.columns, function (i) {
	            oThis.initGridCompColumnFun(this);
	        });
	    }
	    this.initGridCompColumnLoacl();
	    this.initGridHiddenLevelColumn();
	    this.initGridCompFixedColumn();
	    this.columnsVisibleFun();
	};
	var initGridCompColumnVar = function initGridCompColumnVar() {
	    this.gridCompColumnArr = new Array();
	    this.basicGridCompColumnArr = new Array();
	    this.gridCompColumnFixedArr = new Array();
	    this.gridCompLevelColumn = new Array();
	    this.gridCompHiddenLevelColumnArr = new Array();
	};
	var initGridCompColumnFun = function initGridCompColumnFun(columnOptions) {
	    var column = new _column.column(columnOptions, this);
	    column.options.optionsWidth = column.options.width;
	    column.options.realWidth = column.options.width;
	    this.gridCompColumnArr.push(column);
	    this.initGridCompColumnColumnMenuFun(columnOptions);
	    this.initGridCompColumnHeaderLevelFun(columnOptions);
	};
	var initGridCompColumnColumnMenuFun = function initGridCompColumnColumnMenuFun(columnOptions) {};
	var initGridCompColumnHeaderLevelFun = function initGridCompColumnHeaderLevelFun(columnOptions) {};
	var initGridCompColumnLoacl = function initGridCompColumnLoacl(columnOptions) {};
	var initGridHiddenLevelColumn = function initGridHiddenLevelColumn() {};
	var initGridCompFixedColumn = function initGridCompFixedColumn() {};
	/*
	 * 设置某列是否必输
	 */
	var setRequired = function setRequired(field, value) {};
	/*
	 * 创建dataSource对象方便后续处理
	 */
	var initDataSource = function initDataSource() {
	    var oThis = this;
	    this.dataSourceObj = new _dataSource.dataSource(this.options.dataSource, this);
	};
	exports.init = init;
	exports.getBooleanOptions = getBooleanOptions;
	exports.initDefault = initDefault;
	exports.initGrid = initGrid;
	exports.destroySelf = destroySelf;
	exports.initOptions = initOptions;
	exports.initOptionsTree = initOptionsTree;
	exports.initVariable = initVariable;
	exports.initDataSourceVariable = initDataSourceVariable;
	exports.initWidthVariable = initWidthVariable;
	exports.initGridCompColumn = initGridCompColumn;
	exports.initGridCompColumnVar = initGridCompColumnVar;
	exports.initGridCompColumnFun = initGridCompColumnFun;
	exports.initGridCompColumnColumnMenuFun = initGridCompColumnColumnMenuFun;
	exports.initGridCompColumnHeaderLevelFun = initGridCompColumnHeaderLevelFun;
	exports.initGridCompColumnLoacl = initGridCompColumnLoacl;
	exports.initGridHiddenLevelColumn = initGridHiddenLevelColumn;
	exports.initGridCompFixedColumn = initGridCompFixedColumn;
	exports.setRequired = setRequired;
	exports.initDataSource = initDataSource;

/***/ },
/* 14 */
/***/ function(module, exports) {

	'use strict';

	exports.__esModule = true;

	/*
	 * 添加一行
	 */
	var addOneRow = function addOneRow(row, index) {
	    var oThis = this,
	        displayFlag = 'none',
	        rowObj = {},
	        parentIndex,
	        parentChildLength = 0,
	        l = this.dataSourceObj.rows.length,
	        endFlag = false;
	    rowObj.value = row, displayFlag;

	    var treeObj = this.addOneRowTree(row, index, rowObj);
	    index = treeObj.index;
	    displayFlag = treeObj.displayFlag;
	    if (index != 0) {
	        if (index && index > 0) {
	            if (l < index) index = l;
	        } else {
	            index = 0;
	        }
	    }
	    if (l == index) {
	        endFlag = true;
	    }
	    rowObj.valueIndex = index;
	    rowObj.value = row;
	    this.dataSourceObj.rows.splice(index, 0, rowObj);
	    // 如果是在中间插入需要将后续的valueIndex + 1；
	    if (this.dataSourceObj.rows.length > index + 1) {
	        $.each(this.dataSourceObj.rows, function (i) {
	            if (i > index) {
	                this.valueIndex = this.valueIndex + 1;
	            }
	        });
	    }

	    if (this.showType == 'grid') {
	        //只有grid展示的时候才处理div，针对隐藏情况下还要添加数据
	        this.editClose();

	        this.updateEditRowIndex('+', index);
	        try {
	            var htmlStr = this.createContentOneRow(rowObj, 'normal', displayFlag);
	            if (endFlag) {
	                $('#' + this.options.id + '_content_tbody')[0].insertAdjacentHTML('beforeEnd', htmlStr);
	            } else {
	                var $$tr = $('#' + this.options.id + '_content_tbody').find('tr[role="row"]')[index];
	                var $$tbody = $('#' + this.options.id + '_content_tbody')[0];
	                if ($$tr) $$tr.insertAdjacentHTML('beforeBegin', htmlStr);else if ($$tbody) $$tbody.insertAdjacentHTML('afterBegin', htmlStr);
	            }
	            if ($('#' + this.options.id + '_content_fixed_div').length > 0) {
	                var htmlStr = this.createContentOneRow(rowObj, 'fixed', displayFlag);
	                if (endFlag) {
	                    $('#' + this.options.id + '_content_fixed_tbody')[0].insertAdjacentHTML('beforeEnd', htmlStr);
	                } else {
	                    var $$tr = $('#' + this.options.id + '_content_fixed_tbody').find('tr[role="row"]')[index];
	                    if ($$tr) $$tr.insertAdjacentHTML('beforeBegin', htmlStr);else if ($('#' + this.options.id + '_content_fixed_tbody')[0]) $('#' + this.options.id + '_content_fixed_tbody')[0].insertAdjacentHTML('afterBegin', htmlStr);
	                }
	            }
	        } catch (e) {
	            //IE情况下
	            var table = $('#' + this.options.id + '_content_div table')[0];
	            if (table) this.createContentOneRowForIE(table, index, rowObj, 'normal', displayFlag);
	            var fixedTable = $('#' + this.options.id + '_content_fixed_div table')[0];
	            if (fixedTable) this.createContentOneRowForIE(fixedTable, index, rowObj, 'fixed', displayFlag);
	        }
	        if (this.options.multiSelect) {
	            var htmlStr = this.createContentLeftMultiSelectRow(rowObj, displayFlag);
	            if (endFlag) {
	                $('#' + this.options.id + '_content_multiSelect')[0].insertAdjacentHTML('beforeEnd', htmlStr);
	            } else {
	                var $$div = $('#' + this.options.id + '_content_multiSelect').find('div')[index];
	                if ($$div) $$div.insertAdjacentHTML('beforeBegin', htmlStr);else $('#' + this.options.id + '_content_multiSelect')[0].insertAdjacentHTML('afterBegin', htmlStr);
	            }
	        }
	        if (this.options.showNumCol) {
	            var htmlStr = this.createContentLeftNumColRow(l, row);
	            if (endFlag) {
	                $('#' + this.options.id + '_content_numCol')[0].insertAdjacentHTML('beforeEnd', htmlStr);
	            } else {
	                var $$div = $('#' + this.options.id + '_content_numCol').find('div')[index];
	                if ($$div) $$div.insertAdjacentHTML('beforeBegin', htmlStr);else $('#' + this.options.id + '_content_numCol')[0].insertAdjacentHTML('afterBegin', htmlStr);
	            }
	            this.resetNumCol();
	            this.updateNumColLastRowFlag();
	        }
	        this.repairSumRow();
	        this.noRowsShowFun();
	        this.updateLastRowFlag();
	        var obj = {};
	        obj.begin = index;
	        obj.length = 1;
	        this.renderTypeFun(obj);
	    }
	    // 需要重新排序重置变量
	    var l = 0;
	    if (this.options.showTree) {
	        if (this.dataSourceObj.options.values) {
	            l = this.dataSourceObj.options.values.length;
	        } else {
	            this.dataSourceObj.options.values = new Array();
	        }
	        this.dataSourceObj.options.values.splice(index, 0, row);
	        this.addOneRowTreeHasChildF(rowObj);
	    } else {
	        if (this.dataSourceObj.options.values) {} else {
	            this.dataSourceObj.options.values = new Array();
	        }
	        this.dataSourceObj.options.values.splice(index, 0, row);
	    }
	};
	var addOneRowTree = function addOneRowTree(row, index) {
	    return index;
	};
	var addOneRowTreeHasChildF = function addOneRowTreeHasChildF() {};
	var editClose = function editClose() {};
	/*
	 * 添加多行
	 */
	var addRows = function addRows(rows, index) {
	    if (this.options.showTree) {
	        // 树表待优化
	        var l = rows.length;
	        for (var i = 0; i < l; i++) {
	            this.addOneRow(rows[i], l);
	        }
	        return;
	    }
	    this.editClose();
	    var htmlStr = '',
	        htmlStrmultiSelect = '',
	        htmlStrNumCol = '',
	        htmlStrFixed = '',
	        oThis = this,
	        l = this.dataSourceObj.rows.length,
	        endFlag = false;
	    if (index != 0) {
	        if (index && index > 0) {
	            if (l < index) index = l;
	        } else {
	            index = 0;
	        }
	    }
	    if (l == index) {
	        endFlag = true;
	    }
	    var rowObjArr = new Array();
	    $.each(rows, function (i) {
	        var rowObj = {};
	        rowObj.value = this;
	        rowObj.valueIndex = index + i;
	        rowObjArr.push(rowObj);
	        oThis.dataSourceObj.rows.splice(index + i, 0, rowObj);
	        oThis.updateEditRowIndex('+', index + i);
	    });
	    // 如果是在中间插入需要将后续的valueIndex + 1；
	    if (this.dataSourceObj.rows.length > index + rows.length) {
	        $.each(this.dataSourceObj.rows, function (i) {
	            if (i > index + rows.length - 1) {
	                this.valueIndex = this.valueIndex + rows.length;
	            }
	        });
	    }
	    if (this.showType == 'grid' && $('#' + this.options.id + '_content_div tbody')[0]) {
	        //只有grid展示的时候才处理div，针对隐藏情况下还要添加数据 //lyk--需要完善隐藏之后再显示同事添加数据操作
	        $.each(rowObjArr, function (i, row) {
	            htmlStr += oThis.createContentOneRow(this);
	            htmlStrFixed += oThis.createContentOneRowFixed(this);
	            if (oThis.options.multiSelect) {
	                htmlStrmultiSelect += oThis.createContentLeftMultiSelectRow(this);
	            }
	            if (oThis.options.showNumCol) {
	                htmlStrNumCol += oThis.createContentLeftNumColRow(l + i, row.value);
	            }
	        });
	        try {
	            if (endFlag) {
	                $('#' + this.options.id + '_content_div tbody')[0].insertAdjacentHTML('beforeEnd', htmlStr);
	            } else {
	                if ($('#' + this.options.id + '_content_div').find('tbody').find('tr[role="row"]')[index]) $('#' + this.options.id + '_content_div').find('tbody').find('tr[role="row"]')[index].insertAdjacentHTML('beforeBegin', htmlStr);else if ($('#' + this.options.id + '_content_div tbody')[0]) $('#' + this.options.id + '_content_div tbody')[0].insertAdjacentHTML('afterBegin', htmlStr);
	            }
	            if (endFlag) {
	                $('#' + this.options.id + '_content_fixed_div tbody')[0].insertAdjacentHTML('beforeEnd', htmlStrFixed);
	            } else {
	                if ($('#' + this.options.id + '_content_fixed_div').find('tbody').find('tr[role="row"]')[index]) $('#' + this.options.id + '_content_fixed_div').find('tbody').find('tr[role="row"]')[index].insertAdjacentHTML('beforeBegin', htmlStrFixed);else if ($('#' + this.options.id + '_content_fixed_div tbody')[0]) $('#' + this.options.id + '_content_fixed_div tbody')[0].insertAdjacentHTML('afterBegin', htmlStrFixed);
	            }
	        } catch (e) {
	            //IE情况下
	            var table = $('#' + this.options.id + '_content_div table')[0];
	            var fixedTable = $('#' + this.options.id + '_content_fixed_div table')[0];
	            if (table && fixedTable) {
	                $.each(rowObjArr, function (i) {
	                    oThis.createContentOneRowForIE(table, index + i, this);
	                    oThis.createContentOneRowForIE(fixedTable, index + i, this, 'fixed');
	                });
	            }
	        }
	        if (this.options.multiSelect) {
	            if (endFlag) {
	                $('#' + this.options.id + '_content_multiSelect')[0].insertAdjacentHTML('beforeEnd', htmlStrmultiSelect);
	            } else {
	                var _content_multiSelect = $('#' + this.options.id + '_content_multiSelect').find('div')[index];
	                if (_content_multiSelect) _content_multiSelect.insertAdjacentHTML('beforeBegin', htmlStrmultiSelect);else $('#' + this.options.id + '_content_multiSelect')[0].insertAdjacentHTML('afterBegin', htmlStrmultiSelect);
	            }
	        }
	        if (this.options.showNumCol) {
	            if (endFlag) {
	                $('#' + this.options.id + '_content_numCol')[0].insertAdjacentHTML('beforeEnd', htmlStrNumCol);
	            } else {
	                var _content_multiSelect = $('#' + this.options.id + '_content_numCol').find('div')[index];
	                if (_content_multiSelect) _content_multiSelect.insertAdjacentHTML('beforeBegin', htmlStrNumCol);else $('#' + this.options.id + '_content_numCol')[0].insertAdjacentHTML('afterBegin', htmlStrNumCol);
	            }
	            this.resetNumCol();
	            this.updateNumColLastRowFlag();
	        }
	        this.repairSumRow();
	        this.noRowsShowFun();
	        var obj = {};
	        obj.begin = index;
	        obj.length = rows.length;
	        this.renderTypeFun(obj);
	    }
	    if (this.dataSourceObj.options.values) {} else {
	        this.dataSourceObj.options.values = new Array();
	    }
	    $.each(rows, function (i) {
	        oThis.dataSourceObj.options.values.splice(index + i, 0, this);
	    });
	    this.updateLastRowFlag();
	};
	var createContentOneRowFixed = function createContentOneRowFixed(rowObj) {
	    return '';
	};
	var updateEditRowIndex = function updateEditRowIndex(opType, opIndex, num) {};
	/*
	 * 删除一行
	 */
	var deleteOneRow = function deleteOneRow(index) {
	    var oThis = this;
	    index = parseInt(index);
	    var row = this.dataSourceObj.rows[index];
	    if (!row) return;
	    var rowValue = row.value;
	    if (this.showType == 'grid') {
	        //只有grid展示的时候才处理div，针对隐藏情况下还要添加数据
	        this.editClose();
	    }
	    this.dataSourceObj.rows.splice(index, 1);
	    this.updateEditRowIndex('-', index);
	    if (this.selectRows) {
	        $.each(this.selectRows, function (i) {
	            if (this == rowValue) {
	                oThis.selectRows.splice(i, 1);
	                oThis.selectRowsObj.splice(i, 1);
	                oThis.selectRowsIndex.splice(i, 1);
	            } else if (oThis.selectRowsIndex[i] > index) {
	                oThis.selectRowsIndex[i] = oThis.selectRowsIndex[i] - 1;
	            }
	        });
	    }
	    if (this.focusRow) {
	        if (this.focusRow == rowValue) {
	            this.focusRow = null;
	            this.focusRowObj = null;
	            this.focusRowIndex = null;
	        } else if (this.focusRowIndex > index) {
	            this.focusRowIndex = this.focusRowIndex - 1;
	        }
	    }
	    if (this.showType == 'grid') {
	        //只有grid展示的时候才处理div，针对隐藏情况下还要添加数据
	        $('#' + this.options.id + '_content_div tbody tr:eq(' + index + ')').remove();
	        $('#' + this.options.id + '_content_fixed_div tbody tr:eq(' + index + ')').remove();
	        $('#' + this.options.id + '_content_multiSelect >div:eq(' + index + ')').remove();
	        $('#' + this.options.id + '_content_numCol >.u-grid-content-num:eq(' + index + ')').remove();
	        this.resetNumCol();
	        this.repairSumRow();
	        this.noRowsShowFun();
	        this.updateNumColLastRowFlag();
	    }
	    if (this.dataSourceObj.options.values) {
	        var i = this.dataSourceObj.options.values.indexOf(rowValue);
	        this.dataSourceObj.options.values.splice(i, 1);
	    }
	    this.deleteOneRowTree();
	    if (typeof this.options.onRowDelete == 'function') {
	        var obj = {};
	        obj.gridObj = this;
	        obj.index = index;
	        if (!this.options.onRowDelete(index)) {
	            return;
	        }
	    }
	};
	var repairSumRow = function repairSumRow() {};
	var deleteOneRowTree = function deleteOneRowTree() {};
	/*
	 * 删除多行
	 */
	var deleteRows = function deleteRows(indexs) {
	    var oThis = this,
	        indexss = new Array();
	    $.each(indexs, function (i) {
	        indexss.push(indexs[i]);
	    });
	    indexss.sort(function (a, b) {
	        return b - a;
	    });

	    $.each(indexss, function (i) {
	        oThis.deleteOneRow(this);
	    });
	};
	/*
	 * 修改某一行
	 */
	var updateRow = function updateRow(index, row) {
	    if (index > -1 && index < this.dataSourceObj.rows.length) {
	        this.dataSourceObj.rows[index].value = row;
	        this.dataSourceObj.options.values[this.dataSourceObj.rows[index].valueIndex] = row;
	        if (this.showType == 'grid') {
	            var obj = {};
	            obj.begin = index;
	            obj.length = 1;
	            this.renderTypeFun(obj);
	            this.repairSumRow();
	        }
	    }
	};
	/*
	 * 修改某个cell的值
	 */
	var updateValueAt = function updateValueAt(rowIndex, field, value, force) {
	    if (rowIndex > -1 && rowIndex < this.dataSourceObj.rows.length) {
	        var oThis = this,
	            oldValue = $(this.dataSourceObj.rows[rowIndex].value).attr(field),
	            treeRowIndex = rowIndex;
	        if (oldValue != value || force) {
	            $(this.dataSourceObj.rows[rowIndex].value).attr(field, value);
	            $(this.dataSourceObj.options.values[this.dataSourceObj.rows[rowIndex].valueIndex]).attr(field, value);
	            if (this.showType == 'grid') {
	                var obj = {};
	                obj.field = field;
	                obj.begin = rowIndex;
	                obj.length = 1;
	                this.renderTypeFun(obj);
	                // this.editColIndex = undefined;
	                // 如果编辑行为修改行则同时需要修改编辑行的显示
	                treeRowIndex = this.updateValueAtTree(rowIndex, field, value, force);
	                this.updateValueAtEdit(rowIndex, field, value, force);
	                this.repairSumRow();
	            }
	            if (typeof this.options.onValueChange == 'function') {
	                var obj = {};
	                obj.gridObj = this;
	                //因为树表更新时候可能改变rowIndex的顺序
	                obj.rowIndex = treeRowIndex;
	                obj.field = field;
	                obj.oldValue = oldValue;
	                obj.newValue = value;
	                this.options.onValueChange(obj);
	            }
	        }
	    }
	};
	var updateValueAtTree = function updateValueAtTree(rowIndex, field, value, force) {
	    return rowIndex;
	};
	var updateValueAtEdit = function updateValueAtEdit(rowIndex, field, value, force) {};
	/*
	 * 选中一行
	 * slice 设置全选时，slice为true，不做渲染，在setAllRowSelect中统一渲染
	 */
	var setRowSelect = function setRowSelect(rowIndex, doms) {
	    var selectDiv, rowTr, fixedRowTr, numColDiv;
	    if (!this.dataSourceObj.rows[rowIndex]) return true;
	    //已经选中退出
	    if (this.showType == 'grid') {
	        if (doms && doms['contentTrs']) rowTr = doms['contentTrs'][rowIndex];else rowTr = this.$ele.find('#' + this.options.id + '_content_tbody tr[role="row"]')[rowIndex];
	    }
	    if (this.dataSourceObj.rows[rowIndex].checked && u.hasClass(rowTr, "u-grid-content-sel-row")) return true;
	    if (doms && doms['multiSelectDivs']) selectDiv = doms['multiSelectDivs'][rowIndex];else selectDiv = this.$ele.find('#' + this.options.id + '_content_multiSelect').children()[rowIndex];
	    if (typeof this.options.onBeforeRowSelected == 'function') {
	        var obj = {};
	        obj.gridObj = this;
	        obj.rowObj = this.dataSourceObj.rows[rowIndex];
	        obj.rowIndex = rowIndex;
	        if (!this.options.onBeforeRowSelected(obj)) {
	            if (this.options.multiSelect) {
	                var _input = selectDiv.children[0];
	                _input.checked = false;
	            }
	            return false;
	        }
	    }
	    if (!this.options.multiSelect) {
	        if (this.selectRowsObj && this.selectRowsObj.length > 0) {
	            $.each(this.selectRowsObj, function () {
	                this.checked = false;
	            });
	        }
	        this.selectRows = new Array();
	        this.selectRowsObj = new Array();
	        this.selectRowsIndex = new Array();
	        if (this.showType == 'grid') {
	            $('#' + this.options.id + '_content_tbody tr').removeClass("u-grid-content-sel-row");
	            $('#' + this.options.id + '_content_tbody tr a').removeClass("u-grid-content-sel-row");
	            $('#' + this.options.id + '_content_fixed_tbody tr').removeClass("u-grid-content-sel-row");
	            $('#' + this.options.id + '_content_fixed_tbody tr a').removeClass("u-grid-content-sel-row");
	            if (this.options.multiSelect) {
	                $('#' + this.options.id + '_content_multiSelect div').removeClass("u-grid-content-sel-row");
	            }
	            if (this.options.showNumCol) {
	                $('#' + this.options.id + '_content_numCol div').removeClass("u-grid-content-sel-row");
	            }
	        }
	    } else {
	        if (this.showType == 'grid') {
	            var _input = selectDiv.children[0];
	            // _input.checked = true;
	            $(_input).addClass('is-checked');
	        }
	    }
	    if (this.showType == 'grid') {
	        $(rowTr).addClass("u-grid-content-sel-row");

	        if (doms && doms['fixContentTrs']) fixedRowTr = doms['fixContentTrs'][rowIndex];else fixedRowTr = this.$ele.find('#' + this.options.id + '_content_fixed_tbody tr[role="row"]')[rowIndex];
	        $(fixedRowTr).addClass("u-grid-content-sel-row");
	        var ini = rowIndex;
	        if (this.eidtRowIndex > -1 && this.eidtRowIndex < rowIndex && this.options.editType == 'form') {
	            ini++;
	        }
	        if (this.options.multiSelect) {
	            if (ini != rowIndex) selectDiv = this.$ele.find('#' + this.options.id + '_content_multiSelect').children()[ini];
	            $(selectDiv).addClass('u-grid-content-sel-row');
	        }
	        if (this.options.showNumCol) {
	            if (doms && doms['numColDivs']) numColDiv = doms['numColDivs'][ini];else numColDiv = this.$ele.find('#' + this.options.id + '_content_numCol').children()[ini];
	            $(numColDiv).addClass('u-grid-content-sel-row');
	        }
	    }
	    this.selectRows.push(this.dataSourceObj.rows[rowIndex].value);
	    this.selectRowsObj.push(this.dataSourceObj.rows[rowIndex]);
	    this.selectRowsIndex.push(rowIndex);
	    this.dataSourceObj.rows[rowIndex].checked = true;
	    if (typeof this.options.onRowSelected == 'function') {
	        var obj = {};
	        obj.gridObj = this;
	        obj.rowObj = this.dataSourceObj.rows[rowIndex];
	        obj.rowIndex = rowIndex;
	        this.options.onRowSelected(obj);
	    }
	    return true;
	};
	/*
	 * 反选一行
	 */
	var setRowUnselect = function setRowUnselect(rowIndex) {
	    var oThis = this;
	    if (!this.dataSourceObj.rows[rowIndex]) return true;
	    //已经选中退出
	    if (!this.dataSourceObj.rows[rowIndex].checked) return true;
	    if (typeof this.options.onBeforeRowUnSelected == 'function') {
	        var obj = {};
	        obj.gridObj = this;
	        obj.rowObj = this.dataSourceObj.rows[rowIndex];
	        obj.rowIndex = rowIndex;
	        if (!this.options.onBeforeRowUnSelected(obj)) {
	            if (this.options.multiSelect) {
	                $('#' + this.options.id + '_content_multiSelect input:eq(' + rowIndex + ')')[0].checked = true;
	            }
	            return false;
	        }
	    }
	    if (this.options.multiSelect) {
	        // $('#' + this.options.id + '_content_multiSelect input:eq(' + rowIndex+ ')')[0].checked = false;
	        $('#' + this.options.id + '_content_multiSelect .u-grid-checkbox-outline:eq(' + rowIndex + ')').removeClass('is-checked');
	    }
	    var ini = rowIndex;
	    if (this.eidtRowIndex > -1 && this.eidtRowIndex < rowIndex && this.options.editType == 'form') {
	        ini++;
	    }
	    $('#' + this.options.id + '_content_tbody tr:eq(' + ini + ')').removeClass("u-grid-content-sel-row");
	    $('#' + this.options.id + '_content_tbody tr:eq(' + ini + ') a').removeClass("u-grid-content-sel-row");
	    $('#' + this.options.id + '_content_fixed_tbody tr:eq(' + ini + ')').removeClass("u-grid-content-sel-row");
	    $('#' + this.options.id + '_content_fixed_tbody tr:eq(' + ini + ') a').removeClass("u-grid-content-sel-row");
	    if (this.options.multiSelect) {
	        $('#' + this.options.id + '_content_multiSelect >div:eq(' + ini + ')').removeClass("u-grid-content-sel-row");
	    }
	    if (this.options.showNumCol) {
	        $('#' + this.options.id + '_content_numCol >div:eq(' + ini + ')').removeClass("u-grid-content-sel-row");
	    }
	    $.each(this.selectRows, function (i) {
	        if (this == oThis.dataSourceObj.rows[rowIndex].value) {
	            oThis.selectRows.splice(i, 1);
	            oThis.selectRowsObj.splice(i, 1);
	            oThis.selectRowsIndex.splice(i, 1);
	        }
	    });
	    this.dataSourceObj.rows[rowIndex].checked = false;
	    if (typeof this.options.onRowUnSelected == 'function') {
	        var obj = {};
	        obj.gridObj = this;
	        obj.rowObj = this.dataSourceObj.rows[rowIndex];
	        obj.rowIndex = rowIndex;
	        this.options.onRowUnSelected(obj);
	    }
	    return true;
	};
	/*
	 * 选中所有行
	 */
	var setAllRowSelect = function setAllRowSelect() {
	    // $('#' + this.options.id + '_header_multi_input').prop('checked', true)
	    $('#' + this.options.id + '_header_multi_input').addClass('is-checked');
	    if (typeof this.options.onBeforeAllRowSelected == 'function') {
	        var obj = {};
	        obj.gridObj = this;
	        obj.rowObjs = this.dataSourceObj.rows;
	        if (!this.options.onBeforeAllRowSelected(obj)) {
	            return;
	        }
	    }
	    // 把需要的dom在循环外获取出来
	    var multiSelectDivs = this.$ele.find('#' + this.options.id + '_content_multiSelect').children(),
	        numColDivs = this.$ele.find('#' + this.options.id + '_content_numCol').children(),
	        contentTrs = this.$ele.find('#' + this.options.id + '_content_tbody tr[role="row"]'),
	        fixContentTrs = this.$ele.find('#' + this.options.id + '_content_fixed_tbody tr[role="row"]');
	    this.$ele.find('#' + this.options.id + '_content_tbody tr[role="row"]');
	    for (var i = 0; i < this.dataSourceObj.rows.length; i++) {
	        this.setRowSelect(i, { multiSelectDivs: multiSelectDivs, numColDivs: numColDivs, contentTrs: contentTrs, fixContentTrs: fixContentTrs });
	    }
	    if (typeof this.options.onAllRowSelected == 'function') {
	        var obj = {};
	        obj.gridObj = this;
	        obj.rowObjs = this.dataSourceObj.rows;
	        this.options.onAllRowSelected(obj);
	    }
	};
	/*
	 * 反选所有行
	 */
	var setAllRowUnSelect = function setAllRowUnSelect() {
	    // $('#' + this.options.id + '_header_multi_input').attr('checked', false)
	    $('#' + this.options.id + '_header_multi_input').removeClass('is-checked');
	    if (typeof this.options.onBeforeAllRowUnSelected == 'function') {
	        var obj = {};
	        obj.gridObj = this;
	        obj.rowObjs = this.dataSourceObj.rows;
	        if (!this.options.onBeforeAllRowUnSelected(obj)) {
	            return;
	        }
	    }
	    for (var i = 0; i < this.dataSourceObj.rows.length; i++) {
	        this.setRowUnselect(i);
	    }
	    if (typeof this.options.onAllRowUnSelected == 'function') {
	        var obj = {};
	        obj.gridObj = this;
	        obj.rowObjs = this.dataSourceObj.rows;
	        this.options.onAllRowUnSelected(obj);
	    }
	};

	/*
	 * focus一行
	 */
	var setRowFocus = function setRowFocus(rowIndex) {
	    //已经选中退出
	    if (this.dataSourceObj.rows[rowIndex].focus) return true;
	    if (!this.dataSourceObj.rows[rowIndex]) return true;
	    if (typeof this.options.onBeforeRowFocus == 'function') {
	        var obj = {};
	        obj.gridObj = this;
	        obj.rowObj = this.dataSourceObj.rows[rowIndex];
	        obj.rowIndex = rowIndex;
	        if (!this.options.onBeforeRowFocus(obj)) {
	            return false;
	        }
	    }
	    $('#' + this.options.id + '_content_tbody tr').removeClass("u-grid-content-focus-row");
	    $('#' + this.options.id + '_content_tbody tr a').removeClass("u-grid-content-focus-row");
	    $('#' + this.options.id + '_content_fixed_tbody tr').removeClass("u-grid-content-focus-row");
	    $('#' + this.options.id + '_content_fixed_tbody tr a').removeClass("u-grid-content-focus-row");
	    if (this.options.multiSelect) {
	        $('#' + this.options.id + '_content_multiSelect').find('div').removeClass("u-grid-content-focus-row");
	    }
	    if (this.options.showNumCol) {
	        $('#' + this.options.id + '_content_numCol').find('div').removeClass("u-grid-content-focus-row");
	    }
	    if (this.focusRowObj) {
	        this.focusRowObj.focus = false;
	    }
	    $('#' + this.options.id + '_content_tbody tr[role="row"]:eq(' + rowIndex + ')').addClass("u-grid-content-focus-row");
	    $('#' + this.options.id + '_content_tbody tr[role="row"]:eq(' + rowIndex + ') a').addClass("u-grid-content-focus-row");
	    $('#' + this.options.id + '_content_fixed_tbody tr[role="row"]:eq(' + rowIndex + ')').addClass("u-grid-content-focus-row");
	    $('#' + this.options.id + '_content_fixed_tbody tr[role="row"]:eq(' + rowIndex + ') a').addClass("u-grid-content-focus-row");
	    var ini = rowIndex;
	    if (this.eidtRowIndex > -1 && this.eidtRowIndex < rowIndex && this.options.editType == 'form') {
	        ini++;
	    }
	    if (this.options.multiSelect) {
	        $('#' + this.options.id + '_content_multiSelect >div:eq(' + ini + ')').addClass("u-grid-content-focus-row");
	    }
	    if (this.options.showNumCol) {
	        $('#' + this.options.id + '_content_numCol >div:eq(' + ini + ')').addClass("u-grid-content-focus-row");
	    }
	    this.focusRow = this.dataSourceObj.rows[rowIndex].value;
	    this.focusRowObj = this.dataSourceObj.rows[rowIndex];
	    this.focusRowIndex = rowIndex;
	    this.dataSourceObj.rows[rowIndex].focus = true;
	    if (typeof this.options.onRowFocus == 'function') {
	        var obj = {};
	        obj.gridObj = this;
	        obj.rowObj = this.dataSourceObj.rows[rowIndex];
	        obj.rowIndex = rowIndex;
	        this.options.onRowFocus(obj);
	    }
	    if (!this.options.multiSelect) {
	        this.setRowSelect(rowIndex);
	    }
	    return true;
	};
	/*
	 * 反focus一行
	 */
	var setRowUnFocus = function setRowUnFocus(rowIndex) {
	    var oThis = this;
	    if (!this.dataSourceObj.rows[rowIndex]) return true;
	    if (typeof this.options.onBeforeRowUnFocus == 'function') {
	        var obj = {};
	        obj.gridObj = this;
	        obj.rowObj = this.dataSourceObj.rows[rowIndex];
	        obj.rowIndex = rowIndex;
	        if (!this.options.onBeforeRowUnFocus(obj)) {
	            return false;
	        }
	    }
	    //已经选中退出
	    if (!this.dataSourceObj.rows[rowIndex].focus) return true;
	    var ini = rowIndex;
	    if (this.eidtRowIndex > -1 && this.eidtRowIndex < rowIndex && this.options.editType == 'form') {
	        ini++;
	    }
	    $('#' + this.options.id + '_content_tbody tr:eq(' + ini + ')').removeClass("u-grid-content-focus-row");
	    $('#' + this.options.id + '_content_tbody tr:eq(' + ini + ') a').removeClass("u-grid-content-focus-row");
	    $('#' + this.options.id + '_content_fixed_tbody tr:eq(' + ini + ')').removeClass("u-grid-content-focus-row");
	    $('#' + this.options.id + '_content_fixed_tbody tr:eq(' + ini + ') a').removeClass("u-grid-content-focus-row");
	    if (this.options.multiSelect) {
	        $('#' + this.options.id + '_content_multiSelect >div:eq(' + ini + ')').removeClass("u-grid-content-focus-row");
	    }
	    if (this.options.showNumCol) {
	        $('#' + this.options.id + '_content_numCol >div:eq(' + ini + ')').removeClass("u-grid-content-focus-row");
	    }
	    this.dataSourceObj.rows[rowIndex].focus = false;
	    this.focusRow = null;
	    this.focusRowObj = null;
	    this.focusRowIndex = null;
	    if (typeof this.options.onRowUnFocus == 'function') {
	        var obj = {};
	        obj.gridObj = this;
	        obj.rowObj = this.dataSourceObj.rows[rowIndex];
	        obj.rowIndex = rowIndex;
	        this.options.onRowUnFocus(obj);
	    }
	    if (!this.options.multiSelect) {
	        this.setRowUnselect(rowIndex);
	    }
	    return true;
	};
	/*
	 * 增加删除时重置数字列
	 */
	var resetNumCol = function resetNumCol() {
	    var numCols = $('#' + this.options.id + '_content_numCol >.u-grid-content-num');
	    $.each(numCols, function (i) {
	        this.innerHTML = i + 1 + "";
	    });
	};
	exports.addOneRow = addOneRow;
	exports.addOneRowTree = addOneRowTree;
	exports.addOneRowTreeHasChildF = addOneRowTreeHasChildF;
	exports.editClose = editClose;
	exports.addRows = addRows;
	exports.createContentOneRowFixed = createContentOneRowFixed;
	exports.updateEditRowIndex = updateEditRowIndex;
	exports.deleteOneRow = deleteOneRow;
	exports.repairSumRow = repairSumRow;
	exports.deleteOneRowTree = deleteOneRowTree;
	exports.deleteRows = deleteRows;
	exports.updateRow = updateRow;
	exports.updateValueAt = updateValueAt;
	exports.updateValueAtTree = updateValueAtTree;
	exports.updateValueAtEdit = updateValueAtEdit;
	exports.setRowSelect = setRowSelect;
	exports.setRowUnselect = setRowUnselect;
	exports.setAllRowSelect = setAllRowSelect;
	exports.setAllRowUnSelect = setAllRowUnSelect;
	exports.setRowFocus = setRowFocus;
	exports.setRowUnFocus = setRowUnFocus;
	exports.resetNumCol = resetNumCol;

/***/ },
/* 15 */
/***/ function(module, exports) {

	'use strict';

	exports.__esModule = true;
	/*
	 * 处理renderType
	 * begin为起始行，length为行数（增加行数时使用）
	 */
	var renderTypeFun = function renderTypeFun(obj) {
	    if (!this.isGridShow()) return;
	    if (typeof obj == 'undefined') {
	        var begin = null,
	            length = null,
	            field = '';
	    } else {
	        var begin = typeof obj.begin == 'undefined' ? null : obj.begin,
	            length = typeof obj.length == 'undefined' ? null : obj.length,
	            field = typeof obj.field == 'undefined' ? '' : obj.field;
	    }
	    var oThis = this,
	        begin = parseInt(begin),
	        length = parseInt(length),
	        end = begin;
	    if (length > 0) {
	        end = parseInt(begin + length - 1);
	    }
	    if (field == '') {
	        if (this.gridCompColumnFixedArr) $.each(this.gridCompColumnFixedArr, function (i) {
	            oThis.renderTypeByColumn(this, i, begin, length, true);
	        });
	        $.each(this.gridCompColumnArr, function (i) {
	            oThis.renderTypeByColumn(this, i, begin, length, false);
	        });
	    } else {
	        var rendered = false;
	        if (this.gridCompColumnFixedArr) $.each(this.gridCompColumnFixedArr, function (i) {
	            if (this.options.field == field) {
	                oThis.renderTypeByColumn(this, i, begin, length, true);
	                rendered = true;
	                return;
	            }
	        });
	        if (!rendered) $.each(this.gridCompColumnArr, function (i) {
	            if (this.options.field == field) {
	                oThis.renderTypeByColumn(this, i, begin, length, false);
	                return;
	            }
	        });
	    }
	};
	/*
	 * 处理renderType
	 * gridCompColumn对象，index为第几列
	 * begin为起始行，length为行数（增加行数时使用）
	 */
	var renderTypeByColumn = function renderTypeByColumn(gridCompColumn, i, begin, length, isFixedColumn) {
	    var oThis = this,
	        renderType = gridCompColumn.options.renderType,
	        sumCol = gridCompColumn.options.sumCol,
	        sumRenderType = gridCompColumn.options.sumRenderType,
	        dataType = gridCompColumn.options.dataType,
	        precision = gridCompColumn.options.precision,
	        format = gridCompColumn.options.format,
	        field = gridCompColumn.options.field,
	        end = begin,
	        idSuffix = isFixedColumn === true ? '_content_fixed_tbody' : '_content_tbody',
	        idStr = isFixedColumn === true ? 'fixed_' : '',
	        visibleColIndex = this.getVisibleIndexOfColumn(gridCompColumn);

	    if (length > 0) {
	        end = parseInt(begin + length - 1);
	    }
	    this.realtimeTableRows = document.getElementById(oThis.options.id + idSuffix).children;
	    // 记录role不是row的行
	    var notRowIndex = -1;
	    for (var k = 0; k < oThis.realtimeTableRows.length; k++) {
	        if (oThis.realtimeTableRows[k].getAttribute("role") != "row") {
	            notRowIndex = k;
	        }
	    }
	    $.each(oThis.dataSourceObj.rows, function (j) {
	        if (begin >= 0 && j >= begin && j <= end || isNaN(begin)) {
	            //如果当前修改此列则将变量重置
	            if (oThis.editColIndex == visibleColIndex && oThis.eidtRowIndex == j) {
	                oThis.editColIndex = -1;
	                oThis.eidtRowIndex = -1;
	            }
	            var trIndex = j;
	            if (notRowIndex != -1 && j >= notRowIndex) {
	                trIndex++;
	            }
	            var tr = oThis.realtimeTableRows[trIndex],
	                td = tr.children[i];
	            if (oThis.iconSpan) {
	                var iconSpan = oThis.iconSpan;
	            }

	            if (td) {
	                if (td.children[0].innerHTML.indexOf('u-grid-content-tree-span') != -1) {
	                    var span = td.children[0].children[1];
	                } else {
	                    // td.innerHTML = '<div class="u-grid-content-td-div"></div>'; //如果是树表的话第一列显示会有问题，等出现其他问题之后再修改此处
	                    var span = td.children[0];
	                }
	                if (span) {
	                    var v = $(this.value).attr(field);
	                    if (typeof renderType == 'function' || dataType == 'Date' || dataType == 'Datetime' || dataType == 'Int' || dataType == 'Float') {
	                        span.innerHTML = '';
	                        if (typeof renderType == 'function') {
	                            v = oThis.getString(v, '');
	                            var obj = {};
	                            obj.value = v;
	                            obj.element = span;
	                            obj.gridObj = oThis;
	                            obj.row = this;
	                            obj.gridCompColumn = gridCompColumn;
	                            obj.rowIndex = j;
	                            renderType.call(oThis, obj);
	                        } else if (dataType == 'Date' || dataType == 'Datetime') {
	                            if (v == null || v == undefined || v == 'null' || v == 'undefined' || v == "") {
	                                v = "";
	                            }
	                            if (dataType == 'Date') {
	                                v = u.dateRender(v);
	                            } else {
	                                v = u.dateTimeRender(v);
	                            }
	                            span.innerHTML = v;
	                            td.title = v;
	                        } else if (dataType == 'Int') {
	                            v = parseInt(v);
	                            if (v) {
	                                span.innerHTML = v;
	                                td.title = v;
	                            } else {
	                                span.innerHTML = "";
	                                td.title = "";
	                            }
	                        } else if (dataType == 'Float') {
	                            if (precision) {
	                                var o = {};
	                                o.value = v;
	                                o.precision = precision;
	                                v = oThis.DicimalFormater(o);
	                            } else {
	                                v = parseFloat(v);
	                            }
	                            if (v) {
	                                span.innerHTML = v;
	                                td.title = v;
	                            } else {
	                                span.innerHTML = "";
	                                td.title = "";
	                            }
	                        } else {
	                            //此处逻辑放到渲染处，减少render执行次数。
	                            v = oThis.getString(v, '');
	                            var v1 = v.replace(/\</g, '\<');
	                            v1 = v1.replace(/\>/g, '\>');
	                            td.title = v;
	                            v = v.replace(/\</g, '&lt;');
	                            v = v.replace(/\>/g, '&gt;');
	                            span.innerHTML = v;
	                        }
	                    } else {
	                        v = oThis.getString(v, '');
	                        var v1 = v.replace(/\</g, '\<');
	                        v1 = v1.replace(/\>/g, '\>');
	                        td.title = v;
	                        v = v.replace(/\</g, '&lt;');
	                        v = v.replace(/\>/g, '&gt;');
	                        if (i == 0 && iconSpan) {
	                            v = iconSpan += v;
	                        }
	                        span.innerHTML = v;
	                    }
	                }
	            }
	        }
	    });
	    this.renderTypeSumRow(gridCompColumn, i, begin, length, isFixedColumn);
	};
	var renderTypeSumRow = function renderTypeSumRow(gridCompColumn, i, begin, length, isFixedColumn) {};
	exports.renderTypeFun = renderTypeFun;
	exports.renderTypeByColumn = renderTypeByColumn;
	exports.renderTypeSumRow = renderTypeSumRow;

/***/ },
/* 16 */
/***/ function(module, exports) {

	'use strict';

	exports.__esModule = true;
	/*
	 * 设置某列是否显示(传入column)
	 */
	var setColumnVisibleByColumn = function setColumnVisibleByColumn(column, visible) {
	    var index = this.getIndexOfColumn(column);
	    this.setColumnVisibleByIndex(index, visible);
	};
	/*
	 * 设置某列是否显示(传入index为gridCompColumnArr中的数据)
	 */
	var setColumnVisibleByIndex = function setColumnVisibleByIndex(index, visible) {
	    if (index >= 0) {
	        var column = this.gridCompColumnArr[index],
	            visibleIndex = this.getVisibleIndexOfColumn(column);
	        // 显示处理
	        if (column.options.visible == false && visible) {
	            var htmlStr = '<col';
	            if (column.options.width) {
	                htmlStr += ' style="width:' + this.formatWidth(column.options.width) + '"';
	            }
	            htmlStr += '>';

	            $('#' + this.options.id + '_header th:eq(' + index + ')').css('display', "");
	            $('#' + this.options.id + '_content th:eq(' + index + ')').css('display', "");
	            $('td:eq(' + index + ')', $('#' + this.options.id + '_content tbody tr')).css('display', "");
	            // 当前列之后的显示列的index
	            var nextVisibleIndex = this.getNextVisibleInidexOfColumn(column);
	            if (nextVisibleIndex == -1) {
	                // 添加在最后面
	                try {
	                    $('#' + this.options.id + '_header col:last')[0].insertAdjacentHTML('afterEnd', htmlStr);
	                    $('#' + this.options.id + '_content col:last')[0].insertAdjacentHTML('afterEnd', htmlStr);
	                } catch (e) {
	                    $('#' + this.options.id + '_header col:last').after(htmlStr);
	                    $('#' + this.options.id + '_content col:last').after(htmlStr);
	                }
	            } else {
	                // 添加在下一个显示列之前
	                try {
	                    $('#' + this.options.id + '_header col:eq(' + nextVisibleIndex + ')')[0].insertAdjacentHTML('beforeBegin', htmlStr);
	                    $('#' + this.options.id + '_content col:eq(' + nextVisibleIndex + ')')[0].insertAdjacentHTML('beforeBegin', htmlStr);
	                } catch (e) {
	                    $('#' + this.options.id + '_header col:eq(' + nextVisibleIndex + ')').before(htmlStr);
	                    $('#' + this.options.id + '_content col:eq(' + nextVisibleIndex + ')').before(htmlStr);
	                }
	            }
	            var newContentW = this.contentWidth + column.options.width;
	        }
	        // 隐藏处理
	        if (column.options.visible == true && !visible) {
	            $('#' + this.options.id + '_header th:eq(' + index + ')').css('display', "none");
	            $('#' + this.options.id + '_header col:eq(' + visibleIndex + ')').remove();
	            $('#' + this.options.id + '_content th:eq(' + index + ')').css('display', "none");
	            $('#' + this.options.id + '_content col:eq(' + visibleIndex + ')').remove();
	            $('td:eq(' + index + ')', $('#' + this.options.id + '_content tbody tr')).css('display', "none");
	            // 隐藏之后需要判断总体宽度是否小于内容区最小宽度，如果小于需要将最后一列进行扩展
	            var newContentW = this.contentWidth - column.options.width;
	        }
	        column.options.visible = visible;
	        this.columnsVisibleFun();
	        var w = this.contentWidthChange(newContentW);
	        this.lastVisibleColumn.options.width = this.lastVisibleColumnWidth;
	        this.contentWidth = w;
	        this.resetThVariable();
	        this.saveGridCompColumnArrToLocal();
	    }
	};

	/*
	 * 根据field设置宽度
	 */
	var setCoulmnWidthByField = function setCoulmnWidthByField(field, newWidth) {
	    var column = this.getColumnByField(field);
	    this.setColumnWidth(column, newWidth);
	};
	/*
	 * 根据column对象设置宽度
	 */
	var setColumnWidth = function setColumnWidth(column, newWidth) {
	    if (column != this.lastVisibleColumn) {
	        if (newWidth > this.minColumnWidth) {
	            var nowVisibleThIndex = this.getVisibleIndexOfColumn(column),
	                oldWidth = column.options.width,
	                changeWidth = newWidth - oldWidth,
	                cWidth = this.contentWidth + changeWidth;
	            this.contentWidth = this.contentWidthChange(cWidth);
	            $('#' + this.options.id + '_header_table col:eq(' + nowVisibleThIndex + ')').css('width', newWidth + "px");
	            $('#' + this.options.id + '_content_table col:eq(' + nowVisibleThIndex + ')').css('width', newWidth + "px");

	            column.options.width = newWidth;
	            column.options.realWidth = newWidth;

	            this.resetThVariable();
	            this.saveGridCompColumnArrToLocal();
	        }
	    }
	};
	/*
	 * 设置数据源
	 */
	var setDataSource = function setDataSource(dataSource) {
	    this.initDataSourceVariable();
	    this.options.dataSource = dataSource;
	    this.initDataSource();
	    this.repairContent();
	    this.afterGridDivsCreate();
	};
	/*
	 * 设置数据源 格式为：
	 * {
	    fields:['column1','column2','column3','column4','column5','column6'],
	    values:[["cl1","1","cl3","cl4","cl5","cl6"]
	            ,["cl12","2","cl32","cl42","cl52","cl62"]
	            ,["cl13","3","cl33","cl43","cl53","cl63"]
	            ,["cl14","4","cl34","cl44","cl54","cl64"]
	            ,["cl15","5","cl35","cl45","cl55","cl65"]
	            ,["cl16","6","cl36","cl46","cl56","cl66"]
	        ]

	    }
	 */
	var setDataSourceFun1 = function setDataSourceFun1(dataSource) {
	    var dataSourceObj = {};
	    if (dataSource.values) {
	        var valuesArr = new Array();
	        $.each(dataSource.values, function () {
	            if (dataSource.fields) {
	                var valueObj = {},
	                    value = this;
	                $.each(dataSource.fields, function (j) {
	                    $(valueObj).attr(this, value[j]);
	                });
	                valuesArr.push(valueObj);
	            }
	        });
	    }
	    $(dataSourceObj).attr('values', valuesArr);
	    this.setDataSource(dataSourceObj);
	};
	exports.setColumnVisibleByColumn = setColumnVisibleByColumn;
	exports.setColumnVisibleByIndex = setColumnVisibleByIndex;
	exports.setCoulmnWidthByField = setCoulmnWidthByField;
	exports.setColumnWidth = setColumnWidth;
	exports.setDataSource = setDataSource;
	exports.setDataSourceFun1 = setDataSourceFun1;

/***/ },
/* 17 */
/***/ function(module, exports) {

	'use strict';

	exports.__esModule = true;
	/*
	 * 整体宽度改变处理
	 */
	var widthChangeFun = function widthChangeFun() {
	    var oThis = this;
	    if ($('#' + this.options.id)[0]) {
	        // 获取整体区域宽度
	        var w = $('#' + this.options.id).width(); //[0].offsetWidth;
	        if (this.wholeWidth != w && this.$ele.data('gridComp') == this) {
	            this.wholeWidth = w;
	            // 树展开/合上的时候会导致页面出现滚动条导致宽度改变，没有&&之后会重新刷新页面导致无法收起
	            if (w > this.options.formMaxWidth && (this.showType == 'form' || this.showType == '' || !$('#' + this.options.id + '_content_div tbody')[0]) || this.options.overWidthHiddenColumn) {
	                //lyk--需要完善隐藏之后再显示同事添加数据操作
	                oThis.widthChangeGridFun();
	            } else if (w > 0 && w < this.options.formMaxWidth && (this.showType == 'grid' || this.showType == '')) {}
	            if (w > this.options.formMaxWidth) {
	                this.contentMinWidth = parseInt(this.wholeWidth) - parseInt(this.leftW) - parseInt(this.fixedWidth);
	                if (this.contentMinWidth < 0) this.contentMinWidth = 0;
	                setTimeout(function () {
	                    $('#' + oThis.options.id + '_header_wrap').css('max-width', oThis.wholeWidth + 'px');
	                    $('#' + oThis.options.id + '_content_div').css('width', oThis.contentMinWidth + 'px');
	                    $('#' + oThis.options.id + '_content_table').css('min-width', oThis.contentMinWidth + 'px');
	                    $('#' + oThis.options.id + '_content_table').css('width', oThis.contentMinWidth + 'px');
	                    $('#' + oThis.options.id + '_header_table').css('min-width', oThis.contentMinWidth + 'px');
	                    $('#' + oThis.options.id + '_header_table').css('width', oThis.contentMinWidth + 'px');
	                    $('#' + oThis.options.id + '_noRowsShow').css('width', oThis.contentMinWidth + 'px');
	                    //滚动条可能发生变化导致grid内部列的宽度发生变化
	                    oThis.columnsVisibleFun();
	                    if (oThis.contentRealWidth < oThis.contentMinWidth) {
	                        oThis.contentWidth = oThis.contentMinWidth;
	                    } else {
	                        oThis.contentWidth = oThis.contentRealWidth;
	                    }
	                    $('#' + oThis.options.id + '_noRows').css('width', oThis.contentWidth + 'px');
	                    if (typeof oThis.options.afterCreate == 'function') {
	                        oThis.options.afterCreate.call(oThis);
	                    }
	                }, 300);
	            }
	            $('#' + oThis.options.id + '_header_table').css('width', oThis.contentMinWidth + 'px');
	            $('#' + oThis.options.id + '_edit_form').css('width', oThis.contentMinWidth + 'px');
	        }
	    }
	};
	/*
	 * 整体宽度改变处理(grid形式)
	 */
	var widthChangeGridFun = function widthChangeGridFun() {
	    var oThis = this,
	        halfWholeWidth = parseInt(this.wholeWidth / 2);
	    this.widthChangeGridFunFixed(halfWholeWidth);
	    /* 如果宽度不足处理自动隐藏*/
	    this.widthChangeGridFunOverWidthHidden();
	    // 内容区域宽度自动扩展
	    this.contentMinWidth = parseInt(this.wholeWidth) - parseInt(this.leftW) - parseInt(this.fixedWidth);
	    if (this.contentMinWidth < 0) this.contentMinWidth = 0;
	    if (this.contentRealWidth < this.contentMinWidth) {
	        this.contentWidth = this.contentMinWidth;
	        var oldWidth = this.lastVisibleColumn.options.width;
	        this.lastVisibleColumnWidth = oldWidth + (this.contentMinWidth - this.contentRealWidth);
	        // modfied by tianxq1 最后一列自动扩展
	        this.lastVisibleColumn.options.width = this.lastVisibleColumnWidth;
	    } else {
	        this.contentWidth = this.contentRealWidth;
	    }
	    this.createGridFlag = false;
	    this.createGridDivs();
	    $('#' + this.options.id + '_form').css('display', 'none');
	    $('#' + this.options.id + '_grid').css('display', 'block');
	};
	var widthChangeGridFunFixed = function widthChangeGridFunFixed(halfWholeWidth) {};
	var widthChangeGridFunOverWidthHidden = function widthChangeGridFunOverWidthHidden() {};
	/*
	 * 整体高度改变处理
	 */
	var heightChangeFun = function heightChangeFun() {
	    if (this.countContentHeight) {
	        var oldH = this.wholeHeight,
	            h = $('#' + this.options.id)[0].offsetHeight;
	        this.wholeHeight = h;
	        if (oldH != h && h > 0) {
	            var contentH = h - this.exceptContentHeight > 0 ? h - this.exceptContentHeight : 0;
	            $('#' + this.options.id + '_content').css('height', contentH + 'px');
	            $('#' + this.options.id + '_content_div').css('height', contentH + 'px');
	        }
	    }
	};
	/*
	 * 内容区宽度改变
	 */
	var contentWidthChange = function contentWidthChange(newContentWidth) {
	    if (newContentWidth < this.contentMinWidth) {
	        var oldW = this.lastVisibleColumn.options.width;
	        this.lastVisibleColumnWidth = oldW + (this.contentMinWidth - newContentWidth);
	        $('#' + this.options.id + '_header_table col:last').css('width', this.lastVisibleColumnWidth + "px");
	        $('#' + this.options.id + '_content_table col:last').css('width', this.lastVisibleColumnWidth + "px");
	        newContentWidth = this.contentMinWidth;
	    }

	    if (newContentWidth > this.contentMinWidth) {
	        // 首先处理扩展列的宽度为原有宽度，然后再扩展最后一列
	        var l = this.overWidthVisibleColumnArr.length;
	        if (l > 0) {
	            for (var i = 0; i < l; i++) {
	                var overWidthColumn = this.overWidthVisibleColumnArr[i];
	                var nowVisibleIndex = this.getVisibleIndexOfColumn(overWidthColumn);
	                var w = overWidthColumn.options.width;
	                var realW = overWidthColumn.options.realWidth;
	                $('#' + this.options.id + '_header_table col:eq(' + nowVisibleIndex + ')').css('width', realW + "px");
	                $('#' + this.options.id + '_content_table col:eq(' + nowVisibleIndex + ')').css('width', realW + "px");
	                newContentWidth = newContentWidth - (w - realW);
	                overWidthColumn.options.width = overWidthColumn.options.realWidth;
	            }
	            if (newContentWidth < this.contentMinWidth) {
	                var oldW = this.lastVisibleColumn.options.width;
	                this.lastVisibleColumnWidth = oldW + (this.contentMinWidth - newContentWidth);
	                $('#' + this.options.id + '_header_table col:last').css('width', this.lastVisibleColumnWidth + "px");
	                $('#' + this.options.id + '_content_table col:last').css('width', this.lastVisibleColumnWidth + "px");
	                this.lastVisibleColumn.options.width = this.lastVisibleColumnWidth;
	                newContentWidth = this.contentMinWidth;
	            }
	        }
	        if (newContentWidth > this.contentMinWidth) {
	            $('#' + this.options.id + '_content_left_bottom').css('display', 'block');
	            $('#' + this.options.id + '_content_left_sum_bottom').css('bottom', 16);
	        } else {
	            $('#' + this.options.id + '_content_left_bottom').css('display', 'none');
	            $('#' + this.options.id + '_content_left_sum_bottom').css('bottom', 0);
	        }
	    } else {
	        $('#' + this.options.id + '_content_left_bottom').css('display', 'none');
	        $('#' + this.options.id + '_content_left_sum_bottom').css('bottom', 0);
	    }
	    $('#' + this.options.id + '_content_table').css('width', newContentWidth + "px");
	    $('#' + this.options.id + '_noRows').css('width', newContentWidth + "px");
	    return newContentWidth;
	};
	exports.widthChangeFun = widthChangeFun;
	exports.widthChangeGridFun = widthChangeGridFun;
	exports.widthChangeGridFunFixed = widthChangeGridFunFixed;
	exports.widthChangeGridFunOverWidthHidden = widthChangeGridFunOverWidthHidden;
	exports.heightChangeFun = heightChangeFun;
	exports.contentWidthChange = contentWidthChange;

/***/ },
/* 18 */
/***/ function(module, exports) {

	'use strict';

	exports.__esModule = true;
	/*
	 * 双击/单击处理
	 */
	var isDblEvent = function isDblEvent(eventname, dbFun, dbArg, Fun, Arg) {
		if (this.currentEventName != null && this.currentEventName == eventname) {
			dbFun.call(this, dbArg);
			this.currentEventName = null;
			if (this.cleanCurrEventName) clearTimeout(this.cleanCurrEventName);
		} else {
			var oThis = this;
			if (this.cleanCurrEventName) clearTimeout(this.cleanCurrEventName);
			this.currentEventName = eventname;
			this.cleanCurrEventName = setTimeout(function () {
				oThis.currentEventName = null;
				Fun.call(oThis, Arg);
			}, 250);
		}
	};
	/*
	 * 双击处理
	 */
	var dblClickFun = function dblClickFun(e) {
		if (typeof this.options.onDblClickFun == 'function') {
			var $tr = $(e.target).closest('tr');
			if ($tr[0].id == this.options.id + '_edit_tr') {
				return;
			}
			var index = 0;
			if ($tr.length > 0) {
				index = this.getTrIndex($tr);
			}
			var obj = {};
			obj.gridObj = this;
			obj.rowObj = this.dataSourceObj.rows[index];
			obj.rowIndex = index;
			this.options.onDblClickFun(obj);
		}
	};
	/*
	 * 单击处理
	 */
	var clickFun = function clickFun(e) {
		var oThis = this;

		// 处理focus事件
		var $tr = $(e.target).closest('tr');
		if ($tr.length > 0 && $tr[0].id == this.options.id + '_edit_tr') {
			return;
		}
		var index = this.getTrIndex($tr);
		if (typeof this.options.onBeforeClickFun == 'function') {
			var obj = {};
			obj.gridObj = this;
			obj.rowObj = this.dataSourceObj.rows[index];
			obj.rowIndex = index;
			obj.e = e;
			if (!this.options.onBeforeClickFun(obj)) {
				return;
			}
		}
		// 处理树表展开/合上
		this.clickFunTree(e);
		if ($tr.length > 0) {

			var row = oThis.dataSourceObj.rows[index];
			if (row) {
				if (oThis.options.rowClickBan) {
					return;
				}
				var rowChildIndex = oThis.getChildRowIndex(row);
				if (oThis.dataSourceObj.rows[index].focus && oThis.options.cancelFocus) {
					oThis.setRowUnFocus(index);
				} else {
					if (!oThis.dataSourceObj.rows[index].focus) {
						oThis.setRowFocus(index);
					}
				}
				this.clickFunEdit(e, index);
			}
		}
	};
	var clickFunTree = function clickFunTree(e) {};
	var clickFunEdit = function clickFunEdit(e) {};
	exports.isDblEvent = isDblEvent;
	exports.dblClickFun = dblClickFun;
	exports.clickFun = clickFun;
	exports.clickFunTree = clickFunTree;
	exports.clickFunEdit = clickFunEdit;

/***/ },
/* 19 */
/***/ function(module, exports) {

	'use strict';

	exports.__esModule = true;
	/*
	 * 更新最后数据行标识
	 */
	var updateLastRowFlag = function updateLastRowFlag() {
	    // 共享服务加的，没有对应的css暂时去掉
	    return;
	    var rows = $('#' + this.options.id + '_content_tbody').find('tr[role=row]');
	    for (var i = 0, count = rows.length; i < count; i++) {
	        if (i == count - 1) $(rows[i]).addClass('last-row');else $(rows[i]).removeClass('last-row');
	    }
	};
	var updateNumColLastRowFlag = function updateNumColLastRowFlag() {
	    // 共享服务加的，没有对应的css暂时去掉
	    return;
	    var numCols = $('#' + this.options.id + '_content_numCol').find('.u-grid-content-num');
	    for (var i = 0, count = numCols.length; i < count; i++) {
	        if (i == count - 1) $(numCols[i]).addClass('last-row');else $(numCols[i]).removeClass('last-row');
	    }
	};

	/*
	 * column是否显示处理，只在初始化gridCompColumn对象时调用，其他时候不再调用
	 * 计算固定区域及内容区域的真实宽度
	 * 计算第一列
	 * 计算内容区域最后一列显示列
	 */
	var columnsVisibleFun = function columnsVisibleFun() {
	    var oThis = this,
	        w = 0;
	    this.firstColumn = true;
	    this.overWidthVisibleColumnArr = new Array();
	    $.each(this.gridCompColumnArr, function () {
	        if (this.options.visible) {
	            w += parseInt(this.options.width);
	            if (this.options.width > this.options.realWidth) {
	                oThis.overWidthVisibleColumnArr.push(this);
	            }
	            this.firstColumn = oThis.firstColumn;
	            oThis.firstColumn = false;
	            oThis.lastVisibleColumn = this;
	            oThis.lastVisibleColumnWidth = this.options.width;
	        }
	    });
	    this.contentRealWidth = w;
	};
	/*
	 * 创建完成之后处理变量
	 */
	var resetThVariable = function resetThVariable() {
	    if (this.showType != 'grid') return;
	    var oThis = this;
	    this.contentWidth = 0;

	    // 记录每列宽度及当前宽度之和
	    $('#' + this.options.id + '_header_table th', this.$ele).each(function (i) {
	        //会出现th多于列的情况，发现问题之后再看下为什么
	        var gridCompColumn = oThis.gridCompColumnArr[i];
	        var w = 0;
	        if (gridCompColumn.options.visible) {
	            w = gridCompColumn.options.width;
	        }
	        this.attrLeftTotalWidth = oThis.contentWidth;
	        oThis.contentWidth += w;
	        oThis.resetThVariableDrag(this, gridCompColumn, w);
	        this.gridCompColumn = gridCompColumn;
	        this.attrWidth = w;
	        this.attrRightTotalWidth = oThis.contentWidth;
	    });
	    oThis.resetThVariableHeaderLevel();
	};
	var resetThVariableDrag = function resetThVariableDrag(nowTh, gridCompColumn) {};
	var resetThVariableHeaderLevel = function resetThVariableHeaderLevel() {};

	/*
	 * 修改第一列的css
	 */
	var headerFirstClassFun = function headerFirstClassFun() {
	    $('#' + this.options.id + '_grid .u-grid-header-th-first').removeClass('u-grid-header-th-first');
	    $('#' + this.options.id + '_grid').find('th').eq(0).addClass('u-grid-header-th-first');
	};

	/*
	 * 根据filed设置renderType
	 */
	var setRenderType = function setRenderType(field, renderType) {
	    var gridCompColumn = this.getColumnByField(field);
	    gridCompColumn.options.renderType = renderType;
	    var index = this.getIndexOfColumn(gridCompColumn);
	    this.renderTypeByColumn(gridCompColumn, index);
	};
	/*
	 * 设置是否显示header
	 */
	var setShowHeader = function setShowHeader(showHeader) {
	    this.options.showHeader = showHeader;
	    if (showHeader) {
	        $('#' + this.options.id + '_header').css('display', "block");
	    } else {
	        $('#' + this.options.id + '_header').css('display', "none");
	    }
	};
	var setColumnPrecision = function setColumnPrecision(field, precision) {
	    var gridColumn = this.getColumnByField(field);
	    gridColumn.options.precision = precision;
	    this.renderTypeFun();
	    if (this.options.showSumRow) {
	        this.repairSumRow();
	    }
	};
	var setMultiSelect = function setMultiSelect(multiSelect) {
	    var oldMultiSelect = this.options.multiSelect;
	    if (oldMultiSelect != multiSelect) {
	        this.options.multiSelect = multiSelect;
	        this.initGrid();
	    }
	};
	var setShowNumCol = function setShowNumCol(showNumCol) {
	    var oldShowNumCol = this.options.showNumCol;
	    if (oldShowNumCol != showNumCol) {
	        this.options.showNumCol = showNumCol;
	        this.initGrid();
	    }
	};
	var isGridShow = function isGridShow() {
	    if (this.showType == 'grid') return true;
	    return false;
	};
	var getBoolean = function getBoolean(value) {
	    if (value === 'true' || value === true) return true;
	    return false;
	};
	exports.updateLastRowFlag = updateLastRowFlag;
	exports.updateNumColLastRowFlag = updateNumColLastRowFlag;
	exports.columnsVisibleFun = columnsVisibleFun;
	exports.resetThVariable = resetThVariable;
	exports.resetThVariableDrag = resetThVariableDrag;
	exports.resetThVariableHeaderLevel = resetThVariableHeaderLevel;
	exports.headerFirstClassFun = headerFirstClassFun;
	exports.setRenderType = setRenderType;
	exports.setShowHeader = setShowHeader;
	exports.setColumnPrecision = setColumnPrecision;
	exports.setMultiSelect = setMultiSelect;
	exports.setShowNumCol = setShowNumCol;
	exports.isGridShow = isGridShow;
	exports.getBoolean = getBoolean;

/***/ },
/* 20 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	exports.__esModule = true;
	exports.getTrIndex = exports.accAdd = exports.DicimalFormater = exports.cloneObj = exports.getFloat = exports.getInt = exports.getString = exports.swapEle = exports.formatWidth = undefined;

	var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol ? "symbol" : typeof obj; };

	var _gridBrowser = __webpack_require__(10);

	/*
	 * 对宽度和高度进行处理
	 */
	var formatWidth = function formatWidth(w) {
	    // 获得宽度
	    if (w) {
	        return (w + "").indexOf("%") > 0 ? w : parseInt(w) + "px";
	    } else {
	        return '';
	    }
	};
	/*
	 * 两个元素交换位置，要求传入参数e1在e2之前
	 */
	var swapEle = function swapEle(e1, e2) {
	    var n = e1.next(),
	        p = e2.prev();
	    e2.insertBefore(n);
	    e1.insertAfter(p);
	};
	var getString = function getString(value, defaultValue) {
	    if (value === null || value === undefined || value === 'null' || value === 'undefined' || value === "") {
	        value = defaultValue;
	    }
	    if (_gridBrowser.gridBrowser.isIE8) {
	        return [value].join("");
	    } else {
	        return value + "";
	    }
	};
	var getInt = function getInt(value, defaultValue) {
	    if (value === null || value === undefined || value === 'null' || value === 'undefined' || value === "" || isNaN(value)) {
	        value = defaultValue;
	    }
	    return value;
	};
	var getFloat = function getFloat(value, defaultValue) {
	    if (value === null || value === undefined || value === 'null' || value === 'undefined' || value === "" || isNaN(value)) {
	        value = defaultValue;
	    }
	    return value;
	};
	/*
	 * 克隆对象
	 */
	var cloneObj = function cloneObj(obj) {
	    var o;
	    if ((typeof obj === "undefined" ? "undefined" : _typeof(obj)) == "object") {
	        if (obj === null) {
	            o = null;
	        } else {
	            if (obj instanceof Array) {
	                o = [];
	                for (var i = 0, len = obj.length; i < len; i++) {
	                    o.push(this.cloneObj(obj[i]));
	                }
	            } else {
	                o = {};
	                for (var k in obj) {
	                    o[k] = this.cloneObj(obj[k]);
	                }
	            }
	        }
	    } else {
	        o = obj;
	    }
	    return o;
	};
	/*
	 * 处理精度
	 */
	var DicimalFormater = function DicimalFormater(obj) {
	    var value = obj.value + '',
	        precision = obj.precision;
	    for (var i = 0; i < value.length; i++) {
	        if ("-0123456789.".indexOf(value.charAt(i)) == -1) return "";
	    }
	    return this.checkDicimalInvalid(value, precision);
	};
	var checkDicimalInvalid = function checkDicimalInvalid(value, precision) {
	    if (value == null || isNaN(value)) return "";
	    // 浮点数总位数不能超过10位
	    var digit = parseFloat(value);
	    var result = (digit * Math.pow(10, precision) / Math.pow(10, precision)).toFixed(precision);
	    if (result == "NaN") return "";
	    return result;
	};
	var accAdd = function accAdd(v1, v2) {
	    var r1, r2, m;
	    try {
	        r1 = v1.toString().split('.')[1].length;
	    } catch (e) {
	        r1 = 0;
	    }
	    try {
	        r2 = v2.toString().split('.')[1].length;
	    } catch (e) {
	        r2 = 0;
	    }
	    m = Math.pow(10, Math.max(r1, r2));
	    return (v1 * m + v2 * m) / m;
	};
	var getTrIndex = function getTrIndex($tr) {
	    return $('tr[id!="' + this.options.id + '_edit_tr"]', $tr.parent()).index($tr);
	};
	exports.formatWidth = formatWidth;
	exports.swapEle = swapEle;
	exports.getString = getString;
	exports.getInt = getInt;
	exports.getFloat = getFloat;
	exports.cloneObj = cloneObj;
	exports.DicimalFormater = DicimalFormater;
	exports.accAdd = accAdd;
	exports.getTrIndex = getTrIndex;

/***/ },
/* 21 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	exports.__esModule = true;
	exports.colMenu_initGridEventFun = exports.colMenu_initEventFun = exports.re_createColumnMenu = exports.colMenu_initGridCompColumn = exports.re_initGridCompColumnColumnMenuFun = undefined;

	var _gridCompEvent = __webpack_require__(4);

	var _gridCompInit = __webpack_require__(13);

	var re_initGridCompColumnColumnMenuFun = function re_initGridCompColumnColumnMenuFun(columnOptions) {
		var column1 = new this.gridCompColumn(columnOptions, this);
		column1.options.realWidth = column1.options.width;
		this.basicGridCompColumnArr.push(column1);
	};

	var colMenu_initGridCompColumn = function colMenu_initGridCompColumn() {
		// 扩展方法
		this.menuColumnsHeight = this.gridCompColumnArr.length * this.columnMenuHeight;
	};

	var re_createColumnMenu = function re_createColumnMenu() {
		var oThis = this;
		var htmlStr = '<div class="u-grid-column-menu" id="' + this.options.id + '_column_menu">';
		htmlStr += '<ul data-role="menu" role="menubar" class="u-grid-column-menu-ul" id="' + this.options.id + '_column_menu_ul">';

		// 创建清除设置
		htmlStr += '<li class="u-grid-column-menu-li" role="menuitem">';
		htmlStr += '<div class="u-grid-column-menu-div1" id="' + this.options.id + '_clearSet">';
		htmlStr += '<span class="u-grid-column-menu-span">' + this.transMap.ml_clear_set + '</span>';
		htmlStr += '</div></li>';

		htmlStr += '<div class="u-grid-column-menu-columns" id="' + this.options.id + '_column_menu_columns">';
		htmlStr += '<ul data-role="menu" role="menubar" class="u-grid-column-menu-columns-ul" id="' + this.options.id + '_column_menu_columns_ul">';
		$.each(this.gridCompColumnArr, function (i) {
			if (oThis.getString(this.options.title, '') != '') {
				htmlStr += '<li class="u-grid-column-menu-columns-li" role="menuitem" index="' + i + '">';
				htmlStr += '<div class="u-grid-column-menu-columns-div1">';
				var checkedStr = "";
				if (this.options.visible) checkedStr = ' checked';
				if (!this.options.canVisible) checkedStr += ' style="display:none;"';
				htmlStr += '<div class="u-grid-column-menu-columns-div2"><input type="checkbox" ' + checkedStr + '><label></label></div>';
				htmlStr += '<span class="u-grid-column-menu-columns-span">' + this.options.title + '</span>';
				htmlStr += '</div></li>';
			}
		});
		htmlStr += '</ul></div>';

		htmlStr += '</ul></div>';

		// 创建数据列区域

		return htmlStr;
	};

	var colMenu_initEventFun = function colMenu_initEventFun() {
		// 扩展方法
		var oThis = this;
		$('#' + this.options.id).on('mouseup', function (e) {
			if ($(e.target).closest('#' + oThis.options.id + '_header').length > 0) {
				// 点击的是header区域
				oThis.mouseUpX = e.clientX;
				oThis.mouseUpY = e.clientY;
				//点击过程中鼠标没有移动
				if (oThis.mouseDownX == oThis.mouseUpX && oThis.mouseDownY == oThis.mouseUpY) {
					//或者移动距离小于5px(由于移动之后会显示屏幕div，暂时不做处理)
					oThis.columnClickX = e.clientX;
					oThis.columnClickY = e.clientY;
					var eleTh = $(e.target).closest('th')[0];
					if ($(e.target).hasClass('u-grid-header-columnmenu')) {
						//点击的是columnmenu
						$('#' + oThis.options.id + '_column_menu').css('display', 'block');

						// 根据点击位置来显示column menu区域
						var left = e.clientX - 160;
						if (left < 0) left = 0;
						var top = e.clientY + 10;
						$('#' + oThis.options.id + '_column_menu').css('left', left);
						$('#' + oThis.options.id + '_column_menu').css('top', top);
						/*数据列多的情况下处理显示的高度*/

						var sX = $(window).width();
						var sH = $(window).height();

						// 如果数据列高度高于屏幕高度则数据列高度设置为屏幕高度-10；
						var columnsHeight = oThis.menuColumnsHeight;
						if (oThis.menuColumnsHeight + top + 34 > sH) {
							columnsHeight = sH - top - 34;
							$('#' + oThis.options.id + '_column_menu_columns').css('height', columnsHeight + 'px');
						} else {
							$('#' + oThis.options.id + '_column_menu_columns').css('height', '');
						}
						oThis.ele.createColumnMenuFlag = true;
					} else {}
				}
			} else if ($(e.target).closest('#' + oThis.options.id + '_content').length > 0) {
				// 点击的是数据区域

			}
		});

		$(document).on('click', function () {
			if (oThis.columnMenuMove == false && oThis.ele.createColumnMenuFlag == false) {
				$('#' + oThis.options.id + '_column_menu').css('display', 'none');
			}
			oThis.ele.createColumnMenuFlag = false;
		});
	};

	var colMenu_initGridEventFun = function colMenu_initGridEventFun() {
		// 扩展方法
		var oThis = this;

		/*header 按钮处理开始*/
		// column按钮
		$('#' + this.options.id + '_column_menu_ul').on('mousemove', function (e) {
			oThis.columnMenuMove = true;
		});
		$('#' + this.options.id + '_column_menu_ul').on('mouseout', function (e) {
			oThis.columnMenuMove = false;
		});

		// 清除设置按钮
		$('#' + this.options.id + '_clearSet').on('click', function (e) {
			oThis.clearLocalData();
			oThis.initGridCompColumn();
			// 清除排序
			oThis.dataSourceObj.sortRows();
			oThis.repaintGridDivs();
			if (typeof oThis.options.onClearSetFun == 'function') {
				oThis.options.onClearSetFun(oThis);
			}
		});
		// 显示/隐藏列 对应所有列的点击处理
		$('#' + this.options.id + '_column_menu_columns_ul li input').on('click', function (e) {
			//待完善 优化与li的click的代码整合
			var index = $(this).closest('li').attr('index');

			if (oThis.gridCompColumnArr[index].options.visible) {
				$(this)[0].checked = false;
				var ll = $('input:checked', $('#' + oThis.options.id + '_column_menu_columns_ul')).length;
				if (ll == 0) {
					$(this)[0].checked = true;
					return;
				}

				if (document.documentMode == 8) {
					var oldScrollTop = $('#' + oThis.options.id + '_column_menu_columns')[0].scrollTop;
					var oldTop = $('#' + oThis.options.id + '_column_menu_columns')[0].style.top;
					oThis.gridCompColumnArr[index].options.visible = false;
					oThis.repaintGridDivs();
					$('#' + oThis.options.id + '_column_menu').css('display', 'block');
					$('#' + oThis.options.id + '_column_menu').css('right', '0px');
					$('#' + oThis.options.id + '_column_menu').css('top', oldTop);
					$('#' + oThis.options.id + '_column_menu_columns')[0].scrollTop = oldScrollTop;
				} else {
					oThis.setColumnVisibleByIndex(index, false);
					oThis.gridCompColumnArr[index].options.visible = false;
				}
			} else {
				$(this)[0].checked = true;

				if (document.documentMode == 8) {
					var oldScrollTop = $('#' + oThis.options.id + '_column_menu_columns')[0].scrollTop;
					var oldTop = $('#' + oThis.options.id + '_column_menu_columns')[0].style.top;
					oThis.gridCompColumnArr[index].options.visible = true;
					oThis.repaintGridDivs();
					$('#' + oThis.options.id + '_column_menu').css('display', 'block');
					$('#' + oThis.options.id + '_column_menu').css('right', '0px');
					$('#' + oThis.options.id + '_column_menu').css('top', oldTop);
					$('#' + oThis.options.id + '_column_menu_columns')[0].scrollTop = oldScrollTop;
				} else {
					oThis.setColumnVisibleByIndex(index, true);
					oThis.gridCompColumnArr[index].options.visible = true;
				}
			}
			oThis.saveGridCompColumnArrToLocal();
			e.stopPropagation();
		});
		$('#' + this.options.id + '_column_menu_columns_ul li').on('click', function (e) {
			var index = $(this).attr('index');
			var gridCompColumn = oThis.gridCompColumnArr[index];
			if (!gridCompColumn.options.canVisible) {
				return false;
			}
			//获取选中列数量，不能小于1
			if (gridCompColumn.options.visible) {
				$('input', $(this))[0].checked = false;
				var ll = $('input:checked', $('#' + oThis.options.id + '_column_menu_columns_ul')).length;
				if (ll == 0) {
					$('input', $(this))[0].checked = true;
					return;
				}
				oThis.setColumnVisibleByIndex(index, false);
				oThis.gridCompColumnArr[index].options.visible = false;
			} else {
				$('input', $(this))[0].checked = true;
				oThis.setColumnVisibleByIndex(index, true);
				oThis.gridCompColumnArr[index].options.visible = true;
			}
			oThis.saveGridCompColumnArrToLocal();
		});
		/*header 按钮处理结束*/
	};

	exports.re_initGridCompColumnColumnMenuFun = re_initGridCompColumnColumnMenuFun;
	exports.colMenu_initGridCompColumn = colMenu_initGridCompColumn;
	exports.re_createColumnMenu = re_createColumnMenu;
	exports.colMenu_initEventFun = colMenu_initEventFun;
	exports.colMenu_initGridEventFun = colMenu_initGridEventFun;

/***/ },
/* 22 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	exports.__esModule = true;
	exports.re_resetThVariableDrag = exports.headerThDrag = exports.dragEnd = exports.dragFun = exports.dragStart = exports.drag_initGridEventFun = exports.drag_initEventFun = exports.re_createHeaderDrag = undefined;

	var _gridCompEvent = __webpack_require__(4);

	var re_createHeaderDrag = function re_createHeaderDrag() {
		return '<div class="u-grid-header-resize-handle" id="' + this.options.id + '_resize_handle"><div class="u-grid-header-resize-handle-inner"></div></div>';
	};

	var drag_initEventFun = function drag_initEventFun() {
		// 扩展方法
		var oThis = this;

		$('#' + this.options.id).on('mousemove', function (e) {
			if ($(e.target).closest('#' + oThis.options.id + '_header').length > 0) {
				// 在header区域移动
				var eleTh = $(e.target).closest('th')[0];
				// 将其他列的操作按钮隐藏，显示当前列的
				oThis.headerThDrag(e, eleTh);
			}

			oThis.dragFun(e);
			e.stopPropagation();
		});
		$('#' + this.options.id + '_top').on('mousemove', function (e) {
			oThis.dragFun(e);
			e.stopPropagation();
		});

		$('#' + this.options.id).on('mouseup', function (e) {
			oThis.dragEnd(e);
		});

		$('#' + this.options.id + '_top').on('mouseup', function (e) {
			oThis.dragEnd(e);
		});
	};

	var drag_initGridEventFun = function drag_initGridEventFun() {
		// 扩展方法
		var oThis = this;
		$('#' + this.options.id + '_resize_handle').on('mousedown', function (e) {
			oThis.dragStart(e);
			return false;
		});
	};
	/*
	 * 拖动开始
	 */
	var dragStart = function dragStart(e) {
		this.dragFlag = true;
		this.dragW = null;
		this.dragStartX = e.clientX;
	};
	/*
	 * 改变列宽度处理
	 */
	var dragFun = function dragFun(e) {
		if (this.dragFlag) {
			var nowTh = $('#' + this.options.id + '_resize_handle')[0].nowTh,
			    $nowTh = $(nowTh),
			    nowThIndex = $nowTh.attr('index'),
			    column = this.gridCompColumnArr[nowThIndex];
			nowVisibleThIndex = this.getVisibleIndexOfColumn(column);
			if (nowTh && column != this.lastVisibleColumn) {
				this.dragEndX = e.clientX;
				var changeWidth = this.dragEndX - this.dragStartX,
				    newWidth = nowTh.attrWidth + changeWidth;
				cWidth = this.contentWidth + changeWidth;
				if (newWidth > this.minColumnWidth) {
					this.dragW = this.contentWidthChange(cWidth);
					$('#' + this.options.id + '_header_table col:eq(' + nowVisibleThIndex + ')').css('width', newWidth + "px");
					$('#' + this.options.id + '_content_table col:eq(' + nowVisibleThIndex + ')').css('width', newWidth + "px");

					column.options.width = newWidth;
					column.options.realWidth = newWidth;
				}
			}
			$('#' + this.options.id + '_top').css('display', 'block');
		}
	};
	/*
	 * 拖动结束
	 */
	var dragEnd = function dragEnd(e) {
		if (this.dragFlag) {
			this.resetThVariable();
			this.saveGridCompColumnArrToLocal();
		}
		this.lastVisibleColumn.options.width = this.lastVisibleColumnWidth;
		if (this.dragW) this.contentWidth = this.dragW;
		$('#' + this.options.id + '_resize_handle')[0].nowTh = null;
		this.dragFlag = false;
		$('#' + this.options.id + '_top').css('display', 'none');
	};

	/*
	 * 计算拖动div所在位置
	 */
	var headerThDrag = function headerThDrag(e, ele) {
		if (!this.dragFlag && !this.swapColumnFlag && ele && ele.gridCompColumn && ele.gridCompColumn.options.canDrag && $('#' + this.options.id + '_resize_handle')[0].nowTh != ele) {
			var $ele = $(ele);
			$('#' + this.options.id + '_resize_handle').css('left', ele.attrRightTotalWidth - this.scrollLeft - 4 + this.leftW + this.fixedWidth);
			$('#' + this.options.id + '_resize_handle')[0].nowTh = ele;
		}
	};
	var re_resetThVariableDrag = function re_resetThVariableDrag(nowTh, gridCompColumn, width) {
		if (!$('#' + this.options.id + '_resize_handle')[0].nowTh && gridCompColumn.options.canDrag) {
			$('#' + this.options.id + '_resize_handle').css('left', width - 4 + this.leftW);
			$('#' + this.options.id + '_resize_handle')[0].nowTh = nowTh;
		}
	};
	exports.re_createHeaderDrag = re_createHeaderDrag;
	exports.drag_initEventFun = drag_initEventFun;
	exports.drag_initGridEventFun = drag_initGridEventFun;
	exports.dragStart = dragStart;
	exports.dragFun = dragFun;
	exports.dragEnd = dragEnd;
	exports.headerThDrag = headerThDrag;
	exports.re_resetThVariableDrag = re_resetThVariableDrag;

/***/ },
/* 23 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	exports.__esModule = true;
	exports.setGridEditTypeAndEditRow = exports.setGridEditType = exports.edit_initEventFun = exports.setEditable = exports.setEditType = exports.re_updateValueAtEdit = exports.re_updateEditRowIndex = exports.editValueChange = exports.nextEditShow = exports.editCell = exports.re_editClose = exports.editRow = exports.editRowIndexFun = exports.editRowFun = exports.re_clickFunEdit = exports.re_hideEditMenu = undefined;

	var _gridCompEvent = __webpack_require__(4);

	var re_hideEditMenu = function re_hideEditMenu() {
		$('#' + this.options.id + '_content_edit_menu').css('display', 'none');
	};

	var re_clickFunEdit = function re_clickFunEdit(e, index) {
		var $tr = $(e.target).closest('tr');
		var $td = $(e.target).closest('td');
		var colIndex = $td.index();
		if (this.options.editable && (this.eidtRowIndex != index || this.options.editType == 'default' && this.editColIndex != colIndex)) {
			if (typeof this.options.onBeforeEditFun == 'function') {
				var obj = {};
				obj.gridObj = this;
				obj.rowObj = this.dataSourceObj.rows[index];
				obj.rowIndex = index;
				obj.colIndex = colIndex;
				obj.$tr = $tr;
				obj.e = e;
				if (!this.options.onBeforeEditFun(obj)) {
					return;
				}
			}
			this.editRowFun($tr, colIndex);
		}
	};

	var editRowFun = function editRowFun($tr, colIndex) {
		if (this.eidtRowIndex != -1) {
			this.editClose();
		}
		var index = typeof $tr === 'number' ? $tr : this.getTrIndex($tr);
		this.eidtRowIndex = index;
		this.editColIndex = colIndex;
		this.editRow($tr, colIndex);
	};
	var editRowIndexFun = function editRowIndexFun(i) {
		if (this.eidtRowIndex != -1) {
			this.editClose();
		}
		this.eidtRowIndex = i;
		this.editColIndex = 0;
		this.editRow();
	};
	/*
	 * 创建编辑行
	 */
	var editRow = function editRow($tr, colIndex) {
		if (colIndex < 0) return;
		var oThis = this;
		var isFixedCol = false;
		if ($tr && $tr.parents('table').attr('id').indexOf('_fixed_') > -1) isFixedCol = true;
		$tr = $tr || $('#' + this.options.id + '_content_tbody tr[role="row"]:eq(' + this.eidtRowIndex + ')');
		colIndex = colIndex || 0;
		var row = this.dataSourceObj.rows[this.eidtRowIndex].value;
		this.editRowObj = this.cloneObj(row);
		if (this.options.editType == 'default') {
			var column = isFixedCol ? this.gridCompColumnFixedArr[colIndex] : this.gridCompColumnArr[colIndex];
			if (column.options.editable) {
				var td = $('td:eq(' + colIndex + ')', $tr)[0];
				var field = column.options.field;
				var value = $(row).attr(field);
				value = oThis.getString(value, '');
				var obj = {};
				obj.td = td;
				obj.value = value;
				obj.field = field;
				obj.editType = column.options.editType;
				obj.rowObj = oThis.editRowObj;
				obj.$tr = $tr;
				obj.colIndex = colIndex;
				oThis.editCell(obj);
			}
			$('#' + this.options.id + '_content_edit_menu').css('display', 'block');
			$('#' + this.options.id + '_content_edit_menu_cancel').css('marginLeft', '10px'); // 与form形式相比偏左
			var topIndex = $('tr:visible', $tr.parent()).index($tr);
			this.rowHeight = $tr.height(); // tianxq
			var t = this.rowHeight * (topIndex + 1) + this.headerHeight + 1;
		} else if (this.options.editType == 'form') {
			if (typeof this.options.formEditRenderFun == 'function') {
				if (this.fixedWidth > 0) {
					var table = $('#' + this.options.id + '_content_fixed_table')[0];
				} else {
					var table = $('#' + this.options.id + '_content_table')[0];
				}

				var tr = table.insertRow(this.eidtRowIndex + 2);
				tr.id = this.options.id + '_edit_tr';
				var cell = tr.insertCell();
				cell.id = this.options.id + '_edit_td';
				cell.style.borderBottom = '0px';
				var cWidth = parseInt(this.contentMinWidth) + parseInt(this.fixedWidth);
				var htmlStr = '<div id="' + this.options.id + '_edit_form" class="u-grid-edit-form" style="width:' + cWidth + 'px;float:left;">';
				htmlStr += '</div>';
				cell.innerHTML = htmlStr;
				var obj = {};
				obj.grid = gridObj;
				obj.element = $('#' + this.options.id + '_edit_form')[0];
				obj.editRowObj = this.editRowObj;
				this.options.formEditRenderFun.call(this, obj);
				var htmlStr = '<div style="position:relative;float:left;width:100%;height:40px;"></div>';
				$('#' + this.options.id + '_edit_form')[0].insertAdjacentHTML('beforeEnd', htmlStr);
				var h = $('#' + this.options.id + '_edit_td')[0].offsetHeight;
				var color = $('#' + this.options.id + '_edit_form').css('background-color');
				if (this.options.multiSelect) {
					var $div = $('#' + this.options.id + '_content_multiSelect > div').eq(this.eidtRowIndex);
					var htmlStr = '<div class="grid_open_edit" id="' + this.options.id + '_multiSelect_edit" style="background-color:' + color + ';float:left;position:relative;width:' + this.multiSelectWidth + 'px;height:' + h + 'px"></div>';
					$div[0].insertAdjacentHTML('afterEnd', htmlStr);
				}
				if (this.options.showNumCol) {
					var $div = $('#' + this.options.id + '_content_numCol > .u-grid-content-num').eq(this.eidtRowIndex);
					var htmlStr = '<div id="' + this.options.id + '_numCol_edit" style="background-color:' + color + ';float:left;position:relative;width:' + this.numWidth + 'px;"></div>';
					$div[0].insertAdjacentHTML('afterEnd', htmlStr);
				}
				$('#' + this.options.id + '_content_edit_menu').css('display', 'block');

				if (this.fixedWidth > 0) {
					var table1 = $('#' + this.options.id + '_content_table')[0];
					var tr1 = table1.insertRow(this.eidtRowIndex + 2);
					tr1.id = this.options.id + '_edit_tr1';
				}
			} else {
				if (this.fixedWidth > 0) {
					var table = $('#' + this.options.id + '_content_fixed_table')[0];
				} else {
					var table = $('#' + this.options.id + '_content_table')[0];
				}

				var tr = table.insertRow(this.eidtRowIndex + 2);
				tr.id = this.options.id + '_edit_tr';
				var cell = tr.insertCell();
				cell.id = this.options.id + '_edit_td';
				cell.style.borderBottom = '0px';
				var cWidth = parseInt(this.contentMinWidth) + parseInt(this.fixedWidth);
				var htmlStr = '<div id="' + this.options.id + '_edit_form" class="u-grid-edit-form" style="width:' + cWidth + 'px;float:left;">';
				$.each(this.gridCompColumnFixedArr, function (i) {
					var show = false;
					if (this.options.editFormShow && (this.options.editable || !this.options.editable && oThis.options.noneEditableFormShow)) {
						show = true;
					}

					if (show) {
						var field = this.options.field;
						var value = $(row).attr(field);
						value = oThis.getString(value, '');
						var title = this.options.title;
						var headerColor = this.options.headerColor;
						htmlStr += oThis.formEditCell(value, field, title, this.options.required, headerColor);
					}
				});

				$.each(this.gridCompColumnArr, function (i) {
					var show = false;
					if (this.options.editFormShow && (this.options.editable || !this.options.editable && oThis.options.noneEditableFormShow)) {
						show = true;
					}

					if (show) {
						var field = this.options.field;
						var value = $(row).attr(field);
						value = oThis.getString(value, '');
						var title = this.options.title;
						var headerColor = this.options.headerColor;
						htmlStr += oThis.formEditCell(value, field, title, this.options.required, headerColor);
					}
				});
				htmlStr += '</div>';
				cell.innerHTML = htmlStr;

				$.each(this.gridCompColumnFixedArr, function (i) {
					var show = false;
					if (this.options.editFormShow && (this.options.editable || !this.options.editable && oThis.options.noneEditableFormShow)) {
						show = true;
					}

					if (show) {
						var field = this.options.field;
						var td = $('#' + oThis.options.id + '_edit_' + field)[0];
						var value = $(row).attr(field);
						var title = this.options.title;
						value = oThis.getString(value, '');
						var obj = {};
						obj.td = td;
						td.innerHTML = '<div class="u-grid-content-td-div" title=""></div>';
						obj.value = value;
						obj.field = field;
						obj.editType = this.options.editType;
						obj.rowObj = oThis.editRowObj;
						obj.$tr = $tr;
						obj.colIndex = colIndex;
						htmlStr += oThis.editCell(obj);
					}
				});

				$.each(this.gridCompColumnArr, function (i) {
					var show = false;
					if (this.options.editFormShow && (this.options.editable || !this.options.editable && oThis.options.noneEditableFormShow)) {
						show = true;
					}

					if (show) {
						var field = this.options.field;
						var td = $('#' + oThis.options.id + '_edit_' + field)[0];
						var value = $(row).attr(field);
						var title = this.options.title;
						value = oThis.getString(value, '');
						var obj = {};
						obj.td = td;
						td.innerHTML = '<div class="u-grid-content-td-div" title=""></div>';
						obj.value = value;
						obj.field = field;
						obj.editType = this.options.editType;
						obj.rowObj = oThis.editRowObj;
						obj.$tr = $tr;
						obj.colIndex = colIndex;
						htmlStr += oThis.editCell(obj);
					}
				});

				if (typeof this.options.renderEditMemu == "function") {

					this.options.renderEditMemu.apply(this, [$('#' + this.options.id + '_edit_form')[0], this.eidtRowIndex, this.dataSourceObj.rows.length]);
				} else {
					var htmlStr = '<div id="' + this.options.id + '_content_edit_menu" style="position:relative;float:left;width:100%;height:40px;"><button type="button" class="u-grid-content-edit-menu-button u-grid-content-edit-menu-button-ok" id="' + this.options.id + '_content_edit_menu_close">' + this.transMap.ml_close + '</button></div>';

					$('#' + this.options.id + '_edit_form')[0].insertAdjacentHTML('beforeEnd', htmlStr);
					$('#' + this.options.id + '_content_edit_menu_close').on('click', function (e) {
						oThis.editClose();
					});
				}
				// 处理左侧区域位置
				var h = $('#' + this.options.id + '_edit_td')[0].offsetHeight;
				var color = $('#' + this.options.id + '_edit_form').css('background-color');
				if (this.options.multiSelect) {
					var $div = $('#' + this.options.id + '_content_multiSelect > div').eq(this.eidtRowIndex);
					var htmlStr = '<div class="grid_open_edit " id="' + this.options.id + '_multiSelect_edit" style="background-color:' + color + ';float:left;position:relative;width:' + this.multiSelectWidth + 'px;height:' + h + 'px"></div>';
					$div[0].insertAdjacentHTML('afterEnd', htmlStr);
				}
				if (this.options.showNumCol) {
					var $div = $('#' + this.options.id + '_content_numCol > .u-grid-content-num').eq(this.eidtRowIndex);
					var htmlStr = '<div id="' + this.options.id + '_numCol_edit" style="background-color:' + color + ';float:left;position:relative;width:' + this.numWidth + 'px;"></div>';
					$div[0].insertAdjacentHTML('afterEnd', htmlStr);
				}
				$('#' + this.options.id + '_content_edit_menu').css('display', 'block');

				if (this.fixedWidth > 0) {
					var table1 = $('#' + this.options.id + '_content_table')[0];
					var tr1 = table1.insertRow(this.eidtRowIndex + 2);
					tr1.id = this.options.id + '_edit_tr1';
				}
			}
		}
	};
	/*
	 * 行编辑关闭
	 */
	var re_editClose = function re_editClose() {
		var row = this.dataSourceObj.rows[this.eidtRowIndex];
		if (!row) return;
		if (this.options.editType != 'form') {
			//this.repaintRow(this.eidtRowIndex);
			var obj = {};
			obj.begin = this.eidtRowIndex;
			obj.length = 1;
			this.renderTypeFun(obj);
		}

		$('#' + this.options.id + '_content_edit_menu').css('display', 'none');
		this.repairSumRow();
		this.noRowsShowFun();
		this.updateLastRowFlag();
		this.eidtRowIndex = -1;
		// form形式删除对应区域,存在切换编辑形式的情况，所以一直删除
		// if(this.options.editType == 'form'){
		$('#' + this.options.id + '_multiSelect_edit').remove(null, true);
		$('#' + this.options.id + '_numCol_edit').remove(null, true);
		$('#' + this.options.id + '_edit_tr').remove(null, true);
		$('#' + this.options.id + '_edit_tr1').remove(null, true);
		// }
	};
	/*
	 * 编辑单元格
	 */
	var editCell = function editCell(obj) {
		var td = obj.td;
		var value = obj.value;
		var field = obj.field;
		var editType = obj.editType;
		var rowObj = obj.rowObj;
		var $tr = obj.$tr;
		var colIndex = obj.colIndex;
		var oThis = this;
		if (obj.colIndex == 0) {
			try {
				this.iconSpan = $(td).find('.uf')[0].outerHTML;
			} catch (e) {}
		} else {
			this.iconSpan = null;
		}

		var obj = {};
		obj.td = td;
		obj.field = field;
		obj.$tr = $tr;
		obj.colIndex = colIndex;
		oThis.newEditObj = obj;

		if (editType == 'text') {
			if (this.options.editType == 'default') {
				td.innerHTML = '<div class="u-grid-content-td-div" style="position: relative; left: 0px;"><div class="eType-input"><input id="' + this.options.id + "_edit_field_" + field + '" type="text" value="' + value + '" field="' + field + '" style="width:100%;margin:0px;min-height:20px;font-size:12px;color:#444"></div></div>';
			} else {
				td.innerHTML = '<div class="u-grid-content-td-div" style="position: relative; left: 0px;"><div class="eType-input"><input id="' + this.options.id + "_edit_field_" + field + '" type="text" value="' + value + '" field="' + field + '"></div></div>';
			}
			$('input', $(td)).on('blur', function () {
				oThis.editValueChange(field, this.value);
			});
		} else if (typeof editType == 'function') {
			var obj = {};
			var $Div = $('.u-grid-content-td-div', $(td));
			obj.gridObj = this;
			obj.element = $Div[0];
			obj.value = value;
			obj.field = field;
			obj.rowObj = rowObj;
			editType.call(this, obj);
		}
		// input输入blur时显示下一个编辑控件
		$('input', $(td)).on('keydown', function (e) {
			var keyCode = e.keyCode;
			if (e.keyCode == 13 || e.keyCode == 9) {
				// 回车
				this.blur(); //首先触发blur来将修改值反应到datatable中
				// IE11会导致先触发nextEditShow后触发blur的处理
				setTimeout(function () {
					oThis.nextEditShow();
				}, 100);
				u.stopEvent(e);
			}
		});
		if (this.options.editType == 'default') $('input:first', $(td)).focus();
	};
	/*
	 * 触发下一个编辑单元格
	 */
	var nextEditShow = function nextEditShow() {
		var obj = this.newEditObj;
		var td = obj.td;
		var $tr = obj.$tr;
		var colIndex = parseInt(obj.colIndex) + 1;
		// 如果是最后一列则换行
		if ($(td).next('td').length == 0) {
			var $nextTr = $tr.next('tr');
			if ($nextTr.length > 0) {
				$tr = $nextTr;
				colIndex = 0;
				$tr.click(); //触发下一行的焦点
			} else {
				return;
			}
		}
		this.editRowFun($tr, colIndex);
	};
	var editValueChange = function editValueChange(field, value) {
		// 设置row的值为新值
		if (this.eidtRowIndex > -1 && this.eidtRowIndex < this.dataSourceObj.rows.length) {
			this.updateValueAt(this.eidtRowIndex, field, value);
		}
	};
	var re_updateEditRowIndex = function re_updateEditRowIndex(opType, opIndex, num) {
		if (this.eidtRowIndex < 0) return;
		if (opType == '-') {
			if (opIndex < this.eidtRowIndex) {
				this.eidtRowIndex--;
			} else if (opIndex == this.eidtRowIndex) {
				this.eidtRowIndex = -1;
			}
		} else if (opType == '+') {
			num === undefined && (num = 1);
			if (opIndex <= this.eidtRowIndex) {
				this.eidtRowIndex += num;
			}
		}
	};
	var re_updateValueAtEdit = function re_updateValueAtEdit(rowIndex, field, value, force) {
		if (this.eidtRowIndex == rowIndex) {
			if ($('#' + this.options.id + "_edit_field_" + field).length > 0) {
				if ($('#' + this.options.id + "_edit_field_" + field)[0].type == 'checkbox') {
					if (value == 'Y' || value == 'true') {
						$('#' + this.options.id + "_edit_field_" + field)[0].checked = true;
					} else {
						$('#' + this.options.id + "_edit_field_" + field)[0].checked = false;
					}
				} else {
					$('#' + this.options.id + "_edit_field_" + field)[0].value = value;
				}
			}
		}
	};
	/*
	 * 根据filed设置editType
	 */
	var setEditType = function setEditType(field, editType) {
		var gridCompColumn = this.getColumnByField(field);
		gridCompColumn.options.editType = editType;
	};
	/*
	 * 设置是否可修改
	 */
	var setEditable = function setEditable(editable) {
		this.options.editable = editable;
	};
	var edit_initEventFun = function edit_initEventFun() {
		var oThis = this;
		$(document).on('click', function (e) {
			if (oThis.options.editable && oThis.options.editType == 'default') {
				var $e = $(e.target);
				var flag = true;
				flag = $(e.target).closest('.u-grid-content-td-div').length > 0 ? false : flag;
				var cusStr = oThis.options.customEditPanelClass;
				if (cusStr) {
					var cArr = cusStr.split(',');
					$.each(cArr, function () {
						flag = $e.closest('.' + this).length > 0 ? false : flag;
					});
				}
				if ($e.attr('role') == 'grid-for-edit') {
					flag = false;
				}
				if (flag) {
					oThis.editClose();
				}
			}
		});

		u.on(document, 'scroll', function () {
			oThis.editClose();
		});
	};
	var setGridEditType = function setGridEditType(newEditType) {
		this.options.editType = newEditType;
	};
	var setGridEditTypeAndEditRow = function setGridEditTypeAndEditRow(newEditType, rowIndex, colIndex) {
		this.options.editType = newEditType;
		var $contentBody = $('#' + this.options.id + '_content_tbody');
		var $tr = $('tr:eq(' + rowIndex + ')', $contentBody);
		this.editRowFun($tr, colIndex);
	};
	exports.re_hideEditMenu = re_hideEditMenu;
	exports.re_clickFunEdit = re_clickFunEdit;
	exports.editRowFun = editRowFun;
	exports.editRowIndexFun = editRowIndexFun;
	exports.editRow = editRow;
	exports.re_editClose = re_editClose;
	exports.editCell = editCell;
	exports.nextEditShow = nextEditShow;
	exports.editValueChange = editValueChange;
	exports.re_updateEditRowIndex = re_updateEditRowIndex;
	exports.re_updateValueAtEdit = re_updateValueAtEdit;
	exports.setEditType = setEditType;
	exports.setEditable = setEditable;
	exports.edit_initEventFun = edit_initEventFun;
	exports.setGridEditType = setGridEditType;
	exports.setGridEditTypeAndEditRow = setGridEditTypeAndEditRow;

/***/ },
/* 24 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	exports.__esModule = true;
	exports.formEditCell = exports.re_editorRowChangeFun = exports.editForm_setRequired = exports.editForm_initDefault = undefined;

	var _gridCompInit = __webpack_require__(13);

	var editForm_initDefault = function editForm_initDefault() {
		// 扩展方法
		this.defaults = $.extend(true, {}, this.defaults, {
			noneEditableFormShow: true });
	};

	var editForm_setRequired = function editForm_setRequired(field, value) {
		// 扩展方法
		var oThis = this;
		$.each(this.gridCompColumnArr, function (i) {
			if (this.options.field == field) {
				this.options.required = value;
				if (!value) {
					$('#' + oThis.options.id + '_edit_' + this.options.field).parent().find('.u-grid-edit-mustFlag').hide();
				} else {
					$('#' + oThis.options.id + '_edit_' + this.options.field).parent().find('.u-grid-edit-mustFlag').show();
				}
			}
		});
	};

	var re_editorRowChangeFun = function re_editorRowChangeFun() {
		if ($('#' + this.options.id + '_edit_form').length > 0) {
			var h = $('#' + this.options.id + '_edit_form')[0].offsetHeight;
			$('#' + this.options.id + '_numCol_edit').css('height', h);
			$('#' + this.options.id + '_multiSelect_edit').css('height', h);
		}
	};
	/*
	 * form形式下编辑单元格
	 */
	var formEditCell = function formEditCell(value, field, title, required, headerColor) {
		// 创建lable
		var st = title + '';
		if (st.lengthb() > 28) {
			st = st.substrCH(26) + '...';
		}
		var htmlStr = '<div class="u-grid-edit-whole-div"><div class="u-grid-edit-label"><div title="' + title + '" style="color:' + headerColor + '">' + st + '<span style="color:red;' + (!required ? 'display: none' : '') + '" class="u-grid-edit-mustFlag">*</span></div></div>'; // 创建编辑区域
		htmlStr += '<div id="' + this.options.id + '_edit_' + field + '" class="u-grid-edit-div"></div>';
		htmlStr += '</div>';
		return htmlStr;
	};
	exports.editForm_initDefault = editForm_initDefault;
	exports.editForm_setRequired = editForm_setRequired;
	exports.re_editorRowChangeFun = re_editorRowChangeFun;
	exports.formEditCell = formEditCell;

/***/ },
/* 25 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	exports.__esModule = true;
	exports.re_widthChangeGridFunFixed = exports.re_createContentOneRowFixed = exports.re_createContentTableFixed = exports.re_createHeaderTableFixed = exports.fixed_columnsVisibleFun = exports.re_initGridCompFixedColumn = undefined;

	var _gridCompOther = __webpack_require__(19);

	/*
	 * 将固定列放入gridCompColumnFixedArr
	 */
	var re_initGridCompFixedColumn = function re_initGridCompFixedColumn() {
		var oThis = this;
		var w = 0;
		$.each(this.gridCompColumnArr, function (i) {
			if (this.options.fixed == true) {
				oThis.gridCompColumnFixedArr.push(this);
			}
		});
		$.each(this.gridCompColumnFixedArr, function (i) {
			for (var i = oThis.gridCompColumnArr.length; i > -1; i--) {
				if (oThis.gridCompColumnArr[i] == this) {
					oThis.gridCompColumnArr.splice(i, 1);
					break;
				}
			}
		});
	};

	var fixed_columnsVisibleFun = function fixed_columnsVisibleFun() {
		// 扩展方法
		var oThis = this,
		    fixW = 0;
		$.each(this.gridCompColumnFixedArr, function () {
			if (this.options.visible) {
				fixW += parseInt(this.options.width);
				this.firstColumn = oThis.firstColumn;
				oThis.firstColumn = false;
			}
		});
		this.fixedRealWidth = fixW;
	};

	var re_createHeaderTableFixed = function re_createHeaderTableFixed() {
		return this.createHeaderTable('fixed');
	};

	var re_createContentTableFixed = function re_createContentTableFixed() {
		return this.createContentTable('fixed');
	};
	var re_createContentOneRowFixed = function re_createContentOneRowFixed(rowObj) {
		return this.createContentOneRow(rowObj, 'fixed');
	};
	var re_widthChangeGridFunFixed = function re_widthChangeGridFunFixed(halfWholeWidth) {
		// 固定区域宽度不大于整体宽度的一半
		if (this.fixedRealWidth > halfWholeWidth) {
			this.fixedWidth = halfWholeWidth;
		} else {
			this.fixedWidth = this.fixedRealWidth;
		}
	};
	exports.re_initGridCompFixedColumn = re_initGridCompFixedColumn;
	exports.fixed_columnsVisibleFun = fixed_columnsVisibleFun;
	exports.re_createHeaderTableFixed = re_createHeaderTableFixed;
	exports.re_createContentTableFixed = re_createContentTableFixed;
	exports.re_createContentOneRowFixed = re_createContentOneRowFixed;
	exports.re_widthChangeGridFunFixed = re_widthChangeGridFunFixed;

/***/ },
/* 26 */
/***/ function(module, exports) {

	'use strict';

	exports.__esModule = true;
	/*
	 * 创建form形式下div
	 */
	var createFromDivs = function createFromDivs() {
		if (this.createFormFlag) {
			return;
		}
		var htmlStr = '<div id="' + this.options.id + '_form" class="u-grid-form">';
		htmlStr += this.createFromContent();
		$('#' + this.options.id)[0].insertAdjacentHTML('afterBegin', htmlStr);
		this.createFormFlag = true;
	};

	/*
	 * 创建form形式下内容区域
	 */
	var createFromContent = function createFromContent() {
		var htmlStr = '<div class="u-grid-form-content" id="' + this.options.id + '_form_content" class="u-grid-content">';
		htmlStr += '<table role="grid" id="' + this.options.id + '_form_content_table">';
		htmlStr += this.createFormContentRows();
		htmlStr += '</table>';
		return htmlStr;
	};

	/*
	 * 创建form形式下内容区域所有行
	 */
	var createFormContentRows = function createFormContentRows() {
		var oThis = this,
		    htmlStr = "";
		// 遍历生成所有行
		if (this.dataSourceObj.rows) {
			htmlStr += '<tbody role="rowgroup" id="' + this.options.id + '_form_content_tbody">';
			$.each(this.dataSourceObj.rows, function () {
				htmlStr += '<tr role="row"><td role="rowcell">';
				var value = this.value;
				$.each(oThis.gridCompColumnArr, function () {
					var f = this.options.field,
					    t = this.options.title,
					    v = $(value).attr(f);
					htmlStr += '<div>' + t + ':</div>';
					htmlStr += '<div>' + v + '</div>';
				});
				htmlStr += '</td></tr>';
			});
			htmlStr += '</tbody>';
		}
		return htmlStr;
	};

	/*
	 * 整体宽度改变处理(form形式)
	 */
	var widthChangeFormFun = function widthChangeFormFun() {
		this.createFromDivs();
		$('#' + this.options.id + '_grid').css('display', 'none');
		$('#' + this.options.id + '_form').css('display', 'block');
		this.showType = 'form';
		if (typeof this.options.afterCreate == 'function') {
			this.options.afterCreate.call(this);
		}
	};
	exports.createFromDivs = createFromDivs;
	exports.createFromContent = createFromContent;
	exports.createFormContentRows = createFormContentRows;
	exports.widthChangeFormFun = widthChangeFormFun;

/***/ },
/* 27 */
/***/ function(module, exports) {

	'use strict';

	exports.__esModule = true;
	var re_resetThVariableHeaderLevel = function re_resetThVariableHeaderLevel() {
		var oThis = this,
		    oldParentHeaderStr = '',
		    parentWidth = 0;
		$('#' + this.options.id + '_header_table th', this.$ele).each(function (i) {
			var gridCompColumn = oThis.gridCompColumnArr[i];
			var parentHeaderStr = oThis.getString(gridCompColumn.options.parentHeader, '');
			var w = 0;
			if (gridCompColumn.options.visible) {
				w = gridCompColumn.options.width;
			}
			// 处理多表头
			if (oldParentHeaderStr != '' && parentHeaderStr != oldParentHeaderStr) {
				// 上一个父项结束
				// 设置宽度
				$('#' + oThis.options.id + oldParentHeaderStr).css('width', parentWidth - 1 + 'px');
			}
			if (parentHeaderStr != '') {
				var parentHeaderTitleStr = oThis.getLevelTitleByField(parentHeaderStr);
				if (parentHeaderStr != oldParentHeaderStr) {
					//一个新的父项开始
					parentWidth = 0;
					if (!oThis.parentFlag) {
						//只添加一次
						var htmlStr = '<div id="' + oThis.options.id + parentHeaderStr + '" class="u-gird-parent"><div class="u-grid-header-link" title="' + parentHeaderTitleStr + '">' + parentHeaderTitleStr + '</div></div>';
						this.insertAdjacentHTML('afterBegin', htmlStr);
					}
				}
				parentWidth += w;
			}
			oldParentHeaderStr = parentHeaderStr;
		});
		if (oldParentHeaderStr != '') {
			$('#' + oThis.options.id + oldParentHeaderStr).css('width', parentWidth - 1 + 'px');
		}
		this.parentFlag = true;
	};

	var re_initGridCompColumnHeaderLevelFun = function re_initGridCompColumnHeaderLevelFun(columnOptions) {
		// 扩展方法
		if (columnOptions.headerLevel > 1) {
			this.gridCompLevelColumn.push(columnOptions);
			var oldLength = this.gridCompColumnArr.length;
			this.gridCompColumnArr.length = oldLength - 1;
			if (this.basicGridCompColumnArr && this.basicGridCompColumnArr.length > 0) {
				this.basicGridCompColumnArr.length = oldLength - 1;
			}
		}
	};
	/*
	 * 按照hiddenLevel对column进行排序
	 */
	var initGridHiddenLevelColumn = function initGridHiddenLevelColumn() {
		if (!this.options.overWidthHiddenColumn) return;
		var oThis = this;
		var w = 0;

		this.gridCompHiddenLevelColumnArr = this.gridCompColumnArr.slice(0);

		this.gridCompHiddenLevelColumnArr.sort(function (a, b) {
			var hiddenLevel1 = a.options.hiddenLevel;
			var hiddenLevel2 = b.options.hiddenLevel;
			if (hiddenLevel1 > hiddenLevel2) {
				return -1;
			} else {
				return 1;
			}
		});
	};

	var getLevelTitleByField = function getLevelTitleByField(field) {
		for (var i = 0; i < this.gridCompLevelColumn.length; i++) {
			var columnField = this.gridCompLevelColumn[i].field;
			if (columnField == field) {
				return this.gridCompLevelColumn[i].title;
			}
		}
		return '';
	};
	exports.re_resetThVariableHeaderLevel = re_resetThVariableHeaderLevel;
	exports.re_initGridCompColumnHeaderLevelFun = re_initGridCompColumnHeaderLevelFun;
	exports.initGridHiddenLevelColumn = initGridHiddenLevelColumn;
	exports.getLevelTitleByField = getLevelTitleByField;

/***/ },
/* 28 */
/***/ function(module, exports) {

	"use strict";

	exports.__esModule = true;
	var re_initGridCompColumnLoacl = function re_initGridCompColumnLoacl() {
		var oThis = this,
		    localGridCompColumnArr = this.getGridCompColumnArrFromLocal();
		// 获取本地缓存中的数据
		if (localGridCompColumnArr != null) {
			this.gridCompColumnArr = localGridCompColumnArr;
			$.each(this.gridCompColumnArr, function () {
				var field = this.options.field;
				for (var i = 0; i < oThis.options.columns.length; i++) {
					var c = oThis.options.columns[i];
					if (c.field == field) {
						var options = $.extend({}, c, this.options);
						this.options = options;
						this.options.realWidth = this.options.width;
						break;
					}
				}
			});
		}
	};
	/*
	 * 获取本地个性化存储的设置
	 */
	var getLocalData = function getLocalData() {
		return null; //暂时不用缓存
		if (window.localStorage == null) return null;
		if (this.$sd_storageData != null) return this.$sd_storageData;else {
			if (window.localStorage.getItem(this.localStorageId) == null) {
				try {
					window.localStorage.setItem(this.localStorageId, "{}");
				} catch (e) {
					return null;
				}
			}
			var storageDataStr = window.localStorage.getItem(this.localStorageId);
			if (typeof JSON == "undefined") this.$sd_storageData = eval("(" + storageDataStr + ")");else this.$sd_storageData = JSON.parse(storageDataStr);
			return this.$sd_storageData;
		}
	};
	/*
	 * 保存本地个性化存储的设置
	 */
	var saveLocalData = function saveLocalData() {
		return null; //暂时不用缓存
		var oThis = this;
		if (this.saveSettimeout) {
			clearTimeout(this.saveSettimeout);
		}
		this.saveSettimeout = setTimeout(function () {
			if (oThis.$sd_storageData == null || window.localStorage == null) return;
			var strogeDataStr = JSON.stringify(oThis.$sd_storageData);
			try {
				window.localStorage.setItem(oThis.localStorageId, strogeDataStr);
			} catch (e) {}
		}, 200);
	};
	/*
	 * 清除本地个性化存储的设置
	 */
	var clearLocalData = function clearLocalData() {
		return null; //暂时不用缓存
		if (this.saveSettimeout) {
			clearTimeout(this.saveSettimeout);
		}
		window.localStorage.setItem(this.localStorageId, "{}");
		this.$sd_storageData = {};
	};
	/*
	 * 将数据列顺序保存至本地个性化存储
	 */
	var saveGridCompColumnArrToLocal = function saveGridCompColumnArrToLocal() {
		return null; //暂时不用缓存
		var defData = this.getLocalData();
		defData["gridCompColumnArr"] = this.gridCompColumnArr.concat(this.gridCompColumnFixedArr);
		this.saveLocalData();
	};
	/*
	 * 从本地个性化存储中取出数据列顺序
	 */
	var getGridCompColumnArrFromLocal = function getGridCompColumnArrFromLocal() {
		return null; //暂时不用缓存
		var defData = this.getLocalData();
		if (defData == null) return null;
		if (defData["gridCompColumnArr"] == null) return null;
		return defData["gridCompColumnArr"];
	};
	exports.re_initGridCompColumnLoacl = re_initGridCompColumnLoacl;
	exports.getLocalData = getLocalData;
	exports.saveLocalData = saveLocalData;
	exports.clearLocalData = clearLocalData;
	exports.saveGridCompColumnArrToLocal = saveGridCompColumnArrToLocal;
	exports.getGridCompColumnArrFromLocal = getGridCompColumnArrFromLocal;

/***/ },
/* 29 */
/***/ function(module, exports) {

	"use strict";

	exports.__esModule = true;
	var re_initGridHiddenLevelColumn = function re_initGridHiddenLevelColumn() {
		if (!this.options.overWidthHiddenColumn) return;
		var oThis = this;
		var w = 0;

		this.gridCompHiddenLevelColumnArr = this.gridCompColumnArr.slice(0);

		this.gridCompHiddenLevelColumnArr.sort(function (a, b) {
			var hiddenLevel1 = a.options.hiddenLevel;
			var hiddenLevel2 = b.options.hiddenLevel;
			if (hiddenLevel1 > hiddenLevel2) {
				return -1;
			} else {
				return 1;
			}
		});
	};
	var re_widthChangeGridFunOverWidthHidden = function re_widthChangeGridFunOverWidthHidden() {
		if (this.options.overWidthHiddenColumn) {
			this.lastVisibleColumn.options.width = this.lastVisibleColumn.options.realWidth;
			var wholeWidth = parseInt(this.wholeWidth) - parseInt(this.leftW);
			var columnWholeWidth = parseInt(this.fixedWidth) + parseInt(this.contentRealWidth);
			if (columnWholeWidth > wholeWidth) {
				for (var i = 0; i < this.gridCompHiddenLevelColumnArr.length; i++) {
					var column = this.gridCompHiddenLevelColumnArr[i];
					if (column.options.visible) {
						column.options.visible = false;
						columnWholeWidth = columnWholeWidth - column.options.width;
					}
					if (!(columnWholeWidth > wholeWidth)) {
						break;
					}
				}
				this.columnsVisibleFun();
			} else {
				for (var i = this.gridCompHiddenLevelColumnArr.length - 1; i > -1; i--) {
					var column = this.gridCompHiddenLevelColumnArr[i];
					if (!column.options.visible) {
						columnWholeWidth = columnWholeWidth + column.options.width;
						if (columnWholeWidth > wholeWidth) {
							break;
						}
						column.options.visible = true;
					}
				}
				this.columnsVisibleFun();
			}
		}
	};
	exports.re_initGridHiddenLevelColumn = re_initGridHiddenLevelColumn;
	exports.re_widthChangeGridFunOverWidthHidden = re_widthChangeGridFunOverWidthHidden;

/***/ },
/* 30 */
/***/ function(module, exports) {

	'use strict';

	exports.__esModule = true;

	var re_createContentRowsSumRow = function re_createContentRowsSumRow(createFlag) {
		var htmlStr = '';
		if (this.options.showSumRow && this.dataSourceObj.rows && this.dataSourceObj.rows.length > 0) {
			htmlStr += this.createSumRow(createFlag);
		}
		return htmlStr;
	};
	var re_createContentSumRow = function re_createContentSumRow(bottonStr) {
		var htmlStr = '';
		if (this.options.showSumRow) {
			htmlStr += '<div class="u-grid-content-left-sum-bottom" id="' + this.options.id + '_content_left_sum_bottom" style="width:' + (this.leftW + this.fixedWidth) + 'px;' + bottonStr + '">';
			htmlStr += '</div>';
		}
		return htmlStr;
	};
	/*
	 * 创建合计行
	 */
	var createSumRow = function createSumRow(createFlag) {
		if (this.options.showSumRow) {
			var oThis = this,
			    idStr,
			    gridCompColumnArr;
			if (createFlag == 'fixed') {
				idStr = 'fixed_';
				gridCompColumnArr = this.gridCompColumnFixedArr;
			} else {
				idStr = '';
				gridCompColumnArr = this.gridCompColumnArr;
			}
			var t = parseInt(this.wholeHeight) - this.exceptContentHeight - 48 - this.scrollBarHeight;
			t = t > 0 ? t : 0;
			var htmlStr = '<tr role="row" class="u-grid-content-sum-row" id="' + this.options.id + '_content_' + idStr + 'sum_row" style="top:' + t + 'px;">';
			$.each(gridCompColumnArr, function () {
				var f = this.options.field;
				var precision = this.options.precision;
				var dataType = this.options.dataType;
				var sumValue = oThis.dataSourceObj.getSumValue(f, this, oThis);
				if (dataType == 'float') {
					var o = {};
					o.value = sumValue;
					o.precision = precision ? precision : 2;
					sumValue = oThis.DicimalFormater(o);
				}
				var tdStyle = '';
				if (!this.options.visible) {
					tdStyle = 'style="display:none;"';
				}
				htmlStr += '<td role="rowcell" title="' + sumValue + '" ' + tdStyle + '>';
				if (this.firstColumn) {
					htmlStr += '<div class="u-gird-centent-sum-div"><span>' + oThis.transMap.ml_sum + '</span></div>';
				}
				var contentStyle = '';
				if (this.options.dataType == 'integer' || this.options.dataType == 'float') {
					contentStyle = 'style="text-align: right;"';
				}
				htmlStr += '<div class="u-grid-content-td-div" ' + contentStyle + '><span value="' + sumValue + '">' + sumValue + '</span></div></td>';
			});
			htmlStr += '</tr>';
			return htmlStr;
		}
	};

	/*
	 * 创建合计行 for ie
	 */
	var createSumRowForIE = function createSumRowForIE(table, createFlag) {
		if (this.options.showSumRow) {
			var oThis = this,
			    idStr,
			    gridCompColumnArr;
			if (createFlag == 'fixed') {
				idStr = 'fixed_';
				gridCompColumnArr = this.gridCompColumnFixedArr;
			} else {
				idStr = '';
				gridCompColumnArr = this.gridCompColumnArr;
			}
			var t = parseInt(this.wholeHeight) - this.exceptContentHeight - 48 - this.scrollBarHeight;
			t = t > 0 ? t : 0;
			var row = table.insertRow();
			row.row = 'row';
			row.className = 'u-grid-content-sum-row';
			row.id = this.options.id + '_content_' + idStr + 'sum_row';
			row.style.top = t + 'px';
			$.each(gridCompColumnArr, function () {
				var f = this.options.field;
				var precision = this.options.precision;
				var dataType = this.options.dataType;
				var sumValue = oThis.dataSourceObj.getSumValue(f, this, oThis);
				if (dataType == 'float') {
					var o = {};
					o.value = sumValue;
					o.precision = precision ? precision : 2;
					sumValue = oThis.DicimalFormater(o);
				}
				var newCell = row.insertCell();
				newCell.role = 'rowcell';
				newCell.title = sumValue;
				var contentStyle = '';
				if (this.options.dataType == 'integer' || this.options.dataType == 'float') {
					contentStyle = 'style="text-align: right;"';
				}

				var htmlStr = '<div class="u-grid-content-td-div" ' + contentStyle + '>';
				if (this.firstColumn) {
					htmlStr += '<div class="u-gird-centent-sum-div"><span>' + oThis.transMap.ml_sum + '</span></div>';
				}
				htmlStr += '<span value="' + sumValue + '">' + sumValue + '</span></div>';
				newCell.insertAdjacentHTML('afterBegin', htmlStr);
			});
		}
	};
	/*
	 * 重画合计行
	 */
	var re_repairSumRow = function re_repairSumRow() {
		if (this.options.showSumRow) {
			$('#' + this.options.id + '_content_div tbody .u-grid-content-sum-row').remove();
			$('#' + this.options.id + '_content_fixed_div tbody .u-grid-content-sum-row').remove();
			try {
				if (this.dataSourceObj.rows && this.dataSourceObj.rows.length > 0) {
					var htmlStr = this.createSumRow();
					$('#' + this.options.id + '_content_div tbody')[0].insertAdjacentHTML('beforeEnd', htmlStr);
					var htmlStr = this.createSumRow('fixed');
					if ($('#' + this.options.id + '_content_fixed_div tbody')[0]) $('#' + this.options.id + '_content_fixed_div tbody')[0].insertAdjacentHTML('beforeEnd', htmlStr);
				}
			} catch (e) {
				var table = $('#' + this.options.id + '_content_div table')[0];
				var fixedTable = $('#' + this.options.id + '_content_fixed_div table')[0];
				this.createSumRowForIE(table);
				this.createSumRowForIE(table, 'fixed');
			}
			this.renderSumRow();
		}
	};

	var renderSumRow = function renderSumRow() {
		var oThis = this;
		$.each(this.gridCompColumnFixedArr, function (i) {
			var sumCol = this.options.sumCol;
			var sumRenderType = this.options.sumRenderType;
			var idStr = 'fixed_';
			if (sumCol) {
				var sumSpans = $('#' + oThis.options.id + '_content_' + idStr + 'sum_row').find('td').eq(i).find('span');
				var sumSpan = sumSpans[sumSpans.length - 1];
				if (sumSpan) {
					if (typeof sumRenderType == 'function') {
						var sumV = $(sumSpan).attr('value');
						var obj = {};
						obj.value = sumV;
						obj.element = sumSpan;
						obj.gridObj = oThis;
						obj.gridCompColumn = this;
						sumRenderType.call(oThis, obj);
					} else if (dataType == 'integer' || dataType == 'float') {
						sumSpan.style.textAlign = 'right';
					}
				}
			}
		});
		$.each(this.gridCompColumnArr, function (i) {
			var sumCol = this.options.sumCol;
			var sumRenderType = this.options.sumRenderType;
			var idStr = '';
			if (sumCol) {
				var sumSpans = $('#' + oThis.options.id + '_content_' + idStr + 'sum_row').find('td').eq(i).find('span');
				var sumSpan = sumSpans[sumSpans.length - 1];
				if (sumSpan) {
					if (typeof sumRenderType == 'function') {
						var sumV = $(sumSpan).attr('value');
						var obj = {};
						obj.value = sumV;
						obj.element = sumSpan;
						obj.gridObj = oThis;
						obj.gridCompColumn = this;
						sumRenderType.call(oThis, obj);
					} else if (dataType == 'integer' || dataType == 'float') {
						sumSpan.style.textAlign = 'right';
					}
				}
			}
		});
	};

	var re_renderTypeSumRow = function re_renderTypeSumRow(gridCompColumn, i, begin, length, isFixedColumn) {
		var oThis = this;
		var sumCol = gridCompColumn.options.sumCol;
		var sumRenderType = gridCompColumn.options.sumRenderType;
		var dataType = gridCompColumn.options.dataType;
		var idStr = isFixedColumn === true ? 'fixed_' : '';
		if (sumCol) {
			var sumSpans = $('#' + this.options.id + '_content_' + idStr + 'sum_row').find('td').eq(i).find('span');
			var sumSpan = sumSpans[sumSpans.length - 1];
			if (sumSpan) {
				if (typeof sumRenderType == 'function') {
					var sumV = $(sumSpan).attr('value');
					var obj = {};
					obj.value = sumV;
					obj.element = sumSpan;
					obj.gridObj = oThis;
					obj.gridCompColumn = gridCompColumn;
					sumRenderType.call(oThis, obj);
				} else if (dataType == 'integer' || dataType == 'float') {
					sumSpan.style.textAlign = 'right';
				}
			}
		}
	};
	exports.re_createContentRowsSumRow = re_createContentRowsSumRow;
	exports.re_createContentSumRow = re_createContentSumRow;
	exports.createSumRow = createSumRow;
	exports.createSumRowForIE = createSumRowForIE;
	exports.re_repairSumRow = re_repairSumRow;
	exports.renderSumRow = renderSumRow;
	exports.re_renderTypeSumRow = re_renderTypeSumRow;

/***/ },
/* 31 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	exports.__esModule = true;
	exports.swapColumnEnd = exports.swapColumnFun = exports.swapColumnStart = exports.swap_initGridEventFun = exports.swap_initEventFun = undefined;

	var _gridCompEvent = __webpack_require__(4);

	var swap_initEventFun = function swap_initEventFun() {
		// 扩展方法
		var oThis = this;
		$('#' + this.options.id).on('mousedown', function (e) {
			if ($(e.target).closest('#' + oThis.options.id + '_header').length > 0) {
				// 点击的是header区域
				var eleTh = $(e.target).closest('th')[0];
				if (oThis.options.canSwap) {
					oThis.swapColumnStart(e, eleTh);
				}
				e.preventDefault();
			} else if ($(e.target).closest('#' + oThis.options.id + '_content').length > 0) {
				// 点击的是数据区域
			}
		});

		$('#' + this.options.id).on('mousemove', function (e) {
			oThis.mouseMoveX = e.clientX;
			oThis.mouseMoveY = e.clientY;
			if ((oThis.mouseMoveX != oThis.mouseDownX || oThis.mouseDownY != oThis.mouseMoveY) && oThis.mouseDownX != 'mouseDownX' && oThis.options.canSwap) {
				// 鼠标按下之后移动了
				oThis.swapColumnFlag = true;
			}
			oThis.swapColumnFun(e);
			e.stopPropagation();
		});

		$('#' + this.options.id + '_top').on('mousemove', function (e) {
			oThis.mouseMoveX = e.clientX;
			oThis.mouseMoveY = e.clientY;
			if ((oThis.mouseMoveX != oThis.mouseDownX || oThis.mouseDownY != oThis.mouseMoveY) && oThis.mouseDownX != 'mouseDownX' && oThis.options.canSwap) {
				// 鼠标按下之后移动了
				oThis.swapColumnFlag = true;
			}
			oThis.swapColumnFun(e);
			e.stopPropagation();
		});

		$('#' + this.options.id).on('mouseup', function (e) {
			oThis.mouseUpX = e.clientX;
			oThis.mouseUpY = e.clientY;
			oThis.swapColumnEnd(e);
			oThis.mouseUpX = 'mouseUpX';
			oThis.mouseUpY = 'mouseUpY';
			oThis.mouseDownX = 'mouseDownX';
			oThis.mouseDownY = 'mouseDownY';
			oThis.mouseMoveX = 'mouseMoveX';
			oThis.mouseMoveY = 'mouseMoveY';
		});

		$('#' + this.options.id + '_top').on('mouseup', function (e) {
			oThis.mouseUpX = e.clientX;
			oThis.mouseUpY = e.clientY;
			oThis.swapColumnEnd(e);
			oThis.mouseUpX = 'mouseUpX';
			oThis.mouseUpY = 'mouseUpY';
			oThis.mouseDownX = 'mouseDownX';
			oThis.mouseDownY = 'mouseDownY';
			oThis.mouseMoveX = 'mouseMoveX';
			oThis.mouseMoveY = 'mouseMoveY';
		});
	};

	var swap_initGridEventFun = function swap_initGridEventFun() {
		// 扩展方法
		var oThis = this;
	};

	/*
	 * 交换列位置开始，并不修改swapColumnFlag，当移动的时候才修改swapColumnFlag
	 */
	var swapColumnStart = function swapColumnStart(e, ele) {
		if (!this.options.canSwap) {
			return;
		}
		this.swapColumnEle = ele;
		this.swapColumnStartX = e.clientX;
		this.swapColumnStartY = e.clientY;
	};
	/*
	 * 交换位置
	 */
	var swapColumnFun = function swapColumnFun(e) {
		if (!this.options.canSwap) {
			return;
		}
		var oThis = this;
		if (this.swapColumnFlag) {
			var nowTh = this.swapColumnEle,
			    $nowTh = $(nowTh),
			    nowGridCompColumn = nowTh.gridCompColumn;
			//创建拖动区域
			if ($('#' + this.options.id + '_clue').length == 0) {
				var $d = $('<div class="u-grid u-grid-header-drag-clue" id="' + this.options.id + '_clue" />').css({
					width: nowTh.scrollWidth + "px",
					left: nowTh.attrLeftTotalWidth - oThis.scrollLeft + oThis.leftW + oThis.fixedWidth + "px",
					top: "0px",
					paddingLeft: $nowTh.css("paddingLeft"),
					paddingRight: $nowTh.css("paddingRight"),
					lineHeight: $nowTh.height() + "px",
					paddingTop: $nowTh.css("paddingTop"),
					paddingBottom: $nowTh.css("paddingBottom")
				}).html(nowGridCompColumn.options.title || nowGridCompColumn.options.field).prepend('<span class="uf uf-bancirclesymbol u-grid-header-drag-status" />');
				try {
					$('#' + this.options.id)[0].insertAdjacentElement('afterBegin', $d[0]);
				} catch (e) {
					$('#' + this.options.id)[0].insertBefore($d[0], $('#' + this.options.id)[0].firstChild);
				}
				$d.on('mousemove', function () {
					e.stopPropagation();
				});
			}
			this.swapColumnEndX = e.clientX;
			this.swapColumnEndY = e.clientY;
			var changeX = this.swapColumnEndX - this.swapColumnStartX,
			    changeY = this.swapColumnEndY - this.swapColumnStartY;
			$('#' + this.options.id + '_clue').css({
				left: nowTh.attrLeftTotalWidth + changeX - oThis.scrollLeft + oThis.leftW + oThis.fixedWidth + "px",
				top: changeY + "px"
			});

			// 创建提示div
			if ($('#' + this.options.id + '_swap_top').length == 0) {
				var $d = $('<span class="uf uf-sortdown u-grid-header-swap-tip-span"  id="' + this.options.id + '_swap_top"/>');
				$d.css({
					top: $nowTh.height() - 6 + 'px'
				});
				var $d1 = $('<span class="uf uf-sortup u-grid-header-swap-tip-span" id="' + this.options.id + '_swap_down" />');
				$d1.css({
					top: '6px'
				});
				try {
					$('#' + this.options.id)[0].insertAdjacentElement('afterBegin', $d[0]);
					$('#' + this.options.id)[0].insertAdjacentElement('afterBegin', $d1[0]);
				} catch (e) {
					$('#' + this.options.id)[0].insertBefore($d[0], $('#' + this.options.id)[0].firstChild);
					$('#' + this.options.id)[0].insertBefore($d1[0], $('#' + this.options.id)[0].firstChild);
				}
			}
			this.canSwap = false;
			$('#' + this.options.id + '_header_table th').each(function (i) {
				var left = $(this).offset().left,
				    right = left + parseInt(this.attrWidth);
				if (i == 0 && e.clientX < left) {
					// 移动到最左边
					if (oThis.swapColumnEle != this) {
						oThis.swapToColumnEle = 'LeftEle';
						$('#' + oThis.options.id + '_swap_top').css({
							left: -oThis.scrollLeft - 3 + oThis.leftW + oThis.fixedWidth + 'px',
							display: 'block'
						});
						$('#' + oThis.options.id + '_swap_down').css({
							left: -oThis.scrollLeft - 3 + oThis.leftW + oThis.fixedWidth + 'px',
							display: 'block'
						});
					}
					oThis.canSwap = true;
				} else if (left < e.clientX && e.clientX < right) {
					if (oThis.swapColumnEle != this && parseInt($(this).attr('index')) + 1 != parseInt($(oThis.swapColumnEle).attr('index'))) {
						if (oThis.swapToColumnEle != this) {
							oThis.swapToColumnEle = this;
							$('#' + oThis.options.id + '_swap_top').css({
								left: this.attrRightTotalWidth - oThis.scrollLeft - 3 + oThis.leftW + oThis.fixedWidth + 'px',
								display: 'block'
							});
							$('#' + oThis.options.id + '_swap_down').css({
								left: this.attrRightTotalWidth - oThis.scrollLeft - 3 + oThis.leftW + oThis.fixedWidth + 'px',
								display: 'block'
							});
						}
						oThis.canSwap = true;
						return false;
					}
				}
			});
			if (this.canSwap) {
				$('.u-grid-header-drag-status').removeClass('uf-bancirclesymbol').addClass('uf-plussigninablackcircle');
			} else {
				$('#' + this.options.id + '_swap_top').css('display', 'none');
				$('#' + this.options.id + '_swap_down').css('display', 'none');
				$('.u-grid-header-drag-status').removeClass('uf-plussigninablackcircle').addClass('uf-bancirclesymbol');
				this.swapToColumnEle = null;
			}
			$('#' + this.options.id + '_top').css('display', 'block');
		}
	};
	/*
	 * 交换位置结束
	 */
	var swapColumnEnd = function swapColumnEnd(e) {
		if (!this.options.canSwap) {
			return;
		}
		var oThis = this;
		if (this.swapColumnFlag) {
			if (this.swapToColumnEle) {
				var swapColumnEle = this.swapColumnEle,
				    swapToColumnEle = this.swapToColumnEle,
				    swapColumnIndex = $(swapColumnEle).attr('index'),
				    swapToColumnIndex = $(swapToColumnEle).attr('index'),
				    swapGridCompColumn = this.gridCompColumnArr[swapColumnIndex];
				this.gridCompColumnArr.splice(parseInt(swapToColumnIndex) + 1, 0, swapGridCompColumn);
				if (swapColumnIndex < swapToColumnIndex) this.gridCompColumnArr.splice(swapColumnIndex, 1);else this.gridCompColumnArr.splice(parseInt(swapColumnIndex) + 1, 1);
				this.saveGridCompColumnArrToLocal();
				this.repaintGridDivs();
			}
			$('#' + this.options.id + '_clue').remove();
			$('#' + this.options.id + '_swap_top').css('display', 'none');
			$('#' + this.options.id + '_swap_down').css('display', 'none');
		}
		this.swapColumnFlag = false;
		$('#' + this.options.id + '_top').css('display', 'none');
	};
	exports.swap_initEventFun = swap_initEventFun;
	exports.swap_initGridEventFun = swap_initGridEventFun;
	exports.swapColumnStart = swapColumnStart;
	exports.swapColumnFun = swapColumnFun;
	exports.swapColumnEnd = swapColumnEnd;

/***/ }
/******/ ]);