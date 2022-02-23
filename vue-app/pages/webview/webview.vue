<template>
	<view>
		<!-- 公共组件-每个页面必须引入 -->
		<public-module></public-module>		
		
		<web-view :src="url"></web-view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				url:'http://baidu.com'
			};
		},
		onLoad({url,name}) {
			this.url = url
			uni.setNavigationBarTitle({
				title: name
			});
		}
	}
</script>

<style lang="scss">

</style>
