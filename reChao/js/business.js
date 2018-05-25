;(function(){
	$(".hexagon").mouseover(function(){
	  	if($(this).hasClass("filter")){
	    	return ;
	  } else {
	    $(this).addClass("filter");
	    	var $num = $(this).attr("index") - 0;
	    $(".item-ctt").eq($num).addClass("show").siblings().removeClass("show");
	  }
	});
	$(".hexagon").mouseout(function(){
	  	$(this).removeClass("filter");
	  	var _$num = $(".show").attr("index") - 0;
	  	$(".hexagon").eq(_$num).addClass("filter").siblings().removeClass("filter");
	});
})()