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
import msgList from '@/components/msg/msg-list.vue'
import { mapState, mapMutations} from 'vuex';
export default {
	components:{
		msgList
	},
	watch:{
		// 监听服务器是否有推送数据
		// 后期优化为推送单条数据
        newsPush: function(v){
			let userId = this.user.operId;
			this.$http.post('app/conversation/list', {
				userId
			}).then(res=>{
				res.sort(function(a, b){return b.lastOpenTime>a.lastOpenTime});
				this.$store.commit("setConversation", res)
			});
		}
	},
	computed: {
		...mapState(['newsPush','conversation','user'])
	},
	methods: {
		jump(item){
			this.$store.commit("setChatObj",item);
			uni.navigateTo({
				url:'/pages/chat/chat'
			})
		},
		onNavigationBarButtonTap({ index }) {
			console.log(index)
			uni.navigateTo({
				url:'/pages/search/search'
			})
		}
	},
};
</script>
<style lang="scss">
</style>