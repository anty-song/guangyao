$(function () {
    $('.nav a').on('click', function() {
        var _ = $(this);
        var url = _.attr('href');

        //点击a跳转页面
        location.href = url;

        //添加背景色 css设置a.on { background: #09e; color: #fff; }
        // _.addClass('on').siblings('a').removeClass('on');
        return false;
    });
});