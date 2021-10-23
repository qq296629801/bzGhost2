import $store from '@/store/index.js'
import $http from '@/util/chat/requestConfig'

/**
 * 通用接口
 */

function messageCreate(message,msgType=0){
	let requestData = {
		chatId: $store.state.chatObj.chatId,
		chatType:$store.state.chatObj.chatType,
		userId: $store.state.userData.user.operId,
		message,
		msgType
	}
	$http.post('app/msg/add',requestData);
}

module.exports = {
    messageCreate: messageCreate,
}