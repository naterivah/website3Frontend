<template>
  <div class="row">
    <p v-if="!values || !values.length"> Aucune news trouvée</p>
    <div v-for="n in values" class="col-sm p-2">
      <div class="card">
        <div class="card-header bg-dark text-white">
          <span>
          <small class="badge">#{{ n.id }} {{ n.title }} - {{ n.createdDate }} - Auteur : {{ n.author.username }}</small>
          </span>

        </div>
        <div class="card-body">
          {{ n.message }}
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import NewsService from './../services/newsService'
  import store from './../store/index'

  export default {
    name: 'NewsFeed',
    components: {},
    mounted: function () {
      if (!this.values.length) {
        this.initNewses()
      }
    },
    methods: {
      initNewses: function () {
        NewsService.allNews()
          .then(r => store.commit('updateNews', r.data))
      }
    },
    computed: {
      values () {
        return store.state.news
      }
    },
    data () {
      return {
      }
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>


</style>
