<template>
	<view class="content">
		<!-- 会话列表 -->
		<msg-list></msg-list>
	</view>
</template>

<script>
import msgList from '@/components/msg/msg-list.vue'
import { mapState, mapMutations} from 'vuex';
export default {
	components:{
		msgList
	},
	data() {
		return {
		};
	},
	watch:{
        newsPush: function(value){
		}
	},
	computed: {
		...mapState(['newsPush','conversation'])
	},
	methods: {
		jump(item){
			this.$store.commit("setChatObj",item);
			this.$u.route({
				url: 'pages/chat/chat'
			})
		},
		onNavigationBarButtonTap({ index }) {
		},
		checkSelect(index) {
			if (index == 0) {
				this.$u.route({
					url: 'pages/group/groupCreate'
				})
			} else {
				// const _t = this
				// uni.scanCode({
				// 	success: function(res) {
				// 		let result = res.result
				// 		_t.$u.route({
				// 			url: 'pages/friend/businessCard',
				// 			params:{ userId: result, nickName:'', source: 1}
				// 		})
				// 	}
				// });
			}
		},
	},
};
</script>
<style lang="scss">
</style>