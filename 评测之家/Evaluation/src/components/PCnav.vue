<template>
  <nav class="pcnav">
    <div class="navbar">
      <div class="navbar-left">
        <div class="logo-wrap">
          <router-link to="/">
            <img src="../assets/logo@2x.png" alt="评测工厂logo"/>
          </router-link>
        </div>
        <div class="page-link">
          <div class="nav-item">
            <router-link to="/">首页</router-link>
          </div>
          <div class="nav-item">
            <router-link to="/report">报告库</router-link>
          </div>
          <div class="nav-item">
            <router-link to="/genius">英才仓</router-link>
          </div>
          <div class="nav-item">
            <router-link to="/task">任务园</router-link>
          </div>
        </div>
      </div>
      <div class="navbar-right">
        <div class="search-wrap">
          <img src="../assets/images/search.png" alt=""/>
          <input type="text" placeholder="搜索">
        </div>
        <div class="page-options">
          <img src="../assets/images/iconpng/user.png" alt="" v-if="!isLogged"/>
          <div class="auth-handle" v-if="!isLogged">
            <span class="pc-login" @click="login">登录</span>
            <span class="vertical-line1">|</span>
            <span class="pc-register" @click="register">注册</span>
          </div>
          <div class="user-box" v-if="isLogged">
            <div class="avatar">
              <img src="../assets/images/avatar.jpg" alt="">
            </div>
            <span class="drop-icon"></span>
            <ul class="user-options">
              <li class="user-menu-item">
                <router-link to="/">
                  <img src="../assets/images/iconpng/user_center_icon.png" alt="" height="" />
                  <span>个人中心</span>
                </router-link>
              </li>
              <li class="user-menu-item">
                <router-link to="/">
                  <img src="../assets/images/iconpng/safe_center_icon.png" alt="" />
                  <span>安全中心</span>
                </router-link>
              </li>
              <li class="user-menu-item">
                <router-link to="/">
                  <img src="../assets/images/iconpng/help_center_icon.png" alt="" />
                  <span>帮助中心</span>
                </router-link>
              </li>
              <li class="user-menu-item">
                <router-link to="/">
                  <img src="../assets/images/iconpng/logout_icon.png" alt="" />
                  <span>退出</span>
                </router-link>
              </li>
            </ul>
          </div>
          <span class="vertical-line2" />
          <img src="../assets/images/iconpng/message.png" alt=""/>
          <div class="user-msg">
            <span>消息</span>
            <div class="popup message-popup">
              <div class="tab-bar">
                <div>与我相关</div>
                <div>系统通知</div>
              </div>
              <div class="tab-ctt">
                <div>
                  
                </div>
              </div>
            </div>
          </div>
          <img src="../assets/images/iconpng/upload.png" alt=""/>
          <div class="upload">
            <span>上传</span>
            <ul class="popup upload-popup">
              <li class="upload-item">
                <router-link to="/">
                  <img src="../assets/images/iconpng/upload_item_icon.png" alt=""/>
                  <span>发布报告</span>
                </router-link>
              </li>
              <li class="upload-item">
                <router-link to="/">
                  <img src="../assets/images/iconpng/upload_item_icon.png" alt=""/>
                  <span>发布任务</span>
                </router-link>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  </nav>
</template>

<script>
export default {
  name: '',
  data () {
    return {
      isLogged: false
    }
  },
  methods: {
    login() {
      this.$store.commit('handleAuthModal', true);
      this.$store.state.isRegister = false;
      this.$store.state.isLoginByPhone = true;
    },
    register() {
      this.$store.state.showAccount = true;
      this.$store.state.isLoginByPhone = false;
      this.$store.state.isRegister = true;
    }
  }
}
</script>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
@import '../../static/css/nav.scss'
</style>
