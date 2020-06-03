<template>
  <v-container>
    <v-data-table :headers="headers"
                  :items="nodeList"
                  :items-per-page="20"
                  class="elevation-1"
                  :search="search">
      <template v-slot:top>
        <v-toolbar flat>
          <v-toolbar-title>Modules</v-toolbar-title>
          <v-spacer></v-spacer>
          <v-text-field
                  v-model="search"
                  append-icon="mdi-magnify"
                  label="Search"
                  single-line
                  hide-details
          ></v-text-field>
          <v-btn color="blue darken-1" text @click="checkModules">Check Modules</v-btn>
        </v-toolbar>
      </template>
      <template v-slot:item.node="{ item }">
        <displayNodeName :id="item.node"></displayNodeName>
      </template>
      <template v-slot:item.flim="{ item }">
        <v-chip color="amber" dark v-if="item.flim">Flim</v-chip>
        <v-chip color="green" dark v-else>Slim</v-chip>
      </template>
      <template v-slot:item.status="{ item }">
        <v-chip color="green" dark v-if="item.status">Ok</v-chip>
        <v-chip color="red" dark v-else>Error</v-chip>
      </template>
      <template v-slot:item.actions="{ item }">
        <v-btn color="blue darken-1" text @click="editNode(item)" outlined>Edit</v-btn>
      </template>
    </v-data-table>
    <v-row v-if="$store.state.debug">
      <h2>Debug Mode</h2>
      {{ nodeList[0] }}
    </v-row>
  </v-container>
</template>

<script>
  import displayNodeName from './displayNodeName'
  export default {
    name: 'node_list',
    components: {displayNodeName},
    data: function() {
      return {
        headers: [
          { text: 'node', value: 'node' },
          {text: 'name', value: 'name', align: ' d-none'},
          { text: 'module', value: 'module' },
          { text: 'flim', value: 'flim' },
          { text: 'group', value: 'group' },
          { text: 'status', value: 'status' },
          { text: 'component', value: 'component' },
          {text: 'Actions', value: 'actions', sortable: false }
        ],
        search: '',
        dialog: false,
        nodeComponent: 'noModule',
        selectedNode: {}
      }
    },
    mounted() {
      this.checkModules()
    },
    watch: {
      nodeList: function () {
        this.displayNodeList = []
        for (let i in this.nodeList) {
          console.log(`Update Diaplay List ${i}`)
          if (this.$store.state.layout.nodeDetails[this.nodeList[i].node]) {
            this.nodeList[i].name = this.$store.state.layout.nodeDetails[this.nodeList[i].node].name
            this.nodeList[i].colour = this.$store.state.layout.nodeDetails[this.nodeList[i].node].colour
            this.nodeList[i].group = this.$store.state.layout.nodeDetails[this.nodeList[i].node].group
          }
        }
      }
    },
    computed : {
      nodeList: function () {
        return Object.values(this.$store.state.nodes)
      }
    },
    methods: {
      checkModules: function() {
        console.log(`checkModules`)
        this.$root.send('QNN')
      },
      editNode: function(node) {
        console.log(`editNode : ${node.node} : ${node.component}`)
        this.$store.state.selected_node_id = node.node
        this.$store.state.display_component = node.component
      }
    }
  }

</script>
