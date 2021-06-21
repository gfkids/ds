import Vue from "vue"
import Vuex from "vuex"
// import axios from './../axios-auth'
// import globalAxios from 'axios'
// import * as firebase from 'firebase'
// import router from '../router.js'
import outlay from './modules/outlay.js'
import user from './modules/user.js'
import * as actions from './actions.js'
import * as mutations from './mutations.js'
import * as getters from './getters.js'


Vue.use(Vuex)
const store = new Vuex.Store({
  state: {
    projects: [],
    project: [],
    error: false,
    success: false,
    loading: false,
    projectContacts: [],
    idToken: null,
    userId: null,
    user: {},
    resetError: null,
    resetSuccess: null,
  },
  mutations,
  actions,
  getters,
  modules: {
      outlay,
      user
    }
  })
export default store


