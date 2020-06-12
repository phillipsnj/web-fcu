<template>
    <v-card class="pa-2" flat>
        <v-text-field
                :label="label"
                v-model="variableLocal"
                outlined
                @change="updateNV"
                :readonly="isReadonly"
                :rules="rules"
        >
        </v-text-field>
    </v-card>
</template>

<script>
    export default {
        name: "NodeVariable",
        data: () => ({
            rules: [
                value => !!value || 'Required',
                value => value >= 0 || 'Cannot be a negative number',
                value => value <= 255 || 'Number to High'
            ],
            label: "",
            variableLocal: 0,
            isReadonly : false
        }),
        props: ['node', 'variable', 'name', 'readonly'],
        mounted() {
            this.variableLocal = this.$store.state.nodes[this.node].variables[this.variable]
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
                this.variableLocal = this.$store.state.nodes[this.node].variables[this.variable]
            }
        },
        computed: {
            variableValue: function() {
                return this.$store.state.nodes[this.node].variables[this.variable]
            }
        },
        methods: {
            updateNV: function () {
                this.$root.send('NVSET', {
                    "nodeId": this.node,
                    "variableId": this.variable,
                    "variableValue": this.variableLocal
                })
            }
        }
    }
</script>

<style scoped>

</style>