<template>
  <div v-if="flash && flash.level" :class="flashClasses" role="alert">
    <strong>{{flash.title}}</strong> {{flash.message}}
    <button type="button" class="close" data-dismiss="alert" aria-label="Close">
      <span aria-hidden="true">&times;</span>
    </button>
  </div>
</template>

<script>
  import store from '../store/index'
  export default {
    name: 'FlashMessage',
    data () {
      return {}
    },
    computed: {
      flash () {
        return store.state.flash
      },
      flashClasses () {
        return 'alert alert-' + this.flash.level + ' alert-dismissible fade show'
      }
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
