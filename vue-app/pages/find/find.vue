<template>
	<view class="content">
		
		<u-cell-group>
			<u-cell  title="朋友圈" @tap="jumpPage">
				<u-icon slot="icon" name="moments-circel-fill" color="#00aaff" size="30"></u-icon> 
			</u-cell>
			<u-cell  title="扫一扫" @tap="linkToScan">
				<u-icon slot="icon" name="scan" color="#00aaff" size="30"></u-icon> 
			</u-cell>
		</u-cell-group>	
		
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
		}
	}
};
</script>

<style lang="scss" scoped>
	.content{
		
	}
</style>
