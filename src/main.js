// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import * as frb from 'firebase'
import router from './router'
import store from './store'
import Vuetify from 'vuetify'
import 'vuetify/dist/vuetify.min.css'

Vue.use(Vuetify)

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>',
  created () {
  // Initialize Firebase
    var config = {
      apiKey: 'AIzaSyCYQzagt136nSbFtOmdJV6nE8m4It3irHw',
      authDomain: 'vue-currency-1.firebaseapp.com',
      databaseURL: 'https://vue-currency-1.firebaseio.com',
      projectId: 'vue-currency-1',
      storageBucket: 'vue-currency-1.appspot.com',
      messagingSenderId: '1061635324303'
    }
    frb.initializeApp(config)

    this.$store.dispatch('fetchCurrencies')
  }
})
