import http from '@/util/requestConfig'
import store from '@/store/index.js'
const comApi = {
	groupUrl:'app/group/list',
	postUrl:'app/post/list',
	friendUrl:'app/friend/list',
	conversationUrl:'app/conversation/list',
	download: function(){
		let userId = store.state.user.operId;
		
		http.post(comApi.postUrl, {
			userId
		}).then(res=>{
			store.commit("setPost", res)
		});
		
		http.post(comApi.friendUrl, {
			userId
		}).then(res=>{
			store.commit("setFriend", res)
		});
		
		http.post(comApi.groupUrl, {
			userId
		}).then(res=>{
			store.commit("setGroup", res.data)
		});
		
		http.post(comApi.conversationUrl, {
			userId
		}).then(res=>{
			store.commit("setConversation", res)
		});
	}
}
export default comApi