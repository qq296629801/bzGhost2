import Vue from "vue";
export const state = {
  user: {},
  token:'',
  
};
export const mutations = {
  //储存用户信息
  setUser(state, data) {
  	if (data) {
  		state.user =  Object.assign({}, state.user, data);
  	}
  },
  // 退出APP
  emptyUser(state) {
  	state.user = {};
	//清空缓存
  },
};
export const actions = {
};
