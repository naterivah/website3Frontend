<template>
  <div class="tree-menu">
    <a class="dropdown-item" v-if="!nodes"  href="#">{{label}}</a>
    <div class="dropdown" v-if="nodes">
      <a class="nav-link">{{label}}</a>
        <tree-menu
          v-for="node in nodes"
          :nodes="node.children"
          :label="node.name"
          :key="node.name"
          class="dropdown-item"
        >
        </tree-menu>
    </div>

  </div>
</template>
<script>
  export default {
    name: 'tree-menu',
    props: ['label', 'nodes', 'depth'],
    data () {
      return {showChildren: false}
    },
    computed: {
    },
    methods: {
    }
  }
</script>
