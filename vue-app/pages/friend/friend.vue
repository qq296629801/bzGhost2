<template>
	<view class="content">
		<addressBook :list="friend" :scrollTop="scrollTop" :isShowMenu="true" @toCard="jump"></addressBook>
	</view>
</template>
<script>
import addressBook from '@/components/addressBook.vue';
import { mapState, mapMutations} from 'vuex';
import apiCommon from '@/util/api/common.js';
export default {
	components:{ addressBook },
	data() {
		return {
			scrollTop: 0
		};
	},
	onPageScroll(e) {
		this.scrollTop = e.scrollTop;
	},
	computed: {
		...mapState(['user','friend'])
	},
	methods: {
		jump({id,nickName}){
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
