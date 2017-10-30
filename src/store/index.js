import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const store = new Vuex.Store({
  state: {
    user: {},
    flash: {},
    markdownInitialized: false
  },
  mutations: {
    updateUser (state, user) {
      state.user = user
    },
    markdownInitialized (state) {
      state.markdownInitialized = true
    },
    triggerFlash (state, flashMessage) {
      state.flash = flashMessage
    }
  }
})

export default store
