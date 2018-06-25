/**
 * 动态改变 banner 和 选项列表中的图标
 * @Author    SongPeng
 * @DateTime  2018-06-25
 * @Email     929545432@qq.com
 * @version   1.0.0
 * @param     {Object}          commonConfig [全局修改的配置]
 * @param     {Array}          personalConfig [单个页面修改的配置]
 * @param     {Boolean}          changeAll [判断是否全局修改]
 */
;
( function ( commonConfig, personalConfig, changeAll ) {

  // single 为单个修改 例如 banner 是单张图片
  // multiple 为多个项目修改 例如图标列表
  var single, multiple;

  // 若为全局修改
  if ( changeAll ) {
    if ($( commonConfig.single )[ 0 ]) {
      single = $( commonConfig.single )[ 0 ];
      $( single ).css( { backgroundImage: "url(images/dynamic/" + commonConfig.dirName + "/m_shouye_banner.png)" } );
    }
    if (commonConfig.multiple) {
      multiple = commonConfig.multiple;
      for ( var i of $( multiple ) ) {
        $( i ).css( { backgroundImage: "url(images/dynamic/" + commonConfig.dirName + "/m_shouye_icon.png)" } );
      }
    }

    // 若为单页面修改
  } else {

    // 获取当前页面
    var currentPageName = window.location.pathname.split( '/' )[ window.location.pathname.split( '/' ).length - 1 ];
    for ( var i = 0; i < personalConfig.length; i++ ) {

      // 若配置中有对该页面的设置
      if ( personalConfig[ i ].pageName === currentPageName ) {
        var currentPageConfig = personalConfig[ i ];
        if ($( currentPageConfig.single )[ 0 ]) {
          single = $( currentPageConfig.single )[ 0 ];
          $( single ).css( { backgroundImage: "url(images/dynamic/" + currentPageConfig.dirName + "/m_shouye_banner.png)" } );
        }
        if (currentPageConfig.multiple) {
          multiple = currentPageConfig.multiple;
          for ( var j of $( multiple ) ) {
            $( j ).css( { backgroundImage: "url(images/dynamic/" + currentPageConfig.dirName + "/m_shouye_icon.png)" } );
          }
        }
      }
    }
  }
} )( {
  single: '.banner',          // 单个图片
  multiple: ".option-icon",   // 图标列表修改
  dirName: 'init'          // 资源目录
}, [ {
    pageName: 'index.html',   // 页面名称
    single: ".banner",
    multiple: ".option-icon",
    dirName: 'chunjie'
  },
  {
    pageName: 'test.html',
    single: ".banner",
    multiple: ".option-icon",
    dirName: 'init'
  }
], true );