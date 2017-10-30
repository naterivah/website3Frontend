<template>
  <div class="container">
    <div class="row">
      <h1>{{ msg }}</h1>
    </div>
    <div class="container">
      <form id='signupForm' v-if="!activationKey">
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
        <div class="text-right">
          <button class="btn btn-primary" v-on:click="register">Sign Up</button>
        </div>
      </form>
      <form id='activationForm' v-if="activationKey">
        <div class="form-group row">
          <label class="col-sm-2 col-form-label" for="key">Clé d'activation</label>
          <input class="form-control" type="text" id="key" name="key" v-model='activationKey' disabled>
        </div>
        <div class="text-right">
          <button class="btn btn-primary" v-on:click="activateAccount">Activer</button>
        </div>
      </form>

    </div>
  </div>
</template>

<script>
  import UserService from '../services/userService'
  import store from '../store/index'
  export default {
    name: 'SignUp',
    data () {
      return {
        msg: 'Sign Up',
        registration: {}
      }
    },
    computed: {
      activationKey () {
        return this.$router.currentRoute.query.activationKey
      }
    },
    methods: {
      register: function (e) {
        e.preventDefault()
        UserService.register(this.registration)
          .then(r => {
            store.commit('triggerFlash', {
              level: 'success',
              title: 'Succès!',
              message: ' Un email vous a été transmis pour activer votre compte :-)'
            })
            this.$router.push('/')
          })
          .catch(err => {
            store.commit('triggerFlash', {
              level: 'danger',
              title: 'Erreur!',
              message: err.response.data
            })
          })
      },
      activateAccount: function (e) {
        e.preventDefault()
        UserService.activate(this.activationKey)
          .then(r => {
            store.commit('triggerFlash', {
              level: 'success',
              title: 'Succès!',
              message: ' Votre compte est activé! Connectez-vous :-)'
            })
            this.$router.push('/')
          }).catch(err => {
            store.commit('triggerFlash', {
              level: 'danger',
              title: 'Erreur!',
              message: err.response.data
            })
          })
      }
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
