import Vue from 'vue'
import App from './App'
import store from './store'
import Router from 'vue-router'
import Master from './Components/Master'
import TextSlave from './Components/TextSlave'

Vue.use(Router)
Vue.config.keyCodes = {
  next: [51, 39],
  prev: [49, 37],
  play: [50, 32]
}

let router = new Router({
  routes: [
    { path: '/', component: Master },
    { path: '/slave', component: TextSlave }
  ]
})

/* eslint-disable no-new */
new Vue({
  el: '#app',
  store,
  router,
  render: h => h(App)
})
