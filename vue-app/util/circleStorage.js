const circle = {
	saveCircle:function(data,userId){
		uni.setStorageSync('circleItem_'+userId, JSON.stringify(data));
	},
	queryCircle:function(userId){
		return new Promise((resolve,reject) =>{
			try{
				let data =uni.getStorageSync('circleItem_'+userId)
				 resolve(JSON.parse(data))
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