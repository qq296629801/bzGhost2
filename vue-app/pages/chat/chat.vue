<template>
	<view class="content">
		<view class="content-box" @touchstart="touchstart" id="content-box" :class="{'content-showfn':showFunBtn}">
			<!-- 背景图- 定位方式 -->
			<!-- <image class="content-box-bg" src="" :style="{ height: imgHeight }"></image> -->
			<view class="content-box-loading" v-if="!loading"><u-loading mode="flower"></u-loading></view>
			<mescroll-body ref="mescrollRef" bottom="20%" @init="mescrollInit" :down="downOption" @down="downCallback" :up="upOption">
			<view class="message" v-for="(item, index) in messageList" :key="index" :id="`msg-${item.hasBeenSentId}`">
				<view class="message-item " :class="item.isItMe ? 'right' : 'left'">
					<image class="img" :src="item.fromUserHeadImg" mode="" @tap="linkCard(item)"></image>
					<!-- contentType = 1 文本 -->
					<view @tap="tapText(item)" @longtap="longtapText($event)" class="content" v-if="item.contentType == messageType.text">{{ item.content }}</view>
					<!-- contentType = 2 语音 -->
					<view
						class="content contentType2"
						:class="[{ 'content-type-right': item.isItMe }]"
						v-if="item.contentType == messageType.audio"
						@tap="handleAudio(item)"
						hover-class="contentType2-hover-class"
						:style="{width:`${130+(item.contentDuration*2)}rpx`}"
					>
						<view
							class="voice_icon"
							:class="[
								{ voice_icon_right: item.isItMe },
								{ voice_icon_left: !item.isItMe },
								{ voice_icon_right_an: item.anmitionPlay && item.isItMe },
								{ voice_icon_left_an: item.anmitionPlay && !item.isItMe }
							]"
						></view>
						<view class="">{{ item.contentDuration }}''</view>
					</view>
					<!-- contentType = 3 图片 -->
					<view 
						class="content contentType3" 	
						v-if="item.contentType == messageType.image"
						@tap="viewImg([item.content])"
					>
						<image :src="item.content" class="img" mode="widthFix"></image>
					</view>
					<!-- contentType = 4 红包 -->
					<view
						class="contentType4" 	
						v-if="item.contentType == messageType.createPacket"
						@tap="showCard(item)"
					>
						<div class="packet">
						  <view class="img">
							  <image src="/static/img/red.png"></image>
						  </view>
						  <span class="title">恭喜发财，大吉大利</span>
						</div>
						<div class="tag">红包</div>
						<div class="arrow"></div>
					</view>
					
				</view>
			</view> 
			</mescroll-body>
		</view>
		
		<!-- 底部聊天输入框 -->
		<view class="input-box" :class="{ 'input-box-mpInputMargin': mpInputMargin }">
			<view class="input-box-flex">
				<!-- #ifndef H5 -->
				<image v-if="chatType === 'voice'" class="icon_img" :src="require('@/static/voice.png')"  @click="switchChatType('keyboard')"></image>
				<image v-if="chatType === 'keyboard'" class="icon_img" :src="require('@/static/keyboard.png')"  @click="switchChatType('voice')"></image>
				<!-- #endif -->
				<view class="input-box-flex-grow"> 
					<input
						v-if="chatType === 'keyboard'"
						type="text"
						class="content"
						id="input"
						v-model="formData.content"
						:hold-keyboard="true"
						:confirm-type="'send'"
						:confirm-hold="true"
						placeholder-style="color:#DDDDDD;"
						:cursor-spacing="10"
						@confirm="sendMsg(null)"
					/>
					<view
						class="voice_title"
						v-if="chatType === 'voice'"
						:style="{ background: recording ? '#c7c6c6' : '#FFFFFF' }"
						@touchstart.stop.prevent="startVoice"
						@touchmove.stop.prevent="moveVoice"
						@touchend.stop="endVoice"
						@touchcancel.stop="cancelVoice"
					>
						{{ voiceTitle }}
					</view>
				</view>
				
				<!-- 功能性按钮 -->
				<view class="iconfont icontianjia icon_btn_add" @tap="switchFun"></view>
				<!-- <image class="icon_btn_add" :src="require('@/static/add.png')" @tap="switchFun"></image> -->
				
				<!-- #ifdef H5 --> 
				<button class="btn" type="primary" size="mini" @touchend.prevent="sendMsg(null)">发送</button>
				<!-- #endif -->
			</view>
			
			<view class="fun-box" :class="{'show-fun-box':showFunBtn}">
				<u-grid :col="4"  hover-class="contentType2-hover-class" :border="false" @click="clickGrid">
					<u-grid-item v-for="(item, index) in funList" :index="index" :key="index" bg-color="#eaeaea">
						<u-icon :name="item.icon" :size="52"></u-icon>
						<view class="grid-text">{{ item.title }}</view>
					</u-grid-item>
				</u-grid>
			</view>

		</view>
		
		<!-- //语音动画 -->
		<view class="voice_an"  v-if="recording">
			<view class="voice_an_icon">
				<view id="one" class="wave"></view>
				<view id="two" class="wave"></view>
				<view id="three" class="wave"></view>
				<view id="four" class="wave"></view>
				<view id="five" class="wave"></view>
				<view id="six" class="wave"></view>
				<view id="seven" class="wave"></view>
			</view>
			<view class="text">{{voiceIconText}}</view>
		</view
		>
		
		<!-- //左右按键 -->
		<chunLei-popups v-model="value" :popData="data" @tapPopup="tapPopup" :x="x" :y="y" direction="row" theme="dark" placement="bottom-end" dynamic>
		</chunLei-popups>
		
		<!-- 红包卡片 -->
		<red-card :packet="packet" :winState="winState" @hiddenCard="hiddenCard" @openCard="openCard"></red-card>
		
		<!-- 发包-->
		<packet :pStatus="pStatus" @packet="packetTap" @close="close"></packet>
	</view>
</template>

<script>
import MescrollMixin from "@/uni_modules/mescroll-uni/components/mescroll-uni/mescroll-mixins.js";
import chunLeiPopups from '@/components/chunLei-popups/chunLei-popups.vue'
import { mapState, mapMutations } from 'vuex';
import db from '@/util/chat/db_message.js';
import api from '@/util/chat/api.js'
import RedCard from '@/components/chat/red-card.vue'
import packet from '@/components/chat/packet.vue'
export default {
	mixins: [MescrollMixin], // 使用mixin
	components:{ RedCard, packet },
	data() {
		return {
			winState:'',
			downOption:{
				auto:false,
				autoShowLoading: true, // 显示下拉刷新的进度条
				textColor: "#FF8095" // 下拉刷新的文本颜色
			},
			pStatus:false,
			upOption: {
				use: false, // 禁止上拉
				toTop: {
					src: '' // 不显示回到顶部按钮
				}
			},
			x: 0,
			y: 0,
			value: false,
			packet:{},
			data: [{title:'复制',disabled:true},{title:'转发'},{title:'回复'},{title:'删除'}],
			formData: {
				content: '',
				limit: 10,
				index: 2
			},
			messageList: [],
			message:{
				hasBeenSentId:0
			},
			loading: true, //标识是否正在获取数据
			imgHeight: '1000px',
			mpInputMargin: false, //适配微信小程序 底部输入框高度被顶起的问题
			chatType:"keyboard",  // 图标类型 'voice'语音 'keyboard'键盘
			voiceTitle: '按住 说话',
			Recorder: uni.getRecorderManager(),
			Audio: uni.createInnerAudioContext(),
			recording: false, //标识是否正在录音
			isStopVoice: false, //加锁 防止点击过快引起的当录音正在准备(还没有开始录音)的时候,却调用了stop方法但并不能阻止录音的问题
			voiceInterval:null,
			voiceTime:0, //总共录音时长
			canSend:true, //是否可以发送
			PointY:0, //坐标位置
			voiceIconText:"正在录音...",
			showFunBtn:false, //是否展示功能型按钮
			AudioExam:null, //正在播放音频的实例
			funList: [
				{ icon:"photo-fill",title:"照片",uploadType:["album"] },
				{ icon:"camera-fill",title:"拍摄",uploadType:["camera"] },
				{ icon:"red-packet-fill",title:"红包",uploadType:["camera"] },
			],
			messageType:{
				text:0,
				video:1,
				audio:2,
				image:3,
				createPacket:4,
				robPacket:5
			}
		};
	},
	computed:{
		...mapState(['userData','chatObj'])
	},
	methods: {
		close(){
			this.pStatus = false;
		},
		// 发红包
		packetTap(packet){
			let _t = this;
			
			let reqData = {
				groupId: _t.chatObj.chatId,
				userId: _t.userData.user.operId,
				msgType: _t.messageType.createPacket,
				message: JSON.stringify(packet),
			}
			
			_t.$http.post('app/packet/createPacket', reqData).then(res=>{
				console.log(JSON.stringify(res));
				
				let params = {
					contentType: _t.messageType.createPacket,
					content: res
				}
				
				// 告诉大家我发了红包
				_t.sendMsg(params);
				_t.pStatus = false;
			});
		},
		// 开红包
		openCard: function(){
			let _t = this;
			
			let reqData = {
				groupId:_t.chatObj.chatId,
				msgId: _t.message.hasBeenSentId,
				userId: _t.userData.user.operId,
			}
			
			_t.$http.post('app/packet/robPacket', reqData).then(res=>{
				// 并且广播更新别人的
				console.log(JSON.stringify(res));
				let params = {
					contentType: _t.messageType.robPacket,
					content:res
				}
				_t.sendMsg(params);
			});
		},
		// 展示红包
		showCard(item){
			let _t = this;
			let content = JSON.parse(item.content);
			_t.packet = content.Packets[0];
			console.log(JSON.stringify(_t.packet))
			_t.message = item
			_t.winState = 'show';
		},
		hiddenCard(){
			this.winState = 'hide';
			setTimeout(()=>{
				this.winState = '';
			},200)
		},
		downCallback(){
			let _t = this;
			
			let httpReqData = {
				toGroupId: _t.chatObj.chatId,
				userId: _t.userData.user.operId,
				condition:'',
				pageNum: _t.formData.index,
				pageSize: 10
			}
			
			_t.$http.post('app/group/msg/list', httpReqData).then(res=>{
				_t.formData.index++;
				_t.mescroll.endSuccess();
				let data = res.list.sort(function(a, b){return a.hasBeenSentId-b.hasBeenSentId});
				let topMsg = _t.messageList[0];
				_t.messageList = data.concat(_t.messageList);
				_t.$nextTick(() => {
					if(_t.formData.index<=3){
						_t.mescroll.scrollTo(99999, 0);
					} else if(topMsg){
						_t.bindScroll(topMsg.hasBeenSentId);
					}
				});
			}).catch(e=>{
				//this.formData.index--; // 联网失败,必须回减页码
				//this.mescroll.endErr(); // 隐藏下拉刷新的状态
			});
		},
		tapPopup(item){
			if(item.title=='转发'){
				this.$u.route({
					url: 'pages/chat/forward',
					params: {
						message:this.message.content, 
						msgType:this.message.contentType
					}
				});
				//console.log(JSON.stringify(item))
			}
		},
		tapText(item){
			//console.log(JSON.stringify(item))
			this.message=item;
		},
		longtapText(e,index){
			this.x = e.touches[0].clientX
			this.y = e.touches[0].clientY
			this.value = !this.value
		},
		// 初始消息数据
		async initData() {
			db.get(this.chatObj.chatId).then(res=>{
				this.messageList = res.sort(function(a, b){return a.hasBeenSentId-b.hasBeenSentId});
				this.$nextTick(() => {
					this.mescroll.scrollTo(99999, 0);
					this.loading = true;
				});
			});
		},
		//处理滚动
		bindScroll(hasBeenSentId, duration = 0) {
			let view = uni.createSelectorQuery().select('#msg-'+ hasBeenSentId);
			view.boundingClientRect(v => {
				console.log("节点离页面顶部的距离=" + v.top);
				this.mescroll.scrollTo(v.top - 100, 0) // 减去上偏移量100
			}).exec();
		},
		//切换语音或者键盘方式
		switchChatType(type) {
			this.chatType = type;
			this.showFunBtn =false;
		},
		//切换功能性按钮
		switchFun(){
			this.chatType = 'keyboard'
			this.showFunBtn = !this.showFunBtn;
			uni.hideKeyboard()
		},
		//发送消息
		sendMsg(data) {
			let _t = this
			
			const params = {
				isItMe:true,
				contentType: _t.messageType.text,
				content: _t.formData.content,
				createTime: Date.now(),
				hasBeenSentId: Date.now(),
				fromUserId: _t.userData.user.operId,
				fromUserName: _t.userData.user.username,
				fromUserHeadImg: '/static/image/huge.jpg',
				userId: _t.userData.user.operId,
				toUserId: _t.chatObj.chatId,
				toUserName: _t.chatObj.chatName,
				toUserHeadImg:'/static/image/huge.jpg',
				chatType: _t.chatObj.chatType,
			};

			if (data) {
				if(data.contentType == _t.messageType.audio){
					//说明是发送语音
					params.contentType = _t.messageType.audio;
					params.anmitionPlay = false;
					params.content = data.content;
					params.contentDuration = data.contentDuration;
				}else if(data.contentType == _t.messageType.image){
					//发送图片
					params.content = data.content;
					params.contentType = _t.messageType.image;
				} else if(data.contentType == _t.messageType.createPacket){
					// 发送红包
					params.hasBeenSentId = data.content.id;
					params.content = data.content.msgContext;
					params.contentType = _t.messageType.createPacket;
				} else if (data.contentType == _t.messageType.robPacket){
					// 抢红包
					params.hasBeenSentId = data.content.id;
					params.content = data.content.msgContext;
					params.contentType = _t.messageType.robPacket;
				}
			} else if (!_t.$u.trim(_t.formData.content)) {
				//验证输入框书否为空字符传
				return;
			}
			
			// 抢红包不需要存储只需要广播 
			if(data.contentType == _t.messageType.robPacket){
				// 本地内存更改
				for(var a in _t.messageList){
					if(_t.messageList[a].hasBeenSentId == params.hasBeenSentId){
						_t.messageList[a].content = params.content;
						// 当前正在看的红包 才更新
						if(_t.message.hasBeenSentId == params.hasBeenSentId){
							_t.message = _t.messageList[a];
							let content = JSON.parse(params.content);
							_t.packet = content.Packets[0];
						}
					}
				}
				// 本地缓存更改
				db.upPacket(params.hasBeenSentId, _t.chatObj.chatId, params.content);
			}else {
				//本地内存
				_t.messageList.push(params);
				//本地缓存
				db.commit(params,_t.chatObj.chatId);
				
				// 创建红包不需要入库
				if(data.contentType != _t.messageType.createPacket){
					// 服务器入库
					api.messageCreate(_t.formData.content, params.contentType);
				}
			}
			
			// 发送消息到服务器转发
			_t.$socket.sendMessage(params, res=>{
				// 判断是否当前群组
				if(res.toUserId==_t.chatObj.chatId){
					// 判断发送人是不是自己
					if(res.fromUserId!=_t.userData.user.operId){
						if(res.content!=''){
							res.isItMe = false;
							// 红包广播
							if(res.contentType == _t.messageType.robPacket){
								// 修改红包内容
								for(var a in _t.messageList){
									if(_t.messageList[a].hasBeenSentId == res.hasBeenSentId){
										_t.messageList[a].content = res.content;
										// 当前正在看的红包 才更新
										if(_t.message.hasBeenSentId == res.hasBeenSentId){
											_t.message = _t.messageList[a];
											let content = JSON.parse(params.content);
											_t.packet = content.Packets[0];
										}
									}
								}
								db.upPacket(res.hasBeenSentId, _t.chatObj.chatId, res.content);
							}else {
								// 本地内存
								_t.messageList.push(res);
								// 本地缓存
								db.commit(res, _t.chatObj.chatId);
								// 页面置底
								_t.mescroll.scrollTo(99999, 0);
								// 页面红点
								uni.showTabBarRedDot({
									index: 0
								});
							}
						}
					}
				}
			});
			
				
			_t.$nextTick(() => {
				_t.formData.content = '';
					
				_t.mescroll.scrollTo(99999, 0);
				
				if(_t.showFunBtn){
					_t.showFunBtn = false;
				}
				
				// #ifdef MP-WEIXIN 
				if (params.contentType == 1) {
					_t.mpInputMargin = true;
				} 
				// #endif
				//h5浏览器并没有很好的办法控制键盘一直处于唤起状态 而且会有样式性的问题
				// #ifdef H5
				uni.hideKeyboard();
				// #endif
			});
		},
		//用户触摸屏幕的时候隐藏键盘
		touchstart() {
			uni.hideKeyboard();
		},
		// 卡片
		linkCard({userId, nickName, source}) {
			this.$u.route({
				url: 'pages/friend/businessCard',
				params: {
					userId, userName, source:0
				}
			});
		},
		//准备开始录音
		startVoice(e) {
			if(!this.Audio.paused){
				//如果音频正在播放 先暂停。
				this.stopAudio(this.AudioExam)
			}
			this.recording = true;
			this.isStopVoice = false;
			this.canSend = true;
			this.voiceIconText = "正在录音..."
			this.PointY = e.touches[0].clientY;
			this.Recorder.start({
				format: 'mp3'
			});
		},
		//录音已经开始
		beginVoice(){
			if (this.isStopVoice) {
				this.Recorder.stop();
				return;
			}
			this.voiceTitle = '松开 结束'
			this.voiceInterval =  setInterval(()=>{
				this.voiceTime ++;
			},1000)
		},
		//move 正在录音中
		moveVoice(e){
			const PointY = e.touches[0].clientY
			const slideY = this.PointY - PointY;
			if(slideY > uni.upx2px(120)){
				this.canSend = false;
				this.voiceIconText = '松开手指 取消发送 '
			}else if(slideY > uni.upx2px(60)){
				this.canSend = true;
				this.voiceIconText = '手指上滑 取消发送 '
			}else{
				this.voiceIconText = '正在录音... '
			}
		},
		//结束录音
		endVoice() {
			this.isStopVoice = true; //加锁 确保已经结束录音并不会录制
			this.Recorder.stop();
			this.voiceTitle = '按住 说话'
		},
		//录音被打断
		cancelVoice(e){
			this.voiceTime = 0;
			this.voiceTitle = '按住 说话';
			this.canSend = false;
			this.Recorder.stop();
		},
		//处理录音文件
		handleRecorder({ tempFilePath,duration }) {
			let contentDuration;
			// #ifdef MP-WEIXIN
			this.voiceTime = 0;
			if (duration < 600) {
				this.voiceIconText="说话时间过短";
				setTimeout(()=>{
					this.recording = false;
				},200)
				return;
			} 
			contentDuration = duration/1000;
			// #endif
			
			// #ifdef APP-PLUS
			contentDuration = this.voiceTime +1;
			this.voiceTime = 0;
			if(contentDuration <= 0) {
				this.voiceIconText="说话时间过短";
				setTimeout(()=>{
					this.recording = false;
				},200)
				return;
			};
			// #endif
			
			this.recording = false;
			const params = {
				contentType: 2,
				content: tempFilePath,
				contentDuration: Math.ceil(contentDuration)
			};
			this.canSend && this.sendMsg(params);
		},
		//控制播放还是暂停音频文件
		handleAudio(item) {
			this.AudioExam = item;
			this.Audio.paused ? this.playAudio(item) : this.stopAudio(item);
		},
		//播放音频
		playAudio(item) {
			this.Audio.src = item.content;
			this.Audio.hasBeenSentId = item.hasBeenSentId;
			this.Audio.play();
			item.anmitionPlay = true;
		},
		//停止音频
		stopAudio(item) {
			item.anmitionPlay = false;
			this.Audio.src = '';
			this.Audio.stop();
		},
		//关闭动画
		closeAnmition() {
			const hasBeenSentId = this.Audio.hasBeenSentId;
			const item = this.messageList.find(it => it.hasBeenSentId == hasBeenSentId);
			item.anmitionPlay = false;
		},
		//点击宫格时触发
		clickGrid(index){
			if(index == 0){
				this.chooseImage(['album'])
			}else if(index == 1){
				this.chooseImage(['camera'])
			}else if(index == 2){
				this.pStatus = true;
			}
		},
		//发送图片
		chooseImage(sourceType){
			uni.chooseImage({
				sourceType,
				sizeType:['compressed'], 
				success:res=>{ 
					this.showFunBtn = false;
					for(let i = 0;i<res.tempFilePaths.length;i++){
						const params = {
							contentType: 3,
							content: res.tempFilePaths[i],
						};
						this.sendMsg(params)
					}
				}
			})
		},
		//查看大图
		viewImg(imgList){
			uni.previewImage({
				urls: imgList,
				// #ifndef MP-WEIXIN
				indicator: 'number'
				// #endif
			});
		},
		onPageJump(url){
			this.$u.route({
				url: url,
				params: {}
			});
		},
	},
	//导航栏
	onNavigationBarButtonTap({ index }) {
		if (index == 0) {
			if(this.chatObj.chatType==1){
				uni.navigateTo({
					url: '/pages/group/index'
				});
			}else {
				uni.navigateTo({
					url: '/pages/user/index'
				});
			}
		} else if (index == 1) {
			uni.navigateBack({
				delta: 0,
				animationDuration: 0
			})
		}
	},
	//返回按钮事件
	onBackPress(e) {
	},
	onLoad(info) {

		//录音开始事件
		this.Recorder.onStart(e => {
			
			this.beginVoice();
		});
		//录音结束事件
		this.Recorder.onStop(res => {
			clearInterval(this.voiceInterval);
			this.handleRecorder(res);
		});

		//音频停止事件
		this.Audio.onStop(e => {
			this.closeAnmition();
		});

		//音频播放结束事件
		this.Audio.onEnded(e => {
			this.closeAnmition();
		});
	},
	onReady() {
		//自定义返回按钮 因为原生的返回按钮不可阻止默认事件
		// #ifdef H5
		const icon = document.getElementsByClassName('uni-page-head-btn')[0];
		icon.style.display = 'none';
		// #endif

		uni.setNavigationBarTitle({
			title: this.chatObj.chatName
		});
		
		uni.hideTabBarRedDot({
			index : 0,
		})
		
		this.initData();
		
		let _this = this
		
		// 绑定通道
		this.$socket.joinGroup(a=>{
			this.sendMsg(null)
		});
		
		uni.getSystemInfo({
			success: res => {
				this.imgHeight = res.windowHeight + 'px';
			}
		});
		
		uni.onKeyboardHeightChange(res => {
			if (res.height == 0) {
				// #ifdef MP-WEIXIN
				this.mpInputMargin = false;
				// #endif
			}else{
				this.showFunBtn = false;
			}
		});
	}
};
</script>

<style lang="scss" scoped>
 @import './index.scss'
</style>
