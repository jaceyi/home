import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const store = new Vuex.Store({
  state: {
    navIsCollapse: false,
    navActive: 0
  },
  mutations: {
    tabNavCollapse: state => {
      state.navIsCollapse = !state.navIsCollapse
    },
    tabNavActive: (state, i) => {
      state.navActive = i
    }
  }
})

export default store
