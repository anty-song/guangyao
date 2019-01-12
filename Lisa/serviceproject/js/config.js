var baseUrl = "http://110.249.185.45:8100/app/"
// http://110.249.185.45:8100/app/website_one.php?action=main
var Config = function() {
	//首页
	this.homePage = {
		type: "post",
		url: baseUrl + "website_one.php?action=main"
		
	},
	//新闻列表页面
	
	this.newsPage = {
		type:"post",
		url: baseUrl + "website_one.php?action=news_list"
	},
	
    //	服务页
	this.servicePage = {
		type:"post",
		url:  baseUrl + "website_one.php?action=business_list"
	},
//	案例页面
	this.CasePage = {
		type:"post",
		url:  baseUrl + "website_one.php?action=case_list"
	},
	
//联系我们页面
	this.contactUsPage = {
		type:"post",
		url:  baseUrl + "website_one.php?action=contacts_list"
	}
//详情页面
	this.detailPage = {
		type:"post",
		url:  baseUrl + "website_one.php?action=news_details"
	}
	
	
	
}
