;(function() {
	var bannerBox = document.getElementsByClassName("banner-box")[0];
	var banner = document.getElementById("banner");
	var banners = banner.children;
	var btns = document.getElementsByClassName("_btn");
	var num = null;
	var timer = null;
	function prev() {
		for (var j = 0; j < banners.length; j++) {
			if (banners[j].getAttribute("class")) {
				num = j;
			}
			for (var i = 0; i < banners.length; i++) {
				banners[i].setAttribute("class", "");
			}
		}
		if (num == 0) {
			num = 2;
			banners[2].setAttribute("class", "show");
		} else {
			num = num - 1;
			banners[num].setAttribute("class", "show");
		}
	};
	function next() {
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
	clearInterval(timer);
	timer = setInterval(function() { next(); }, 2000);
	
	btns[0].onclick = function() {
		next();
	};
	btns[1].onclick = function() {
		prev();
	};
	// bannerBox.onmouseover = function() {
	// 	clearInterval(timer);
	// };
	bannerBox.onmouseout = function() {
		clearInterval(timer);
		timer = setInterval(function() { next(); }, 2000);

	};
})()