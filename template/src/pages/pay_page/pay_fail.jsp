<%@ page language="java" pageEncoding="UTF-8"%>
<%@ page session="false"%>
<%@ page import="java.net.*" %>
<%@ page import="java.util.*"%>
<%
	request.setCharacterEncoding("utf-8"); 
	response.setCharacterEncoding("utf-8"); 
	//获取反馈信息
	Map<String, String> params = new HashMap<String , String>();
	
	Map<String, String[]> requestParams = request.getParameterMap();
	for (Iterator<String> iter = requestParams.keySet().iterator(); iter.hasNext();) {
		String name = iter.next();
		String[] values = requestParams.get(name);
		String valueStr = "";
		for (int i = 0; i < values.length; i++) {
			valueStr = (i == values.length - 1) ? (valueStr + values[i]) : (valueStr + values[i] + ",");
		}
		params.put(name, valueStr);
	}

	//微信/支付宝支付商户订单号
	String out_trade_no = params.get("out_trade_no");
	//畅捷支付商户订单
	String orderId = request.getParameter("orderId");
	
	//支付宝交易流水号
	String trade_no = params.get("trade_no");
	
	//错误代码
	String err_code = params.get("err_code");
	
	//错误描述
	String err_code_des = params.get("err_code_des");
	
	if ("NATIVE".equals(params.get("trade_type"))) {//微信支付
		trade_no = params.get("transaction_id");
	}else if(orderId.trim().length() != 0){//畅捷支付
		out_trade_no = orderId;
		trade_no = params.get("detailId");
		err_code = params.get("errCode");
		err_code_des = params.get("errMsg");
	}
%>
<html>
<head>
<title>支付失败页面</title>
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
</head>
<body text="#000000" leftMargin=0 topMargin=4>
	<div id="main" align="center">
		<h1 style="color: red">支付失败</h1>
		<br>
		<div id="content">
			<p>
				<span>订单号：<%=out_trade_no%></span><br>
				<span>支付平台流水号：<%=trade_no%></span><br>
				<span>错误代码：<%=err_code%></span><br>
				<span>错误描述：<%=err_code_des%></span><br>
			</p>
		</div>
	</div>
</body>
</html>