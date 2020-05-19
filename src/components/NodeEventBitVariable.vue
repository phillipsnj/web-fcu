<template>
    <!--    <v-card class="xs6 md3 pa-3" flat>-->
    <v-checkbox min-width="100"
                v-model="checked"
                :label="name"
                @change="updateEV"
    ></v-checkbox>
    <!--        <h3> Var {{ $store.state.nodes[this.node].actions[this.action].variables[this.variable] }} :: {{ variableValue }}:: {{ checked }} :: {{ bitValue }} </h3>-->
    <!--    </v-card>-->
</template>
<script>

    export default {
        name: 'NodeEventBitVariable',
        data: () => ({
            checked: false,
            bitValue: 0,
            bitArray: {0: 1, 1: 2, 2: 4, 3: 8, 4: 16, 5: 32, 6: 64, 7: 128},
            label: "",
            eventName : ""
            //nodes: {}
            //variableValue : this.value
        }),
        props: ['node', 'action', 'variable', 'bit', 'name'],
        mounted() {
            //this.nodes = this.$store.state.nodes
            this.bitValue = this.bitArray[this.bit]
            this.eventName = this.$store.state.nodes[this.node].actions[this.action].event
            this.checked = this.$store.state.nodes[this.node].actions[this.action].variables[this.variable] & this.bitArray[this.bit] ? true : false
            if (this.name) {
                this.label = this.name
            } else {
                this.label = `Variable ${this.variable}`
            }
        },
        watch: {
            variableValue() {
                console.log(` set `)
                //this.checked = this.$store.state.nodes[this.node].variables[this.variable] & this.bitArray[this.bit] ? true : false
            },
            checked() {
                console.log(` Checked `)
            }
        },
        computed: {
            variableValue: function () {
                return this.$store.state.nodes[this.node].actions[this.action].variables[this.variable]
            }
        },
        methods: {
            updateEV: function () {

                let value = this.$store.state.nodes[this.node].actions[this.action].variables[this.variable]
                console.log(`Old Value : ${value}`)
                if (this.checked) {
                    value = value + this.bitArray[this.bit]
                } else {
                    value = value - this.bitArray[this.bit]
                }
                //this.$store.state.nodes[this.node].variables[this.variable] = value
                console.log(`updateEV bit ${this.node} : ${this.variable} : ${this.checked}`)
                //this.nodes[this.node].variables[this.variable] = value
                /*let output = {}
                output['nodeId'] = this.node
                output['actionId'] = this.action
                output['variableId'] = this.variable
                output['variableValue'] = value
                console.log(`Save EV bit ${this.node} : ${this.variable} : ${this.checked}`)*/
                //this.$store.commit('UPDATE_NODE_EVENT_VARIABLE', output)
                this.$root.send('EVLRN', {
                    "nodeId": this.node,
                    "actionId": this.action,
                    "eventName": this.eventName,
                    "eventId": this.variable,
                    "eventVal": value
                })
                //console.log(`New Value : ${value}`)
                //console.log(`Stored : ${this.$store.state.nodes[this.node].actions[this.action].variables[this.variable]}`)
            }
        }
    }

</script>

<style scoped>

</style>
