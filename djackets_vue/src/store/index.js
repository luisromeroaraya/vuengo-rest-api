import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    cart: {
      items: [],
    },
    isAuthenticated: false,
    token: '',
    isLoading: false,
  },
  mutations: {
  },
  actions: {
  },
  modules: {
  }
})
