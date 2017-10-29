import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/components/Home'
import SignUp from '@/components/SignUp'
import Profil from '@/components/Profil'
import UserService from '../services/userService'
import store from '../store/index'

Vue.use(Router)

let router = new Router({
  routes: [
    {
      path: '/',
      name: 'Home',
      component: Home,
      meta: {
        accessRoles: ['USER', 'ADMIN', 'ANONYMOUS']
      }
    },
    {
      path: '/signup',
      name: 'Sign Up',
      component: SignUp,
      query: {
        activationKey: ''
      },
      meta: {
        accessRoles: ['ANONYMOUS']
      }
    },
    {
      path: '/profil',
      name: 'Profil',
      component: Profil,
      meta: {
        accessRoles: ['USER', 'ADMIN']
      }
    }
  ]
})
router.afterEach((to, from) => {
  store.commit('triggerFlash', null)
})

router.beforeEach((to, from, next) => {
  if (UserService.tokenExist()) {
    UserService.loginExistingToken()
      .then(r => {
        store.commit('updateUser', r.data)
        next(UserService.checkAuthorities(store.state.user.authorities, to.meta.accessRoles))
      })
  } else {
    next(UserService.checkAuthorities(['ANONYMOUS'], to.meta.accessRoles))
  }
})
export default router
