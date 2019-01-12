$(document).ready(function(){
    var falg=true;
    $(".button").on("click",function(){
        if(falg){
            $(".add").addClass("active");
            $(".item").addClass("zoomIn");
            falg=!falg;
        }else{
            $(".add").removeClass("active");
            falg=!falg;
        }
    })
})