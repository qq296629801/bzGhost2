import Vue from "vue";

export const state = {
  //webView地址
  webViewUrl: "",
  // 加载动画
  loadingShow: false,
  //微信场景参数
  chatScenesInfo: {},
  //登录弹窗状态
  loginPopupShow: false,
  //当前位置
  currentAddress: {
  	areaName: "请选择",
  	areaId: ''
  },
  chatObj:{
	  chatId:'10b371b3518e4c87bc553b028c1a8d38',
	  chatName:'商家A',
	  avatar:'/static/image/huge.jpg',
	  chatType:0
  },
  packet:{},
  newsPush:{}
};
//缓存浏览器的数据名称
const cacheNameList = ["userData", "webViewUrl"];
let clearTime;
export const mutations = {
	// 
	setNewsPush(state, data){
		if(data){
			state.newsPush = data
		}
	},
	// 
	setChatObj(state, data){
		if(data){
			state.chatObj = data
		}
	},
  //取出缓存数据（打开APP就取出）
  setCacheData(state) {
  	for (let name of cacheNameList) {
		let data;
  		// #ifndef H5
  		data = uni.getStorageSync(name);
  		// #endif
  		// #ifdef H5
  		data = sessionStorage.getItem(name) || localStorage.getItem(name);
  		// #endif
  		if (data) {
  			// #ifdef H5
  			try {
  				data = JSON.parse(data);
  			} catch (e) {
  			}
  			// #endif
  			state[name] = data;
  		}
  	}
  },
  //WebView地址
  setWebViewUrl(state, data) {
  	if (data) {
  		state.webViewUrl = data;
  		// #ifdef H5
  		window.sessionStorage.setItem('webViewUrl', data);
  		// #endif
  	}
  },
  //数据加载状态
  setLoadingShow(state, data) {
  	if(state.loadingShow){
  		clearTime && clearTimeout(clearTime);
  		clearTime = setTimeout(function(){
  			state.loadingShow = data;
  		},50);
  	} else {
  		state.loadingShow = data;
  	}
  },
  //微信场景参数
  setChatScenesInfo(state, data) {
  	if (data) {
  		state.chatScenesInfo = Object.assign({}, state.chatScenesInfo, data);
  	}
  },
  //登录弹窗状态
  setLoginPopupShow(state, data) {
  	state.loginPopupShow = data;
  },
  //当前地址
  setCurrentAddress(state, data) {
  	if (data) {
  		state.currentAddress = Object.assign(state.currentAddress, data);
  		let addressInfo = {
  			"provinceId": state.currentAddress.provinceId,
  			"provinceName": state.currentAddress.provinceName,
  			"cityId": state.currentAddress.cityId,
  			"cityName": state.currentAddress.cityName,
  			"areaId": state.currentAddress.areaId,
  			"areaName": state.currentAddress.areaName,
  		};
  		uni.setStorageSync('currentAddress', addressInfo);
  	}
  }
};
export const actions = {
  
};
