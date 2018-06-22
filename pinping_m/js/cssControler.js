// 动态改变 banner 和 选项列表中的图标
;
( function ( dirName ) {

  // 获取元素节点
  // ！使用 jQuery 时 会有问题
  var banner = document.getElementsByClassName( 'banner' )[ 0 ];
  var icons = document.getElementsByClassName( 'option-icon' );

  // 正则匹配背景图片地址 小括号() 中的内容
  var reg = /\"(.+?)\"/g;

  // 拼接新的图片地址 这里使用字符串模板时 ${varible} 应该也可以
  var bannerNewValue = "images/dynamic/" + dirName + "/m_shouye_banner.png";
  var iconNewValue = "images/dynamic/" + dirName + "/m_shouye_icon.png";

  // String.replace() 返回值是 地址
  var bannerImg = banner.style.backgroundImage.replace( reg, bannerNewValue );

  // 设置背景图片地址
  banner.style.backgroundImage = bannerImg;

  // 遍历选项列表 item 逐个设置新地址
  for ( var i of icons ) {
    var iconImg = i.style.backgroundImage.replace( reg, iconNewValue );
    i.style.backgroundImage = iconImg;
  }
} )( 'init' ) // 修改 init 即可 将 init 改成新的文件夹名称