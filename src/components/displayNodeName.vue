<template>
    <v-container>
        <div v-if="id in $store.state.layout.nodeDetails" :class="displayColour">{{ displayName }}</div>
        <div v-else class="black--text">Node : {{ id }}</div>
    </v-container>
</template>

<script>
    export default {
        name: "displayNodeName",
        props: ['id'],
        data: () => ({
            label: "",
        }),
        computed: {
            displayName: function() {
                return this.$store.state.layout.nodeDetails[this.id].name
            },
            displayColour: function() {
                return this.$store.state.layout.nodeDetails[this.id].colour+'--text'
            }
        }
    }
</script>

<style scoped>

</style>