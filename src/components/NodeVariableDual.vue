<template>
    <v-card class="pa-2" flat>
        <v-text-field
                :label="label"
                v-model="variableLocal"
                outlined
                @change="updateNV"
                :readonly="isReadonly"
        >
        </v-text-field>
    </v-card>
</template>

<script>
    export default {
        name: "NodeVariable",
        data: () => ({
            label: "",
            variableLocal: 0,
            isReadonly : false
        }),
        props: ['node', 'variable1', 'variable2', 'name', 'readonly'],
        mounted() {
            this.variableLocal = (this.$store.state.nodes[this.node].variables[this.variable1] << 8) +this.$store.state.nodes[this.node].variables[this.variable2]
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
                this.variableLocal = (this.$store.state.nodes[this.node].variables[this.variable1] <<8) +this.$store.state.nodes[this.node].variables[this.variable2]
            }
        },
        computed: {
            variableValue: function() {
                return (this.$store.state.nodes[this.node].variables[this.variable1] <<8) +this.$store.state.nodes[this.node].variables[this.variable2]
            }
        },
        methods: {
            updateNV: function () {
                this.$root.send('NVSET', {
                    "nodeId": this.node,
                    "variableId": this.variable1,
                    "variableValue": this.variableLocal >> 8
                })
                this.$root.send('NVSET', {
                    "nodeId": this.node,
                    "variableId": this.variable2,
                    "variableValue": this.variableLocal & 0xFF
                })
            }
        }
    }
</script>

<style scoped>

</style>