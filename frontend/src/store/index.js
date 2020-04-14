import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    user: {
      auth: false,
      token: '',
      id: '',
      feedStack: []
    }
  },
  getters: {
    user (state) {
      return state.user
    },
    feed (state) {
      return state.user.feedStack
    }
  },
  mutations: {
    setAuth (state, userAuth) {
      state.user = userAuth
      console.log(state.user)
    },
    removeAuth (state, userAuth) {
      state.user = {
        auth: false,
        token: '',
        id: '',
        feedstack: ''
      }
    },
    loadFeed (state, feedStack) {
      state.user.feedStack = feedStack
    }
  },
  actions: {
    setAuth ({ commit }, authData) {
      commit('setAuth', authData)
    },
    loadFeed ({ commit }, feedStack) {
      commit('loadFeed', feedStack)
    },
    logout ({ commit }, authData) {
      commit('removeAuth', authData)
    }
  },
  modules: {
  }
})
