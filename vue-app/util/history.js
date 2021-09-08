import cache from '@/util/cache.js'
import $http from '@/config/requestConfig'
import store from '@/store/index.js'
var postfix = 'msgItem_';
/**
 * @param {Object} gid
 */
 function get(gid) {
   let list = cache.get(postfix+gid);
   return new Promise((resolve,reject) =>{
	   try{
			if(list==""){
				resolve([]);
				return;
			}
			list.sort((a, b) => { return a.id - b.id });
	   }catch(e){
		   reject(e)
	   }
	   resolve(list);
   })
}

function push(){
	let storeUserData = store.state.userData;
	if (!storeUserData.token) {
		storeUserData = uni.getStorageSync("userData");
	}
	let userId = storeUserData.user.operId;
	return new Promise((resolve,reject) =>{
		$http.post('app/group/msg/online', {
			userId
		}).then(res=>{
			res.forEach(r=>{
				cache.set(postfix+r.groupInfo.chatId,r.groupMsg.list)
			})
			resolve(res)
		}).catch(e=>{reject});
		
		$http.post('app/friend/msg/online', {userId,condition:''}).then(res=>{
			res.forEach(r=>{
				cache.set(postfix+r.friendInfo.id,r.friendMsg)
			})
			resolve(res)
		}).catch(e=>{reject});
	});
}


/**
 * @param {Object} id
 * @param {Object} gid
 * @param {Object} obj
 */
function cance(id,gid,obj){
	let list = cache.get(postfix+gid);
	if(list==""){
		let tempItem = [];
		tempItem.push(obj);
		cache.set(postfix+gid,tempItem)
		return;
	}
	for(var i in list){
		if(list[i].id===id){
			list.splice(i,1);
		}
	}
	cache.set(postfix+gid,list)
}
	/**
	 * @param {Object} id
	 * @param {Object} gid
	 * @param {Object} msgContext
	 */
 function packet(id,gid,msgContext){
	let list = cache.get(postfix+gid);
	if(list==""){
		let tempItem = [];
		tempItem.push(obj);
		cache.set(postfix+gid,tempItem)
		return;
	}
	for(var i in list){
		if(list[i].id===id){
			list[i].msgContext = msgContext;
		}
	}
	cache.set(postfix+gid,list)
}
	
/**
 * @param {Object} obj
 * @param {Object} gid
 */
function up(obj, gid){
	let list = cache.get(postfix+gid);
	if(list==""){
		let tempItem = [];
		tempItem.push(obj);
		cache.set(postfix+gid,tempItem)
		return;
	}
	if(list.length>=10){
		list.splice(0,1);
	}
	list.push(obj);
	cache.set(postfix+gid,list)
}

module.exports = {
    push: push,
    get: get,
	up:up,
	cance:cance,
	packet:packet
}

