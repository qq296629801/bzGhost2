import {  initData } from '@/util/groupStorage.js'
import { saveChat } from '@/util/chatStorage.js'
import friendDao from '@/util/friendStorage.js'
import webim from '@/webim.js';
const yiqun = {
	cache:function(userId){
		yiqun.cacheGroupMsg(userId)
		yiqun.cacheFriends(userId)
		yiqun.cacheChats(userId)
	},
	cacheGroupMsg:function(uid){
		return new Promise((resolve, reject) => {
			webim.queryOnlineMessage(uid,q =>{
				if(q.response.success){
					let data = q.response.data;
					for(var i in data){
						initData(data[i].groupMsg.list, data[i].groupInfo.chatId);
					}
					resolve(data);
				}else {
					reject(q.response.errorMessage);
				}
			})
		});
	},
	cacheFriends(uid){
		return new Promise((resolve, reject) => {
			webim.listGuests(uid, res => {
				if(res.response.success){
					friendDao.saveFriend(res.response.data,uid)
					resolve(res.response.data)
				}else {
					reject(res.response.errorMessage)
				}
			})
		});
	},
	cacheChats(uid){
		return new Promise((resolve, reject) => {
			webim.queryChats('', uid,(res) => {
				if (res.success) {
				  res.chats.sort((a, b) => { return b.lastOpenTime - a.lastOpenTime });
				  saveChat(res.chats, uid)
				  resolve(res.chats)
				}else {
					reject(res)
				}
			});
		});
	}
}

module.exports = {
	cacheGroupMsg:yiqun.cacheGroupMsg,
	cacheFriends:yiqun.cacheFriends,
	cacheChats:yiqun.cacheChats,
	cache:yiqun.cache
}