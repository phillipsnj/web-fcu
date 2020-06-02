<template>
    <v-card>
        <v-card-title>
            <span class="headline">Edit Event Component {{ eventId }} :: {{ status }}</span>
        </v-card-title>
        <v-card-text>
            <v-container grid-list-md>
                <v-row>
                    <v-text-field v-model="editedEvent.name" outlined
                                  label="Event Id"></v-text-field>
                </v-row>
            </v-container>
            <displayEventName :id="eventId"></displayEventName>
            <v-select
                    label="Colour"
                    v-model="editedEvent.colour"
                    :items="$store.state.colours"
                    outlined
            ></v-select>
            <v-combobox
                    v-model="editedEvent.group"
                    :items="groupList()"
                    label="Select a group"
            ></v-combobox>
        </v-card-text>
        <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn color="blue darken-1" text @click="close()">Cancel</v-btn>
            <v-btn color="blue darken-1" text @click="update()">Update</v-btn>
        </v-card-actions>
    </v-card>
</template>

<script>
    import displayEventName from './displayEventName'

    export default {
        name: "EventEditDialog",
        props: ["eventId", "status"],
        components: {displayEventName},
        data: function () {
            return {
                editedEvent : {}
            }
        },
        mounted() {
            this.editedEvent = this.$store.state.layout.eventDetails[this.eventId]
        },
        watch: {
            eventId: function () {
                this.editedEvent = this.$store.state.layout.eventDetails[this.eventId]
            }
        },
        computed: {
            nodeId: function () {
                return parseInt(this.event.substr(0, 4), 16);
            },
            event: function () {
                return parseInt(this.event.substr(4, 4), 16);
            }/*,
            editedEvent: function () {
                return this.$store.state.layout.eventDetails[this.eventId]
            }*/
        },
        methods: {
            update() {
                console.log(`Event Initial Details ${JSON.stringify(this.$store.state.layout.eventDetails[this.eventId])}`)
                this.$store.state.layout.eventDetails[this.eventId] = {}
                this.$store.state.layout.eventDetails[this.eventId].name = this.editedEvent.name
                this.$store.state.layout.eventDetails[this.eventId].colour = this.editedEvent.colour
                this.$store.state.layout.eventDetails[this.eventId].group = this.editedEvent.group
                console.log(`Event Final Details ${JSON.stringify(this.$store.state.layout.eventDetails[this.eventId])}`)
                this.$root.send('REFRESH_EVENTS')
                this.$root.send('UPDATE_LAYOUT_DETAILS', this.$store.state.layout)

                this.$emit('close-dialog')

            },
            sendEvent(nodeId, eventId, type, action) {
                console.log(`sendEvent ${type} : ${nodeId} : ${eventId} : ${action}`)
                if (action == 'On') {
                    this.$root.send('ACON', {"nodeId": nodeId, "eventId": eventId})
                } else {
                    this.$root.send('ACOF', {"nodeId": nodeId, "eventId": eventId})
                }
            },
            groupList() {
                let output = []
                for (let event in this.$store.state.layout.eventDetails) {
                    //console.log(`grouplist ${event} `)
                    if (this.$store.state.layout.eventDetails[event].group) {
                        console.log(`groupList :: ${this.$store.state.layout.eventDetails[event].group}`)
                        output.push(this.$store.state.layout.eventDetails[event].group)
                    }
                }
                return output
            },
            close() {
                console.log(`Close EditEventDialog`)
                this.$emit('close-dialog')
            }
        }
    }
</script>

<style scoped>

</style>