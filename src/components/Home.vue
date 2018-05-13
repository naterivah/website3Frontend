<template>
  <div class="container-fluid">
    <div class="row">
      <div class="col-md-3">
        <br>
        <block-quote-view class="col-md-12" />
        <news-feed class="col-md-12"></news-feed>
      </div>
      <div class="col-md-7">
        <div class="container">About</div>
        <article class="p-2 col-md-12 ">
          <markdown-view class="card" v-model="readme"></markdown-view>
        </article>
      </div>
      <div class="col-md-2">
        <br>
        <category-view/>
        <tag-view/>
      </div>
    </div>
  </div>
</template>

<script>
  import MarkdownView from './Markdown'
  import NewsFeed from './news/News'
  import README from '../assets/README.md'
  import RightContainer from './RightContainer'
  import BlockQuoteView from './BlockQuoteView'
  import TagView from './Tag'
  import CategoryView from './Category'
  export default {
    name: 'Home',
    components: {
      TagView,
      BlockQuoteView,
      CategoryView,
      RightContainer,
      MarkdownView,
      NewsFeed
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
