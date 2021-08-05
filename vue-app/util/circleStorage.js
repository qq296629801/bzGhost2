import cache from '@/util/cache.js'
const circle = {
	key:'circleItem_',
	saveCircle:function(data,userId){
		cache.set(circle.key+userId,data)
	},
	queryCircle:function(userId){
		return new Promise((resolve,reject) =>{
			try{
				 resolve(cache.get(circle.key+userId))
			}catch(e){
				reject(e)
			}
		});
	}
}

module.exports = {
	saveCircle:circle.saveCircle,
	queryCircle:circle.queryCircle
}