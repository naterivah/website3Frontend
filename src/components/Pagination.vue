<template>
  <div class="container ">
    <div class="p-2">
      <nav aria-label="Navigation ">
        <ul v-if="value.totalPages > 1" class="pagination pagination-sm justify-content-center">
          <li v-if="!value.first" class="page-item">
            <a v-on:click="paginate(value.number -1)"  class="page-link" href="#" aria-label="Previous">
              <span aria-hidden="true">&laquo;</span>
              <span class="sr-only">Previous</span>
            </a>
          </li>
          <li v-for="(n, index) in value.totalPages"  class="page-item" v-bind:class="{active: value.number === index  }">
            <a href="#"  class="page-link" v-on:click="paginate(index)">{{n}}</a>
          </li>
          <li v-if="!value.last" class="page-item">
            <a v-on:click="paginate(value.number +1)" class="page-link" href="#" aria-label="Next">
              <span aria-hidden="true">&raquo;</span>
              <span class="sr-only">Next</span>
            </a>
          </li>
        </ul>
      </nav>
    </div>
  </div>
</template>

<script>
  export default {
    props: {
      value: {}
    },
    name: 'Pagination',
    methods: {
      paginate: function (idx) {
        this.$emit('paginate', idx)
      }
    }
  }
</script>

<style scoped>
</style>
