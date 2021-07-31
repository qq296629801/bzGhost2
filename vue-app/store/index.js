import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex)

let lifeData = {};

try {
	lifeData = uni.getStorageSync('lifeData');
} catch (e) {
}

let saveStateKeys = ['firendItem','userData','chatItem'];

const saveLifeData = function(key, value) {
	if (saveStateKeys.indexOf(key) != -1) {
		let tmp = uni.getStorageSync('lifeData');
		tmp = tmp ? tmp : {};
		tmp[key] = value;
		uni.setStorageSync('lifeData', tmp);
	}
}
const store = new Vuex.Store({
	state: {
		pushRes:lifeData.pushRes?lifeData.pushRes: {},
		linkItem:lifeData.linkItem?lifeData.linkItem: [],
		userData: lifeData.userData?lifeData.userData: {},
		memberItem:lifeData.memberItem?lifeData.memberItem:[],
		memberItemIndex: lifeData.memberItemIndex?lifeData.memberItemIndex:[],
		chatItem:lifeData.chatItem?lifeData.chatItem:[],
		firendItem: lifeData.firendItem?lifeData.firendItem: {},
		packet: lifeData.packet?lifeData.packet:{},
		chatObj:{
		  chatId:'',
		  chatType:0,
		  chatName:''
		},
		vuex_version: '1.0.1',
	},
	mutations: {
		$uStore(state, payload) {
			let nameArr = payload.name.split('.');
			let saveKey = '';
			let len = nameArr.length;
			if (nameArr.length >= 2) {
				let obj = state[nameArr[0]];
				for (let i = 1; i < len - 1; i++) {
					obj = obj[nameArr[i]];
				}
				obj[nameArr[len - 1]] = payload.value;
				saveKey = nameArr[0];
			} else {
				state[payload.name] = payload.value;
				saveKey = payload.name;
			}
			saveLifeData(saveKey, state[saveKey])
		},
	},
	
})

export default store
