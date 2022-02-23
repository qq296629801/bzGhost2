<template>
	<view>
		<!-- 公共组件-每个页面必须引入 -->
		<public-module></public-module>
	</view>
</template>

<script>
	export default {
		name:'memMore',
		data() {
			return {
			};
		},
		onShow() {
			this.queryMems();
		},
		methods:{
		}
	}
</script>

<style lang="scss">
	
</style>
