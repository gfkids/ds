import Vue from 'vue'
import 'babel-polyfill'
import axios from 'axios'
import * as firebase from 'firebase'
import App from './App.vue'
import store from "./store/store.js"
import router from './router'
import DateFilter from './filters/date.js'
import "core-js/modules/es6.promise"
import "core-js/modules/es6.array.iterator"
import {i18n} from './plugins/i18n.js'
import './plugins/vuetify'
import VApp from 'vuetify/es5/components/VApp/VApp'
import materialIcons from 'material-design-icons-iconfont/dist/material-design-icons.css'

export default {
  name: 'app',
  components: {
    VApp
  }
}

Vue.config.productionTip = false
axios.defaults.baseURL = 'https://vue-city.firebaseio.com'
Vue.filter('date', DateFilter)

new Vue({
  i18n,
  store,
  router,
  render: h => h(App),
  created () {
    firebase.initializeApp({
      apiKey: 'AIzaSyDNMxHSzaOvcKd6E8GasiSoIRXlm7k7x_4',
      authDomain: 'vue-city.firebaseapp.com',
      databaseURL: 'https://vue-city.firebaseio.com',
      projectId: 'vue-city',
      storageBucket: 'gs://vue-city.appspot.com',
    })
    // firebase.auth().onAuthStateChanged((user) =>{
    //   if (user) {
    //     this.$store.dispatch('tryAutoSignin', user)
    //   } else {
    //     this.$store.getters.userId
    //   }
    // })
    firebase.auth().useDeviceLanguage()
  }
}).$mount('#app')

// import( webpackChunkName: "materialIcons", webpackPreLoad: true   'material-design-icons-iconfont/dist/material-design-icons.css')


