<template>
	<view>
		<view class="head">
			<view class="avatar">
				<u-avatar shape="square" src="https://cdn.uviewui.com/uview/album/1.jpg" size="60"></u-avatar>
			</view>
			<view class="box">
				<view class="name">
					<u--text size="20" mode="name" :text="$store.state.user.realname"></u--text>
				</view>
				<view class="money">
					<u--text type="info" :text="$store.state.user.money"></u--text>
				</view>
			</view>
			<view class="arrow">
				<u-icon name="arrow-right" color="#969799" size="20"></u-icon>
			</view>
		</view>
		
		<u-gap height="10" bgColor="#f6f7f8"></u-gap>
		
		<view class="qr-box">
			<uqrcode ref="uqrcode"></uqrcode>
		</view>
	</view>
</template>

<script>
	export default {
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
