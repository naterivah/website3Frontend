<template>
  <div class="container">
    <news-feed></news-feed>
    <!--<markdown-view class="lead" v-model="readme"></markdown-view>-->
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
