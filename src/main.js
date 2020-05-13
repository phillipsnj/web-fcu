import Vue from 'vue'
import App from './App.vue'
import vuetify from './plugins/vuetify';

let nodes = require('../config/mergNodes_TEST.json')
let events = require('../config/mergEvents_TEST.json')
let layout = require('../config/layoutConfig.json')

Vue.config.productionTip = false

new Vue({
  data: {
    "events":events.events,
    nodes:nodes,
    cbusErrors:[],
    dccErrors:[],
    layout: layout,
    display_component: "hello_world",
    selected_node_id: 0,
    debug : false
  },
  vuetify,
  render: h => h(App)
}).$mount('#app')
