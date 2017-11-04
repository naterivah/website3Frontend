<template>
  <div class="container">
    <div class="row">
      <markdown-view class="p-2 col-lg-9" v-model="readme"></markdown-view>
      <news-feed class="p-2 col-lg-3"></news-feed>
    </div>
  </div>
</template>

<script>
  import MarkdownView from './Markdown'
  import NewsFeed from './News'
  import README from '../assets/README.md'
  export default {
    name: 'Home',
    components: {
      MarkdownView, NewsFeed
    },
    data () {
      return {
        readme: README
      }
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
