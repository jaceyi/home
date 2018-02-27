const store = {
  state: {
    navActive: 0,
    userInfo: {}
  },
  mutations: {
    setUserInfo (state, userInfo) {
      state.userInfo = userInfo
    }
  },
  commit (fn, ...args) {
    const mutation = this.mutations[fn]
    if (mutation) {
      mutation(this.state, args[0])
    }
  }
}

export default store
