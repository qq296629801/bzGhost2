<template>
	<view>
		<view class="userinfo">
			<u-avatar shape="square" :src="webUrl + user.avatar" size="60"></u-avatar>
			<view class="userinfo-desc">
				<u--text :text="user.username"></u--text>
				<u--text type="info" :text="user.money"></u--text>
			</view>
			<view class="userinfo-arrow" @tap="jumpMy">
				<u-icon name="arrow-right"></u-icon>
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
		},
		methods:{
			jumpMy(){
				this.$u.route({
					url: 'pages/user/my'
				})
			}
		}
	}
</script>

<style lang="scss">
.cell-group{
	background-color: white;
}
.userinfo{
	display: flex;
	justify-content: flex-start;
	align-items: flex-start;
	padding: 20rpx 30rpx 40rpx 40rpx;
	background-color: #FFFFFF;
	
	&-arrow{
		position: absolute;
		right: 0;
		top: 50rpx;
		height: 100rpx;
		width: 70rpx;
	}
	&-desc{
		padding-left: 20rpx;
	}
}
</style>
