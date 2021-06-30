import {  initData } from './dbStorage.js'
import { createFSQL, addFSQL, selectFSQL } from './dbSqlite.js'
import webim from '../webim.js';
const dbUtil = {
	upCacheMsg(uid){
		webim.queryOnlineMessage(uid,q =>{
			let data = q.response.data;
			for(var i in data){
				initData(data[i].groupMsg.list, data[i].groupInfo.chatId);
			}
		})
	},
	selectAddr(uid){
		return new Promise((resolve, reject) => {
			// #ifndef H5
			var list = [];
			var indexList =  ['#', 'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z']
			selectFSQL(uid).then(res=> {
				indexList.forEach(name=>{
					var members = [];
					res.forEach(f=> {
						if(f.name == name){
							members.push(f);
						}
					});
					let obj = {
						name: name,
						members: members
					};
					list.push(obj);
				});
				resolve(list)
			});
			// #endif	
			
			// #ifndef APP-PLUS
			webim.listGuests(uid, res => {
				resolve(res.response.data)
			})
			// #endif
		});
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
			});
		});
	},
	upCacheChat(uid){
		return new Promise((resolve, reject) => {
			webim.queryChats('', uid,(res) => {
				if (res.success) {
				  res.chats.sort((a, b) => { return b.lastOpenTime - a.lastOpenTime });
				  resolve(res.chats)
				}
			});
		});
	}
	
}

export default dbUtil