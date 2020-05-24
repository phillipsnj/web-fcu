<template>
    <v-container>
        <v-card>
            <v-data-table :headers="headers"
                          :items="Object.values($store.state.events)"
                          :items-per-page="20"
                          class="elevation-1"
                          item-key="id"
                          :search="search">
                <template v-slot:item.id="{ item }">
                    <p :class="getEventColour(item.id)">{{ getEventName(item.id) }}</p>
                </template>
                <template v-slot:item.status="{ item }">
                    <v-chip color="green" dark v-if="item.status=='on'">On</v-chip>
                    <v-chip color="red" dark v-else>Off</v-chip>
                </template>
                <template v-slot:top>
                    <v-toolbar flat>
                        <v-toolbar-title>Events Table</v-toolbar-title>
                        <v-spacer></v-spacer>
                        <v-text-field
                                v-model="search"
                                append-icon="mdi-magnify"
                                label="Search"
                                single-line
                                hide-details
                        ></v-text-field>
                        <v-dialog v-model="editDialog" max-width="500px">
                            <v-card>
                                <v-card-title>
                                    <span class="headline">Edit Event</span>
                                </v-card-title>
                                <v-card-text>
                                    <v-container grid-list-md>
                                        {{ editedEvent["name"] }}
                                        <v-row>
                                            <v-text-field v-model="editedEvent.name"
                                                          label="Event Id"></v-text-field>
                                        </v-row>
                                    </v-container>
                                </v-card-text>
                                <v-card-text>
                                    <v-container grid-list-md>
                                        <v-row>
                                            <v-text-field v-model="editedEvent.colour"
                                                          label="Colour"></v-text-field>
                                        </v-row>
                                    </v-container>
                                </v-card-text>
                                <v-card-actions>
                                    <v-spacer></v-spacer>
                                    <v-btn color="blue darken-1" text @click="editDialog=false">Cancel</v-btn>
                                    <v-btn color="blue darken-1" text @click="update(editedEvent)">Update</v-btn>
                                </v-card-actions>
                            </v-card>
                        </v-dialog>
                        <v-dialog v-model="dialog" max-width="500px">
                            <v-card>
                                <v-card-title>
                                    <span class="headline">Teach Event</span>
                                </v-card-title>
                                <v-card-text>
                                    <v-container grid-list-md>
                                        <v-layout wrap>
                                            <v-flex xs12 sm6 md4>
                                                {{ JSON.stringify(editedEvent) }}
                                            </v-flex>
                                        </v-layout>
                                        <v-layout wrap>
                                            <v-flex xs12 sm6 md4>
                                                <v-text-field readonly v-model="editedEvent.id"
                                                              label="Event Id"></v-text-field>
                                            </v-flex>
                                            <v-flex xs12 sm6 md4>
                                                <v-select
                                                        v-model="SelectedEventNode"
                                                        :items="nodes"
                                                        label="Node"
                                                        item-text="node"
                                                        return-object
                                                        @change="checkNode()">
                                                </v-select>
                                            </v-flex>
                                        </v-layout>
                                        <v-layout wrap>
                                            <v-flex xs12 sm6 md4>
                                                {{ teachEventOutput }}
                                            </v-flex>
                                        </v-layout>
                                    </v-container>
                                </v-card-text>
                                <v-card-actions>
                                    <v-spacer></v-spacer>
                                    <v-btn color="blue darken-1" text @click="close">Cancel</v-btn>
                                    <v-btn color="blue darken-1" :disabled="!teachEventStatus" text
                                           @click="teach(SelectedEventNode,editedEvent)">Teach
                                    </v-btn>
                                </v-card-actions>
                            </v-card>
                        </v-dialog>
                    </v-toolbar>
                </template>
                <template v-slot:item.actions="{ item }">
                    <v-btn color="blue darken-1" text @click="editEvent(item)">Edit</v-btn>
                    <v-btn color="blue darken-1" text @click="teachEvent(item)">Teach</v-btn>
                    <v-btn color="blue darken-1" text @click="sendEvent(item.nodeId, item.eventId, item.type, 'On')">
                        On
                    </v-btn>
                    <v-btn color="blue darken-1" text @click="sendEvent(item.nodeId, item.eventId, item.type, 'Off')">
                        Off
                    </v-btn>
                </template>
            </v-data-table>
        </v-card>
    </v-container>
</template>

<script>

    export default {
        name: 'event_list',
        data: function () {
            return {
                search: '',
                headers: [
                    {text: 'id', value: 'id'},
                    {text: 'nodeId', value: 'nodeId'},
                    {text: 'eventId', value: 'eventId'},
                    {text: 'type', value: 'type'},
                    {text: 'status', value: 'status'},
                    {text: 'count', value: 'count'},
                    {text: 'Actions', value: 'actions', sortable: false}
                ],
                dialog: false,
                editDialog: false,
                editedIndex: -1,
                editedEvent: {
                    name: '',
                    colour: ''
                },
                selectedNode: '',
                SelectedEventNode: '',
                teachEventStatus: false,
                teachEventOutput: 'Select a Node'
            }
        },
        computed: {
            debug: function () {
                return this.$store.state.debug
            },
            nodes: function () {
                return Object.values(this.$store.state.nodes)
            }
        },
        methods: {
            getEventName(id) {
                if (id in this.$store.state.layout.eventDetails) {
                    return this.$store.state.layout.eventDetails[id].name
                } else {
                    return id
                }
            },
            getEventColour(id) {
                if (id in this.$store.state.layout.eventDetails) {
                    return this.$store.state.layout.eventDetails[id].colour + "--text"
                } else {
                    return "black--text"
                }
            },
            getEventColourName(id) {
                if (id in this.$store.state.layout.eventDetails) {
                    return this.$store.state.layout.eventDetails[id].colour
                } else {
                    return "black"
                }
            },
            sendEvent(nodeId, eventId, type, action) {
                console.log(`sendEvent ${type} : ${nodeId} : ${eventId} : ${action}`)
            },
            editEvent(item) {
                //let Event = Object.assign({}, item)
                console.log(`Edit Event ${item.id}`)
                //this.editedEvent = Object.assign({}, item)
                this.editedEvent = item
                this.editedEvent["name"] = this.getEventName(item.id)
                this.editedEvent["colour"] = this.getEventColourName(item.id)
                this.editDialog = true
            },
            teachEvent(item) {
                // this.editedIndex = this.events.indexOf(item)
                this.editedEvent = Object.assign({}, item)
                /*this.nodeList = [0]
                this.$root.nodes.forEach(function (arrayItem) {
                    this.nodeList.push(arrayItem.node)
                })*/
                //this.teachEventOutput = JSON.stringify(this.editedEvent)
                this.dialog = true
            },
            checkNode() {
                /*this.teachEventOutput = 'getEventVariables()'*/

                let input = Object.values(this.SelectedEventNode.actions)
                const found = input.find(o => o.event === this.editedEvent.id)
                console.log(`checkNode() ${this.SelectedEventNode.node} ${this.SelectedEventNode.consumer} : ${this.editedEvent.id} : found ${JSON.stringify(found)} : ${JSON.stringify(input)}`)
                /*this.teachEventOutput = JSON.stringify(Object.values(this.SelectedEventNode.actions))*/
                if (typeof (found) != "undefined") {
                    this.teachEventStatus = false
                    this.teachEventOutput = "Event already taught"
                } else {
                    if (this.SelectedEventNode.consumer) {
                        if (this.SelectedEventNode.flim) {
                            this.teachEventStatus = true
                            this.teachEventOutput = "Event is Ok"
                        } else {
                            this.teachEventStatus = false
                            this.teachEventOutput = "Node not in Flim mode"
                        }
                    } else {
                        this.teachEventStatus = false
                        this.teachEventOutput = "Node not a consumer"
                    }
                }
            },
            close() {
                this.dialog = false
                /*                setTimeout(() => {
                                    this.editedItem = Object.assign({}, this.defaultItem)
                                    this.editedIndex = -1
                                }, 300)*/
            },
            update(Event) {
                console.log(`Event Details ${JSON.stringify(this.$store.state.eventDetails)}`)
                this.$store.state.layout.eventDetails[Event.id] = {}
                this.$store.state.layout.eventDetails[Event.id].name = Event.name
                this.$store.state.layout.eventDetails[Event.id].colour = this.editedEvent.colour
                console.log(`Layout Details ${JSON.stringify(this.$store.state.layout)}`)
                this.$root.send('UPDATE_LAYOUT_DETAILS', this.$store.state.layout)
                this.editDialog = false
            },
            teach(selectedNode, selectedEvent) {
                // eslint-disable-next-line no-console
                console.log(`TEACH_EVENT : ${selectedNode.node} : ${selectedNode.module} : ${selectedEvent.id}`)
                if (selectedNode.module == 'canmio-universal') {
                    this.$root.send('TEACH_EVENT', {
                        "nodeId": selectedNode.node,
                        "eventName": selectedEvent.id,
                        "eventId": 2,
                        "eventVal": 2
                    })
                } else {
                    this.$root.send('TEACH_EVENT', {
                        "nodeId": selectedNode.node,
                        "eventName": selectedEvent.id,
                        "eventId": 1,
                        "eventVal": 0
                    })
                }
                this.close()
            }
        }
    }

</script>
