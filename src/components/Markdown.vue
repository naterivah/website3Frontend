<template>
  <div v-html="marked"></div>
</template>

<script>
  import * as marked from 'marked'
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
    methods: {
    }
  }
</script>

<style scoped>
  .file-handler > input[type="file"] {
    display: none;
  }
  i{
    vertical-align: middle;
  }
</style>
