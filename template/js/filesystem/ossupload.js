		//oss 直传初始化
		 function oss_upload_entrance(paramers,callback){
		 	if(null == paramers) return;
		 		//附件对象
		 	    var file=$("#"+paramers.fileid).prop('files');
		 		//获取oss签名参数
		 	    for(var k in file){
		 	    	if(file[k] instanceof  File){
		 	    		var item = file[k];
		 	    		paramers.filename = item.name;
				 	    var ret = get_signature(paramers,callback)
				 	     //装配发送到oss文件上传url
				 	    if (ret == true)
				 	    {		 		    	  
			 				    var formData = new FormData(); 			    
			 			    	//装配oss签名参数
			 			    	formData.append("name",item.name);
			 			    	formData.append("key", key);
			 			    	formData.append("policy", policyBase64);
			 			    	formData.append("OSSAccessKeyId", accessid);
			 			    	formData.append("success_action_status", '200');
			 			    	formData.append("callback", callbackbody);
			 			    	formData.append("signature", signature);
			 			    	formData.append("file",file[k])//===================获得文件数据（需要你提供，获得修改成你自己的方式）
			 			    	//回写表的时候需要的参数rewrite方法是回调参数oss返回rewrite后会取下面的参数
			 			    	formData.append("x:groupname",paramers.groupname)//分组名称 自定义参数的传法
			 			    	formData.append("x:filepath",paramers.filepath)//单据信息   自定义参数的传法
			 			    	formData.append("x:permission",paramers.permission)//共有还是私有
			 			    	formData.append("x:modular",paramers.modular)//模块信息
			 			    	oss_uploadandreturn(formData,host,callback);
			 		      }
			 		   }
		 	    }
		 	}
		 
		 
		 /**
		  * 只做请求参数的操作和formdate的组装
		  * 为了fromdata上面扩展
		  * 返回array<FormData>
		  */
		 function query_formdata(paramers){
			 
			 if(null == paramers) return;
		 		//提交
		 		//获取oss签名参数
		 	    var ret = get_signature(paramers)

		 	     //装配发送到oss文件上传url   
		 	    if (ret == true)
		 	    {
		 		    var file=$("#"+paramers.fileid).prop('files');
		 		    var arr = new Array();
		 		    for(var k in file){
		 		      if(file[k] instanceof  File){
		 		    	  
		 				    var item = file[k];
		 				    var formData = new FormData(); 			    
		 			    	//装配oss签名参数
		 			    	formData.append("name",item.name);
		 			    	formData.append("key", key);
		 			    	formData.append("policy", policyBase64);
		 			    	formData.append("OSSAccessKeyId", accessid);
		 			    	formData.append("success_action_status", '200');
		 			    	formData.append("callback", callbackbody);
		 			    	formData.append("signature", signature);
		 			    	formData.append("file",file[k])//===================获得文件数据（需要你提供，获得修改成你自己的方式）
		 			    	//回写表的时候需要的参数rewrite方法是回调参数oss返回rewrite后会取下面的参数
		 			    	formData.append("x:groupname",paramers.groupname)//分组名称 自定义参数的传法
		 			    	formData.append("x:filepath",paramers.filepath)//单据信息   自定义参数的传法
		 			    	formData.append("x:permission",paramers.permission)//共有还是私有
		 			    	formData.append("x:modular",paramers.modular)//模块信息
		 			    	arr[k] = formData;
		 		      }
		 		   }
		 		    return arr;
		 	    }
			 
			 
		 }
	
		 
		//获取到签名参数后将参数填入变量待用
			function get_signature(paramers,callback)
			{
			    //可以判断当前expire是否超过了当前时间,如果超过了当前时间,就重新取一下.3s 做为缓冲
			    expire = 0
			    now = timestamp = Date.parse(new Date()) / 1000; 
			    console.log('get_signature ...');
			    console.log('expire:' + expire.toString());
			    console.log('now:', + now.toString())
			    if (expire < now + 3)
			    {
			        console.log('get new sign')
			        var obj = send_request(obj,paramers,callback);
			        if(obj != undefined){
			        	policyBase64 = obj['policy']
			        	accessid = obj['accessid']
			        	signature = obj['signature']
			        	expire = parseInt(obj['expire'])
			        	callbackbody = obj['callback'] 
			        	host =obj['host']
			        	key = obj['perfix']+'${filename}'
			        	return true;			        	
			        }
			    }
			    return false;
			};
			
			
			 /*直传返回值*/
			 function oss_uploadandreturn(formData,host,callback){
				 
				//发送文件上传请求   
					$.ajax({  
				        url: host,  
				        type: 'POST',
				        data: formData,  
				        async: false,  
				        contentType: false, //必须
				    	processData: false, //必须
				        success: function (returndata) {
				        	callback(returndata);
				        },  
				        error: function (returndata) {
				        	callback(returndata);
				        }  
				    });  
			 }
	  
				//发送到应用服务器 获取oss签名参数
			 function send_request(obj,paramers,callback){
			 	$.ajax({
			 		type : 'GET',
			 		async : false,
			 		url :paramers.path,
		            data : {					            	   
		            	tenantid : paramers.tenantid, //这里是租户的id,需要自己处理
		            	permission : paramers.permission, //这里是租户的id,需要自己处理
						groupname : paramers.groupname,
						filepath : paramers.filepath,
						filename : paramers.filename,
						isreplace : paramers.isreplace
			        },
			 		success : function(data){
			 			callback(data);
			 		} 
			 	});
			 	return obj;
			 }