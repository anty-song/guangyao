<template>
  <div id="pingce">
    <GlobalComponents />
    <router-view/>
  </div>
</template>

<script>
import GlobalComponents from './components/GlobalComponents'
export default {
  name: 'App',
  components: {GlobalComponents}
}
</script>

<style lang="scss">
// @import './assets/fonts/iconfont.css';
@import '../static/css/pcnav.scss';
#pingce {
  padding-top: 50px;
  @media (min-width:768px) {
    padding-top: 80px;
  }
}
</style>
