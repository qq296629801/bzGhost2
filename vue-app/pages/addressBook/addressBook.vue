<template>
	<view class="content">
		<searchInput :searchType="2"/>
		<addressBook :list="firendItem" :scrollTop="scrollTop" :isShowMenu="true" @linkTo="linkToCard"></addressBook>
	</view>
</template>
<script>
import searchInput from '@/components/searchInput/index.vue'
import addressBook from '@/components/addressBook.vue'
import dbUtil from '../../util/dbUtil.js' 
export default {
	components:{ searchInput, addressBook },
	data() {
		return {
			scrollTop: 0,
		};
	},
	onShow() {
	    this.getAddr();
	},
	onPageScroll(e) {
		this.scrollTop = e.scrollTop;
	},
	onPullDownRefresh() {
		this.getAddr();
		uni.stopPullDownRefresh();
	},
	methods: {
		getAddr(){
			dbUtil.selectAddr(this.userData.user.operId).then(res=>{
				this.$u.vuex('firendItem', res);
			});
		},
		linkToCard({id}){
			this.$u.route({
				url: 'pages/businessCard/businessCard',
				params:{ id: id, source: 1}
			});
		}
	}
};
</script>

<style lang="scss" scoped>
.content {
	height: 100%;
}
</style>
