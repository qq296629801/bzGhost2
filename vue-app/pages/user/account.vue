<template>
	<view>
		<u-transition mode="slide-down" :show="true">
			<view>
				<u--image :showLoading="true" :src="logoImage" width="150px" height="150px" @click="click"></u--image>
				<view>
					<u-tag text="打造跨终端跨平台即时通讯" size="large" icon="chat" plain></u-tag>
					<u-tag text="个人也能玩的转的聊天软件." size="large" plain></u-tag>
					<u-tag text="18767176707" size="large" icon="phone" plain></u-tag>
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
