<template>
	<view class="content">
		<view class="head">
			<u-grid :col="6" :border="false">
				<u-grid-item>
					<u-avatar src="/static/image/huge.jpg" mode="square"></u-avatar>
					<view class="grid-text">{{chatObj.chatName}}</view>
				</u-grid-item>
			</u-grid>
		</view>
		
		<view style="height: 20rpx;"></view>
		
		<u-cell-group>
			<u-cell-item title="查看聊天内容" @click="showSearch" :title-style="{ marginLeft: '10rpx' }">
			</u-cell-item>
			<u-cell-item title="设置聊天背景" :title-style="{ marginLeft: '10rpx' }" @click="chooseImg">
			</u-cell-item>
			<u-cell-item :title-style="{ marginLeft: '10rpx' }" @click="delFriendMsg" :arrow="false">
				<view style="text-align: center; color: red;">清空聊天记录</view>
			</u-cell-item>
		</u-cell-group>
	</view>
</template>

<script>
	import { mapState, mapMutations } from 'vuex';
	export default {
		data() {
			return {
			}
		},
		computed:{
			...mapState(['chatObj'])
		},
		methods: {
		}
	}
</script>

<style lang="scss" scoped>
	.head{
		background-color: white;
	}
	.status_bar {
		height: var(--status-bar-height);
		width: 100%;
	}
</style>
