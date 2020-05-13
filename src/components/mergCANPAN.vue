<template>
    <v-container>
        <v-toolbar flat>
            <v-toolbar-title>CANPAN : {{ nodeId }}</v-toolbar-title>
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
                <v-container>
                    <v-card outlined>
                        <v-card-title>Startup Options</v-card-title>
                        <v-card-text>
                            <v-radio-group v-model="node.variables[1]" :mandatory="true"
                                           @change="updateNV(node.node,1,node.variables[1])">
                                <v-radio label="Send Current Events Only" :value="0"></v-radio>
                                <v-radio label="Do Nothing" :value="1"></v-radio>
                                <v-radio label="Send All Events" :value="2"></v-radio>
                            </v-radio-group>
                        </v-card-text>
                    </v-card>
                </v-container>

                <v-layout v-if="debug">
                    Node Variables : {{ node.variables }}
                </v-layout>
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
                            <v-dialog v-model="eventDialog" max-width="600px">
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
                                                <v-col cols="12" sm="6" md="4">
                                                    <v-text-field
                                                            label="Event Type (1)"
                                                            v-model="node.actions[editedEvent.actionId].variables[1]"
                                                            readonly
                                                    >
                                                    </v-text-field>
                                                </v-col>
                                                <v-col cols="12" sm="6" md="4">
                                                    <v-text-field
                                                            label="Switch Number (2)"
                                                            v-model="node.actions[editedEvent.actionId].variables[2]"
                                                            readonly
                                                    >
                                                    </v-text-field>
                                                </v-col>
                                            </v-row>
                                            <v-row>
                                                <v-col cols="12" sm="6" md="4">
                                                    <v-card outlined>
                                                        <v-card-title>Button Action (3)</v-card-title>
                                                        <v-card-text>
                                                            <v-radio-group
                                                                    v-model="node.actions[editedEvent.actionId].variables[3]"
                                                                    :mandatory="true"
                                                                    @change="updateEV(node.node,
                                                                        node.actions[editedEvent.actionId].event,
                                                                        node.actions[editedEvent.actionId].actionId,
                                                                        3,
                                                                        parseInt(node.actions[editedEvent.actionId].variables[3]))"
                                                            >
                                                                <v-radio label="On/Off" :value="1"></v-radio>
                                                                <v-radio label="Off/On" :value="3"></v-radio>
                                                                <v-radio label="On Only" :value="4"></v-radio>
                                                                <v-radio label="Off Only" :value="6"></v-radio>
                                                                <v-radio label="On/Off Toggle" :value="8"></v-radio>
                                                            </v-radio-group>
                                                        </v-card-text>
                                                    </v-card>
                                                </v-col>
                                                <v-col cols="12" sm="6" md="4">
                                                    <v-card outlined>
                                                        <v-card-title>Actions for all LEDs (13)</v-card-title>
                                                        <v-card-text>
                                                            <v-radio-group
                                                                    v-model="node.actions[editedEvent.actionId].variables[13]"
                                                                    :mandatory="true"
                                                                    @change="updateEV(node.node,
                                                                        node.actions[editedEvent.actionId].event,
                                                                        node.actions[editedEvent.actionId].actionId,
                                                                        13,
                                                                        parseInt(node.actions[editedEvent.actionId].variables[13]))"
                                                            >
                                                                <v-radio label="On/Off" :value="255"></v-radio>
                                                                <v-radio label="On Only" :value="254"></v-radio>
                                                                <v-radio label="Off Only" :value="253"></v-radio>
                                                                <v-radio label="Flash" :value="252"></v-radio>
                                                            </v-radio-group>
                                                        </v-card-text>
                                                    </v-card>
                                                </v-col>
                                            </v-row>
                                            <v-row>
                                                <v-col cols="12" sm="6" md="4">
                                                    <v-card outlined>
                                                        <v-card-title>LED 1</v-card-title>
                                                        <v-card-text>

                                                            <v-checkbox
                                                                    v-model="actionArray1"
                                                                    label="Use"
                                                                    :value=1
                                                                    @change="updateEV(node.node, node.actions[editedEvent.actionId].event, node.actions[editedEvent.actionId].actionId,
                                                      5, sumArray(actionArray1))"
                                                            ></v-checkbox>
                                                            <v-checkbox
                                                                    v-model="reverseArray1"
                                                                    label="Reverse"
                                                                    :value=1
                                                                    @change="updateEV(node.node, node.actions[editedEvent.actionId].event, node.actions[editedEvent.actionId].actionId,
                                                      9, sumArray(reverseArray1))"
                                                            ></v-checkbox>
                                                        </v-card-text>
                                                    </v-card>
                                                </v-col>
                                                <v-col cols="12" sm="6" md="4">
                                                    <v-card outlined>
                                                        <v-card-title>LED 2</v-card-title>
                                                        <v-card-text>
                                                            <v-checkbox
                                                                    v-model="actionArray1"
                                                                    label="Use"
                                                                    :value=2
                                                                    @change="updateEV(node.node, node.actions[editedEvent.actionId].event, node.actions[editedEvent.actionId].actionId,
                                                      5, sumArray(actionArray1))"
                                                            ></v-checkbox>
                                                            <v-checkbox
                                                                    v-model="reverseArray1"
                                                                    label="Reverse"
                                                                    :value=2
                                                                    @change="updateEV(node.node, node.actions[editedEvent.actionId].event, node.actions[editedEvent.actionId].actionId,
                                                      9, sumArray(reverseArray1))"
                                                            ></v-checkbox>
                                                        </v-card-text>
                                                    </v-card>
                                                </v-col>
                                                <v-col cols="12" sm="6" md="4">
                                                    <v-card outlined>
                                                        <v-card-title>LED 3</v-card-title>
                                                        <v-card-text>
                                                            <v-checkbox
                                                                    v-model="actionArray1"
                                                                    label="Use"
                                                                    :value=4
                                                                    @change="updateEV(node.node, node.actions[editedEvent.actionId].event, node.actions[editedEvent.actionId].actionId,
                                                      5, sumArray(actionArray1))"
                                                            ></v-checkbox>
                                                            <v-checkbox
                                                                    v-model="reverseArray1"
                                                                    label="Reverse"
                                                                    :value=4
                                                                    @change="updateEV(node.node, node.actions[editedEvent.actionId].event, node.actions[editedEvent.actionId].actionId,
                                                      9, sumArray(reverseArray1))"
                                                            ></v-checkbox>
                                                        </v-card-text>
                                                    </v-card>
                                                </v-col>
                                                <v-col cols="12" sm="6" md="4">
                                                    <v-card outlined>
                                                        <v-card-title>LED 4</v-card-title>
                                                        <v-card-text>
                                                            <v-checkbox
                                                                    v-model="actionArray1"
                                                                    label="Use"
                                                                    :value=8
                                                                    @change="updateEV(node.node, node.actions[editedEvent.actionId].event, node.actions[editedEvent.actionId].actionId,
                                                      5, sumArray(actionArray1))"
                                                            ></v-checkbox>
                                                            <v-checkbox
                                                                    v-model="reverseArray1"
                                                                    label="Reverse"
                                                                    :value=8
                                                                    @change="updateEV(node.node, node.actions[editedEvent.actionId].event, node.actions[editedEvent.actionId].actionId,
                                                      9, sumArray(reverseArray1))"
                                                            ></v-checkbox>
                                                        </v-card-text>
                                                    </v-card>
                                                </v-col>
                                            </v-row>
                                            <v-row>
                                                {{ actionArray1 }} :: {{ reverseArray1 }}
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
    </v-container>

</template>

<script>
    import NodeParameters from './NodeParameters'
    import {nodeMixin} from '../mixins/nodeMixin.js'

    export default {
        name: "mergDefault",
        mixins: [nodeMixin],
        //props: ['node'],
        components: {
            // eslint-disable-next-line
            NodeParameters
        },
        data: function () {
            return {
                actionArray1: [],
                reverseArray1: []
            }
        },
        mounted() {
            //this.nodeId = this.$root.$data.selected_node_id
            // eslint-disable-next-line no-console
            console.log(`Mounted Local: ${this.nodeId} :: ${this.node.node} :: ${this.node.EvCount}`)

            this.actionArray1 = this.getArray(this.$root.$data.nodes[this.$root.$data.selected_node_id].actions[this.editedEvent.actionId].variables[5])
            this.reverseArray1 = this.getArray(this.$root.$data.nodes[this.$root.$data.selected_node_id].actions[this.editedEvent.actionId].variables[9])

        },
        watch: {
            SelectedEvent: function () {
                // eslint-disable-next-line no-console
                console.log(`actionVariable1() : ${this.$root.$data.nodes[this.$root.$data.selected_node_id].actions[this.editedEvent.actionId].variables[5]}`)
                this.actionArray1 = this.getArray(this.$root.$data.nodes[this.$root.$data.selected_node_id].actions[this.editedEvent.actionId].variables[5])
                this.reverseArray1 = this.getArray(this.$root.$data.nodes[this.$root.$data.selected_node_id].actions[this.editedEvent.actionId].variables[9])
            },
            actionVariable1() {
                // eslint-disable-next-line no-console
                console.log(`actionVariable1() : ${this.$root.$data.nodes[this.nodeId].actions[this.editedEvent.actionId].variables[5]}`)
                this.actionArray1 = this.getArray(this.$root.$data.nodes[this.nodeId].actions[this.editedEvent.actionId].variables[5])
            },
            reverseVariable1() {
                this.reverseArray1 = this.getArray(this.$root.$data.nodes[this.$root.$data.selected_node_id].actions[this.editedEvent.actionId].variables[9])
            }
        },
        computed: {
            actionVariable1: function () {
                // eslint-disable-next-line no-console
                console.log(`actionVariable1 : ${this.$root.$data.nodes[this.$root.$data.selected_node_id].actions[this.editedEvent.actionId].variables[5]}`)
                return this.$root.$data.nodes[this.$root.$data.selected_node_id].actions[this.editedEvent.actionId].variables[5]
            },
            reverseVariable1: function () {
                // eslint-disable-next-line no-console
                console.log(`reverseVariable1 : ${this.$root.$data.nodes[this.$root.$data.selected_node_id].actions[this.editedEvent.actionId].variables[9]}`)
                return this.$root.$data.nodes[this.$root.$data.selected_node_id].actions[this.editedEvent.actionId].variables[9]
            }
        }
    }
</script>

<style scoped>

</style>