<template>
  <div>
    <nav-bar/>
    <router-view/>
  </div>
</template>

<script>
  import NavBar from './components/Navbar'
  export default {
    components: {NavBar},
    name: 'app'
  }
</script>

<style>

</style>
