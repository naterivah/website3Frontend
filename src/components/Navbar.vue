<template>
  <nav class="navbar navbar-expand-lg navbar-light">
    <a class="navbar-brand" href="#">
      <img src="../assets/img/logo.png" width="80" height="80" alt="">
    </a>
  <button @click="toggle" class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
      <span class="navbar-toggler-icon"></span>
    </button>
    <div class="collapse navbar-collapse" id="navbarSupportedContent">
      <ul class="navbar-nav">
        <li class="nav-item" v-for="m in menu" v-if="m.meta.navbar && checkAuthorityForRoute(m)">
          <router-link class="nav-link" :to="m.path" >{{m.name}}</router-link>
        </li>
      </ul>


        <form v-if="!loggedIn" class="form-inline my-2 my-lg-0">
          <input v-model="username" class="form-control mr-sm-2" type="text" placeholder="Username" aria-label="Username">
          <input v-model="password" class="form-control mr-sm-2" type="password" placeholder="Password"
                 aria-label="Password">
          <button v-on:click="login" class="btn btn-outline-success my-2 my-sm-0" type="submit">Sign In</button>
        </form>
        <small class="ml-auto" v-if="loggedIn">Bienvenue {{user.username}}</small>&nbsp;
        <button v-on:click="logout" v-if='loggedIn' class="btn btn-outline-black my-2 my-sm-0" type="submit">logout
        </button>


    </div>
  </nav>
</template>

<script>
  import UserService from '../services/userService'
  import store from '../store/index'
  import WebSocketService from '../services/websocketService'
  export default {
    WebSocketService,
    name: 'NavBar',
    data () {
      return {
        username: '',
        password: ''
      }
    },
    computed: {
      user () {
        return store.state.user
      },
      menu () {
        return this.$router.options.routes
      },
      loggedIn () {
        return store.state.user && UserService.tokenExist()
      }
    },
    methods: {
      checkAuthorityForRoute: function (route) {
        if (UserService.tokenExist()) {
          let authorities = this.user.authorities ? store.state.user.authorities : []
          return UserService.checkAuthorities(authorities, route.meta.accessRoles)
        } else {
          return UserService.checkAuthorities(['ANONYMOUS'], route.meta.accessRoles)
        }
      },
      onFulfilled: function (r) {
        store.commit('updateUser', r.data)
        store.commit('triggerFlash', {
          level: 'success',
          title: 'Bienvenue ' + this.user.username + '.',
          message: 'C\'est encore en cours de dev!!!'
        })
        this.$reconnectToWebSocketAndSubscribe()
        this.$router.push('/')
      },
      login: function (event) {
        event.preventDefault()
        UserService.login(this.username, this.password)
          .then(this.onFulfilled)
          .catch(err => {
            console.log(err)
            store.commit('triggerFlash', {
              level: 'danger',
              title: 'Erreur!',
              message: 'Identifiants incorrects!'
            })
          })
      },
      logout: function (ev) {
        UserService.logout()
        store.commit('updateUser', null)
        store.commit('triggerFlash', {})
        this.$reconnectToWebSocketAndSubscribe()
        this.$router.push('/')
      },
      toggle: function () {
        let navbar = document.getElementById('navbarSupportedContent')
        if (!navbar.style.display) {
          navbar.style.display = 'block'
        } else {
          navbar.style.display = ''
        }
      }
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  nav {
    margin-bottom: 30px;
  }
</style>
