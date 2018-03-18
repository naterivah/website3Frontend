<template>
  <div class="container-fluid">
    <div class="row">
      <div class="col-lg-3">
        <div class="container">
          <div class="card">
            <div class="card-body">
              <h4 class="card-title">Catégories</h4>
              <div class="card-text">
                <el-tree :data="categories" :props="defaultProps" @node-click="clickCategory"></el-tree>
              </div>
            </div>
          </div>
          <br>
          <div class="card ">
            <div class="card-body">
              <h4 class="card-title">Tags</h4>
              <div class=" card-text col-lg-9" v-if="tags">
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
  import store from '../store/index'
  import BlogService from '../services/blogService'
  import { Tree } from 'element-ui'

  export default {
    name: 'BlogHome',
    components: {
      PaginationView,
      MarkdownView,
      RightContainer,
      elTree: Tree
    },
    mounted: function () {
      if (!this.page.content.length) {
        this.initPosts()
      }
      if (!this.categories) {
        this.initCategories()
      }
      if (!this.tags) {
        this.initTags()
      }
    },
    methods: {
      initTags: function () {
        BlogService.tags().then(r => store.commit('tags', r.data))
      },
      clickCategory: function (cat) {
        console.log('clicked on cat ' + cat.name)
      },
      initPosts: function () {
        BlogService.allPosts(store.state.posts.page)
          .then(r => store.commit('updatePosts', r.data))
      },
      initCategories: function () {
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
            store.commit('categories', cats.filter(c => !c.parent))
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
      },
      categories () {
        return store.state.posts.categories
      },
      tags () {
        return store.state.posts.tags
      }
    },
    data () {
      return {
        defaultProps: {
          children: 'children',
          label: 'name'
        }
      }
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
