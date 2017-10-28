<template>
  <div class="container">
    <div class="row">
      <h1>{{ msg }}</h1>
    </div>
    <div class="container">
      <div class="text-center" v-if="image">
        <img :src="image" width="120px" height="120px" class="img-thumbnail"/>
      </div>
      <form id='formProfil'>
        <div class="form-group row">
          <label class="col-sm-2 col-form-label" for="lastname">Nom</label>
          <input class="form-control" type="text" id="lastname" name="lastname" v-model='profil.lastname'>
        </div>
        <div class="form-group row">
          <label class="col-sm-2 col-form-label" for="firstname">Prénom</label>
          <input class="form-control" type="text" id="firstname" name="firstname" v-model='profil.firstname'>
        </div>
        <div class="form-group row">
          <label class="col-sm-2 col-form-label" for="email">Email</label>
          <input class="form-control" type="email" id="email" name="email" v-model='profil.email'>
        </div>
        <div class="form-group row">
          <label class="col-sm-2 col-form-label" for="birthdate">Date de naissance</label>
          <input class="form-control" type="date" id="birthdate" name="birthdate" v-model='profil.birthDate'>
        </div>

      </form>
        <div class="text-right">
          <file-handler label="Changer mon avatar" id="avatar" v-model="file" @input="handleFileChange"></file-handler>
          <button class="btn btn-primary">Modifier</button>
        </div>
    </div>
  </div>
</template>
<script>
  import UserService from '../services/userService'
  import FileHandler from './FileHandler.vue'
  import * as moment from 'moment'
  export default {
    components: {
      FileHandler
    },
    name: 'Profil',
    created: function () {
      if (!UserService.tokenExist()) {
        this.$router.push('/')
      } else {
        UserService.loginExistingToken()
          .then(r => {
            this.profil = r.data.profil
            this.profil.birthDate = moment(this.profil.birthDate).format('YYYY-MM-DD')
            this.image = this.profil.profilPicture ? 'data:image/png;base64,' + this.profil.profilPicture : null
          })
      }
    },
    data () {
      return {
        msg: 'Profil',
        profil: {},
        file: null,
        image: null
      }
    },
    methods: {
      handleFileChange: function () {
        console.log(this.file.name)
      }
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
