$(".kefu_box li").mouseover(function(){
    $(this).find("i").css("display","block");
    $(this).find("span span").css("display","none");
    $(this).find("span").css("background","#1d89fe");
    if($(this).index()==0)
    {
        $(".kefu_box li").find(".kefu_phone").css("background","#d2d2d2");
        $(".kefu_box li").find(".kefu_wx").css("background","#d2d2d2");
        $(".kefu_box li").find(".kefu_fk").css("background","#d2d2d2");
        $(".kefu_box li").find(".back_top").css("background","#d2d2d2");
        $(".kefu_box li").find(".kefu_qq span").remove("kefu_phone_bj");
        $(".kefu_box li").find(".kefu_phone span").addClass("kefu_phone_bj");
        $(".kefu_box li").find(".kefu_wx span").addClass("kefu_wx_bj");
        $(".kefu_box li").find(".kefu_fk span").addClass("kefu_fk_bj");
        $(".kefu_box li").find(".back_top span").addClass("back_top_bj");

        $(".kefu_qq_list").css("display","block");
        $(".kefu_phone_list").css("display","none");
        $(".kefu_wx_info").css("display","none");
    }
    if($(this).index()==1)
    {
        $(".kefu_box li").find(".kefu_qq").css("background","#d2d2d2");
        $(".kefu_box li").find(".kefu_wx").css("background","#d2d2d2");
        $(".kefu_box li").find(".kefu_fk").css("background","#d2d2d2");
        $(".kefu_box li").find(".back_top").css("background","#d2d2d2");

        $(".kefu_box li").find(".kefu_phone span").remove("kefu_phone_bj");
        $(".kefu_box li").find(".kefu_qq span").addClass("kefu_qq_bj");
        $(".kefu_box li").find(".kefu_wx span").addClass("kefu_wx_bj");
        $(".kefu_box li").find(".kefu_fk span").addClass("kefu_fk_bj");
        $(".kefu_box li").find(".back_top span").addClass("back_top_bj");

        $(".kefu_phone_list").css("display","block");
        $(".kefu_qq_list").css("display","none");
        $(".kefu_wx_info").css("display","none");
    }
    if($(this).index()==2)
    {
        $(".kefu_box li").find(".kefu_qq").css("background","#d2d2d2");
        $(".kefu_box li").find(".kefu_phone").css("background","#d2d2d2");
        $(".kefu_box li").find(".kefu_fk").css("background","#d2d2d2");
        $(".kefu_box li").find(".back_top").css("background","#d2d2d2");

        $(".kefu_box li").find(".kefu_wx span").remove("kefu_wx_bj");
        $(".kefu_box li").find(".kefu_qq span").addClass("kefu_qq_bj");
        $(".kefu_box li").find(".kefu_phone span").addClass("kefu_phone_bj");
        $(".kefu_box li").find(".kefu_fk span").addClass("kefu_fk_bj");
        $(".kefu_box li").find(".back_top span").addClass("back_top_bj");

        $(".kefu_wx_info").css("display","block");
        $(".kefu_phone_list").css("display","none");
        $(".kefu_qq_list").css("display","none");
    }
    if($(this).index()==3)
    {
        $(".kefu_box li").find(".kefu_qq").css("background","#d2d2d2");
        $(".kefu_box li").find(".kefu_phone").css("background","#d2d2d2");
        $(".kefu_box li").find(".kefu_wx").css("background","#d2d2d2");
        $(".kefu_box li").find(".back_top").css("background","#d2d2d2");

        $(".kefu_box li").find(".kefu_fk span").remove("kefu_fk_bj");
        $(".kefu_box li").find(".kefu_qq span").addClass("kefu_qq_bj");
        $(".kefu_box li").find(".kefu_phone span").addClass("kefu_phone_bj");
        $(".kefu_box li").find(".kefu_wx span").addClass("kefu_wx_bj");
        $(".kefu_box li").find(".back_top span").addClass("back_top_bj");
    }
    if($(this).index()==4)
    {
        $(".kefu_box li").find(".kefu_qq").css("background","#d2d2d2");
        $(".kefu_box li").find(".kefu_phone").css("background","#d2d2d2");
        $(".kefu_box li").find(".kefu_wx").css("background","#d2d2d2");
        $(".kefu_box li").find(".kefu_fk").css("background","#d2d2d2");
        $(".kefu_box li").find(".kefu_top span").remove("kefu_top_bj");
        $(".kefu_box li").find(".kefu_qq span").addClass("kefu_qq_bj");
        $(".kefu_box li").find(".kefu_phone span").addClass("kefu_phone_bj");
        $(".kefu_box li").find(".kefu_wx span").addClass("kefu_wx_bj");
        $(".kefu_box li").find(".back_top span").addClass("back_top_bj");
    }
})
$(".kefu_box li").mouseout(function(){
    $(".kefu_qq_list").css("display","none");
    $(".kefu_phone_list").css("display","none");
    $(".kefu_wx_info").css("display","none");
    $(this).find('i').css('display', 'none');
    $(this).find('span').removeAttr('style');
})
$(".back_top").click(function(){
    var speed=1000;
    $('body,html').animate({ scrollTop: 0 }, speed);
    return false;
});