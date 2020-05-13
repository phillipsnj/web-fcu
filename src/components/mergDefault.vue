<template>
    <v-container>
        <v-toolbar flat>
            <v-toolbar-title>Default Module Type Page : {{ nodeId }}</v-toolbar-title>
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
            <v-tab :key="4">
                Debug
            </v-tab>
            <v-tab-item :key="1">
                <NodeParameters v-bind:node="node"></NodeParameters>
            </v-tab-item>
            <v-tab-item :key="2">
                <v-row wrap>
                    <v-card class="pa-2" flat min-width="200">
                        <v-select
                                v-model="SelectedVariable"
                                :items="VariableIndexes"
                                label="Variable"
                                @change="getVariable(SelectedVariable)"
                        ></v-select>
                    </v-card>
                    <v-card class="pa-2" flat min-width="200">
                        <v-text-field
                                label="Value"
                                v-model="node.variables[SelectedVariable]"
                                @change="updateNV(node.node,SelectedVariable,node.variables[SelectedVariable])"
                        ></v-text-field>
                    </v-card>
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
                                            <v-row v-for="n in node.parameters[5]" :key="n" dense>
                                                <v-col cols="12" sm="6" md="4">
                                                    <v-text-field
                                                            label="Variable"
                                                            :value="n"
                                                            readonly
                                                    >
                                                    </v-text-field>
                                                </v-col>
                                                <v-col cols="12" sm="6" md="4">
                                                    <v-text-field
                                                            label="Value"
                                                            v-model="node.actions[editedEvent.actionId].variables[n]"
                                                            @change="updateEV(node.node, node.actions[editedEvent.actionId].event, node.actions[editedEvent.actionId].actionId,
                                                      n, parseInt(node.actions[editedEvent.actionId].variables[n]))"
                                                    >
                                                    </v-text-field>
                                                </v-col>

                                            </v-row>
                                        </v-container>
                                    </v-card-text>
                                </v-card>
                            </v-dialog>
                        </v-toolbar>
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
            <v-tab-item :key="4">
                <v-layout row wrap>
                    <h2>mergDefault</h2>
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

    export default {
        mixins: [nodeMixin],
        name: "mergDefault",
        components: {
            // eslint-disable-next-line
            NodeParameters
        },
        //props: ['node'],
        data: function () {
            return {}
        }
    }
</script>

<style scoped>

</style>