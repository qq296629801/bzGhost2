<template>
	<view class="content">
		<searchInput :searchType="2"/>
		<addressBook :list="list" :scrollTop="scrollTop" :isShowMenu="true" @linkTo="jump"></addressBook>
	</view>
</template>
<script>
import searchInput from '@/components/searchInput/index.vue'
import addressBook from '@/components/addressBook.vue'
import { mapState, mapMutations} from 'vuex';
import common from '@/util/common.js'
export default {
	components:{ searchInput, addressBook },
	data() {
		return {
			scrollTop: 0,
			list:[]
		};
	},
	onLoad() {
		this.a()
	},
	onPageScroll(e) {
		this.scrollTop = e.scrollTop;
	},
	computed: {
		...mapState(['userData'])
	},
	methods: {
		a(){
			common.get('friend').then(res=>{
				this.list = res
			});
		},
		jump({id}){
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
