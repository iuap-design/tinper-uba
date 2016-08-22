//分享到新浪微博
function ShareToSina(title, pageurl, source) {
    window.open('http://v.t.sina.com.cn/share/share.php?title=' + encodeURIComponent(title) + '&url=' + encodeURIComponent(pageurl) + '&source=' + encodeURIComponent(source), '_blank');
}
//分享到QQ好友
function ShareToQQIM(title, pageurl, source) {
    window.open('http://connect.qq.com/widget/shareqq/index.html?url=' +  encodeURIComponent(pageurl) +'&desc=&title= '+ encodeURIComponent(title) + '&summary=&pics=&flash=&site=&style=101&width=96&height=24&showcount=', '_blank');
}
//分享到腾讯微博
function ShareToTencent(title, pageurl, source) {
    window.open('http://v.t.qq.com/share/share.php?title=' + encodeURIComponent(title) + '&url=' + encodeURIComponent(pageurl) + '&source=' + encodeURIComponent(source), '_blank');
}
//分享到百度贴吧
function ShareToBaiduTieba(title, pageurl, source) {
    window.open('http://tieba.baidu.com/i/sys/share?title=' + encodeURIComponent(title) + '&link=' + encodeURIComponent(pageurl) + '&source=' + encodeURIComponent(source), '_blank');
}
//分享到豆瓣网
function ShareToDouban(title, pageurl, source) {
    window.open('http://www.douban.com/recommend/?title='+ encodeURIComponent(title) + '&url=' + encodeURIComponent(pageurl) + '&source=' + encodeURIComponent(source), '_blank');
}
//分享到QQ空间
function ShareToQzone(title, pageurl, source) {
    window.open('http://sns.qzone.qq.com/cgi-bin/qzshare/cgi_qzshare_onekey?url=' + encodeURIComponent(pageurl)+'&title=' + encodeURIComponent(title) , '_blank');
}
//分享到微信朋友圈
function ShareToWeChart() {
	
	var qrcodeDIV = document.getElementById("qrcode");
	if(qrcodeDIV.getElementsByTagName("div").length == 0){//需要生成二维码
		
		var pageurl = location.href;
		
		var qr = qrcode(10, 'Q');
		qr.addData(pageurl);
		qr.make();
		
		var qrcodeImgdom = document.createElement('DIV');
		qrcodeImgdom.innerHTML = qr.createImgTag();
		
		qrcodeDIV.appendChild(qrcodeImgdom);
	}

	qrcodeDIV.style.display='';
}
