<template>
  <div class="hello">
    <h1>{{ msg }}</h1>
  </div>
</template>

<script>
  import UserService from '../services/userService'
  let checkAuthorization = function () {
    if (!UserService.tokenExist()) {
      this.$router.push('/')
    }
  }
  export default {
    name: 'Profil',
    created: checkAuthorization,
    data () {
      return {
        msg: 'wesh profil'
      }
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
