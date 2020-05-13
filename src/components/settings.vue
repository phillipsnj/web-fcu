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
                              v-model="$root.$data.layout.subTitle">
                </v-text-field>
                <v-checkbox
                        v-model="$root.$data.debug"
                        label="Debug Mode">
                </v-checkbox>
            </v-col>
        </v-row>
        <v-row v-if="$root.$data.debug">
            <h2>Debug Mode</h2>
            <p>{{ $root.$data.layout }}</p>
        </v-row>
    </v-container>

</template>

<script>

    export default {
        name: 'settings',
        data: function () {
            return {
                title: this.$root.$data.layout.title,
                subTitle: this.$root.$data.layout.subTitle,
            }
        },
        methods: {
            updateTitle() {
                this.$root.$data.layout.title = this.title
            },
            updateSubTitle() {
                this.$root.$data.layout.subTitle = this.subTitle
            },
        },
    }

</script>
