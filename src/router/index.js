import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/components/Home'
import SignUp from '@/components/SignUp'
import NewsDetail from '@/components/NewsDetail'
import Profil from '@/components/Profil'
import NotFound from '@/components/NotFound'
import UserService from '../services/userService'
import store from '../store/index'
import WebSocketService from '../services/websocketService'

Vue.use(Router)

let router = new Router({
  mode: 'history', // pour retirer le /#/ au besoin, le mettre en commentaire
  routes: [
    {
      path: '/not-found',
      name: 'NotFound',
      component: NotFound,
      meta: {
        accessRoles: ['USER', 'ADMIN', 'ANONYMOUS'],
        navbar: false
      }
    },
    {
      path: '/',
      name: 'Home',
      component: Home,
      meta: {
        accessRoles: ['USER', 'ADMIN', 'ANONYMOUS'],
        navbar: true
      }
    },
    {
      path: '/news/:id',
      name: 'NewsDetail',
      component: NewsDetail,
      meta: {
        accessRoles: ['USER', 'ADMIN', 'ANONYMOUS'],
        navbar: false
      }
    },
    {
      path: '/signup',
      name: 'Sign up',
      component: SignUp,
      query: {
        activationKey: ''
      },
      meta: {
        accessRoles: ['ANONYMOUS'],
        navbar: false
      }
    },
    {
      path: '/profil',
      name: 'Profil',
      component: Profil,
      meta: {
        accessRoles: ['USER', 'ADMIN'],
        navbar: true
      }
    }
  ]
})
router.afterEach((to, from) => {
  if (from.name !== 'Sign up') { // todo workaround as we hope that it's the only example where the flash message should not be automatically reset
    store.commit('triggerFlash', {})
  }
})

router.beforeEach((to, from, next) => {
  if (!to.matched.length) {
    next('/not-found')
  } else if (UserService.tokenExist()) {
    UserService.loginExistingToken()
      .then(r => {
        store.commit('updateUser', r.data)
        next(UserService.checkAuthorities(store.state.user.authorities, to.meta.accessRoles) ? true : '/')
      })
      .catch(err => {
        UserService.logout()
        store.commit('updateUser', null)
        WebSocketService.disconnect(() => console.log('an error occured, maybe a session timeout?', err))
        next('/')
      })
  } else {
    next(UserService.checkAuthorities(['ANONYMOUS'], to.meta.accessRoles) ? true : '/')
  }
})
export default router
