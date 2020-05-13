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
                        <v-card class="pa-2" flat min-width="200">
                            <v-checkbox
                                    v-model="userFlags"
                                    label="Silent"
                                    :value=1
                                    @change="updateNV(node.node,2,sumArray(userFlags))"
                            ></v-checkbox>
                        </v-card>
                        <v-card class="pa-2" flat min-width="200">
                            <v-checkbox min-width="100"
                                        v-model="userFlags"
                                        label="Steal"
                                        :value=2
                                        @change="updateNV(node.node,2,sumArray(userFlags))"
                            ></v-checkbox>
                        </v-card>
                        <v-card class="pa-2" flat min-width="200">
                            <v-checkbox
                                    v-model="userFlags"
                                    :label="`Share`"
                                    :value=4
                                    @change="updateNV(node.node,2,sumArray(userFlags))"
                            ></v-checkbox>
                        </v-card>
                        <v-card class="pa-2" flat min-width="200">
                            <v-checkbox
                                    v-model="userFlags"
                                    :label="`Event Reset`"
                                    :value=8
                                    @change="updateNV(node.node,2,sumArray(userFlags))"
                            ></v-checkbox>
                        </v-card>
                        <v-card class="pa-2" flat min-width="200">
                            <v-checkbox
                                    v-model="userFlags"
                                    :label="`Map Event`"
                                    :value=16
                                    @change="updateNV(node.node,2,sumArray(userFlags))"
                            ></v-checkbox>
                        </v-card>
                        <v-card class="pa-2" flat min-width="200">
                            <v-checkbox
                                    v-model="userFlags"
                                    :label="`Stop on Timeout`"
                                    :value=32
                                    @change="updateNV(node.node,2,sumArray(userFlags))"
                            ></v-checkbox>
                        </v-card>
                        <v-card class="pa-2" flat min-width="200">
                            <v-checkbox
                                    v-model="userFlags"
                                    :label="`Start of Day`"
                                    :value=64
                                    @change="updateNV(node.node,2,sumArray(userFlags))"
                            ></v-checkbox>
                        </v-card>
                        <v-card class="pa-2" flat min-width="200">
                            <v-checkbox
                                    v-model="userFlags"
                                    :label="`Enable Shuttles`"
                                    :value=128
                                    @change="updateNV(node.node,2,sumArray(userFlags))"
                            ></v-checkbox>
                        </v-card>
                    </v-row>
                    <v-row>
                        <v-card class="pa-2" flat min-width="200">
                            <v-checkbox
                                    v-model="operationFlags"
                                    :label="`Jumper Control`"
                                    :value=1
                                    @change="updateNV(node.node,3,sumArray(operationFlags))"
                            ></v-checkbox>
                        </v-card>
                        <v-card class="pa-2" flat min-width="200">
                            <v-checkbox
                                    v-model="operationFlags"
                                    :label="`Main Output on board`"
                                    :value=2
                                    @change="updateNV(node.node,3,sumArray(operationFlags))"
                            ></v-checkbox>
                        </v-card>
                        <v-card class="pa-2" flat min-width="200">
                            <v-checkbox
                                    v-model="operationFlags"
                                    :label="`Analogue Detection`"
                                    :value=4
                                    @change="updateNV(node.node,3,sumArray(operationFlags))"
                            ></v-checkbox>
                        </v-card>
                        <v-card class="pa-2" flat min-width="200">
                            <v-checkbox
                                    v-model="operationFlags"
                                    :label="`ZTC Mode`"
                                    :value=8
                                    @change="updateNV(node.node,3,sumArray(operationFlags))"
                            ></v-checkbox>
                        </v-card>
                        <v-card class="pa-2" flat min-width="200">
                            <v-checkbox
                                    v-model="operationFlags"
                                    :label="`Track off with stop all`"
                                    :value=8
                                    @change="updateNV(node.node,3,sumArray(operationFlags))"
                            ></v-checkbox>
                        </v-card>
                    </v-row>
                    <v-row>
                        <v-card class="pa-2" flat min-width="200">
                            <v-checkbox
                                    v-model="debugFlags"
                                    :label="`Priority Packets`"
                                    :value=1
                                    @change="updateNV(node.node,4,sumArray(debugFlags))"
                            ></v-checkbox>
                        </v-card>
                        <v-card class="pa-2" flat min-width="200">
                            <v-checkbox
                                    v-model="debugFlags"
                                    :label="`Refresh Speed Packets`"
                                    :value=2
                                    @change="updateNV(node.node,4,sumArray(debugFlags))"
                            ></v-checkbox>
                        </v-card>
                        <v-card class="pa-2" flat min-width="200">
                            <v-checkbox
                                    v-model="debugFlags"
                                    :label="`Refresh Function Packets`"
                                    :value=4
                                    @change="updateNV(node.node,4,sumArray(debugFlags))"
                            ></v-checkbox>
                        </v-card>
                        <v-card class="pa-2" flat min-width="200">
                            <v-checkbox
                                    v-model="debugFlags"
                                    :label="`Service Mode Packets`"
                                    :value=4
                                    @change="updateNV(node.node,4,sumArray(debugFlags))"
                            ></v-checkbox>
                        </v-card>
                        <v-card class="pa-2" flat min-width="200">
                            <v-checkbox
                                    v-model="debugFlags"
                                    :label="`Accessory Packets`"
                                    :value=8
                                    @change="updateNV(node.node,4,sumArray(debugFlags))"
                            ></v-checkbox>
                        </v-card>
                    </v-row>
                    <v-row>
                        <v-card class="pa-2" flat min-width="200">
                            <v-text-field
                                    label="Walkabout Timeout (sec)"
                                    v-model="node.variables[5]"
                                    outlined
                                    @change="updateNV(node.node,5,node.variables[5])"
                            ></v-text-field>
                        </v-card>
                        <v-card class="pa-2" flat min-width="200">
                            <v-text-field
                                    label="Main Current Limit"
                                    v-model="node.variables[6]"
                                    outlined
                                    @change="updateNV(node.node,6,node.variables[6])"
                            ></v-text-field>
                        </v-card>
                        <v-card class="pa-2" flat min-width="200">
                            <v-text-field
                                    label="Service Current Limit"
                                    v-model="node.variables[7]"
                                    outlined
                                    @change="updateNV(node.node,7,node.variables[7])"
                            ></v-text-field>
                        </v-card>
                        <v-card class="pa-2" flat min-width="200">
                            <v-text-field
                                    label="Service Multiplier"
                                    v-model="node.variables[8]"
                                    outlined
                                    @change="updateNV(node.node,8,node.variables[8])"
                            ></v-text-field>
                        </v-card>
                        <v-card class="pa-2" flat min-width="200">
                            <v-text-field
                                    label="Increase for ACK Pulses"
                                    v-model="node.variables[9]"
                                    outlined
                                    @change="updateNV(node.node,9,node.variables[9])"
                            ></v-text-field>
                        </v-card>
                        <v-card class="pa-2" flat min-width="200">
                            <v-text-field readonly
                                    label="Shoot through delay"
                                    v-model="node.variables[10]"
                                    outlined
                                    @change="updateNV(node.node,10,node.variables[10])"
                            ></v-text-field>
                        </v-card>
                        <v-card class="pa-2" flat min-width="200">
                            <v-text-field readonly
                                    label="Mapped Node"
                                    v-model="node.variables[11]"
                                    outlined
                                    @change="updateNV(node.node,11,node.variables[9])"
                            ></v-text-field>
                        </v-card>
                        <v-card class="pa-2" flat min-width="200">
                            <v-text-field
                                    label="Send Current Interval"
                                    v-model="node.variables[13]"
                                    outlined
                                    @change="updateNV(node.node,13,node.variables[13])"
                            ></v-text-field>
                        </v-card>
                        <v-card class="pa-2" flat min-width="200">
                            <v-text-field
                                    label="SOD Delay"
                                    v-model="node.variables[14]"
                                    outlined
                                    @change="updateNV(node.node,14,node.variables[14])"
                            ></v-text-field>
                        </v-card>
                        <v-card class="pa-2" flat min-width="200">
                            <v-text-field
                                    label="Shuttle Honk Interval"
                                    v-model="node.variables[15]"
                                    outlined
                                    @change="updateNV(node.node,15,node.variables[15])"
                            ></v-text-field>
                        </v-card>
                        <v-card class="pa-2" flat min-width="200">
                            <v-text-field
                                    label="Maximum Speed"
                                    v-model="node.variables[16]"
                                    outlined
                                    @change="updateNV(node.node,16,node.variables[16])"
                            ></v-text-field>
                        </v-card>
                    </v-row>
                    <v-layout v-if="debug">
                        Node Variables {{ node.variables }}
                    </v-layout>
                </v-container>
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
    </v-container>

</template>

<script>
    import NodeParameters from './NodeParameters'
    import { nodeMixin } from '../mixins/nodeMixin.js'
    export default {
        name: "mergDefault",
        components: {
            // eslint-disable-next-line
            NodeParameters
        },
        mixins: [nodeMixin],
         data: function () {
            return {
                userFlags: [],
                operationFlags: [],
                debugFlags: []
            }
        },
        mounted() {
            this.userFlags = this.getArray(this.$root.$data.nodes[this.nodeId].variables[2])
            this.operationFlags = this.getArray(this.$root.$data.nodes[this.nodeId].variables[3])
            this.debugFlags = this.getArray(this.$root.$data.nodes[this.nodeId].variables[4])

        },
        watch: {
            userVariable() {
                // eslint-disable-next-line no-console
                console.log(`Watch Flags Variables : ${this.$root.$data.nodes[this.nodeId].node} ::  ${this.node.variables[this.SelectedChannelBaseNV + 1]} :: ${this.SelectedChannelBaseNV + 1}`)

                this.userFlags = this.getArray(this.$root.$data.nodes[this.nodeId].variables[2])
            },
            operationVariable() {
                this.operationFlags = this.getArray(this.$root.$data.nodes[this.nodeId].variables[3])
            },
            debugVariable() {
                this.debugFlags = this.getArray(this.$root.$data.nodes[this.nodeId].variables[4])
            }
        }

    }
</script>

<style scoped>

</style>