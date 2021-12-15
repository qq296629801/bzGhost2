<template>
	<view class="content">
		<!-- 公共组件-每个页面必须引入 -->
		<public-module></public-module>
		
		<u-transition :show="true" mode="slide-right">
		
		<view class="cell-group">
			<u-cell-group :border="false">
				<u-cell size="large"  title="朋友圈" @tap="jumpPage">
					<u-avatar
						slot="icon"
						size="30"
						icon="moments"
						fontSize="26"
						randomBgColor
						customStyle="margin: -3px 5px -3px 0"
					></u-avatar>
				</u-cell>
				<u-cell size="large"  title="扫一扫" @tap="linkToScan">
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
		
		</u-transition>
		
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
