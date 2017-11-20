import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const store = new Vuex.Store({
  state: {
    user: {},
    flash: {},
    news: {
      page: {
        number: 0,
        size: 2,
        first: true,
        last: false,
        totalPages: 1,
        content: []
      },
      selectedId: null
    },
    posts: {
      categories: null,
      page: {
        number: 0,
        size: 2,
        first: true,
        last: false,
        totalPages: 1,
        content: []
      },
      selectedId: null
    }
  },
  mutations: {
    updateUser (state, user) {
      state.user = user
    },
    updateNews (state, newses) {
      state.news.page = newses
    },
    updatePosts (state, posts) {
      state.posts.page = posts
    },
    refreshNews (state, news) {
      console.log(`${news.id} has just been updated / added. todo notification push`)
    },
    paginateNews (state, page) {
      state.news.page.number = page.number
    },
    paginatePosts (state, page) {
      state.posts.page.number = page.number
    },
    categories (state, categories) {
      state.posts.categories = categories
    },
    triggerFlash (state, flashMessage) {
      state.flash = flashMessage
    }
  }
})

export default store
