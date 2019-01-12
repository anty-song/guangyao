<template>
    <div class="container rule">
      <!--规则提示的头部-->
      <div class="ruleTop">
        <div class="ruleLine1"></div>
        <p class="ruleTitle">规则提示</p>
        <div class="ruleLine2"></div>
      </div>
      <!--规则提示的倒计时-->
      <p class="showTime-box">
        <span class="showTime">29</span>
        <span class="timeCut">:</span>
        <span class="showTime">59</span>
        <span class="timeFont">分钟后可继续投票!</span>
      </p>
      <!--规则提示的说明文字-->
      <p class="ruleContent">这是一段规则提示的说明文字，这是一段规则提示的说明文字。</p>
      <!--我知道了-->
      <p class="page-botton">我知道了</p>
    </div>
</template>
<script>
    export  default {
        name:'rule',
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

  /*规则提示*/
  .rule{
    padding-bottom: 30px;
    border-radius:10px;
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



  .showTime-box{
    width: 330px;
    height: 42px;
    margin: 0 auto;
    margin-top: 30px;
  }
  .showTime{
    display: inline-block;
    width:40px;
    height:40px;
    background:rgba(36,117,250,1);
    border-radius:8px;
    font-size:26px;
    font-family:PingFang-SC-Bold;
    font-weight:bold;
    color:rgba(255,255,255,1);
    line-height:40px;
    text-align: center;
    float: left;
    margin: 0 5px;
  }
  .timeCut{
    display: inline-block;
    font-size:30px;
    font-family:PingFang-SC-Bold;
    font-weight:bold;
    color:rgba(36,117,250,1);
    line-height:40px;
    float: left;

  }
  .timeFont{
    display: inline-block;
    font-size:26px;
    font-family:PingFang-SC-Bold;
    font-weight:bold;
    color:rgba(36,117,250,1);
    line-height:40px;
    float: left;
  }


</style>
