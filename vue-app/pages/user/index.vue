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
		<u-gap height="10" bgColor="#f6f7f8"></u-gap>
		<view class="head">
			<u-cell-group>
				<u-cell title="查看聊天内容" @click="showSearch">
				</u-cell>
				<u-cell title="设置聊天背景" @click="chooseImg">
				</u-cell>
				<u-cell @click="delFriendMsg">
					<view solt="label" style="text-align: center; color: red;">清空聊天记录</view>
				</u-cell>
			</u-cell-group>
		</view>
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
	
</style>
