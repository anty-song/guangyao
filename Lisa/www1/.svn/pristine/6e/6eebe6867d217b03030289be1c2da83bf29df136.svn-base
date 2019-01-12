! function(n) {
    var e = n.document,
        t = e.documentElement,
        i = 750,
        d = i / 100,
        o = "orientationchange" in n ? "orientationchange" : "resize",
        a = function() {
            var n = t.clientWidth || 320;
            n > 750 && (n = 750), t.style.fontSize = n / d + "px"
        };
    e.addEventListener && (n.addEventListener(o, a, !1), e.addEventListener("DOMContentLoaded", a, !1))
}(window);

//检测是不是我们的APP
// (function checkApp() {
// 	var u = navigator.userAgent;
// 	//这块分俩种情况判断
// 	if(u.indexOf('Android') > -1 || u.indexOf('Linux') > -1) {
// 		//Android
		
// 	} else if(u.indexOf('iPhone') > -1) {
// 		//iOS
		
// 	} else {
// 		//如果不是手机打开直接跳转到下载APP页面
// 		setInterval(function() {
// 			window.location.href = "http://sj.qq.com/myapp/detail.htm?apkName=com.yuanmakj.jianqian";			
// 		},200);
// 	}
// })();