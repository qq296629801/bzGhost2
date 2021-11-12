import Vue from "vue";
import { login } from '@/utils/api/login.js'
export const state = {
  //用户数据
  userData: {},
  user: {},
  token: '',
  config: {},
  permissions: [],
  roles: []
};
export const mutations = {
  SET_PERMISSION(state, permissions){
    if(permissions){
      state.permissions = permissions
    }
  },
  SET_ROLES(state, roles){
    if(roles){
      state.roles = roles
    }
  },
  SET_USER(state, user){
    if(user){
      state.user = user
    }
  },
  SET_TOKEN(state, token){
    if(token){
      state.token = token
    }
  },
  setUserData(state, data) {
    if (data) {
      state.userData = Object.assign({}, state.userData, data);
    }
  },
  emptyUserData(state) {
    state.userData = {};
  }
};
export const actions = {
    // 登录
    Login ({ commit }, userInfo) {
      return new Promise((resolve, reject) => {
        login(userInfo).then(response => {
          // 保证登录成功以后才来获取token
          if (response.code === 200) {
            const result = response.data
            commit('setUserData', result)
            commit('SET_TOKEN',result.token)
            commit('SET_USER',result.user)
            if (result.roles && result.roles.length > 0) {
             commit('SET_ROLES', result.roles)
             commit('SET_PERMISSION', result.permissions)
              } else {
                commit('SET_ROLES', ['ROLE_DEFAULT'])
              }
            localStorage.setItem('token', result.token)
          }
          resolve(response)
        }).catch(error => {
          reject(error)
        })
      })
    },
    // 登出
    Logout ({ commit, state }) {
      return new Promise((resolve, reject) => {
        logout(state.token).then(() => {
          commit('SET_TOKEN', '')
          commit('SET_ROLES', [])
          commit('SET_PERMISSION', [])
          // storage.remove(ACCESS_TOKEN)
          localStorage.removeItem('token')
          resolve()
        }).catch((error) => {
          reject(error)
        }).finally(() => {
        })
      })
    }
};
