import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const store = new Vuex.Store({
  state: {
    user: {},
    flash: {}
  },
  mutations: {
    updateUser (state, user) {
      state.user = user
    },
    triggerFlash (state, flashMessage) {
      state.flash = flashMessage
    }
  }
})

export default store
