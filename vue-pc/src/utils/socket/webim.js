import store from "@/store/index.js";
import base from "@/utils/baseUrl.js";
import packetCode from "./webPacketCode.js";
import SKIMSDK from "./webSocket.js";
const EventDispatcher = function() {
  this.listeners = {};
};
let eventDispatcher;
const WEBIM = {
  serverUrl: base.socketUrl,
  server: null,
  heartCheck: true,
  isReconnection: true,
  options: null,
  /*初始化*/
  initSocket: function() {
    return new Promise((resolve, reject) => {
      
      WEBIM.options = {
        url: WEBIM.serverUrl,
        success(res) {
          resolve(res);
        },
        fail(e) {
          reject(e);
        }
      };
      eventDispatcher = new EventDispatcher();

      WEBIM.server = new SKIMSDK({
        heartCheck: true,
        isReconnection: true
      });
      WEBIM.server.initWebSocket(WEBIM.options);

      WEBIM.server.onReceivedMsg(event => {
        let packet = packetCode.decode(event.data);
        let command = packet.command;

        eventDispatcher.dispatchEvent(command, toJSON(packet));
        eventDispatcher.removeListener(command, toJSON(packet));

      });

      WEBIM.server.onSocketClosed(WEBIM.options);
    });
  },
  disconnect: function() {
    WEBIM.server.closeWebSocket();
  },
  isConnect: function() {
    return WEBIM.server._isLogin;
  },
  login: (res) => {
    let requestPacket = {
      userId: store.state.user.operId,
      version: 1,
      command: 1
    };
    send(requestPacket);
    eventDispatcher.addListener("2", res);
  },
  joinGroup: res => {
    let requestPacket = {
      chatId: store.state.chatObj.chatId,
      userId: store.state.user.operId,
      chatType: store.state.chatObj.chatType,
      version: 1,
      command: 7
    };
    send(requestPacket);
    eventDispatcher.addListener("8", res);
  },

  quitGroup: res => {
    let requestPacket = {
      chatId: store.state.chatObj.chatId,
      userId: store.state.user.operId,
      chatType: store.state.chatObj.chatType,
      version: 1,
      command: 9
    };
    send(requestPacket);
    eventDispatcher.addListener("10", res);
  },
  heartTest: func => {
    let packet = {
      userId: store.state.user.operId,
      version: 1,
      command: 17
    };
    send(packet);
    eventDispatcher.addListener("18", func);
  },
  sendMessage: (params, func) => {
    params.version = 1;
    params.command = 3;
    send(params);
    eventDispatcher.addListener("4", func);
  },
  logout: func => {
    let requestPacket = {
      userId: store.state.user.operId,
      version: 1,
      command: 5
    };
    send(requestPacket);
    eventDispatcher.addListener("6", func);
  },
  push:(func, code)=>{
		let req  = {
			version: 1,
			command: -9,
			code
		}
		send(req);
		eventDispatcher.addListener('-10', func);
	},
	push:(func, code, eventValue, eventObj)=>{
		let req  = {
			version: 1,
			command: -9,
			code,
			eventValue,
			eventObj
		}
		send(req);
		eventDispatcher.addListener('-10', func);
	}
};

function toJSON(packet) {
  return JSON.parse(JSON.stringify(packet));
}

EventDispatcher.prototype.addListener = function(eventKey, fun, context) {
  let list = [];
  this.listeners[eventKey] = list;
  let listener = {
    func: fun,
    context: context
  };
  list.push(listener);
  return listener;
};

EventDispatcher.prototype.removeListener = function(eventKey, fun, context) {
  let list = this.listeners[eventKey];
  if (list !== undefined) {
    let size = list.length;
    for (let i = 0; i < size; i++) {
      let listener = list[i];
      if (listener.func === fun && listener.context === context) {
        list.splice(i, 1);
        return;
      }
    }
  }
};

EventDispatcher.prototype.dispatchEvent = function(eventKey, event) {
  let list = this.listeners[eventKey];
  if (list !== undefined) {
    let size = list.length;
    for (let i = 0; i < size; i++) {
      let listener = list[i];
      let fun = listener.func;
      let context = listener.context;
      if (context != null) {
        fun.call(context, event);
      } else {
        fun(event);
      }
    }
  }
};

let send = p => {
  WEBIM.server.sendWebSocketMsg({
    data: p,
    success() {},
    fail() {
      // 进行重连
      WEBIM.server._isLogin = false;
      if (WEBIM.server._isReconnection) {
        console.log("网络中断，尝试重连");
        WEBIM.options = {
          url: WEBIM.serverUrl,
          success() {},
          fail() {}
        };
        WEBIM.server._reConnect(WEBIM.options);
      }
      console.log("【websocket】发送失败,尝试手动重连");
    }
  });
};

export default WEBIM;
