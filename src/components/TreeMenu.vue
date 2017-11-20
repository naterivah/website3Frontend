<template>
  <div class="tree-menu">
    <li class="nav-item" v-if="!nodes" >
      <a class="nav-link">{{label}}</a>
    </li>
    <li class="nav-item dropdown" v-if="nodes">
      <a class="nav-link dropdown-toggle" v-on:click="toggle(label)" data-toggle="dropdown"
         role="button" aria-haspopup="true" aria-expanded="false">{{label}}</a>
      <div  :id="label + '_drop'" class="dropdown-menu">
        <tree-menu
          v-for="node in nodes"
          :nodes="node.children"
          :label="node.name"
          :depth="depth + 1"
          :key="node.name"
          class="dropdown-item"
        >
        </tree-menu>
      </div>
    </li>

  </div>
</template>
<script>
  import TreeMenu from './TreeMenu'
  export default {
    props: ['label', 'nodes', 'depth'],
    data () {
      return {showChildren: false}
    },
    components: [TreeMenu],
    name: 'tree-menu',
    computed: {
    },
    methods: {
      toggle: function (label) {
        let _toggl = function (dropdown) {
          if (!dropdown.style.display) {
            dropdown.style.display = 'block'
          } else {
            dropdown.style.display = ''
          }
        }
        let dropdown = document.getElementById(`${label}_drop`)

    /*   Array.from(document.getElementsByClassName('dropdown-menu')).filter(d => d !== dropdown).forEach(d => {
          d.style.display = ''
        })*/
        _toggl(dropdown)
      }
    }
  }
</script>
