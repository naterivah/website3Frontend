<template>
  <div class="container-fluid">
    <div class="row">
      <div class="col-lg-3">
        <div class="card card-body">
          <h4 class="card-title">Catégories</h4>
          <div class="nav flex-column card-text dropdown" v-for="category in categories">
            <tree-menu
              :label="category.name"
              :nodes="category.children"
              :depth="0"
              v-if="!category.parent"
              :key="category.id">
            </tree-menu>
          </div>
        </div>
      </div>

      <div class="col-lg-9">
        <div class="row">
          <p v-if="!page || !page.content.length"> Aucun article trouvé</p>
          <div class="col-lg-12 p-2" v-for="n in page.content">
            <div class="card">
              <div class="view  hm-black-slight">
                <img class="img-fluid" :src="'http://lorempixel.com/1600/486?random=' + n" alt="">
                <div class="mask flex-right p-1 ">
                  <a class="mask flex-center " href="#">
                    <h5 class="text-white">title</h5>
                  </a>
                </div>
              </div>
              <div class="card-body">
                <h5 class="card-title">Auteur</h5>
                <small>
                  Lorem ipsum dolor sit amet, consectetur adipisicing elit. Consequuntur deleniti error eum, excepturi molestias natus praesentium quisquam quos similique tempore! At consequatur, consequuntur esse fugiat ipsa nobis officia repellendus voluptatum?
                </small>
                <a class="text-center btn-outline-dark text-grey btn-sm" href="#">
                  ...</a>
              </div>
            </div>
          </div>
          <pagination-view v-model="page" @paginate="paginate"></pagination-view>
        </div>
      </div>
    </div>


  </div>

</template>

<script>
  import RightContainer from './RightContainer'
  import PaginationView from './Pagination'
  import MarkdownView from './Markdown'
  import TreeMenu from './TreeMenu'
  import store from '../store/index'
  import BlogService from '../services/blogService'

  export default {
    name: 'BlogHome',
    components: {
      PaginationView,
      MarkdownView,
      RightContainer,
      treeMenu: TreeMenu
    },
    mounted: function () {
      if (!this.page.content.length) {
        this.initPosts()
      }
    },
    methods: {
      initPosts: function () {
        BlogService.allPosts(store.state.posts.page)
          .then(r => store.commit('updatePosts', r.data))

        BlogService.categories()
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
            this.categories = cats
          })
      },
      paginate: function (index) {
        store.commit('paginatePosts', {number: index})
        this.initPosts()
      }
    },
    computed: {
      page () {
        return store.state.posts.page
      }
    },
    data () {
      return {
        categories: []
      }
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
