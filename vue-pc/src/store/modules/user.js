import Vue from "vue";

export const state = {
  //用户数据
  userData: {}
};
export const mutations = {
  //储存用户信息
  setUserData(state, data) {
    if (data) {
      state.userData = Object.assign({}, state.userData, data);
      window.sessionStorage.setItem("userData", JSON.stringify(state.userData));
    }
  },
  // 退出APP
  emptyUserData(state) {
    state.userData = {};
    window.sessionStorage.removeItem("userData");
  }
};
export const actions = {};
