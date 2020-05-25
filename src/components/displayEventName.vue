<template>
    <v-container>
        <div v-if="id in $store.state.layout.eventDetails" :class="displayColour">{{ displayName }}</div>
        <div v-else class="black--text">Node : {{ nodeId }} - Event : {{ eventId }}</div>
    </v-container>
</template>

<script>
    export default {
        name: "displayEventName",
        props: ['id'],
        data: () => ({
            label: "",
        }),
        computed: {
            nodeId: function() {
                return parseInt(this.id.substr(0, 4), 16);
            },
            eventId: function() {
                return parseInt(this.id.substr(4, 4), 16);
            },
            displayName: function() {
                return this.$store.state.layout.eventDetails[this.id].name
            },
            displayColour: function() {
                return this.$store.state.layout.eventDetails[this.id].colour+'--text'
            }
        }
    }
</script>

<style scoped>

</style>