const chat = {
	saveChat:function(data,uid){
		uni.setStorageSync('chatItem_'+uid, JSON.stringify(data));
	},
	queryChat:function(uid){
		return new Promise((resolve,reject) =>{
			try{
				let list = uni.getStorageSync('chatItem_'+ uid);
				 resolve(JSON.parse(list))
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