/*
使用方法
import common from '@/util/common.js'
	common.put('post');
	common.get('post').then();
*/
import $cache from '@/util/cache.js'
import $http from '@/config/requestConfig'
import store from '@/store/index.js'

/**
 * @param {Object} key
 */
function put(key){
	let storeUserData = store.state.userData;
	if (!storeUserData.token) {
		storeUserData = uni.getStorageSync("userData");
	}
	let userId = storeUserData.user.operId;
	return new Promise((resolve,reject) =>{
		let httpData = {
			userId
		}
		$http.post('app/'+key+'/list', httpData).then(res=>{
			$cache.set(key+'_'+ userId, res);
			resolve(res)
		}).catch(e=>{reject});
	});
}

/**
 * @param {Object} key
 */
function get(key){
	let storeUserData = store.state.userData;
	if (!storeUserData.token) {
		storeUserData = uni.getStorageSync("userData");
	}
	let userId = storeUserData.user.operId;
	return new Promise((resolve,reject) =>{
		try{
		  resolve($cache.get(key+'_'+ userId))
		}catch(e){
			reject(e)
		}
	});
}

module.exports = {
    put: put,
    get: get,
}