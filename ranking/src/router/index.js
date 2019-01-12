import Vue from 'vue'
import Router from 'vue-router'
import Index from '@/views/index.vue'
import Publish1 from '@/views/publish1.vue'
import Publish2 from '@/views/publish2.vue'
Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'index',
      component: Index
    },
    {
      path:'/publish1',
      name:'publish1',
      component:Publish1
    },
    {
      path:'/publish2',
      name:'publish2',
      component:Publish2
    }
  ]
})
