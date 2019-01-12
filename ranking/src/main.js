// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import Cube from 'cube-ui'
import App from './App'
import router from './router'
import Axios from "axios"
import './assets/css/style.css'
import './assets/css/animate.min.css'
import './assets/js/jquery-1.11.3.min'
import  qs from "qs"

Vue.prototype.$axios= Axios


// 全局的 axios 默认值
Axios.defaults.baseURL = 'http://www.yunvote.com';
Axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';

// 添加请求拦截器
Axios.interceptors.request.use(function (config) {

  // 在发送请求之前做些什么
  if(config.method=="post"){
      config.data=qs.stringify(config.data)
  }

  return config;
}, function (error) {
  // 对请求错误做些什么
  return Promise.reject(error);
});

// 添加响应拦截器
Axios.interceptors.response.use(function (response) {
  // 对响应数据做点什么
  return response;
}, function (error) {
  // 对响应错误做点什么
  return Promise.reject(error);
});





Vue.use(Cube)

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  template: '<App/>',
  components: { App },
})
