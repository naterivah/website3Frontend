<template>
    <div>
      <div class="container">
        News
      </div>
      <p v-if="!page || !page.content.length"> Aucune news trouvée</p>
      <div v-for="n in page.content" class="p-2">
          <div class="card">
            <div class="view  hm-black-slight">
              <img class="img-fluid" :src="'http://lorempixel.com/1600/800?random=' + n.id" alt="">
                <div class="mask flex-right p-1 ">
                  <router-link  class="mask flex-center " :to="{ name: 'NewsDetail', params: { id: n.id }}" >
                    <h5 class="text-white">{{ n.title }}</h5>
                  </router-link>
                </div>
            </div>

            <div class="card-body">
              <h5 class="card-title">Auteur: {{ n.author.username}}</h5>
              <small>{{ n.shortMessage }}</small>
              <router-link class="text-center btn-outline-dark text-grey btn-sm" :to="{ name: 'NewsDetail', params: { id: n.id }}" >
                ...</router-link>
            </div>
          </div>
      </div>
        <pagination-view v-model="page" @paginate="paginate"></pagination-view>
    </div>

</template>

<script>
  import NewsService from './../services/newsService'
  import PaginationView from './Pagination'
  import store from './../store/index'
  import MarkdownView from './Markdown'

  export default {
    name: 'NewsFeed',
    components: {PaginationView, MarkdownView},
    mounted: function () {
      if (!this.page.content.length) {
        this.initNewses()
      }
    },
    methods: {
      initNewses: function () {
        NewsService.allNews(store.state.news.page)
          .then(r => store.commit('updateNews', r.data))
      },
      paginate: function (index) {
        store.commit('paginateNews', {number: index})
        this.initNewses()
      }
    },
    computed: {
      page () {
        return store.state.news.page
      }
    },
    data () {
      return {}
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
