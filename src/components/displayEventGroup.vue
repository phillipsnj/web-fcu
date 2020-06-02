<template>
    <v-container>
        <div>{{ groupName }}</div>
    </v-container>
</template>

<script>
    export default {
        name: "displayEventGroup",
        props: ["id"],
        computed : {
            groupName () {
                return this.$store.state.layout.eventDetails[this.id].group
            }
        }
    }
</script>

<style scoped>

</style>