import {post} from '@/utils/request'
import store from '@/store/index.js'
const api = {
	groupUrl:'app/group/list',
	postUrl:'app/post/list',
	friendUrl:'app/friend/list',
	conversationUrl:'app/conversation/list'
}
const common = {
   download:function(){
    let userId = store.state.user.operId;
    post(api.postUrl, {
      userId
    }).then(res=>{
      store.commit("setPost", res)
    });
    
    post(api.friendUrl, {
      userId
    }).then(res=>{
      store.commit("setFriend", res)
    });
    
    post(api.groupUrl, {
      userId
    }).then(res=>{
      store.commit("setGroup", res.data)
    });
    
    post(api.conversationUrl, {
      userId
    }).then(res=>{
      store.commit("setConversation", res)
    });
  }
}
export default common