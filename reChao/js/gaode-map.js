
//地图初始化时，在地图上添加一个marker标记,鼠标点击marker可弹出自定义的信息窗体

var map = new AMap.Map("container", {
	resizeEnable: false,
	center: [114.5602390000, 38.0442380000],
	zoom: 18,
	scrollWheel: false
});
function init() {
	AMap.plugin(['AMap.ToolBar', 'AMap.Scale', 'AMap.OverView'],
		function() {
			map.addControl(new AMap.ToolBar());
			map.addControl(new AMap.Scale());
			map.addControl(new AMap.OverView({isOpen: true}));
		});
}
init();
addMarker();
//添加marker标记
function addMarker() {
	map.clearMap();
	var marker = new AMap.Marker({
		map: map,
		position: [114.5602390000, 38.0442380000]
	});
	//鼠标点击marker弹出自定义的信息窗体
	window.onload = function(){		
		infoWindow.open(map, marker.getPosition());
	}
}

//实例化信息窗体
var title = '热巢',
	content = [];
content.push();
var infoWindow = new AMap.InfoWindow({
	isCustom: true, //使用自定义窗体
	offset: new AMap.Pixel(16, -45)
});