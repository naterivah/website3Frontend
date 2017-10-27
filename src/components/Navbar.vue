<template>
  <nav class="navbar navbar-expand-lg navbar-light bg-light">
    <a class="navbar-brand" href="#">HealthStats</a>
    <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
      <span class="navbar-toggler-icon"></span>
    </button>

    <div class="collapse navbar-collapse" id="navbarSupportedContent">
      <ul class="navbar-nav mr-auto">
        <li class="nav-item" v-for="m in menu" v-if="m.public || loggedIn">
          <router-link class="nav-link" :to="m.path">{{m.name}}</router-link>
        </li>
      </ul>
      <form v-if="!loggedIn" class="form-inline my-2 my-lg-0">
        <input v-model="username" class="form-control mr-sm-2" type="text" placeholder="Username" aria-label="Username">
        <input v-model="password" class="form-control mr-sm-2" type="password" placeholder="Password"
               aria-label="Password">
        <button v-on:click="login" class="btn btn-outline-success my-2 my-sm-0" type="submit">login</button>
      </form>
      <small v-if="loggedIn">Bienvenue {{user.username}}</small>&nbsp;
      <button v-on:click="logout" v-if='loggedIn' class="btn btn-outline-danger my-2 my-sm-0" type="submit">logout
      </button>
    </div>
  </nav>
</template>

<script>
  import UserService from '../services/userService'
  export default {
    name: 'NavBar',
    data () {
      return {
        user: {},
        username: '',
        password: '',
        loggedIn: false,
        menu: this.$router.options.routes
      }
    },
    created: function () {
      if (UserService.tokenExist()) {
        UserService.loginExistingToken()
          .then(this.onFulfilled)
          .catch(this.onRejected)
      }
    },
    methods: {
      onFulfilled: function (r) {
        this.user = r.data
        this.loggedIn = UserService.tokenExist()
        this.$router.push('profil')
      },
      onRejected: function (err) {
        console.log(err)
        this.loggedIn = UserService.tokenExist()
        this.$router.push('/')
      },
      login: function (event) {
        UserService.login(this.username, this.password)
          .then(this.onFulfilled)
          .catch(this.onRejected)
      },
      logout: function (ev) {
        UserService.logout()
        this.loggedIn = UserService.tokenExist()
        this.$router.push('/')
      }
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
