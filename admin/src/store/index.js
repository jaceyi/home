import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const store = new Vuex.Store({
  state: {
    userinfo: {},
    navIsShow: true
  },
  mutations: {
    setUserinfo (state, userinfo) {
      state.userinfo = userinfo
    },
    tabNavShow (state) {
      state.navIsShow = !state.navIsShow
    }
  }
})

export default store
