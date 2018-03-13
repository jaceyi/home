import Vuex from 'vuex'
import Vue from 'vue'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    bgUrlNum: Math.floor(Math.random() * 13 + 1),
    shadowShow: false,
    activeNav: -1,
    isAlert: false,
    isMessage: false,
    alertOptions: {},
    messageOptions: {},
    currentClass: '',
    mainNavShow: true
  },
  mutations: {
    setCurrentClass (state, className) {
      state.currentClass = className
    },
    changeBgUrlNum (state, number) {
      if (number) {
        state.bgUrlNum = number
      }
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
      state.isAlert = true
      state.alertOptions = {
        ...options
      }
    },
    alertHide (state) {
      state.isAlert = false
    },
    message (state, options) {
      state.isMessage = true
      state.messageOptions = {
        ...options
      }
    },
    messageHide (state) {
      state.isMessage = false
    },
    setMainNavShow (state, is) {
      state.mainNavShow = is
    }
  }
})
