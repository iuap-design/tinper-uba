<%@ page contentType="text/html;charset=UTF-8"%>

<!DOCTYPE html>
<html>
<head>
	<title>支付错误</title>
</head>

<body>
	<h2>支付出现错误.</h2>
	<p><span style="color:red">详细信息: ${status}</span><br></p>
	<p><a href="#" target="main" onclick="javascript:history.go(-1);">返回确认支付订单</a></p>
</body>
</html>