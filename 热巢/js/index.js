$(document).ready(function(){
    var index=-1;
    var times=2000;
    var timer = setInterval(play, times);
    
    // 导航列表点击
    $(".nav-links a").click(function(event) {
        if ($(this).hasClass('nav-active')) {
            return;
        } else {
            $(this).addClass('nav-active').siblings().removeClass('nav-active');
        }
    });

    // 鼠标移入/移出 自动轮播停止/开始 按钮显示/弱化
    $(".banner").mouseover(function(event) {
        $(".banner-btn").addClass('btn-active');
        clearInterval(timer);
    }).mouseout(function(event) {
        $(".banner-btn").removeClass('btn-active');
        timer = setInterval(play, times);
    });

    // 自动轮播运动函数
    function play(){
        index++;
        if(index>3){index=0}
        $('.banner-item').eq(index).addClass('show').siblings().removeClass('show');
        $('.bullet').eq(index).addClass('bullet-active').siblings().removeClass('bullet-active');
    }

    // 点击 pagenation 标识
    $('.bullet').click(function(){
        $(this).addClass('bullet-active').siblings().removeClass('bullet-active');
        var index=$(this).index();
        $('.banner-item').eq(index).addClass('show').siblings().removeClass('show');
    });

    // 上一张
    $('.btn-prev').click(function(){
        index--
        if(index<0){index=3}
        $('.banner-item').eq(index).addClass('show').siblings().removeClass('show');
        $('.bullet').eq(index).addClass('bullet-active').siblings().removeClass('bullet-active');
    });

    // 下一张
    $('.btn-next').click(function(){
        index++
        if(index>3){index=0}
        $('.banner-item').eq(index).addClass('show').siblings().removeClass('show');
        $('.bullet').eq(index).addClass('bullet-active').siblings().removeClass('bullet-active');
    });
});