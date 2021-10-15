/*
使用方法
	import db_common from '@/util/db_common.js'
	db_common.put('post');
	db_common.get('post').then();
*/
import $local from '@/util/local.js'
import $http from '@/config/requestConfig'
import $store from '@/store/index.js'

/**
 * @param {Object} key
 */
function put(key){
	let userData = $store.state.userData;
	if (!userData.token) {
		userData = uni.getStorageSync("userData");
	}
	let userId = userData.user.operId;
	return new Promise((resolve,reject) =>{
		let httpData = {
			userId
		}
		$http.post('app/'+key+'/list', httpData).then(res=>{
			$local.set(key+'_'+ userId, res);
			resolve(res)
		}).catch(e=>{reject});
	});
}

/**
 * @param {Object} key
 */
function get(key){
	let userData = $store.state.userData;
	if (!userData.token) {
		userData = uni.getStorageSync("userData");
	}
	let userId = userData.user.operId;
	return new Promise((resolve,reject) =>{
		try{
		  resolve($local.get(key+'_'+ userId))
		}catch(e){
			reject(e)
		}
	});
}

module.exports = {
    put: put,
    get: get,
}