<template>
    <v-container>
        <v-data-table :headers="headers"
                      :items="Object.values($store.state.cbusErrors)"
                      :items-per-page="5"
                      class="elevation-1">
            <template v-slot:top>
                <v-toolbar flat>
                    <v-toolbar-title>CBus Errors</v-toolbar-title>
                    <v-spacer></v-spacer>
                    <v-btn color="blue darken-1" text @click="$root.send('CLEAR_CBUS_ERRORS')">Clear Errors</v-btn>
                </v-toolbar>
            </template>
        </v-data-table>
        <v-row v-if="$store.state.debug">
            <h2>Debug Mode</h2>
        </v-row>
    </v-container>
</template>

<script>
    export default {
        name: "cbusErrors",
        data: function () {
            return {
                headers: [
                    {text: 'id', value: 'id'},
                    {text: 'type', value: 'type'},
                    {text: 'Error', value: 'Error'},
                    {text: 'node', value: 'node'},
                    {text: 'count', value: 'count'},
                    {text: 'Message', value: 'Message'},
                ]
            }
        }
    }
</script>

<style scoped>

</style>