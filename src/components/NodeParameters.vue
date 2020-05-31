
<template>
    <v-container>
<!--        <h1> Parameters {{ node.node }}</h1>-->
        <v-container>
            <v-row>
                <v-card class="xs6 md3 pa-3" flat>
                    <v-text-field label="Manufacturer Id" placeholder="Manufacturer Id" readonly
                                  :value=node.parameters[1]></v-text-field>
                </v-card>
                <v-card class="xs6 md3 pa-3" flat>
                    <v-text-field label="Module" placeholder="Module" readonly
                                  :value=node.module></v-text-field>
                </v-card>
                <v-card class="xs6 md3 pa-3" flat>
                    <v-text-field label="Version" placeholder="Version" readonly
                                  :value=moduleVersion></v-text-field>
                </v-card>
                <v-card class="xs6 md3 pa-3" flat>
                    <v-text-field label="Variables" placeholder="Variables" readonly
                                  :value=node.parameters[6]></v-text-field>
                </v-card>
            </v-row>
            <v-row>
                <v-card class="xs6 md3 pa-3" flat>
                    <v-text-field label="Event Variables" placeholder="Event Variables" readonly
                                  :value=node.parameters[5]></v-text-field>
                </v-card>
                <v-card class="xs6 md3 pa-3" flat>
                    <v-text-field label="Supported Events" placeholder="Supported Events" readonly
                                  :value=node.parameters[4]></v-text-field>
                </v-card>
                <v-card class="xs6 md3 pa-3" flat>
                    <v-text-field label="Consumer" placeholder="Consumer" readonly
                                  :value=node.consumer></v-text-field>
                </v-card>
                <v-card class="xs6 md3 pa-3" flat>
                    <v-text-field label="Producer" placeholder="Producer" readonly
                                  :value=node.producer></v-text-field>
                </v-card>
            </v-row>
            <v-row>
                <v-card class="xs6 md3 pa-3" flat>
                    <v-text-field label="Bootloader" placeholder="Bootloader" readonly
                                  :value=node.bootloader></v-text-field>
                </v-card>
                <v-card class="xs6 md3 pa-3" flat>
                    <v-text-field label="Consume own events" placeholder="Consume own events"
                                  readonly
                                  :value=node.coe></v-text-field>
                </v-card>
                <v-card class="xs6 md3 pa-3" flat>
                    <v-text-field label="Parameters" placeholder="Parameters" readonly
                                  :value=node.parameters[0]></v-text-field>
                </v-card>
            </v-row>

        </v-container>
        <h3>Flags</h3>
        <v-container>
            <v-row>
                <v-card class="xs6 md3 pa-3" flat>
                    <v-text-field label="Parameter Flags" placeholder="Flags"
                                  readonly
                                  :value=node.flags></v-text-field>
                </v-card>
                <v-card class="xs6 md3 pa-3" flat>
                    <v-text-field label="Variables Flags" placeholder="Flags"
                                  readonly
                                  :value=node.parameters[8]></v-text-field>
                </v-card>
                <v-card class="xs6 md3 pa-3" flat>
                    <v-text-field label="Events" placeholder="Flags"
                                  readonly
                                  :value=node.EvCount></v-text-field>
                </v-card>
                <v-card class="xs6 md3 pa-3" flat>
                    <v-text-field label="NERD Events" placeholder="NERD Events"
                                  readonly
                                  :value=Object.values(node.actions).length></v-text-field>
                </v-card>
            </v-row>
        </v-container>
    </v-container>
</template>

<script>
    export default {
        data: () => ({}),
        props: ['node'],
        computed  : {
            moduleVersion: function () {
                return `${this.node.parameters[7]}.${String.fromCharCode(this.node.parameters[2])}`
            }
        }
    }
</script>

<style scoped></style>>