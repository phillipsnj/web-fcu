<template>
    <v-card class="xs6 md3 pa-3" flat>
        <v-checkbox min-width="100"
                    v-model="checked"
                    :label="name"
                    @change="updateNV"
        ></v-checkbox>
        <!--            <h3> Var {{ $store.state.nodes[node].variables[variable] }} :: {{ variableValue }}:: {{ checked }} :: {{ bitValue }} </h3>-->
    </v-card>
</template>
<script>

    export default {
        name: 'NodeBitVariable',
        data: () => ({
            checked: false,
            bitValue: 0,
            bitArray: {0: 1, 1: 2, 2: 4, 3: 8, 4: 16, 5: 32, 6: 64, 7: 128},
            label: "",
            //nodes: {}
            //variableValue : this.value
        }),
        props: ['node', 'variable', 'bit', 'name'],
        mounted() {
            //this.nodes = this.$store.state.nodes
            this.bitValue = this.bitArray[this.bit]
            this.checked = this.$store.state.nodes[this.node].variables[this.variable] & this.bitArray[this.bit] ? true : false
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
                return this.$store.state.nodes[this.node].variables[this.variable]
            }
        },
        methods: {
            updateNV: function () {
                let value = this.$store.state.nodes[this.node].variables[this.variable]
                //console.log(`Old Value : ${value}`)
                if (this.checked) {
                    value = value + this.bitArray[this.bit]
                } else {
                    value = value - this.bitArray[this.bit]
                }
                this.$root.send('NVSET', {
                    "nodeId": this.node,
                    "variableId": this.variable,
                    "variableValue": value
                })
                console.log(`Stored : ${this.$store.state.nodes[this.node].variables[this.variable]}`)
            }
        }
    }

</script>

<style scoped>

</style>
