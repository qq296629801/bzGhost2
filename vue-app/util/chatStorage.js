import cache from '@/util/cache.js'
const chat = {
	key:'chatItem_',
	saveChat:function(data,uid){
		cache.set(chat.key+uid, data);
	},
	queryChat:function(uid){
		return new Promise((resolve,reject) =>{
			try{
				 resolve(cache.get(chat.key+uid))
			}catch(e){
				reject(e)
			}
		});
	}
}
module.exports = {
	saveChat:chat.saveChat,
	queryChat:chat.queryChat
}