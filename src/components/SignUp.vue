<template>
  <div class="container">
    <div class="row">
      <h1>{{ msg }}</h1>
    </div>
    <div class="container">
      <form id='formProfil'>
        <div class="form-group row">
          <label class="col-sm-2 col-form-label" for="email">Email</label>
          <input class="form-control" type="email" id="email" name="email" v-model='registration.email'>
        </div>
        <div class="form-group row">
          <label class="col-sm-2 col-form-label" for="username">Username</label>
          <input class="form-control" type="text" id="username" name="username" v-model='registration.username'>
        </div>
        <div class="form-group row">
          <label class="col-sm-2 col-form-label" for="password">Password</label>
          <input class="form-control" type="password" id="password" name="password" v-model='registration.password'>
        </div>
      </form>
      <div class="text-right">
        <button class="btn btn-primary" v-on:click="register">Sign Up</button>
      </div>
    </div>
  </div>
</template>

<script>
  import UserService from '../services/userService'
  export default {
    name: 'SignUp',
    data () {
      return {
        msg: 'Sign Up',
        registration: {}
      }
    },
    methods: {
      register: function () {
        UserService.register(this.registration)
          .then(r => {
            console.log(r.data)
            this.$router.push('/')
          })
      }
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
