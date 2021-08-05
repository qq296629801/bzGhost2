import cache from '@/util/cache.js'
const group = {
	key:'msgItem_',
	 queryData:function(gid) {
	   let list = cache.get(group.key+gid);
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
	},
	initData:function(list, gid){
		cache.set(group.key+gid,list)
	},
	 upCanceData:function(id,gid,obj){
		let list = cache.get(group.key+gid);
		if(list==""){
			let tempItem = [];
			tempItem.push(obj);
			cache.set(group.key+gid,tempItem)
			return;
		}
		for(var i in list){
			if(list[i].id===id){
				list.splice(i,1);
			}
		}
		cache.set(group.key+gid,list)
	},
	 upRedData:function(id,gid,msgContext){
		let list = cache.get(group.key+gid);
		if(list==""){
			let tempItem = [];
			tempItem.push(obj);
			cache.set(group.key+gid,tempItem)
			return;
		}
		for(var i in list){
			if(list[i].id===id){
				list[i].msgContext = msgContext;
			}
		}
		cache.set(group.key+gid,list)
	},
	 upData:function(obj, gid){
		let list = cache.get(group.key+gid);
		if(list==""){
			let tempItem = [];
			tempItem.push(obj);
			cache.set(group.key+gid,tempItem)
			return;
		}
		if(list.length>=10){
			list.splice(0,1);
		}
	    list.push(obj);
		cache.set(group.key+gid,list)
	}
}

module.exports = {
	initData:group.initData,
	queryData:group.queryData,
	upData:group.upData,
	upRedData:group.upRedData,
	upCanceData:group.upCanceData
}
