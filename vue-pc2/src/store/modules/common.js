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
};
//缓存浏览器的数据名称
const cacheNameList = ["userData", "webViewUrl"];
let clearTime;
export const mutations = {
  //取出缓存数据（打开APP就取出）
  setCacheData(state) {
  	for (let name of cacheNameList) {
		let data;
  		data = sessionStorage.getItem(name) || localStorage.getItem(name);
  		if (data) {
  			try {
  				data = JSON.parse(data);
  			} catch (e) {
  			}
  			state[name] = data;
  		}
  	}
  },
  //WebView地址
  setWebViewUrl(state, data) {
  	if (data) {
  		state.webViewUrl = data;
  		window.sessionStorage.setItem('webViewUrl', data);
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
