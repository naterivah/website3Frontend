<template>
  <div>
    <nav-bar/>
    <div class="container">
      <flash-message/>
      <router-view/>
    </div>
  </div>
</template>

<script>
  import NavBar from './components/Navbar'
  import FlashMessage from './components/Flash'
  import store from './store/index'
  import WebsocketService from './services/websocketService'

  export default {
    mounted: function () {
      WebsocketService.subscribe([
        (client) => {
          WebsocketService.subscription(client, '/topic/news', function (d) {
            store.commit('updateNews', JSON.parse(d.body))
          })
        }
      ])
    },
    components: {NavBar, FlashMessage},
    name: 'app'
  }
</script>

<style>

</style>
