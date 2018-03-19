<template>
  <section>
    <blockquote v-if="blockquote" class="text-right">
      <p class="mb-1">{{blockquote.quote}}</p>
      <footer class="blockquote-footer">{{blockquote.author}} <cite title="Source Title">{{blockquote.source}}</cite>
      </footer>
    </blockquote>
  </section>
</template>
<script>
  import QuoteService from '../services/QuoteService'
  export default {
    data () {
      return {
        blockquote: null
      }
    },
    name: 'BlockQuoteView',
    mounted: function () {
      QuoteService.random().then(r => {
        this.blockquote = r.data
      })
    },
    methods: {}
  }
</script>

<style scoped>
</style>
