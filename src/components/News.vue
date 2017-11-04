<template>
  <div>
    <div>
      <p v-if="!page || !page.content.length"> Aucune news trouvée</p>
      <div v-for="n in page.content" class="p-2">
        <div class="">
          <div class="card">
            <div class="card-header bg-light">
              <em>{{ n.title }}, par {{ n.author.username}}</em>
            </div>
            <div class="card-body">
              <small>{{ n.shortMessage }}</small>
              <router-link class="btn btn-sm btn-success" :to="{ name: 'NewsDetail', params: { id: n.id }}">More
              </router-link>
            </div>
          </div>
        </div>
      </div>
        <pagination-view v-model="page" @paginate="paginate"></pagination-view>
    </div>
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
