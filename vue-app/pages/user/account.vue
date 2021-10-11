<template>
	<view>
		<u-cell-group>
			<u-cell-item :arrow="false" title="微信号" :value="userData.user.username" :title-style="{ marginLeft: '10rpx' }">
			</u-cell-item>
			<u-cell-item :arrow="false" title="手机号" :value="userData.user.mobile" :title-style="{ marginLeft: '10rpx' }">
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
			...mapState(['userData'])
		}
	}
</script>

<style lang="scss" scoped>
</style>
