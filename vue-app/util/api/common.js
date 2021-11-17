import cache from '@/util/cache.js'
import http from '@/util/requestConfig'
import store from '@/store/index.js'


function setItem(key){
	let userId = store.state.user.operId;
	return new Promise((resolve,reject) =>{
		http.post('app/'+key+'/list', {
			userId
		}).then(res=>{
			cache.set(key+'_'+ userId, res);
			resolve(res)
		}).catch(e=>{reject});
	});
}


function getItem(key){
	let userId = store.state.user.operId;
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