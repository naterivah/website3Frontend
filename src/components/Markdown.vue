<template>
  <div v-html="marked"></div>
</template>

<script>
  import * as marked from 'marked'
  import * as hljs from 'highlight.js'
  import store from '../store/index'
  export default {
    props: {
      value: String
    },
    name: 'MarkdownView',
    computed: {
      marked () {
        return marked(this.value)
      }
    },
    created: function () {
      if (store.state.markdownInitialized === false) {
        marked.setOptions({
          langPrefix: 'hljs ',
          highlight: function (code) {
            return hljs.highlightAuto(code).value
          }
        })
        store.commit('markdownInitialized')
      }
    },
    methods: {}
  }
</script>

<style scoped>
  @import "./../../node_modules/highlight.js/styles/monokai.css";
</style>
