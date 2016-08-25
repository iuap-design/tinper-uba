<%@ page language="java" pageEncoding="UTF-8"%>
<%@ page session="false"%>
<%@ page import="java.util.*"%>
<%@ page import="java.net.*" %>
<%@ page import="com.yonyou.uap.ieop.pay.util.*"%>

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
	
	//支付金额
	String total_fee = params.get("total_fee");

	if ("NATIVE".equals(params.get("trade_type"))) {//微信支付
		trade_no = params.get("transaction_id");
		total_fee = AmountUtil.changeF2Y(total_fee);
	}else if(orderId.trim().length() != 0){//畅捷支付
		out_trade_no = orderId;
		trade_no = params.get("detailId");
		total_fee = AmountUtil.changeF2Y(params.get("orderAmount"));
	}
%>
<html>
<head>
<title>支付成功页面</title>
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
</head>
<body text="#000000" leftMargin=0 topMargin=4>
	<div id="main" align="center">
		<h1 style="color: green">支付成功</h1>
		<br>
		<div id="content">
			<p>
				<span>订单号：<%=out_trade_no%></span><br>
				<span>支付平台交易流水号：<%=trade_no%></span><br>
				<span>交易金额(元)：<%=total_fee%></span><br>
			</p>
		</div>
	</div>
</body>
</html>