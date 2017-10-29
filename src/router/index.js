import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/components/Home'
import SignUp from '@/components/SignUp'
import Profil from '@/components/Profil'
import UserService from '../services/userService'
import store from '../store/index'

Vue.use(Router)

let checkAuthority = function (accessRoles) {
  return (to, from, next) => {
    if (UserService.tokenExist()) {
      UserService.loginExistingToken()
        .then(r => {
          store.commit('updateUser', r.data)
          next(UserService.checkAuthorities(store.state.user.authorities, accessRoles))
        })
    } else {
      next(UserService.checkAuthorities(['ANONYMOUS'], accessRoles))
    }
  }
}
let router = new Router({
  routes: [
    {
      path: '/',
      name: 'Home',
      component: Home,
      accessRoles: ['USER', 'ADMIN', 'ANONYMOUS'],
      beforeEnter: checkAuthority(['USER', 'ADMIN', 'ANONYMOUS'])
    },
    {
      path: '/signup',
      name: 'Sign Up',
      component: SignUp,
      accessRoles: ['ANONYMOUS'],
      beforeEnter: checkAuthority(['ANONYMOUS'])
    },
    {
      path: '/profil',
      name: 'Profil',
      component: Profil,
      accessRoles: ['USER', 'ADMIN'],
      beforeEnter: checkAuthority(['USER', 'ADMIN'])
    }
  ]
})
router.afterEach((to, from) => {
  store.commit('triggerFlash', null)
})

export default router
