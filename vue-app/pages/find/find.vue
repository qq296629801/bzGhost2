<template>
	<view class="content">
		<view class="cell-group">
			<u-cell-group :border="false">
				<u-cell  title="朋友圈" @tap="jumpPage">
					<u-avatar
						slot="icon"
						size="30"
						icon="moments"
						fontSize="26"
						randomBgColor
						customStyle="margin: -3px 5px -3px 0"
					></u-avatar>
				</u-cell>
				<u-cell  title="扫一扫" @tap="linkToScan">
					<u-avatar
						slot="icon"
						size="30"
						icon="scan"
						fontSize="26"
						randomBgColor
						customStyle="margin: -3px 5px -3px 0"
					></u-avatar>
				</u-cell>
			</u-cell-group>	
		</view>
	</view>
</template>
<script>
import { mapState, mapMutations } from 'vuex';
export default {
	data() {
		return {
		};
	},
	computed: {
		...mapState(['user'])
	},
	methods: {
		jumpPage(){
			this.$u.route({
				url: 'pages/find/firendCircle'
			})
		},
		linkToScan(){
		}
	}
};
</script>

<style lang="scss" scoped>
	.cell-group{
		background-color: white;
	}
</style>
