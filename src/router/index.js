import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/components/Home'
import Profil from '@/components/Profil'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Home',
      component: Home,
      public: true
    },
    {
      path: '/profil',
      name: 'Profil',
      component: Profil,
      public: false
    }
  ]
})
