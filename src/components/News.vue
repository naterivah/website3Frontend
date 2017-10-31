<template>
  <div class="row">
    <p v-if="!values || !values.length">Aucune news trouvée</p>
    <div v-for="n in values" class="margin-bottom col-sm-12 ">
      <div class="card ">
        <div class="card-header bg-dark text-white">
          <a href="#" class="badge badge-secondary">#{{ n.id }} </a>
          {{ n.title }} - {{ n.createdDate }} - Auteur : {{ n.author.username }}
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
    created: function () {
      this.initNewses()
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
  .margin-bottom {
    margin-bottom: 20px;
  }


</style>
