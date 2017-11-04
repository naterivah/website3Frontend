<template>
    <div class="p-2">
      <nav aria-label="Navigation ">
        <ul v-if="value.totalPages > 1" class="pagination pagination-circle pg-darkgrey justify-content-center">
          <li v-if="!value.first" class="page-item">
            <a v-on:click="paginate(value.number -1)"  class="page-link"  aria-label="Previous">
              <span aria-hidden="true">&laquo;</span>
              <span class="sr-only">Previous</span>
            </a>
          </li>
          <li v-for="(n, index) in value.totalPages"  class="page-item" v-bind:class="{active: value.number === index  }">
            <a v-if="index > value.number - 1 && index < value.number + 2" class="page-link" v-on:click="paginate(index)">{{n}}</a>
          </li>
          <li v-if="!value.last" class="page-item">
            <a v-on:click="paginate(value.number +1)" class="page-link" aria-label="Next">
              <span aria-hidden="true">&raquo;</span>
              <span class="sr-only">Next</span>
            </a>
          </li>
        </ul>
      </nav>
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
