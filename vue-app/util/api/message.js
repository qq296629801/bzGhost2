import cache from '@/util/cache.js'
import requestConfig from '@/util/requestConfig'
import store from '@/store/index.js'
var postfix = 'msgItem_';

 function getItem(chatId) {
   let list = cache.get(postfix+chatId);
   return new Promise((resolve,reject) =>{
	   try{
			if(list==""){
				resolve([]);
				return;
			}
			list.sort((a, b) => { return a.id - b.id });
	   }catch(e){
		   reject(e)
	   }
	   resolve(list);
   })
}

function online(){
	let userId = store.state.user.operId;
	requestConfig.post('app/group/msg/online', {
		userId
	}).then(res=>{
		res.forEach(r=>{
			cache.set(postfix+r.groupInfo.chatId,r.groupMsg.list)
		})
	});
	requestConfig.post('app/friend/msg/online', {userId,condition:''}).then(res=>{
		res.forEach(r=>{
			cache.set(postfix+r.friendInfo.id,r.friendMsg)
		})
	});
}



function del(id, chatId, obj){
	let list = cache.get(postfix+chatId);
	if(list==""){
		let tempItem = [];
		tempItem.push(obj);
		cache.set(postfix+chatId,tempItem)
		return;
	}
	for(var i in list){
		if(list[i].id==id){
			list.splice(i,1);
		}
	}
	cache.set(postfix+chatId,list)
}


 function upPacket(hasBeenSentId, chatId, content){
	let list = cache.get(postfix+chatId);
	if(list==""){
		let tempItem = [];
		tempItem.push(obj);
		cache.set(postfix+chatId,tempItem)
		return;
	}
	for(var i in list){
		if(list[i].hasBeenSentId===hasBeenSentId){
			list[i].content = content;
		}
	}
	cache.set(postfix+chatId,list)
}
	

function commit(obj, gid){
	let list = cache.get(postfix+gid);
	if(list==""){
		let tempItem = [];
		tempItem.push(obj);
		cache.set(postfix+gid,tempItem)
		return;
	}
	if(list.length>=10){
		list.splice(0,1);
	}
	list.push(obj);
	cache.set(postfix+gid,list)
}

module.exports = {
    online: online,
    getItem: getItem,
	commit: commit,
	delete: del,
	upPacket:upPacket
}

