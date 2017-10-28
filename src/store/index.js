import Vue from 'vue'
import Vuex from 'vuex'
import UserService from '../services/userService'

Vue.use(Vuex)

const store = new Vuex.Store({
  state: {
    user: {}
  },
  mutations: {
    currentUser (state) {
      if (UserService.tokenExist()) {
        UserService.loginExistingToken()
          .then(r => {
            state.user = r.data
          })
      }
    }
  }
})

export default store
