$(function(){
    // 顶部banner点击消失
    $('.baike_bacha_top').click(function(){
      $('.baike_banner_top').hide();
    });


    //创建控件
    var tree = $('#demo').navigationTree({
        data: [
            { ID: '1', NodeName: '品牌荣誉' },
            { ID: '2', NodeName: '详细介绍' },
            {
                ID: '3',
                NodeName: '品牌介绍'
                // Children: [{ ID: '3.1', NodeName: '标题3.1' }, { ID: '3.2', NodeName: '标题3.2' }]
            },
            { ID: '4', NodeName: '大事记' },
            { ID: '5', NodeName: '管理团队' }
        ]
    });
    //控制第二个节点显示已完成
    tree.showOkIcon(1);
    var b=$('.imgs_zhanshi').offset().top;
   var a=$('.entry_in_the_statistics').offset().top;
    $(window).scroll(function(event){
        var winPos = $(window).scrollTop();
        if(winPos>=a){
            $('#demo').fadeIn(600);
        }else if(winPos<b+130){
            $('#demo').fadeOut(100);
        }
    });



});