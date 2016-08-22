<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<%@ page import="java.text.*"%>
<%@ page import="java.util.*"%>
<%@ page import="java.net.*"%>
<%@ page session="false"%>
<%
	request.setCharacterEncoding("utf-8"); 
	response.setCharacterEncoding("utf-8"); 
	String path = request.getContextPath();
	Map<String, String> paramMap = (Map<String, String>)request.getAttribute("paramMapKey");
	
	// 支付人手机号
	String payerContactMbl = paramMap.get("payerContactMbl");
	if(payerContactMbl==null)payerContactMbl="";
	
	// 支付人名称
	String payerName = paramMap.get("payerName");
	if(payerName==null)payerName="";
	
	// 支付人邮箱
	String payerContactMal = paramMap.get("payerContactMal");
	if(payerContactMal==null)payerContactMal="";
	
	// 支付卡类型
	String payerCardType = paramMap.get("payerCardType");
	if(payerCardType==null)payerCardType="";
	
	// 商品ID
	String goodsId = paramMap.get("goodsId");
	if(goodsId==null)goodsId="";
	
	// 商品名称
	String productName = paramMap.get("productName");
	if(productName==null)productName="";
	
	// 商品信息
	String productDesc = paramMap.get("productDesc");
	if(productDesc==null)productDesc="";
	
	// 订单号
	String orderId = paramMap.get("orderId");
	if(orderId==null)orderId="";
	
	// 下单日期
	String orderDate = paramMap.get("orderDate");
	if(orderDate==null)orderDate="";
	
	// 下单详细时间
	String orderTime = paramMap.get("orderTime");
	if(orderTime==null)orderTime="";
	
	// 金额
	String orderAmount = paramMap.get("orderAmount");
	if(orderAmount==null)orderAmount="";
	
	// 金额类型
	String amtType = paramMap.get("amtType");
	if(amtType==null)amtType="";
	
	// 订单过期时间
	String expireTime = paramMap.get("expireTime");
	if(expireTime==null)expireTime="";
	
	String merchantId = paramMap.get("merchantId");
	if(merchantId==null)merchantId="";
	
	String platIdtfy = paramMap.get("platIdtfy");
	if(platIdtfy==null)platIdtfy="";
	
	String bankType = paramMap.get("bankType");
	if(bankType==null)bankType="";
	
	String businessId = paramMap.get("businessId");
	if(businessId==null)businessId="";
	
	String gateId = paramMap.get("gateId");
	if(gateId==null)gateId="";
	
	String bgUrl = paramMap.get("bgUrl");
	if(bgUrl==null)bgUrl="";
	
	String notifyUrl = paramMap.get("notifyUrl");
	if(notifyUrl==null)notifyUrl="";
	
	String merPriv = paramMap.get("merPriv");
	if(merPriv==null)merPriv="";
	
	String expand = paramMap.get("expand");
	if(expand==null)expand="";
	
	String expand2 = paramMap.get("expand2");
	if(expand2==null)expand2="";
	
	String deviceId = paramMap.get("deviceId");
	if(deviceId==null)deviceId="";
	
	String version = paramMap.get("version");
	if(version==null)version="";
	
	String redoFlag = paramMap.get("redoFlag");
	if(redoFlag==null)redoFlag="";	
	
	String signType = paramMap.get("signType");
	if(signType==null)signType="";	
	
	String sign = paramMap.get("sign");
	if(sign==null)sign="";
	
	String signMsg = paramMap.get("signMsg");
	if(signMsg==null)signMsg="";
	
	String productNum = paramMap.get("productNum");
	if(productNum==null)productNum="";
	
%>
<html>
<head>
<title>畅捷支付-订单确认页面</title>
<meta http-equiv="Content-Type" content="text/html;charset=utf-8" />
<link rel="stylesheet" type="text/css" href="<%=path%>/resources/css/pay_main.css">
</head>
<body>
	<div id="MAINA">
		<div class="mindexa">
			<div class="cashier-nav">
				<span class="title">畅捷支付-支付订单确认</span>
			</div>
			<div class="mrmain">
				<form name="sendOrder" action="http://59.151.72.11:9272/chanpay-trading/gatewayManage/jscashier" method="post">
					<input type="hidden" name="merchantId" value="<%=merchantId%>" />
					<input type="hidden" name="platIdtfy" value="<%=platIdtfy%>" />
					<input type="hidden" name="bankType" value="<%=bankType%>" />
					<input type="hidden" name="businessId" value="<%=businessId%>" />
					<input type="hidden" name="gateId" value="<%=gateId%>" />
					<input type="hidden" name="bgUrl" value="<%=bgUrl%>" />
					<input type="hidden" name="notifyUrl" value="<%=notifyUrl%>" />
					<input type="hidden" name="merPriv" value="<%=merPriv%>" />
					<input type="hidden" name="expand" value="<%=expand%>" />
					<input type="hidden" name="expand2" value="<%=expand2%>" />
					<input type="hidden" name="deviceId" value="<%=deviceId%>" />
					<input type="hidden" name="version" value="<%=version%>" />
					<input type="hidden" name="redoFlag" value="<%=redoFlag%>" />
					<input type="hidden" name="signType" value="<%=signType%>" />
					<input type="hidden" name="signMsg" value="<%=sign%>" />
					<input type="hidden" name="plain"   value="<%=signMsg%>" />
					<table>
						<tbody>
							<tr>
								<th nowrap>支付人名称【payerName】：</th>
								<td nowrap><strong><input type="text"
										readonly="readonly" name="payerName"
										value="<%=payerName%>" /></strong></td>
							</tr>
							<tr>
								<th nowrap>支付人手机号【payerContactMbl】：</th>
								<td nowrap><strong><input type="text"
										readonly="readonly" name="payerContactMbl"
										value='<%=payerContactMbl%>' /></strong></td>
							</tr>
							<tr>
								<th nowrap>支付人邮箱【payerContactMal】：</th>
								<td nowrap><strong><input type="text"
										readonly="readonly" name="payerContactMal"
										value='<%=payerContactMal%>' /></strong></td>
							</tr>
							<tr>
								<th nowrap>金额（分）【orderAmount】：</th>
								<td nowrap><strong><input type="text"
										readonly="readonly" name="orderAmount"
										value="<%=orderAmount%>" /></strong></td>
							</tr>
							<tr>
								<th nowrap>金额类型【amtType】：</th>
								<td nowrap><strong><input type="text"
										readonly="readonly" name="amtType"
										value="<%=amtType%>" /></strong></td>
							</tr>
							<tr>
								<th nowrap>支付卡类型【payerCardType】：</th>
								<td nowrap><strong><input type="text"
										readonly="readonly" name="payerCardType"
										value="<%=payerCardType%>" /></strong></td>
							</tr>
							<tr>
								<th nowrap>商品ID【goodsId】：</th>
								<td nowrap><strong><input type="text"
										readonly="readonly" name="goodsId"
										value='<%=goodsId%>' /></strong></td>
							</tr>
							<tr>
								<th nowrap>商品名称【productName】：</th>
								<td nowrap><strong><input type="text"
										readonly="readonly" name="productName"
										value='<%=productName%>' /></strong></td>
							</tr>
							<tr>
								<th nowrap>商品信息【productDesc】：</th>
								<td nowrap><strong><input type="text"
										readonly="readonly" name="productDesc"
										value='<%=productDesc%>' /></strong></td>
							</tr>
							<tr>
								<th nowrap>商品数量【productNum】：</th>
								<td nowrap><strong><input type="text"
										readonly="readonly" name="productNum"
										value='<%=productNum%>' /></strong></td>
							</tr>
							<tr>
								<th nowrap>订单号【orderId】：</th>
								<td nowrap><strong><input type="text"
										readonly="readonly" name="orderId"
										value="<%=orderId%>" /></strong></td>
							</tr>
							<tr>
								<th nowrap>下单日期【orderDate】：</th>
								<td nowrap><strong><input type="text"
										readonly="readonly" name="orderDate"
										value="<%=orderDate%>" /></strong></td>
							</tr>
							<tr>
								<th nowrap>下单详细时间【orderTime】：</th>
								<td nowrap><strong><input type="text"
										readonly="readonly" name="orderTime"
										value="<%=orderTime%>" /></strong></td>
							</tr>
							<tr>
								<th nowrap>过期时间【expireTime】：</th>
								<td nowrap><strong><input type="text"
										readonly="readonly" name="expireTime"
										value="<%=expireTime%>" /></strong></td>
							</tr>
						</tbody>
					</table>
					<br />
					<div class="btn-confirm-center">
						<span class="new-btn-login-sp">
							<button class="new-btn-login" type="submit"
								style="text-align: center;">确 认</button>
						</span>
					</div>
				</form>
			</div>
		</div>
	</div>
</body>
</html>
<script>
	function sub() {
		document.sendOrder.submit();
	}
</script>