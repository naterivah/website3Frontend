<template>
  <div class="row">
    <div  v-if="!selectedNews"  class="paged-news container">
      <div class="row">
        <p v-if="!page || !page.content.length"> Aucune news trouvée</p>
        <div v-for="n in page.content" class="col-sm p-2">
          <div class="card">
            <div class="card-header bg-dark text-white">
          <span>
          <small class="badge">#{{ n.id }} {{ n.title }} - {{ n.createdDate }} - Auteur : {{ n.author.username}}</small>
          </span>
            </div>
            <div class="card-body">
              {{ n.shortMessage }}
              <button v-on:click="newsDetail(n)" class="btn btn-sm btn-success">More</button>
            </div>
          </div>
        </div>
      </div>
      <pagination-view v-model="page" @paginate="paginate"></pagination-view>
    </div>
    <div class="container" v-if="selectedNews">
        <h1>{{ selectedNews.title }}</h1>
        <small>Auteur: {{ selectedNews.author.username }}, le {{selectedNews.createdDate }}</small>
        <p>
          {{ selectedNews.message }}
        </p>
        <button v-on:click="newsDetail(null)" class="btn btn-danger">Fermer</button>
    </div>

  </div>

</template>

<script>
  import NewsService from './../services/newsService'
  import PaginationView from './Pagination'
  import store from './../store/index'

  export default {
    name: 'NewsFeed',
    components: {PaginationView},
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
      },
      newsDetail: function (n) {
        this.selectedNews = n
      }
    },
    computed: {
      page () {
        return store.state.news.page
      }
    },
    data () {
      return {
        selectedNews: null
      }
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>


</style>
