import Vue from 'vue'
import App from './App'
import router from './router'
import store from './store'
import VueResource from 'vue-resource'
import apis from './apis'

Vue.config.productionTip = false

Vue.use(VueResource)

Vue.prototype.$apis = apis

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})
