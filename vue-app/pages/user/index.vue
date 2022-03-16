<template>
	<view class="content">
		<!-- 公共组件-每个页面必须引入 -->
		<public-module></public-module>
		
		<view class="head">
			<u-grid :col="6" :border="false">
				<u-grid-item>
					<u-icon
							:customStyle="{paddingTop:20+'rpx'}"
							:name="webUrl + chatObj.imgUrl"
							:size="40"
					         ></u-icon>
					<text class="grid-text">{{ chatObj.chatName}}</text>
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
				<u-cell>
					<view slot="label" class="btn-red">清空聊天记录</view>
				</u-cell>
			</u-cell-group>
		</view>
	</view>
</template>

<script>
	import { mapState, mapMutations } from 'vuex';
	import base from '@/util/baseUrl.js';
	export default {
		data() {
			return {
				webUrl:base.webUrl
			}
		},
		computed:{
			...mapState(['chatObj'])
		}
	}
</script>

<style lang="scss" scoped>
	.grid-text {
		font-size: 14px;
		color: #909399;
		padding: 10rpx 0 20rpx 0rpx;
		/* #ifndef APP-PLUS */
		box-sizing: border-box;
		/* #endif */
	}
	.head{
		background-color: white;
	}
	.btn-red{
		text-align: center; 
		color: red;
	}
</style>
