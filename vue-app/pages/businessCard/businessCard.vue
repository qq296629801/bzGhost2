<template>
	<view>
		<view class="userinfo">
			<u-avatar src="/static/image/huge.jpg" mode="square" size="110" @tap="previewImg(url)"></u-avatar>
			<view class="userinfo-desc">
				<view class="userinfo-desc-name">{{nickName}}</view>
				<view class="userinfo-desc-gray"></view>
			</view>
		</view>
		
		<view  class="perch"></view>
		
		<u-cell-group>
			<u-cell-item title="朋友圈" label="模拟数据暂不支持查看好友朋友圈" hover-class="none" :title-style="{ marginLeft: '10rpx' }"></u-cell-item>
			<u-cell-item title="更多信息" :title-style="{ marginLeft: '10rpx' }"></u-cell-item>
		</u-cell-group>
		
		<view  class="perch"></view>
		
		<u-cell-group>
			<u-cell-item v-if="source == 1" title="" @click="userAdd" :arrow="false" :center="true" :title-style="{ marginLeft: '10rpx' }">
				<view style="text-align: center;">添加到通讯录</view>
			</u-cell-item>
			<u-cell-item title="发消息" :arrow="false" :center="true" :title-style="{ marginLeft: '10rpx' }" @click="toChat">
				<u-icon slot="icon" name="chat-fill" color="#b4b4b4" size="34"></u-icon>
			</u-cell-item>
		</u-cell-group>
	</view>
</template>

<script>
	import { mapState, mapMutations} from 'vuex';
	export default {
		data() {
			return {
				nickName:'',
				userId:'',
				source:0
			}
		},
		methods: {
			...mapMutations(['setChatObj']),
			toChat(){
				this.setChatObj({
					chatId: this.userId,
					chatName:this.nickName,
					chatType:0
				});
				this.$u.route({
					url:"pages/chat/chat"
				});
			},
			userAdd(){
			},
			previewImg(urls){
				uni.previewImage({urls:[urls]})
			},
		},
		onLoad({ userId, nickName, source }) {
			this.nickName = nickName
			this.userId = userId
			this.source = source
		}
	}
</script>

<style scoped lang="scss">
	.perch{
		height: 10rpx;
	}
.userinfo{
	display: flex;
	justify-content: flex-start;
	align-items: flex-start;
	padding: 20rpx 30rpx 40rpx 40rpx;
	background-color: #FFFFFF;
	.img{
		display: block;
		width: 110rpx;
		height: 110rpx;
		border-radius: 10rpx;
	}
	&-desc{
		padding-left: 30rpx;
		&-name{
			font-weight: bold;
			font-size: 36rpx;
			transform: translateY(-10rpx);
		}
		&-gray{
			color: $u-tips-color;
			font-size: 29rpx;
		}
	}
}
</style>
