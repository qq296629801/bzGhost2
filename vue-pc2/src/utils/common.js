/*
使用方法
import common from '@/utils/common.js'
	common.put('post');
	common.get('post').then();
*/
import cache from './cache.js'
import store from '@/store/index.js'
import { post } from './request'


/**
 * @param {Object} key
 */
function put(key){
	let storeUserData = store.state.userData;
	if (!storeUserData.token) {
		storeUserData = JSON.parse(localStorage.getItem("userData"));
	}
	let userId = storeUserData.user.operId;
	return new Promise((resolve,reject) =>{
		let httpData = {
			userId
		}
		post('app/'+key+'/list', httpData).then(res=>{
			cache.set(key+'_'+ userId, res);
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
		storeUserData = JSON.parse(localStorage.getItem("userData"));
	}
	let userId = storeUserData.user.operId;
	return new Promise((resolve,reject) =>{
		try{
		  resolve(cache.get(key+'_'+ userId))
		}catch(e){
			reject(e)
		}
	});
}

export { put, get }