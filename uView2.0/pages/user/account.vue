<template>
	<view>
		<u-cell-group>
			<u-cell-item :arrow="false" title="微信号" :value="user.username" :title-style="{ marginLeft: '10rpx' }">
			</u-cell-item>
			<u-cell-item :arrow="false" title="手机号" :value="user.mobile" :title-style="{ marginLeft: '10rpx' }">
			</u-cell-item>
		</u-cell-group>
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
		},
		computed:{
			...mapState(['user'])
		}
	}
</script>

<style lang="scss" scoped>
</style>
