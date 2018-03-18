<template>
  <div class="container">
    <div class="row">
      <h1>{{ msg }}</h1>
    </div>
    <div class="container">
      <div class="text-center" v-if="profil.profilPicture">
        <label class="loader" v-if="upload"></label>
        <picture-view classes="img-thumbnail" v-if="!upload" v-model="image" :uuid="profil.profilPicture.uuid" />
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
          <input class="form-control" type="email" id="email" name="email" v-model='profil.email' disabled>
        </div>
        <div class="form-group row">
          <label class="col-sm-2 col-form-label" for="birthdate">Date de naissance</label>
          <input class="form-control" type="date" id="birthdate" name="birthdate" v-model='profil.birthDate'>

        </div>
        <div class="form-group row">
          <label class="col-sm-2 col-form-label" for="shortDescription">A propos</label>
          <textarea class="md-textarea " id="shortDescription" name="shortDescription"
                    v-model='profil.shortDescription'></textarea>
        </div>

      </form>

      <div class="text-right">
        <file-handler label="Changer mon avatar" id="avatar" v-model="file" @input="handleFileChange"></file-handler>
        <button class="btn btn-primary" v-on:click="updateProfil">Modifier</button>
      </div>
    </div>
  </div>
</template>
<script>
  import UserService from '../services/userService'
  import UploadService from '../services/uploadService'
  import FileHandler from './FileHandler.vue'
  import store from '../store/index'
  import PictureView from './PictureVue'

  export default {
    components: {
      PictureView,
      FileHandler
    },
    name: 'Profil',
    data () {
      return {
        msg: 'Profil',
        file: null,
        upload: false,
        datepicker: null
      }
    },
    computed: {
      profil () {
        return store.state.user.profil
      },
      image () {
        let profilPicture = this.profil.profilPicture
        return [
          UploadService.imageThumb(profilPicture)
        ]
      }
    },
    methods: {
      onfulfilled: function (r) {
        store.commit('updateUser', r.data)
        store.commit('triggerFlash', {
          level: 'success',
          title: 'Profil mis à jour.',
          message: ''
        })
      },
      sleep: function (ms) {
        return new Promise(resolve => setTimeout(resolve, ms))
      },
      updateProfil: function () {
        UserService.updateProfil(this.profil)
          .then(this.onfulfilled)
      },
      handleFileChange: async function () {
        this.upload = true
        await this.sleep(2000)
        UserService.uploadProfilPicture(this.file)
          .then(this.onfulfilled)
          .then(u => {
            this.upload = false
          })
      }
    }
  }
</script>

<style scoped>
  .loader {
    border: 6px solid #f3f3f3; /* Light grey */
    border-top: 6px solid #3498db; /* Blue */
    border-radius: 50%;
    width: 50px;
    height: 50px;
    animation: spin 2s linear infinite;
    vertical-align: middle;
  }

  @keyframes spin {
    0% {
      transform: rotate(0deg);
    }
    100% {
      transform: rotate(360deg);
    }
  }
</style>
