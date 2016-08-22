<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<%@ page session="false"%>
<%
	request.setCharacterEncoding("utf-8"); 
	response.setCharacterEncoding("utf-8"); 
	String path = request.getContextPath();
%>
<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN">
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
<title>微信扫码支付</title>
<script type="text/javascript" src="<%=path%>/resources/js/qrcode.js"></script>
</head>
<body>

	<div align="center" id="qrcode">
		<p>
			扫我，扫我 <br>
			<br>
		</p>
	</div>
</body>
<script>
	var url = '<%=request.getAttribute("code_url").toString()%>';
	if(url.length == 0){
		url = null;
		alert("参数不完整，或者网络连接不畅！");
	}else{
		//参数1表示图像大小，取值范围1-10；参数2表示质量，取值范围'L','M','Q','H'
		var qr = qrcode(10, 'M');
		qr.addData(url);
		qr.make();
		var dom = document.createElement('DIV');
		dom.innerHTML = qr.createImgTag();
		var element = document.getElementById("qrcode");
		element.appendChild(dom);
	}
</script>
</body>
</html>
