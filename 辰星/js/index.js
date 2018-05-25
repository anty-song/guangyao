;(function() {
	// 导航事件
	var nav = document.getElementById("nav-list");
	var navList = nav.children;
	nav.onclick = function (ev) {
	    var ev = ev || window.event;
	    var target = ev.target || ev.srcElement;
	    if(target.parentNode.nodeName.toLocaleLowerCase() == 'li'){
	        for (var i = 0; i < navList.length; i++) {
				navList[i].setAttribute("class", "");
			}
			target.parentNode.setAttribute("class", "active");
	    }
	}
	// 轮播
	var banner = document.getElementById("banner");
	var banners = banner.children;
	var num = null;
	var timer = null;
	function move() {
		for (var j = 0; j < banners.length; j++) {
			if (banners[j].getAttribute("class")) {
				num = j;
			}
			for (var i = 0; i < banners.length; i++) {
				banners[i].setAttribute("class", "");
			}
		}
		if (num == 2) {
			num = 0;
			banners[0].setAttribute("class", "show");
		} else {
			num = num + 1;
			banners[num].setAttribute("class", "show");
		}
	};
	timer = setInterval(function() { move(); }, 2000);
	banner.onmouseover = function() {
		console.log("enter");
		clearInterval(timer);
	};
	banner.onmouseout = function() {
		console.log("out");
		timer = setInterval(function() { move(); }, 2000);

	};
})()