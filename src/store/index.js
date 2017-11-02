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
    news: {
      page: {
        number: 0,
        size: 3,
        first: true,
        last: false,
        totalPages: 1,
        content: []
      },
      selectedId: null
    },
    markdownInitialized: false
  },
  mutations: {
    updateUser (state, user) {
      state.user = user
    },
    updateNews (state, newses) {
      state.news.page = newses
    },
    refreshNews (state, news) {
      console.log(`${news.id} has just been updated / added. todo notification push`)
    },
    paginateNews (state, page) {
      state.news.page.number = page.number
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
