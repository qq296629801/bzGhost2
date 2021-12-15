import packetCode from './webPacketCode.js'
export default class Websocket {
    constructor({
        heartCheck,
        isReconnection
    }) {
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
            //发送心跳
            _this.sendHeartbeatData();
        }, this._timeout);
    }
    // 监听websocket连接关闭
    onSocketClosed(options) {
		uni.onSocketError(err => {
			uni.showLoading({
				title:"服务器异常断开"
			})
			console.log('服务器异常断开');
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
			        this._reConnect(options)
			    }
			}
			
		})
        uni.onSocketClose(err => {
			console.log('服务器断开');
			options.fail(err)
        })
    }
    // 检测网络变化
    onNetworkChange(options) {
        uni.onNetworkStatusChange(res => {
            if (!this._netWork) {
                this._isLogin = false;
                // 进行重连
                if (this._isReconnection) {
					console.log('网络中断，尝试重连')
                    this._reConnect(options)
                }
            }
        })
    }
    _onSocketOpened() {
        uni.onSocketOpen(res => {
			// 隐藏进度展示
			uni.hideLoading();
            // 打开已登录开关
            this._isLogin = true;
            // 发送心跳
            if (this._heartCheck) {
                this._reset()._start();
				console.log('发送心跳');
            }
            // 发送登录信息
            this.sendLoginData();
            // 打开网络开关
            this._netWork = true;
        })
    }
    // 接收服务器返回的消息
    onReceivedMsg(callBack) {
        uni.onSocketMessage(event => {
            if (typeof callBack == "function") {
                callBack(event)
            } else {
                console.log('参数的类型必须为函数')
            }
        })
    }

    // 建立websocket连接
    initWebSocket(options) {
        let _this = this;
        if (!_this._isLogin) {
			// 检查网络
			uni.getNetworkType({
			    success(result) {
			        if (result.networkType != 'none') {
			            uni.connectSocket({
			                url: options.url,
			                success(res) {
			                    if (typeof options.success == "function") {
									// 开始建立连接
									console.log('建立websocket连接' + options.url);
			                        options.success(res);
									
			                        _this._onSocketOpened();
			                    } else {
			                        console.log('参数的类型必须为函数')
			                    }
			                },
			                fail(err) {
			                    if (typeof options.fail == "function") {
			                        options.fail(err)
			                    } else {
			                        console.log('参数的类型必须为函数')
			                    }
			                }
			            })
			        } else {
			            _this._netWork = false;
			        }
			    }
			})
        } 
    }
    // 发送websocket消息
    sendWebSocketMsg(options) {
        this.sendBinary(1,options);
    }

    //发送心跳连接
    sendHeartbeatData() {
		let packet = {
		  version: 1,
		  command: 17
		}
        this.sendBinary(99, {
            data: packet,
            success(res) {
            },
            fail(err) {
            }
        });
    }

    //发送第一次连接数据
    sendLoginData() {
        this.sendBinary(99, {
            data: {},
            success(res) {
                console.log('【websocket】发送第一次数据成功')
            },
            fail(err) {
                console.log('【websocket】发送第一次数据失败')
                console.log(err)
            }
        });
    }

    // 重连方法，会根据时间频率越来越慢
    _reConnect(options) {
        let timer, _this = this;
        if (this._connectNum < 20) {
            timer = setTimeout(() => {
                this.initWebSocket(options)
            }, 500)
            this._connectNum += 1;
        } else if (this._connectNum < 50) {
            timer = setTimeout(() => {
                this.initWebSocket(options)
            }, 1000)
            this._connectNum += 1;
        } else {
            timer = setTimeout(() => {
                this.initWebSocket(options)
            }, 3000)
            this._connectNum += 1;
        }
    }
    // 关闭websocket连接
    closeWebSocket() {
        uni.closeSocket();
		// 不进行自动连接,人为关闭!
        this._isClosed = true;
    }

    //发送二进制
    sendBinary(commendType, options) {
        uni.sendSocketMessage({
            data: packetCode.encode(options.data),
            success(res) {
                if (typeof options.success == "function") {
                    options.success(res)
                } else {
                    console.log('参数的类型必须为函数')
                }
            },
            fail(err) {
                if (typeof options.fail == "function") {
                    options.fail(err)
                } else {
                    console.log('参数的类型必须为函数')
                }
            }
        });
    }
}