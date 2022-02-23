<template>
	<view class="content">
		<public-module></public-module>
		<!-- 通知 -->
		<!-- <u-notice-bar text="你有新的消息,请注意查收!"></u-notice-bar> -->
		
		<!-- 会话列表 -->
		<msg-list></msg-list>
	</view>
</template>

<script>
import msgList from '@/components/list/msg-list.vue'
import { mapState, mapMutations} from 'vuex';
export default {
	components:{
		msgList
	},
	computed: {
		...mapState(['conversation','user'])
	},
	methods: {
		jump(item){
			this.$store.commit("setChatObj",item);
			uni.navigateTo({
				url:'/pages/chat/chat'
			})
		},
		onNavigationBarButtonTap({ index }) {
			uni.navigateTo({
				url:'/pages/search/search'
			})
		}
	},
};
</script>
<style lang="scss">
</style>