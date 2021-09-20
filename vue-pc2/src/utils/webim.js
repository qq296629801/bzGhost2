import packetCode from './PacketCodeC.js'
import SKIMSDK from './websocket_sdk.js'
import base from './baseUrl';
const EventDispatcher = function() {
	this.listeners = {}
}
let eventDispatcher
const WEBIM = {
	resource: "web",
	CHAT: "chat",
	GROUPCHAT: "groupchat",
	token: null,
	userId: null,
	isReadDel: 0,
	userIdStr: null,
	serverUrl: base.socketUrl,
	server: null,
	/*消息超时 时间 默认 15 秒*/
	sendTimeOut: 15,
	/*等待消息回执的 消息Id 数组*/
	waitReceiptMessageIds: {},
	heartCheck: true,
	isReconnection: true,
	options: null,
	/*初始化*/
	initWebIM: function() {
		 return new Promise((resolve, reject) => {
			 WEBIM.options = {
			 	url: WEBIM.serverUrl,
			 	success(res) {
					resolve(res);
				},
			 	fail(e) {
					reject(e);
				}
			 }
			 eventDispatcher = new EventDispatcher();
			 
			 WEBIM.server = new SKIMSDK({
			 	heartCheck: true,
			 	isReconnection: true,
			 });
			 WEBIM.server.initWebSocket(WEBIM.options);
			 
			 WEBIM.server.onReceivedMsg(event => {
			 	let packet = packetCode.decode(event.data);
			 	let command = packet.command;
			 	eventDispatcher.dispatchEvent(command, toJSON(packet))
			 	eventDispatcher.removeListener(command, toJSON(packet))

				console.log(packet);


			 	// let name = 'push';
			 	// let value = packet;
			 	// if (command === -10) {
			 	// 	store.commit('$uStore', {
			 	// 		name,
			 	// 		value
			 	// 	});
			 	// }
			 });
			 WEBIM.server.onSocketClosed(WEBIM.options)
		 });
	},
	disconnect: function(e) {
		WEBIM.server.closeWebSocket()
	},
	isConnect: function() {
		return WEBIM.server._isLogin;
	},
	login: (userId,res) => {
		let requestPacket = {
			userId,
			version: 1,
			command: 1
		}
		send(requestPacket);
		eventDispatcher.addListener('2',res);
	},
	
	joinGroup: (groupId,userId,res) => {
		let requestPacket = {
			groupId,
			userId,
			version: 1,
			command: 7
		}
		send(requestPacket);
		eventDispatcher.addListener('8',res);
	},
	
	quitGroup: (groupId,userId,res) => {
		let requestPacket = {
			groupId,
			userId,
			version: 1,
			command: 9
		}
		send(requestPacket);
		eventDispatcher.addListener('10',res);
	},
	
	heartTest: (userId, func) => {
		let packet = {
			userId,
			version: 1,
			command: 17
		}
		send(packet).then(e => {
		eventDispatcher.addListener('18', func)
		});
	},
	sendMessage: (params, func) => {
		params.version = 1;
		params.command = 3;
		send(params)
		eventDispatcher.addListener('4', func)
	},
	logout: (userId, func) => {
		let requestPacket = {
			userId,
			version: 1,
			command: 5
		}
		send(requestPacket).then(e => {
		eventDispatcher.addListener('6', func)
		});
	}
}

function toJSON(packet) {
	return JSON.parse(JSON.stringify(packet))
}

EventDispatcher.prototype.addListener = function(eventKey, fun, context) {
	let list = []
	this.listeners[eventKey] = list
	let listener = {
		func: fun,
		context: context
	}
	list.push(listener)
	return listener
}

EventDispatcher.prototype.removeListener = function(eventKey, fun, context) {
	let list = this.listeners[eventKey]
	if (list !== undefined) {
		let size = list.length
		for (let i = 0; i < size; i++) {
			let listener = list[i]
			if (listener.func === fun && listener.context === context) {
				list.splice(i, 1)
				return
			}
		}
	}
}

EventDispatcher.prototype.dispatchEvent = function(eventKey, event) {
	let list = this.listeners[eventKey]
	if (list !== undefined) {
		let size = list.length
		for (let i = 0; i < size; i++) {
			let listener = list[i]
			let fun = listener.func
			let context = listener.context
			if (context != null) {
				fun.call(context, event)
			} else {
				fun(event)
			}
		}
	}
}

let send = (p) => {
	 return new Promise((resolve, reject) => {
		// p.token = store.state.userData.token;
		 // if(store.state.userData.token==undefined){
			//  return;
		 // }
		 WEBIM.server.sendWebSocketMsg({
		 	data: p,
		 	success(res) {resolve(res)},
		 	fail(err) {
				// 进行重连
				reject(err)
				WEBIM.server._isLogin = false;
				if (WEBIM.server._isReconnection) {
					console.log('网络中断，尝试重连')
					WEBIM.options = {
						url: WEBIM.serverUrl,
						success(res) {resolve(res)},
						fail(err) {reject(err)}
					}
				    WEBIM.server._reConnect(WEBIM.options)
				}
		 		console.log('【websocket】发送失败,尝试手动重连')
		 	}
		 });
	 });
}

export default WEBIM
