$(document).ready(function(){
    function topNavScroll(){  
            //获取当前窗口滚动条顶部所在的像素值 并取整
            var topScroll = Math.floor($(window).scrollTop());     
            //定义滚动条只要大于0 背景透明度就变成1 并且增加转换时间为1s
            if(topScroll>100){
                $('nav').css('background','#E62F2F');
                $('nav').css('transition','2s');
                $('nav').css('top','0');
            }
            else{
                $('nav').css('top','60px');

                $('nav').css('background','rgba(0,0,0 ,0)');  
            }  
        }  
        $(window).on('scroll',function() {  
            topNavScroll();
        });  
})