<template>
  <div class="login_container">
    <head-top :goBack="true" :headTitle="head_title"></head-top>
    <div class="login_wrap">
      <!--选择登录方式-->
      <section class="login_way">
        <div class="f_l" @click="tabWay('count')"><span :class="{active:!loginWay}">账号密码登录</span></div>
        <div class="f_l" @click="tabWay('msg')"><span :class="{active:loginWay}">短信验证码登录</span></div>
      </section>
      <!--账号密码登录-->
      <section class="login_form" id="user-login" v-show="!loginWay">
        <form action="">
          <div class="input_container" @click="clickFocus('focusUser')">
            <div class="txt_username f_l">账号</div>
            <input class="" type="text" placeholder="请输入账号" v-model="username" v-focus="focusUser" @blur="focusUser=false">
            <i class="icon icon_clear" @click.stop="clearInput('username')" v-show="focusUser"></i>
          </div>
          <div class="input_container" @click="clickFocus('focusPassword')">
            <div class="txt_password f_l">密码</div>
            <input class="" type="password" placeholder="请输入密码" v-model="password" v-if="!showPwd" v-focus="focusPassword" @blur="focusPassword=false">
            <input type="text" placeholder="请输入密码" v-model="password" v-if="showPwd" v-focus="focusPassword" @blur="focusPassword=false">
            <i class="icon icon_clear pwd_icon" @click.stop="clearInput('password')" v-show="focusPassword"></i>
            <label for="">
              <div class="onOffPaw icon" :class="{icon_eye_open:showPwd,icon_eye_close:!showPwd}" @click.stop="showPassword"></div>
            </label>
          </div>
        </form>
      </section>
      <!--短信验证登录-->
      <section class="login_form" id="sms-login" v-show="loginWay">
          <div class="input_container" @click="clickFocus('focusPhone')">
            <div class="area_box">+86</div>
            <input type="tel" name="phoneNumber" placeholder="请输入手机号" v-model="phoneNumber" maxlength="11" v-focus="focusPhone" @blur="focusPhone = false">
            <button @click.stop="getVerifyCode" v-show="!computedTime"  :disabled="!rightPhoneNumber">获取验证码</button>
            <button @click.stop v-show="computedTime" disabled>重新发送({{computedTime}}s)</button>
            <i class="icon icon_clear phone_clear" @click.stop="clearInput('phone')" v-show="focusPhone"></i>
          </div>
          <div class="input_container" @click="clickFocus('focusSms')">
            <input type="text" name="sms" placeholder="请输入收到的验证码" v-model="sms" v-focus="focusSms" @blur="focusSms = false">
            <i class="icon icon_clear" @click.stop="clearInput('sms')" v-show="focusSms"></i>
          </div>
      </section>
      <!--登录按钮-->
      <section class="login_btn">
        <button @click.stop="loginAccount" :class="{complete:complete}" :disabled="!complete">登  录</button>
      </section>
      <!--忘记密码-->
      <section class="quick_nav">
        <router-link to="/forgetPwd" tag="a" class="f_l">
          <i class="icon_forget_pwd icon"></i>
          <span>忘记密码</span>
        </router-link>
        <router-link to="" tag="a" class="f_r">
          <i class="icon_register icon"></i>
          <span>手机快速注册</span>
        </router-link>
      </section>
      <!--其他登录方式-->
      <section class="quick_login">
        <div class="quick_login_wrap">
          <h4>其他登录方式</h4>
          <router-link to=""><i class="icon icon_qq"></i></router-link>
          <router-link to=""><i class="icon icon_wx"></i></router-link>
          <div class="agreement_tips">
            <p>登录即代表您已经同意<router-link to="/agreements">律师阁隐私政策</router-link></p>
          </div>
        </div>
      </section>
    </div>
  </div>
</template>

<script>
  import headTop from '@/components/head'
  import {loginAccount} from '@/config/api'
  import {mapMutations} from "vuex"
  export default {
        name: "login",
        components: {
          headTop
        },
        data () {
          return{
            head_title: "律师阁登录",
            loginWay: false,//默认是账号登录
            focusUser: false,
            focusPassword: false,
            focusPhone: false,
            focusSms: false,
            username: null,
            password: null,
            showPwd: false,
            computedTime: null,//发送验证码倒计时
            phoneNumber: null,
            sms: null,
            userInfo:null,
          }
        },
        computed:{
          //判断手机号是否正确
          rightPhoneNumber() {
            return /^[1][3,4,5,6,7,8][0-9]{9}$/gi.test(this.phoneNumber);
          },
          //判断是否可以点击登录按钮
          complete() {
            if (!this.loginWay)
            {
              if (this.username && this.password){
                return true;
              } else {
                return false;
              }
            }else if (this.loginWay)
            {
              if (this.rightPhoneNumber && this.sms){
                return true;
              } else {
                return false;
              }
            }
          }
        },
        methods: {
          ...mapMutations([
            'RECORD_USERINFO',
          ]),
          //切换登录方式
          tabWay(type) {
            if (type == 'count'){
              this.loginWay = false;
            } else if (type == 'msg') {
              this.loginWay = true;
            }
          },
          //点击聚焦
          clickFocus($el) {
            switch ($el) {
              case 'focusUser':
                this.focusUser = true;
                break;
              case 'focusPassword':
                this.focusPassword = true;
                break;
              case 'focusPhone':
                this.focusPhone = true;
                break;
              case 'focusSms':
                this.focusSms = true;
                break;
            }
          },
          //清空用户名
         clearInput($el) {
            if ($el == "username") {
              this.username = null;
            }else if ($el == "password") {
              this.password = null;
            } else if ($el == "phone") {
              this.phoneNumber = null;
            } else if ($el == "sms") {
              this.sms = null;
            }
         },
          //展示密码
          showPassword() {
            this.showPwd = !this.showPwd;
          },
          getVerifyCode() {
            if (this.rightPhoneNumber) { //如果手机号正确才可以
              this.$api.getSms(this.phoneNumber).then(res => {
                console.log(res);
                if (res.data.status == 1) {
                  this.computedTime = 60;
                  this.$dialog.loading.open('发送中...');
                  setTimeout(() => {
                    this.$dialog.loading.close();

                    this.$dialog.toast({
                      mes: '已发送',
                      icon: 'success',
                      timeout: 1500
                    });
                    //开始计时
                    this.timer = setInterval(() => {
                      this.computedTime --;
                      if (this.computedTime == 0) {
                        clearInterval(this.timer);
                      }
                    },1000);

                  }, 1000);
                }
              })
            }
          },
          loginAccount() {
            if (!this.loginWay) { //账号登录
              let params = {action:'login',username: this.username,password: this.password}
              this.$api.loginAccount(params).then(res=>{
                console.log(res);
                if (res.data.status == 1) {
                  this.userInfo = res.data.data;
                  this.RECORD_USERINFO(this.userInfo);
                  this.$router.go(-1);
                } else {
                  this.$dialog.toast({
                    mes: '登录失败',
                    timeout: 1500,
                    icon: 'error',
                    callback: () => {
                      this.$dialog.alert({mes: res.data.msg});
                    }
                  });
                }
              })
            } else if (this.loginWay) { //短信登录
              let params = {action:'smslogin',username:this.phoneNumber,code:this.sms}
              this.$api.loginSms(params).then(res=>{
                console.log(res);
                if (res.data.status == 1) {
                  this.userInfo = res.data;
                  this.RECORD_USERINFO(this.userInfo);
                  this.$router.go(-1);
                } else {
                  this.$dialog.toast({
                    mes: '登录失败',
                    timeout: 1500,
                    icon: 'error',
                    callback: () => {
                      this.$dialog.alert({mes: res.data.msg});
                    }
                  });
                }
              })
            }
          }
        },
        directives: {
          focus: {
            update: function(el,{value}) {
              if (value) {
                el.focus();
              }
            }
          }
        }
    }
</script>

<style scoped lang="scss" rel="stylesheet/scss">
@import "../../style/mixin.scss";
  .login_way{
    width: 100%;
    height: 44px;
    border-bottom: 1px solid #d7d7d7;
    background: #FFFFFF;
    font-size: 0px;
    div.f_l{
      width: 50%;
      text-align: center;
      height: 42px;
      line-height: 16px;
      span{
        font-size: .26rem;
        line-height: 42px;
        display: inline-block;
        position: relative;
        z-index: 10;
      }
      .active{
        border-bottom: 2px solid $green;
        padding: 0rem 0.2rem;
        padding-bottom: 1px;
      }
    }
  }

  .login_form{
    padding: 0rem 0.3rem;
    background: #FFFFFF;

      .input_container{
        width: 100%;
        height: .96rem;
        overflow: hidden;
        position: relative;
        border-bottom: 1px solid #D7D7D7;
        .txt_username,.txt_password{
          font-size: 0.28rem;
          @include ct;
          z-index: 1;
          width: 1.2rem;
          line-height: .96rem;
        }
        input{
          padding: 0rem .8rem 0rem 1.2rem;
          width: 100%;
          box-sizing: border-box;
          @include ct;
          border: none;
          outline: none;
          font-size: .28rem;
          color: #333333;
          font-family: "PingFang-SC-Regular";
        }
        input[type='password']{
          padding-right: 1.4rem;
        }
        .icon_clear{
          @include ct;
          right: 0.1rem;
        }
        .onOffPaw{
          @include ct;
          right: 0.2rem;
        }
        .icon_eye_open{
          @include bis('img/show_password.png');
          background-position: 0rem 0.1rem;
        }
        .icon_eye_close{
          @include bis('img/hide_password.png');
          background-position: 0rem 0.1rem;
        }
        .pwd_icon{
          right: 0.8rem;
        }
        .phone_clear{
          right: 2.5rem;
        }
      }

  }
  #sms-login{
    position: relative;
    .input_container{
      position: relative;
      .area_box{
        z-index: 1000;
        width: 0.8rem;
        height: .96rem;
        position: absolute;
        left: 0px;
        font-size: 0.28rem;
        line-height: .96rem;
      }
      input[name='phoneNumber']{
        padding: 0rem 3.1rem 0rem .8rem;
      }
      input[name='sms']{
        padding: 0rem 1rem 0rem 0.15rem;
      }
      button{
        @include ct;
        right: 0rem;
        border: none;
        outline: none;
        background: #FFF;
        border-left: 1px solid #D7D7D7;
        width: 2.36rem;
      }
    }
  }

  .login_btn{
    width: 100%;
    background: #FFF;
    text-align: center;
    padding: 1rem 0rem 1rem 0rem;
    overflow: hidden;
    button{
      @include wh(84%,0.96rem);
      background: #EEEEEE;
      border: none;
      text-align: center;
    }
    .complete{
      background: $green;
      color: #FFF;
    }
  }

  .quick_nav{
    background: #FFFFFF;
    font-size: 0px;
    padding: 0.2rem 0.15rem;
    overflow: hidden;
    padding-bottom: 1.5rem;
    a{
      color: #333333;
      i{
        display: inline-block;
        vertical-align: middle;
        @include bis('img/login_icon.png');
        -webkit-background-size: auto;

      }
      .icon_forget_pwd{
        background-position: -0.22rem -0.22rem;
        background-size: 0.96rem auto;
      }
      .icon_register{
        background-position: -0.14rem -2.78rem;
        background-size: 0.76rem auto;
      }
      span{
        font-size: 0.24rem;
        vertical-align: middle;
      }
    }
  }

  .quick_login{
    font-size: 0px;
    background: #FFFFFF;
    padding: 0rem 0.45rem;
    .quick_login_wrap{
      padding: .245rem .1rem 0 .1rem;
      border-top: 1px solid #d7d7d7;
      position: relative;
      text-align: center;
      h4{
        font-size: 0.3rem;
        font-weight: bold;
        color: $light_gray;
        @include cl;
        top: -0.2rem;
        background: #FFFFFF;
        padding: 0.05rem 0.25rem;
      }
      a{
        display: inline-block;
        margin: 0.35rem 0.8rem 0.5rem 0.8rem;
        i{
          @include bis('img/login_icon.png');
        }
        .icon_qq{
          background-position: -0.27rem -0.96rem;
          background-size: 0.96rem auto;
        }
        .icon_wx{
          background-position: -0.24rem -1.4rem;
          background-size: 0.8rem auto;
        }
      }
      .agreement_tips{
        font-size: 0.24rem;
        color: #333333;
        text-align: center;
        padding-bottom: 1.5rem;
        a{
          color: #000;
          margin: 0px;
          text-decoration: underline;
        }
      }
    }
  }

</style>
