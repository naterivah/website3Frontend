<template>
  <label class="file-handler">
    <div  class="btn btn-outline-success my-2 my-sm-0">
      <span>
          <i class="material-icons">file_upload</i>{{label ? label : 'Fichier' }}
      </span>
    </div>

    <input type="file" @change="handleFileChange"/>
  </label>
</template>

<script>
  export default {
    props: {
      value: File,
      label: String
    },
    name: 'FileHandler',
    methods: {
      handleFileChange: function (e) {
        this.$emit('input', e.target.files[0])
      }
    }
  }
</script>

<style scoped>
  .file-handler > input[type="file"] {
    display: none;
  }
  i{
    vertical-align: middle;
  }
</style>
