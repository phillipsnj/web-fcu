<template>
    <v-container>
        <v-row>
            <v-col cols="6">
                <v-text-field label="Title"
                              placeholder="Title"
                              v-model="title"
                              @change="updateTitle()">
                </v-text-field>
                <v-text-field label="Sub Title"
                              placeholder="Sub Title"
                              v-model="subTitle"
                              @change="updateSubTitle()">
                </v-text-field>
                <v-text-field label="Sub Title Alternative"
                              placeholder="Sub Title"
                              v-model="$store.state.layout.subTitle">
                </v-text-field>
                <v-checkbox
                        v-model="$store.state.debug"
                        label="Debug Mode">
                </v-checkbox>
            </v-col>
        </v-row>
        <v-row v-if="$store.state.debug">
            <h2>Debug Mode</h2>
            <p>{{ $store.state.layout }}</p>
        </v-row>
    </v-container>

</template>

<script>

    export default {
        name: 'settings',
        data: function () {
            return {
                title: this.$store.state.layout.title,
                subTitle: this.$store.state.layout.subTitle,
            }
        },
        methods: {
            updateTitle() {
                this.$store.state.layout.title = this.title
            },
            updateSubTitle() {
                this.$store.state.layout.subTitle = this.subTitle
            },
        },
    }

</script>
