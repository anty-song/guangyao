// 计算html的font-size  
(function(){
    function resizeBaseFontSize(){
      var rootHtml = document.documentElement,
          deviceWidth = rootHtml.clientWidth;
      rootHtml.style.fontSize = deviceWidth / 19.2 + "px";
   }  
   resizeBaseFontSize();
   window.addEventListener("resize", resizeBaseFontSize, false);
   window.addEventListener("orientationchange", resizeBaseFontSize, false);
})();