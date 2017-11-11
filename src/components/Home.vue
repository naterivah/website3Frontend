<template>
  <div class="container-fluid">
    <div class="row">
      <news-feed class="col-md-3"></news-feed>
      <div class="col-md-6">
        <div class="container">
          <div class="col-md-12">About</div>
          <markdown-view class="p-2 col-md-12 card" v-model="readme"></markdown-view>
        </div>
      </div>
      <right-container class="col-md-3"></right-container><!---->
    </div>
  </div>
</template>

<script>
  import MarkdownView from './Markdown'
  import NewsFeed from './News'
  import README from '../assets/README.md'
  import RightContainer from './RightContainer'
  export default {
    name: 'Home',
    components: {
      RightContainer, MarkdownView, NewsFeed
    },
    data () {
      return {
        readme: README
      }
    }
  }
</script>

<style scoped>
</style>
