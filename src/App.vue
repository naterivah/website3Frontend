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
  import WebSocketService from './services/websocketService'

  export default {
    WebSocketService,
    mounted: function () {
      this.$connectToWebSocketAndSubscribe()
    },
    components: {NavBar, FlashMessage},
    name: 'app'
  }
</script>

<style>

</style>
