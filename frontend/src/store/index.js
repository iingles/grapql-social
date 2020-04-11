import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    user: {
      auth: false,
      token: '',
      id: ''
    }
  },
  getters: {
    user (state) {
      return state.user
    }
  },
  mutations: {
    setAuth (state, userAuth) {
      state.user.auth = userAuth.auth
      state.user.token = userAuth.token
      state.user.id = userAuth.id
    }
  },
  actions: {
    setAuth ({ commit }, authData) {
      commit('setAuth', authData)
      console.log(authData)
    }
  },
  modules: {
  }
})
