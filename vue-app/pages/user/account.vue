<template>
	<view>
		<u-cell-group>
			<u-cell :arrow="false" title="微信号" :value="user.username">
			</u-cell>
			<u-cell :arrow="false" title="手机号" :value="user.mobile">
			</u-cell>
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
