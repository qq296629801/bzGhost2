<template>
	<view class="content">
		<view>
			<view class="u-flex user-box u-p-l-30 u-p-r-20 u-p-b-30">
				<view class="u-m-r-10">
					<u-avatar :src="`${$url}/${userData.user.avatar}`" size="140"></u-avatar>
				</view>
				<view class="u-flex-1">
					<view class="u-font-18 u-p-b-20">{{userData.user.realname}}</view>
					<view class="u-font-14 u-tips-color"><b>积分：</b> {{userData.user.money}}</view>
				</view>
			</view>
			<view class="u-flex">
				<view class="u-m-r-10">
					<image :src="createQRCode(userData.user.operId, 100)"></image>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	import QR from '@/components/wxqrcode.js'
	export default {
		data() {
			return {
			};
		},
		onPullDownRefresh() {
			uni.stopPullDownRefresh();
		},
		methods:{
			  createQRCode: function (text, size) {
			    //调用插件中的draw方法，绘制二维码图片
			    let that = this
			    try {
			      let _img = QR.createQrCodeImg(text, {
			        size: parseInt(size)
			      })
				  return _img;
			    } catch (e) {
			      console.warn(e)
			    }
			  }
		}
	}
</script>

<style lang="scss">
.content{
	padding: 50rpx;
	background-color: #fff;
}
</style>
