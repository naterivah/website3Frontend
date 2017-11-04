<template>
  <div class="row p-2">
    <news-feed class="col-3"></news-feed>
    <div class="col-9">
      <div v-if="news" class="card">
        <div class="card-header bg-light">
          <div class="row">
            <div class="col-11">
              {{ news.title }}
              <small>Auteur: {{ news.author.username }}, le {{news.createdDate }}</small>
            </div>
            <div class="col-1">
              <button v-on:click="back" type="button" class="close" aria-label="Close">
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
          </div>
        </div>
        <div class="card-body">
          <markdown-view class="lead" v-model="news.message"></markdown-view>
        </div>
      </div>
    </div>
  </div>

</template>
<script>
  import NewsService from './../services/newsService'
  import MarkdownView from './Markdown'
  import NewsFeed from './News'
  import router from '../router/index'

  export default {
    router,
    name: 'NewsDetail',
    components: {MarkdownView, NewsFeed},
    mounted: function () {
      NewsService.newsById(this.id)
        .then(r => { this.news = r.data })
    },
    methods: {
      back: function () {
        return this.$router.push('/')
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
