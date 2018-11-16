<template>
  <div class="pc-nav">
    <nav class="navbar">
      <div class="container">
        <div class="navbar-header">
          <router-link class="navbar-brand" to="/">
            <img src="../assets/logo@2x.png" alt="" class="img-responsive">
          </router-link>
          <div class="search-wrap hidden-sm hidden-md hidden-lg">
            <div class="search-ctt">
              <img src="../assets/images/search.png" alt="" class="img-responsive">
              <input type="text" placeholder="搜索">
            </div>
          </div>
          <button type="button" class="navbar-toggle collapsed" data-toggle="collapse" data-target="#navbar" aria-expanded="false" aria-controls="navbar">
            <span class="sr-only">Toggle navigation</span>
            <span class="icon-bar"></span>
            <span class="icon-bar"></span>
            <span class="icon-bar"></span>
          </button>
        </div>
        <div id="navbar" class="collapse navbar-collapse">
          <ul class="nav navbar-nav">
            <li>
              <router-link to="/">首页</router-link>
            </li>
            <li>
              <router-link to="/report">报告库</router-link>
            </li>
            <li>
              <router-link to="/genius">英才仓</router-link>
            </li>
            <li>
              <router-link to="/task">任务园</router-link>
            </li>
          </ul>
          <ul class="nav navbar-nav navbar-right user-options">
            <li class="have-margin" @click="login">登录</li>
            <li>注册</li>
            <li class="have-margin">消息</li>
            <li class="have-margin">上传</li>
          </ul>
          <div class="search-wrap hidden-xs">
            <div class="search-ctt">
              <img src="../assets/images/search.png" alt="" class="img-responsive">
              <input type="text" placeholder="搜索">
            </div>
          </div>
        </div>
      </div>
    </nav>
  </div>
</template>

<script>
export default {
  name: '',
  data () {
    return {
      
    }
  },
  methods: {
    login() {
      alert()
    }
  }
}
</script>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
@import '../../static/css/pcnav.scss'
</style>
