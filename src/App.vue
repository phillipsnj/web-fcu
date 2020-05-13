<template>
  <v-app id="app">
    <v-navigation-drawer
      v-model="drawer"
      app
    >
      <v-list dense>
        <v-list-item link @click="change_display_component(item.component)" v-for="item in menuItems" :key="item.title">
          <v-list-item-action>
            <v-icon>{{ item.icon }}</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title>{{ item.title }}</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>

    <v-app-bar
      app
      color="indigo"
      dark
    >
      <v-app-bar-nav-icon @click.stop="drawer = !drawer" />
      <v-toolbar-title>
        <span class="white--text text--darken-1 font-weight-bold display-1 roboto">{{ this.$root.$data.layout.title }}</span>
        <span class="font-weight-light text-md-center"> {{ this.$root.$data.layout.subTitle }}</span>
      </v-toolbar-title>
    </v-app-bar>

    <v-content>
      <component v-bind:is="display_component"></component>
    </v-content>
    <v-footer
      color="indigo"
      app
    >
      <span class="white--text">&copy; 2020</span>
    </v-footer>
  </v-app>
</template>

<script>
  import hello_world from './components/HelloWorld'
  import node_list from './components/NodeList'
  import event_list from './components/EventList'
  import raw from './components/Raw'
  import settings from './components/settings'
  import mergDefault from './components/mergDefault'
  import mergCANMIO from './components/mergCANMIO'
  import mergCANPAN from './components/mergCANPAN'
  import mergCANCMD from './components/mergCANCMD'

  export default {
    components:{
      // eslint-disable-next-line
      hello_world, node_list, event_list, raw, mergDefault, mergCANMIO, mergCANPAN, mergCANCMD, settings
    },
    props: {
      source: String,
    },
    data: () => ({
      drawer: null,
      mainComponent:"hello_world",
      menuItems:[
        {title:"Home", icon:"mdi-home", component:"hello_world"},
        {title:"Nodes", icon:"mdi-home", component:"node_list"},
        {title:"Events", icon:"mdi-home", component:"event_list"},
        {title:"Settings", icon:"mdi-home", component:"settings"},
        {title:"Raw", icon:"mdi-home", component:"raw"}
      ]
    }),
    methods: {
      change_display_component(component) {
        this.drawer = null
        this.$root.$data.display_component = component
      }
    },
    computed: {
      display_component() {
        return this.$root.$data.display_component
      },
      layout() {
        return this.$root.$data.layout
        //return this.$store.state.nodes.data
      },
      debug() {
        return this.$root.$data.debug
      }
    }
  }
</script>
