<template>
  <div class="container">
    <div class="p-2">
      <div v-if="news" class="card flat">
        <picture-view with-gallery="true" classes="img img-fluid" v-if="news && news.pictureView" v-model="news.pictureView"/>
        <div class="view hm-black-slight">
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
  import PictureView from './PictureVue'
  import UploadService from './../services/uploadService'

  export default {
    router,
    name: 'NewsDetail',
    components: {MarkdownView, PictureView},
    mounted: function () {
      NewsService.newsById(this.id)
        .then(r => {
          this.news = r.data
          this.news.pictureView = [UploadService.imageWithoutThumb(this.news.picture)]
        })
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
