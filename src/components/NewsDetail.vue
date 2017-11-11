<template>
  <div class="container">
    <div class="p-2">
      <div v-if="news" class="card flat">
        <div class="view hm-black-slight">
          <img class="img-fluid" src="http://lorempixel.com/1600/486" alt="">
          <div class="mask flex-center ">
            <h2 class="text-white">{{ news.title }}</h2>
            <div class="mask flex-right p-1 hoverable">
              <button v-on:click="back" type="button" class="close" aria-label="Close">
                <span class="text-white" aria-hidden="true">&times;</span>
              </button>
            </div>
          </div>
        </div>
        <div class="card-body">
          <h5 class="card-text">Auteur: {{ news.author.username }}, le {{news.createdDate }}</h5>
          <markdown-view class="lead" v-model="news.message"></markdown-view>
        </div>
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
      back: function (e) {
        e.preventDefault()
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
