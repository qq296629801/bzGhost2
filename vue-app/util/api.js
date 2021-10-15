import $store from '@/store/index.js'
import $http from '@/config/requestConfig'

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


function conversationCreate(message,msgType=0){
	let requestData = {
		chatId: $store.state.chatObj.chatId,
		chatType:$store.state.chatObj.chatType,
		userId: $store.state.userData.user.operId,
		message,
		msgType
	}
	$http.post('app/conversation/create',requestData);
}


module.exports = {
    messageCreate: messageCreate,
	conversationCreate:conversationCreate,
}