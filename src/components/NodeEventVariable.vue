<template>
    <v-card class="pa-2" flat>
        <v-text-field
                :label="label"
                v-model="variableLocal"
                outlined
                :readonly="isReadonly"
                @change="updateEV"
        >
        </v-text-field>
    </v-card>
</template>

<script>
    export default {
        name: "NodeEventVariable",
        data: () => ({
            label: "",
            variableLocal: 0,
            eventName : "",
            isReadonly : false
        }),
        props: ['node', 'action', 'variable', 'name', 'readonly'],
        mounted() {
            this.variableLocal = this.$store.state.nodes[this.node].actions[this.action].variables[this.variable]
            this.eventName = this.$store.state.nodes[this.node].actions[this.action].event
            if (this.name) {
                this.label = this.name
            } else {
                this.label = `Variable ${this.variable}`
            }
            if (this.readonly) {
                this.isReadonly = true
            } else {
                this.isReadonly = false
            }
        },
        watch: {
            variableValue() {
                this.variableLocal = this.$store.state.nodes[this.node].actions[this.action].variables[this.variable]
            }
        },
        computed: {
            variableValue: function() {
                return this.$store.state.nodes[this.node].actions[this.action].variables[this.variable]
            }
        },
        methods: {
            updateEV: function () {
                console.log(`Update Event Variable`)
                /*let output = {}
                output['nodeId'] = this.node
                output['actonId'] = this.action
                output['variableId'] = this.variable
                output['variableValue'] = this.variableLocal
                this.$store.commit('UPDATE_NODE_EVENT_VARIABLE', output)*/
                this.$root.send('EVLRN', {
                    "nodeId": this.node,
                    "actionId": this.action,
                    "eventName": this.eventName,
                    "eventId": this.variable,
                    "eventVal": this.variableLocal
                })
            }
        }
    }
</script>

<style scoped>

</style>