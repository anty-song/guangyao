// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import store from './store'
import Axios from 'axios'
import App from './App'
import router from './router'

// 实例挂载 Axios
Vue.prototype.$axios = Axios
// 可解决本地跨域
// Vue.prototype.HOST = '/api'
Axios.defaults.baseURL = "http://110.249.185.45:8803/pcgc";
Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#pingce',
  router,
  store,
  components: { App },
  template: '<App/>'
})
