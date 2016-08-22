//附件接口定义
var interface_file = function(){
	//接口定义 常量
	//this.sys = "Woody";	
}
// 通过prototype对象定义类的其他成员；
//接口方法的定义
interface_file.prototype = {
   /**
    * 上传方法
    * @param parameter 必要参数
    * @param callback  回调函数
    */
	filesystem_upload: function(parameter,callback) {
		interface_file.upload(parameter,callback);
	},
	
	/**
	* 查询方法
    * @param parameter 必要参数
    * @param callback  回调函数
	*/
	filesystem_query: function(parameter,callback) {
		interface_file.query(parameter,callback);
	},
	/**
	 * 删除方法
	 * @param parameter 必要参数
	 * @param callback  回调函数
	 */
	filesystem_download: function(parameter,callback) {
		interface_file.download(parameter,callback);
	}, 	
	/**
	* 下载方法
    * @param parameter 必要参数
    * @param callback  回调函数
	*/
	 filesystem_delete: function(parameter,callback) {
		interface_file.deletefile(parameter,callback);
	},
	/**
	* 获得附件的url方法
    * @param parameter 必要参数
    * @param callback  回调函数
	*/
	filesystem_geturl: function(parameter,callback) {
		interface_file.url(parameter,callback);
	},
	/**
	* 替换上传附件方法
    * @param parameter 必要参数
    * @param callback  回调函数
	*/
	filesystem_replace: function(parameter,callback) {
		interface_file.replace(parameter,callback);
	},
	
	/**
	* 附件更新方法
    * @param parameter 必要参数
    * @param callback  回调函数
	*/
	filesystem_update: function(parameter,callback) {
		interface_file.update(parameter,callback);
	},
	
	/**
	* 附件直传方法
    * @param parameter 必要参数
    * @param callback  回调函数
	*/
	filesystem_ossupload: function(parameter,callback) {
		interface_file.oss_upload(parameter,callback);
	},
	/**
	* 附件流式通用上传方法
    * @param parameter 必要参数
    * @param callback  回调函数
	*/
	filesystem_stream_upload: function(parameter,callback) {
		interface_file.stream_upload(parameter,callback);
	}
	
	
};  

	// 实现继承的方法  
	interface_file.extend = function(o, p) {  
	  if ( !p ) {p = o; o = this; }  
	  for ( var i in p ) o[i] = p[i];  
	  return o;  
	}; 
