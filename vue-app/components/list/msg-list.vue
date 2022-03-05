<template>
	<view class="u-page">
		
		<u-transition :show="true" mode="fade">
		        
		<u-list
			@scrolltolower="scrolltolower"
		>
			<u-list-item
				v-for="(item, index) in conversation"
				:key="index"
				
			>
				<u-cell @tap="jumpChatPage(item)"
					:title="item.chatName"
					:clickable="true"
					:label="item.msgType==0?item.content:message[item.msgType]"
				>
					<u-badge type="error" slot="right-icon" max="99" :value="item.unreadNumber"></u-badge>
					<u-avatar
						slot="icon"
						shape="square"
						size="50"
						:src="webUrl + item.imgUrl"
						customStyle="margin: -3px 5px -3px 0"
					></u-avatar>
					 
					 <u--text size="10" slot="right-icon" :text="item.lastOpenTime | format"></u--text>
				</u-cell>
			</u-list-item>
		</u-list>
		
		</u-transition>
	</view>
</template>

<script>
	import { mapState } from 'vuex';
	import base from '@/util/baseUrl.js';
	export default {
		name:'msg-list',
		data() {
			return {
				messageType:{
					text:0,
					video:1,
					audio:2,
					image:3,
					createPacket:4,
					robPacket:5
				},
				message:['文字', '视频', '录音', '图片', '红包'],
				 webUrl:base.webUrl
			}
		},
		computed: {
			...mapState(['conversation','user'])
		},
		methods: {
			scrolltolower() {
				let userId = this.user.operId;
				this.$http.post('app/conversation/list', {
					userId
				}).then(res=>{
					res.sort(function(a, b){return b.lastOpenTime>a.lastOpenTime});
					this.$store.commit("setConversation", res)
				});
			},
			jumpChatPage(item){
				this.$store.commit("setChatObj",item);
				this.$u.route({
					url: 'pages/chat/chat'
				})
			}
		},
		filters: {
		   format: function (e) {
			  // 获取js 时间戳
			  let time = new Date().getTime();
			  // 去掉 js 时间戳后三位
			  time = parseInt((time - e) / 1000);
			  // 存储转换值
			  let s;
			  if (time < 60 * 10) {
			    // 十分钟内
			    return '刚刚';
			  } else if (time < 60 * 60 && time >= 60 * 10) {
			    // 超过十分钟少于1小时
			    s = Math.floor(time / 60);
			    return s + '分钟前';
			  } else if (time < 60 * 60 * 24 && time >= 60 * 60) {
			    // 超过1小时少于24小时
			    s = Math.floor(time / 60 / 60);
			    return s + '小时前';
			  } else if (time < 60 * 60 * 24 * 3 && time >= 60 * 60 * 24) {
			    // 超过1天少于3天内
			    s = Math.floor(time / 60 / 60 / 24);
			    return s + '天前';
			  } else {
			    // 超过3天
			   var date = new Date(e);//时间戳为10位需*1000，时间戳为13位的话不需乘1000
			   var Y = date.getFullYear() + '-';
			   var M = (date.getMonth()+1 < 10 ? '0'+(date.getMonth()+1) : date.getMonth()+1) + '-';
			   var D = date.getDate() + ' ';
			   var h = date.getHours() + ':';
			   var m = date.getMinutes() + ':';
			   var ss = date.getSeconds();
			   return h+m+ss;
			  }  
		   }
		}
	}
</script>

<style lang="scss">
	.u-page {
		padding: 0;
		background-color: white;
	}
	/* 或者单是设置透明度 */
	.cell-hover-class {
		opacity: 0.5;
	}
</style>
