<template>
  <div id="pingce">
    <GlobalComponents />
    <router-view/>
    <PCfooter />
  </div>
</template>

<script>
import GlobalComponents from './components/GlobalComponents'
import PCfooter from './components/PCfooter'
export default {
  name: 'App',
  components: {
    GlobalComponents,
    PCfooter
  }
}
</script>

<style lang="scss">
#pingce {
  padding-top: 80px;
  background: #f9f9f9;
}
</style>
