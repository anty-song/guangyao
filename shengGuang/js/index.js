var nav = document.getElementsByClassName("nav-list")[0];
var navList = nav.children;
nav.onclick = function (ev) {
    var ev = ev || window.event;
    var target = ev.target || ev.srcElement;
    if(target.nodeName.toLocaleLowerCase() == 'a'){
        for (var i = 0; i < navList.length; i++) {
			navList[i].setAttribute("class", "");
		}
		target.setAttribute("class", "active");
    }
};

var oBanner = document.getElementById("banner");
var aBanner = document.getElementsByClassName("banner");
var aSpan = document.getElementsByClassName("tab")[0].getElementsByTagName("span");
var oNext = document.getElementsByClassName("next")[0];
var Oprev = document.getElementsByClassName("prev")[0];
var Oon = document.getElementsByClassName("on")[0];
//初始化让第一张图片显示，和第一个原点显示
aBanner[0].style.display = "block";
aSpan[0].className = "on";

var num = 0;
for(var i = 0;i < aSpan.length;i++){
	aSpan[i].index = i;
	aSpan[i].onclick = function(){  //点击小圆点图片相对应的进行切换
		for(var j = 0 ;j < aSpan.length; j++){
		  	num = this.index;
		  	aSpan[j].className = "";
		  	aBanner[j].style.display = "none";
		}
		aSpan[num].className = "on";
		aBanner[num].style.display = "block";
	}
	oNext.onclick = function(){//按下图片切换到后一张
	  	for(var j = 0 ;j < aSpan.length; j++){
		  	if(aSpan[j].className == "on"){
		      	aSpan[j].className = "";
		      	aBanner[j].style.display = "none";
		      	j++;
		      	num++;
		      	if(j > 2){
		      		j = 0;
		  		}
		    	aSpan[j].className = "on";
				aBanner[j].style.display = "block";

		  	}
		}
	}

	Oprev.onclick = function(){  //按下图片切换到前一张
	  	for(var j = 0 ;j < aSpan.length; j++){
	      	if(aSpan[j].className == "on"){
	          	aSpan[j].className = "";
	          	aBanner[j].style.display = "none";
	          	j--;
	          	num--;
	          	if(j < 0){
	          		j = 2;
	      		}
	          	aSpan[j].className = "on";
	  			aBanner[j].style.display = "block";
	  		}
		}
	};
}

function Time(){/*设置定时器运行的函数*/
	num++;
	if(num < 3){
	    for(var j = 0 ;j < aSpan.length; j++){
		    aSpan[j].className = "";
		    aBanner[j].style.display = "none";
		}
		aSpan[num].className = "on";
		aBanner[num].style.display = "block";
	}else {
	    num = -1;
	}         
};
clearInterval(timer);
var timer = setInterval("Time()",2000);/*调用定时器*/

oBanner.onmouseover = function(){/*鼠标引入，清除定时器，轮播图停止*/
    clearInterval(timer);
};
oBanner.onmouseout = function(){/*鼠标移出，重新调用定时器，轮播图开始*/
    clearInterval(timer);
    timer = setInterval("Time()",2000);
};