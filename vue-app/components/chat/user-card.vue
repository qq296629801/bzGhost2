<template>
	<view>
		<view class="userinfo">
			<u-avatar shape="square" @tap="jumpImage(webUrl + user.avatar)" :src="webUrl + user.avatar" size="60"></u-avatar>
			<view class="userinfo-desc">
				<u--text :text="user.userName || user.nickName || user.username"></u--text>
				<u--text type="info" :text="user.money"></u--text>
			</view>
			<view class="userinfo-arrow" @tap="jumpMy" v-if="isStatic">
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
			},
			isStatic:{
				type:Boolean,
				default:false
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
			},
			jumpImage(urls){
				uni.previewImage({urls:[urls]})
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
