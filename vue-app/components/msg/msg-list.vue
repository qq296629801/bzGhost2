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
					:label="item.msgType==0?item.content:message[item.msgType]"
				>
					<u-avatar
						slot="icon"
						shape="square"
						size="50"
						:src="webUrl + item.imgUrl"
						customStyle="margin: -3px 5px -3px 0"
					></u-avatar>
					 <u-badge type="error" slot="right-icon" max="99" :value="item.unreadNumber"></u-badge>
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
