import outlayBakerEn from "./../../data/outlay-baker-en.js"
import outlayBakerRu from "./../../data/outlay-baker-ru.js"


const state = {
  outlayBaker: outlayBakerRu
}
const mutations = {
  'setOutlay' (state, payload) {
    if (payload === 'ru'){
        state.outlayBaker = outlayBakerRu
    } else if (payload === 'en'){
        state.outlayBaker = outlayBakerEn
    }
  }
}
const actions = {
  'initOutlay' ({commit}, payload) {
    commit('setOutlay',  payload)
  }
}
const getters = {
  outlayBaker(state) {
    return state.outlayBaker
  }
}

export default {
  state,
  actions,
  mutations,
  getters
}

