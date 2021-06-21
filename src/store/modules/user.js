
const state = {
}
const mutations = {
}
const actions = {
  tryAutoSignin ({commit}) {
    const token = localStorage.getItem('token')
    if(!token) {
      return
    }
    const expirationDate = localStorage.getItem('expirationDate')
    const now = Math.floor(Date.now())
    if(now >= expirationDate) {
      return
    }
    const userId = localStorage.getItem('userId')
    commit('authUser', {
      token: token,
      userId: userId
    })
  }
}
const getters = {
}

export default {
  state,
  actions,
  mutations,
  getters
}

