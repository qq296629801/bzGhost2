<template>
	<view>
		<view class="content" @touchstart="hideDrawer">
				<mescroll-body class="msg-list" @init="mescrollInit" :down="downOption" :up="upOption" @down="downCallback" @up="upCallback">
				
					<view class="row" v-for="(row,index) in msgList" :key="row.id" :id="'message_'+index">
						
						<system-bubble :index="index" :row="row"></system-bubble>
						
						<left-bubble @sendMsg="sendMsg" :index="index" :row="row"></left-bubble>
						
						<right-bubble @sendMsg="sendMsg" :index="index"  :row="row"></right-bubble>
					</view>
				
				</mescroll-body>
		</view>
		
		<!-- 抽屉栏 -->
		<im-drawer @addEmoji="addEmoji" @sendMsg="sendMsg" @getImage="getImage"
				   @redShow="redFlag = true" :hideMore="hideMore" :hideEmoji="hideEmoji"></im-drawer>
		
		<!-- 底部输入框 -->
		<footer-input @textMsgTap="textMsgTap" @switchVoice="switchVoice" @chooseEmoji="chooseEmoji" @sendMsg="sendMsg"
					  @showMore="showMore" @hideDrawer="hideDrawer" @openDrawer="openDrawer"
		 :disabledSay="disabledSay" :textMsg2="textMsg"
					  :inputOffsetBottom="inputOffsetBottom" :isVoice="isVoice"></footer-input>
		
		<!-- 红包卡片弹窗 -->
		<!-- <red-card @robRed="robRed" @closeRed="closeRed" :winState="winState"></red-card> -->
		
		<!-- 发红包弹窗 -->
		<u-popup v-model="redFlag" mode="top" length="50%">
			<red-envelope @sendRedPacket="sendRedPacket"></red-envelope>
		</u-popup>
	</view>
</template>
<script>
	import ImDrawer from '@/components/chat/im-drawer.vue'
	import RedCard from '@/components/chat/red-card.vue'
	import RedEnvelope from "@/components/redenvelope"
	import ImgCache from '@/components/img-cache/img-cache.vue'
	import RightBubble from '@/components/chat/right-bubble.vue'
	import LeftBubble from '@/components/chat/left-bubble.vue'
	import FooterInput from '@/components/chat/footer-input.vue'
	import SystemBubble from '@/components/chat/system-bubble.vue'
	import { mapState, mapMutations} from 'vuex';
	import MescrollMixin from "@/uni_modules/mescroll-uni/components/mescroll-uni/mescroll-mixins.js";
	import { emojiList } from "@/util/emoji.js"
	import history from '@/util/history.js'
	export default {
		mixins: [MescrollMixin], // 使用mixin (在main.js注册全局组件)
		components: {
			ImDrawer,
			RedCard,
			ImgCache,
			RightBubble,
			LeftBubble,
			SystemBubble,
			RedEnvelope,
			FooterInput
		},
		data() {
			return {
				downOption:{
					auto:false,
					autoShowLoading: true, // 显示下拉刷新的进度条
					textColor: "#FF8095" // 下拉刷新的文本颜色
				},
				upOption: {
					use: false, // 禁止上拉
					toTop: {
						src: '' // 不显示回到顶部按钮
					}
				},
				textMsg: '',
				redFlag: false,
				pageNum:1,
				disabledSay:0,
				inputOffsetBottom: 0,
				viewOffsetBottom: 0, 
				msgList:[],
				isVoice:false,
				playMsgid:null,
				popupLayerClass:'',
				hideMore:true,
				hideEmoji:true,
				winState:'',
				message:{},
				loading:false,
			};
		},
		//头部按钮监听
		onNavigationBarButtonTap({ index }) {
			if (index == 0) {
				let url = this.chatObj.chatType==1?'groupDetail':'userDetail'
				this.$u.route({
					url: 'pages/chat/' + url,
				});
				//用户详情 设置
			} else if (index == 1) {
				//返回按钮
				this.$u.route({
					type: 'navigateBack',
					url: 'pages/home/home'
				});
			}
		},
		onLoad() {
			this.sendMsg(0,'');
			this.getMsgItem();
			//this.readMe();
		},
		onShow(){
			this.$nextTick(() => {
				this.hideDrawer();
				this.disabledSay = 0
				
			});
		},
		onReady() {
            // #ifdef H5
            const icon = document.getElementsByClassName('uni-page-head-btn')[0];
            icon.style.display = 'none';
            // #endif
			uni.setNavigationBarTitle({
				title: this.chatObj.chatName
			});
			//h5暂不支持键盘的高度监听
			uni.onKeyboardHeightChange(res => {
				this.inputOffsetBottom = res.height;
				this.viewOffsetBottom = res.height + uni.upx2px(100);
				if (res.height == 0) {
					// #ifndef MP-WEIXIN
					//this.showInput = false;
					// #endif
				}
			});
		},
		computed: {
			...mapState(['userData','chatObj'])
		},
		watch:{
			inputOffsetBottom: {
				handler(val) {
					if (val != 0) {
						this.$nextTick(() => {
							//暂时不支持h5的滚动方式 因为h5不支持键盘的高度监听
							//微信小程序会把input的焦点和placeholder顶起，正在寻找解决方案
							// #ifndef MP-WEIXIN || H5
							this.bindScroll(this.sel, 100);
							// #endif
						});
					}
				}
			}
		},
		methods:{
			// 监听文本输入
			textMsgTap(t){
				this.textMsg = t;
			},
			// 切换语音/文字输入
			switchVoice(){
				this.hideDrawer();
				this.isVoice = this.isVoice?false:true;
			},
			//添加表情
			addEmoji(em, del){
				//判断删除按钮
				if(del){
				  var str;
				  var msglen = this.textMsg.length - 1;
				  let start = this.textMsg.lastIndexOf("[");
				  let end = this.textMsg.lastIndexOf("]");
				  let len = end - start;
				  if(end != -1 && end === msglen && len >= 2 && len <= 4){
					    // 表情字符
						str = this.textMsg.slice(0, start);
					}else{
						// 普通键盘输入汉字 或者字符
						str = this.textMsg.slice(0, msglen);
					}
					
					this.textMsg = str
					return;
				}
			    this.textMsg += em.emojiItem.alt;
			},
			oLf(row){
				this.lClickId = row.id;
			},
			onPopups(row){
				this.rClickId = row.id;
			},
			// 关闭红包弹窗
			closeRed(){
				this.winState = 'hide';
				setTimeout(()=>{
					this.winState = '';
				},200)
			},
			// 打开红包
			openPacket(msg){
				this.winState = 'show'
				this.message = msg
				this.$u.vuex('packet',this.red_process(msg.msgContext));
			},
			// 开始抢红包
			robRed(){
				this.sendMsg(8, this.message.id);
			},
			//处理红包数据
			red_process(msgContext){
				let packets = JSON.parse(msgContext).Packets;
				let msg = {
						description:'红包异常',
						money:0,
						number:0,
						userAvatar:'defalut.jpg',
					}
				if(packets===undefined)
					return msg;
				return packets[0];
			},
			hideRed(){
				this.redFlag = false;
			},
			//更多功能(点击+弹出)
			showMore(){
				this.isVoice = false;
				this.hideEmoji = true;
				if(this.hideMore){
					this.hideMore = false;
					this.openDrawer();
				}else{
					this.hideDrawer();
				}
			},
			// 打开抽屉
			openDrawer(){
				this.popupLayerClass = 'showLayer';
			},
			// 隐藏抽屉
			hideDrawer(){
				setTimeout(()=>{
					this.popupLayerClass = '';
					this.hideMore = true;
					this.hideEmoji = true;
					this.rClickId = 0;
					this.lClickId = 0;
					uni.hideKeyboard();
				},150);
			},
			//删除
			deleteMethod(id,index){
				this.msgList.splice(index,1);
			},
			//处理红包数据
			red_process(msgContext){
				let packets = JSON.parse(msgContext).Packets;
				let msg = {
					description:'红包异常',
					money:0,
					number:0,
					userAvatar:'defalut.jpg',
					surplusMoney:0,
					Records:[]
				}
				if(packets==undefined){
					return msg;
				}
				if(packets.length==0){
					return msg;
				}
				return packets[0];
			},
			//发送红包
			sendRedPacket(packet){
				if(this.chatObj.chatType==0){
					uni.showToast({
						title:'暂不支持私发红包'
					})
					return;
				}
				this.sendMsg(7, packet)
				this.redFlag = false;
			},
			//暂时不适配微信小程序，正在解决此bug
			bindScroll(sel, duration = 0) {
				uni.createSelectorQuery()
					.select('#content')
					.boundingClientRect(data => {
						//最外层盒子节点
						uni.createSelectorQuery()
							.select(sel)
							.boundingClientRect(res => {
								if (!res) return;
								//选中的节点
								let windowHeight = 0;
								uni.getSystemInfo({
									success: system => {
										windowHeight = system.windowHeight;
									}
								});
								const inputKeyBoardHeight = uni.upx2px(100) + this.inputOffsetBottom; 
								//input输入框和键盘的高度
								const contentHeight = windowHeight - inputKeyBoardHeight; 
								//可视内容的高度（除去input输入框和键盘）
								let scrollTop = 0;
								scrollTop = res.top - data.top - contentHeight + res.height; 
								//滚动到实际距离是元素距离顶部的距离减去最外层盒子的滚动距离再减去可视内容的高度然后再加上此元素的高度
								uni.pageScrollTo({ duration, scrollTop });
							})
							.exec();
					})
					.exec();
			},
			//消费消息
			readMe() {
			  let _this = this
			  this.$socket.openChat(this.chatObj.chatId, this.userData.user.operId, this.chatObj.chatType, res => {
				if (res.success) {
				  if (_this.chatObj.chatType == 1) {
					if (res.groupUser === undefined) {
					  _this.disabledSay = 1
					} else {
					  _this.disabledSay = res.groupUser.status
					}
				  }
				}else {
					uni.showToast({
						icon:'none',
						title: res.response.errorMessage
					})
				}
			  })
			},
			// localStorage版本获取消息列表
			getMsgItem(){
				history.get(this.chatObj.chatId).then(res=>{
					this.msgList = res
					this.$nextTick(function(){
						this.mescroll.scrollTo(99999, 0);
					})
				})
				/* if(this.chatObj.chatType==0){
					 this.$socket.queryFriendMessages(this.chatObj.chatId, this.userData.user.operId,1, (res) => {
						 this.msgList = res.response.data;
					 });
				}else {
                    queryData(this.chatObj.chatId).then(res=>{
                        this.msgList = res;
                    });
				} */
			},
			//触发滑动到顶部(加载历史信息记录)
			loadHistory(e){
			if(this.loading){
				return;
			}
			this.loading = true;
			let arr = ['queryFriendMessages','queryGroupMessages'];
			let i = this.chatObj.chatType
			  this.$socket[arr[i]](this.chatObj.chatId, this.userData.user.operId, this.pageNum, res => { 
				  let message = res.response.data;
				  if(message.length>0){
					  message.forEach(m=>{
						  if (!this.msgList.map(v => v.id).includes(m.id)) {
							this.msgList.push(m)
						  }  
					  });
					  uni.stopPullDownRefresh();
					  this.mescroll.endByPage(1, 1);
					  this.msgList.sort((a, b) => { return a.id - b.id })
					  this.pageNum++
				  }else{
					  this.mescroll.endErr();
				  }
				  this.loading = false;
				});
			},
			//处理图片尺寸，如果不处理宽高，新进入页面加载图片时候会闪
			setPicSize(content){
				// 让图片最长边等于设置的最大长度，短边等比例缩小，图片控件真实改变，区别于aspectFit方式。
				let maxW = uni.upx2px(350);//350是定义消息图片最大宽度
				let maxH = uni.upx2px(350);//350是定义消息图片最大高度
				if(content.w>maxW||content.h>maxH){
					let scale = content.w/content.h;
					content.w = scale>1?maxW:maxH*scale;
					content.h = scale>1?maxW/scale:maxH;
				}
				return content;
			},
			
			// 选择图片发送
			chooseImage(){
				this.getImage('album');
			},
			//拍照发送
			camera(){
			  this.getImage('camera');
			},
			//发红包
			handRedEnvelopes(){
			  this.hideDrawer();
			},
			//选照片 or 拍照
			getImage(type){
				let that=this;
				this.hideDrawer();
				uni.chooseImage({
					sourceType:[type],
					sizeType: ['original', 'compressed'], //可以指定是原图还是压缩图，默认二者都有
					success: (res)=>{
						for(let i=0;i<res.tempFilePaths.length;i++){
							uni.getImageInfo({
								src: res.tempFilePaths[i],
								success: (image)=>{
									  uni.uploadFile({
									            url: this.$uploadUrl, //仅为示例，非真实的接口地址
									            filePath: res.tempFilePaths[i],
									          header: {
											   'merchcode':'md5'
											   },
											   name: 'file',
											   formData: {
											       'user': 'test'
											   },
											     success: (res) => {
													 let data = JSON.parse(res.data)
												     this.sendMsg(1, data.data)
									            }
									   });
								}
							});
						}
					}
				});
			},
			// 选择表情
			chooseEmoji(){
				this.hideMore = true;
				if(this.hideEmoji){
					this.hideEmoji = false;
					this.openDrawer();
				}else{
					this.hideDrawer();
				}
			},
			//发送消息
			sendMsg (msgType, text) {
			 
			 if (this.disabledSay == 1) {
				 uni.showToast({
				 	title:'你已经被管理员禁言'
				 });
				 return;
			 }
			 
			 // if(text!='' && this.chatObj.chatType==1){
				//  this.$socket.createChatList(this.userData.user.operId, this.chatObj.chatId, text, msgType, res => {});
			 // }
			 
			  let arr = ['send2Friend','send2Group'];
			  let _this = this;
			  
			  this.$socket[arr[this.chatObj.chatType]](this.chatObj.chatId, this.userData.user.operId, text, msgType, res => {
				if (res.success) {
					if (res.response!==undefined) {
						const data = res.response.data
						if(res.msgType===8){
							_this.envelope(res);
						}else if(res.msgType===6){
							_this.rollBack(res);
						}else {
							if(_this.chatObj.chatType===1){
								if(data!==undefined){
									if (data.groupId === this.chatObj.chatId) {
										_this.addMsg(data);
										uni.vibrateLong();
									}
									history.up(data, _this.chatObj.chatId);
								}
							}else {
								if(data!==undefined){
									if(data.sendUid==this.chatObj.chatId||data.sendUid==this.userData.user.operId){
										_this.addMsg(data);
										uni.vibrateLong();
									}
								}
								
							}
						}
					}
				}
				this.textMsg = ''
			  });
			},
			// 接受消息(筛选处理)
			addMsg(msg){
				// 用户消息
				switch (msg.msgType){
					case 0:
						this.addTextMsg(msg);
						break;
					case 1:
						this.addImgMsg(msg);
						break;
					case 3:
						this.addVoiceMsg(msg);
						break;
					case 7:
						this.addEnvelopeMsg(msg);
						break;
					default:
				}
			},
			//撤销
			rollBack(res){
				if(this.chatObj.chatType==0){
					if (res.chatId != undefined && res.message == undefined) {
					  for(var index in this.msgList){
						if(this.msgList[index].id==res.chatId){
							this.msgList.splice(index,1);
							upCanceData(res.chatId,this.chatObj.chatId,this.msgList[index]);
						}
					  }
					}
				}else {
					if (res.msgId != undefined && res.message == undefined) {
					  for(var index in this.msgList){
						if(this.msgList[index].id==res.msgId){
							this.msgList.splice(index,1);
							upCanceData(res.msgId,this.chatObj.chatId,this.msgList[index]);
						}
					  }
					}
				}
				
			},
			// 红包
			envelope(res){
				if (res.msgId != undefined && res.message != undefined) {
					//this.$u.vuex('packet',this.red_process(res.message));
					for(var index in this.msgList){
						if(this.msgList[index].id==res.msgId){
							this.msgList[index].msgContext = res.message;
						}
					}
					upRedData(res.msgId,this.chatObj.chatId,res.message);
				}
			},
			// 添加文字消息到列表
            addTextMsg(msg){
                this.msgList.push(msg);
            },
            // 添加语音消息到列表
            addVoiceMsg(msg){
                this.msgList.push(msg);
            },
            // 添加图片消息到列表
            addImgMsg(msg){
                this.msgList.push(msg);
            },
            addEnvelopeMsg(msg){
                this.msgList.push(msg);
            },
            // 添加系统文字消息到列表
            addSystemTextMsg(msg){
                this.msgList.push(msg);
            },
            // 添加系统红包消息到列表
            addSystemRedEnvelopeMsg(msg){
                this.msgList.push(msg);
            },
			discard(){
				return;
			},
		}
	}
</script>
<style lang="scss">
	@import "./style.scss";
</style>
