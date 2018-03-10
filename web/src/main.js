import Vue from 'vue'
import App from './App'
import router from './router'
import store from './store'
import axios from 'axios'
import VueAxios from 'vue-axios'
import apis from './apis'

Vue.use(VueAxios, axios)

Vue.prototype.$apis = apis

Vue.mixin({
  methods: {
    alert (options) {
      this.$store.commit('alert', options)
    },
    message (options) {
      this.$store.commit('message', options)
    }
  }
})

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})
