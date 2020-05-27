import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'
import swal from 'sweetalert';
import createPersistedState from "vuex-persistedstate";

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    status: '',
    token: localStorage.getItem('token') || '',
    user: {}
  },

  plugins: [createPersistedState()],

  mutations: {
    auth_request(state){
      state.status = 'loading'
    },
    auth_success(state, {token, user}){
      state.status = 'success'
      state.token = token
      state.user = user
    },
    auth_error(state){
      state.status = 'error'
    },
    logout(state){
      state.status = ''
      state.token = ''
      state.user = {}
    },
  },
  actions: {
    login({commit}, payload){
      return new Promise((resolve, reject) => {
        commit('auth_request')
        const path = "http://localhost:5000/login";
        axios.post(path, payload)
        .then(res => {
          const token = res.data.token
          if(res.data.NoFound){
            swal(res.data.NoFound);
            commit('auth_error');
            localStorage.removeItem('token')
        }
          if(res.data.user){
            const user = res.data.user[0]
            console.log(user)
            localStorage.setItem('token', token)
            axios.defaults.headers.common['Authorization'] = token
            commit('auth_success', {token, user})
            resolve(res)
          }
        })
        .catch(err => {
          commit('auth_error')
          console.log("error")
          localStorage.removeItem('token')
          reject(err)
        })
      })
  },
  logout({commit}){
    return new Promise((resolve) => {
      commit('logout')
      localStorage.removeItem('token')
      delete axios.defaults.headers.common['Authorization']
      resolve()
    })
  }
  },
  modules: {
  },
  getters : {
    isLoggedIn: state => !!state.token,
    authStatus: state => state.status,
  }
})
