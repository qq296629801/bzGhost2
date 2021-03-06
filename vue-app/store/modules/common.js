import Vue from "vue";
import cache from "@/util/cache.js"
export const state = {
  loadingShow: false,
  loginPopupShow: false,
  userCardData:{},
  conversation:[],
  chatObj:{},
  packetData:{},
  packetPush:{
	  code:1,
	  command:-10,
	  eventObj:1,
	  eventValue:'',
	  msg:'',
	  success:false,
	  version:1
  },
  exception:{},
  post:[],
  friend:[],
  group:[],
  groupMembers:[]
};
//缓存浏览器的数据名称
const cacheNameList = ["groupMembers","user","token","config","roles","permissions","post","friend","group","conversation"];
let clearTime;
export const mutations = {
	setException(state, data){
		if(data){
			state.exception =  data;
		}
	},
	setUserCardData(state, data){
		if(data){
			state.userCardData =  data;
		}
	},
	setGroupMembers(state, data){
		if(data){
			state.groupMembers =  Object.assign({}, state.groupMembers, data);
			cache.set("groupMembers",state.groupMembers);
		}
	},
	setPost(state, data){
		if(data){
			state.post =  Object.assign({}, state.post, data);
			cache.set("post",state.post);
		}
	},
	setFriend(state, data){
		if(data){
			state.friend =  Object.assign({}, state.friend, data);
			cache.set("friend",state.friend);
		}
	},
	setGroup(state, data){
		if(data){
			state.group =  Object.assign({}, state.group, data);
			cache.set("group",state.group);
		}
	},
	setConversation(state, data){
		if(data){
			state.conversation =  Object.assign({}, state.conversation, data);
			cache.set("conversation",state.conversation);
		}
	},
	setCacheData(state) {
		for (let name of cacheNameList) {
			let data = cache.get(name);
			if (data) {
				state[name] = data;
			}
		}
	},
	empty(state) {
		for (let name of cacheNameList) {
			if(name == 'token'){
				state.token = ''
			}else {
				state[name] = {}
			}
			cache.remove(name);
		}	
	},
	setPacketData(state, data){
		if(data){
			state.packetData = data
		}
	},
	// 
	setPacketPush(state, data){
		if(data){
			state.packetPush = data
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
