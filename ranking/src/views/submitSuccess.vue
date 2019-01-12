<template>
    <div class="wrap subSuccess">
      <!--提交成功-->
      <div class="sub-top">
        <img src="../assets/img/Navigation_icon_blank.png"/>
        <p class="sub-status">提交成功</p>
      </div>
      <!--大对勾-->
      <img src="../assets/img/Success_icon_success.png" class="successPic"/>
      <!--等待通知-->
      <p class="shuoming">
        请耐心等待审核通知，我们的客服会尽快与
        您取得联系，请保持电话畅通！
      </p>
      <!--联系电话-->
      <p class="relation">
        您也可以拨打我们的客服电话<span>400-010-260</span>进行相关的咨询
      </p>

      <!--圈圈-->
      <div class="subConsult">
        <p class="QQ">
          <img src="../assets/img/Success_icon_qq.png"/>
          <span>在线咨询</span>
        </p>
      </div>
    </div>
</template>
<script>
    export default {
      name:'submitSuccess',
      data(){
        return{

        }
      }
    }
</script>
<style scoped>
  .wrap{
    margin: 0 auto;
    padding: 30px;
    border: 1px solid rgba(230, 230, 230, 1);
    box-shadow: 0px 3px 5px rgba(0, 0, 0, 0.13);

  }


  /*提交成功*/
  .subSuccess{
    padding-bottom: 300px;
  }
  .sub-top{
    height: 40px;
  }
  .sub-top>img{
    display: inline-block;
    float: left;
  }
  .sub-status{
    font-size:36px;
    font-family:PingFang-SC-Bold;
    font-weight:bold;
    color:rgba(51,51,51,1);
    line-height:40px;
    text-align: center;
  }
  .successPic{
    display: block;
    margin: 0 auto;
    margin-top: 200px;
  }
  .shuoming{
    width:570px;
    font-size:30px;
    font-family:PingFang-SC-Medium;
    font-weight:500;
    color:rgba(51,51,51,1);
    line-height:50px;
    margin: 0 auto;
    text-align: center;
    margin-top: 85px;
  }
  .relation{
    width: 510px;
    font-size:24px;
    font-family:PingFang-SC-Medium;
    font-weight:500;
    color:rgba(102,102,102,1);
    margin: 0 auto;
    text-align: center;
    margin-top: 84px;
  }
  .relation>span{
    color:rgba(115,158,251,1);
    margin: 0 10px;
  }
  .subConsult{
    margin-top: 78px;
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

</style>
