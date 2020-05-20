import Vue from 'vue'
import App from './App.vue'
import vuetify from './plugins/vuetify'
import Vuex from 'vuex'
//import VueSocketIO from 'vue-socket.io'
import io from "socket.io-client"

//let nodes = require('../config/mergNodes_TEST.json')
//let events = require('../config/mergEvents_TEST.json')
//let layout = require('../config/layoutConfig.json')
//let eventDetails = require('../config/eventDetails.json')

Vue.config.productionTip = false

const socket = io('http://localhost:3000')

/*socket.on('events', function (data) {
  app.events = data;
});

socket.on('nodes', function (data) {
  // console.log(`Nodes Received:${JSON.stringify(data)}`)
  app.nodes = data;
});*/

/*Vue.use(new VueSocketIO({
    connection: socket
}))*/

Vue.use(Vuex)
import store from './store'

new Vue({
    data: {
        "events": [],
        nodes: [],
        cbusErrors: [],
        dccErrors: [],
        display_component: "hello_world",
        selected_node_id: 0,
        debug: false
    },
    created() {
        //this.$store.state.layout = layout
        //this.$store.state.eventDetails = eventDetails
        socket.on('nodes', (data) => {
            this.$store.state.nodes = data
        })
        socket.on('events', (data) => {
            this.$store.state.events = data
        })
        socket.on('cbusError', (data) => {
            this.$store.state.cbusErrors = data
        })
        socket.on('layoutDetails', (data) => {
            this.$store.state.layout = data
        })

    },
    methods : {
        send(type, data) {
            socket.emit(type,data)
        }
    }
    /*,
  sockets:{
    nodes: function(data) {
      this.nodes = data
    },
    events: function(data) {
      this.events = data
    }

  }*/,
    vuetify,
    render: h => h(App),
    store
}).$mount('#app')
