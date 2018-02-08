import Vuex from 'vuex'
import Vue from 'vue'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    bgUrlNum: Math.floor(Math.random() * 13 + 1),
    shadowShow: false,
    activeNav: -1,
    alert: false,
    alertOptions: {}
  },
  mutations: {
    changeBgUrlNum (state) {
      let num = state.bgUrlNum
      num += 1
      if (num === 14) {
        num = 1
      }
      state.bgUrlNum = num
    },
    tabShadowShow (state, is) {
      state.shadowShow = is
    },
    tabActiveNav (state, num) {
      state.activeNav = num
    },
    alert (state, options) {
      state.alert = true
      state.alertOptions = {
        ...options
      }
    },
    alertHide (state) {
      state.alert = false
    }
  }
})
