<template>
	<view class="content">
		<searchInput :searchType="2"/>
		<addressBook :list="firendItem" :scrollTop="scrollTop" :isShowMenu="true" @linkTo="linkToCard"></addressBook>
	</view>
</template>
<script>
import searchInput from '@/components/searchInput/index.vue'
import addressBook from '@/components/addressBook.vue'
import { selectAddr } from '@/util/tool.js' 
export default {
	components:{ searchInput, addressBook },
	data() {
		return {
			scrollTop: 0,
		};
	},
	onShow() {
	},
	onLoad() {
		this.getAddr();
	},
	onPageScroll(e) {
		this.scrollTop = e.scrollTop;
	},
	methods: {
		getAddr(){
			selectAddr(this.userData.user.operId).then(data =>{
				this.$u.vuex('firendItem', data);
			}).catch(e=>{
				this.message.info(e);
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
