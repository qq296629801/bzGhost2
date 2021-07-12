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
					<canvas canvas-id="qrcode" style="width: 300px;height: 300px;" />
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	import uQRCode  from '@/util/uqrcode.js'
	export default {
		data() {
			return {
			};
		},
		onShow() {
			this.make();
		},
		methods:{
			 async make() {
			   // Promise
			   uQRCode.make({
				 canvasId: 'qrcode',
				 componentInstance: this,
				 text: this.userData.user.operId,
				 size: 300,
				 margin: 10,
				 backgroundColor: '#ffffff',
				 foregroundColor: '#000000',
				 fileType: 'jpg',
				 correctLevel: uQRCode.errorCorrectLevel.H
			   }).then(res => {
				   //console.log(res)
			   })
			  
			 }
		}
	}
</script>

<style lang="scss">
 .canvas-hide {
        /* 1 */
        position: fixed;
        right: 100vw;
        bottom: 100vh;
        /* 2 */
        z-index: -9999;
        /* 3 */
        opacity: 0;
    }
</style>
