import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const store = new Vuex.Store({
  state: {
    user: {},
    flash: {},
    wsClient: {},
    news: [],
    markdownInitialized: false
  },
  mutations: {
    updateUser (state, user) {
      state.user = user
    },
    updateNews (state, newses) {
      state.news = newses
    },
    initWSClient (state, client) {
      state.wsClient = client
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
