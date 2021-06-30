import {  initData } from './dbUtil.js'
import { createFSQL, addFSQL } from './f.js'
import webim from '../webim.js';
const manageDb = {
	upCacheMsg(uid){
		webim.queryOnlineMessage(uid,q =>{
			let data = q.response.data;
			for(var i in data){
				initData(data[i].groupMsg.list, data[i].groupInfo.chatId);
			}
		})
	},
	upCacheAddr(uid){
		return new Promise((resolve, reject) => {
			webim.listGuests(uid, data => {
				// #ifdef APP-PLUS
				createFSQL(uid).then();
				let contact = data.response.data;
				contact.forEach(c=>{
					c.members.forEach(m=>{
						m.name = c.name;
						addFSQL(m, uid).then();
					})
				})
				// #endif
				resolve(data.response.data)
				//this.$u.vuex('firendItem', data.response.data)
			});
		});
	},
	upCacheChat(uid){
		return new Promise((resolve, reject) => {
			webim.queryChats('', uid,(res) => {
				if (res.success) {
				  res.chats.sort((a, b) => { return b.lastOpenTime - a.lastOpenTime });
				  resolve(res.chats)
				 // this.$u.vuex('chatItem', res.chats);
				}
			});
		});
	}
	
}

export default manageDb