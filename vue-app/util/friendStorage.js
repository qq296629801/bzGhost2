import cache from '@/util/cache.js'
const friend = {
	key:'frindItem_',
	saveFriend:function(data,uid){
		cache.set(friend.key+uid,data)
	},
	queryFriend:function(uid){
		return new Promise((resolve,reject) =>{
			try{
				 resolve(cache.get(friend.key+uid))
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