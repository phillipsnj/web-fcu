<template>

  <v-container>
    <v-toolbar flat>
      <v-toolbar-title>CANCMD : {{ nodeId }}</v-toolbar-title>
    </v-toolbar>
    <v-tabs>
      <v-tab :key="1">
        Parameters
      </v-tab>
      <v-tab :key="2">
        Variables
      </v-tab>
      <v-tab :key="4">
        Debug
      </v-tab>
      <v-tab-item :key="1">
        <NodeParameters v-bind:node="node"></NodeParameters>
      </v-tab-item>
      <v-tab-item :key="2">
        <v-container>
          <!--<v-row>
                          <v-card class="pa-2" flat min-width="100" max-width="200">
                              <v-text-field
                                      label="Command Station Number"
                                      v-model="node.variables[1]"
                                      readonly
                              ></v-text-field>
                          </v-card>
                      </v-row>-->
          <v-row>
            <NodeBitVariable v-bind:node="node.node" variable="2" bit="0" name="Silent"></NodeBitVariable>
            <NodeBitVariable v-bind:node="node.node" variable="2" bit="1" name="Steal"></NodeBitVariable>
            <NodeBitVariable v-bind:node="node.node" variable="2" bit="2" name="Share"></NodeBitVariable>
            <NodeBitVariable v-bind:node="node.node" variable="2" bit="3" name="Event Reset"></NodeBitVariable>
            <NodeBitVariable v-bind:node="node.node" variable="2" bit="4" name="Map Event"></NodeBitVariable>
            <NodeBitVariable v-bind:node="node.node" variable="2" bit="5" name="Stop on Timeout"></NodeBitVariable>
            <NodeBitVariable v-bind:node="node.node" variable="2" bit="6" name="Start of Day"></NodeBitVariable>
            <NodeBitVariable v-bind:node="node.node" variable="2" bit="7" name="Enable Shuttles"></NodeBitVariable>
          </v-row>
          <v-row>
            <NodeBitVariable v-bind:node="node.node" variable="3" bit="0" name="Jumper Control"></NodeBitVariable>
            <NodeBitVariable v-bind:node="node.node" variable="3" bit="1" name="Main Output on board"></NodeBitVariable>
            <NodeBitVariable v-bind:node="node.node" variable="3" bit="2" name="Analogue Detection"></NodeBitVariable>
            <NodeBitVariable v-bind:node="node.node" variable="3" bit="3" name="ZTC Mode"></NodeBitVariable>
            <NodeBitVariable v-bind:node="node.node" variable="3" bit="4" name="Track off with stop all"></NodeBitVariable>
            <NodeBitVariable v-bind:node="node.node" variable="3" bit="5" name="Priority Packets"></NodeBitVariable>
          </v-row>
          <v-row>
            <NodeBitVariable v-bind:node="node.node" variable="4" bit="0" name="Refresh Speed Packets"></NodeBitVariable>
            <NodeBitVariable v-bind:node="node.node" variable="4" bit="1" name="Refresh Function Packets"></NodeBitVariable>
            <NodeBitVariable v-bind:node="node.node" variable="4" bit="2" name="Service Mode Packets"></NodeBitVariable>
            <NodeBitVariable v-bind:node="node.node" variable="4" bit="3" name="Accessory Packets"></NodeBitVariable>
          </v-row>
          <v-row>
            <NodeVariable v-bind:node="node.node" variable="5" name="Walkabout Timeout (sec)"></NodeVariable>
            <NodeVariable v-bind:node="node.node" variable="6" name="Main Current Limit"></NodeVariable>
            <NodeVariable v-bind:node="node.node" variable="7" name="Service Current Limit"></NodeVariable>
            <NodeVariable v-bind:node="node.node" variable="8" name="Service Multiplier"></NodeVariable>
            <NodeVariable v-bind:node="node.node" variable="10" name="Shoot through delay"></NodeVariable>
            <NodeVariable v-bind:node="node.node" variable="11" name="Mapped Node"></NodeVariable>
            <NodeVariable v-bind:node="node.node" variable="13" name="Send Current Interval"></NodeVariable>
            <NodeVariable v-bind:node="node.node" variable="14" name="SOD Delay"></NodeVariable>
            <NodeVariable v-bind:node="node.node" variable="15" name="Shuttle Honk Interval"></NodeVariable>
            <NodeVariable v-bind:node="node.node" variable="16" name="Maximum Speed"></NodeVariable>
          </v-row>
          <v-row v-if="$store.state.debug">
            Node Variables {{ node.variables }}
          </v-row>
        </v-container>
      </v-tab-item>

      <v-tab-item :key="4">
        <v-layout row wrap>
          <h2>CANCMD</h2>
          <p>Node ID :: {{ nodeId }}</p>
          <p>Node {{ $store.state.nodes[nodeId] }}</p>
        </v-layout>
      </v-tab-item>
    </v-tabs>
  </v-container>

</template>

<script>

  import NodeParameters from './NodeParameters'
  import NodeVariable from './NodeVariable'
  import NodeBitVariable from './NodeBitVariable'
  import { nodeMixin } from '../mixins/nodeMixin.js'
  export default {
    name: 'mergDefault',
    components: {
      // eslint-disable-next-line
      NodeParameters, NodeBitVariable, NodeVariable
    },
    mixins: [nodeMixin],
    data: function() {
      return {}
    }
  }

</script>

<style scoped>

</style>
