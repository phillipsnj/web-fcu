<template>
    <v-container>
        <v-col cols="12" sm="6" md="4">
            <v-text-field outlined
                          label="Name"
                          placeholder="Nama"
                          v-model=nodeDetails.name
                          @change="update()"
            >
            </v-text-field>
        </v-col>
        <v-col cols="12" sm="6" md="4">
            <v-select
                    label="Colour"
                    v-model="nodeDetails.colour"
                    :items="$store.state.colours"
                    outlined
                    @change="update()"
            ></v-select>
        </v-col>
    </v-container>
</template>

<script>
    export default {
        name: "nodeDetails",
        data: () => ({
            nodeDetails: {
                name: "Test",
                colour: "black"
            }
        }),
        props: ['nodeId'],
        mounted() {
            if (this.nodeId in this.$store.state.layout.nodeDetails) {
                this.nodeDetails.name = this.$store.state.layout.nodeDetails[this.nodeId].name
                this.nodeDetails.colour = this.$store.state.layout.nodeDetails[this.nodeId].colour
            }
        },
        computed: {
            debug: function () {
                return this.$store.state.debug
            },
            node: function () {
                return this.$store.state.nodes[this.nodeId]
            }
        },
        methods: {
            update() {
                this.$store.state.layout.nodeDetails[this.nodeId] = {}
                this.$store.state.layout.nodeDetails[this.nodeId].name = this.nodeDetails.name
                this.$store.state.layout.nodeDetails[this.nodeId].colour = this.nodeDetails.colour
                this.$root.send('UPDATE_LAYOUT_DETAILS', this.$store.state.layout)
            }
        }
    }
</script>

<style scoped>

</style>