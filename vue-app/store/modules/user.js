import Vue from "vue";
import { login, getInfo, logout } from '@/util/api/login'
export const state = {
  //用户数据
  userData: {
	  user:{
		  operId:'220e805b8521444e9f27d78e45633b44',
		  username:'test'
	  },
	  token:''
  },
};
export const mutations = {
  //储存用户信息
  setUserData(state, data) {
  	if (data) {
  		state.userData =  Object.assign({}, state.userData,data);
  		// #ifdef H5
  		window.sessionStorage.setItem('userData', JSON.stringify(state.userData));
  		// #endif
  		// #ifndef H5
  		uni.setStorageSync('userData', state.userData);
  		// #endif
  	}
  },
  // 退出APP
  emptyUserData(state) {
  	state.userData = {};
  	// #ifdef H5
  	window.sessionStorage.removeItem("userData");
  	// #endif
  	// #ifndef H5
  	uni.removeStorageSync("userData");
  	// #endif
  },
};
export const actions = {
    // 登录
      Login ({ commit }, userInfo) {
        return new Promise((resolve, reject) => {
          login(userInfo).then(response => {
            // 保证登录成功以后才来获取token
            if (response.code === 200) {
              const result = response.data
              localStorage.setItem('token', result.token)
            }
            // commit('SET_TOKEN', result.access_token)
            resolve(response)
          }).catch(error => {
            reject(error)
          })
        })
      },
  
      // 获取用户信息
      GetInfo ({ commit }) {
        return new Promise((resolve, reject) => {
          getInfo().then(response => {
            // const result = response.result
            const result = response.data
            if (result.roles && result.permissions.length > 0) {
              const user = result.user
              const avatar = user.avatar
              if (result.roles && result.roles.length > 0) { // 验证返回的roles是否是一个非空数组
                commit('SET_ROLES', result.roles)
                commit('SET_PERMISSION', result.permissions)
              } else {
                commit('SET_ROLES', ['ROLE_DEFAULT'])
              }
              // commit('SET_NAME', user.nickName)
              commit('SET_NAME', { name: user.nickName, welcome: welcome() })
              commit('SET_AVATAR', avatar)
              commit('SET_SEX', user.sex)
              commit('SET_EMAIL', user.email)
              commit('SET_PHONE', user.phonenumber)
              commit('SET_USER_ID', user.userId)
              resolve(response)
            }
            // GetInfo一旦失败就说明这个token不是过期就是丢失了,直接走catch并让调用方跳转路由
            if (result.code === 500) {
              reject(result)
            }
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
