<template>
    <div class="jumbotron">
      <h1 class="display-3">{{ msg }}</h1>
      <p class="lead">{{ content }}</p>
    </div>
</template>

<script>
export default {
  name: 'Home',
  data () {
    return {
      msg: 'HealthStats - Introduction',
      content: 'Cette application a pour objectif d\'enregistrer votre état de santé au cours du temps(maladie, insomnies, douleurs chroniques...), d\'élaborer des statistiques sur base de ces données et de générer des rapports que vous pourrez présenter à votre médecin à vos prochaines visites.'
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
