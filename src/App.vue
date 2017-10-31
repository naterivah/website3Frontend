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
  import WebsocketService from './services/websocketService'
  export default {
    created: function () {
      WebsocketService.connect()
    },
    components: {NavBar, FlashMessage},
    name: 'app'
  }
</script>

<style>

</style>
