var config = new Config();
var news = new Vue({
    el: "#news",
    data: {
        logo: {},		// 头部底部
        newsdata: {},	// 新闻列表
        qq: {},			// qq 客服

        pageNum: 1,
        pages: 0
    },
    created: function () {
        this.pageInit();
    },
    methods: {
        // 初始化
        pageInit: function () {
            var that = this;
            $.ajax({
                type: config.newslist.type,
                url: config.newslist.url,
                data: {
                    action: "news_list",
                    page: that.pageNum
                },
                async: true,
                dataType: "json",
                success: function (res) {
                    console.log(res);
                    that.newsdata = res.data.newsdata;
                    that.logo = res.data.logo;
                    that.pages = res.data.totalPage;
                },
                complete: function (data) {
                    setTimeout(function () {
                        $(".songmask").remove();
                    }, 500);
                },
                error: function () {}
            })
            $.ajax({
                type: config.mainPage.type,
                url: config.mainPage.url,
                dataType: "json",
                data: {
                    action: "main"
                },
                success: function (res) {
                    that.qq = res.data.qq;
                }
            })
        },
        // 获取数据
        getData: function (curPage) {
            //根据当前页获取数据
            this.pageNo = curPage;
            this.newsCenterData();
            console.log("当前页：" + this.pageNo);
        }
    }
})