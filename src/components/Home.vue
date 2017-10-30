<template>
  <div class="jumbotron">
    <markdown-view class="lead" v-model="readme"></markdown-view>
  </div>
</template>

<script>
  import MarkdownView from './Markdown'
  import README from '../assets/README.md'
  export default {
    name: 'Home',
    components: {
      MarkdownView
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
