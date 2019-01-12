var config = new Config();
var news = new Vue({
    el: "#news",
    data: {
        logo: {},		// 头部底部
        newsdata: {},	// 新闻列表
        qq: {},			// qq 客服
        pageNum: [],	// 页数
        currentPage: 0  // 当前页
    },
    created: function () {
        var that = this;
        new Promise(function (a, b) {
            that.pageInit()
        })
            .then(function (a) {
                console.log(a)
                that.addBtnStyle(1);
            })
            .catch(function (b) {
                console.log(b)
            });
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
                    page: 1
                },
                async: true,
                dataType: "json",
                success: function (res) {
                    console.log(res);
                    that.newsdata = res.data.newsdata;
                    that.logo = res.data.logo;
                    that.currentPage = res.data.page;
                    var totalpage = res.data.totalPage;
                    var pageNum = [];
                    for (var i = 0; i < totalpage; i++) {
                        pageNum.push(i + 1);
                    }
                    that.pageNum = pageNum;
                    console.log(pageNum)
                },
                complete: function (data) {
                    setTimeout(function () {
                        $(".songmask").remove();
                    }, 500);
                },
                error: function () {

                }
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
        getData: function (page) {
            var that = this;
            $.ajax({
                type: config.newslist.type,
                url: config.newslist.url,
                data: {
                    action: "news_list",
                    page: page
                },
                async: true,
                dataType: "json",
                success: function (res) {
                    console.log(res);
                    that.newsdata = res.data.newsdata;
                    that.logo = res.data.logo;
                    that.currentPage = res.data.page;
                    that.addBtnStyle(that.currentPage);
                }
            })
        },
        // 切换页面
        changePage: function (page) {
            this.getData(page);
        },
        // 上一页
        prePage: function () {
            var currentPage = this.currentPage;
            console.log(currentPage);
            if (currentPage == 1) {
                return;
            } else {
                this.currentPage = currentPage - 1;
                this.getData(currentPage - 1)
            }
        },
        // 下一页
        nextPage: function () {
            var currentPage = this.currentPage;
            console.log(currentPage);
            if (currentPage == this.pageNum.length) {
                return;
            } else {
                this.currentPage = currentPage + 1;
                this.getData(currentPage + 1)
            }
        },
        // 切换分页器
        addBtnStyle: function (index) {
            console.log($(".pagination-btn"))
            $(".pagination-btn").eq(index).addClass("pagination-current").siblings().removeClass("pagination-current");
        }
    }
})