<template>
  <div id="app">
    <!--<router-view></router-view>-->
    <Index></Index>
    <!--<Vu></Vu>-->
  </div>
</template>

<script>
  import Index from '@/views/index.vue'
  import Rule from '@/components/wrong.vue'
  import Vu from '@/views/submitSuccess.vue'

  export default {
    name: 'app',
    components:{
      Index,
      Rule,
      Vu
    }
  }
</script>

<style>
#app{
    margin: 0 auto;
    width: 750px;
    background: #FFFFFF;
    overflow: hidden;
}
</style>
