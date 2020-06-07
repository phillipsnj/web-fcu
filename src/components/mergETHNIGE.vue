<template>
    <v-container>
        <v-toolbar flat>
            <v-toolbar-title>ETHNIGE Module Type Page : {{ nodeId }}</v-toolbar-title>
            <v-spacer></v-spacer>
        </v-toolbar>
        <v-tabs>
            <v-tab :key="1">
                Parameters
            </v-tab>
            <v-tab :key="2">
                Variables
            </v-tab>
            <v-tab :key="3" @click="getAllEventVariables" v-if="node.EvCount > 0">
                Events
            </v-tab>
            <v-tab :key="5">
                Settings
            </v-tab>
            <v-tab :key="4">
                Debug
            </v-tab>
            <v-tab-item :key="1">
                <NodeParameters v-bind:node="node"></NodeParameters>
            </v-tab-item>
            <v-tab-item :key="2">
                <v-row>
                    <NodeVariable v-bind:node="node.node" variable="1" name="Var 1"></NodeVariable>
                    <NodeBitVariable v-bind:node="node.node" variable="2" bit="0" name="Var 2 Bit 0"></NodeBitVariable>
                    <NodeBitVariable v-bind:node="node.node" variable="2" bit="1" name="Var 2 Bit 1"></NodeBitVariable>
                    <NodeBitVariable v-bind:node="node.node" variable="2" bit="2" name="Var 2 Bit 3"></NodeBitVariable>
                    <NodeVariableSelect v-bind:node="node.node" variable="4" name="Var 4"
                                        :items="[1,2,3,4]"></NodeVariableSelect>
                    <NodeVariableSelect v-bind:node="node.node" variable="5" name="Var 5"
                                        :items="[
                                            {value:1, text:'Option 1'},
                                            {value:2, text:'Option 2'},
                                            {value:3, text:'Option 3'},
                                            {value:4, text:'Option 4'}
                                        ]">
                    </NodeVariableSelect>
                    <NodeVariableDual v-bind:node="node.node" variable1="6" variable2="7" name="Var 6 & 7"></NodeVariableDual>
                    <NodeSliderVariable v-bind:node="node.node" :variable="3"
                                        name="Slider Var 3"></NodeSliderVariable>
                </v-row>
                <v-row>
                    <NodeVariable v-bind:node="nodeId" v-bind:variable="n" v-for="n in node.parameters[6]"
                                  :key="n"></NodeVariable>
                </v-row>
                <v-row v-if="debug">
                    {{ node.variables }}
                </v-row>
            </v-tab-item>
            <v-tab-item :key="3" v-if="node.EvCount > 0">
                <v-data-table
                        :headers="eventHeaders"
                        :items="Object.values(node.actions)"
                        item-key="actionId"
                >
                    <template v-slot:top>
                        <v-toolbar flat>
                            <v-toolbar-title>Events for {{ node.node }}</v-toolbar-title>
                            <v-divider
                                    class="mx-4"
                                    inset
                                    vertical
                            ></v-divider>
                            <v-spacer></v-spacer>
                            <v-dialog v-model="eventDialog" max-width="500px">
                                <v-card>
                                    <v-card-title>
                                        <span class="headline">Edit Event</span>
                                    </v-card-title>

                                    <v-card-text>
                                        <v-container>
                                            <v-row>
                                                <v-col cols="12" sm="6" md="4">
                                                    <v-text-field v-model="node.parameters[5]"
                                                                  label="Number of Event Variables" readonly>
                                                    </v-text-field>
                                                </v-col>
                                                <v-col cols="12" sm="6" md="4">
                                                    <v-text-field v-model="editedEvent.event"
                                                                  label="Event Name" readonly></v-text-field>
                                                </v-col>
                                                <v-col cols="12" sm="6" md="4">
                                                    <v-text-field v-model="editedEvent.actionId"
                                                                  label="actionId"></v-text-field>
                                                </v-col>
                                            </v-row>
                                            <v-row>
                                                <NodeEventVariable v-bind:node="nodeId"
                                                                   v-bind:action="editedEvent.actionId"
                                                                   v-bind:variable="n" v-for="n in node.parameters[5]"
                                                                   :key="n"></NodeEventVariable>
                                            </v-row>
                                        </v-container>
                                    </v-card-text>
                                </v-card>
                            </v-dialog>
                        </v-toolbar>
                    </template>
                    <template v-slot:item.event="{ item }">
                        <displayEventName :id="item.event"></displayEventName>
                    </template>
                    <template v-slot:item.actions="{ item }">
                        <v-icon
                                small
                                class="mr-2"
                                @click="editEvent(item)"
                        >
                            mdi-pencil
                        </v-icon>
                        <v-icon
                                small
                                @click="deleteEvent(item)"
                        >
                            mdi-delete
                        </v-icon>
                    </template>
                </v-data-table>


            </v-tab-item>
            <v-tab-item :key="5">
                <nodeDetails :nodeId="nodeId"></nodeDetails>
            </v-tab-item>
            <v-tab-item :key="4">
                <v-layout row wrap>
                    <h2>mergETHNIGE</h2>
                    <p>Node ID :: {{ nodeId }}</p>
                    <p>Node {{ node }}</p>
                </v-layout>
            </v-tab-item>
        </v-tabs>
        <div v-if="debug">
            <h3>Raw Node Data</h3>
            <div>
                <p>{{ node }}</p>
            </div>
            <h3>Raw Edited Event</h3>
            <div>
                <p>{{ editedEvent }}</p>
            </div>
        </div>
    </v-container>

</template>

<script>
    import NodeParameters from './NodeParameters'
    import {nodeMixin} from '../mixins/nodeMixin.js'
    import NodeVariable from './NodeVariable'
    import NodeVariableDual from './NodeVariableDual'
    import NodeVariableSelect from './NodeVariableSelect'
    import NodeBitVariable from './NodeBitVariable'
    import NodeSliderVariable from './NodeSliderVariable'
    import NodeEventVariable from './NodeEventVariable'
    import displayEventName from './displayEventName'
    import nodeDetails from './nodeDetails'

    export default {
        mixins: [nodeMixin],
        name: "mergDefault",
        components: {
            NodeParameters,
            NodeVariable,
            NodeEventVariable,
            displayEventName,
            nodeDetails,
            NodeBitVariable,
            NodeSliderVariable,
            NodeVariableSelect,
            NodeVariableDual
        },
        //props: ['node'],
        data: function () {
            return {}
        }
    }
</script>

<style scoped>

</style>