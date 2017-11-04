<template>
  <div v-html="marked"></div>
</template>

<script>
  import MarkdownService from '../services/markdownService'

  export default {
    MarkdownService,
    props: {
      value: String
    },
    name: 'MarkdownView',
    computed: {
      marked () {
        return this.$marked(this.value)
      }
    },
    methods: {}
  }
</script>

<style scoped>
  @import "./../../node_modules/highlight.js/styles/monokai.css";
</style>
