import Vue from 'vue'
import Vuex from 'vuex'
import UploadService from '../services/uploadService'

Vue.use(Vuex)

const store = new Vuex.Store({
  state: {
    user: {},
    flash: {},
    categories: null,
    tags: null,
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
  },
  mutations: {
    updateUser (state, user) {
      state.user = user
    },
    updateNews (state, newses) {
      state.news.page = newses
      state.news.page.content.forEach(n => { n.pictureView = [UploadService.imageThumb(n.picture)] })
    },
    refreshNews (state, news) {
      console.log(`${news.id} has just been updated / added. todo notification push`)
    },
    paginateNews (state, page) {
      state.news.page.number = page.number
    },
    categories (state, categories) {
      state.categories = categories
    },
    tags (state, tags) {
      state.tags = tags
    },
    triggerFlash (state, flashMessage) {
      state.flash = flashMessage
    }
  }
})

export default store
