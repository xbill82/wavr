import Vue from 'vue'
import App from './App'
import store from './store'

Vue.config.keyCodes = {
  next: [39],
  prev: [37]
}

/* eslint-disable no-new */
new Vue({
  el: '#app',
  store,
  render: h => h(App)
})
