import cache from '@/util/cache.js'
import requestConfig from '@/util/requestConfig'
import store from '@/store/index.js'


function setItem(key){
	let userData = store.state.userData;
	if (!userData.token) {
		userData = uni.getStorageSync("userData");
	}
	if(userData.user==undefined){
		return;
	}
	let userId = userData.user.operId;
	return new Promise((resolve,reject) =>{
		requestConfig.post('app/'+key+'/list', {
			userId
		}).then(res=>{
			cache.set(key+'_'+ userId, res);
			resolve(res)
		}).catch(e=>{reject});
	});
}


function getItem(key){
	let userData = store.state.userData;
	if (!userData.token) {
		userData = uni.getStorageSync("userData");
	}
	if(userData.user==undefined){
		return;
	}
	let userId = userData.user.operId;
	return new Promise((resolve,reject) =>{
		try{
		  resolve(cache.get(key+'_'+ userId))
		}catch(e){
			reject(e)
		}
	});
}

module.exports = {
    setItem: setItem,
    getItem: getItem,
}