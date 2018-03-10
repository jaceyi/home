import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const store = new Vuex.Store({
  state: {
    userinfo: {},
    navIsShow: true,
    navDefaultActive: '/personal'
  },
  mutations: {
    setUserinfo (state, userinfo) {
      state.userinfo = userinfo
    },
    tabNavShow (state) {
      state.navIsShow = !state.navIsShow
    },
    setNavDefaultActive (state, path) {
      state.navDefaultActive = path
    }
  }
})

export default store
