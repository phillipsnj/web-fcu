<template>
  <v-container>
    <v-data-table :headers="headers"
                  :items="Object.values($store.state.nodes)"
                  :items-per-page="5"
                  class="elevation-1">
      <template v-slot:top>
        <v-toolbar flat>
          <v-toolbar-title>Modules</v-toolbar-title>
          <v-spacer></v-spacer>
          <v-btn color="blue darken-1" text @click="checkModules">Check Modules</v-btn>
        </v-toolbar>
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
    </v-row>
  </v-container>
</template>

<script>
  export default {
    name: 'node_list',
    data: function() {
      return {
        headers: [
          { text: 'node', value: 'node' },
          { text: 'module', value: 'module' },
          { text: 'flim', value: 'flim' },
          { text: 'flags', value: 'flags' },
          { text: 'status', value: 'status' },
          { text: 'component', value: 'component' },
          {text: 'Actions', value: 'actions', sortable: false }
        ],
        dialog: false,
        nodeComponent: 'noModule',
        selectedNode: {}
      }
    },
    methods: {
      checkModules: function() {
        console.log(`checkModules`)
        //this.$socket.emit('QNN')
      },
      editNode: function(node) {
        console.log(`editNode : ${node.node} : ${node.component}`)
        this.$store.state.selected_node_id = node.node
        this.$store.state.display_component = node.component
      }
    }
  }

</script>
