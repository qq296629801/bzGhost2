import packetCode from "./webPacketCode.js";
import webim from "./webim";
let socket;
export default class Websocket {
  constructor({ heartCheck, isReconnection }) {
    // 是否连接
    this._isLogin = false;
    // 当前网络状态
    this._netWork = true;
    // 是否人为退出
    this._isClosed = false;
    // 心跳检测频率
    this._timeout = 3000;
    this._timeoutObj = null;
    // 当前重连次数
    this._connectNum = 0;
    // 心跳检测和断线重连开关，true为启用，false为关闭
    this._heartCheck = heartCheck;
    this._isReconnection = isReconnection;
  }
  // 心跳重置
  _reset() {
    clearTimeout(this._timeoutObj);
    return this;
  }
  // 心跳开始
  _start() {
    let _this = this;
    this._timeoutObj = setInterval(() => {
      _this.sendHeartbeatData();
    }, this._timeout);
  }
  // 监听websocket连接关闭
  onSocketClosed(options) {
    socket.onerror = function() {
      webim.isConnected = false;
      // 停止心跳连接
      if (this._heartCheck) {
        this._reset();
      }
      // 关闭已登录开关
      this._isLogin = false;
      // 检测是否是用户自己退出小程序
      if (!this._isClosed) {
        // 进行重连
        if (this._isReconnection) {
          this._reConnect(options);
        }
      }
    };
  }
  _onSocketOpened() {
    let _this = this;
    socket.onopen = function() {
      // 打开已登录开关
      _this._isLogin = true;
      // 发送心跳
      if (this._heartCheck) {
        _this._reset()._start();
      }
      // 发送登录信息
      _this.sendLoginData();
      // 打开网络开关
      _this._netWork = true;
    };
  }
  // 接收服务器返回的消息
  onReceivedMsg(callBack) {
    socket.onmessage = function(event) {
      if (typeof callBack == "function") {
        callBack(event);
      } else {
        console.log("参数的类型必须为函数");
      }
    };
  }

  // 建立websocket连接
  initWebSocket(options) {
    let _this = this;
    if (!this._isLogin) {
      socket = new WebSocket(options.url);
      socket.binaryType = "arraybuffer";
      _this._onSocketOpened();
    }
  }
  // 发送websocket消息
  sendWebSocketMsg(options) {
    this.sendBinary(1, options);
  }

  //发送心跳连接
  sendHeartbeatData() {
    let packet = {
      version: 1,
      command: 17
    };
    this.sendBinary(99, {
      data: packet,
      success() {},
      fail() {}
    });
  }

  //发送第一次连接数据
  sendLoginData() {
    this.sendBinary(99, {
      data: {},
      success() {},
      fail() {}
    });
  }

  // 重连方法，会根据时间频率越来越慢
  _reConnect(options) {
    let timer,
      selft = this;
    console.log(timer);
    if (this._connectNum < 20) {
      timer = setTimeout(() => {
        selft.initWebSocket(options);
      }, 500);
      this._connectNum += 1;
    } else if (this._connectNum < 50) {
      timer = setTimeout(() => {
        selft.initWebSocket(options);
      }, 1000);
      this._connectNum += 1;
    } else {
      timer = setTimeout(() => {
        selft.initWebSocket(options);
      }, 3000);
      this._connectNum += 1;
    }
  }
  // 关闭websocket连接
  closeWebSocket() {
    socket.onclose = function() {
      this._isClosed = true;
    };
  }

  //发送二进制
  sendBinary(commendType, options) {
    console.log(commendType);
    if (socket.readyState === WebSocket.OPEN) {
      socket.send(packetCode.encode(options.data));
    }
  }
}
