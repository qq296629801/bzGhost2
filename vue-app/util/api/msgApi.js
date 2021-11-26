import http from '@/util/requestConfig'
import store from '@/store/index.js'
const msgApi = {
	msgfOnline : 'app/group/msg/online',
	msggOnline : 'app/friend/msg/online',
	download: function(){
		let userId = store.state.user.operId;
		http.post(msgApi.msggOnline, {
			userId
		}).then(res=>{
			res.forEach(r=>{
				cache.set(postfix+r.groupInfo.chatId,r.groupMsg.list)
			})
		});
		http.post(msgApi.msgfOnline, {userId,condition:''}).then(res=>{
			res.forEach(r=>{
				cache.set(postfix+r.friendInfo.id,r.friendMsg)
			})
		});
	}
}
export default msgApi