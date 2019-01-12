<template>
  <div class="global-components-box">
    <PCnav />
    <Account v-if="showAccount"/>
  </div>
</template>
<script>
import PCnav from './PCnav'
import Account from './Account'
export default {
  name: 'globalcomponents',
  data() {
    return{
    }
  },
  components: {
    PCnav,
    Account
  },
  computed: {
    showAccount() {
      return this.$store.state.showAccount;
    }
  }
}
</script>
<style>

</style>


