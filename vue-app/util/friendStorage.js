const friend = {
	saveFriend:function(data,uid){
		uni.setStorageSync('friendItem_'+uid, JSON.stringify(data));
	},
	queryFriend:function(uid){
		return new Promise((resolve,reject) =>{
			try{
				let data =uni.getStorageSync('friendItem_'+uid)
				 resolve(JSON.parse(data))
			}catch(e){
				reject(e)
			}
		});
	}
}
module.exports = {
	saveFriend:friend.saveFriend,
	queryFriend:friend.queryFriend
}