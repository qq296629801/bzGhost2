import Vue from "vue";

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
  
};
