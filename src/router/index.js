import Vue from 'vue'
import Router from 'vue-router'

import Home from '@/components/Home'
import Currency from '@/components/Currency'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '',
      name: 'home',
      component: Home
    },
    {
      path: '/currency/:id',
      props: true,
      name: 'currency',
      component: Currency
    }
  ],
  mode: 'history'
})
