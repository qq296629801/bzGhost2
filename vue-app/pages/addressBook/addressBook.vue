<template>
	<view class="content">
		<searchInput :searchType="2"/>
		<addressBook :list="list" :scrollTop="scrollTop" :isShowMenu="true" @linkTo="jump"></addressBook>
	</view>
</template>
<script>
import searchInput from '@/components/searchInput/index.vue'
import addressBook from '@/components/addressBook.vue'
import { cacheFriends } from '@/util/yiqun.js' 
import {queryFriend} from '@/util/friendStorage.js'
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
	methods: {
		a(){
			queryFriend(this.userData.user.operId).then(data=>{
				this.list=data;
			}).catch(e=>{
				cacheFriends(this.userData.user.operId).then(data=>{
					this.list=data;
				});
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
