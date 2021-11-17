import Vue from "vue";
import cache from "@/util/cache.js"
export const state = {
  // 加载动画
  loadingShow: false,
  // 登录弹窗状态
  loginPopupShow: false,
  // 聊天对象
  chatObj:{
  },
  // 红包对象
  packetData:{},
  newsPush:{}
};
//缓存浏览器的数据名称
const cacheNameList = ["user","token","config","roles","permissions"];
let clearTime;
export const mutations = {
	//取出缓存数据（打开APP就取出）
	setCacheData(state) {
		for (let name of cacheNameList) {
			let data = cache.get(name);
			if (data) {
				state[name] = data;
			}
		}
	},
	setPacketData(state, data){
		if(data){
			state.packetData = data
		}
	},
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
  //登录弹窗状态
  setLoginPopupShow(state, data) {
  	state.loginPopupShow = data;
  }
};
export const actions = {
  
};
