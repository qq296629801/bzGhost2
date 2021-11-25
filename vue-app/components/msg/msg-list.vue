<template>
	<view class="u-page">
		<u-list
			@scrolltolower="scrolltolower"
		>
			<u-list-item
				v-for="(item, index) in conversation"
				:key="index"
			>
				<u-cell @tap="jumpChatPage(item)" :clickable="true"
					:title="item.chatName" :label="item.msgType==0?item.content:message[item.msgType]"
				>
					<u-avatar
						slot="icon"
						shape="square"
						size="50"
						src="https://cdn.uviewui.com/uview/album/1.jpg"
						customStyle="margin: -3px 5px -3px 0"
					></u-avatar>
					
					 <u-badge type="error" slot="value" max="99" :value="item.unreadNumber"></u-badge>
				</u-cell>
			</u-list-item>
		</u-list>
	</view>
</template>

<script>
	import { mapState } from 'vuex';
	export default {
		name:'msg-list',
		data() {
			return {
				message:['文字', '图片', '表情', '语音', '视频',
				 '签到', '撤销', '发红包', '抢红包','其它'],
			}
		},
		computed: {
			...mapState(['conversation'])
		},
		methods: {
			scrolltolower() {
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
