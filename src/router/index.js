import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/components/Home'
import SignUp from '@/components/SignUp'
import Profil from '@/components/Profil'
import UserService from '../services/userService'

Vue.use(Router)
let checkAuthority = function (accessRoles) {
  return (to, from, next) => {
    if (UserService.tokenExist()) {
      UserService.loginExistingToken()
        .then(r => { next(UserService.checkAuthorities(r.data.authorities, accessRoles)) })
    } else {
      next(UserService.checkAuthorities(['ANONYMOUS'], accessRoles))
    }
  }
}
export default new Router({
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
