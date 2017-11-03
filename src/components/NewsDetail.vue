<template>
  <div class="container">
    <div v-if="news" class="card">
      <div class="card-header bg-dark text-white">
        <div class="row">
          <div class="col-11">
            {{ news.title }}
            <small>Auteur: {{ news.author.username }}, le {{news.createdDate }}</small>
          </div>
          <div class="col-1">
            <button v-on:click="back" type="button" class="close" aria-label="Close">
              <span class="text-white" aria-hidden="true">&times;</span>
            </button>
          </div>
        </div>
      </div>
      <div class="card-body">
        <markdown-view class="lead" v-model="news.message"></markdown-view>
      </div>
    </div>
  </div>
</template>
<script>
  import NewsService from './../services/newsService'
  import MarkdownView from './Markdown'
  import router from '../router/index'

  export default {
    router,
    name: 'NewsDetail',
    components: {MarkdownView},
    mounted: function () {
      NewsService.newsById(this.id)
        .then(r => { this.news = r.data })
    },
    methods: {
      back: function () {
        return this.$router.go(-1)
      }
    },
    computed: {
      id: function () {
        return this.$route.params.id
      }
    },
    data () {
      return {
        news: null
      }
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>


</style>
