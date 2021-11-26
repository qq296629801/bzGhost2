<template>
	<view>
		<view class="userinfo">
			<u-avatar shape="square" :src="webUrl + user.avatar" size="60"></u-avatar>
			<view class="userinfo-desc">
				<view class="userinfo-desc-name">{{user.nickName}}</view>
				<view class="userinfo-desc-gray">{{user.money}}</view>
			</view>
		</view>
		<u-gap height="10" bgColor="#f6f7f8"></u-gap>
	</view>
</template>

<script>
	import base from '@/util/baseUrl.js';
	export default {
		name:'user-card',
		props:{
			user:{
				type:Object,
				default:{}
			}
		},
		data() {
			return {
				webUrl:base.webUrl
			};
		}
	}
</script>

<style lang="scss">
.perch{
	height: 10rpx;
}
.cell-group{
	background-color: white;
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
