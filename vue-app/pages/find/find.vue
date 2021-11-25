<template>
	<view class="content">
		<view class="cell-group">
			<u-cell-group>
				<u-cell  title="朋友圈" @tap="jumpPage">
					<u-icon slot="icon" name="moments" color="#55aaff" size="30"></u-icon> 
				</u-cell>
				<u-cell  title="扫一扫" @tap="linkToScan">
					<u-icon slot="icon" name="scan" color="#55aaff" size="30"></u-icon> 
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
