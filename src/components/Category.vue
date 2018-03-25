<template>
    <div class="p-2">
      <div class="card">
        <div class="card-body">
          <div class="card-text">
            <el-tree :data="categories" :props="defaultProps" @node-click="clickCategory"></el-tree>
          </div>
        </div>
      </div>
    </div>
</template>

<script>
  import NewsService from '../services/newsService'
  import store from '../store/index'
  import { Tree } from 'element-ui'

  export default {
    NewsService,
    name: 'CategoryView',
    components: {
      elTree: Tree
    },
    data () {
      return {
        defaultProps: {
          children: 'children',
          label: 'name'
        }
      }
    },
    mounted: function () {
      if (!this.categories) {
        this.initCategories()
      }
    },
    computed: {
      categories () {
        return store.state.categories
      }
    },
    methods: {
      clickCategory: function (cat) {
        console.log('clicked on cat ' + cat.name)
      },
      initCategories: function () {
        NewsService.categories()
          .then(r => {
            let cats = r.data
            r.data.filter(c => c.parent).forEach(c => {
              let parent = cats.find(cat => cat.id === c.parent.id)
              if (parent.children === undefined) {
                parent.children = Array.of(c)
              } else {
                parent.children.push(c)
              }
            })
            store.commit('categories', cats.filter(c => !c.parent))
          })
      }
    }
  }
</script>

<style scoped>
</style>
