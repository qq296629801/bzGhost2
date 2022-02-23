<template>
	<view>
		<!-- 公共组件-每个页面必须引入 -->
		<public-module></public-module>
		<u-transition mode="slide-down" :show="true">
			<view>
				<u--image :showLoading="true" :src="logoImage" width="150px" height="150px" @click="click"></u--image>
				<view>
					<u--text prefixIcon="chat" type="primary" text="打造跨终端跨平台即时通讯"></u--text>
					<u--text type="primary" text="个人也能玩的转的聊天软件"></u--text>
					<u--text prefixIcon="phone" mode="phone" text="18767176707"></u--text>
				</view>
			</view>
		</u-transition>
	</view>
</template>

<script>
	import { mapState, mapMutations } from 'vuex';
	export default {
		data() {
			return {
			}
		},
		methods: {
			logoImage: ""
		},
		onLoad() {
			this.logoImage = this.$base.logoImage
		},
		computed:{
			...mapState(['user'])
		}
	}
</script>

<style lang="scss" scoped>
	page{
		background-color: white;
	}
</style>
