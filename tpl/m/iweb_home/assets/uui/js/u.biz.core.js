+ function($) {
	'use strict';

	/**
	 * 字符串去掉左右空格
	 */
	String.prototype.trim = function() {
		return this.replace(/^\s*(\b.*\b|)\s*$/, "$1");
	};

	/**
	 * 字符串替换
	 */
	String.prototype.replaceStr = function(strFind, strRemp) {
		var tab = this.split(strFind);
		return new String(tab.join(strRemp));
	};

	/**
	 * 获得字符串的字节长度
	 */
	String.prototype.lengthb = function() {
		//	var str = this.replace(/[^\x800-\x10000]/g, "***");
		var str = this.replace(/[^\x00-\xff]/g, "**");
		return str.length;
	};

	/**
	 * 将AFindText全部替换为ARepText
	 */
	String.prototype.replaceAll = function(AFindText, ARepText) {
		//自定义String对象的方法
		var raRegExp = new RegExp(AFindText, "g");
		return this.replace(raRegExp, ARepText);
	};

	/**
	 * 按字节数截取字符串 例:"e我是d".nLen(4)将返回"e我"
	 */
	String.prototype.substrCH = function(nLen) {
		var i = 0;
		var j = 0;
		while (i < nLen && j < this.length) { // 循环检查制定的结束字符串位置是否存在中文字符
			var charCode = this.charCodeAt(j);
			if (charCode > 256 && i == nLen - 1) {
				break;
			}
			//		else if(charCode >= 0x800 && charCode <= 0x10000){
			//			i = i + 3;
			//		}
			else if (charCode > 256) { // 返回指定下标字符编码，大于265表示是中文字符
				i = i + 2;
			} //是中文字符，那计数增加2
			else {
				i = i + 1;
			} //是英文字符，那计数增加1
			j = j + 1;
		};
		return this.substr(0, j);
	};

	/**
	 * 校验字符串是否以指定内容开始
	 */
	String.prototype.startWith = function(strChild) {
		return this.indexOf(strChild) == 0;
	};

	/**
	 * 判断字符串是否以指定参数的字符串结尾
	 *
	 * @param strChild
	 */
	String.prototype.endWith = function(strChild) {
		var index = this.indexOf(strChild);
		if (index == -1)
			return;
		else
			return index == this.length - strChild.length;
	};

	String.prototype.format = function(data) {
		if (data != null) {
			var string = this;
			for (var key in data) {
				var reg = new RegExp('\\<\\#\\=' + key + '\\#\\>', 'gi');
				string = string.replace(reg, data[key] ? (data[key] == 'null' ? "" : data[key]) : "");
			}
		}
		return string;
	}

	function patch(element) {
		if (element.toString().length > 1) {
			return element.toString();
		} else {
			return "0" + element.toString();
		}
	}
	Date.prototype.format = function(format) {
		var year = this.getFullYear(),
			month = this.getMonth() + 1,
			day = this.getDate(),
			hour = this.getHours(),
			minute = this.getMinutes(),
			second = this.getSeconds();
		format = format || "yyyy-MM-dd hh:mm:ss";
		return format.replace(/yyyy/, year).replace(/yy/, year.toString().substr(2, 2))
			.replace(/MM/, patch(month)).replace(/M/, month)
			.replace(/dd/, patch(day)).replace(/d/, day)
			.replace(/hh/, patch(hour)).replace(/h/, hour)
			.replace(/mm/, patch(minute)).replace(/m/, minute)
			.replace(/ss/, patch(second)).replace(/s/, second);
	};

	/**
	 * 获取AAAAMMJJ类型字符串
	 */
	Date.prototype.getAAAAMMJJ = function() {
		//date du jour
		var jour = this.getDate();
		if (jour < 10)
			(jour = "0" + jour);
		var mois = this.getMonth() + 1;
		if (mois < 10)
			(mois = "0" + mois);
		var annee = this.getYear();
		return annee + "" + mois + "" + jour;
	};

	/**
	 * 获取YYYY-MM-DD类型字符串
	 */
	Date.prototype.getFomatDate = function() {
		var year = this.getFullYear();
		var month = this.getMonth() + 1;
		if (month < 10)
			month = "0" + month;
		var day = this.getDate();
		if (day < 10)
			day = "0" + day;
		return year + "-" + month + "-" + day;
	};

	/**
	 * 获取YYYY-MM-DD HH:MM:SS类型字符串
	 */
	Date.prototype.getFomatDateTime = function() {
		var year = this.getFullYear();
		var month = this.getMonth() + 1;
		if (month < 10)
			month = "0" + month;
		var day = this.getDate();
		if (day < 10)
			day = "0" + day;
		var hours = this.getHours();
		if (hours < 10)
			hours = "0" + hours;
		var minutes = this.getMinutes();
		if (minutes < 10)
			minutes = "0" + minutes;
		var seconds = this.getSeconds();
		if (seconds < 10)
			seconds = "0" + seconds;
		return year + "-" + month + "-" + day + " " + hours + ":" + minutes + ":" + seconds;
	};

	/**
	 * 返回obj在数组中的位置
	 */
	Array.prototype.indexOf = function(obj) {
		for (var i = 0; i < this.length; i++) {
			if (this[i] == obj)
				return i;
		}
		return -1;
	};

	/**
	 * 按照index remove
	 */
	Array.prototype.remove = function(index) {
		if (index < 0 || index > this.length) {
			alert("index out of bound");
			return;
		}
		this.splice(index, 1);
	};

	/**
	 * 按照数组的元素remove
	 */
	Array.prototype.removeEle = function(ele) {
		for (var i = 0, count = this.length; i < count; i++) {
			if (this[i] == ele) {
				this.splice(i, 1);
				return;
			}
		}
	};
	/**
	 * 生成UUID
	 */
	Math.UUID = function() {
		return ((new Date()).getTime() + "").substr(9);
	};
	String.UUID = function() {
		return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
			var r = Math.random() * 16 | 0,
				v = c == 'x' ? r : (r & 0x3 | 0x8);
			return v.toString(16);
		});
	};

	/**
	 * 将指定值ele插入到index处
	 */
	Array.prototype.insert = function(index, ele) {
		if (index < 0 || index > this.length) {
			alert("index out of bound");
			return;
		}
		this.splice(index, 0, ele);
	};

	/**
	 * 得到和索引相对应的数组中的值
	 */
	Array.prototype.values = function(indices) {
		if (indices == null)
			return null;
		var varr = new Array();
		for (var i = 0; i < indices.length; i++) {
			varr.push(this[indices[i]]);
		}
		return varr;
	};

	/**
	 * 清空数组
	 */
	Array.prototype.clear = function() {
		this.splice(0, this.length);
	};

	window.getRequest = function(url) {
		if (!url)
			url = document.location.search;
		var theRequest = new Object();
		if (url.indexOf("?") != -1) {
			var str = url.substring(url.indexOf("?") + 1);
			var strs = str.split("&");
			for (var i = 0; i < strs.length; i++) {
				theRequest[strs[i].split("=")[0]] = unescape(strs[i].split("=")[1]);
			}
		}
		return theRequest;
	};

	window.setCookie = function(sName, sValue, oExpires, sPath, sDomain, bSecure) {
		var sCookie = sName + "=" + encodeURIComponent(sValue);
		if (oExpires)
			sCookie += "; expires=" + oExpires.toGMTString();
		if (sPath)
			sCookie += "; path=" + sPath;
		if (sDomain)
			sCookie += "; domain=" + sDomain;
		if (bSecure)
			sCookie += "; secure=" + bSecure;
		document.cookie = sCookie;
	};

	window.getCookie = function(sName) {
		var sRE = "(?:; )?" + sName + "=([^;]*);?";
		var oRE = new RegExp(sRE);

		if (oRE.test(document.cookie)) {
			return decodeURIComponent(RegExp["$1"]);
		} else
			return null;
	};

	window.deleteCookie = function(sName, sPath, sDomain) {
		setCookie(sName, "", new Date(0), sPath, sDomain);
	};
	window.execIgnoreError = function(a, b, c) {
		try {
			a.call(b, c);
		} catch (e) {
			//TODO handle the exception
		}
	}
	
	window.encodeBase64 = function(str){
		var c1, c2, c3;
                var base64EncodeChars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/";                
                var i = 0, len= str.length, string = '';

                while (i < len){
                        c1 = str[i++] & 0xff;
                        if (i == len){
                                string += base64EncodeChars.charAt(c1 >> 2);
                                string += base64EncodeChars.charAt((c1 & 0x3) << 4);
                                string += "==";
                                break;
                        }
                        c2 = str[i++];
                        if (i == len){
                                string += base64EncodeChars.charAt(c1 >> 2);
                                string += base64EncodeChars.charAt(((c1 & 0x3) << 4) | ((c2 & 0xF0) >> 4));
                                string += base64EncodeChars.charAt((c2 & 0xF) << 2);
                                string += "=";
                                break;
                        }
                        c3 = str[i++];
                        string += base64EncodeChars.charAt(c1 >> 2);
                        string += base64EncodeChars.charAt(((c1 & 0x3) << 4) | ((c2 & 0xF0) >> 4));
                        string += base64EncodeChars.charAt(((c2 & 0xF) << 2) | ((c3 & 0xC0) >> 6));
                        string += base64EncodeChars.charAt(c3 & 0x3F)
                }
        return string
	}
	
	$.getFunction = function(target, val){
		if (!val || typeof val == 'function') return val
		if (typeof target[val] == 'function')
			return target[val]
		else if (typeof window[val] == 'function')
			return window[val]
		else if (val.indexOf('.') != -1){
			var func = $.getJSObject(target, val)
			if (typeof func == 'function') return func
			func = $.getJSObject(window, val)
			if (typeof func == 'function') return func
		}
		return val
	}
	
	$.getJSObject = function(target, names) {
		if(!names) {
			return;
		}
		if (typeof names == 'object')
			return names
		var nameArr = names.split('.')
		var obj = target
		for (var i = 0; i < nameArr.length; i++) {
			obj = obj[nameArr[i]]
			if (!obj) return null
		}
		return obj
	}

	
	// 获取当前js文件的路径
	window.getCurrentJsPath = function() {
		var doc = document,
		a = {},
		expose = +new Date(),
		rExtractUri = /((?:http|https|file):\/\/.*?\/[^:]+)(?::\d+)?:\d+/,
		isLtIE8 = ('' + doc.querySelector).indexOf('[native code]') === -1;
		// FF,Chrome
		if (doc.currentScript){
			return doc.currentScript.src;
		}

		var stack;
		try{
			a.b();
		}
		catch(e){
			stack = e.fileName || e.sourceURL || e.stack || e.stacktrace;
		}
		// IE10
		if (stack){
			var absPath = rExtractUri.exec(stack)[1];
			if (absPath){
				return absPath;
			}
		}

		// IE5-9
		for(var scripts = doc.scripts,
			i = scripts.length - 1,
			script; script = scripts[i--];){
			if (script.className !== expose && script.readyState === 'interactive'){
				script.className = expose;
				// if less than ie 8, must get abs path by getAttribute(src, 4)
				return isLtIE8 ? script.getAttribute('src', 4) : script.src;
			}
		}
	}
	
}($);
+function($) {

	//+ function($, exports) {
	'use strict';
	var IWEB_VERSION = "1.0.0"
	var IWEB_THEME = "i_theme"
	var IWEB_LOCALE = "i_locale"
	var IWEB_LANGUAGES = "i_languages"
	var IWEB_USERCODE = "usercode"
	var LOG_Level = "ill"
	var systemTimeZoneOffset = -480; //TODO 目前默认即取东八区 -60*8 = -480
	var IWEB_CONTEXT_PATH = "contextpath"
	var iweb = {
		version: IWEB_VERSION
	};

	if (!window.getCookie) {
		window.getCookie = function(sName) {
			var sRE = "(?:; )?" + sName + "=([^;]*);?";
			var oRE = new RegExp(sRE);

			if (oRE.test(document.cookie)) {
				return decodeURIComponent(RegExp["$1"]);
			} else
				return null;
		};
	}

	/**
	 * 创建一个带壳的对象,防止外部修改
	 * @param {Object} proto
	 */
	window.createShellObject = function(proto) {
		var exf = function() {}
		exf.prototype = proto;
		return new exf();
	};


	// 导出到window对象中

	//core context
	(function() {
		// 从Cookie中获取初始化信息
		var environment = {}

		/**
		 * client attributes
		 */
		var clientAttributes = {};

		var sessionAttributes = {};

		var maskerMeta = {
			'float': {
				precision: 2
			},
			'datetime': {
				format: 'yyyy-MM-dd hh:mm:ss',
				metaType: 'DateTimeFormatMeta',
				speratorSymbol: '-'
			},
			'time':{
				format:'hh:mm:ss'
			},
			'date':{
				format:'yyyy-MM-dd'
			},
			'currency':{
				precision: 2,
				curSymbol: '￥'
			}
		}

		var fn = {}

		/**
		 * 获取环境信息
		 * @return {environment}
		 */
		fn.getEnvironment = function() {
			return createShellObject(environment);
		}

		/**
		 * 获取客户端参数对象
		 * @return {clientAttributes}
		 */
		fn.getClientAttributes = function() {
			var exf = function() {}
			return createShellObject(clientAttributes);
		}


		fn.setContextPath = function(contextPath) {
			return environment[IWEB_CONTEXT_PATH] = contextPath
		}
		fn.getContextPath = function(contextPath) {
				return environment[IWEB_CONTEXT_PATH]
			}
			/**
			 * 设置客户端参数对象
			 * @param {Object} k 对象名称
			 * @param {Object} v 对象值(建议使用简单类型)
			 */
		fn.setClientAttribute = function(k, v) {
				clientAttributes[k] = v;
			}
			/**
			 * 获取会话级参数对象
			 * @return {clientAttributes}
			 */
		fn.getSessionAttributes = function() {
			var exf = function() {}
			return createShellObject(sessionAttributes);
		}

		/**
		 * 设置会话级参数对象
		 * @param {Object} k 对象名称
		 * @param {Object} v 对象值(建议使用简单类型)
		 */
		fn.setSessionAttribute = function(k, v) {
			sessionAttributes[k] = v;
			setCookie("ISES_" + k, v);
		}

		/**
		 * 移除客户端参数
		 * @param {Object} k 对象名称
		 */
		fn.removeClientAttribute = function(k) {
			clientAttributes[k] = null;
			execIgnoreError(function() {
				delete clientAttributes[k];
			})
		}

		/**
		 * 获取根组件
		 */
		fn.getRootComponent = function() {
			return this.rootComponet;
		}

		/**
		 * 设置根组件
		 * @param {Object} component
		 */
		fn.setRootComponent = function(component) {
			this.rootComponet = component
		}

		/**
		 * 获取主题名称
		 */
		fn.getTheme = function() {
			return this.getEnvironment().theme
		}

		/**
		 * 获取地区信息编码
		 */
		fn.getLocale = function() {
			return this.getEnvironment().locale
		}
		
		/**
		 * 获取多语信息
		 */
		fn.getLanguages = function(){
			return this.getEnvironment().languages
		}
		/**
		 * 收集环境信息(包括客户端参数)
		 * @return {Object}
		 */
		fn.collectEnvironment = function() {
			var _env = this.getEnvironment();
			var _ses = this.getSessionAttributes();

			for (var i in clientAttributes) {
				_ses[i] = clientAttributes[i];
			}
			_env.clientAttributes = _ses;
			return _env
		}

		fn.changeTheme = function(theme) {
			environment.theme = theme;
			setCookie(IWEB_THEME, theme)
			$(document).trigger("themeChange");
		}
		fn.changeLocale = function(locale) {
				environment.locale = locale;
				setCookie(IWEB_LOCALE, locale)
				$(document).trigger("localeChange");
		}
			/**
			 * 设置数据格式信息
			 * @param {String} type
			 * @param {Object} meta
			 */
		fn.setMaskerMeta = function(type, meta) {
			if (!maskerMeta[type])
				maskerMeta[type] = meta
			else{
				if (typeof meta != 'object')
					maskerMeta[type] = meta
				else			
					for (var key in meta){
						maskerMeta[type][key] = meta[key]
					}
			}
		}
		fn.getMaskerMeta = function(type) {
			return $.extend({}, maskerMeta[type])
		}

		/**
		 * 注册系统时间偏移量
		 * @param {Object} offset
		 */
		fn.registerSystemTimeZoneOffset = function(offset) {
			systemTimeZoneOffset = offset;
		}

		/**
		 * 获取系统时间偏移量
		 */
		fn.getSystemTimeZoneOffset = function() {
			return systemTimeZoneOffset;
		};
//		var device = {
//			Android: function() {
//				return /Android/i.test(navigator.userAgent);
//			},
//			BlackBerry: function() {
//				return /BlackBerry/i.test(navigator.userAgent);
//			},
//			iOS: function() {
//				return /iPhone|iPad|iPod/i.test(navigator.userAgent);
//			},
//			Windows: function() {
//				return /IEMobile/i.test(navigator.userAgent);
//			},
//			any: function() {
//				return (this.Android() || this.BlackBerry() || this.iOS() || this.Windows());
//			},
//			pc: function() {
//				return !this.any();
//			},
//			Screen: {
//				size: noop,
//				direction: noop
//
//			}
//		}
//		fn.getDevice = function() {
//			return device;
//		}


		environment.theme = getCookie(IWEB_THEME)
		environment.locale = getCookie(IWEB_LOCALE)
		environment.languages = getCookie(IWEB_LANGUAGES) ? getCookie(IWEB_LANGUAGES).split(',') : ["ZH"]
		environment.timezoneOffset = (new Date()).getTimezoneOffset()
		environment.usercode = getCookie(IWEB_USERCODE)
			//init session attribute
		document.cookie.replace(/ISES_(\w*)=([^;]*);?/ig, function(a, b, c) {
			sessionAttributes[b] = c;
		})

		var Core = function() {}
		Core.prototype = fn;

		iweb.Core = new Core();

	})();




	//console logger
	(function() {
		var consoleLog;
		var level = getCookie(IWEB_USERCODE)
		if (typeof Log4js != "undefined") {
			consoleLog = new Log4js.Logger("iweb");
			consoleLog.setLevel(Log4js.Level.ERROR);
			var consoleAppender = new Log4js.ConsoleAppender(consoleLog, true);
			consoleLog.addAppender(consoleAppender);
		} else {
			consoleLog = {
				LEVEL_MAP: {
					"OFF": Number.MAX_VALUE,
					"ERROR": 40000,
					"WARN": 30000,
					"INFO": 20000,
					"DEBUG": 10000,
					"TRACE": 5000,
					"ALL": 1
				},
				level: 40000,
				setLevel: function(level) {
					if (level) {
						var l = this.LEVEL_MAP[level.toUpperCase()]
						if (l) {
							this.level = l;
						}
					}

				},
				isDebugEnabled: function() {
					return (this.LEVEL_MAP.DEBUG >= this.level && console)
				},
				isTraceEnabled: function() {
					return (this.LEVEL_MAP.TRACE >= this.level && console)
				},
				isInfoEnabled: function() {
					return (this.LEVEL_MAP.INFO >= this.level && console)
				},
				isWarnEnabled: function() {
					return (this.LEVEL_MAP.WARN >= this.level && console)
				},
				isErrorEnabled: function() {
					return (this.LEVEL_MAP.ERROR >= this.level && console)
				},
				debug: function() {
					if (this.isDebugEnabled()) {
						console.debug.call(console, arguments)
					}
				},
				warn: function() {
					if (this.isWarnEnabled()) {
						console.debug.call(console, arguments)
					}
				},
				info: function() {
					if (this.isInfoEnabled()) {
						console.debug.call(console, arguments)
					}
				},
				trace: function() {
					if (this.isTraceEnabled()) {
						console.debug.call(console, arguments)
					}
				},
				error: function() {
					if (this.isErrorEnabled()) {
						console.debug.call(console, arguments)
					}
				}
			}
		}
		consoleLog.setLevel(level);
		iweb.log = consoleLog;
		iweb.debugMode = false;
	})();

	iweb.browser = {
		isIE:  false,
		isFF: false,
		isOpera: false,
		isChrome: false,
		isSafari: false,
		isWebkit: false,
		isIE6: false,
		isIE7: false,
		isIE8: false,
		isIE8_CORE: false,
		isIE9: false,
		isIE9_CORE: false,
		isIE10: false,
		isIE10_ABOVE: false,
		isIE11: false,
		isIOS: false,
		isIphone: false,
		isIPAD: false,
		isStandard: false,
		version: 0    		
	};
	
	(function(){
		var userAgent = navigator.userAgent,   
		rMsie = /(msie\s|trident.*rv:)([\w.]+)/,   
		rFirefox = /(firefox)\/([\w.]+)/,   
		rOpera = /(opera).+version\/([\w.]+)/,   
		rChrome = /(chrome)\/([\w.]+)/,   
		rSafari = /version\/([\w.]+).*(safari)/,
		browser,
		version,
		ua = userAgent.toLowerCase(),
		s,
		browserMatch = null,
		match = rMsie.exec(ua);  
		
		if (match != null) {  
			browserMatch =  { browser : "IE", version : match[2] || "0" };  
		}  
		match = rFirefox.exec(ua);  
		if (match != null) {  
			browserMatch =  { browser : match[1] || "", version : match[2] || "0" };  
		}  
		match = rOpera.exec(ua);  
		if (match != null) {  
			browserMatch =  { browser : match[1] || "", version : match[2] || "0" };  
		}  
		match = rChrome.exec(ua);  
		if (match != null) {  
			browserMatch =  { browser : match[1] || "", version : match[2] || "0" };  
		}  
		match = rSafari.exec(ua);  
		if (match != null) {  
			browserMatch =  { browser : match[2] || "", version : match[1] || "0" };  
		}  
		if (match != null) {  
			browserMatch =  { browser : "", version : "0" };  
		} 
			
		
		if (s=ua.match(/opera.([\d.]+)/)) {
		         iweb.browser.isOpera = true;
		}else if(browserMatch.browser=="IE"&&browserMatch.version==11){
			iweb.browser.isIE11 = true;
			 iweb.browser.isIE = true;
		}else if (s=ua.match(/chrome\/([\d.]+)/)) {
		         iweb.browser.isChrome = true;
		         iweb.browser.isStandard = true;
		} else if (s=ua.match(/version\/([\d.]+).*safari/)) {
		         iweb.browser.isSafari = true;
		         iweb.browser.isStandard = true;
		} else if (s=ua.match(/gecko/)) {
		         //add by licza : support XULRunner  
		         iweb.browser.isFF = true;
		         iweb.browser.isStandard = true;
		} else if (s=ua.match(/msie ([\d.]+)/)) {
		         iweb.browser.isIE = true;
		}
		
		else if (s=ua.match(/firefox\/([\d.]+)/)) {
		         iweb.browser.isFF = true;
		         iweb.browser.isStandard = true;
		} 
		if (ua.match(/webkit\/([\d.]+)/)) {
		         iweb.browser.isWebkit = true;
		}
		if (ua.match(/ipad/i)){
		         iweb.browser.isIOS = true;
		         iweb.browser.isIPAD = true;
		         iweb.browser.isStandard = true;
		}
		if (ua.match(/iphone/i)){
		         iweb.browser.isIOS = true;
		         iweb.browser.isIphone = true;
		}
	
		iweb.browser.version = version ? (browserMatch.version ?  browserMatch.version : 0) : 0;
		if (iweb.browser.isIE) {
			 var intVersion = parseInt(iweb.browser.version);
			 var mode = document.documentMode;
			 if(mode == null){
			   if (intVersion == 6) {
			            iweb.browser.isIE6 = true;
			   } 
			   else if (intVersion == 7) {
			            iweb.browser.isIE7 = true;
			   } 
			 }
			 else{
			   if(mode == 7){
			            iweb.browser.isIE7 = true;
			   }
			   else if (mode == 8) {
			            iweb.browser.isIE8 = true;
			   } 
			   else if (mode == 9) {
			            iweb.browser.isIE9 = true;
			            iweb.browser.isSTANDARD = true;
			   }
			   else if (mode == 10) {
			            iweb.browser.isIE10 = true;
			            iweb.browser.isSTANDARD = true;
			            iweb.browser.isIE10_ABOVE = true;
			   }
			   else{
			            iweb.browser.isSTANDARD = true;
			   }
			   if (intVersion == 8) {
			            iweb.browser.isIE8_CORE = true;
			   } 
			   else if (intVersion == 9) {
			            iweb.browser.isIE9_CORE = true;
			   }
			   else if(browserMatch.version==11){
				   iweb.browser.isIE11 = true;
			   }
			   else{
			            
			   }
			}
		}		
	})();

	window.iweb = iweb;

	var noop = function() {}

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

