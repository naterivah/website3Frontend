<template>
  <div class="container-fluid">
    <div class="row">
      <div class="col-lg-9">
        <div class="row">
          <div class="col-lg-12 p-2" v-for="n in 10">
            <div class="card">
              <div class="view  hm-black-slight">
                <img class="img-fluid" :src="'http://lorempixel.com/1600/486?random=' + n" alt="">
                <div class="mask flex-right p-1 ">
                  <a class="mask flex-center " href="#" >
                    <h5 class="text-white">title</h5>
                  </a>
                </div>
              </div>
              <div class="card-body">
                <h5 class="card-title">Auteur</h5>
                <small>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Consequuntur deleniti error eum, excepturi molestias natus praesentium quisquam quos similique tempore! At consequatur, consequuntur esse fugiat ipsa nobis officia repellendus voluptatum?</small>
                <a class="text-center btn-outline-dark text-grey btn-sm" href="#" >
                  ...</a>
              </div>
            </div>
          </div>
        </div>
      </div>
      <right-container class="col-lg-3"></right-container>

    </div>

  </div>

</template>

<script>
  import RightContainer from './RightContainer'
  export default {
    name: 'NewsFeed',
    components: { RightContainer },
    methods: {},
    computed: {},
    data () {
      return {}
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
