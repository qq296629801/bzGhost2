# bzGhost像鬼的聊天软件
![ci](https://api.travis-ci.org/xtuhcy/gecco.svg?branch=master)
![maven](https://img.shields.io/maven-central/v/com.geccocrawler/gecco.svg?style=flat-square)
[![996.icu](https://img.shields.io/badge/link-996.icu-red.svg)](https://996.icu)

打造跨终端跨平台即时通讯，个人也能玩的转的聊天软件。

![](/assets/home.jpg)

# 版权信息
软件遵循[MIT](https://baike.baidu.com/item/MIT/10772952)开源协议，意味着您无需支付任何费用，也无需授权，即可将 软件应用到您的产品中。
注意：这并不意味着您可以将软件应用到非法的领域，比如涉及赌博，暴力等方面。
如因此产生纠纷等法律问题， 作者不承担任何责任。
切勿以身试法!!!
如有问题联系作者 18767176707


# 截图

## 1.1电脑版本截图
![](/assets/pc_03.png)
![](/assets/pc_02.png)
![](/assets/pc_01.png)

## 1.2手机截图
![](/assets/app_01.jpg)
![](/assets/app_02.jpg)
![](/assets/app_03.jpg)

## 1.3管理截图
![](/assets/web_01.png)



# 参考文献

* [https://gitee.com/lele-666/V-IM.git](https://gitee.com/lele-666/V-IM.git)
* [http://doc.ruoyi.vip/ruoyi/](http://doc.ruoyi.vip/ruoyi/)
* [https://gitee.com/xiaowang0482/wechat.git](https://gitee.com/xiaowang0482/wechat.git)


#   下载体验

会将各个版本的演示在此展示，目前演示的版本有H5，安卓，苹果，电脑，其他版本的演示将会陆续添加


## 1.1 web版本

| 链接 | 类型 | 版本 | 大小 |
| :--- | :--- | :--- | :--- |
| [后台管理](http://42.193.146.14:8089/index.html) | .html | 1.0.0 | 0MB |



## 1.2手机版本

| 链接 | 类型 | 版本 | 大小 |
| :--- | :--- | :--- | :--- |
| [Download](http://42.193.146.14:8089/yiqun.apk) | .apk | 1.0.0 | 24.2 MB |

## 1.3电脑版本

| 链接 | 类型 | 版本 | 大小 |
| :--- | :--- | :--- | :--- |
| [Download](http://42.193.146.14:8089/yiqun.exe) | .exe | 1.0.0 | 52.5 MB |

##  1.4账号说明

\*\*注意：
测试账号分别为：admin /123456


# 通讯底层封装
##   webim.js

### 通讯文件

* 分离了API 与webSocket 。
* 群通道，用户通道。
* 重试次数，心跳检测，断网重连。
* 字节传输，支持自定义加密解密等功能。

### 1.1 用户绑定

* **方法名** login

* **参数说明**

| 属性名 | 备注 | 类型 | 可选值 |
| :--- | :--- | :--- | :--- |
| userId | 用户唯一标识 | String | 5f6d9d98 |
| command | 指令集 | Number | 1 |
| version | 版本号 | Number | 1 |

* **请求入参**

```js
let packet = {
version:1,
command: 1,
userId:"5f6d9d98"
}
```

* **响应参数**

```js
let packet = {
version : 1,
command: 2,
errorMsg:"",
success: true
}
```

### 1.2 加入群组

* **方法名** joinGroup
* **参数说明**

| 属性名 | 备注 | 类型 | 可选值 |
| :--- | :--- | :--- | :--- |
| chatId | 聊天对象\(群/用户\) | String | 04b09fbee3d24a21a2acedc755d5d7c3 |
| userId | 唯一标识 | String | 5f6d9d98 |
| chatType | 聊天类型\(群聊/私聊\) | Number | 0/1 |
| command | 指令集 | Number | 7 |
| version | 版本号 | Number | 1 |

* **请求入参**

```js
let packet = {
    chatId:"04b09fbee3d24a21a2acedc755d5d7c3",
    userId:"5f6d9d98",
    chatType: 0,
    version: 1,
    command: 7
}
```

* **响应参数**

```js
let packet = {
    version : 1,
    command: 8,
    errorMsg:"",
    success: true
}
```

### 1.3 退出群组

* **方法名** quitGroup
* **参数说明\(参照加入群组\)**
* **请求入参**

```js
let packet = {
    chatId:"04b09fbee3d24a21a2acedc755d5d7c3",
    userId:"5f6d9d98",
    chatType: 0,
    version: 1,
    command: 9
}
```

* **响应参数**

```js
let packet = {
    version : 1,
    command: 10,
    errorMsg:"",
    success: true
}
```

### 1.4 发送消息

* **方法名** sendMessage
* **参数说明**

| 属性名 | 备注 | 类型 | 可选值 |
| :--- | :--- | :--- | :--- |
| isItMe | 发送人 | Boolen | false/true |
| contentType | 消息类型\(文字/图片/语音/视频/红包\) | Number | 0/1/2/3/4/5 |
| content | 消息内容 | String | 测试 |
| createTime | 创建时间 | Date | 2021-11-2 |
| hasBeenSentId | 消息id | String | 1447565 |
| fromUserId | 发送人id | String | 220e805b8521444e9f27d78e45633b44 |
| fromUserName | 发送人账户 | String | test |
| fromUserHeadImg | 发送人图像 | String | defalut.jpg |
| userId | 当前用户id | String | 5f6d9d98 |
| toUserId | 接收人id | String | 5f6d9d98 |
| toUserName | 接收人账户 | String | admin |
| toUserHeadImg | 接收人图像 | String | defalut.jpg |
| chatType | 聊天类型\(群/私\) | Number | 1/0 |
| version | 版本 | Number | 1 |
| command | 指令集 | Number | 3 |

* **请求入参**

```js
let packet = {
    isItMe: true,
    contentType: 0,
    content: "测试",
    createTime: Date.now(),
    hasBeenSentId: Date.now(),
    fromUserId: "5f6d9d98",
    fromUserName: "admin",
    fromUserHeadImg: '/static/image/huge.jpg',
    userId: "5f6d9d98",
    toUserId: "220e805b8521444e9f27d78e45633b44",
    toUserName: "test",
    toUserHeadImg:'/static/image/huge.jpg',
    chatType: 0,
    version : 1,
    command: 3,
};
```

* **响应参数**

```js
let packet = {
    isItMe: true,
    contentType: 0,
    content: "测试",
    createTime: Date.now(),
    hasBeenSentId: Date.now(),
    fromUserId: "5f6d9d98",
    fromUserName: "admin",
    fromUserHeadImg: '/static/image/huge.jpg',
    userId: "5f6d9d98",
    toUserId: "220e805b8521444e9f27d78e45633b44",
    toUserName: "test",
    toUserHeadImg:'/static/image/huge.jpg',
    chatType: 0,
    version : 1,
    command: 4,
};
```

### 1.5 指令集参照表

| 指令集 | 备注 |
| :--- | :--- |
| 1 | 用户绑定请求 |
| 2 | 用户绑定响应 |
| 7 | 加群请求 |
| 8 | 加群响应 |
| 9 | 退群请求 |
| 10 | 退群响应 |
| 3 | 发送消息请求 |
| 4 | 发送消息响应 |


##   webPacketCode.js

### 数据包解码文件

报文格式：magic4字节 + 版本1字节 + 序列化算法1字节 + 指令1字节 + 数据长度4字节 + 数据内容

总字节长度 = 11 + 数据内容长度



* 编码encode

```js
let dataView = new DataView(buffer)

    dataView.setInt32(0, 0x12345678)
    
    dataView.setInt8(4, packet.version)
    
    dataView.setInt8(5, 1) // 写死1表示json序列化
    
    dataView.setInt8(6, packet.command)
    
    dataView.setInt32(7, bytes.length)

for (let i = 11; i < bytes.length + 11; i++) {
    dataView.setUint8(i, bytes[i - 11])
}
```

* 解码decode

```js
let dataView = new DataView(buffer)

let lenght = dataView.getInt32(7)

let bytes = []
for (let i = 11; i < lenght + 11; i++) {
    bytes[i - 11] = dataView.getUint8(i)
}
```


##   webSocket.js

封装uni方法 支持心跳包，断线重连，断线重试，网络检测，发送自定义报文。

### 1.1 initWebSocket\(options\)

初始化创建一个[websocket](https://developer.mozilla.org/zh-CN/docs/Web/API/WebSocket)连接

**options参数说明**

| 参数名 | 类型 | 说明 |
| :--- | :--- | :--- |
| url | String | 服务器地址ws://协议 |
| success | Function | 接口调用成功回调函数 |
| fail | Function | 接口调用失败回调函数 |

**示例代码**

```js
WEBIM.options = {
    url: 'ws://127.0.0.1',
    success(res) {
        resolve(res);
    },
    fail(e) {
        reject(e);
    }
}

WEBIM.server.initWebSocket(WEBIM.options);
```

### 1.2 sendWebSocketMsg\(options\)

通过 WebSocket 连接发送数据，需要先 initWebSocket，并在 \_onSocketOpened回调之后才能发送

**options参数说明**

| 属性 | 类型 | 说明 |
| :--- | :--- | :--- |
| data | ArrayBuffer | 服务器发送消息 [encode编码](http://bzghost.com/packetcodecjs.html) |
| success | Function | 成功回调函数 |
| fail | Function | 失败回调函数 |

**示例代码**

```js
WEBIM.server.sendWebSocketMsg({
    data: arrayBuffer,
    success(res) {},
    fail(err) {
        // 进行重连
        WEBIM.server._isLogin = false;
        if (WEBIM.server._isReconnection) {
            console.log('网络中断，尝试重连')
            WEBIM.options = {
            url: WEBIM.serverUrl,
            success(res) {},
            fail(err) {}
            }
        WEBIM.server._reConnect(WEBIM.options)
         }
    console.log('【websocket】发送失败,尝试手动重连')
    }
});
```

### 1.3 onReceivedMsg\(callBack\)

监听WebSocket接受到服务器的消息事件。

**CALLBACK 返回参数**

| 属性 | 类型 | 说明 |
| :--- | :--- | :--- |
| callBack | ArrayBuffer | 服务器返回消息数据 [decode解码](http://bzghost.com/packetcodecjs.html) |

**示例代码**

```js
WEBIM.server.onReceivedMsg(event => {
let packet = packetCode.decode(event.data);
let command = packet.command;

eventDispatcher.dispatchEvent(command, toJSON(packet))
eventDispatcher.removeListener(command, toJSON(packet))

if(command === -10){
store.commit('setNewsPush', packet);
}
});
```



# 捐赠研发

![](/assets/微信图片_20210530130450.jpg)![](/assets/微信图片_20210530130459.jpg)![](/assets/微信图片_20210629151220.png)






