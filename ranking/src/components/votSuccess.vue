<template>
  <div class="main">
    <div class="container">
      <!--标题-->
      <p class="voteTitle">投票成功</p>
      <!--倒计时-->
      <p class="showTime-box">
        <span class="showTime">29</span>
        <span class="timeCut">:</span>
        <span class="showTime">59</span>
        <span class="timeFont">分钟后可继续投票!</span>
      </p>
      <!--投票明细-->
      <div class="voteSuccess-detail">
        <div class="left"></div>
        <div class="right">
          <p class="voteIndustry">投票行业:医疗仪器</p>
          <p class="voteTime">投票时间:2018/04/08</p>
          <p class="voteTime hour"> 15:30:59</p>
        </div>
      </div>
      <!--奖牌-->
      <div class="riceWime">
        <img src="../assets/img/Home_icon_no3.png"/>
        <p>RICE&thinsp; WIME</p>
      </div>
      <!--投票数-->
      <p class="voteNumFont">投票数</p>
      <p class="voteNum">34567</p>
      <!--分割线-->
      <p class="mid-line"><img src="../assets/img/Details_img_line.png"/></p>
      <!--输入网址,告诉朋友-->
      <div class="search-input">
        <input type="text" value="https://m.pp.cc.cpm" />
        <input type="button" value="告诉朋友" />
      </div>
      <!--搜索框下边的文字-->
      <a href=""><p class="callForFriend">一键复制，告诉朋友。</p></a>
    </div>
    <!--网页最下边的叉号-->
    <div class="chahao">✕</div>


  </div>

</template>
<script>
  export default {
    name:'votSuccess',
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


  /*投票成功*/
  .voteTitle{
    text-align: center;
    font-size:50px;
    font-family:WenYue-XinQingNianTi-W8;
    font-weight:normal;
    color:rgba(220,196,89,1);
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
  .voteSuccess-detail{
    clear: both;
    width: 510px;
    height: 140px;
    padding: 0 45px;
    margin-top: 61px;
  }
  .voteSuccess-detail .left{
    width:240px;
    height:140px;
    background:rgba(191,191,191,1);
    border-radius:2px;
    float: left;

  }
  .voteSuccess-detail .right{
    width:240px;
    height:140px;
    float: right;
  }
  .voteIndustry,.voteTime{
    font-size:22px;
    font-family:PingFang-SC-Medium;
    font-weight:500;
    color:rgba(102,102,102,1);
    line-height:30px;

  }
  .voteIndustry{
    margin: 10px 0 23px 0;
  }
  .hour{
    text-indent: 4.5em;
  }
  .riceWime{
    width: 266px;
    height: 36px;
    margin: 0 auto;
    margin-top: 44px;
  }
  .riceWime img{
    display: inline-block;
    width: 37px;
    height: 33px;
    float: left;
    margin-right: 20px;
  }
  .riceWime p{
    text-align: center;
    font-size:36px;
    font-family:PingFang-SC-Bold;
    font-weight:bold;
    color:rgba(68,68,68,1);
    line-height:36px;
  }
  .voteNumFont{
    font-size:20px;
    font-family:PingFang-SC-Medium;
    font-weight:500;
    color:rgba(186,186,186,1);
    line-height:24px;
    text-align: center;
    margin-top: 30px;
  }
  .voteNum{
    font-size:34px;
    font-family:PingFang-SC-Bold;
    font-weight:bold;
    color:rgba(216,204,151,1);
    line-height:66px;
    text-align: center;
  }
  .search-input{
    width:460px;
    height:56px;
    background:rgba(241,245,255,1);
    border-radius:28px;
    margin: 0 auto;
    margin-top: 43px;
  }
  .search-input>input[type="text"]{
    width: 295px;
    font-size:24px;
    font-family:PingFang-SC-Regular;
    font-weight:400;
    color:rgba(102,102,102,1);
    border-radius:28px 0px 0px 28px;
    background:rgba(241,245,255,1);
    line-height:56px;
    float: left;
    padding-left: 25px;
  }
  .search-input>input[type="button"]{
    width:140px;
    height:56px;
    background:rgba(115,158,251,1);
    border-radius:0px 28px 28px 0px;
    font-size:24px;
    font-family:PingFang-SC-Medium;
    font-weight:500;
    color:rgba(255,255,255,1);
    line-height:24px;
    float: right;
  }
  .callForFriend{
    width: 460px;
    font-size:18px;
    font-family:PingFang-SC-Regular;
    font-weight:400;
    color:rgba(36,117,250,1);
    line-height:24px;
    margin: 0 auto;
    text-align: right;
    margin-top: 18px;

  }
  .chahao{
    width:74px;
    height:74px;
    font-size: 34px;
    font-weight: 100;
    text-align: center;
    line-height: 74px;
    color: #FFFFFF;
    background:#cccccc;
    border-radius:50%;
    margin: 0 auto;
    margin-top: 46px;
    text-align: center;
  }




</style>
