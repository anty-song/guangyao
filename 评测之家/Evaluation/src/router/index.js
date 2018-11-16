import Vue from 'vue'
import Router from 'vue-router'
import PChome from '@/pages/PChome'
import PCreport from '@/pages/PCreport'
import PCgenius from '@/pages/PCgenius'
import PCtask from '@/pages/PCtask'

Vue.use(Router)

export default new Router({
  mode: 'history', // remove '#'
  routes: [
    {
      path: '/',
      name: 'PChome',
      component: PChome
    },
    {
      path: '/report',
      name: 'PCreport',
      component: PCreport
    },
    {
      path: '/genius',
      name: 'PCgenius',
      component: PCgenius
    },
    {
      path: '/task',
      name: 'PCtask',
      component: PCtask
    }
  ]
})
