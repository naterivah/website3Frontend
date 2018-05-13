<template>
  <div class="p-2">
    <div class="card ">
      <div class="card-body">
        <div class=" card-text" v-if="tags">
          <ul class="list-inline">
            <li v-for="tag in tags.content" class="list-inline-item">
                     <span class="badge indigo ">
                        {{tag.label}}
                    </span>
            </li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import NewsService from '../services/newsService'
  import store from '../store/index'
  export default {
    NewsService,
    name: 'TagView',
    components: {
    },
    data () {
      return {}
    },
    mounted: function () {
      if (!this.tags) {
        this.initTags()
      }
    },
    computed: {
      tags () {
        return store.state.tags
      }
    },
    methods: {
      initTags: function () {
        NewsService.tags().then(r => store.commit('tags', r.data))
      }
    }
  }
</script>

<style scoped>
</style>
