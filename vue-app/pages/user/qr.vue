<template>
	<view>
		<!-- 公共组件-每个页面必须引入 -->
		<public-module></public-module>
		
		<user-card :user="$store.state.user"></user-card>
		
		<u-gap height="10" bgColor="#f6f7f8"></u-gap>
		
		<view class="qr-box">
			<uqrcode ref="uqrcode"></uqrcode>
		</view>
	</view>
</template>

<script>
	import userCard from "@/components/packet/user-card.vue"
	export default {
		components:{
			userCard
		},
		  onReady() {
			this.$refs
				.uqrcode
				.make({
					size: 200,
					text: 'uQRCode'
				})
				.then(res => {
					console.log(res)
				})
		  }
	}
</script>

<style lang="scss">
	.head{
		display: flex;
		align-items: center;
		padding: 30rpx;
		height: 300rpx;
		background-color: white;
		.avatar{
			display: flex;
			width: 20%;
		}
		.box{
			display: flex;
			width: 70%;
			flex-direction: column;
			.name{
				font-weight: bold;
			}
			.money{
				color: #565656;
			}
		}
		.arrow{
			display: flex;
			width: 10%;
		}
	}
	.qr-box{
		background-color: white;
	}
</style>
