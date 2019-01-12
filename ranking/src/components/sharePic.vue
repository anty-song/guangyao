<template>
  <div class="container">
    <!--头部-->
    <div class="page-top">
      <div class="logo"></div>
      <p class="logoFont">品牌中国</p>
    </div>
    <!--标题-->
    <h1 class="title">中国医疗仪器十大品牌排行</h1>
    <!--分割线-->
    <p class="mid-line"><img src="../assets/img/Details_img_line.png"/></p>
    <!--二维码-->
    <div class="erweima"></div>
    <!--二维码下边的文字-->
    <p class="contentForerweima">扫描二维码</p>
    <p class="contentForerweima">助力品牌力量</p>
  </div>
</template>
<script>

  export default {
    name:'sharePic',
    data(){
      return{

      }
    }
  }
</script>
<style scoped>

  .container{
    width: 600px;
    margin: 0 auto;
    border: 1px solid rgba(230, 230, 230, 1);
    box-shadow: 0px 3px 5px rgba(0, 0, 0, 0.13);
    padding-top: 40px;
    padding-bottom: 60px;
  }

  img{
    display: block;
    width: 100%;
    height: 100%;
  }

  /*分享图片*/
  .page-top{
    width: 280px;
    height: 50px;
    margin: 0 auto;
  }
  .logo{
    width:52px;
    height:49px;
    float: left;
    margin-right: 20px;
    background: lightyellow;
  }
  .logoFont{
    font-size:50px;
    font-family:WenYue-XinQingNianTi-W8;
    font-weight:normal;
    color:rgba(220,196,89,1);
    line-height:45px;
    float: left;
  }
  .title{
    text-align: center;
    font-size: 36px;
    line-height: 36px;
    margin-top: 42px;
    margin-bottom: 52px;
  }
  .mid-line{
    width: 460px;
    margin: 0 auto;
  }
  .erweima{
    width: 166px;
    height: 166px;
    margin: 0 auto;
    margin-top: 23px;
    background: gray;
  }
  .contentForerweima{
    font-size:28px;
    font-family:PingFang-SC-Medium;
    font-weight:500;
    color:rgba(153,153,153,1);
    line-height:42px;
    text-align: center;
    margin-top: 11px;
  }


</style>
