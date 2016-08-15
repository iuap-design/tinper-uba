( function( factory ) {
	if ( typeof define === "function" && define.amd ) {
		// AMD. Register as an anonymous module.
		define(["jquery", "knockout"], factory );
	} else {
		// Browser globals
		factory($, ko);
	}
}( function($, ko) {
+ function($) {
	'use strict'
	
	var Class = function(o) {
		if (!(this instanceof Class) && isFunction(o)) {
			return classify(o)
		}
	}

// Create a new Class.
//
//  var SuperPig = Class.create({
//    Extends: Animal,
//    Implements: Flyable,
//    initialize: function() {
//      SuperPig.superclass.initialize.apply(this, arguments)
//    },
//    Statics: {
//      COLOR: 'red'
//    }
// })
//
	Class.create = function(parent, properties) {
		if (!isFunction(parent)) {
			properties = parent
			parent = null
		}

		properties || (properties = {})
		parent || (parent = properties.Extends || Class)
		properties.Extends = parent

		// The created class constructor
		function SubClass() {
			// Call the parent constructor.
			parent.apply(this, arguments)

			// Only call initialize in self constructor.
			if (this.constructor === SubClass && this.initialize) {
				this.initialize.apply(this, arguments)
			}
		}

		// Inherit class (static) properties from parent.
		if (parent !== Class) {
			mix(SubClass, parent, parent.StaticsWhiteList)
		}

		// Add instance properties to the subclass.
		implement.call(SubClass, properties)

		// Make subclass extendable.
		return classify(SubClass)
	}

	function implement(properties) {
		var key, value

		for (key in properties) {
			value = properties[key]

			if (Class.Mutators.hasOwnProperty(key)) {
				Class.Mutators[key].call(this, value)
			} else {
				this.prototype[key] = value
			}
		}
	}


	// Create a sub Class based on `Class`.
	Class.extend = function(properties) {
		properties || (properties = {})
		properties.Extends = this

		return Class.create(properties)
	}


	function classify(cls) {
		cls.extend = Class.extend
		cls.implement = implement
		return cls
	}


	// Mutators define special properties.
	Class.Mutators = {

		'Extends': function(parent) {
			var existed = this.prototype
			var proto = createProto(parent.prototype)

			// Keep existed properties.
			mix(proto, existed)

			// Enforce the constructor to be what we expect.
			proto.constructor = this

			// Set the prototype chain to inherit from `parent`.
			this.prototype = proto

			// Set a convenience property in case the parent's prototype is
			// needed later.
			this.superclass = parent.prototype
		},

		'Implements': function(items) {
			isArray(items) || (items = [items])
			var proto = this.prototype,
				item

			while (item = items.shift()) {
				mix(proto, item.prototype || item)
			}
		},

		'Statics': function(staticProperties) {
			mix(this, staticProperties)
		}
	}


	// Shared empty constructor function to aid in prototype-chain creation.
	function Ctor() {}

	// See: http://jsperf.com/object-create-vs-new-ctor
	var createProto = Object.__proto__ ?
		function(proto) {
			return {
				__proto__: proto
			}
		} :
		function(proto) {
			Ctor.prototype = proto
			return new Ctor()
		}


	// Helpers
	// ------------

	function mix(r, s, wl) {
		// Copy "all" properties including inherited ones.
		for (var p in s) {
			if (s.hasOwnProperty(p)) {
				if (wl && indexOf(wl, p) === -1) continue

				// 在 iPhone 1 代等设备的 Safari 中，prototype 也会被枚举出来，需排除
				if (p !== 'prototype') {
					r[p] = s[p]
				}
			}
		}
	}


	var toString = Object.prototype.toString

	var isArray = Array.isArray || function(val) {
		return toString.call(val) === '[object Array]'
	}

	var isFunction = function(val) {
		return toString.call(val) === '[object Function]'
	}

	var indexOf = Array.prototype.indexOf ?
		function(arr, item) {
			return arr.indexOf(item)
		} :
		function(arr, item) {
			for (var i = 0, len = arr.length; i < len; i++) {
				if (arr[i] === item) {
					return i
				}
			}
			return -1
		}

	$.Class = Class
}($);

+function($ ) {

	// var Class = $.Class

	var BaseComponent = $.Class.create({
		initialize: function(element, options, viewModel) {
			this.element = element
			this.id = options['id']
			this.options = options
			this.viewModel = viewModel
			//绑定事件
			var events = options['events'] || {}
			for(var key in events){
				if (this.isDomEvent(key)){
					this.addDomEvent(key, $.getFunction(viewModel,events[key]))
				}
				else{
					this.on(key, $.getFunction(viewModel,events[key]))
				}
			}	
		},
		/**
		 * 绑定事件
		 * @param {String} name
		 * @param {Function} callback
		 */
		on: function(name, callback) {
			name = name.toLowerCase()
			this._events || (this._events = {})
			var events = this._events[name] || (this._events[name] = [])
			events.push({
				callback: callback
			})
			return this;
		},
		/**
		 * 触发事件
		 * @param {String} name
		 */
		trigger: function(name) {
			name = name.toLowerCase()
			if (!this._events || !this._events[name]) return this;
			var args = Array.prototype.slice.call(arguments, 1);
			var events = this._events[name];
			for (var i = 0, count = events.length; i < count; i++) {
				events[i].callback.apply(this, args);
			}
			return this;

		},
		/**
		 * 增加dom事件
		 * @param {String} name
		 * @param {Function} callback
		 */
		addDomEvent: function(name, callback){
			$(this.element).on(name, callback)
			return this
		},
		/**
		 * 移除dom事件
		 * @param {String} name
		 */
		removeDomEvent: function(name){
			$(this.element).off(name)
			return this
		},
		setEnable: function(enable){
			return this
		},
		/**
		 * 判断是否为DOM事件
		 */
		isDomEvent: function(eventName){
			if (this.element['on' + eventName] === undefined)
				return false
			else
				return true
		},
		Statics: {
			compName: '',
			EVENT_VALUE_CHANGE: 'valueChange',
			getName: function() {
				return this.compName
			}
		}
	})

	$.BaseComponent = BaseComponent

}($);

+function($) {
	/**
	 * 输入框基类，不可直接使用
	 */
	var InputComp = $.BaseComponent.extend({
		initialize: function(element, options, viewModel) {
			InputComp.superclass.initialize.apply(this, arguments)
			this.dataModel = null
			this.hasDataTable = false
			this.parseDataModel()
			this.required = options['required']
			this.maxLength = null
			this.minLength = null
			this.max = null
			this.min = null
			this.placement = options['placement']
				//			this.create()
		},
		create: function() {
			var self = this
			if (this.dataModel) {
				//处理数据绑定
				if (this.hasDataTable) {
					this.dataModel.ref(this.field).subscribe(function(value) {
							self.modelValueChange(value)
						})
						//处理只读
					this.dataModel.refEnable(this.field).subscribe(function(value) {
							self.setEnable(value)
					})

					this.dataModel.refRowMeta(this.field, 'enable').subscribe(function(value) {
							self.setEnable(value)
					})
						//处理必填
					this.dataModel.refRowMeta(this.field, "required").subscribe(function(value) {
						self.setRequired(value)
					})
					this.setEnable(this.dataModel.isEnable(this.field))
					this.setRequired(this.dataModel.getMeta(this.field, "required"))
				} else {
					this.dataModel.subscribe(function(value) {
						self.modelValueChange(value)
					})
				}
				this.modelValueChange(this.hasDataTable ? this.dataModel.getValue(this.field) : this.dataModel())
			}
			if (this.validType)
				this.validate = $(this.element).validate({
					single: true,
					validMode: 'manually',
					required: this.required,
					validType: this.validType,
					placement: this.placement,
					maxLength: this.maxLength,
					minLength: this.minLength,
					max: this.max,
					min: this.min
				})
			
			if (this.element.nodeName == 'INPUT' && (!$(this.element).attr("type") || $(this.element).attr("type") == 'text')) {
				$(this.element).focusin(function(e) {
					self.setShowValue(self.getValue())
				})
				$(this.element).blur(function(e) {
					if (!self.doValidate() && self._needClean()){
						self.element.value = self.getShowValue()
						//self.setValue(self.getValue())
					}
					else
						self.setValue(self.element.value)
				})
			}


		},
		/**
		 * 模型数据改变
		 * @param {Object} value
		 */
		modelValueChange: function(value) {

		},

		parseDataModel: function() {
			if (!this.options || !this.options["data"]) return
			this.dataModel = $.getJSObject(this.viewModel, this.options["data"])
			if (this.dataModel instanceof $.DataTable) {
				this.hasDataTable = true
				this.field = this.options["field"]
			}
		},
		/**
		 * 设置模型值
		 * @param {Object} value
		 */
		setModelValue: function(value) {
			if (!this.dataModel) return
			if (this.hasDataTable) {
//				this.dataModel.setValue(this.field, value, this.dataTableRow)

				this.dataModel.setValue(this.field, value)
			} else
				this.dataModel(value)
		},
		/**
		 * 设置控件值
		 * @param {Object} value
		 */
		setValue: function(value) {},
		/**
		 * 取控件的值
		 */
		getValue: function() {
			return this.trueValue
		},
		setShowValue: function(showValue) {},
		getShowValue: function() {
			return this.showValue
		},
		setEnable: function(enable) {
			if (enable === true || enable === 'true') {
				this.enable = true
				$(this.element).removeAttr('readonly')
				$(this.element).parent().removeClass('disablecover')
			} else if (enable === false || enable === 'false') {
				this.enable = false
				$(this.element).attr('readonly', 'readonly')
				$(this.element).parent().addClass('disablecover')
			}
		},
		setRequired: function(required) {
			if (required === true || required === 'true') {
				this.required = true
				$(this.element).siblings('.u-mustFlag').show()
			} else if(required === false || required === 'false'){
				this.required = false
				$(this.element).siblings('.u-mustFlag').hide()
			}
		},
//		setDataTableRow: function(row) {
//			this.dataTableRow = row
//		},
		/**
		 *校验 
		 */
		doValidate: function(trueValue){
			if (this.validate){
				if (trueValue)
					return this.validate.check(this.getValue())
				else	
					return this.validate.check()
			} else {
				return true	
			}
		},
		/**
		 * 是否需要清除数据
		 */
		_needClean: function(){
			if (this.validate)
				return this.validate._needClean()
			else return false
		},

		Statics: {}
	})

	$.InputComp = InputComp

}($);
/* ========================================================================
 * UUI: dataTable.js
 *
 * ========================================================================
 * Copyright 2015 yonyou, Inc.
 * ======================================================================== */
+function($ ) {
	'use strict';
	
	var Events = function(){
	}
	
	Events.fn = Events.prototype
	/**
	 *绑定事件
	 */
	Events.fn.on = function(name, callback) {
		name = name.toLowerCase()
		this._events || (this._events = {})
		var events = this._events[name] || (this._events[name] = [])
		events.push({
			callback: callback
		})
		return this;
	}

	/**
	 * 触发事件
	 */
	Events.fn.trigger = function(name) {
		name = name.toLowerCase()
		if (!this._events || !this._events[name]) return this;
		var args =  Array.prototype.slice.call(arguments, 1);
		var events = this._events[name];
		for (var i = 0, count = events.length; i < count; i++) {
			events[i].callback.apply(this, args);
		}
		return this;
	}	
	
	
	Events.fn.getEvent = function(name){
		name = name.toLowerCase()
		this._events || (this._events = {})
		return this._events[name]
	}	
	
	/**===========================================================================================================
	 * 
	 * 数据模型   
	 * 
	 * ===========================================================================================================
	 */
	
	var DataTable = function(options){
		
		this.id = options['id']
		this.meta = DataTable.createMetaItems(options['meta'])
		this.enable = options['enable'] || DataTable.DEFAULTS.enable
		this.pageSize = ko.observable(options['pageSize'] || DataTable.DEFAULTS.pageSize)
		this.pageIndex = ko.observable(options['pageIndex'] || DataTable.DEFAULTS.pageIndex)
		this.totalPages = ko.observable(options['totalPages'] || DataTable.DEFAULTS.totalPages)
		this.totalRow = ko.observable()
		this.pageCache = options['pageCache'] === undefined ? DataTable.DEFAULTS.pageCache : options['pageCache']
		this.rows = ko.observableArray([])
		this.selectedIndices = ko.observableArray([])
//		this.currSelectedIndex = -1 // ko.observable()
		this.focusIndex = -1
		this.cachedPages = []
		this.createDefaultEvents()
		this.metaChange = ko.observable(1)
		this.valueChange = ko.observable(1)
		this.enableChange = ko.observable(1)
		this.params = options['params'] || {}
		this.master = options['master'] || ''
	}
	
	DataTable.fn = DataTable.prototype = new Events()
	
	DataTable.DEFAULTS = {
		pageSize:20,
		pageIndex:0,
		totalPages:20,
		pageCache:false,
		enable: true
	}
	
	DataTable.META_DEFAULTS = {
		enable:true,
		required:false,
		descs:{}
	}
	DataTable.createMetaItems = function(metas){
		var newMetas = {};
		for(var key in metas){
			var meta = metas[key]
			if(typeof meta == 'string')
				meta = {}
			newMetas[key] = $.extend({},DataTable.META_DEFAULTS,meta)
		}
		return newMetas
	}
	
	
	//事件类型
	DataTable.ON_ROW_SELECT = 'select'
	DataTable.ON_ROW_UNSELECT = 'unSelect'
	DataTable.ON_ROW_ALLSELECT = 'allSelect'
	DataTable.ON_ROW_ALLUNSELECT = 'allUnselect'
	DataTable.ON_VALUE_CHANGE = 'valueChange'
//	DataTable.ON_AFTER_VALUE_CHANGE = 'afterValueChange'
//	DataTable.ON_ADD_ROW = 'addRow'
	DataTable.ON_INSERT = 'insert'
	DataTable.ON_UPDATE = 'update'
	DataTable.ON_DELETE = 'delete'
	DataTable.ON_DELETE_ALL = 'deleteAll'
	DataTable.ON_ROW_FOCUS = 'focus'
	DataTable.ON_ROW_UNFOCUS = 'unFocus'
	DataTable.ON_LOAD = 'load'
	DataTable.ON_ENABLE_CHANGE = 'enableChange'
	DataTable.ON_META_CHANGE = 'metaChange'
	DataTable.ON_ROW_META_CHANGE = 'rowMetaChange'
	
	DataTable.SUBMIT = {
		current: 'current',
		focus: 'focus',
		all:	'all',
		select:	'select',
		change: 'change',
		empty: 'empty'
	}
	
	
	DataTable.fn.createDefaultEvents = function(){
		//this.on()
	}
	
	DataTable.fn.addParam = function(key, value){
			this.params[key] = value
	}
	
	DataTable.fn.addParams = function(params){
		for(var key in params){
			this.params[key] = params[key]
		}
	}
	
	DataTable.fn.getParam = function(key){
		return this.params[key]
	}
	
	/**
	 * 获取meta信息，先取row上的信息，没有时，取dataTable上的信息
	 * @param {Object} fieldName
	 * @param {Object} key
	 * @param {Object} row
	 */
	DataTable.fn.getMeta = function(fieldName, key){
		if (arguments.length == 0)
			return this.meta
		return this.meta[fieldName][key]
	}
	
	DataTable.fn.setMeta = function(fieldName, key, value){
		var oldValue = this.meta[fieldName][key]
		this.meta[fieldName][key] = value
		this.metaChange(- this.metaChange())
		if (key == 'enable')
			this.enableChange(- this.enableChange())
		this.trigger(DataTable.ON_META_CHANGE, {
			eventType:'dataTableEvent',
			dataTable:this.id,
			field:fieldName,
			meta: key,
			oldValue:oldValue,
			newValue:value
		});			
	}
	
	DataTable.fn.setCurrentPage = function(pageIndex){
		this.pageIndex(pageIndex)
		var cachedPage = this.cachedPages[this.pageIndex()]
		if(cachedPage) {
			this.removeAllRows()
			this.setRows(cachedPage.rows)
			this.setRowsSelect(cachedPage.selectedIndcies)
		}
	}
	
	DataTable.fn.isChanged = function(){
		var rows = this.getAllRows()
		for (var i = 0; i < rows.length; i++){
			if (rows[i].status != Row.STATUS.NORMAL)
				return true
		}
		return false
	}

	
	/**
	 * example: meta: {supplier: {meta: {precision:'3', default: '0239900x', display:'显示名称'}}}
	*/
	DataTable.fn.updateMeta = function(meta){
       if(!meta) {
                return;
       }
       for(var fieldKey in meta) {
                for(var propKey in meta[fieldKey]) {
                         if(propKey === 'default') {
                                   if(!this.meta[fieldKey]['default']) {
                                            this.meta[fieldKey]['default'] = {}
                                   }
                                   this.meta[fieldKey]['default'].value = meta[fieldKey][propKey]
                         } else if(propKey === 'display') {
                                   if(!this.meta[fieldKey]['default']) {
                                            this.meta[fieldKey]['default'] = {}
                                   }
                                   this.meta[fieldKey]['default'].display = meta[fieldKey][propKey]
                         }else{
                                   this.meta[fieldKey][propKey] = meta[fieldKey][propKey]
                                   }
                }
               
       }
       this.metaChange(- this.metaChange())
                  
	}
	
	
	/**
	 *设置数据
	 * 
	 */
	DataTable.fn.setData = function(data){
		var newIndex = data.pageIndex, 
			newSize = data.pageSize || this.pageSize(),
			newTotalPages = data.totalPages || this.totalPages(),
			newTotalRow = data.totalRow,
			type = data.type 
//		if (newSize != this.pageSize())
//			this.cacheRows = []
//		else if (this.pageCache)
//			this.cacheRows[this.pageIndex()] = this.rows()
				
		this.setRows(data.rows)
		this.pageIndex(newIndex)
		this.pageSize(newSize)
		this.totalPages(newTotalPages)
		this.totalRow(newTotalRow)
		this.updateSelectedIndices()
		
		if (data.select && data.select.length > 0 && this.rows().length > 0)
			this.setRowsSelect(data.select)
		if (data.focus)
			this.setRowFocus(data.focus)
	}
	
	/**
	 * 设置行数据
	 * @param {Object} rows
	 */
	DataTable.fn.setRows = function(rows){
		var insertRows = []
		for (var i = 0; i < rows.length; i++){
			var r = rows[i]
			if (!r.id)
				r.id = Row.getRandomRowId()
			if (r.status == Row.STATUS.DELETE){
				this.removeRowByRowId(r.id)
			}
			else{
				var row = this.getRowByRowId(r.id)
				if (row){
					row.updateRow(r)
					if (!$.isEmptyObject(r.data)) {
						this.trigger(DataTable.ON_UPDATE,{
							index:i,
							rows:[row]
						})
						if (row == this.getCurrentRow()) {
							this.valueChange(-this.valueChange())
							row.valueChange(-row.valueChange())
						} else {
							row.valueChange(-row.valueChange())
						}							
					}
								
				}	
				else{
					row = new Row({parent:this,id:r.id})
					row.setData(rows[i])
					insertRows.push(row)
//					this.addRow(row)
				}
			}
		}
		if (insertRows.length > 0)
			this.addRows(insertRows)
	}

	DataTable.fn.clearCache = function(){
		this.cachedPages = []
	}
	
	DataTable.fn.cacheCurrentPage = function(){
		if(this.pageCache) {
			this.cachedPages[this.pageIndex()] = {"rows":this.rows().slice(), "selectedIndcies":this.selectedIndices().slice(), "pageSize":this.pageSize()}
		}
	}
	
	DataTable.fn.hasPage = function(pageIndex){
		return (this.pageCache && this.cachedPages[pageIndex]  && this.cachedPages[pageIndex].pageSize == this.pageSize()) ? true : false
	}

	DataTable.fn.copyRow = function(index, row){
		var newRow = new Row({parent:this})
		if(row) {
			newRow.setData(row.getData())
		}
		this.insertRows(index === undefined ? this.rows().length : index, [newRow])
	}

	/**
	 *追加行 
	 */
	DataTable.fn.addRow = function(row){
		this.insertRow(this.rows().length, row)
	}

	/**
	 *追加多行 
	 */
	DataTable.fn.addRows = function(rows){
		this.insertRows(this.rows().length, rows)
	}
	
	DataTable.fn.insertRow = function(index, row){
		if(!row){
			row = new Row({parent:this})
		}
		this.insertRows(index, [row])
	}
	
	DataTable.fn.insertRows = function(index, rows){
//		if (this.onBeforeRowInsert(index,rows) == false)
//			return
		for ( var i = 0; i < rows.length; i++) {
			this.rows.splice(index + i, 0, rows[i])
			this.updateSelectedIndices(index + i, '+')
			this.updateFocusIndex(index, '+')
		}
				
		this.trigger(DataTable.ON_INSERT,{
			index:index,
			rows:rows
		})
	}
	
	/**
	 * 创建空行
	 */
	DataTable.fn.createEmptyRow = function(){
		var r = new Row({parent:this})
		this.addRow(r)
		return r
	}

	DataTable.fn.removeRowByRowId = function(rowId){
		var index = this.getIndexByRowId(rowId)
		if (index != -1)
			this.removeRow(index)
	}

	DataTable.fn.removeRow = function(index) {
		if (index instanceof Row){
			index = this.getIndexByRowId(index.rowId)
		}
		this.removeRows([ index ]);
	}
	
	DataTable.fn.removeAllRows = function(){
		this.rows([])
		this.selectedIndices([])
		this.focusIndex = -1
		this.trigger(DataTable.ON_DELETE_ALL)
	}
	
	DataTable.fn.removeRows = function(indices) {
		indices = this._formatToIndicesArray(indices)
		indices = indices.sort()
		var rowIds = [], rows = this.rows(), deleteRows = [];
		for (var i = indices.length - 1; i >= 0; i--) {
			var index = indices[i]
			var delRow = rows[index];
			if (delRow == null) {
				continue;
			}
			rowIds.push(delRow.rowId)
			var deleteRow = rows.splice(index, 1);
			deleteRows.push(deleteRow[0]);
			this.updateSelectedIndices(index,'-')
			this.updateFocusIndex(index, '-')
		}
		this.rows(rows)
		this.deleteRows = deleteRows; 
		this.trigger(DataTable.ON_DELETE,{
			indices:indices,
			rowIds:rowIds,
			deleteRows:deleteRows
		})
	}

	/**
	 * 设置行删除
	 * @param {Object} index
	 */
	DataTable.fn.setRowDelete = function(index){
		if (index instanceof Row){
			index = this.getIndexByRowId(index.rowId)
		}		
		this.setRowDelete([index])
	}
	
	/**
	 * 设置所有行删除
	 */
	DataTable.fn.setAllRowsDelete = function(){
		var indices = new Array(this.rows().length)
		for (var i = 0; i < indices.length; i++) {
			indices[i] = i
		}
		this.setRowsDelete(indices)		
	}	
	
	/**
	 * 设置行删除
	 * @param {Array} indices
	 */
	DataTable.fn.setRowsDelete = function(indices){
		indices = this._formatToIndicesArray(indices)
		for (var i=0; i< indices.length; i++){
			var row = this.getRow(indices[i])
			if (row.status == Row.STATUS.NEW){
				this.rows(this.rows().splice(indices[i], 1));
				this.updateSelectedIndices(indices[i],'-')
				this.updateFocusIndex(index, '-')
			}
			else{
				row.status = Row.STATUS.FALSE_DELETE
			}
		}
		var rowIds = this.getRowIdsByIndices(indices)
		this.trigger(DataTable.ON_ROW_DELETE, {
			falseDelete: true,
			indices:indices,
			rowIds:rowIds
		})
	}	

	DataTable.fn.setAllRowsSelect = function() {
		var indices = new Array(this.rows().length)
		for (var i = 0; i < indices.length; i++) {
			indices[i] = i
		}
		this.setRowsSelect(indices)
		this.trigger(DataTable.ON_ROW_ALLSELECT, {
		})			
	}
	
	/**
	 * 设置选中行，清空之前已选中的所有行
	 */
	DataTable.fn.setRowSelect = function(index){
		if (index instanceof Row){
			index = this.getIndexByRowId(index.rowId)
		}
		this.setRowsSelect([index])
		this.setRowFocus(this.getSelectedIndex())
	}	
	
	DataTable.fn.setRowsSelect = function(indices){
		indices = this._formatToIndicesArray(indices)
		var sIns = this.selectedIndices()
		if($.type(indices) == 'array' && $.type(sIns) == 'array' && indices.join() == sIns.join()) {
			// 避免与控件循环触发
			return;
		}
		this.setAllRowsUnSelect({quiet:true})
		this.selectedIndices(indices)
//		var index = this.getSelectedIndex()
//		this.setCurrentRow(index)
		var rowIds = this.getRowIdsByIndices(indices)
		this.valueChange(- this.valueChange())
		this.trigger(DataTable.ON_ROW_SELECT, {
			indices:indices,
			rowIds:rowIds
		})
	}
	
	/**
	 * 添加选中行，不会清空之前已选中的行
	 */
	DataTable.fn.addRowsSelect = function(indices){
		indices = this._formatToIndicesArray(indices)
		var selectedIndices = this.selectedIndices().slice()
		for (var i=0; i< indices.length; i++){
			var ind = indices[i], toAdd = true
			for(var j=0; j< selectedIndices.length; j++) {
				if(selectedIndices[j] == ind) {
					toAdd = false
				}
			}
			if(toAdd) {
				selectedIndices.push(indices[i])
			}
		}
		this.selectedIndices(selectedIndices)
//		var index = this.getSelectedIndex()
//		this.setCurrentRow(index)
		var rowIds = this.getRowIdsByIndices(indices)
		this.trigger(DataTable.ON_ROW_SELECT, {
			indices:indices,
			rowIds:rowIds
		})
	}

	/**
	 * 根据索引取rowid
	 * @param {Object} indices
	 */
	DataTable.fn.getRowIdsByIndices = function(indices){
		var rowIds = []
		for(var i=0; i<indices.length; i++){
			rowIds.push(this.getRow(indices[i]).rowId)
		}
		return rowIds
	}
	
	/**
	 * 全部取消选中
	 */
	DataTable.fn.setAllRowsUnSelect = function(options){
		this.selectedIndices([])
		if( !(options && options.quiet) ) {
			this.trigger(DataTable.ON_ROW_ALLUNSELECT)
		} 
	}
	
	/**
	 * 取消选中
	 */
	DataTable.fn.setRowUnSelect = function(index){
		this.setRowsUnSelect([index])
	}	
	
	DataTable.fn.setRowsUnSelect = function(indices){
		indices = this._formatToIndicesArray(indices)
		var selectedIndices = this.selectedIndices().slice()
		
		 // 避免与控件循环触发
        if(selectedIndices.indexOf(indices[0]) == -1) return;
        
		for(var i=0; i<indices.length; i++){
			var index = indices[i]
			var pos = selectedIndices.indexOf(index)
			if (pos != -1)
				selectedIndices.splice(pos,1)
		}
		this.selectedIndices(selectedIndices)
		var rowIds = this.getRowIdsByIndices(indices)
		this.trigger(DataTable.ON_ROW_UNSELECT, {
			indices:indices,
			rowIds:rowIds
		})
	}
	
	/**
	 * 
	 * @param {Object} index 要处理的起始行索引
	 * @param {Object} type   增加或减少  + -
	 */
	DataTable.fn.updateSelectedIndices = function(index, type){
		var selectedIndices = this.selectedIndices().slice()
		if (selectedIndices == null || selectedIndices.length == 0)
			return
		for (var i = 0, count= selectedIndices.length; i< count; i++){
			if (type == '+'){
				if (selectedIndices[i] >= index)
					selectedIndices[i] = parseInt(selectedIndices[i]) + 1
			}
			else if (type == '-'){
				if (selectedIndices[i] == index)
					selectedIndices.splice(i,1)
				else if(selectedIndices[i] > index)
					selectedIndices[i] = selectedIndices[i] -1
			}
		}
		this.selectedIndices(selectedIndices)
//		var currIndex = this.getSelectedIndex()
//		this.setCurrentRow(currIndex)
	}

	DataTable.fn.updateFocusIndex = function(opIndex, opType) {
		if(opIndex <= this.focusIndex && this.focusIndex != -1) {
			if(opType === '+') {
				this.focusIndex++
			} else if(opType === '-') {
				if(this.focusIndex === this.opIndex) {
					this.focusIndex = -1
				} else {
					this.focusIndex--
				}
			}
		}
	}
	
	/**
	 * 获取选中行索引，多选时，只返回第一个行索引
	 */
	DataTable.fn.getSelectedIndex = function(){
		var selectedIndices = this.selectedIndices()
		if (selectedIndices == null || selectedIndices.length == 0)
			return -1
		return selectedIndices[0]
	}
	
	DataTable.fn.getSelectedIndexs = function(){
		var selectedIndices = this.selectedIndices()
		if (selectedIndices == null || selectedIndices.length == 0)
			return []
		return selectedIndices
	}
	
	/**
	 * 获取焦点行
	 */
	DataTable.fn.getFocusIndex = function(){
		return this.focusIndex
	}
	
	/**
	 * 根据行号获取行索引
	 * @param {String} rowId
	 */
	DataTable.fn.getIndexByRowId = function(rowId){
		for (var i=0, count = this.rows().length; i< count; i++){
			if (this.rows()[i].rowId == rowId)
				return i
		}
		return -1
	}
	
	/**
	 * 获取所有行数据
	 */
	DataTable.fn.getAllDatas = function(){
		var rows = this.getAllRows()
		var datas = []
		for (var i=0, count = rows.length; i< count; i++)
			if (rows[i])
				datas.push(rows[i].getData())
		return datas
	}

	/**
	 * 获取当前页数据
	 */
	DataTable.fn.getData = function(){
		var datas = []
		for(var i = 0; i< this.rows().length; i++){
			datas.push(this.rows()[i].getData())
		}
		return datas
	}
	 
	DataTable.fn.getDataByRule = function(rule){
		var returnData = {},
			datas = null
		returnData.meta = this.meta
		returnData.params = this.params
		rule = rule || DataTable.SUBMIT.current
		if(rule == DataTable.SUBMIT.current){
			var currIndex = this.focusIndex 
			if (currIndex == -1)
			 	currIndex = this.getSelectedIndex()	
			datas = []
			for (var i =0, count = this.rows().length; i< count; i++){
				if (i == currIndex)
					datas.push(this.rows()[i].getData())
				else
					datas.push(this.rows()[i].getEmptyData())
			}
		}
		else if (rule == DataTable.SUBMIT.focus){
			datas = []
			for (var i =0, count = this.rows().length; i< count; i++){
				if (i == this.focusIndex)
					datas.push(this.rows()[i].getData())
				else
					datas.push(this.rows()[i].getEmptyData())
			}
		}
		else if (rule == DataTable.SUBMIT.all){
			datas = this.getData()	
		}
		else if (rule == DataTable.SUBMIT.select){
			datas = this.getSelectedDatas(true)
		}
		else if (rule == DataTable.SUBMIT.change){
			datas = this.getChangedDatas()
		}
		else if(rule === DataTable.SUBMIT.empty){
			datas = []
		}
		returnData.rows = datas
		returnData.select= this.getSelectedIndexs()
		returnData.focus = this.getFocusIndex()
		returnData.pageSize = this.pageSize()
		returnData.pageIndex = this.pageIndex()
		returnData.isChanged = this.isChanged()
		returnData.master = this.master
		return returnData
	}

	/**
	 * 获取选中行数据
	 */
	DataTable.fn.getSelectedDatas = function(withEmptyRow){
		var selectedIndices = this.selectedIndices()
		var datas = []
		var sIndices = []
		for(var i = 0, count=selectedIndices.length; i< count; i++){
			sIndices.push(selectedIndices[i])
		}	
		for(var i = 0, count=this.rows().length; i< count; i++){
			if (sIndices.indexOf(i) != -1)
				datas.push(this.rows()[i].getData())
			else if (withEmptyRow == true)
				datas.push(this.rows()[i].getEmptyData())
		}
		return datas
	}

	DataTable.fn.refSelectedRows = function(){
        return ko.pureComputed({
            read: function(){
                var ins = this.selectedIndices() || []
                var rs = this.rows()
                var selectedRows = []
                for(var i=0;i<ins.length;i++) {
                    selectedRows.push(rs[i])
                }
                return selectedRows
            },owner: this
        })                                
     }
	
	/**
	 * 绑定字段值
	 * @param {Object} fieldName
	 */
	DataTable.fn.ref = function(fieldName){
		return ko.pureComputed({
			read: function(){
				this.valueChange()
				var row = this.getCurrentRow()
				if (row) 
					return row.getValue(fieldName)
				else
					return ''
			},
			write: function(value){
				var row = this.getCurrentRow()
				if (row)
					row.setValue(fieldName,value)
			},
			owner: this
		})
	}

	/**
	 * 绑定字段属性
	 * @param {Object} fieldName
	 * @param {Object} key
	 */
	DataTable.fn.refMeta = function(fieldName, key){
		return ko.pureComputed({
			read: function(){
				this.metaChange()
				return this.getMeta(fieldName, key)
			},
			write: function(value){
				this.setMeta(fieldName, key, value)
			},
			owner: this
		})		
	}
	
	DataTable.fn.refRowMeta = function(fieldName, key){
		return ko.pureComputed({
			read: function(){
				this.metaChange()
				var row = this.getCurrentRow()
				if (row) 
					return row.getMeta(fieldName, key)
				else
					return this.getMeta(fieldName, key)
			},
			write: function(value){
				var row = this.getCurrentRow()
				if (row)
					row.setMeta(fieldName,value)
			},
			owner: this
		})		
	}	
	
	DataTable.fn.refEnable = function(fieldName){
		return ko.pureComputed({
			read: function(){
				this.enableChange()
				if (!fieldName)
					return this.enable
				var fieldEnable = this.getMeta(fieldName, 'enable')
				if (typeof fieldEnable == 'undefined' || fieldEnable == null)
					fieldEnable = true
				return fieldEnable && this.enable 
//				return this.enable && (this.getMeta(fieldName, 'enable') || false) 
			},
			owner: this
		})		
	}
	
	DataTable.fn.isEnable = function(fieldName){
		var fieldEnable = this.getMeta(fieldName, 'enable')
		if (typeof fieldEnable == 'undefined' || fieldEnable == null)
			fieldEnable = true
		return fieldEnable && this.enable 
	}
	
	DataTable.fn.getValue = function(fieldName,row){
		row = row || this.getCurrentRow()
		if (row)
			return row.getValue(fieldName)
		else
		 	return ''
	}
	
	DataTable.fn.setValue = function(fieldName, value, row, ctx){
		row = row ? row : this.getCurrentRow()
		if (row)
			row.setValue(fieldName, value, ctx)
	}
	
	DataTable.fn.setEnable = function(enable){
		if (this.enable == enable) return
		this.enable = enable
		this.enableChange(- this.enableChange())
		this.trigger(DataTable.ON_ENABLE_CHANGE,{
					enable:this.enable
		})
	}
	
	/**
	 * 获取当前操作行    
	 * 规则： focus 行优先，没有focus行时，取第一选中行
	 */
	DataTable.fn.getCurrentRow = function(){
		if (this.focusIndex != -1)
			return this.getFocusRow()
		var index  = this.getSelectedIndex()	
		if (index == -1)
			return null
		else	
			return this.getRow(index)
	}

//	DataTable.fn.setCurrentRow = function(index){
//		if(index instanceof Row) {
//			index = this.getIndexByRowId(index.rowId)
//		}
//		this.currSelectedIndex = index
//		this.valueChange(- this.valueChange())
//	}
	
	/**
	 * 获取焦点行
	 */
	DataTable.fn.getFocusRow = function(){
		if (this.focusIndex != -1)
			return this.getRow(this.focusIndex)
		else 
			return null
	}
	
	/**
	 * 设置焦点行
	 * @param {Object} index 行对象或者行index
	 * @param quiet 不触发事件
	 * @param force 当index行与已focus的行相等时，仍然触发事件
	 */
	DataTable.fn.setRowFocus = function(index, quiet, force){
		var rowId = null
		if(index instanceof Row) {
			index = this.getIndexByRowId(index.rowId)
			rowId = index.rowId
		}
		if(index === -1 || (index === this.focusIndex && !force) ) {
			return;
		}
		this.focusIndex = index
		if(quiet) {
			return;
		}
		this.valueChange(- this.valueChange())		
		if (!rowId){
			rowId = this.getRow(index).rowId
		}
		this.trigger(DataTable.ON_ROW_FOCUS, {
			index:index,
			rowId:rowId
		})		
	}
	
	/**
	 * 焦点行反选
	 */
	DataTable.fn.setRowUnFocus = function(){
		this.valueChange(- this.valueChange())
		var indx = this.focusIndex,rowId = null;
		if (indx !== -1){
			rowId = this.getRow(indx).rowId
		}
		this.trigger(DataTable.ON_ROW_UNFOCUS, {
			index:indx,
			rowId:rowId
		})	
		this.focusIndex = -1			
	}
	
	DataTable.fn.getRow = function(index){
		return this.rows()[index]
	}
	
	DataTable.fn.getAllRows = function(){
		return this.rows()
	}
	
	DataTable.fn.getRowByRowId = function(rowid){
		for(var i=0, count= this.rows().length; i<count; i++){
			if (this.rows()[i].rowId == rowid)
				return this.rows()[i]
		}
		return null
	}

	/**
	 * 获取变动的数据(新增、修改)
	 */
	DataTable.fn.getChangedDatas = function(withEmptyRow){
		var datas = []
		for (var i=0, count = this.rows().length; i< count; i++){
			if (this.rows()[i] && this.rows()[i].status != Row.STATUS.NORMAL){
				datas.push(this.rows()[i].getData())
			}
			else if (withEmptyRow == true){
				datas.push(this.rows()[i].getEmptyData())
			}
		}
		return datas
	}

	DataTable.fn._formatToIndicesArray = function(indices){
		if (typeof indices == 'string' || typeof indices == 'number') {
			indices = [indices]
		} else if (indices instanceof Row){
			indices = this.getIndexByRowId(indices.rowId)
		} else if ($.type(indices) === 'array' && indices.length > 0 && indices[0] instanceof Row){
			for (var i = 0; i < indices.length; i++) {
				indices[i] = this.getIndexByRowId(indices[i].rowId)
			}
		}
		return indices;
	}
	
	
	/**===========================================================================================================
	 * 
	 * 行模型  
	 * 
	 * {id:'xxx', parent:dataTable1}
	 * 
	 * data:{value:'v1',meta:{}}
	 * 
	 * ===========================================================================================================
	 */
	var Row = function(options){
		this.rowId = options['id'] || Row.getRandomRowId()
		this.status = Row.STATUS.NEW 
		this.parent = options['parent']
		this.initValue = null
		this.data = {}
		this.metaChange = ko.observable(1)
		this.valueChange = ko.observable(1)
		this.init()
	}
	
	Row.STATUS = {
		NORMAL: 'nrm',
		UPDATE: 'upd',
		NEW: 'new',
		DELETE: 'del',
		FALSE_DELETE: 'fdel'
	}
	
	Row.fn = Row.prototype = new Events()
	
	/**
	 * Row初始化方法
	 * @private
	 */
	Row.fn.init = function(){
		var meta = this.parent.meta
		//添加默认值
		for (var key in meta){
			this.data[key] = {}
			if (meta[key]['default']){
				var defaults = meta[key]['default']
				for (var k in defaults){
					if (k == 'value')
						this.data[key].value = defaults[k]
					else{
						this.data[key].meta = this.data[key].meta || {}
						this.data[key].meta[k] = defaults[k]
					}
				}
			}
		}
	}
	
	Row.fn.ref = function(fieldName){
		return ko.pureComputed({
			read: function(){
				
				this.valueChange()
				return this._getField(fieldName)['value']
			},
			write: function(value){
				this.setValue(fieldName, value)
			},
			owner: this
		})
	}
	
	Row.fn.refMeta = function(fieldName, key){
		return ko.pureComputed({
			read: function(){
				this.metaChange()
				return this.getMeta(fieldName, key)
			},
			write: function(value){
				this.setMeta(fieldName, key, value)
			},
			owner: this
		})		
	}
	Row.fn.refCombo = function(fieldName,datasource){
		return ko.pureComputed({
			read: function(){				
					this.valueChange()
					var ds = $.getJSObject(this.parent.parent,datasource)
					if(this._getField(fieldName)['value'] === undefined || this._getField(fieldName)['value'] === "" ) return "";
					var v = this._getField(fieldName)['value'];
					var valArr = typeof v === 'string' ? v.split(',') : [v];		
					
					var nameArr = []
					
					for( var i=0,length=ds.length; i<length; i++){
                      for(var j=0; j<valArr.length;j++){
                      	  if(ds[i].pk == valArr[j]){
                      	  	  nameArr.push(ds[i].name)
                      	  }
                      }
					}	
					
					return nameArr.toString();
			},
			write: function(value){
				
				this.setValue(fieldName, value)
			},
			owner: this
		})
	}
	Row.fn.refDate = function(fieldName,format){
		return ko.pureComputed({
			read: function(){				
					this.valueChange()
					if(!this._getField(fieldName)['value']) return "";
					var valArr = this._getField(fieldName)['value']	
					if(!valArr) return "";
					valArr = moment(valArr).format(format)						
					return valArr;
			},
			write: function(value){
				
				this.setValue(fieldName, value)
			},
			owner: this
		})
	}
	/**
	 *获取row中某一列的值 
	 */
	Row.fn.getValue = function(fieldName){
		return this._getField(fieldName)['value']
	}
	
	/**
	 *设置row中某一列的值 
	 */
	Row.fn.setValue = function(fieldName, value, ctx, options){
		var oldValue = this.getValue(fieldName) || "" 
		if(oldValue == (value || "")) return ;
		this._getField(fieldName)['value'] = value
		this._getField(fieldName).changed = true
		if (this.status != Row.STATUS.NEW)
			this.status = Row.STATUS.UPDATE
		this.valueChange(- this.valueChange())
		if (this.parent.getCurrentRow() == this)
			this.parent.valueChange(- this.parent.valueChange());

		this.parent.trigger(DataTable.ON_VALUE_CHANGE, {
			eventType:'dataTableEvent',
			dataTable:this.parent.id,
			rowId: this.rowId,
			field:fieldName,
			oldValue:oldValue,
			newValue:value,
			ctx: ctx || ""
		});

		this.parent.trigger(fieldName + "." + DataTable.ON_VALUE_CHANGE, {
			eventType:'dataTableEvent',
			dataTable:this.parent.id,
			rowId: this.rowId,
			field:fieldName,
			oldValue:oldValue,
			newValue:value,
			ctx: ctx || ""
		})		
	}

	/**
	 *获取row中某一列的属性
	 */
	Row.fn.getMeta = function(fieldName, key){
		if (arguments.length == 0){
			var mt = {}
			for (var k in this.data){
				mt[k] = this.data[k].meta ?  this.data[k].meta : {}
			}
			return mt
		}
		var meta = this._getField(fieldName).meta
		if (meta && meta[key])
			return meta[key]
		else	
			return this.parent.getMeta(fieldName, key)
	}
	
	/**
	 *设置row中某一列的属性
	 */
	Row.fn.setMeta = function(fieldName, key,value){
		var meta = this._getField(fieldName).meta
		if (!meta)
			meta = this._getField(fieldName).meta = {}
		var oldValue = meta[key]
		meta[key] = value
		this.metaChange(- this.metaChange())
		if (key == 'enable')
			this.parent.enableChange(- this.parent.enableChange())
		if (this.parent.getCurrentRow() == this)
			this.parent.metaChange(- this.parent.metaChange())
		this.parent.trigger(DataTable.ON_ROW_META_CHANGE, {
			eventType:'dataTableEvent',
			dataTable:this.parent.id,
			field:fieldName,
			meta: key,
			oldValue:oldValue,
			newValue:value,
			row: this
		});	
	}

	/**
	 *设置Row数据
	 *
	 *  data.status
	 *	data.data {'field1': {value:10,meta:{showValue:1.0,precision:2}}}
	 */
	Row.fn.setData = function(data){
		this.status = data.status
		//this.rowId = data.rowId
		for(var key in data.data){
			if (this.data[key]){
				var valueObj = data.data[key]
				if (typeof valueObj == 'string' || typeof valueObj == 'number' || valueObj === null)
					this.data[key]['value'] = this.formatValue(key, valueObj)
					//this.setValue(key, this.formatValue(key, valueObj))
				else{
//					this.setValue(key, valueObj.value)

					if(valueObj.error){
						$.showMessageDialog({title:"警告",msg:valueObj.error,backdrop:true});
					}else{
						//this.setValue(key, this.formatValue(key, valueObj.value), null)
						this.data[key]['value'] = this.formatValue(key, valueObj.value)
						for(var k in valueObj.meta){
							this.setMeta(key, k, valueObj.meta[k])
						}
					}
				}
			}
		}
	}
	
	/**
	 * 格式化数据值
	 * @private
	 * @param {Object} field
	 * @param {Object} value
	 */
	Row.fn.formatValue = function(field, value){
		var type = this.parent.getMeta(field,'type')
		if (!type) return value
		if (type == 'date' || type == 'datetime'){
			return _formatDate(value)			
		}
		return value
	}
	
	Row.fn.updateRow = function(row){
		this.setData(row)
	}
	
	/**
	 * @private
	 * 提交数据到后台
	 */
	Row.fn.getData = function(){
		var data = ko.toJS(this.data)
		var meta = this.parent.getMeta()
		for (var key in meta){
			if (meta[key] && meta[key].type){
				if (meta[key].type == 'date' || meta[key].type == 'datetime'){
					data[key].value = _dateToUTCString(data[key].value)
				}
			}
		}
		return {'id':this.rowId ,'status': this.status, data: data}
	}
	
	Row.fn.getEmptyData = function(){
		return {'id':this.rowId ,'status': this.status, data: {}}
	}
	
	Row.fn._getField = function(fieldName){
		if (!this.data[fieldName]){
			throw new Error('field:' + fieldName + ' not exist in dataTable:' + this.parent.id +'!')
		}
		return this.data[fieldName]
	}
	
	
	/*
	 * 生成随机行id
	 * @private
	 */
	Row.getRandomRowId = function() {
		return setTimeout(function(){});
	};
	
	var _formatDate = function(value){
		if (!value) return value
		var date = new Date();
		date.setTime(value);		
		var year = date.getFullYear();
		var month = date.getMonth() + 1;
		if (parseInt(month)<10) month = "0" + month;
		var day = date.getDate();
		if (parseInt(day)<10) day = "0" + day;
		var hours = date.getHours();
		if (parseInt(hours)<10) hours = "0" + hours;
		var minutes = date.getMinutes();
		if (parseInt(minutes)<10) minutes = "0" + minutes;
		var seconds = date.getSeconds();
		if (parseInt(seconds)<10) seconds = "0" + seconds;
		var formatString = year + "-" + month + "-" + day + " " + hours + ":" + minutes + ":" + seconds;
		return formatString;		
	}
	
	var _dateToUTCString = function(date){
		if (!date) return ''
		if (date.indexOf("-") > -1)
			date = date.replace(/\-/g,"/");
		var utcString = Date.parse(date);
		if (isNaN(utcString)) return ""; 
		return utcString; 	
	}
	
//	if (exports){
		$.Row = Row
		$.DataTable = DataTable
//	}
//	else
//		return {
//			Row: Row,
//			DataTable: DataTable
//		}
//	

}($);

+function($, ko) {

	"use strict";
	
	var CompManager = {
		plugs:{},
		apply : function(viewModel, dom){
			dom = dom || document.body
			$(dom).find('[u-meta]').each(function() {
				if ($(this).data('u-meta')) return
				if ($(this).parent('[u-meta]').length > 0) return 
				var options = JSON.parse($(this).attr('u-meta'))
				if(options && options['type']) {
					var comp = CompManager._createComp(this, options, viewModel, app)
//					var comp = new DataComponent(this, options, viewModel)
					if (comp)
						$(this).data('u-meta', comp)
				}
			})	
			ko.applyBindings(viewModel, dom)
		},
		addPlug: function(plug){
			var name = plug.getName()
			this.plugs || (this.plugs = {})
			if (this.plugs[name]){
				throw new Error('plug has exist:'+ name)
			}
			this.plugs[name] = plug
		},
		_createComp: function(element,options, viewModel, app){
			var type = options['type']
			var plug = this.plugs[type]
			if (!plug) return null
			var comp = new plug(element, options, viewModel, app)
			comp.type = type
			return comp
		}
	}
	
	$.compManager = CompManager
	
	
}($,ko);


+function($) {
	var FloatComp = $.InputComp.extend({
		initialize: function(element, options, viewModel) {
			var self = this
			FloatComp.superclass.initialize.apply(this, arguments)
			this.maskerMeta = iweb.Core.getMaskerMeta('float') || {}
			this.maskerMeta.precision = options['precision'] || this.maskerMeta.precision
			this.validType = 'float'
			this.max = options['max']
			this.min = options['min']
			if (this.dataModel) {
				//处理数据精度
			if (this.hasDataTable) {
					this.dataModel.refRowMeta(this.field, "precision").subscribe(function(precision){
						if(precision === undefined)return;
						self.setPrecision(precision)
					})							
					this.maskerMeta.precision = this.dataModel.getMeta(this.field, "precision") || this.maskerMeta.precision
					this.min = this.dataModel.getMeta(this.field, "min") || this.min
					this.max = this.dataModel.getMeta(this.field, "max") || this.max
				}
			}	
			this.formater = new $.NumberFormater(this.maskerMeta.precision);
			this.masker = new NumberMasker(this.maskerMeta);			
			this.create()
		},
		modelValueChange: function(value) {
			value = value || ""
		//	this.trueValue = value
		//	var formatValue = this.formater.format(this.trueValue)
		    var formatValue = this.formater.format(value)
		    this.trueValue = formatValue
		    this.element.trueValue = this.trueValue
			this.showValue = this.masker.format(formatValue).value
			this.setShowValue(this.showValue)
		},
		setValue: function(value) {
			this.trueValue = this.formater.format(value)
			this.element.trueValue = this.trueValue
			this.showValue = this.masker.format(this.trueValue).value
			this.setShowValue(this.showValue)
			this.setModelValue(this.trueValue)
			this.trigger(FloatComp.EVENT_VALUE_CHANGE, this.trueValue)
		},
		getValue : function() {
			return this.trueValue
		},
		setShowValue : function(showValue) {
			this.showValue = showValue
			this.element.value = showValue
			this.element.title = showValue
		},
		getShowValue: function() {
			return this.showValue
		},
		/**
		 * 修改精度
		 * @param {Integer} precision
		 */
		setPrecision: function(precision){
			if (this.maskerMeta.precision == precision) return
			this.maskerMeta.precision =precision
			this.formater = new $.NumberFormater(this.maskerMeta.precision);
			this.masker = new NumberMasker(this.maskerMeta);			
 		},

		Statics: {
			compName: 'float'
		}
	})

	if ($.compManager)
		$.compManager.addPlug(FloatComp)

}($);

+function($){

	var Grid = function(element, options, viewModel,app) {
		// 初始options中包含grid的属性设置，还需要增加dataSource、columns、transMap以及事件处理
		var oThis = this;
		var compDiv = null;
		var comp = null;
		this.dataTable = $.getJSObject(viewModel, options["data"]);
		this.element = element;
		this.$element = $(element);
		this.editComponentDiv = {};
		this.editComponent = {};
		this.id = options['id'];
		this.gridOptions = options;
		
		// 在html中将函数类参数进行处理
		this.gridOptions.onBeforeRowSelected = $.getFunction(viewModel,this.gridOptions.onBeforeRowSelected);
		this.gridOptions.onRowSelected = $.getFunction(viewModel,this.gridOptions.onRowSelected);
		this.gridOptions.onBeforeRowUnSelected = $.getFunction(viewModel,this.gridOptions.onBeforeRowUnSelected);
		this.gridOptions.onRowUnSelected = $.getFunction(viewModel,this.gridOptions.onRowUnSelected);
		this.gridOptions.onBeforeAllRowSelected = $.getFunction(viewModel,this.gridOptions.onBeforeAllRowSelected);
		this.gridOptions.onAllRowSelected = $.getFunction(viewModel,this.gridOptions.onAllRowSelected);
		this.gridOptions.onBeforeAllRowUnSelected = $.getFunction(viewModel,this.gridOptions.onBeforeAllRowUnSelected);
		this.gridOptions.onAllRowUnSelected = $.getFunction(viewModel,this.gridOptions.onAllRowUnSelected);
		this.gridOptions.onBeforeRowFocus = $.getFunction(viewModel,this.gridOptions.onBeforeRowFocus);
		this.gridOptions.onRowFocus = $.getFunction(viewModel,this.gridOptions.onRowFocus);
		this.gridOptions.onBeforeRowUnFocus = $.getFunction(viewModel,this.gridOptions.onBeforeRowUnFocus);
		this.gridOptions.onRowUnFocus = $.getFunction(viewModel,this.gridOptions.onRowUnFocus);
		this.gridOptions.onDblClickFun = $.getFunction(viewModel,this.gridOptions.onDblClickFun);
		this.gridOptions.onValueChange = $.getFunction(viewModel,this.gridOptions.onValueChange);
		/*
		 * 处理column参数  item
		 * div子项div存储column信息
		 */
		var columns = [];
		$("div",this.$element).each(function() {
			var ops = $(this).attr('options')
			if(typeof(ops) == "undefined")
				var column = eval("(" + ops+")");
			else
				var column = JSON.parse(ops);
			// 处理精度，以dataTable的精度为准
			
			/*处理editType*/
			var eType = $.getFunction(viewModel, column.editType);
			var rType = $.getFunction(viewModel, column.renderType);
			var eOptions = {};
			if(column.editOptions){
				if(typeof(column.editOptions) == "undefined")
					var eOptions = eval("(" + column.editOptions +")");
				else
					var eOptions = column.editOptions;
			}
			eOptions.data = options['data']
			eOptions.field = column['field']
			// 默认按照string处理
			if(eType == '')
				eType = 'string';
			if(eType == 'string' || eType == 'integer' || eType == 'checkbox' || eType == 'combo' || eType == 'radio' || eType == 'float' || eType == 'currency' || eType == 'datetime'|| eType == 'date'){
				if(eType == 'string'){
					compDiv = $('<div><input type="text" class="u-grid-edit-item-string"></div>');
					if(!options.editType || options.editType =="default" ){
						compDiv.addClass("eType-input")
					}					
					comp = new $.compManager.plugs.string(compDiv.find("input")[0],eOptions,viewModel);
					
				}else if(eType == 'integer'){
					compDiv = $('<div><input type="text" class="u-grid-edit-item-integer"></div>');
					if(!options.editType || options.editType =="default" ){
						compDiv.addClass("eType-input")
					}					
					comp = new $.compManager.plugs.integer(compDiv.find("input")[0],eOptions,viewModel);
					
				} else if(eType == 'checkbox'){
					compDiv = $('<input id="' + oThis.id + "_edit_field_" + column['field'] + '" type="checkbox" class="u-grid-edit-item-checkbox">');
					comp = new $.compManager.plugs.check(compDiv[0],eOptions,viewModel);
					
				}else if(eType == 'combo'){
					compDiv = $('<div class="input-group  form_date u-grid-edit-item-comb"><div  type="text" class="form-control grid-combox"></div><i class="input-group-addon" ><i class="fa fa-angle-down"></i></i></div>');
					comp = new $.compManager.plugs.combo(compDiv[0],eOptions,viewModel);
					
				}else if(eType == 'radio'){
					compDiv = null;//$('<div class="u-grid-edit-item-radio"><input type="radio" name="identity" /><i data-role="name"></i></div>');
					comp = null;//new $.compManager.plugs.radio(compDiv[0],eOptions,viewModel);
				}else if(eType == 'float'){
					compDiv = $('<div><input type="text" class="u-grid-edit-item-float"></div>');
					if(!options.editType || options.editType =="default" ){
						compDiv.addClass("eType-input")
					}	
					comp = new $.compManager.plugs.float(compDiv.find("input")[0],eOptions,viewModel);
				}else if(eType == 'currency'){
					compDiv = $('<div><input type="text" class="u-grid-edit-item-currency"></div>');
					if(!options.editType || options.editType =="default" ){
						compDiv.addClass("eType-input")
					}	
					comp = new $.compManager.plugs.currency(compDiv.find("input")[0],eOptions,viewModel);
				}else if(eType == 'datetime'){
					compDiv = $('<div class="input-group u-grid-edit-item-datetime" ><input class="form-control" /><div class="input-group-addon"><i class="glyphicon glyphicon-calendar"></i></div></div>');
					eOptions.widgetParent = $("body")
					comp = new $.compManager.plugs.datetime(compDiv[0],eOptions,viewModel);
				}else if(eType == 'date'){
					compDiv = $('<div class="input-group u-grid-edit-item-date" ><input class="form-control" /><div class="input-group-addon"><i class="glyphicon glyphicon-calendar"></i></div></div>');
					eOptions.widgetParent = $("body")
					comp = new $.compManager.plugs.date(compDiv[0],eOptions,viewModel);
				}

				oThis.editComponentDiv[column.field] = compDiv;
				oThis.editComponent[column.field] = comp;
				
				
				column.editType = function(obj){
					var comp = oThis.editComponent[column.field]
					if (!comp)
						return
					obj.element.innerHTML = '';
					var $Div = $('<div class="u-grid-content-td-div" style="margin:0px;"></div>');
					var row = oThis.getDataTableRow(obj.rowObj)
					$(obj.element).append($Div);
					$Div.append(oThis.editComponentDiv[column.field]);
					
					if(comp.required) {
						$(obj.element).parent().find('.u-grid-edit-mustFlag').show()
					}
					comp.modelValueChange(obj.value);
				}
			}else if (typeof eType == 'function'){
				column.editType = eType;
			}
			
			if(rType == 'booleanRender'){
				column.renderType = function(obj){
					var checkStr = '';
					if(obj.value == 'Y'){
						checkStr = 'checked';
					}
					var htmlStr = '<input type="checkbox"   style="cursor:default;" disabled ' + checkStr +'>'
					obj.element.innerHTML = htmlStr;
				}
			}else if(rType == 'integerRender'){
				column.renderType = function(obj){
					obj.element.innerHTML =  obj.value
					$(obj.element).css('text-align', 'right')	
				}
			}else if(rType == 'currencyRender'){
				column.renderType = function(obj){
					//需要处理精度
					
					var grid = obj.gridObj											
					var column = obj.gridCompColumn
					var field = column.options.field
					var rowIndex = obj.rowIndex
					var datatable = grid.dataTable
					var rowId =  $(grid.dataSourceObj.rows[rowIndex].value).attr("$_#_@_id");
					var row = datatable.getRowByRowId(rowId);				
					var precision = row.getMeta(field, 'precision') || ''
					var maskerMeta = iweb.Core.getMaskerMeta('currency') || {}
					maskerMeta.precision = precision || maskerMeta.precision
					var formater = new $.NumberFormater(maskerMeta.precision);
					var masker = new NumberMasker(maskerMeta);
					var svalue = masker.format(formater.format(obj.value)).value
					obj.element.innerHTML =  svalue
					$(obj.element).css('text-align', 'right')
					$(obj.element).attr('title', svalue)
				}
			}else if(rType == 'floatRender'){
				column.renderType = function(obj){
					//需要处理精度
					
					var grid = obj.gridObj											
					var column = obj.gridCompColumn
					var field = column.options.field
					var rowIndex = obj.rowIndex
					var datatable = grid.dataTable
					var rowId =  $(grid.dataSourceObj.rows[rowIndex].value).attr("$_#_@_id");
					var row = datatable.getRowByRowId(rowId);				
					var precision = row.getMeta(field, 'precision') || ''
					var maskerMeta = iweb.Core.getMaskerMeta('float') || {}
					maskerMeta.precision = precision || maskerMeta.precision
					var formater = new $.NumberFormater(maskerMeta.precision);
					var masker = new NumberMasker(maskerMeta);
					var svalue = masker.format(formater.format(obj.value)).value
					obj.element.innerHTML =  svalue
					$(obj.element).css('text-align', 'right')
					$(obj.element).attr('title', svalue)
				}
			}else if(rType == 'comboRender'){
				column.renderType = function(obj){
				  
				  //需要将key转化为name
					var ds = $.getJSObject(viewModel, eOptions['datasource'])
				
					obj.element.innerHTML = '';
					if(nameArr){
						nameArr.length = 0
					}
					
					var valArr = obj.value.split(',')
					var nameArr = []
					for( var i=0,length=ds.length; i<length; i++){
                      for(var j=0; j<valArr.length;j++){
                      	  if(ds[i].pk == valArr[j]){
                      	  	  nameArr.push(ds[i].name)
                      	  }
                      }
					}	
					var svalue = nameArr.toString()
					obj.element.innerHTML = svalue;
					$(obj.element).attr('title', svalue)
				  				  
				}
			}else if(rType == 'dateRender'){
				//通过grid的dataType为Date format处理
				column.renderType = function(obj){
				var svalue =  moment(obj.value).format('YYYY-M-D ')
				obj.element.innerHTML = svalue;
				$(obj.element).attr('title', svalue)
				}
			}else if(rType == 'dateTimeRender'){
				//通过grid的dataType为DateTime format处理
				column.renderType = function(obj){
				var svalue = moment(obj.value).format('YYYY-M-D HH:mm');
				obj.element.innerHTML = svalue;
				$(obj.element).attr('title', svalue)
				}
			}else if (typeof rType == 'function'){
				column.renderType =  rType
			}else if(rType == 'radioRender'){
				column.renderType = function(params){
					//debugger
					var ds = $.getJSObject(viewModel, eOptions['datasource'])
					var value = params.value
					var compDiv = $('<div class="u-grid-edit-item-radio"></div>');
					
					params.element.innerHTML = ""
					$(params.element).append(compDiv)
					
					for(var i = 0;i < ds.length;i++){
						if(ds[i].pk==value)
							compDiv.append('<input type="radio" value='+ds[i].pk +' checked /><i data-role="name">' +ds[i].name+ '</i>')
						else	
							compDiv.append('<input type="radio" value="'+ds[i].pk +'"/><i data-role="name">' +ds[i].name+ '</i>')
					}
					compDiv.find(":radio").each(function() {
						$(this).on('click', function() {
							debugger;
							var val = this.value
							compDiv.find(":radio").each(function() {
								if (this.value == val) {
									this.checked = true;
								}else{
									this.checked = false;
								}
							})							
							var grid = params.gridObj											
							var column = params.gridCompColumn
							var field = column.options.field
							var rowIndex = params.rowIndex
							var datatable = grid.dataTable
							var rowId =  $(grid.dataSourceObj.rows[rowIndex].value).attr("$_#_@_id");
							var row = datatable.getRowByRowId(rowId);
							row.setValue(field,val)
						})
					})						
//					var comp = new $.compManager.plugs.radio(compDiv[0],eOptions,viewModel);					
//					for( var i=0,length=rdo.length; i<length; i++){
//					   if(rdo[i].pk==value){
//					   	 obj.element.innerHTML = '<input type="radio" checked><i data-role="name">'+rdo[i].name+'</i>';
//					   	 break;
//					   }
//					}				
					
				}
			}
			columns.push(column);	
		});
		
		if (app && app.adjustFunc)
			app.adjustFunc.call(app, {id: this.id, type:'gridColumn', columns:columns});

		this.gridOptions.columns = columns;
		
		
		/*
		 * 处理viewModel与grid之间的绑定
		 * 
		 */
		var onRowSelectedFun = this.gridOptions.onRowSelected; 
		// 选中
		this.gridOptions.onRowSelected = function(obj) {
			var rowId = oThis.grid.dataSourceObj.rows[obj.rowIndex].value['$_#_@_id'];
			var index = oThis.dataTable.getIndexByRowId(rowId);
			if(oThis.grid.options.multiSelect){
				oThis.dataTable.addRowsSelect([index]);
			}else{
				oThis.dataTable.setRowSelect(index);
			}
			
			if(onRowSelectedFun){
				onRowSelectedFun.call(oThis,obj);
			}
		};
		this.dataTable.on($.DataTable.ON_ROW_SELECT, function(event) {
			/*index转化为grid的index*/
			$.each(event.rowIds, function() {
				var index = oThis.grid.getRowIndexByValue('$_#_@_id',this);
				var selectFlag = true;
				if(index > -1){
					selectFlag = oThis.grid.setRowSelect(parseInt(index));
					if(!selectFlag){
						oThis.dataTable.setRowUnSelect(oThis.dataTable.getIndexByRowId(this));
					}
				}
			});
		});
		
		//全选
		this.dataTable.on($.DataTable.ON_ROW_ALLSELECT, function(event) {
			oThis.grid.setAllRowSelect()
		});
		
		//全返选
		this.dataTable.on($.DataTable.ON_ROW_ALLUNSELECT, function(event) {
			oThis.grid.setAllRowUnSelect()
		});
		
		// 反选
		var onRowUnSelectedFun = this.gridOptions.onRowUnSelected; 
		this.gridOptions.onRowUnSelected = function(obj) {
			var rowId = oThis.grid.dataSourceObj.rows[obj.rowIndex].value['$_#_@_id'];
			var index = oThis.dataTable.getIndexByRowId(rowId);
			oThis.dataTable.setRowUnSelect(index);
			if(onRowUnSelectedFun){
				onRowUnSelectedFun.call(oThis,obj);
			}
		};
		this.dataTable.on($.DataTable.ON_ROW_UNSELECT, function(event) {
			$.each(event.rowIds, function() {
				var index = oThis.grid.getRowIndexByValue('$_#_@_id',this);
				var unSelectFlag = true;
				if(index > -1){
					unSelectFlag = oThis.grid.setRowUnselect(parseInt(index));
					if(!unSelectFlag){
						if(oThis.grid.options.multiSelect){
							oThis.dataTable.addRowsSelect([oThis.dataTable.getIndexByRowId(this)]);
						}else{
							oThis.dataTable.setRowSelect(oThis.dataTable.getIndexByRowId(this));
						}
					}
				}
			});
		});
		
		var onRowFocusFun = this.gridOptions.onRowFocus; 
		// focus
		this.gridOptions.onRowFocus = function(obj) {
			var rowId = oThis.grid.dataSourceObj.rows[obj.rowIndex].value['$_#_@_id'];
			var index = oThis.dataTable.getIndexByRowId(rowId);
			
			if(oThis.grid.options.rowClickBan) {
				oThis.dataTable.setRowFocus(index, true);
			} else {
				oThis.dataTable.setRowFocus(index);
			}
			
			if(onRowFocusFun){
				onRowFocusFun.call(oThis,obj);
			}
		};
		this.dataTable.on($.DataTable.ON_ROW_FOCUS, function(event) {
			/*index转化为grid的index*/
			var index = oThis.grid.getRowIndexByValue('$_#_@_id',event.rowId);
			if (index == oThis.grid.focusRowIndex){
				if(oThis.grid.eidtRowIndex != index && oThis.grid.eidtType == 'form'){
					oThis.editRowFun(index);
				}
				return
			}
			var focusFlag = true;
			if(index > -1){
				focusFlag = oThis.grid.setRowFocus(parseInt(index));
				if(oThis.grid.eidtRowIndex != index && oThis.grid.eidtType == 'form'){
					oThis.editRowFun(index);
				}
				if(!focusFlag){
					oThis.dataTable.setRowUnFocus(oThis.dataTable.getIndexByRowId(event.rowId));
				}
			}
		});
		
		// 反focus
		var onRowUnFocusFun = this.gridOptions.onRowUnFocus; 
		this.gridOptions.onRowUnFocus = function(obj) {
			var rowId = oThis.grid.dataSourceObj.rows[obj.rowIndex].value['$_#_@_id'];
			var index = oThis.dataTable.getIndexByRowId(rowId);
			oThis.dataTable.setRowUnFocus(index);
			if(onRowUnFocusFun){
				onRowUnFocusFun.call(oThis,obj);
			}
		};
		this.dataTable.on($.DataTable.ON_ROW_UNFOCUS, function(event) {
			var index = oThis.grid.getRowIndexByValue('$_#_@_id',event.rowId);
			var unFocusFlag = true;
			if(index > -1){
				unFocusFlag = oThis.grid.setRowUnFocus(parseInt(index));
				if(!unFocusFlag){
					oThis.dataTable.setRowFocus(oThis.dataTable.getIndexByRowId(event.rowId));
				}
			}
		});
		
		// 增行,只考虑viewModel传入grid
//		var onRowInsertFun = this.gridOptions.onRowInsert; 
//		this.gridOptions.onRowInsert = function(obj){
//			dataTable.insertRow(obj.index,obj.row);
//			if(onRowSelectedFun){
//				viewModel[onRowUnSelectedFun].call(grid,grid, row, rowindex);
//			}
//		};
		this.dataTable.on($.DataTable.ON_INSERT, function(event) {
			var gridRows = new Array();
			$.each(event.rows,function(){
				var row = this.data;
				var id = this.rowId;
				var gridRow = {};
				for(var filed in row){
					gridRow[filed] = row[filed].value;
				}
				gridRow['$_#_@_id'] = id;
				gridRows.push(gridRow); 
			})
			oThis.grid.addRows(gridRows,event.index);
		});
		
		this.dataTable.on($.DataTable.ON_UPDATE, function(event) {
			$.each(event.rows,function(){
				var row = this.data;
				var id = this.rowId;
				var gridRow = {};
				for(var filed in row){
					gridRow[filed] = row[filed].value;
				}
				gridRow['$_#_@_id'] = id;
				var index = oThis.grid.getRowIndexByValue('$_#_@_id',id);
				oThis.grid.updateRow(index,gridRow);
			})
			
		});		
		
		this.dataTable.on($.DataTable.ON_VALUE_CHANGE, function(obj) {
	
			var id = obj.rowId;
			var index = oThis.grid.getRowIndexByValue('$_#_@_id',id);
			if(index == -1) {
				return;
			}
			var field = obj.field;
			var value = obj.newValue;
			oThis.grid.updateValueAt(index,field,value);
			
		});		
		
		// 删除行,只考虑viewModel传入grid
//		this.gridOptions.onRowDelete = function(obj){
//			dataTable.removeRow(obj.index);
//		};
		this.dataTable.on($.DataTable.ON_DELETE, function(event) {
			/*index转化为grid的index*/
			var gridIndexs = new Array();
			$.each(event.rowIds, function() {
				var index = oThis.grid.getRowIndexByValue('$_#_@_id',this);
				gridIndexs.push(index);
			});
			oThis.grid.deleteRows(gridIndexs);
		});
		
		this.dataTable.on($.DataTable.ON_DELETE_ALL, function(event) {
			oThis.grid.setDataSource({})
		});		
		
		// 数据改变
		var onValueChangeFun = this.gridOptions.onValueChange; 
		this.gridOptions.onValueChange = function(obj) {
			var row = oThis.getDataTableRow(oThis.grid.dataSourceObj.rows[obj.rowIndex].value)
			if(row){
				if($.type(obj.newValue) == 'object') {
					row.setValue(obj.field, obj.newValue.trueValue);
					row.setMeta(obj.field, 'display', obj.newValue.showValue);
				} else {
					row.setValue(obj.field,obj.newValue);
				}
			}
			if(onValueChangeFun){
				onValueChangeFun.call(oThis,obj);
			}
		};
		this.dataTable.on('valueChange', function(event) {
			var field = event.field,
				rowId = event.rowId,
				oldValue = event.oldValue,
				newValue = event.newValue;
			var rowIndex = oThis.grid.getRowIndexByValue('$_#_@_id',rowId);
			if(rowIndex > -1){
				oThis.grid.updateValueAt(rowIndex,field,newValue);	
			}
		});
		// 加载数据,只考虑viewModel传入grid
		this.dataTable.on($.DataTable.ON_LOAD, function(data) {
			if(data.length > 0){
				var values = new Array();
				
				$.each(data, function() {
					var value = {};
					var dataObj = this.data;
					var id = this.rowId;
					for(var p in dataObj){
						var v = dataObj[p].value;
						value[p] = v;
					} 
					value['$_#_@_id'] = id;
					values.push(value);
				});
				var dataSource = {};
				dataSource['values'] = values;
				oThis.grid.setDataSource(dataSource);
			}
		});
		this.dataTable.on($.DataTable.ON_ENABLE_CHANGE, function(enable) {		
			oThis.grid.setEditable(enable.enable);
		});

		this.dataTable.on($.DataTable.ON_ROW_META_CHANGE, function(event){
			var field = event.field
			var meta = event.meta
			if (meta == 'required'){
				oThis.grid.setRequired(field, event.newValue)
			}
		})
		
		// 创建grid
		this.grid = $(element).grid(this.gridOptions);
		this.grid.dataTable = this.dataTable
		this.grid.viewModel = viewModel
		this.grid.gridModel = this
		
		
		
		//如果先插入数据再创建grid需要处理 load
		var data = this.dataTable.rows(); 
		if(data.length > 0){
			var values = new Array();
				
			$.each(data, function() {
				var value = {};
				var dataObj = this.data;
				var id = this.rowId;
				for(var p in dataObj){
					var v = dataObj[p].value;
					value[p] = v;
				} 
				value['$_#_@_id'] = id;
				values.push(value);
			});
			var dataSource = {};
			dataSource['values'] = values;
			oThis.grid.setDataSource(dataSource);
		}
		// 选中行
		var selectIndexs = this.dataTable.getSelectedIndexs();
		if(selectIndexs.length > 0){
			$.each(selectIndexs, function() {
				oThis.grid.setRowSelect(this);	
			});
		}
		
		return this;
	}
	
	Grid.getName = function() {
		return 'grid'
	}
	
	Grid.fn = Grid.prototype
	
	/**
	 * 获取grid行对应的数据模型行对象
	 * @param {Object} gridRow
	 */
	Grid.fn.getDataTableRow = function(gridRow){
		var rowId =  gridRow['$_#_@_id']
		var row = null
		var rowIndex = this.dataTable.getIndexByRowId(rowId)
		if(rowIndex > -1)
			row = this.dataTable.getRow(rowIndex);
		return row
	}
	
	Grid.fn.setEnable = function(enable){
		this.grid.setEditable(enable);
	}
	
	Grid.fn.setShowHeader = function(showHeader){
		this.grid.setShowHeader(showHeader);
	}
	
	// 传入要编辑的tr对应的jquery对象
	Grid.fn.editRowFun = function(index){
		this.dataTable.setRowSelect(index);
		this.grid.editRowIndexFun(index);
	}

	if ($.compManager)
		$.compManager.addPlug(Grid)

}($);

+ function($) {

	var Tree = function(element, options, viewModel) {
		var oThis = this;
		this.dataTable = $.getJSObject(viewModel, options["data"]);
		this.element = element;
		this.$element = $(element);
		this.id = options['id'];
		this.element.id = this.id;
		this.options = options;
		this.events = $.extend(true, {}, options.events);
		var treeSettingDefault = {
			//			async: {  //缓加载
			//				enable: oThis.options.asyncFlag,
			//				url: oThis.options.asyncFun
			//			},
			data: {
				simpleData: {
					enable: true
				}
			},
			check: {
				chkboxType: {
					"Y": "",
					"N": ""
				},
			},
			callback: {
				//点击前
				beforeClick: function(e, id, node) {
					if (oThis.events.beforeClick) {
						$.getFunction(viewModel, oThis.events.beforeClick)(e, id, node);
					}
				},
				// 选中/取消选中事件
				onCheck: function(e, id, node) {
					// 获取到节点的idValue
					var idValue = node.id;
					// 根据idValue查找到对应数据的rowId
					var rowId = oThis.getRowIdByIdValue(idValue);
					var index = oThis.dataTable.getIndexByRowId(rowId);
					if (node.checked) {
						// 选中数据行
						if (oThis.options.multiSelect) {
							oThis.dataTable.addRowsSelect([index]);
						} else {
							oThis.dataTable.setRowSelect(index);
						}
					} else {
						oThis.dataTable.setRowUnSelect(index);
					}

				},
				// 单选时点击触发选中
				onClick: function(e, id, node) {
					if (!oThis.options.multiSelect) {
						// 获取到节点的idValue
						var idValue = node.id;
						// 根据idValue查找到对应数据的rowId
						var rowId = oThis.getRowIdByIdValue(idValue);
						var index = oThis.dataTable.getIndexByRowId(rowId);
						oThis.dataTable.setRowSelect(index);
						if (oThis.events.onClick) {
							$.getFunction(viewModel, oThis.events.onClick)(e, id, node);
						}
					}

				}
			}

		};

		var setting = {};
		if (this.options.setting) {
			if (typeof(JSON) == "undefined")
				setting = eval("(" + this.options.setting + ")");
			else
				setting = $.getJSObject(viewModel, this.options.setting) || $.getJSObject(window, this.options.setting);
		}
		var treeSetting = $.extend({}, treeSettingDefault, setting);

		var treeData = [];
		// 根据idField、pidField、nameField构建ztree所需data
		var data = this.dataTable.rows();
		if (data.length > 0) {
			if (this.options.codeTree) {
				// 首先按照string进行排序
				data.sort(function(a, b) {
					var aObj = a.data;
					var bObj = b.data;
					var v1 = aObj[oThis.options.idField].value + '';
					var v2 = bObj[oThis.options.idField].value + '';
					try {
						return v1.localeCompare(v2);
					} catch (e) {
						return 0;
					}
				});
				var idArr = new Array();
				$.each(data, function() {
					var dataObj = this.data;
					var idValue = dataObj[oThis.options.idField].value;
					idArr.push(idValue);
				});
				var preValue = '';
				$.each(data, function() {
					var value = {};
					var dataObj = this.data;
					var idValue = dataObj[oThis.options.idField].value;
					var nameValue = dataObj[oThis.options.nameField].value;
					var pidValue = '';
					var startFlag = -1;
					// 如果当前值包含上一个值则上一个值为pid
					if (preValue != '') {
						var startFlag = idValue.indexOf(preValue);
					}
					if (startFlag == 0) {
						pidValue = preValue;
					} else {
						for (var i = 1; i < preValue.length; i++) {
							var s = preValue.substr(0, i);
							var f = idValue.indexOf(s);
							if (f == 0) {
								var index = $.inArray(s, idArr);
								if (index > 0 || index == 0) {
									pidValue = s;
								}
							} else {
								break;
							}
						}

					}
					value['id'] = idValue;
					value['pId'] = pidValue;
					value['name'] = nameValue;

					treeData.push(value);
					preValue = idValue;
				});
			} else {
				var values = new Array();
				$.each(data, function() {
					var value = {};
					var dataObj = this.data;
					var idValue = dataObj[oThis.options.idField].value;
					var pidValue = dataObj[oThis.options.pidField].value;
					var nameValue = dataObj[oThis.options.nameField].value;

					value['id'] = idValue;
					value['pId'] = pidValue;
					value['name'] = nameValue;
					treeData.push(value);
				});
			}
		}

		this.tree = $.fn.zTree.init(this.$element, treeSetting, treeData);


		// dataTable事件
		this.dataTable.on($.DataTable.ON_ROW_SELECT, function(event) {
			/*index转化为grid的index*/
			$.each(event.rowIds, function() {
				var row = oThis.dataTable.getRowByRowId(this);
				var dataObj = row.data;
				var idValue = dataObj[oThis.options.idField].value;
				var node = oThis.tree.getNodeByParam('id', idValue);
				if (oThis.options.multiSelect && !node.checked) {
					oThis.tree.checkNode(node);
				} else {
					oThis.tree.selectNode(node, false);
				}
			});
		});

		this.dataTable.on($.DataTable.ON_ROW_UNSELECT, function(event) {
			/*index转化为grid的index*/
			$.each(event.rowIds, function() {
				var row = oThis.dataTable.getRowByRowId(this);
				var dataObj = row.data;
				var idValue = dataObj[oThis.options.idField].value;
				var node = oThis.tree.getNodeByParam('id', idValue);
				if (oThis.options.multiSelect && node.checked) {
					oThis.tree.checkNode(node);
				} else {
					oThis.tree.cancelPreSelectedNode(treeSetting, node)
				}
			});
		});

		this.dataTable.on($.DataTable.ON_INSERT, function(event) {
			var gridRows = new Array();
			$.each(event.rows, function() {

				var value = {};
				var dataObj = this.data;
				var idValue = dataObj[oThis.options.idField].value;
				var pidValue = dataObj[oThis.options.pidField].value;
				var nameValue = dataObj[oThis.options.nameField].value;

				value['id'] = idValue;
				value['pId'] = pidValue;
				value['name'] = nameValue;
				var pNode = oThis.tree.getNodeByParam('id', pidValue);
				oThis.tree.addNodes(pNode, value, true);
			})
		});

		this.dataTable.on($.DataTable.ON_DELETE, function(event) {
			/*index转化为grid的index*/
			var gridIndexs = new Array();
			if (this.deleteRows.length > 0) {

				for (var i = 0; i < this.deleteRows.length; i++) {
					var row = this.deleteRows[i];
					var dataObj = row.data;
					var idValue = dataObj[oThis.options.idField].value;
					var node = oThis.tree.getNodeByParam('id', idValue);
					oThis.tree.removeNode(node)
				}

			}
		});

		this.dataTable.on($.DataTable.ON_DELETE_ALL, function(event) {
			var nodes = oThis.tree.getNodes();
			for (var i = 0, l = nodes.length; i < l; i++) {
				var node = oThis.tree.getNodeByParam('id', nodes[i].id);
				oThis.tree.removeNode(node);
				i--;
				l = nodes.length;
			}
		});

		// 加载数据,只考虑viewModel传入grid
		this.dataTable.on($.DataTable.ON_LOAD, function(data) {
			var data = oThis.dataTable.rows();
			if (data.length > 0) {
				var values = new Array();
				$.each(data, function() {
					var value = {};
					var dataObj = this.data;
					var idValue = dataObj[oThis.options.idField].value;
					var pidValue = dataObj[oThis.options.pidField].value;
					var nameValue = dataObj[oThis.options.nameField].value;

					value['id'] = idValue;
					value['pId'] = pidValue;
					value['name'] = nameValue;
					treeData.push(value);
				});
			}

			this.tree = $.fn.zTree.init(this.$element, treeSetting, treeData);
		});

		this.dataTable.on($.DataTable.ON_VALUE_CHANGE, function(event) {
			var row = oThis.dataTable.getRowByRowId(event.rowId)
			if (!row) return
			var id = row.getValue(oThis.options.idField)
			var node = oThis.tree.getNodeByParam('id', id);
			
			var field = event.field;
			var value = event.newValue;
			if (oThis.options.nameField == field){
				node.name = value
				oThis.tree.updateNode(node)
			}
			else if (oThis.options.pidField == field){
				var targetNode = oThis.tree.getNodeByParam('id', value);
				oThis.tree.moveNode(targetNode, node,"inner")				
			}
		});		
		// 通过树id获取dataTable的rowId
		this.getRowIdByIdValue = function(idValue) {
			var oThis = this;
			var rowId = null;
			$.each(this.dataTable.rows(), function() {
				var dataObj = this.data;
				var id = this.rowId;
				if (dataObj[oThis.options.idField].value == idValue) {
					rowId = id;
				}
			})
			return rowId;
		}

		return this;
	}

	Tree.getName = function() {
		return 'tree'
	}
	if ($.compManager)
		$.compManager.addPlug(Tree)

}($);
+function($) {

	var Combobox = $.InputComp.extend({
		initialize: function(element, options, viewModel) {
			var self = this
			Combobox.superclass.initialize.apply(this, arguments)
			this.datasource = $.getJSObject(viewModel, options['datasource'])
			this.single = options.single
			this.mutil = options.mutil
			this.validType = 'combo'
			if ($(this.element).children().length > 0)
				this.comboEle = $(this.element).find('div')[0]
			else
				this.comboEle = this.element
			this.create()	
			//$(this.comboEle).attr('contenteditable', true)
			if(this.mutil){
			   $(this.comboEle).on("mutilSelect",function(event,value){
			   	    self.setValue(value)
			   })
			}
			
			this.comp = $(this.comboEle).Combobox({
				readchange:false,
				dataSource: this.datasource,
				single:this.single,
				mutil:this.mutil,
				onSelect: function(item) {
					self.setValue(item.pk)
					self.trigger('onSelect',item)
//					if (self.onSelect) {
//						self.onSelect(item)
//					}
				}
			})
		},
		/**
		 * 增加dom事件
		 * @param {String} name
		 * @param {Function} callback
		 */
		addDomEvent: function(name, callback){
			$(this.comboEle).on(name, callback)
			return this
		},
		/**
		 * 移除dom事件
		 * @param {String} name
		 */
		removeDomEvent: function(name){
			$(this.comboEle).off(name)
		},
		modelValueChange: function(value) {
			if (this.slice) return
//			value = value || ""
			this.trueValue = value
			$(this.comboEle).val(value);	

		},
		setValue: function(value) {
			this.trueValue = value
			$(this.comboEle).val(value);			
			this.slice = true
			this.setModelValue(this.trueValue)
			this.slice = false
			this.trigger(Combobox.EVENT_VALUE_CHANGE, this.trueValue)
		},
		getValue: function() {
			return this.trueValue
		},
		setEnable: function(enable) {
			if (enable === true || enable === 'true') {
				this.enable = true				
				$(this.comboEle).data("enable",true)
				$(this.comboEle).parent().removeClass('disablecover')
			} else if (enable === false || enable === 'false') {
				this.enable = false				
				$(this.comboEle).data("enable",false)
				$(this.comboEle).parent().addClass('disablecover')
				
			}
		},
		Statics: {
			compName: 'combo'
		}
	})

	if ($.compManager)
		$.compManager.addPlug(Combobox)

}($);

+function($) {

	var StringComp = $.InputComp.extend({
		initialize: function(element, options, viewModel) {
			var self = this
			StringComp.superclass.initialize.apply(this, arguments)
			this.validType = 'string'
			this.maxLength = options['maxLength']
			this.minLength = options['minLength']
			if (this.dataModel) {
				if (this.hasDataTable) {
					this.minLength = this.dataModel.getMeta(this.field, "minLength") || this.minLength
					this.maxLength = this.dataModel.getMeta(this.field, "maxLength") || this.maxLength
				}
			}	
			this.create()
			if (this.element.nodeName == 'INPUT') {
				$(this.element).focusin(function(e) {
					self.setShowValue(self.getValue())
				})
				$(this.element).blur(function(e) {
					self.setValue(self.element.value)
				})
			}			
		},

		modelValueChange: function(value) {
			if (this.slice) return
			value = value || ""
			this.trueValue = value
			this.showValue = value//this.masker.format(value).value
			this.setShowValue(this.showValue)
		},
		setValue: function(value) {
			this.trueValue = value//this.formater.format(value)
			this.showValue = value//this.masker.format(value).value
			this.setShowValue(this.showValue)
			this.slice = true
			this.setModelValue(this.trueValue)
			this.slice = false
			this.trigger(StringComp.EVENT_VALUE_CHANGE, this.trueValue)
		},
		getValue : function() {
			return this.trueValue
		},
		setShowValue : function(showValue) {
			this.showValue = showValue
			this.element.value = showValue
			this.element.title = showValue
		},
		getShowValue: function() {
			return this.showValue
		},

		Statics: {
			compName: 'string'
		}
	})
	
	$.StringComp = StringComp
	if ($.compManager)
		$.compManager.addPlug(StringComp)

}($);

+function($ ) {
	var CheckboxComp = $.InputComp.extend({
		initialize: function(element, options, viewModel) {
			
			var self = this
			CheckboxComp.superclass.initialize.apply(this, arguments)
			this.create()
			
			if($.app){
				$(this.element).wrap("<label class='label-switch'></label>").after("<div class='checkbox'></div>").css("display","none")
				
    		}else{
		
			
				if($(this.element).parent(".checkbox").length === 0 && !iweb.browser.isIE8){
					$(this.element).wrap("<div class='checkbox check-success'></div>").after("<label for="+element.id+"></label>")
				}
				
			}
    		$(this.element).on('change',function(){
					var val = element.checked ? 'Y' : 'N'
					
					self.setValue(val)
			})
			
		},

		modelValueChange: function(val) {
			if (this.slice) return
			val = val || ""
			this.trueValue = val
			if (val == 'Y' || val == 'true') {
				this.showValue = true;
			} else if (val == 'N' || val == 'false') {
				this.showValue = false;
			} else {
				this.showValue = false;
			}
			this.setShowValue(this.showValue)
		},
		setValue: function(val) {
			this.trueValue = val
			if (val == 'Y' || val == 'true') {
				this.showValue = true;
			} else if (val == 'N' || val == 'false') {
				this.showValue = false;
			} else {
				this.showValue = false;
			}
			this.setShowValue(this.showValue)
			this.slice = true
			this.setModelValue(this.trueValue)
			this.slice = false
			this.trigger(CheckboxComp.EVENT_VALUE_CHANGE, this.trueValue)
		},
		getValue: function() {
			return this.trueValue
		},
		setShowValue: function(showValue) {
			this.showValue = showValue
			this.element.checked = showValue
		},
		getShowValue: function() {
			return this.showValue
		},

		Statics: {
			compName: 'check'
		}
	})

	if ($.compManager)
		$.compManager.addPlug(CheckboxComp)

}($);

+function($) {


	var CheckboxGroupComp = $.InputComp.extend({
		initialize: function(element, options, viewModel) {
			var self = this
			this.pks = [];
			CheckboxGroupComp.superclass.initialize.apply(this, arguments)
			this.validType = 'checkboxGroup'
			var datasource = $.getJSObject(viewModel, options['datasource'])
			
			if(!$.isArray(datasource)) return;
			
			var checkboxTemplate = $(this.element).children();
			
			if(!checkboxTemplate.is(":checkbox"))return;
			
			for(var i=0,len = (datasource.length-1);i<len;i++){
				checkboxTemplate.clone().appendTo(this.element)
			}
			
			var allCheckbox =  $(this.element).children('[type=checkbox]');
			var allName = $(this.element).children('[data-role=name]');
			for(var k=0;k<allCheckbox.length;k++){
				allCheckbox[k].value = datasource[k].pk
				allName[k].innerHTML = datasource[k].name
				this.pks.push(datasource[k].pk)
			}
			
	        this.valArr = [];
			this.create()
			
			$(this.element).find(":checkbox").each(function() {
				$(this).on('click', function() {
					
					if(self.valArr.length == 0){
						if(this.checked){
							self.valArr.push(this.value)
						}
					}else{
						if(this.checked){
							var mark = null;
							for(var i=0;i<self.valArr.length;i++){
								if(this.value == self.valArr[i]){
									mark = i;
								}
							}
							
							if(mark == null){
								self.valArr.push(this.value)
							}
							
						}else{
							
							for(var k=0;k<self.valArr.length;k++){
								if(this.value == self.valArr[k]){
									self.valArr.splice(k,1)
								}
							}
							
						}
					}
					//填值
					self.setValue(self.valArr.toString())
					
				})
			})
		},

		modelValueChange: function(val) {
			if (this.slice) return
			
           if(val !='' && val != null){
           	 this.valArr = val.split(',');
           }
           
           this.setValue(val)
		},
		setValue: function(val) {
			this.trueValue = val
			if(val == '' || val == null){
				var manualVal = ''
			}else{
				manualVal = val.split(',');
			}
			
			var pks = this.pks.slice();
			for(var k=0;k<pks.length;k++){
				var pk = pks[k]
				if(manualVal.indexOf(pk) !== -1){
					pks.splice(k,1);
					--k;
				}
				
			}
			
			$(this.element).find(":checkbox").each(function() {
//				for(var i=0;i<manualVal.length;i++){
//             	    if(this.value == manualVal[i]){
//             	    	this.checked = true;
//             	    }
//             }
				
				if(manualVal.indexOf(this.value) !== -1){
					this.checked = true
				}
				
				if(pks.indexOf(this.value) !== -1){
					this.checked = false
				}
			})
			this.slice = true
			this.setModelValue(this.trueValue)
			this.slice = false
			this.trigger(CheckboxGroupComp.EVENT_VALUE_CHANGE, this.trueValue)
		},
		getValue: function() {
			return this.trueValue
		},

		Statics: {
			compName: 'checkboxGroup'
		}
	})

	if ($.compManager)
		$.compManager.addPlug(CheckboxGroupComp)

}($);

+function($) {

	var DateTime = $.InputComp.extend({
		initialize: function(element, options, viewModel) {
			var self = this
			this.outerDiv = element
			element = $(element).find('input')[0]			
			DateTime.superclass.initialize.apply(this, arguments)
			this.maskerMeta = iweb.Core.getMaskerMeta('datetime') || {}
			this.maskerMeta.format = options['format'] || this.maskerMeta.format
		
			if (this.dataModel) {
				//处理数据精度
				if (this.hasDataTable) {
					this.dataModel.refRowMeta(this.field, "format").subscribe(function(format){
						self.setFormat(format)
					})							
					this.maskerMeta.format = this.dataModel.getMeta(this.field, "format") || this.maskerMeta.format
				}
			}
			this.validType = 'datetime'
			this.options.picker_type = "datetime";
			if(!options['format']) 
				this.options.format = "YYYY-MM-DD HH:mm:ss";
			this.formater = new $.DateFormater(this.maskerMeta.format);
			this.masker = new DateTimeMasker(this.maskerMeta);				
			this.create()
			this.comp = $(this.outerDiv).datetimepicker(this.options)
			$(this.element).focusin(function(e) {
				self.setShowValue(self.getValue())
			
			}).blur(function(e) {
				if (!self.doValidate() && self._needClean()){
					//self.element.value = self.getShowValue()
					self.setShowValue(self.getShowValue())
				}
				else
					//self.setValue(self.element.value)				
					self.setValue(this.value)
			})
			if($.app){
				$(this.element).on("picker_open",function(){
					self.setShowValue(self.getValue())	
				}).on("picker_close",function(){
					self.setValue(this.value)
				})
			}
		},
		modelValueChange: function(value) {
			if (this.slice) return
			value = value || ""
			this.trueValue = value
			var showValue = this.masker.format(value).value
			this.setShowValue(showValue)
		},
		setValue: function(value) {
			this.trueValue = value
			this.setShowValue(this.trueValue) //TODO fomat格式			
			this.slice = true
			this.setModelValue(value)
			this.slice = false
			this.trigger(DateTime.EVENT_VALUE_CHANGE, this.trueValue)
		},
		getValue : function() {
			return this.trueValue
		},
		setShowValue : function(showValue) {
			this.showValue = showValue
//			this.element.value = showValue
			$(this.element).val(showValue);			
			if($(this.outerDiv).data("DateTimePicker")){
				$(this.outerDiv).data("DateTimePicker").date(showValue)
			}	
		},
		getShowValue: function() {
			return this.showValue
		},
		/**
		 * 修改显示格式
		 * @param {Integer} precision
		 */
		setFormat: function(format){
			
			if (this.maskerMeta.format == format) return
			this.maskerMeta.format = format
			this.formater = new $.DateFormater(this.maskerMeta.format);
			this.masker = new DateTimeMasker(this.maskerMeta);				
 		},
 		setEnable: function(enable) {
			if (enable === true || enable === 'true') {
				this.enable = true
				if(!$.app){
				$(this.element).removeAttr('readonly')
				}
				$(this.element).attr('h7picker','true')
				
			} else if (enable === false || enable === 'false') {
				this.enable = false
				$(this.element).attr('h7picker','false')
				$(this.element).attr('readonly', 'readonly')
				
			}
		},
		Statics: {
			compName: 'datetime'
		}
	})

	var DateComp = DateTime.extend({
		initialize: function(element, options, viewModel) {
			var self = this
			this.outerDiv = element
			element = $(element).find('input')[0]
			DateTime.superclass.initialize.apply(this, arguments)
			this.maskerMeta = iweb.Core.getMaskerMeta('date') || {}
			this.maskerMeta.format = options['format'] || this.maskerMeta.format
		
			if (this.dataModel) {
				//处理数据精度
				if (this.hasDataTable) {
					this.dataModel.refRowMeta(this.field, "format").subscribe(function(format){
						self.setFormat(format)
					})							
					this.maskerMeta.format = this.dataModel.getMeta(this.field, "format") || this.maskerMeta.format
				}
			}
			this.validType = 'date'
			this.options.picker_type = "datecomp";
			if(!options['format']) 
				this.options.format = "YYYY-MM-DD";
			this.formater = new $.DateFormater(this.maskerMeta.format);
			this.masker = new DateMasker(this.maskerMeta);			
			
			this.create()
			
			this.comp = $(this.outerDiv).datetimepicker(this.options)		
			$(this.element).focusin(function(e) {
				self.setShowValue(self.getValue())
			
			}).blur(function(e) {
				if (!self.doValidate() && self._needClean()){
					//self.element.value = self.getShowValue()
					self.setShowValue(self.getShowValue())
				}
				else
					//self.setValue(self.element.value)				
					self.setValue(this.value)
			})
		},
		/**
		 * 修改显示格式
		 * @param {Integer} precision
		 */
		setFormat: function(format){
			if (this.maskerMeta.format == format) return
			this.maskerMeta.format = format
			this.formater = new $.DateFormater(this.maskerMeta.format);
			this.masker = new DateMasker(this.maskerMeta);				
 		},		
		Statics: {
			compName: 'date'
		}
	})

	if ($.compManager){
		$.compManager.addPlug(DateTime)
		$.compManager.addPlug(DateComp)
	}	

}($);

+function($) {

	var RadioComp = $.InputComp.extend({
		initialize: function(element, options, viewModel) {
			var self = this
			RadioComp.superclass.initialize.apply(this, arguments)
			var datasource = $.getJSObject(viewModel, options['datasource'])
			
			if(!$.isArray(datasource)) return;
			
			var radioTemplate = $(this.element).children();
			
			if(!radioTemplate.is(":radio"))return;
			
			for(var i=0,len = (datasource.length-1);i<len;i++){
				radioTemplate.clone().appendTo(this.element)
			}
			
			var allRadio =  $(this.element).children('[type=radio]');
			var allName = $(this.element).children('[data-role=name]');
			for(var k=0;k<allRadio.length;k++){
				allRadio[k].value = datasource[k].pk
				allName[k].innerHTML = datasource[k].name
			}
			
			this.radioInputName = allRadio[0].name;
			this.create()
			
			$(this.element).find(":radio[name='" + this.radioInputName + "']").each(function() {
				$(this).on('click', function() {
					if (this.checked) {
						self.setValue(this.value)
					}
				})
			})
		},

		modelValueChange: function(val) {
			if (this.slice) return

            this.setValue(val)
		},
		setValue: function(val) {
			this.trueValue = val
			$(this.element).find(":radio[name='" + this.radioInputName + "']").each(function() {
				if (this.value == val) {
					this.checked = true;
				}else{
					this.checked = false;
				}
			})
			this.slice = true
			this.setModelValue(this.trueValue)
			this.slice = false
			this.trigger(RadioComp.EVENT_VALUE_CHANGE, this.trueValue)
		},
		getValue: function() {
			return this.trueValue
		},

		Statics: {
			compName: 'radio'
		}
	})

	if ($.compManager)
		$.compManager.addPlug(RadioComp)

}($);

+function($) {
	var IntegerComp = $.InputComp.extend({
		initialize: function(element, options, viewModel) {
			var self = this
			IntegerComp.superclass.initialize.apply(this, arguments)
			this.validType='integer'
			this.max = options['max']
			this.min = options['min']
			if (this.dataModel) {
				if (this.hasDataTable) {
					this.min = this.dataModel.getMeta(this.field, "min") || this.min
					this.max = this.dataModel.getMeta(this.field, "max") || this.max
				}
			}	
			
			this.create()
			
		},
		modelValueChange: function(value) {
			if (this.slice) return
			value = value || ""
			this.trueValue = value
			this.showValue = value //this.masker.format(value).value
			this.setShowValue(this.showValue)
		},
		setValue: function(value) {
			this.trueValue = value //this.formater.format(value)
			this.showValue = value //this.masker.format(value).value
			this.setShowValue(this.showValue)
			this.slice = true
			this.setModelValue(this.trueValue)
			this.slice = false
			this.trigger(IntegerComp.EVENT_VALUE_CHANGE, this.trueValue)
		},
		getValue : function() {
			return this.trueValue
		},
		setShowValue : function(showValue) {
			this.showValue = showValue
			this.element.value = showValue
		},
		getShowValue: function() {
			return this.showValue
		},

		Statics: {
			compName: 'integer'
		}
	})

	if ($.compManager)
		$.compManager.addPlug(IntegerComp)

}($);

+function($) {

	/**
	 * 货币控件
	 */
	var CurrencyComp = $.InputComp.extend({
		initialize: function(element, options, viewModel) {
			var self = this
			CurrencyComp.superclass.initialize.apply(this, arguments)
			this.maskerMeta = iweb.Core.getMaskerMeta('currency') || {}
			this.maskerMeta.precision = options['precision'] ||  this.maskerMeta.precision
			this.maskerMeta.curSymbol = options['curSymbol'] ||  this.maskerMeta.curSymbol
			this.validType = 'float'
			this.max = options['max']
			this.min = options['min']
			if (this.dataModel) {
				//处理数据精度
				if (this.hasDataTable) {
					this.dataModel.refRowMeta(this.field, "precision").subscribe(function(precision){
						self.setPrecision(precision)
					})							
					this.maskerMeta.precision = this.dataModel.getMeta(this.field, "precision") || this.maskerMeta.precision
					this.dataModel.refRowMeta(this.field, "curSymbol").subscribe(function(symbol){
						self.setCurSymbol(symbol)
					})							
					this.maskerMeta.curSymbol = this.dataModel.getMeta(this.field, "curSymbol") || this.maskerMeta.curSymbol
					this.min = this.dataModel.getMeta(this.field, "min") || this.min
					this.max = this.dataModel.getMeta(this.field, "max") || this.max
				}
			}	
			this.formater = new $.NumberFormater(this.maskerMeta.precision);
			this.masker = new CurrencyMasker(this.maskerMeta);			
			this.create()
		},
		modelValueChange: function(value) {
			value = value || ""
		//	this.trueValue = value
		//	var formatValue = this.formater.format(this.trueValue)
		    var formatValue = this.formater.format(value)
		    this.trueValue = formatValue
		    this.element.trueValue = this.trueValue
			this.showValue = this.masker.format(formatValue).value
			this.setShowValue(this.showValue)
		},
		setValue: function(value) {
			this.trueValue = this.formater.format(value)
			this.element.trueValue = this.trueValue
			this.showValue = this.masker.format(this.trueValue).value
			this.setShowValue(this.showValue)
			this.setModelValue(this.trueValue)
			this.trigger(CurrencyComp.EVENT_VALUE_CHANGE, this.trueValue)
		},
		getValue : function() {
			return this.trueValue
		},
		setShowValue : function(showValue) {
			this.showValue = showValue
			this.element.value = showValue
		},
		getShowValue: function() {
			return this.showValue
		},
		/**
		 * 修改精度
		 * @param {Integer} precision
		 */
		setPrecision: function(precision){
			if (this.maskerMeta.precision == precision) return
			this.maskerMeta.precision =precision
			this.formater = new $.NumberFormater(this.maskerMeta.precision);
			this.masker = new CurrencyMasker(this.maskerMeta);				
 		},
		/**
		 * 修改币符
		 * @param {String} curSymbol
		 */
		setCurSymbol: function(curSymbol){
			if (this.maskerMeta.curSymbol == curSymbol) return
			this.maskerMeta.curSymbol =curSymbol
			this.masker = new CurrencyMasker(this.maskerMeta);
 		},

		Statics: {
			compName: 'currency'
		}
	})

	if ($.compManager)
		$.compManager.addPlug(CurrencyComp)

}($);

+function($) {
	var Multilang = $.InputComp.extend({
		initialize: function(element, options, viewModel) {
			var self = this
			Multilang.superclass.initialize.apply(this, arguments)
			this.create()
			var multinfo =  iweb.Core.getLanguages() 
			if(options.multinfo){
				multinfo = options.multinfo
			}
			
			var multidata = [];
			this.field = options.field;
			multinfo.lang_name =  options.field
			for(i = 0; i < multinfo.length; i++){
				if(i){
					multidata.push(" ")	
				}else{
					multidata.push(" ")						
				}
				
			}
		
			
			this.multinfo = multinfo;
			this.multidata = multidata;
			$(element).multilang({"multinfo":multinfo, "multidata":multidata});

			this.$element = $(element)
			this.$element.on('change.u.multilang', function(event, valObj) {
				
				self.setModelValue(valObj)
			})
		},
		create: function() {
			var self = this			
			if (this.dataModel) {
				//处理数据绑定
				if (this.hasDataTable) {
					this.dataModel.ref(this.field).subscribe(function(value) {
							self.modelValueChange(value)
					})
//					this.dataModel.ref(this.fieldlang).subscribe(function(value) {
//							self.modelValuelangChange(value)
//					})
					//处理只读
					this.dataModel.refEnable(this.field).subscribe(function(value){
						self.setEnable(value)
					})
					this.setEnable(this.dataModel.isEnable(this.field))
				} else {
					this.dataModel.subscribe(function(value) {
						self.modelValueChange(value)
					})
				}
				this.modelValueChange(this.hasDataTable ? this.dataModel.getValue(this.field) : this.dataModel())
//				this.modelValuelangChange(this.hasDataTable ? this.dataModel.getValue(this.fieldlang) : this.dataModel())
			}

		},
		parseDataModel: function() {
			if (!this.options || !this.options["data"]) return
			this.dataModel = $.getJSObject(this.viewModel, this.options["data"])
			if (this.dataModel instanceof $.DataTable) {
				this.hasDataTable = true
				this.field = this.options["field"]
	//			this.fieldlang = this.options["fieldlang"]
			}
		},
		//往模型上设置值
		setModelValue: function(valObj) {
			if (!this.dataModel) return
			if (this.hasDataTable) {
				
				this.dataModel.setValue(valObj.field, valObj.newValue)
	//			this.dataModel.setValue(this.fieldlang, valObj.lang)
			} else {
				this.dataModel(valObj.newValue)
			}
		},
		modelValueChange: function(value) {	
			
			var self = this
			if(this.multidata){
				self.multidata[0] = value
				for(i = 1; i < self.multinfo.length; i++){
					if(i){
						self.multidata[i] = self.dataModel.getValue(this.field + (i+1),self.dataTableRow)							
					}	
				}
				this.$element.multilang({"multidata":self.multidata});	
				
			}
			
			
			
			//this.dataModel.getValue(this.field,this.dataTableRow)
			//$(this.element).siblings('.multilang_body').children('input').val(value)

		},
		modelValuelangChange: function(value) {
			
		},
		Statics: {
			compName: 'multilang'
		}
	})

	if ($.compManager)
		$.compManager.addPlug(Multilang)
}($);

+function($) {

	var Pagination = function(element, options, viewModel) {
		var oThis = this;
		this.dataTable = $.getJSObject(viewModel, options["data"]);
		this.element = element;
		this.$element = $(element)

		if (!this.dataTable.pageSize() && options.pageSize)
			this.dataTable.pageSize(options.pageSize)
		options.pageSize = this.dataTable.pageSize() || options.pageSize
		this.$element.pagination(options);
		this.pagination = this.$element.data('u.pagination')
		this.pagination.dataTable = this.dataTable
		
		this.$element.on('pageChange', function(event,pageIndex) {
			var pagesize = parseInt($(event.target.lastChild).find(".page_z").val())
			if(!typeof(pagesize)){
				pagesize = options.pageSize
			}
			if(oThis.dataTable.pageSize() == pagesize) {
				oThis.dataTable.cacheCurrentPage()
			} else {
				oThis.dataTable.clearCache()
			}
			if(oThis.dataTable.hasPage(--pageIndex)){
				oThis.dataTable.setCurrentPage(pageIndex)
			} else {
				oThis.dataTable.removeAllRows()
				if(viewModel['pageChange']) {
					viewModel['pageChange'](pageIndex,pagesize)  
				}
			}
		})


		this.dataTable.totalPages.subscribe(function(value) {
			oThis.pagination.update({totalPages:value})
		})

		this.dataTable.pageSize.subscribe(function(value) {
			oThis.pagination.update({pageSize:value})
		})

		this.dataTable.pageIndex.subscribe(function(value) {
			oThis.pagination.update({currentPage:value+1})
		})


		
	}
	
	Pagination.getName = function() {
		return 'pagination'
	}

	if ($.compManager)
		$.compManager.addPlug(Pagination)

}($);

+function($) {

	/**
	 * Class Editor
	 * @param {[type]} document  [description]
	 * @param {[type]} options   [description]
	 * @param {[type]} viewModel [description]
	 */
	var Editor = $.InputComp.extend({
		initialize: function(element, options, viewModel) {
			
			this.element = element;
			this.id = options['id'];
			this.options = options;
			this.viewModel = viewModel;
			this.e_editor = this.id + "editor";
			this.render(this.options);
			
			Editor.superclass.initialize.apply(this, arguments)
			this.create()
			
			
		},
		
		render: function(data){
			var cols = data.cols || 80;
			var rows = data.rows || 10;
			var self = this
			var tpls = '<textarea cols="' + cols + '" id="'+ this.e_editor +'" name="editor" rows="' + rows + '"></textarea>';
			$(this.element).append(tpls);
			//this.element.append(tpls);
			$( '#'+this.e_editor ).ckeditor(); 
			var tmpeditor = CKEDITOR.instances[this.e_editor]
			this.tmpeditor = tmpeditor
			//tmpeditor.setData()
			this.tmpeditor.on('blur',function(){
			
				self.setValue(tmpeditor.getData())
			});
			
			this.tmpeditor.on('focus',function(){
				
				self.setShowValue(self.getValue())
			});
			
			//console.log(CKEDITOR.instances[this.e_editor].getData())
		},
		modelValueChange: function(value) {
			if (this.slice) return
			value = value || ""
			this.trueValue = value
			this.showValue = value//this.masker.format(value).value
			this.setShowValue(this.showValue)
		},
		setValue: function(value) {
			this.trueValue = value//this.formater.format(value)
			this.showValue = value//this.masker.format(value).value
			this.setShowValue(this.showValue)
			this.slice = true
			this.setModelValue(this.trueValue)
			this.slice = false
			this.trigger(Editor.EVENT_VALUE_CHANGE, this.trueValue)
		},
		getValue : function() {
			return this.trueValue
		},
		setShowValue : function(showValue) {
			this.showValue = showValue			
			this.element.value = showValue
			this.tmpeditor.setData(showValue)
		},
		getShowValue: function() {
			return this.showValue
		},
		getContent: function(){
			return $( '#'+this.e_editor ).html();
		},

		setContent: function(txt){
			$( '#'+this.e_editor ).html(txt);
		},

		Statics: {
			compName: 'editor'
		}
	});	

	if ($.compManager)
		$.compManager.addPlug(Editor)

}($);

+function($) {

/**
 * link控件
 */
	var LinkComp = $.BaseComponent.extend({ 
		initialize: function(element, options, viewModel) {
			$.InputComp.superclass.initialize.apply(this, arguments)
			this.dataModel = null
			this.hasDataTable = false
			this.enable = true
			this.parseDataModel()
			if(options['click']){
				var clickFunc  = $.getJSObject(viewModel, options['click'])
				this.on('click', clickFunc)
			}
				
			this.create()
		},
		create: function() {
			var self = this
			if (this.dataModel) {
				//处理数据绑定
				if (this.hasDataTable) {
					this.dataModel.ref(this.field).subscribe(function(value) {
							self.modelValueChange(value)
					})
					//处理只读
					this.dataModel.refEnable(this.field).subscribe(function(value){
						self.setEnable(value)
					})
					this.setEnable(this.dataModel.isEnable(this.field))
				} else {
					this.dataModel.subscribe(function(value) {
						self.modelValueChange(value)
					})
				}
				this.modelValueChange(this.hasDataTable ? this.dataModel.getValue(this.field) : this.dataModel())
			}
			$(this.element).on('click', function(){
				if (self.enable)
					self.trigger('click', {field:self.field,dataTable:self.dataModel})
			})
		},
		/**
		 * 模型数据改变
		 * @param {Object} value
		 */
		modelValueChange: function(value) {
			this.setValue(value)
		},

		/**
		 * @private
		 */
		parseDataModel: function() {
			if (!this.options || !this.options["data"]) return
			this.dataModel = $.getJSObject(this.viewModel, this.options["data"])
			if (this.dataModel instanceof $.DataTable) {
				this.hasDataTable = true
				this.field = this.options["field"]
			}
		},
		/**
		 * 设置控件值
		 * @param {Object} value
		 */
		setValue: function(value) {
			this.value = value
			$(this.element).html(value)
		},
		/**
		 * 取控件的值
		 */
		getValue: function() {
			return this.value
		},
//		setUrl: function(url){
//			
//		},
//		getUrl: function(){
//			
//		}

		setEnable: function(enable){
			if(enable === true || enable === 'true'){
				this.enable = true
				$(this.element).css('cursor', 'pointer')	
			}	
			else if(enable === false || enable === 'false'){	
				this.enable = false			
				$(this.element).css('cursor', 'not-allowed')
			}	
		},

		Statics: {
			compName: 'link'
		}
	})

	if ($.compManager)
		$.compManager.addPlug(LinkComp)

}($);

+ function($) {

	var Textarea = $.InputComp.extend({
		initialize: function(element, options, viewModel) {
			var self = this
			Textarea.superclass.initialize.apply(this, arguments)
			this.create()

			if (this.element.nodeName == 'TEXTAREA') {
				$(this.element).focusin(function(e) {
					self.setShowValue(self.getValue())
				})
				$(this.element).blur(function(e) {
					self.setValue(self.element.value)
				})
			}
		},

		modelValueChange: function(value) {
			if (this.slice) return
			value = value || ""
			this.trueValue = value
			this.showValue = value //this.masker.format(value).value
			this.setShowValue(this.showValue)
		},
		setValue: function(value) {
			this.trueValue = value //this.formater.format(value)
			this.showValue = value //this.masker.format(value).value
			this.setShowValue(this.showValue)
			this.slice = true
			this.setModelValue(this.trueValue)
			this.slice = false
			this.trigger(Textarea.EVENT_VALUE_CHANGE, this.trueValue)
		},
		getValue: function() {
			return this.trueValue
		},
		setShowValue: function(showValue) {
			this.showValue = showValue
			this.element.value = showValue
			this.element.title = showValue
		},
		getShowValue: function() {
			return this.showValue
		},


		Statics: {
			compName: 'textarea'
		}
	})

	if ($.compManager)
		$.compManager.addPlug(Textarea)

}($);
+function($) {

	/**
	 * 百分比控件
	 */
	var PercentComp = $.InputComp.extend({
		initialize: function(element, options, viewModel) {
			var self = this
			PercentComp.superclass.initialize.apply(this, arguments)
			this.validType = 'float'
			this.max = options['max']
			this.min = options['min']
			if (this.dataModel) {
				//处理数据精度
				if (this.hasDataTable) {						
					this.min = this.dataModel.getMeta(this.field, "min") || this.min
					this.max = this.dataModel.getMeta(this.field, "max") || this.max
				}
			}	
			this.masker = new PercentMasker();			
			this.create()
		},
		modelValueChange: function(value) {
			if (this.slice) return
			value = value || ""
			this.trueValue = value
			this.showValue = this.masker.format(value).value
			this.setShowValue(this.showValue)
		},
		setValue: function(value) {
			this.trueValue = value //this.formater.format(value)
			this.showValue = this.masker.format(value).value
			this.setShowValue(this.showValue)
			this.slice = true
			this.setModelValue(this.trueValue)
			this.slice = false
			this.trigger(PercentComp.EVENT_VALUE_CHANGE, this.trueValue)
		},
		getValue : function() {
			return this.trueValue
		},
		setShowValue : function(showValue) {
			this.showValue = showValue
			this.element.value = showValue
		},
		getShowValue: function() {
			return this.showValue
		},

		Statics: {
			compName: 'percent'
		}
	})

	if ($.compManager)
		$.compManager.addPlug(PercentComp)

}($);

+function( $, ko) {
	var App = function(){
		this.dataTables = {}
//		this.comps = {}
	}
	
	App.fn = App.prototype
	
	App.fn.init = function(viewModel, element, doApplyBindings){
		var self = this
		this.element = element || document.body
		$(this.element).find('[u-meta]').each(function() {
			if ($(this).data('u-meta')) return
			if ($(this).parents('[u-meta]').length > 0) return 
			var options = JSON.parse($(this).attr('u-meta'))
			if(options && options['type']) {
				if (self.adjustFunc)
					self.adjustFunc.call(self, options);
				var comp = $.compManager._createComp(this, options, viewModel, self)
				if (comp)
//					this.comps[comp.getId()] = comp
					$(this).data('u-meta', comp)
			}
		})	
		if ($.hotkeys)
			$.hotkeys.scan(this.element)
		
		_getDataTables(this, viewModel)	
//		ko.cleanNode(this.element)
		try{
			if (typeof doApplyBindings == 'undefined' || doApplyBindings == true)
				ko.applyBindings(viewModel, this.element)
		}catch(e){
			iweb.log.error(e)
		}
	}
	
	App.fn.setAdjustMetaFunc = function(adjustFunc){
		this.adjustFunc = adjustFunc
	}
	
	App.fn.addDataTable = function(dataTable){
		this.dataTables[dataTable.id] = dataTable
		return this
	}
	App.fn.getDataTable = function(id){
		return this.dataTables[id]
	}
	
	App.fn.getDataTables = function(){
		return this.dataTables
	}
	
	App.fn.getComp = function(compId){
		var returnComp = null;
		$(this.element).find('[u-meta]').each(function() {
			if ($(this).data('u-meta')){
				var comp = $(this).data('u-meta')
				if (comp.id == compId){
					returnComp = comp;
					return false;
				}
				    
			}	
		})
		return returnComp;
	}
	
	App.fn.getCompsByDataTable = function(dataTableId,element){
		var comps = this.getComps(element),
			targetComps = []
		for (var i=0; i<comps.length; i++){
			if ((comps[i].dataModel && comps[i].dataModel['id'] == dataTableId) || (comps[i].dataTable && comps[i].dataTable['id'] == dataTableId))
				targetComps.push(comps[i])
		}
		return targetComps
	}
	
	/**
	 * 获取某区域中的所有控件
	 * @param {object} element
	 */
	App.fn.getComps = function(element){
		element = element ? element : this.element
		var returnComps = [];
		$(element).find('[u-meta]').each(function() {
			if ($(this).data('u-meta')){
				var comp = $(this).data('u-meta')
				if (comp)
					returnComps.push(comp);
			}	
		})
		return returnComps;		
	}
	
	/**
	 * 控件数据校验
	 * @param {Object} element
	 */
	App.fn.compsValidate = function(element){
		var comps = this.getComps(element),
		passed = true
		for(var i=0; i< comps.length; i++){
			if (comps[i].doValidate)
			passed = comps[i].doValidate(true) && passed			
		}
		return passed
	}
	
	/**
	 * 根据类型获取控件
	 * @param {String} type
	 * @param {object} element
	 */
	App.fn.getCompsByType = function(type,element){
		element = element ? element : this.element
		var returnComps = [];
		$(element).find('[u-meta]').each(function() {
			if ($(this).data('u-meta')){
				var comp = $(this).data('u-meta')
				if (comp && comp.type == type)
					returnComps.push(comp);
			}	
		})
		return returnComps;			
	}
	
	
	App.fn.getEnvironment = function(){
		return window.iweb.Core.collectEnvironment()
	}
	
	App.fn.setClientAttribute = function(k,v){
		window.iweb.Core.setClientAttribute(k,v)
	}
	
	App.fn.getClientAttribute = function(k){
		window.iweb.Core.getClientAttributes()[k]
	}
	
	App.fn.serverEvent = function(){
		return new ServerEvent(this)
	}
	
	App.fn.ajax = function(params){
		params = this._wrapAjax(params) 
		$.ajax(params)		
	}
	
	App.fn._wrapAjax = function(params){
		var self = this
		var orignSuccess =  params.success
		var orignError =  params.error
		var deferred =  params.deferred;
		if(!deferred || !deferred.resolve){
			deferred = {resolve:function(){},reject:function(){}}
		} 
		params.success = function(data,state,xhr){
			if(processXHRError(self,data,state,xhr)){
				orignSuccess.call(null, data)
				self._successFunc(data, deferred)
			}else{
				deferred.reject();
			}
		}
		params.error=function(data,state,xhr){
			if(processXHRError(self,data,state,xhr)){
				orignError.call(null, data)
				self._successFunc(data, deferred)
			}else{
				deferred.reject();
			}
		}
		if(params.data)
			params.data.environment=ko.toJSON(window.iweb.Core.collectEnvironment());
		else
			params.data = {environment:ko.toJSON(window.iweb.Core.collectEnvironment())}
		return params		
	}
	
	App.fn._successFunc = function(data, deferred){
		deferred.resolve();
	}
	
	window.processXHRError  = function (rsl,state,xhr) {
		if(typeof rsl ==='string')
			rsl = JSON.parse(rsl)
		if(xhr.getResponseHeader && xhr.getResponseHeader("X-Error")){
			$.showMessageDialog({type:"info",title:"提示",msg: rsl["message"],backdrop:true});
			if(rsl["operate"]){
				eval(rsl["operate"]);
			}
			return false;
		}
		return true;
	};

	App.fn.setUserCache = function(key,value){
		var userCode = this.getEnvironment().usercode;
		if(!userCode)return;
		localStorage.setItem(userCode+key,value);
	}
	
	App.fn.getUserCache = function(key){
		var userCode = this.getEnvironment().usercode;
		if(!userCode)return;
		return localStorage.getItem(userCode+key);
	}
	
	App.fn.removeUserCache = function(key){
		var userCode = this.getEnvironment().usercode;
		if(!userCode)return;
		localStorage.removeItem(userCode+key);
	}
	
	App.fn.setCache = function(key,value){
		localStorage.setItem(key,value);
	}
	
	App.fn.getCache = function(key){
	   return localStorage.getItem(key);
	}
	
	App.fn.removeCache = function(key){
		localStorage.removeItem(key)
	}
	
	App.fn.setSessionCache = function(key,value){
		sessionStorage.setItem(key,value)
	}
	
	App.fn.getSessionCache = function(key){
		return sessionStorage.getItem(key)
	}
	
	App.fn.removeSessionCache = function(key){
		sessionStorage.removeItem(key)
	}
	
	App.fn.setEnable = function(enable){
		$(this.element).find('[u-meta]').each(function() {
			if ($(this).data('u-meta')){
				var comp = $(this).data('u-meta')
				if (comp.setEnable)
					comp.setEnable(enable)
			}	
		})		
	}
	
	var ServerEvent = function(app){
		this.app = app
		this.datas = {}			
		this.params = {}
		this.event = null
		this.ent = window.iweb.Core.collectEnvironment()
		if (window.pako && iweb.debugMode == false)
			this.compression = true
	}
	
	ServerEvent.DEFAULT = {
		async: true,
		singleton: true,
		url: (window.$ctx || '/iwebap') + '/evt/dispatch'
	}
	
	ServerEvent.fn = ServerEvent.prototype
	
	ServerEvent.fn.addDataTable = function(dataTableId, rule){
		var dataTable = this.app.getDataTable(dataTableId)
		this.datas[dataTableId] = dataTable.getDataByRule(rule)
		return this
	}
	
	ServerEvent.fn.setCompression = function(compression){
		if (!window.pako && compression == true)
			iweb.log.error("can't compression, please include  pako!")
		else	
			this.compression = compression
	}
	
	/**
	 * 
	 * @param {Object} dataTabels
	 * 格式1: ['dt1',{'dt2':'all'}]，格式2：['dt1', 'dt2']，格式3: ['dt1', 'dt2'], 'all'  
	 */
	ServerEvent.fn.addDataTables = function(dataTables){
		if(arguments.length == 2) {
			for(var i = 0; i<dataTables.length; i++){
				var rule;
				if(typeof arguments[1] == 'string') {
					rule = arguments[1]
				} else if($.type(arguments[1]) == 'array') {
					rule = arguments[1][i]
				}
				this.addDataTable(dataTables[i], rule)
			}
		} else {
			for(var i = 0; i<dataTables.length; i++){
				var dt = dataTables[i]
				if (typeof dt == 'string')
					this.addDataTable(dt)
				else{
					for (key in dt)
						this.addDataTable(key, dt[key])
				}
			}
		}
		
		return this
	}
	
	ServerEvent.fn.addAllDataTables = function(rule){
		var dts = this.app.dataTables 
		for (var i = 0; i< dts.length; i++){
			this.addDataTable(dts[i].id, rule)
		}
	}
	
	
	ServerEvent.fn.addParameter = function(key,value){
		this.params[key] = value
		return this
	}
	
	ServerEvent.fn.setEvent = function(event){
		if (true)
			this.event = event
		else
			this.event = _formatEvent(event)
		return this	
	}
	
	var _formatEvent = function(event){
		return event
	}
	
	
//	app.serverEvent().fire({
//		ctrl:'CurrtypeController',
//		event:'event1',
//		success:
//		params:
//	})	
	ServerEvent.fn.fire = function(p){
		var self = this
//		params = $.extend(ServerEvent.DEFAULT, params);
		var data = this.getData()
		data.parameters = ko.toJSON(this.params)
		var params = {
			type: p.type ||  "POST",
			data: p.params || {},
			url: p.url || ServerEvent.DEFAULT.url,
			async: typeof p.async == 'undefined' ? ServerEvent.DEFAULT.async : p.async,
			singleton: p.singleton || ServerEvent.DEFAULT.singleton,
			success: p.success,
			error: p.error,
			dataType:'json'
		}
		params.data.ctrl = p.ctrl
		params.data.method = p.method
        if (this.event)
			params.data.event = ko.toJSON(this.event)
		var preSuccess = params.preSuccess || function(){}	
		var orignSuccess =  params.success || function(){}
		var orignError = params.error //|| function(){}
		this.orignError = orignError
		var deferred =  params.deferred;
		if(!deferred || !deferred.resolve){
			deferred = {resolve:function(){},reject:function(){}}
		} 
		params.success = function(data,state,xhr){
			if(processXHRError(self, data,state,xhr)){
				preSuccess.call(null, data)
				self._successFunc(data, deferred)
				orignSuccess.call(null, data.custom)
				deferred.resolve();
			}else{
				deferred.reject();
			}
		}
		params.error=function(data,state,xhr){
			if(processXHRError(self, data,state,xhr)){
				if (orignError)
				orignError.call(null, data.custom)
//				self._successFunc(data, deferred)
			}else{
				deferred.reject();
			}
		}
		params.data = $.extend(params.data,data);
		$.ajax(params)
		
	}
	
	ServerEvent.fn.getData = function(){
		var envJson = ko.toJSON(this.app.getEnvironment()),
			datasJson = ko.toJSON(this.datas),
			compressType = ''
		if (this.compression){
			if(window.isSwfCompressReady()) {
				envJson = window.swfCompress(envJson)
				datasJson = window.swfCompress(datasJson)
				compressType = 'deflate'
			} else {
				envJson = encodeBase64(window.pako.gzip(envJson))
				datasJson = encodeBase64(window.pako.gzip(datasJson))
				compressType = 'gzip'
			}
		}
		return 	{
			environment: envJson,
			dataTables: datasJson,
			compression: this.compression,
			compressType: compressType
		}
	}
	
	ServerEvent.fn._successFunc = function(data, deferred){
		var dataTables = data.dataTables
		var dom = data.dom
		if (dom)
			this.updateDom(JSON.parse(dom))
		if (dataTables)
			this.updateDataTables(dataTables, deferred)
	}
	
	ServerEvent.fn.updateDataTables = function(dataTables, deferred){
		for (var key in dataTables){
			var dt = this.app.getDataTable(key)
			if (dt) {
				dt.setData(dataTables[key])
				dt.updateMeta(dataTables[key].meta)
			}
		}
	}
	
	ServerEvent.fn.setSuccessFunc = function(func){
		this._successFunc = func
	}
	
	ServerEvent.fn.updateDom = function(){
		$.each( dom, function(i, n){
		 	var vo = n.two
			var $key = $(n.one)
			_updateDom($key, vo)
		});
	}
	
	function _updateDom($key, vos){
		for (var i in vos){
			var vo = vos[i]
			for (var key in vo){
				var props = vo[key]
				if (key == 'trigger'){
					$key.trigger(props[0])	
				}
				else{
					if ($.isArray(props)){
						$.each(props, function(i, n){
						  	$key[i](n)		
						});
					}
					else
						try{
							$key[i](vo)
						}catch(error){
							$key[i](vo[i])
						}
				}
			}
		}
	}
		
	var processXHRError  = function (self, rsl,state,xhr) {
		if(typeof rsl ==='string')
			rsl = JSON.parse(rsl)
		if(xhr.getResponseHeader && xhr.getResponseHeader("X-Error")){
			if (self.orignError)
				self.orignError.call(self,rsl,state,xhr)
			else{
				if ($.showMessageDialog)
					$.showMessageDialog({type:"info",title:"提示",msg: rsl["message"],backdrop:true});
				else
					alert(rsl["message"])
				if(rsl["operate"]){
					eval(rsl["operate"]);
				}
				return false;
			}
		}
		return true;
	};	
	
	$.createApp = function(){
		var app = new App()
		return app
	}

	var _getDataTables = function(app, viewModel){
		for(var key in viewModel){
			if (viewModel[key] instanceof $.DataTable){
				viewModel[key].id = key
				viewModel[key].parent = viewModel
				app.addDataTable(viewModel[key])
			}	
		}
	}
}($, ko);
}));