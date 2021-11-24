<template>
	<view>
		<uqrcode margin="100" ref="uqrcode"></uqrcode>
	</view>
</template>

<script>
	export default {
	  onReady() {
	    this.$refs
	        .uqrcode
	        .make({
	            size: 354,
	            text: 'uQRCode'
	        })
	        .then(res => {
	            // 返回的res与uni.canvasToTempFilePath返回一致
	            console.log(res)
	        })
	  }
	}
</script>

<style lang="scss">
</style>
