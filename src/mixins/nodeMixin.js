export const nodeMixin = {
    data: function () {
        return {
            nodeId: 0,
            eventDialog: false,
            editedEvent: {event: "0", variables: [], actionId: 1},
            SelectedVariable: 1,
            SelectedEvent: 1,
            SelectedEventVariable: 1,
            //VariableIndexes: [...Array(node.parameters[6] + 1).keys()],
            EventIndex: [1],
            expand: false,
            eventHeaders: [
                {
                    text: 'Event ID',
                    align: 'left',
                    value: 'event'
                }, {
                    text: "Action ID",
                    value: 'actionId'
                }, {text: 'Actions', value: 'actions', sortable: false}
            ]
        }
    },
    created: function () {
        console.log('nodeMixin hook called')
    },
    mounted() {
        //console.log(`mounted : ${this.nodeId} :: ${this.node.node} :: ${this.node.EvCount}`)
        //this.nodeId = this.$root.$data.selected_node_id
        /*for (let i = 1; i <= this.node.parameters[0]; i++) {
            this.$socket.emit('RQNPN', {"nodeId": this.node.node, "parameter": i})
        }*/
        //this.$socket.emit('NVRD', {"nodeId": this.nodeId, "variableId": 1})
        //this.getVariable(1)

        // eslint-disable-next-line no-console
        //console.log(`Mounted Completed: ${this.nodeId} :: ${this.node.node} :: ${this.node.EvCount}`)
        /*if (this.node.EvCount > 0) {
            this.$socket.emit('NERD', {"nodeId": this.nodeId})
        }*/
        this.nodeId = this.$root.$data.selected_node_id
        console.log(`Mounted Completed: ${this.nodeId} `)
    },
    computed: {
        debug: function () {
            return this.$root.$data.debug
        },
        node: function () {
            return this.$root.$data.nodes[this.$root.$data.selected_node_id]
        },
        moduleVersion: function () {
            return `${this.node.parameters[7]}.${String.fromCharCode(this.node.parameters[2])}`
        },
        VariableIndexes: function () {
            return [...Array(this.node.parameters[6] + 1).keys()]
            //return [...Array(this.$store.state.selected_node.parameters[0] + 1).keys()]
        }
    },
    methods: {
        getVariable: function (id) {
            console.log('getVariable : ' + id)
        },
        updateNV: function (node_id, variableId, variableValue) {
            // eslint-disable-next-line no-console
            console.log(`updateNV(${variableId},${variableValue})`)
            /*this.$socket.emit('NVSET', {
                "nodeId": this.node.node,
                "variableId": variableId,
                "variableValue": variableValue
            })*/
        },
        createSelectIndex: function (start, finish) {
            let output = []
            for (let i = start; i <= finish; i++) {
                output.push(i)
            }
            return output
        },
        editEvent: function (item) {
            // eslint-disable-next-line no-console
            console.log(`editEvent(${item.event})`)
            this.getEventVariables(item.actionId)
            this.eventDialog = true
            this.editedEvent = item

        },
        updateEV: function (nodeId, eventName, actionId, eventId, eventVal) {
            // eslint-disable-next-line no-console
            console.log(`editEvent(${nodeId},${eventName},${actionId},${eventId},${eventVal}`)
            /*this.$socket.emit('EVLRN', {
                "nodeId": this.node.node,
                "actionId": actionId,
                "eventName": eventName,
                "eventId": eventId,
                "eventVal": eventVal
            })*/
        },
        getEventVariables: function (actionId) {
            // eslint-disable-next-line no-console
            console.log(`getEventVariables(${actionId})`)
            //console.log(`getEventVariables() ${this.node.actions[actionId].variables[0]}`)
            //this.EventIndex = [...Array(this.node.actions[actionId].variables[0]).keys()]
            this.EventIndex = this.createSelectIndex(1, this.node.parameters[5])
            //this.EventIndex = [1,2,3]
            //this.SelectedEventVariable = actionId
            /*for (let i = 1; i <= this.node.parameters[5]; i++) {
                this.$socket.emit('REVAL', {"nodeId": this.node.node, "actionId": actionId, "valueId": i})
            }*/

        },
        getAllEventVariables: function () {
            // eslint-disable-next-line no-console
            //console.log(`getAllEventVariables() : ${Object.keys(this.node.actions).length}`)
            for (let i = 1; i <= Object.keys(this.node.actions).length; i++) {
                this.getEventVariables(i)
            }
            // eslint-disable-next-line no-console
            console.log(`getAllEventVariables() Completed : ${Object.keys(this.node.actions).length}`)
        },
        deleteEvent: function (event) {
            // eslint-disable-next-line no-console
            console.log(`deleteEvent : ${this.node.node} : ${event}`)
            //this.$socket.emit('EVULN', {"nodeId": this.node.node, "eventName": event})
        },
        getArray: function (byteArray) {
            let output = []
            output.push(byteArray & 1 ? 1 : 0)
            output.push(byteArray & 2 ? 2 : 0)
            output.push(byteArray & 4 ? 4 : 0)
            output.push(byteArray & 8 ? 8 : 0)
            output.push(byteArray & 16 ? 16 : 0)
            output.push(byteArray & 32 ? 32 : 0)
            output.push(byteArray & 64 ? 64 : 0)
            output.push(byteArray & 128 ? 128 : 0)
            // eslint-disable-next-line no-console
            console.log(`Method Set Flags Array : ${byteArray} ::  ${output}`)
            return output
        },
        sumArray: function (arr) {
            return arr
                .map(function (elt) { // assure the value can be converted into an integer
                    return /^\d+$/.test(elt) ? parseInt(elt) : 0;
                })
                .reduce(function (a, b) { // sum all resulting numbers
                    return a + b
                })
        }
    }
}
