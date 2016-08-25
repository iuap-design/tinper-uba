<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<%@ page import="java.util.HashMap"%>
<%@ page import="java.util.Map"%>
<%@ page import="com.yonyou.uap.ieop.pay.util.AlipaySubmit" %>
<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN">
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
<title>支付宝即时到账交易接口</title>
</head>
<%
	request.setCharacterEncoding("utf-8");
	response.setCharacterEncoding("utf-8");
	String path = request.getContextPath();
	Map<String, String> requestParamMap = (Map<String, String>) request.getAttribute("paramMapKey");

	//建立请求
	String sHtmlText = AlipaySubmit.buildRequest(requestParamMap, "get", "确认");
	out.println(sHtmlText);
%>
<body>
</body>
</html>
