<template>
  <div class="auth-modal-box">
    <div class="auth-form">
      <div class="close" @click="closeAuthModal">
        <img src="../assets/images/iconpng/close.png" alt="">
      </div>
      <div class="brand">
        <img src="../assets/images/iconpng/logo_brand.png" alt="">
      </div>
      <div class="tag">{{tag}}</div>
      <!-- 短信验证码登录 -->
      <div class="input-group" v-if="isLoginByPhone">
        <div class="input-box">
          <input type="text" placeholder="手机号" maxlength="" class="input" name="loginPhoneNumber" v-model="loginPhoneNumber">
        </div>
        <div class="input-box">
          <input type="text" placeholder="请输入短信验证码" maxlength="" class="input" name="loginVcode" v-model="loginVcode">
          <button class="send-vcode-btn" @click="getLoginVcode">获取验证码</button>
        </div>
        <button class="btn" @click="handleLoginByPhone">立即登录</button>
      </div>
      <!-- 账号登录 -->
      <div class="input-group" v-if="isLoginByAccount">
        <div class="input-box">
          <input type="text" placeholder="请输入手机号/邮箱" maxlength="" class="input" name="loginAccount" v-model="loginAccount">
        </div>
        <div class="input-box">
          <input type="password" placeholder="请输入密码" maxlength="" class="input" name="loginPassword" v-model="loginPassword">
        </div>
        <router-link class="forget-pwd" to="/" @click.native="closeAuthModal">忘记密码？</router-link>
        <button style="margin-top: 25px" class="btn" @click="handleLoginByAccount">立即登录</button>
      </div>
      <!-- 注册 -->
      <div class="input-group" v-if="isRegister">
        <div class="input-box">
          <input type="text" placeholder="请输入手机号/邮箱" maxlength="" class="input" name="registerAccount" v-model="registerAccount">
        </div>
        <div class="input-box">
          <input type="text" placeholder="请输入验证码" maxlength="" class="input" name="registerVcode" v-model="registerVcode">
          <button class="send-vcode-btn" @click="getRegisterVcode">获取验证码</button>
        </div>
        <div class="input-box">
          <input type="password" placeholder="密码由6-20位字母、数字和符号组合" maxlength="" class="input" name="registerPassword" v-model="registerPassword">
        </div>
        <div class="input-box">
          <input type="password" placeholder="请再次输入上面的密码" maxlength="" class="input" name="registerRepeatPassword" v-model="registerRepeatPassword">
        </div>
        <div class="agree-box">
          <input type="checkbox" v-model="isAgree" /><span>同意 《用户协议》、《隐私政策》</span>
        </div>
        <button style="margin-top: 25px" class="btn" @click="handleRegister">立即注册</button>
      </div>
      <div class="bottom-links">
        <i v-if="isRegister">已经拥有账户？ </i>
        <span @click="goLogin">{{toLogin}}</span>
        <span v-if="!isRegister" @click="goRegister">| {{toRegister}}</span>
      </div>
    </div>
  </div>
</template>
<script>
// MD5 加密
import md5 from 'js-md5';
export default {
  name: "account",
  data() {
    return {
      toLogin: '账号登录',          // 底部跳转
      toRegister: '立即注册',       // 底部跳转
      tag: '欢迎登录评测工场',       // 弹层标题
      isLoginByPhone: this.$store.state.isLoginByPhone,        // 手机号登录部分
      loginPhoneNumber: '',        // 手机号
      loginVcode: '123456',        // 短信验证码
      isLoginByAccount: this.$store.state.isLoginByAccount,     // 账号登录部分
      loginAccount: '',            // 账号
      loginPassword: '',           // 密码
      isRegister: this.$store.state.isRegister,           // 注册部分
      registerAccount: '',         // 注册使用的邮箱或手机号
      registerVcode: '123456',     // 注册手机验证码
      registerPassword: '',        // 注册密码
      registerRepeatPassword: '',  // 重复密码
      isAgree: false               // 是否同意 用户协议 隐私政策
    };
  },
  computed: {
  },
  methods: {
    // 关闭遮罩层
    closeAuthModal() {
      this.$store.commit('handleAuthModal', false);
    },
    // 切换登录方式 或 从注册前往登录
    goLogin() {
      console.log(this.$store.state)
      // 改变显示状态
      if (this.isRegister) {
        this.isLoginByPhone = true;
        this.isRegister = false;
        this.toLogin = '账号登录';
        this.isLoginByAccount = false;
        this.tag = '欢迎登录评测工场';
      } else {
        this.isLoginByPhone = !this.isLoginByPhone;
        this.isLoginByAccount = !this.isLoginByAccount;
        this.toLogin = this.toLogin === '账号登录' ? '短息登录' : '账号登录';
      }
    },
    // 前往注册
    goRegister() {
      this.isRegister = true;
      this.isLoginByPhone = false;
      this.isLoginByAccount = false;
      this.toLogin = '立即登录';
      this.tag = '免费注册评测工场';
    },
    // 获取登录验证码
    getLoginVcode() {
      this.$axios.post('/login_code', {
        username: this.loginPhoneNumber
      })
      .then((res) => {
        console.log(res);
      })
      .catch((err) => {
        throw new Error(err)
      })
    },
    // 获取注册验证码
    getRegisterVcode() {
      this.$axios.post('regist_code', {
        username: this.registerAccount
      })
      .then((res) => {
        console.log(res)
      })
      .catch((err) => {
        throw new Error(err)
      })
    },
    // 短信登录处理函数
    handleLoginByPhone() {
      this.$axios.post('phone_login', {
        username: this.loginPhoneNumber,
        id_code: this.loginVcode,
      })
      .then((res) => {
        console.log(res)
      })
      .catch((err) => {
        throw new Error(err)
      })
    },
    // 账号登录处理函数
    handleLoginByAccount() {
      this.$axios.post('login', {
        username: this.loginAccount,
        password: this.loginPassword,
      })
      .then((res) => {
        console.log(res)
      })
      .catch((err) => {
        throw new Error(err)
      })
    },
    // 注册处理函数
    handleRegister() {
      if (this.isAgree) {
        this.$axios.post('regist', {
          username: this.registerAccount,
          id_code: this.registerVcode,
          password: this.registerPassword,
          repassword: this.registerRepeatPassword,
        })
        .then((res) => {
          console.log(res)
        })
        .catch((err) => {
          throw new Error(err)
        })
      } else {
        alert('请同意政策')
      }
    },
  }
};
</script>
<style lang="scss" scoped>
@import '../../static/css/account.scss'
</style>

