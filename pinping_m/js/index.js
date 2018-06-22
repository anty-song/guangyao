// 垂直滚动页面 改变搜索框 部分的背景颜色
;( function () {
  var pos = 0;
  var ticking = false;
  var header = $( "header" );
  console.log( header )
  var bannerH = $( '.banner' ).height();
  var headerH = $( 'header' ).height();
  var _height = bannerH - headerH - 15;
  window.addEventListener( "scroll", function ( e ) {
    pos = window.scrollY;
    if ( pos > _height && !ticking ) {
      header.addClass( "scrolledDown" );
      ticking = true;
    }
    if ( pos < _height && ticking ) {
      header.removeClass( "scrolledDown" );
      ticking = false;
    }
  } );
} )();

// 广播的轮播
var scrollIndex = 0;
var Timer = null;

function scroll_f() {
  clearInterval( Timer );
  var ul = $( "#scroll ul" );
  var li = ul.children( "li" );
  var h = li.height();
  var index = 0;
  ul.css( "height", h * li.length * 2 );
  ul.html( ul.html() + ul.html() );

  function run() {
    if ( scrollIndex >= li.length ) {
      ul.css( { top: 0 } );
      scrollIndex = 1;
      ul.animate( { top: -scrollIndex * h }, 300 );
    } else {
      scrollIndex++;
      ul.animate( { top: -scrollIndex * h }, 300 );
    }
  }
  Timer = setInterval( run, 2000 );
}
scroll_f();