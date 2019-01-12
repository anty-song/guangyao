<template>
  <div class="container wrong">
    <!--错误提示的头部 和规则提示共用样式-->
    <div class="ruleTop">
      <div class="ruleLine1"></div>
      <p class="ruleTitle">错误提示</p>
      <div class="ruleLine2"></div>
    </div>
    <!--错误的说明文字-->
    <p class="ruleContent">这是一段规则提示的说明文字，这是一段规则提示的说明文字。</p>
    <!--圈圈的内容-->
    <div class="wrongConsult">
      <p class="QQ">
        <img src="../assets/img/Success_icon_qq.png"/>
        <span>在线咨询</span>
      </p>
      <p class="service">客服电话<span>400-010-260</span></p>
    </div>
    <!--我知道了-->
    <p class="page-botton">我知道了</p>
  </div>
</template>
<script>
  export default {
    name:'wrong',
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

  .ruleTop{
    height: 30px;
    width: 450px;
    margin: 0 auto;

  }
  .ruleLine1,.ruleLine2{
    float: left;
    width:120px;
    height:1px;
    background:  rgba(223,223,223,1);
    margin-top: 20px;
  }
  .ruleLine1{
    margin-right: 40px;
  }
  .ruleTitle{
    font-size:32px;
    font-family:PingFang-SC-Bold;
    font-weight:bold;
    color:rgba(51,51,51,1);
    float: left;
    margin-right: 40px;
  }
  .ruleContent{
    width: 466px;
    font-size:26px;
    font-family:PingFang-SC-Medium;
    font-weight:500;
    color:rgba(153,153,153,1);
    line-height:34px;
    margin: 0 auto;
    margin-top: 44px;
  }
  .page-botton{
    text-align: center;
    font-size:30px;
    font-family:PingFang-SC-Medium;
    font-weight:500;
    color:rgba(51,51,51,1);
    line-height:34px;
    margin-top: 50px;
    padding-top: 29px;
    border-top: 1px solid rgba(204,204,204,1);
  }


  /*错误提示*/
  .wrong{
    padding-bottom: 30px;
    border-radius:10px;
  }
  .wrongConsult{
    margin-top: 116px;
  }
  .QQ{
    text-align: center;
  }
  .QQ>img,.QQ>span{
    display: inline-block;
    vertical-align: middle;
    margin: 0 7px;
  }
  .QQ>span{
    font-size:34px;
    font-family:PingFang-SC-Bold;
    font-weight:bold;
    color:rgba(115,158,251,1);
    line-height:24px;
    letter-spacing: 2px;
  }
  .service{
    font-size:24px;
    font-family:PingFang-SC-Medium;
    font-weight:500;
    color:rgba(102,102,102,1);
    text-align: center;
    letter-spacing: 2px;
    margin-top: 21px;
  }
  .service>span{
    font-size:24px;
    font-family:PingFang-SC-Medium;
    font-weight:500;
    color:rgba(115,158,251,1);

  }


</style>
