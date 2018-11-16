<template>
  <div class="pc-login">
    <div class="mask">
      <div class="dl" style="display: none;">
        <form action="">
          <ul class="dllist">
            <li><span class="glyphicon glyphicon-remove-circle"> </span></li> 
            <li>
              <div class="logo"><img src="../assets/images/logo.png" alt="" /></div>
              <h2>欢迎登录评测工场</h2>
            </li>
            <li><input type="text" placeholder="请输入手机号/邮箱"/></li>
            <li><input type="text" placeholder="请输入密码"/></li>
            <li>忘记密码？</li>
            <li><input type="submit" value="登录"/></li>
            <li><a href="#"style="color:#535353;">账号登录</a>|<a href="#" style="color:#ea6457;">立即注册</a></li>
          </ul>
        </form>
      </div>
      <div class="dl dxdlbk" style="display: none;">
        <form action="">
          <ul class="dllist dxdl">
            <li><span class="glyphicon glyphicon-remove-circle"> </span></li> 
            <li>
              <div class="logo"><img src="../assets/images/logo.png" alt="" /></div>
              <h2>欢迎登录评测工场</h2>
            </li>
            <li><span>+86</span><input type="text" placeholder="手机号"/></li>
            <li><input type="text" placeholder="请输入短信验证码"/> <span>获取验证码</span></li>
            <li><input type="submit" value="登录"/></li>
            <li><a href="#"style="color:#535353;">账号登录</a>|<a href="#" style="color:#ea6457;">立即注册</a></li>
          </ul>
        </form>
      </div>
      <div class="dl zcbk"style="display: block;">
        <!-- <form action=""> -->
          <ul class="dllist zc">
            <li><span class="glyphicon glyphicon-remove-circle"> </span></li> 
            <li>
              <div class="logo"><img src="../assets/images/logo.png" alt="" /></div>
              <h2>免费注册评测工场</h2>
            </li>
            <li><input type="text" placeholder="请输入手机号/邮箱" v-model="registeracount"/></li>
            <li><input type="text" placeholder="请输入短信验证码" v-model="registeryzm"/> <span>获取验证码</span></li>
            <li><input type="text" placeholder="密码由6-20位字母、数字和符号组合"v-model="registerpassword"/></li>
            <li><input type="text" placeholder="请再次输入上面的密码" v-model="registerrepeatpassword"/></li>
            <li><span class="glyphicon glyphicon-ok-sign"></span><p>同意《用户协议》《隐私政策》</p></li>
            <li><input @click="getData" type="submit" value="立即注册"/></li>
            <li>已经拥有账户？<a href="#" style="color:#ea6457;">立即登录</a></li>
          </ul>
        <!-- </form> -->
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: "login",
  data() {
    return {
      registeracount:'',
      registeryzm:'',
      registerpassword:'',
      registerrepeatpassword:''
    };
  },
  methods: {
    getData() {
      
    }
  }
};
</script>
<style lang="scss" scoped>
.mask {
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  background: rgba(255, 255, 255, 0.6);
  position: fixed;
  z-index: 888;
  .zcbk {
    height: 520px !important;
  }
  .dxdlbk {
    height: 450px !important;
  }
  .dl {
    width: 436px;
    height: 487px;
    background-color: #fff;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    border-radius: 5px;
    .dllist {
      li {
        width: 350px;
        float: none;
        margin: 10px auto;
        &:nth-child(1) {
          text-align: right;
          margin-right: 15px;
        }
        &:nth-child(5) {
          text-align: right;
          margin: -10px auto 10px auto;
          color: #ababab;
        }
        &:nth-child(7) {
          text-align: center;
          font-size: 12px;
        }
        &:nth-child(2) {
          text-align: center;
          margin: 20px auto;
        }
        .logo {
          width: 60px;
          height: 60px;
          display: inline-block;
          img {
            width: 100%;
            height: 100%;
          }
        }
        span {
          font-size: 25px;
          color: #cbcbcb;
        }
        h2 {
          font-size: 16px;
          color: #535353;
        }
        input[type="text"] {
          width: 100%;
          height: 40px;
          padding: 0 10px;
          margin: 10px auto;
          border: 1px solid #c4c4c4;
          border-radius: 5px;
        }
        input[type="text"]:-input-placeholder {
          font-size: 14px;
          color: #cbcbcb;
        }
        input[type="text"]:-ms-input-placeholder {
          font-size: 14px;
          color: #cbcbcb;
        }
        input[type="text"]::-webkit-input-placeholder {
          font-size: 14px;
          color: #cbcbcb;
        } /* 使用webkit内核的浏览器 */
        input[type="text"]:-moz-placeholder {
          font-size: 14px;
          color: #cbcbcb;
        } /* Firefox版本4-18 */
        input[type="text"]::-moz-placeholder {
          font-size: 14px;
          color: #cbcbcb;
        } /* Firefox版本19+ */
        input[type="submit"] {
          width: 100%;
          height: 44px;
          margin: 20px auto 10px auto;
          font-size: 18px;
          color: #fff;
          border: none;
          border-radius: 5px;
          background-color: #ea6457;
          box-shadow: 0px 1px 2px rgba(150, 0, 0, 0.34);
        }
      }
    }
    .dxdl {
      li {
        margin: 20px auto;
        &:nth-child(3) {
          border: 1px solid #9f9f9f;
          border-radius: 5px;
          span {
            font-size: 14px;
            color: #6b6b6b;
            width: 40px;
            height: 43.5px;
            line-height: 43.5px;
            text-align: center;
            border-right: 1px solid #9f9f9f;
            display: inline-block;
          }
        }
        &:nth-child(4) {
          border: 1px solid #9f9f9f;
          border-radius: 5px;
          span {
            width: 90px;
            height: 30px;
            line-height: 30px;
            text-align: center;
            background-color: #f5f5f5;
            display: inline-block;
            border-radius: 5px;
            font-size: 12px;
          }
        }
        &:nth-child(6) {
          text-align: center;
          font-size: 12px;
        }
        input[type="text"] {
          width: 66%;
          height: 40px;
          padding: 0 10px;
          margin: 0;
          border: none;
          color: #9f9f9f;
        }
        input[type="text"]:-input-placeholder {
          font-size: 14px;
          color: #a7a7a7;
        }
        input[type="text"]:-ms-input-placeholder {
          font-size: 14px;
          color: #a7a7a7;
        }
        input[type="text"]::-webkit-input-placeholder {
          font-size: 14px;
          color: #a7a7a7;
        } /* 使用webkit内核的浏览器 */
        input[type="text"]:-moz-placeholder {
          font-size: 14px;
          color: #a7a7a7;
        } /* Firefox版本4-18 */
        input[type="text"]::-moz-placeholder {
          font-size: 14px;
          color: #a7a7a7;
        }
      }
    }
    .zc {
      li {
        margin: 8px auto;
        &:nth-child(4) {
          border: 1px solid #9f9f9f;
          border-radius: 5px;
          span {
            width: 90px;
            height: 30px;
            line-height: 30px;
            text-align: center;
            vertical-align: initial;
            background-color: #f5f5f5;
            display: inline-block;
            border-radius: 5px;
            font-size: 12px;
          }
          input[type="text"] {
            width: 71%;
            height: 40px;
            padding: 0 10px;
            margin: 0;
            border: none;
          }
        }
        &:nth-child(5) {
          margin: 5px auto;
        }
        &:nth-child(7) {
          text-align: left;
          font-size: 12px;
          span {
            font-size: 16px;
            margin-right: 5px;
          }
          p {
            vertical-align: sub;
            display: inline-block;
            margin: 0;
          }
        }
        &:nth-child(9) {
          text-align: center;
          font-size: 12px;
        }

        input[type="text"] {
          border: 1px solid #9f9f9f;
          margin: 0 auto;
          color: #9f9f9f;
        }
        input[type="submit"] {
          width: 100%;
          height: 44px;
          margin: 10px auto 10px auto;
          font-size: 18px;
          color: #fff;
          border: none;
          border-radius: 5px;
          background-color: #ea6457;
          box-shadow: 0px 1px 2px rgba(150, 0, 0, 0.34);
        }
      }
    }
  }
}
// @media screen and (max-width: 375px){
//   .container{width:350px}
//   .mask .dl{width:360px}
//   .mask .dl .dllist li{width:300px!important;}
//   .mask .dl .dxdl li{width:300px!important;}
//   .mask .dl .zc li{width:300px!important;}
// }
// @media screen and (max-width: 320px){
//   .container{width:300px}
//   .mask .dl{width:310px}
// 	.mask .dl .zc li:nth-child(4) input[type="text"]{width:67%!important;}
// 	.mask .dl .dxdl li input[type="text"]{width:67%!important;}
// }
</style>

