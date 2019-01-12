var config = new Config();


$(function(){
	var newsContentUrl =window.location.href;
	var index=newsContentUrl.lastIndexOf("=");
	newsContentId=newsContentUrl.substring(index+1,newsContentUrl.length);
	 
//newsxq
$.ajax({
	type: config.newsxq.type,
	url: config.newsxq.url,
	data: {
		action:"news_details",
		newsid:newsContentId
	},
	async:true,
	dataType:"json",
	success: function(res) {
		if(res.status != 1) {return};
		
		var xqdata = res.data;
		var newsxqhtm = "";
		var newsxqimg = ""
		var img = xqdata.imgurl;
		for(var i=0;i<img.length;i++){
			newsxqimg+="<div class='img'><img src='"+img[i]+"' alt=''></div>"
		}	
		newsxqhtm="<h3>"+xqdata.articletitle+"</h3>"+
					"<div class='read'>"+
						"<span>"+xqdata.pviews+"</span>"+
						"<span>"+xqdata.addtime+"</span>"+
					"</div>"+

					"<p>"+xqdata.editorValue+newsxqimg+"</p>";
					
				
				
		$(".wb").html(newsxqhtm);
		console.log(xqdata);
		
	
	},
	complete: function(data) {
	},
	error: function() {
		
	}
});
	
})
