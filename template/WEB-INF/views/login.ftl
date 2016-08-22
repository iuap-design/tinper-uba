<html xmlns="http://www.w3.org/1999/xhtml">
<head>
    <meta content="text/html; charset=utf-8" http-equiv="Content-Type">
    <title>登录</title>
    <!--[if lt IE 9]>
    <script src="${ctx}/vendor/html5shiv.min.js"></script>
    <script src="${ctx}/vendor/respond.min.js"></script>
    <script src="${ctx}/js/security.js"></script>
    <![endif]-->
    <link rel="stylesheet" href="${ctx}/style/login.css" />
</head>
<body>
	<script>
		window.$ctx = '${ctx}';
		var exponent = '${exponent}';
		var modulus = '${modulus}';
		function enc(val) {
			var key = RSAUtils.getKeyPair(exponent, '', modulus);
			var val_enc = RSAUtils.encryptedString(key, val);
			return val_enc;
		};
		function befourSubmit() {
			var pwd = document.getElementById("password2").value;
			var pwd_enc = enc(pwd);
			document.getElementById("password_enc").value = pwd_enc;
			var newpassword_input = document.getElementById("newpassword2");
			if (newpassword_input) {
				pwd = newpassword_input.value;
				pwd_enc = enc(pwd);
				document.getElementById("newpassword_enc").value = pwd_enc;
			}
		};
		function doLogin() {
			var plainPassword = $("#password").val(); 
			if(plainPassword.indexOf("_encrypted") < 0){
				var key = RSAUtils.getKeyPair(exponent, '', modulus);
				var encryptedPwd = RSAUtils.encryptedString(key, plainPassword);
				$("#password").val(encryptedPwd + "_encrypted"); 
			}
			
		    $('#formlogin').submit();
	}
	</script>
	<form method="post" id="formlogin" action="${ctx}/login/formLogin">
		<div id="entry" class=" w1">
			<div id="bgDiv" class="mc ">
				<div clstag="pageclick|keycount|20150112ABD|48" id="entry-bg" style="width: 511px; height: 455px; background: url(&quot;${ctx}/static/dl1.png&quot;) no-repeat scroll 0px 0px transparent; position: absolute; left: -44px; top: -44px;">
				</div>
				<div class="form">
					<#if accounterror??><span style="color:red">${accounterror}</span></#if>
					<div class="item fore1">
						<span>邮箱/用户名/已验证手机</span>
						<div class="item-ifo">
							<input type="text" autocomplete="off" tabindex="1" value="${(username)!}" class="text" name="username" id="username">				
						</div>
					</div>
					<div class="item fore2">
						<span>密码</span>
						<div class="item-ifo">
							<input type="password" name="password" autocomplete="off" tabindex="2" class="text" id="password">
						</div>
					</div>
					<#if needModifyPassWord??>
					<div class="item fore3">
						<span>新密码</span>
						<div class="item-ifo">
							<input type="hidden" name="newpassword" id="newpassword_enc">
							<input type="password" autocomplete="off" tabindex="3" value="" class="text" id="newpassword2">				
						</div>
					</div>
					</#if>
					<div class="item login-btn2013">
						<button type="submit" class="btn btn-danger btn-entry">登     录</button>
					</div>
					<div style="float: left; color: black;">
						<input name="rmbUser" id="rmbUser" type="checkbox" class="jpwd" style="margin-top: 2px;">记住密码
					</div>
					<div style="left: 50%;position: relative;">
						<a href="#">忘记密码</a>
					</div>
					<div class="panel-body other-login">
						<ul class="cf">
							<li class="i6"><a href="${ctx}/login_servlet?LoinType=WECHAT&amp;isLogin=true" title="微信"><i></i>微信登录</a></li>
							<li class="i5"><a href="${ctx}/login_servlet?LoinType=QQ&amp;isLogin=true" title="QQ"><i></i>QQ登录</a></li>
							<li class="i1"><a href="${ctx}/login_servlet?LoinType=WEIBO&amp;isLogin=true"  title="新浪微博"><i></i>微博登录</a></li>
							<!--<li class="i4"><a href="${ctx}/login_servlet?LoinType=WEIBO&amp;isLogin=true" title="支付宝"><i></i>支付宝登录</a></li>-->
						</ul>
</div>
				</div>
			</div>
		</div>
	</form>
	<script src="${ctx}/vendor/jquery/jquery-1.11.2.js" type="text/javascript"></script>
	<script src="${ctx}/vendor/security/security.js"></script>
</body>
</html>