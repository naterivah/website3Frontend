<template>
  <section>
    <header class="text-center text-capitalize">
      News
    </header>
    <p v-if="!page || !page.content.length"> Aucune news trouvée</p>
    <div class="row">
      <div v-for="(n,index) in page.content" :class="(index == 0 && (page.size == 1 || page.size >= 3) ? 'col-md-12' : 'col-md-6') + ' p-2'">
        <div class="card">
          <div class="view  hm-black-slight">
            <picture-view classes="img-fluid" v-if="n.pictureView" v-model="n.pictureView"/>
          </div>
          <div class="card-body">
            <h5 class="card-title">Auteur: {{ n.author.username}}</h5>
            <small>{{ n.shortMessage }}</small>
            <router-link class="text-center btn-outline-dark text-grey btn-sm"
                         :to="{ name: 'NewsDetail', params: { id: n.id, slug: n.slug }}">
              ...
            </router-link>
          </div>
        </div>
      </div>
    </div>
    <pagination-view v-model="page" @paginate="paginate"></pagination-view>
  </section>

</template>

<script>
  import NewsService from './../../services/newsService'
  import PaginationView from './../Pagination'
  import store from './../../store/index'
  import MarkdownView from './../Markdown'
  import PictureView from './../PictureVue'

  export default {
    name: 'NewsFeed',
    components: {PaginationView, MarkdownView, PictureView},
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
