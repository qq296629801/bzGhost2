<template>
	<view class="content">
		<addressBook :list="list" :scrollTop="scrollTop" :isShowMenu="true" @toCard="jump"></addressBook>
	</view>
</template>
<script>
import addressBook from '@/components/addressBook.vue'
import { mapState, mapMutations} from 'vuex';
import common from '@/util/common.js'
export default {
	components:{ addressBook },
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
		jump({id,nickName}){
			//console.log(JSON.stringify(item))
			this.$u.route({
				url: 'pages/friend/businessCard',
				params:{ userId: id, source: 0,nickName:nickName}
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
