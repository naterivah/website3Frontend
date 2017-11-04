<template>
  <div class="container-fluid">
    <div class="row">
      <div class="col-lg-2">
        <div class="nav flex-column nav-pills " id="v-pills-tab" role="tablist" aria-orientation="vertical">
          <a class="nav-link flat bg-grey text-white">Home</a>
          <a class="nav-link flat">Profile</a>
          <a class="nav-link flat">Messages</a>
          <a class="nav-link flat">Settings</a>
        </div>
      </div>
      <markdown-view class="p-2 col-lg-8" v-model="readme"></markdown-view>
      <news-feed class="p-2 col-lg-2"></news-feed>
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
.flat{
  border-radius: 0;
}
</style>
