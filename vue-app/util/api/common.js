import cache from '@/util/cache.js'
import http from '@/util/requestConfig'
import store from '@/store/index.js'
const api = {
	groupUrl:'app/group/list',
	postUrl:'app/post/list',
	friendUrl:'app/friend/list',
	conversationUrl:'app/conversation/list'
}
function online(){
	let userId = store.state.user.operId;
	
	http.post(api.postUrl, {
		userId
	}).then(res=>{
		store.commit("setPost", res)
	});
	
	http.post(api.friendUrl, {
		userId
	}).then(res=>{
		store.commit("setFriend", res)
	});
	
	http.post(api.groupUrl, {
		userId
	}).then(res=>{
		store.commit("setGroup", res.data)
	});
	
	http.post(api.conversationUrl, {
		userId
	}).then(res=>{
		store.commit("setConversation", res)
	});
}
module.exports = {
    online: online
}