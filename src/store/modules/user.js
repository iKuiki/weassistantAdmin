import { login, logout, getInfo } from '@/api/user'
import { getToken, setToken, removeToken } from '@/utils/auth'
import { resetRouter } from '@/router'

const state = {
  token: getToken(),
  uid: 0,
  account: '',
  name: ''
}

const mutations = {
  SET_TOKEN: (state, token) => {
    state.token = token
  },
  SET_UID: (state, uid) => {
    state.uid = uid
  },
  SET_ACCOUNT: (state, account) => {
    state.account = account
  },
  SET_NAME: (state, name) => {
    state.name = name
  }
}

const actions = {
  // user login
  login({ commit }, userInfo) {
    const { account, password } = userInfo
    return new Promise((resolve, reject) => {
      login({ username: account.trim(), password: password })
        .then(response => {
          const { data } = response
          commit('SET_TOKEN', data.token)
          setToken(data.token)
          resolve()
        })
        .catch(error => {
          reject(error)
        })
    })
  },

  // get user info
  getInfo({ commit, state }) {
    return new Promise((resolve, reject) => {
      getInfo(state.token)
        .then(response => {
          const { data } = response

          if (!data) {
            reject('Verification failed, please Login again.')
          }

          const { id, account, name } = data

          commit('SET_UID', id)
          commit('SET_ACCOUNT', account)
          commit('SET_NAME', name)
          resolve(data)
        })
        .catch(error => {
          reject(error)
        })
    })
  },

  // user logout
  logout({ commit, state }) {
    return new Promise((resolve, reject) => {
      logout(state.token)
        .then(() => {
          commit('SET_TOKEN', '')
          removeToken()
          resetRouter()
          resolve()
        })
        .catch(error => {
          reject(error)
        })
    })
  },

  // remove token
  resetToken({ commit }) {
    return new Promise(resolve => {
      commit('SET_TOKEN', '')
      removeToken()
      resolve()
    })
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
