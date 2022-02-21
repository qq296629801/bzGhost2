import cache from '@/util/cache.js'
import store from '@/store/index.js'
var postfix = 'msgItem_';

 function query() {
   let chatId = store.state.chatObj.chatId;
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

function del(id, obj = {}){
	let chatId = store.state.chatObj.chatId;
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


 function upPacket(hasBeenSentId, content){
	let chatId = store.state.chatObj.chatId;
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
	

function commit(obj = {}){
	let chatId = store.state.chatObj.chatId;
	let list = cache.get(postfix+chatId);
	if(list==""){
		let tempItem = [];
		tempItem.push(obj);
		cache.set(postfix+chatId,tempItem)
		return;
	}
	if(list.length>=10){
		list.splice(0,1);
	}
	list.push(obj);
	cache.set(postfix+chatId,list)
}

module.exports = {
    query: query,
	commit: commit,
	delete: del,
	upPacket:upPacket
}

