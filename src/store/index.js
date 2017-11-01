import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const store = new Vuex.Store({
  state: {
    user: {},
    flash: {},
    webSocket: {
      connected: false,
      client: {}
    },
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
      state.webSocket = client
    },
    disconnected (state) {
      state.webSocket = {
        connected: false,
        client: {}
      }
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
