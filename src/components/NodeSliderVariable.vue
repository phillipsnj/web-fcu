<template>
    <v-container>
        <v-card class="xs6 md3 pa-3" flat>
            <v-text-field
                    :label="label"
                    readonly
                    :value=variableLocal>
            </v-text-field>
            <v-slider
                    v-model="variableLocal"
                    class="align-center"
                    :max="234"
                    :min="0"
                    hide-details
                    @change="updateNV(variableLocal)"
            >

                <template v-slot:prepend>
                    <v-icon color="blue" @click="updateNV(variableLocal-1)">
                        mdi-minus
                    </v-icon>
                </template>
                <template v-slot:append>
                    <v-icon color="blue" @click="updateNV(variableLocal+1)">
                        mdi-plus
                    </v-icon>
                </template>
            </v-slider>
        </v-card>
    </v-container>
</template>

<script>
    export default {
        name: "NodeVariable",
        data: () => ({
            label: "",
            variableLocal: 0,
            isReadonly: false
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
            variableValue: function () {
                return this.$store.state.nodes[this.node].variables[this.variable]
            }
        },
        methods: {
            updateNV: function (position) {
                this.$root.send('NVSET', {
                    "nodeId": this.node,
                    "variableId": this.variable,
                    "variableValue": position
                })
            }
        }
    }
</script>

<style scoped>

</style>